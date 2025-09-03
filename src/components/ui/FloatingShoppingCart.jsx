import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const FloatingShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  // Sample cart data - in real app, this would come from context/state management
  const sampleCartItems = [
    {
      id: 1,
      name: 'AI Chatbot Development',
      price: 4999,
      quantity: 1,
      category: 'AI Solutions',
      image: '/assets/images/service-ai.jpg',
      features: ['Natural Language Processing', '24/7 Support', 'Multi-platform']
    },
    {
      id: 2,
      name: 'Mobile App Development',
      price: 8999,
      quantity: 1,
      category: 'Mobile Solutions',
      image: '/assets/images/service-mobile.jpg',
      features: ['iOS & Android', 'Cloud Integration', 'Push Notifications']
    },
    {
      id: 3,
      name: 'UI/UX Design Package',
      price: 2999,
      quantity: 1,
      category: 'Design Services',
      image: '/assets/images/service-design.jpg',
      features: ['User Research', 'Prototyping', 'Design System']
    }
  ];

  useEffect(() => {
    // Initialize cart with sample data
    setCartItems(sampleCartItems);
    
    // Show/hide cart based on current page
    const showCartPages = ['/services-catalog', '/e-commerce-store', '/contact-quote-generator'];
    setIsVisible(showCartPages?.includes(location?.pathname));
  }, [location?.pathname]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems?.filter(item => item?.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(cartItems?.map(item => 
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems?.reduce((total, item) => total + (item?.price * item?.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems?.reduce((total, item) => total + item?.quantity, 0);
  };

  const handleCheckout = () => {
    // Navigate to checkout or contact form
    window.location.href = '/contact-quote-generator';
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-20 right-6 z-40">
      {/* Cart Toggle Button */}
      <Button
        variant="default"
        size="lg"
        onClick={toggleCart}
        className={`glass glow-accent hover:glow-lg transition-all duration-300 relative ${
          isOpen ? 'bg-accent/20' : ''
        }`}
      >
        <div className="flex items-center space-x-2">
          <Icon name="ShoppingCart" size={20} className="text-accent" />
          <span className="font-data text-sm text-foreground">Cart</span>
          {getTotalItems() > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
              {getTotalItems()}
            </div>
          )}
        </div>
      </Button>
      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 max-w-[90vw] glass rounded-2xl shadow-depth border border-accent/20 animate-slide-in-right">
          {/* Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
                <Icon name="ShoppingBag" size={18} className="text-accent" />
                <span>Your Cart</span>
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCart}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="max-h-96 overflow-y-auto">
            {cartItems?.length === 0 ? (
              <div className="p-6 text-center">
                <Icon name="ShoppingCart" size={48} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/services-catalog'}
                  className="border-accent/30 text-accent hover:bg-accent/10"
                >
                  Browse Services
                </Button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cartItems?.map((item) => (
                  <div
                    key={item?.id}
                    className="flex items-start space-x-3 p-3 rounded-xl border border-border/30 hover:border-accent/30 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg bg-muted/20 flex items-center justify-center">
                      <Icon name="Package" size={24} className="text-accent" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm mb-1 truncate">
                        {item?.name}
                      </h4>
                      <p className="text-muted-foreground text-xs mb-2">
                        {item?.category}
                      </p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item?.features?.slice(0, 2)?.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {item?.features?.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{item?.features?.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item?.id, item?.quantity - 1)}
                            className="w-6 h-6 p-0 text-muted-foreground hover:text-foreground"
                          >
                            <Icon name="Minus" size={12} />
                          </Button>
                          <span className="text-sm font-data w-8 text-center">
                            {item?.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item?.id, item?.quantity + 1)}
                            className="w-6 h-6 p-0 text-muted-foreground hover:text-foreground"
                          >
                            <Icon name="Plus" size={12} />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="font-data text-sm text-accent">
                            ${(item?.price * item?.quantity)?.toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item?.id)}
                            className="w-6 h-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Icon name="Trash2" size={12} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems?.length > 0 && (
            <div className="p-4 border-t border-border/50">
              {/* Bundle Discount */}
              <div className="mb-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Gift" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-accent">Bundle Discount Applied</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Save 15% when purchasing 3+ services together
                </p>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-semibold text-foreground">Total</span>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground line-through">
                    ${getTotalPrice()?.toLocaleString()}
                  </div>
                  <div className="font-data font-bold text-lg text-accent">
                    ${Math.round(getTotalPrice() * 0.85)?.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleCheckout}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground glow-accent hover:glow-lg transition-glow"
                >
                  <Icon name="CreditCard" size={16} className="mr-2" />
                  Get Custom Quote
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => window.location.href = '/services-catalog'}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add More Services
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingShoppingCart;