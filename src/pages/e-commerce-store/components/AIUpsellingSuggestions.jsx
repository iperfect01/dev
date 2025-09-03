import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIUpsellingSuggestions = ({ currentProduct, allProducts, onAddToCart, onViewProduct }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentProduct) {
      generateSuggestions(currentProduct);
      setIsVisible(true);
      
      // Auto-cycle through suggestions
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % 3);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentProduct, allProducts]);

  const generateSuggestions = (product) => {
    const categoryMap = {
      'AI Solutions': ['Web Development', 'Mobile Apps', 'Consulting'],
      'Web Development': ['UI/UX Design', 'AI Solutions', 'Maintenance'],
      'Mobile Apps': ['UI/UX Design', 'Web Development', 'AI Solutions'],
      'UI/UX Design': ['Web Development', 'Mobile Apps', 'Consulting'],
      'Consulting': ['AI Solutions', 'Web Development', 'Maintenance'],
      'Maintenance': ['Web Development', 'Consulting', 'AI Solutions']
    };

    const complementaryCategories = categoryMap?.[product?.category] || [];
    
    const complementaryProducts = allProducts?.filter(p => 
      p?.id !== product?.id && 
      complementaryCategories?.includes(p?.category)
    );

    const suggestionReasons = {
      'AI Solutions': {
        'Web Development': 'Integrate AI features into your web platform for enhanced user experience',
        'Mobile Apps': 'Extend AI capabilities to mobile devices for broader reach',
        'Consulting': 'Get expert guidance on AI implementation strategy'
      },
      'Web Development': {
        'UI/UX Design': 'Enhance your website with professional design and user experience',
        'AI Solutions': 'Add intelligent features to make your website more interactive',
        'Maintenance': 'Keep your website secure and up-to-date with ongoing support'
      },
      'Mobile Apps': {
        'UI/UX Design': 'Create stunning mobile interfaces that users love',
        'Web Development': 'Build a companion web platform for your mobile app',
        'AI Solutions': 'Add smart features like personalization and automation'
      },
      'UI/UX Design': {
        'Web Development': 'Bring your designs to life with professional development',
        'Mobile Apps': 'Extend your design system to mobile platforms',
        'Consulting': 'Get strategic advice on user experience optimization'
      },
      'Consulting': {
        'AI Solutions': 'Implement the AI strategies we recommend',
        'Web Development': 'Build the digital solutions we\'ve planned together',
        'Maintenance': 'Ensure ongoing success with continuous support'
      },
      'Maintenance': {
        'Web Development': 'Expand your digital presence with new features',
        'Consulting': 'Get strategic guidance for your digital growth',
        'AI Solutions': 'Add intelligent automation to reduce maintenance needs'
      }
    };

    const generatedSuggestions = complementaryProducts?.slice(0, 3)?.map(p => ({
      ...p,
      reason: suggestionReasons?.[product?.category]?.[p?.category] || 'Frequently purchased together',
      confidence: Math.floor(Math.random() * 20) + 80, // 80-99% confidence
      discount: Math.floor(Math.random() * 15) + 10, // 10-25% discount
      urgency: Math.random() > 0.7 ? 'Limited time offer' : null
    }));

    setSuggestions(generatedSuggestions);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  if (!isVisible || suggestions?.length === 0) {
    return null;
  }

  const currentSuggestion = suggestions?.[currentIndex];

  return (
    <div className="fixed bottom-24 right-6 z-30 max-w-sm animate-slide-in-right">
      <div className="glass rounded-2xl p-6 shadow-depth border border-secondary/20 glow-secondary">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={18} className="text-secondary" />
            <h3 className="font-heading font-semibold text-foreground text-sm">iperfect AI Recommendation</h3>
          </div>
          <div className="flex items-center space-x-1">
            <div className="text-xs text-muted-foreground font-data">
              {currentSuggestion?.confidence}% match
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="w-6 h-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        </div>

        {/* Suggestion Card */}
        <div className="space-y-4">
          {/* Product Info */}
          <div className="flex items-start space-x-3">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
              <Icon name="Package" size={20} className="text-background" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                {currentSuggestion?.name}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                {currentSuggestion?.category}
              </p>
              
              {/* Pricing */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(currentSuggestion?.price)}
                </span>
                <span className="text-sm font-bold text-secondary font-data">
                  {formatPrice(calculateDiscountedPrice(currentSuggestion?.price, currentSuggestion?.discount))}
                </span>
                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
                  {currentSuggestion?.discount}% OFF
                </span>
              </div>
            </div>
          </div>

          {/* AI Reasoning */}
          <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
            <div className="flex items-start space-x-2">
              <Icon name="Brain" size={14} className="text-secondary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-foreground leading-relaxed">
                {currentSuggestion?.reason}
              </p>
            </div>
          </div>

          {/* Urgency Banner */}
          {currentSuggestion?.urgency && (
            <div className="p-2 rounded-lg bg-warning/10 border border-warning/30 text-center">
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Clock" size={12} className="text-warning" />
                <span className="text-xs font-medium text-warning">
                  {currentSuggestion?.urgency}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="Eye"
              iconPosition="left"
              onClick={() => onViewProduct(currentSuggestion)}
              className="border-secondary/30 text-secondary hover:bg-secondary/10 hover:glow-secondary text-xs"
            >
              View
            </Button>
            <Button
              variant="default"
              size="sm"
              fullWidth
              iconName="ShoppingCart"
              iconPosition="left"
              onClick={() => onAddToCart(currentSuggestion)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-secondary hover:glow-lg transition-glow text-xs"
            >
              Add to Cart
            </Button>
          </div>

          {/* Suggestion Navigation */}
          <div className="flex items-center justify-center space-x-2">
            {suggestions?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-secondary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={10} className="text-secondary" />
              <span>Powered by iperfect AI</span>
            </div>
            <span>Based on 10,000+ purchases</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIUpsellingSuggestions;