import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import ProductCard from './components/ProductCard';
import FilterSidebar from './components/FilterSidebar';
import ProductDetailModal from './components/ProductDetailModal';
import SmartBundleCreator from './components/SmartBundleCreator';
import AIUpsellingSuggestions from './components/AIUpsellingSuggestions';
import FloatingShoppingCart from '../../components/ui/FloatingShoppingCart';
import VoiceAssistant from '../../components/ui/VoiceAssistant';
import AIContextualSuggestions from '../../components/ui/AIContextualSuggestions';

const ECommerceStore = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: '',
    delivery: [],
    search: ''
  });
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isBundleCreatorOpen, setIsBundleCreatorOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [currentUpsellProduct, setCurrentUpsellProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'AI Chatbot Development',
      description: 'Intelligent conversational AI with natural language processing and machine learning capabilities.',
      fullDescription: `Transform your customer service with our advanced AI chatbot solution. Built using cutting-edge natural language processing and machine learning algorithms, this chatbot provides 24/7 customer support, handles complex queries, and learns from every interaction to improve over time.\n\nOur AI chatbot integrates seamlessly with your existing systems and can be customized to match your brand voice and business requirements. With multi-language support and advanced analytics, you'll gain valuable insights into customer behavior and preferences.`,category: 'AI Solutions',price: 499,originalPrice: 699,rating: 4.9,reviews: 127,image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop','https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop','https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
      ],
      features: ['Natural Language Processing', '24/7 Availability', 'Multi-language Support', 'Analytics Dashboard', 'CRM Integration', 'Custom Training'],
      badge: 'Popular',developmentTime: '4-6 weeks',techStack: 'Python, TensorFlow, OpenAI API, React',
      platforms: 'Web, Mobile, Slack, WhatsApp',support: '12 months included',revisions: 'Unlimited during development',sourceCode: 'Full ownership included',
      included: [
        'Complete chatbot development','Natural language training','Integration with your systems','Admin dashboard','12 months support & updates','Training documentation'
      ]
    },
    {
      id: 2,
      name: 'E-commerce Web Platform',description: 'Full-featured online store with payment processing, inventory management, and analytics.',
      fullDescription: `Launch your online business with our comprehensive e-commerce platform. Built with modern technologies and optimized for performance, this solution includes everything you need to start selling online.\n\nFeatures include secure payment processing, inventory management, order tracking, customer accounts, and detailed analytics. The platform is fully responsive and optimized for search engines to help you reach more customers.`,
      category: 'Web Development',price: 899,originalPrice: 1299,rating: 4.8,reviews: 89,image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      features: ['Payment Gateway', 'Inventory Management', 'Order Tracking', 'SEO Optimized', 'Mobile Responsive', 'Admin Dashboard'],
      badge: 'New',developmentTime: '6-8 weeks',techStack: 'React, Node.js, MongoDB, Stripe',
      platforms: 'Web, Progressive Web App'
    },
    {
      id: 3,
      name: 'Mobile App Development',description: 'Native iOS and Android applications with cloud synchronization and push notifications.',
      fullDescription: `Reach your customers on their mobile devices with our native app development service. We create high-performance applications for both iOS and Android platforms using the latest technologies and best practices.\n\nYour app will feature cloud synchronization, push notifications, offline functionality, and seamless user experience. We handle everything from design to deployment on app stores.`,
      category: 'Mobile Apps',price: 1299,originalPrice: 1799,rating: 4.9,reviews: 156,image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      features: ['iOS & Android', 'Cloud Sync', 'Push Notifications', 'Offline Mode', 'App Store Deployment', 'Analytics'],
      badge: 'Popular',developmentTime: '8-12 weeks',techStack: 'React Native, Firebase, Redux'
    },
    {
      id: 4,
      name: 'UI/UX Design Package',description: 'Complete design system with user research, wireframes, prototypes, and style guides.',
      fullDescription: `Create exceptional user experiences with our comprehensive UI/UX design package. Our design process includes user research, persona development, wireframing, prototyping, and creating detailed style guides.\n\nWe focus on creating intuitive interfaces that not only look great but also provide excellent usability. All designs are delivered with detailed specifications for developers and include responsive layouts for all devices.`,
      category: 'UI/UX Design',price: 299,originalPrice: 449,rating: 4.7,reviews: 203,image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Style Guide', 'Responsive Design', 'Usability Testing'],
      developmentTime: '3-4 weeks',techStack: 'Figma, Adobe Creative Suite, Principle'
    },
    {
      id: 5,
      name: 'Business Consulting',description: 'Strategic technology consulting to optimize your digital transformation journey.',
      fullDescription: `Accelerate your digital transformation with our expert consulting services. Our experienced consultants will analyze your current technology stack, identify opportunities for improvement, and create a roadmap for success.\n\nWe provide strategic guidance on technology selection, process optimization, team structure, and implementation planning. Our goal is to help you make informed decisions that drive business growth.`,
      category: 'Consulting',price: 199,rating: 4.8,reviews: 94,image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      features: ['Technology Assessment', 'Strategic Planning', 'Process Optimization', 'Team Training', 'Implementation Support', 'ROI Analysis'],
      developmentTime: '2-3 weeks',techStack: 'Various based on assessment'
    },
    {
      id: 6,
      name: 'Website Maintenance',description: 'Ongoing support, security updates, performance optimization, and content management.',
      fullDescription: `Keep your website running smoothly with our comprehensive maintenance service. We handle all technical aspects including security updates, performance optimization, backup management, and content updates.\n\nOur maintenance package includes 24/7 monitoring, regular security scans, performance reports, and priority support. Focus on your business while we take care of your website.`,
      category: 'Maintenance',price: 49,rating: 4.6,reviews: 312,image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      features: ['Security Updates', 'Performance Monitoring', 'Backup Management', 'Content Updates', '24/7 Support', 'Monthly Reports'],
      developmentTime: 'Ongoing service',techStack: 'Various based on website technology'
    },
    {
      id: 7,
      name: 'Data Analytics Dashboard',description: 'Custom analytics platform with real-time data visualization and business intelligence.',
      fullDescription: `Make data-driven decisions with our custom analytics dashboard. We create powerful visualization tools that transform your raw data into actionable insights.\n\nThe dashboard includes real-time data processing, interactive charts, automated reporting, and customizable KPI tracking. Perfect for businesses looking to leverage their data for competitive advantage.`,
      category: 'AI Solutions',price: 699,originalPrice: 999,rating: 4.8,reviews: 78,image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      features: ['Real-time Data', 'Interactive Charts', 'Custom KPIs', 'Automated Reports', 'Data Export', 'Multi-user Access'],
      badge: 'Featured',developmentTime: '5-7 weeks',techStack: 'React, D3.js, Python, PostgreSQL'
    },
    {
      id: 8,
      name: 'Cloud Migration Service',description: 'Seamless migration of your applications and data to modern cloud infrastructure.',
      fullDescription: `Modernize your infrastructure with our cloud migration service. We handle the complete migration process from planning to execution, ensuring minimal downtime and maximum security.\n\nOur service includes cloud architecture design, data migration, application modernization, and post-migration optimization. We work with all major cloud providers to find the best solution for your needs.`,
      category: 'Consulting',price: 799,originalPrice: 1199,rating: 4.9,reviews: 67,image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      features: ['Migration Planning', 'Data Transfer', 'Security Setup', 'Performance Optimization', 'Cost Analysis', 'Training'],
      developmentTime: '4-8 weeks',techStack: 'AWS, Azure, Google Cloud, Docker'
    },
    {
      id: 9,
      name: 'API Development',description: 'RESTful APIs with comprehensive documentation, authentication, and rate limiting.',
      fullDescription: `Connect your applications with robust API development services. We create scalable, secure APIs that enable seamless integration between different systems and platforms.\n\nOur APIs include comprehensive documentation, authentication systems, rate limiting, and monitoring. Perfect for businesses looking to create connected ecosystems or offer services to third-party developers.`,
      category: 'Web Development',price: 399,rating: 4.7,reviews: 145,image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      features: ['RESTful Design', 'Authentication', 'Rate Limiting', 'Documentation', 'Monitoring', 'Version Control'],
      developmentTime: '3-5 weeks',techStack: 'Node.js, Express, MongoDB, Swagger'
    }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, products]);

  const applyFilters = () => {
    let filtered = [...products];

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product => 
        filters?.categories?.some(category => 
          product?.category?.toLowerCase()?.replace(/[^a-z0-9]/g, '-') === category
        )
      );
    }

    // Apply price range filter
    if (filters?.priceRange) {
      const ranges = {
        'under-1000': { min: 0, max: 1000 },
        '1000-5000': { min: 1000, max: 5000 },
        '5000-10000': { min: 5000, max: 10000 },
        '10000-25000': { min: 10000, max: 25000 },
        'over-25000': { min: 25000, max: Infinity }
      };
      
      const range = ranges?.[filters?.priceRange];
      if (range) {
        filtered = filtered?.filter(product => 
          product?.price >= range?.min && product?.price <= range?.max
        );
      }
    }

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchTerm) ||
        product?.description?.toLowerCase()?.includes(searchTerm) ||
        product?.category?.toLowerCase()?.includes(searchTerm) ||
        product?.features?.some(feature => feature?.toLowerCase()?.includes(searchTerm))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      default:
        // Featured - keep original order but prioritize badges
        filtered?.sort((a, b) => {
          if (a?.badge && !b?.badge) return -1;
          if (!a?.badge && b?.badge) return 1;
          return 0;
        });
    }

    setFilteredProducts(filtered);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: '',
      delivery: [],
      search: ''
    });
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e?.target?.value
    }));
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev?.find(item => item?.id === product?.id);
      if (existingItem) {
        return prev?.map(item =>
          item?.id === product?.id
            ? { ...item, quantity: item?.quantity + (product?.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product?.quantity || 1 }];
    });

    // Show upselling suggestions
    setCurrentUpsellProduct(product);
    setTimeout(() => setCurrentUpsellProduct(null), 10000);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCreateBundle = (bundle) => {
    // Add bundle as a single cart item
    const bundleItem = {
      id: `bundle-${Date.now()}`,
      name: bundle?.name,
      description: `Bundle of ${bundle?.products?.length} services`,
      price: bundle?.pricing?.discountedPrice,
      originalPrice: bundle?.pricing?.originalPrice,
      category: 'Bundle',
      features: bundle?.products?.map(p => p?.name),
      quantity: 1,
      isBundle: true,
      bundleProducts: bundle?.products
    };
    
    setCartItems(prev => [...prev, bundleItem]);
  };

  return (
    <>
      <Helmet>
        <title>E-commerce Store - DevPerfection | Premium Digital Services</title>
        <meta name="description" content="Browse and purchase premium digital services including AI solutions, web development, mobile apps, and UI/UX design. Experience immersive 3D product previews and AI-powered recommendations." />
        <meta name="keywords" content="digital services, AI solutions, web development, mobile apps, UI/UX design, e-commerce, DevPerfection" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,224,255,0.1),transparent_50%)]"></div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Premium Digital
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Services Store
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover cutting-edge digital solutions with immersive 3D previews, Powered by iperfect AI recommendations, 
                and intelligent bundle suggestions tailored to your business needs.
              </p>
            </div>

            {/* Search and Sort Bar */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search services, features, or categories..."
                  value={filters?.search}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-input border border-border/30 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by"
                  className="w-48 bg-black text-white border border-border/30"
                />
                
                <Button
                  variant="outline"
                  iconName="Package"
                  iconPosition="left"
                  onClick={() => setIsBundleCreatorOpen(true)}
                  className="border-secondary/30 text-secondary hover:bg-secondary/10 hover:glow-secondary transition-glow"
                >
                  Create Bundle
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground font-data">
                Showing {filteredProducts?.length} of {products?.length} services
              </p>
              {(filters?.categories?.length > 0 || filters?.priceRange || filters?.search) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Icon name="X" size={16} className="mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-6 lg:px-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filter Sidebar */}
              <div className="lg:w-1/4">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {/* Products Grid */}
              <div className="lg:w-3/4">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(9)]?.map((_, index) => (
                      <div key={index} className="glass rounded-2xl p-6 border border-primary/20 animate-pulse">
                        <div className="h-48 bg-muted/20 rounded-xl mb-4"></div>
                        <div className="space-y-3">
                          <div className="h-4 bg-muted/20 rounded w-3/4"></div>
                          <div className="h-3 bg-muted/20 rounded w-full"></div>
                          <div className="h-3 bg-muted/20 rounded w-2/3"></div>
                          <div className="flex space-x-2">
                            <div className="h-6 bg-muted/20 rounded-full w-16"></div>
                            <div className="h-6 bg-muted/20 rounded-full w-20"></div>
                          </div>
                          <div className="h-8 bg-muted/20 rounded w-24"></div>
                          <div className="h-10 bg-muted/20 rounded w-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredProducts?.length === 0 ? (
                  <div className="text-center py-16">
                    <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading font-semibold text-foreground text-xl mb-2">
                      No services found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search terms to find what you're looking for.
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="border-primary/30 text-primary hover:bg-primary/10"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts?.map((product) => (
                      <ProductCard
                        key={product?.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Modals and Overlays */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          onAddToCart={handleAddToCart}
        />

        <SmartBundleCreator
          products={products}
          onCreateBundle={handleCreateBundle}
          isOpen={isBundleCreatorOpen}
          onClose={() => setIsBundleCreatorOpen(false)}
        />

        <AIUpsellingSuggestions
          currentProduct={currentUpsellProduct}
          allProducts={products}
          onAddToCart={handleAddToCart}
          onViewProduct={handleViewDetails}
        />

        {/* Floating Components */}
        <FloatingShoppingCart />
        <VoiceAssistant />
        <AIContextualSuggestions />

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>
    </>
  );
};

export default ECommerceStore;