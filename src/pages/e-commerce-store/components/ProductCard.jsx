import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef?.current) return;
    
    const rect = cardRef?.current?.getBoundingClientRect();
    const centerX = rect?.left + rect?.width / 2;
    const centerY = rect?.top + rect?.height / 2;
    
    const rotateX = (e?.clientY - centerY) / 10;
    const rotateY = (centerX - e?.clientX) / 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setIsZoomed(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative glass rounded-2xl p-6 border border-primary/20 transition-all duration-500 cursor-pointer ${
        isHovered ? 'glow-primary scale-105' : 'hover:glow-primary hover:scale-102'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation?.x}deg) rotateY(${rotation?.y}deg)`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onViewDetails(product)}
    >
      {/* Product Badge */}
      {product?.badge && (
        <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-data font-bold ${
          product?.badge === 'Popular' ? 'bg-accent text-accent-foreground glow-accent' :
          product?.badge === 'New' ? 'bg-secondary text-secondary-foreground glow-secondary' :
          'bg-warning text-warning-foreground glow-warning'
        }`}>
          {product?.badge}
        </div>
      )}
      {/* 3D Preview Container */}
      <div className="relative mb-4 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40">
        <div className={`absolute inset-0 transition-transform duration-300 ${
          isZoomed ? 'scale-110' : 'scale-100'
        }`}>
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* 3D Controls Overlay */}
        <div className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center space-x-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="ghost"
            size="sm"
            className="glass text-primary hover:text-primary hover:bg-primary/20"
            onClick={(e) => {
              e?.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="glass text-secondary hover:text-secondary hover:bg-secondary/20"
            onClick={(e) => {
              e?.stopPropagation();
              // Rotate functionality
            }}
          >
            <Icon name="RotateCw" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="glass text-accent hover:text-accent hover:bg-accent/20"
            onClick={(e) => {
              e?.stopPropagation();
              // Lighting controls
            }}
          >
            <Icon name="Sun" size={16} />
          </Button>
        </div>

        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-secondary/10 opacity-50"></div>
      </div>
      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-heading font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
            {product?.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product?.description}
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {product?.features?.slice(0, 3)?.map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20"
            >
              {feature}
            </span>
          ))}
          {product?.features?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{product?.features?.length - 3} more
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={i < Math.floor(product?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-data">
            {product?.rating} ({product?.reviews})
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div>
            {product?.originalPrice && (
              <span className="text-sm text-muted-foreground line-through mr-2">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-accent font-data">
              {formatPrice(product?.price)}
            </span>
          </div>
          {product?.originalPrice && (
            <div className="text-xs bg-success/10 text-success px-2 py-1 rounded-full border border-success/20">
              Save {Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}%
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="ShoppingCart"
            iconPosition="left"
            className="bg-accent hover:bg-accent/90 text-accent-foreground glow-accent hover:glow-lg transition-all duration-300"
            onClick={(e) => {
              e?.stopPropagation();
              onAddToCart(product);
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            className="border-primary/30 text-primary hover:bg-primary/10 hover:glow-primary"
            onClick={(e) => {
              e?.stopPropagation();
              onViewDetails(product);
            }}
          >
            <span className="sr-only">View Details</span>
          </Button>
        </div>
      </div>
      {/* Holographic Border Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;