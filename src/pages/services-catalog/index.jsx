import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import AIContextualSuggestions from '../../components/ui/AIContextualSuggestions';
import FloatingShoppingCart from '../../components/ui/FloatingShoppingCart';
import VoiceAssistant from '../../components/ui/VoiceAssistant';

import FilterSidebar from './components/FilterSidebar';
import ServiceCard from './components/ServiceCard';
import AIRecommendations from './components/AIRecommendations';
import ServiceModal from './components/ServiceModal';

const ServicesCatalog = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterSidebarCollapsed, setIsFilterSidebarCollapsed] = useState(true);
  const [isBundleCreatorOpen, setIsBundleCreatorOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [userBehavior, setUserBehavior] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Sample services data
  const sampleServices = [
    {
      id: 1,
      name: 'AI Chatbot Development',
      category: 'AI & Machine Learning',
      description: 'Intelligent conversational AI powered by advanced NLP and machine learning algorithms for seamless customer interactions.',
      longDescription: 'Our AI Chatbot Development service creates sophisticated conversational interfaces that understand context, learn from interactions, and provide personalized responses. Built with cutting-edge natural language processing and machine learning technologies.',
      icon: 'MessageSquare',
      price: 4999,
      originalPrice: 5999,
      discount: 17,
      timeline: '4-6 weeks',
      complexity: 'intermediate',
      rating: 4.9,
      projectsCompleted: 127,
      reviews: 89,
      technologies: ['Python', 'TensorFlow', 'NLP', 'React', 'Node.js', 'MongoDB'],
      features: [
        'Natural Language Processing',
        'Multi-language Support',
        'Context Awareness',
        'Integration APIs',
        'Analytics Dashboard',
        '24/7 Learning Capability'
      ],
      hasDemo: true,
      demoType: 'Live Chat Interface',
      isPopular: true,
      isNew: false,
      paymentTerms: 'Flexible payment plans',
      caseStudy: {
        title: 'E-commerce Customer Support Bot',
        client: 'TechMart Inc.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'
      },
      heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      category: 'Mobile Solutions',
      description: 'Cross-platform mobile applications with native performance, modern UI/UX, and seamless cloud integration.',
      icon: 'Smartphone',
      price: 8999,
      originalPrice: 10999,
      discount: 18,
      timeline: '8-12 weeks',
      complexity: 'advanced',
      rating: 4.8,
      projectsCompleted: 95,
      reviews: 67,
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS'],
      features: [
        'Cross-platform Development',
        'Native Performance',
        'Push Notifications',
        'Offline Functionality',
        'Cloud Synchronization',
        'App Store Optimization'
      ],
      hasDemo: true,
      demoType: 'Interactive Prototype',
      isPopular: false,
      isNew: true,
      paymentTerms: 'Milestone-based payments',
      caseStudy: {
        title: 'Healthcare Management App',
        client: 'MediCare Solutions',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
      }
    },
    {
      id: 3,
      name: 'Web Application Development',
      category: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge frameworks and optimized for performance.',
      icon: 'Globe',
      price: 6999,
      timeline: '6-10 weeks',
      complexity: 'intermediate',
      rating: 4.7,
      projectsCompleted: 156,
      reviews: 112,
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Progressive Web App',
        'Real-time Features',
        'API Integration',
        'Performance Optimization'
      ],
      hasDemo: true,
      demoType: 'Live Website Demo',
      isPopular: true,
      isNew: false,
      paymentTerms: 'Flexible payment plans',
      caseStudy: {
        title: 'SaaS Dashboard Platform',
        client: 'DataFlow Pro',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
      }
    },
    {
      id: 4,
      name: 'Blockchain Development',
      category: 'Blockchain',
      description: 'Secure, decentralized applications and smart contracts built on leading blockchain platforms.',
      icon: 'Link',
      price: 12999,
      originalPrice: 15999,
      discount: 19,
      timeline: '10-16 weeks',
      complexity: 'enterprise',
      rating: 4.6,
      projectsCompleted: 43,
      reviews: 31,
      technologies: ['Solidity', 'Web3.js', 'Ethereum', 'IPFS', 'React', 'Node.js'],
      features: [
        'Smart Contract Development',
        'DeFi Integration',
        'NFT Marketplace',
        'Wallet Integration',
        'Security Auditing',
        'Gas Optimization'
      ],
      hasDemo: true,
      demoType: 'Testnet Demo',
      isPopular: false,
      isNew: true,
      paymentTerms: 'Escrow-based payments',
      caseStudy: {
        title: 'DeFi Trading Platform',
        client: 'CryptoTrade LLC',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400'
      }
    },
    {
      id: 5,
      name: 'Cloud Infrastructure Setup',
      category: 'Cloud Solutions',
      description: 'Scalable, secure cloud infrastructure with automated deployment and monitoring capabilities.',
      icon: 'Cloud',
      price: 3999,
      timeline: '2-4 weeks',
      complexity: 'basic',
      rating: 4.8,
      projectsCompleted: 203,
      reviews: 145,
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Monitoring'],
      features: [
        'Auto-scaling Infrastructure',
        'CI/CD Pipeline',
        'Security Configuration',
        'Backup & Recovery',
        'Performance Monitoring',
        'Cost Optimization'
      ],
      hasDemo: false,
      isPopular: true,
      isNew: false,
      paymentTerms: 'Upfront payment',
      caseStudy: {
        title: 'E-commerce Platform Migration',
        client: 'ShopFast Inc.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400'
      }
    },
    {
      id: 6,
      name: 'IoT Solution Development',
      category: 'IoT Development',
      description: 'End-to-end IoT solutions connecting devices, data analytics, and intelligent automation.',
      icon: 'Cpu',
      price: 9999,
      timeline: '8-14 weeks',
      complexity: 'advanced',
      rating: 4.5,
      projectsCompleted: 67,
      reviews: 48,
      technologies: ['Arduino', 'Raspberry Pi', 'MQTT', 'InfluxDB', 'Grafana', 'Python'],
      features: [
        'Device Connectivity',
        'Real-time Data Processing',
        'Predictive Analytics',
        'Remote Monitoring',
        'Edge Computing',
        'Security Protocols'
      ],
      hasDemo: true,
      demoType: 'Hardware Demo',
      isPopular: false,
      isNew: false,
      paymentTerms: 'Milestone-based payments',
      caseStudy: {
        title: 'Smart Factory Monitoring',
        client: 'Industrial Tech Corp',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400'
      }
    },
    {
      id: 7,
      name: 'AR/VR Experience Development',
      category: 'AR/VR Solutions',
      description: 'Immersive augmented and virtual reality experiences for training, marketing, and entertainment.',
      icon: 'Eye',
      price: 15999,
      timeline: '12-20 weeks',
      complexity: 'enterprise',
      rating: 4.7,
      projectsCompleted: 29,
      reviews: 22,
      technologies: ['Unity', 'Unreal Engine', 'ARKit', 'ARCore', 'Oculus SDK', 'WebXR'],
      features: [
        '3D Environment Design',
        'Interactive Elements',
        'Multi-platform Support',
        'Hand Tracking',
        'Spatial Audio',
        'Performance Optimization'
      ],
      hasDemo: true,
      demoType: 'VR Headset Demo',
      isPopular: false,
      isNew: true,
      paymentTerms: 'Milestone-based payments',
      caseStudy: {
        title: 'Virtual Training Simulator',
        client: 'AeroSpace Training',
        image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400'
      }
    },
    {
      id: 8,
      name: 'Cybersecurity Assessment',
      category: 'Cybersecurity',
      description: 'Comprehensive security audits, vulnerability assessments, and penetration testing services.',
      icon: 'Shield',
      price: 2999,
      timeline: '1-3 weeks',
      complexity: 'basic',
      rating: 4.9,
      projectsCompleted: 178,
      reviews: 134,
      technologies: ['Nmap', 'Metasploit', 'Burp Suite', 'OWASP', 'Kali Linux', 'Python'],
      features: [
        'Vulnerability Scanning',
        'Penetration Testing',
        'Security Compliance',
        'Risk Assessment',
        'Incident Response',
        'Security Training'
      ],
      hasDemo: false,
      isPopular: true,
      isNew: false,
      paymentTerms: 'Upfront payment',
      caseStudy: {
        title: 'Financial Institution Security Audit',
        client: 'SecureBank Corp',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400'
      }
    }
  ];

  // Initialize services
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setServices(sampleServices);
      setFilteredServices(sampleServices);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter services based on active filters
  const applyFilters = useCallback((filters) => {
    let filtered = [...services];

    // Apply category filters
    if (filters?.categories && filters?.categories?.length > 0) {
      filtered = filtered?.filter(service => 
        filters?.categories?.some(category => 
          service?.category?.toLowerCase()?.includes(category?.replace('-', ' '))
        )
      );
    }

    // Apply technology filters
    if (filters?.technologies && filters?.technologies?.length > 0) {
      filtered = filtered?.filter(service =>
        filters?.technologies?.some(tech =>
          service?.technologies?.some(serviceTech =>
            serviceTech?.toLowerCase()?.includes(tech?.toLowerCase())
          )
        )
      );
    }

    // Apply complexity filters
    if (filters?.complexity && filters?.complexity?.length > 0) {
      filtered = filtered?.filter(service =>
        filters?.complexity?.includes(service?.complexity)
      );
    }

    // Apply price range filters
    if (filters?.priceRange && filters?.priceRange?.length > 0) {
      filtered = filtered?.filter(service => {
        return filters?.priceRange?.some(range => {
          switch (range) {
            case 'budget':
              return service?.price >= 1000 && service?.price <= 5000;
            case 'standard':
              return service?.price > 5000 && service?.price <= 15000;
            case 'premium':
              return service?.price > 15000 && service?.price <= 50000;
            case 'enterprise':
              return service?.price > 50000;
            default:
              return true;
          }
        });
      });
    }

    // Apply timeline filters
    if (filters?.timeline && filters?.timeline?.length > 0) {
      filtered = filtered?.filter(service => {
        return filters?.timeline?.some(timeline => {
          const weeks = parseInt(service?.timeline?.split('-')?.[0]);
          switch (timeline) {
            case 'rush':
              return weeks <= 2;
            case 'standard':
              return weeks >= 4 && weeks <= 12;
            case 'extended':
              return weeks >= 12 && weeks <= 24;
            case 'ongoing':
              return weeks > 24;
            default:
              return true;
          }
        });
      });
    }

    setFilteredServices(filtered);
  }, [services]);

  // Handle filter changes
  const handleFiltersChange = useCallback((filters) => {
    setActiveFilters(filters);
    applyFilters(filters);
  }, [applyFilters]);

  // Sort services
  useEffect(() => {
    let sorted = [...filteredServices];
    
    switch (sortBy) {
      case 'popular':
        sorted?.sort((a, b) => b?.projectsCompleted - a?.projectsCompleted);
        break;
      case 'price-low':
        sorted?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        sorted?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        sorted?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        sorted?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      default:
        break;
    }
    
    setFilteredServices(sorted);
  }, [sortBy, filteredServices?.length]);

  // Handle service actions
  const handleAddToCart = (service) => {
    console.log('Adding to cart:', service?.name);
    // Track user behavior for AI recommendations
    setUserBehavior(prev => ({
      ...prev,
      addedToCart: [...(prev?.addedToCart || []), service?.id],
      lastAction: 'add_to_cart',
      timestamp: Date.now()
    }));
  };

  const handleViewDemo = (service) => {
    console.log('Viewing demo for:', service?.name);
    setUserBehavior(prev => ({
      ...prev,
      viewedDemos: [...(prev?.viewedDemos || []), service?.id],
      lastAction: 'view_demo',
      timestamp: Date.now()
    }));
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
    setUserBehavior(prev => ({
      ...prev,
      viewedDetails: [...(prev?.viewedDetails || []), service?.id],
      lastAction: 'view_details',
      timestamp: Date.now()
    }));
  };

  const handleCreateBundle = (bundle) => {
    console.log('Bundle created:', bundle);
    setUserBehavior(prev => ({
      ...prev,
      createdBundles: [...(prev?.createdBundles || []), bundle?.id],
      lastAction: 'create_bundle',
      timestamp: Date.now()
    }));
  };

  const handleQuizStart = () => {
    console.log('Starting AI service quiz');
    // This would open a quiz modal or navigate to quiz page
  };

  const sortOptions = [
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 holographic-gradient opacity-20" />
          {/* Floating Particles */}
          {[...Array(20)]?.map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Services Catalog
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive suite of cutting-edge technology solutions designed to transform your business and drive innovation forward.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Services Available', value: '50+', icon: 'Package' },
              { label: 'Projects Completed', value: '200+', icon: 'CheckCircle' },
              { label: 'Client Satisfaction', value: '98%', icon: 'Star' },
              { label: 'Expert Developers', value: '50+', icon: 'Users' }
            ]?.map((stat, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 text-center border border-border/30 hover:border-primary/30 transition-all duration-300 hover:glow-primary"
              >
                <div className="p-3 rounded-lg bg-primary/20 w-fit mx-auto mb-3">
                  <Icon name={stat?.icon} size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-data font-bold text-foreground mb-1">
                  {stat?.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-1/4">
              <FilterSidebar
                onFiltersChange={handleFiltersChange}
                isCollapsed={isFilterSidebarCollapsed}
                onToggleCollapse={() => setIsFilterSidebarCollapsed(!isFilterSidebarCollapsed)}
              />
            </div>

            {/* Services Grid */}
            <div className="lg:w-3/4">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center space-x-4">
                  <h2 className="font-heading font-semibold text-foreground">
                    {filteredServices?.length} Services Found
                  </h2>
                  {Object.values(activeFilters)?.some(filters => filters?.length > 0) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveFilters({});
                        setFilteredServices(services);
                      }}
                      className="border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                      <Icon name="X" size={14} className="mr-1" />
                      Clear Filters
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e?.target?.value)}
                      className="appearance-none bg-muted/20 border border-border/30 rounded-lg px-4 py-2 pr-8 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    >
                      {sortOptions?.map((option) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </select>
                    <Icon 
                      name="ChevronDown" 
                      size={16} 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
                    />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-1 p-1 bg-muted/20 rounded-lg border border-border/30">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`}
                    >
                      <Icon name="Grid" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`}
                    >
                      <Icon name="List" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)]?.map((_, index) => (
                    <div key={index} className="glass rounded-2xl p-6 animate-pulse">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-muted/30 rounded-xl" />
                        <div className="flex-1">
                          <div className="h-4 bg-muted/30 rounded mb-2" />
                          <div className="h-3 bg-muted/20 rounded w-2/3" />
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-3 bg-muted/20 rounded" />
                        <div className="h-3 bg-muted/20 rounded w-3/4" />
                      </div>
                      <div className="h-10 bg-muted/30 rounded" />
                    </div>
                  ))}
                </div>
              )}

              {/* Services Grid */}
              {!isLoading && (
                <div className={`
                  ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-6'
                  }
                `}>
                  {filteredServices?.map((service, index) => (
                    <div
                      key={service?.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ServiceCard
                        service={service}
                        onAddToCart={handleAddToCart}
                        onViewDemo={handleViewDemo}
                        onViewDetails={handleViewDetails}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && filteredServices?.length === 0 && (
                <div className="text-center py-16">
                  <div className="p-6 rounded-full bg-muted/20 w-fit mx-auto mb-6">
                    <Icon name="Search" size={48} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground text-xl mb-3">
                    No Services Found
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We couldn't find any services matching your current filters. Try adjusting your search criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveFilters({});
                      setFilteredServices(services);
                    }}
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Reset Filters
                  </Button>
                </div>
              )}

              {/* Load More */}
              {!isLoading && filteredServices?.length > 0 && filteredServices?.length >= 9 && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/30 text-primary hover:bg-primary/10 hover:glow-primary transition-glow"
                  >
                    <Icon name="ChevronDown" size={16} className="mr-2" />
                    Load More Services
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative py-20 mt-20">
        <div className="absolute inset-0 holographic-gradient opacity-10" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Our team specializes in custom solutions tailored to your unique business needs. Let's discuss your project requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact-quote-generator">
              <Button
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90 glow-primary hover:glow-lg transition-glow"
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Get Custom Quote
              </Button>
            </Link>
            <Link to="/portfolio-showcase">
              <Button
                variant="outline"
                size="lg"
                className="border-secondary/30 text-secondary hover:bg-secondary/10 hover:glow-secondary transition-glow"
              >
                <Icon name="Eye" size={20} className="mr-2" />
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Modals and Floating Components */}
      {/* <BundleCreator
        isOpen={isBundleCreatorOpen}
        onClose={() => setIsBundleCreatorOpen(false)}
        availableServices={services}
        onCreateBundle={handleCreateBundle}
      /> */}
      <ServiceModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={() => {
          setIsServiceModalOpen(false);
          setSelectedService(null);
        }}
        onAddToCart={handleAddToCart}
      />
      <AIRecommendations
        userBehavior={userBehavior}
        onServiceSelect={handleAddToCart}
        onQuizStart={handleQuizStart}
      />
      <AIContextualSuggestions />
      <FloatingShoppingCart />
      <VoiceAssistant />
    </div>
  );
};

export default ServicesCatalog;