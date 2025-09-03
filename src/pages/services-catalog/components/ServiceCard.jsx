import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ServiceCard = ({ service, onAddToCart, onViewDemo, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef?.current) return;

    const card = cardRef?.current;
    const rect = card?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const y = e?.clientY - rect?.top;
    const centerX = rect?.width / 2;
    const centerY = rect?.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'all 0.3s ease-out'
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const getComplexityColor = (complexity) => {
    const colors = {
      'basic': 'accent',
      'intermediate': 'warning', 
      'advanced': 'secondary',
      'enterprise': 'primary'
    };
    return colors?.[complexity] || 'primary';
  };

  // ✅ Updated: divide price by 10 before formatting
  const formatPrice = (price) => {
    const adjustedPrice = price / 10;
    if (adjustedPrice >= 1000) {
      return `$${(adjustedPrice / 1000)?.toFixed(0)}K`;
    }
    return `$${adjustedPrice}`;
  };

  return (
    <div
      ref={cardRef}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
    >
      {/* Main Card */}
      <div className={`
        relative glass rounded-2xl border border-border/30 overflow-hidden
        transition-all duration-300 ease-out
        ${isHovered ? 'glow-primary border-primary/30' : 'hover:border-primary/20'}
      `}>
        {/* Background Gradient */}
        <div className="absolute inset-0 holographic-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)]?.map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {/* Animated Icon */}
              <div className={`
                p-3 rounded-xl transition-all duration-300
                ${isHovered ? 'bg-primary/20 glow-primary scale-110' : 'bg-muted/20'}
              `}>
                <Icon 
                  name={service?.icon} 
                  size={24} 
                  className={`transition-colors duration-300 ${
                    isHovered ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
              </div>
              
              {/* Service Info */}
              <div>
                <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                  {service?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service?.category}
                </p>
              </div>
            </div>

            {/* Complexity Badge */}
            <div className={`
              px-3 py-1 rounded-full text-xs font-data font-medium
              bg-${getComplexityColor(service?.complexity)}/20 
              text-${getComplexityColor(service?.complexity)}
              border border-${getComplexityColor(service?.complexity)}/30
            `}>
              {service?.complexity}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {service?.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {service?.technologies?.slice(0, 4)?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full border border-secondary/20 font-data"
              >
                {tech}
              </span>
            ))}
            {service?.technologies?.length > 4 && (
              <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-full">
                +{service?.technologies?.length - 4}
              </span>
            )}
          </div>

          {/* Features */}
          <div className="space-y-2 mb-4">
            {service?.features?.slice(0, 3)?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-accent" />
                <span className="text-xs text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Demo Section */}
        {service?.hasDemo && (
          <div className="relative px-6 pb-4">
            <div className="p-3 rounded-lg bg-muted/10 border border-border/20 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Play" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Interactive Demo</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDemo(service)}
                  className="text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Icon name="ExternalLink" size={14} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Try before you buy - {service?.demoType}
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-data font-bold text-primary">
                {service?.timeline}
              </div>
              <div className="text-xs text-muted-foreground">Timeline</div>
            </div>
            <div>
              <div className="text-lg font-data font-bold text-secondary">
                {service?.projectsCompleted}+
              </div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-lg font-data font-bold text-accent">
                {service?.rating}★
              </div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>

        {/* Case Study Preview */}
        {service?.caseStudy && (
          <div className="px-6 pb-4">
            <div className="relative overflow-hidden rounded-lg group/case">
              <Image
                src={service?.caseStudy?.image}
                alt={service?.caseStudy?.title}
                className="w-full h-24 object-cover transition-transform duration-300 group-hover/case:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <h4 className="text-xs font-medium text-foreground truncate">
                  {service?.caseStudy?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {service?.caseStudy?.client}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(service)}
                className="absolute top-2 right-2 opacity-0 group-hover/case:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
              >
                <Icon name="Eye" size={14} />
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="relative p-6 pt-4 border-t border-border/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-data font-bold text-foreground">
                  {formatPrice(service?.price)}
                </span>
                {service?.originalPrice && service?.originalPrice > service?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(service?.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Starting from • {service?.paymentTerms}
              </p>
            </div>
            
            {service?.discount && (
              <div className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full font-data font-medium">
                -{service?.discount}%
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              variant="default"
              fullWidth
              onClick={() => onAddToCart(service)}
              className={`
                transition-all duration-300 font-data
                ${isHovered 
                  ? 'bg-primary hover:bg-primary/90 glow-primary' :'bg-primary/80 hover:bg-primary'
                }
              `}
            >
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Add to Cart
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(service)}
                className="border-secondary/30 text-secondary hover:bg-secondary/10 font-data"
              >
                <Icon name="Info" size={14} className="mr-1" />
                Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-accent/30 text-accent hover:bg-accent/10 font-data"
              >
                <Icon name="MessageCircle" size={14} className="mr-1" />
                Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Liquid Hover Effect */}
        <div className={`
          absolute inset-0 pointer-events-none rounded-2xl
          transition-all duration-500 ease-out
          ${isHovered 
            ? 'bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-100' :'opacity-0'
          }
        `} />
      </div>
      {/* Floating Badge */}
      {service?.isPopular && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full glow-accent animate-pulse">
            Popular
          </div>
        </div>
      )}
      {service?.isNew && (
        <div className="absolute -top-2 -left-2 z-10">
          <div className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full glow-secondary">
            New
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
