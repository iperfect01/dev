import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'specifications', label: 'Specifications', icon: 'List' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'support', label: 'Support', icon: 'HelpCircle' }
  ];

  const specifications = [
    { label: 'Development Time', value: product?.developmentTime || '4-6 weeks' },
    { label: 'Technology Stack', value: product?.techStack || 'React, Node.js, MongoDB' },
    { label: 'Platforms', value: product?.platforms || 'Web, iOS, Android' },
    { label: 'Support Period', value: product?.support || '12 months included' },
    { label: 'Revisions', value: product?.revisions || 'Unlimited during development' },
    { label: 'Source Code', value: product?.sourceCode || 'Full ownership included' }
  ];

  const reviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      company: 'TechStart Inc.',
      rating: 5,
      date: '2025-08-10',
      comment: `Exceptional work! The AI chatbot exceeded our expectations and has significantly improved our customer service efficiency. The team was professional and delivered on time.`,
      verified: true,
      sentiment: 'positive'
    },
    {
      id: 2,
      author: 'Michael Chen',
      company: 'Digital Solutions LLC',
      rating: 5,
      date: '2025-08-05',
      comment: `Outstanding quality and attention to detail. The mobile app they developed has received excellent user feedback and our engagement rates have increased by 40%.`,
      verified: true,
      sentiment: 'positive'
    },
    {
      id: 3,
      author: 'Emily Rodriguez',
      company: 'Innovation Hub',
      rating: 4,
      date: '2025-07-28',
      comment: `Great experience overall. The project was delivered on schedule and the final product met all our requirements. Minor communication delays but nothing major.`,
      verified: true,
      sentiment: 'positive'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    onClose();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product?.fullDescription || product?.description}
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-3">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-accent" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-3">What's Included</h3>
              <div className="space-y-2">
                {(product?.included || [
                  'Complete source code',
                  'Documentation and guides',
                  '12 months of support',
                  'Free updates for 6 months',
                  'Training session included'
                ])?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Package" size={16} className="text-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-4">
            {specifications?.map((spec, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border/30">
                <span className="text-sm font-medium text-foreground">{spec?.label}</span>
                <span className="text-sm text-muted-foreground font-data">{spec?.value}</span>
              </div>
            ))}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/30">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent font-data">{product?.rating}</div>
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math.floor(product?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">{product?.reviews} reviews</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground mb-2">Review Distribution</div>
                  {[5, 4, 3, 2, 1]?.map((rating) => (
                    <div key={rating} className="flex items-center space-x-2 mb-1">
                      <span className="text-xs text-muted-foreground w-4">{rating}</span>
                      <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-warning rounded-full"
                          style={{ width: rating === 5 ? '75%' : rating === 4 ? '20%' : '5%' }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground w-8">
                        {rating === 5 ? '75%' : rating === 4 ? '20%' : '5%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews?.map((review) => (
                <div key={review?.id} className="p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-sm font-bold text-background">
                          {review?.author?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{review?.author}</span>
                          {review?.verified && (
                            <Icon name="CheckCircle" size={14} className="text-accent" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{review?.company}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={12}
                            className={i < review?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">{review?.date}</div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{review?.comment}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
                <Icon name="MessageCircle" size={24} className="text-primary mb-2" />
                <h4 className="font-medium text-foreground mb-1">24/7 Support</h4>
                <p className="text-sm text-muted-foreground">Get help anytime via chat, email, or phone</p>
              </div>
              <div className="p-4 rounded-xl border border-secondary/30 bg-secondary/5">
                <Icon name="Book" size={24} className="text-secondary mb-2" />
                <h4 className="font-medium text-foreground mb-1">Documentation</h4>
                <p className="text-sm text-muted-foreground">Comprehensive guides and API references</p>
              </div>
              <div className="p-4 rounded-xl border border-accent/30 bg-accent/5">
                <Icon name="Users" size={24} className="text-accent mb-2" />
                <h4 className="font-medium text-foreground mb-1">Training</h4>
                <p className="text-sm text-muted-foreground">Free onboarding and team training sessions</p>
              </div>
              <div className="p-4 rounded-xl border border-warning/30 bg-warning/5">
                <Icon name="Shield" size={24} className="text-warning mb-2" />
                <h4 className="font-medium text-foreground mb-1">Warranty</h4>
                <p className="text-sm text-muted-foreground">12-month warranty on all deliverables</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-lg">
      <div className="w-full max-w-6xl max-h-[90vh] glass rounded-2xl shadow-depth border border-primary/20 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-2 glow-primary">
              <Icon name="Package" size={32} className="text-background" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-foreground text-xl">{product?.name}</h2>
              <p className="text-sm text-muted-foreground">{product?.category}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
          {/* Left Panel - Product Preview */}
          <div className="lg:w-1/2 p-6 border-r border-border/50">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
                <div 
                  className="w-full h-full transition-transform duration-300"
                  style={{ 
                    transform: `scale(${zoom}) rotateX(${rotation?.x}deg) rotateY(${rotation?.y}deg)` 
                  }}
                >
                  <Image
                    src={product?.images?.[selectedImage] || product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 3D Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="glass text-primary hover:bg-primary/20"
                    onClick={() => setZoom(zoom === 1 ? 1.5 : 1)}
                  >
                    <Icon name={zoom === 1 ? "ZoomIn" : "ZoomOut"} size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="glass text-secondary hover:bg-secondary/20"
                    onClick={() => setRotation({ x: rotation?.x + 15, y: rotation?.y + 15 })}
                  >
                    <Icon name="RotateCw" size={16} />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {product?.images && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product?.images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-border/30'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product?.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Pricing and Actions */}
              <div className="space-y-4 pt-4 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    {product?.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through mr-2">
                        {formatPrice(product?.originalPrice)}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-accent font-data">
                      {formatPrice(product?.price)}
                    </span>
                  </div>
                  {product?.originalPrice && (
                    <div className="text-sm bg-success/10 text-success px-3 py-1 rounded-full border border-success/20">
                      Save {Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 p-0"
                    >
                      <Icon name="Minus" size={14} />
                    </Button>
                    <span className="w-12 text-center font-data">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Icon name="Plus" size={14} />
                    </Button>
                  </div>
                  <Button
                    variant="default"
                    fullWidth
                    iconName="ShoppingCart"
                    iconPosition="left"
                    onClick={handleAddToCart}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground glow-accent hover:glow-lg transition-glow"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Product Details */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-border/50">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab?.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;