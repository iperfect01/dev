import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ServiceModal = ({ service, isOpen, onClose, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

  if (!isOpen || !service) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'features', label: 'Features', icon: 'CheckSquare' },
    { id: 'process', label: 'Process', icon: 'GitBranch' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Briefcase' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Discovery & Planning',
      description: 'We analyze your requirements and create a detailed project roadmap',
      duration: '1-2 weeks',
      deliverables: ['Requirements Document', 'Technical Specification', 'Project Timeline']
    },
    {
      step: 2,
      title: 'Design & Architecture',
      description: 'Creating the blueprint and visual design for your solution',
      duration: '2-3 weeks',
      deliverables: ['System Architecture', 'UI/UX Designs', 'Database Schema']
    },
    {
      step: 3,
      title: 'Development & Testing',
      description: 'Building your solution with continuous testing and quality assurance',
      duration: '4-8 weeks',
      deliverables: ['Core Functionality', 'Testing Reports', 'Documentation']
    },
    {
      step: 4,
      title: 'Deployment & Launch',
      description: 'Deploying to production and ensuring smooth operation',
      duration: '1 week',
      deliverables: ['Live System', 'Training Materials', 'Support Documentation']
    }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'E-commerce AI Assistant',
      client: 'TechMart Inc.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      results: ['40% increase in conversions', '60% reduction in support tickets', '24/7 customer service'],
      technologies: ['Python', 'TensorFlow', 'React', 'AWS']
    },
    {
      id: 2,
      title: 'Healthcare Chatbot',
      client: 'MediCare Solutions',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      results: ['50% faster patient triage', '90% accuracy in symptom assessment', 'HIPAA compliant'],
      technologies: ['NLP', 'Node.js', 'MongoDB', 'Azure']
    },
    {
      id: 3,
      title: 'Financial Advisory Bot',
      client: 'WealthTech Pro',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      results: ['30% increase in user engagement', '25% growth in portfolio value', 'Real-time market insights'],
      technologies: ['Machine Learning', 'React Native', 'PostgreSQL', 'Docker']
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: 4999,
      description: 'Perfect for small businesses',
      features: [
        'Basic AI chatbot',
        'Up to 1000 conversations/month',
        'Email support',
        '3 months maintenance',
        'Basic analytics'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 9999,
      description: 'Ideal for growing companies',
      features: [
        'Advanced AI with NLP',
        'Up to 10,000 conversations/month',
        'Priority support',
        '6 months maintenance',
        'Advanced analytics',
        'Custom integrations',
        'Multi-language support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 19999,
      description: 'For large organizations',
      features: [
        'Custom AI model training',
        'Unlimited conversations',
        '24/7 dedicated support',
        '12 months maintenance',
        'Real-time analytics',
        'Full API access',
        'White-label solution',
        'On-premise deployment'
      ],
      popular: false
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Hero Video/Image */}
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={service?.heroImage || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'}
                alt={service?.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm hover:bg-primary/30 glow-primary"
              >
                <Icon name={isVideoPlaying ? "Pause" : "Play"} size={24} className="text-primary" />
              </Button>
            </div>
            {/* Description */}
            <div>
              <h3 className="font-heading font-bold text-foreground mb-3">About This Service</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service?.longDescription || `${service?.description} Our comprehensive ${service?.name?.toLowerCase()} solution combines cutting-edge technology with industry best practices to deliver exceptional results for your business. We leverage the latest advancements in artificial intelligence and machine learning to create solutions that not only meet your current needs but also scale with your future growth.`}
              </p>
            </div>
            {/* Key Benefits */}
            <div>
              <h3 className="font-heading font-bold text-foreground mb-3">Key Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: 'Zap', title: 'Fast Implementation', description: 'Quick deployment with minimal disruption' },
                  { icon: 'Shield', title: 'Enterprise Security', description: 'Bank-level security and compliance' },
                  { icon: 'TrendingUp', title: 'Scalable Solution', description: 'Grows with your business needs' },
                  { icon: 'Users', title: 'Expert Support', description: '24/7 technical support and maintenance' }
                ]?.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg glass border border-border/30">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Icon name={benefit?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{benefit?.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Technologies */}
            <div>
              <h3 className="font-heading font-bold text-foreground mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {service?.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-secondary/10 text-secondary rounded-lg border border-secondary/20 font-data"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-foreground">Detailed Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service?.features?.map((feature, index) => (
                <div key={index} className="p-4 rounded-xl glass border border-border/30 hover:border-primary/30 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Check" size={16} className="text-accent" />
                    <h4 className="font-medium text-foreground">{feature}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Detailed explanation of how this feature benefits your business and improves your operations.
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-foreground">Our Development Process</h3>
            <div className="space-y-6">
              {processSteps?.map((step, index) => (
                <div key={index} className="relative">
                  {index < processSteps?.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-primary to-secondary" />
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                      <span className="text-background font-bold">{step?.step}</span>
                    </div>
                    <div className="flex-1 p-4 rounded-xl glass border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-heading font-semibold text-foreground">{step?.title}</h4>
                        <span className="text-sm text-primary font-data">{step?.duration}</span>
                      </div>
                      <p className="text-muted-foreground mb-3">{step?.description}</p>
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Deliverables:</h5>
                        <div className="flex flex-wrap gap-2">
                          {step?.deliverables?.map((deliverable, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20"
                            >
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-foreground">Success Stories</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {portfolioItems?.map((item) => (
                <div key={item?.id} className="glass rounded-xl border border-border/30 overflow-hidden hover:border-primary/30 transition-colors">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-heading font-semibold text-foreground mb-1">{item?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{item?.client}</p>
                    
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-foreground mb-2">Results:</h5>
                      <div className="space-y-1">
                        {item?.results?.map((result, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Icon name="TrendingUp" size={12} className="text-accent" />
                            <span className="text-xs text-foreground">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {item?.technologies?.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-foreground">Pricing Options</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pricingTiers?.map((tier, index) => (
                <div
                  key={index}
                  className={`
                    relative p-6 rounded-xl border transition-all duration-300
                    ${tier?.popular 
                      ? 'glass border-primary/30 glow-primary scale-105' :'glass border-border/30 hover:border-secondary/30'
                    }
                  `}
                >
                  {tier?.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full glow-primary">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h4 className="font-heading font-bold text-foreground text-xl mb-2">{tier?.name}</h4>
                    <p className="text-muted-foreground text-sm mb-4">{tier?.description}</p>
                    <div className="text-3xl font-data font-bold text-primary">
                      ${tier?.price?.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">One-time payment</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {tier?.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Icon name="Check" size={14} className="text-accent" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant={tier?.popular ? "default" : "outline"}
                    fullWidth
                    onClick={() => onAddToCart({ ...service, selectedTier: tier })}
                    className={
                      tier?.popular 
                        ? "bg-primary hover:bg-primary/90 glow-primary transition-glow" :"border-secondary/30 text-secondary hover:bg-secondary/10"
                    }
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Choose {tier?.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm">
      <div className="w-full max-w-6xl max-h-[90vh] glass rounded-2xl shadow-depth border border-primary/20 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent glow-primary">
                <Icon name={service?.icon} size={24} className="text-background" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-foreground text-2xl">{service?.name}</h1>
                <p className="text-muted-foreground">{service?.category}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border/30">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 px-6 py-4 border-b-2 transition-all duration-300 whitespace-nowrap
                  ${activeTab === tab?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20'
                  }
                `}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="font-data">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border/30 bg-muted/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <div className="text-2xl font-data font-bold text-primary">
                  ${service?.price?.toLocaleString() || '9,999'}
                </div>
                <p className="text-sm text-muted-foreground">Starting from</p>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{service?.timeline}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} />
                  <span>{service?.rating}★ ({service?.reviews || 127} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-secondary/30 text-secondary hover:bg-secondary/10"
              >
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Get Quote
              </Button>
              <Button
                variant="default"
                onClick={() => onAddToCart(service)}
                className="bg-primary hover:bg-primary/90 glow-primary transition-glow"
              >
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;