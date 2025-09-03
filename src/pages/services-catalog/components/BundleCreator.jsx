import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BundleCreator = ({ isOpen, onClose, availableServices, onCreateBundle }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [bundleName, setBundleName] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverZone, setDragOverZone] = useState(false);
  const dropZoneRef = useRef(null);

  const handleDragStart = (e, service) => {
    setDraggedItem(service);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverZone(true);
  };

  const handleDragLeave = (e) => {
    if (!dropZoneRef?.current?.contains(e?.relatedTarget)) {
      setDragOverZone(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragOverZone(false);
    
    if (draggedItem && !selectedServices?.find(s => s?.id === draggedItem?.id)) {
      setSelectedServices(prev => [...prev, draggedItem]);
    }
    setDraggedItem(null);
  };

  const removeService = (serviceId) => {
    setSelectedServices(prev => prev?.filter(s => s?.id !== serviceId));
  };

  const calculateBundlePrice = () => {
    const totalPrice = selectedServices?.reduce((sum, service) => sum + service?.price, 0);
    const discount = selectedServices?.length >= 3 ? 0.15 : selectedServices?.length >= 2 ? 0.10 : 0;
    return {
      originalPrice: totalPrice,
      discountedPrice: totalPrice * (1 - discount),
      discount: discount * 100,
      savings: totalPrice * discount
    };
  };

  const handleCreateBundle = () => {
    if (selectedServices?.length < 2) return;
    
    const pricing = calculateBundlePrice();
    const bundle = {
      id: Date.now(),
      name: bundleName || `Custom Bundle ${selectedServices?.length} Services`,
      services: selectedServices,
      ...pricing,
      createdAt: new Date()
    };
    
    onCreateBundle(bundle);
    onClose();
    
    // Reset state
    setSelectedServices([]);
    setBundleName('');
  };

  if (!isOpen) return null;

  const pricing = calculateBundlePrice();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-6xl max-h-[90vh] glass rounded-2xl shadow-depth border border-primary/20 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent glow-primary">
                <Icon name="Package" size={24} className="text-background" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-foreground">Smart Bundle Creator</h2>
                <p className="text-sm text-muted-foreground">Drag and drop services to create your custom bundle</p>
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

        <div className="flex h-[600px]">
          {/* Available Services */}
          <div className="w-1/2 p-6 border-r border-border/30 overflow-y-auto">
            <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Icon name="Grid" size={18} className="text-secondary" />
              <span>Available Services</span>
            </h3>
            
            <div className="space-y-3">
              {availableServices?.map((service) => (
                <div
                  key={service?.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, service)}
                  className={`
                    p-4 rounded-xl border border-border/30 cursor-grab active:cursor-grabbing
                    transition-all duration-300 hover:border-primary/30 hover:glow-primary
                    ${selectedServices?.find(s => s?.id === service?.id) ? 'opacity-50 pointer-events-none' : ''}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-secondary/20">
                      <Icon name={service?.icon} size={20} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{service?.name}</h4>
                      <p className="text-sm text-muted-foreground">{service?.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-data font-bold text-accent">
                          ${service?.price?.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {service?.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bundle Builder */}
          <div className="w-1/2 p-6 flex flex-col">
            {/* Bundle Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Bundle Name (Optional)
              </label>
              <input
                type="text"
                value={bundleName}
                onChange={(e) => setBundleName(e?.target?.value)}
                placeholder="Enter custom bundle name"
                className="w-full px-3 py-2 bg-muted/20 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>

            {/* Drop Zone */}
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                flex-1 border-2 border-dashed rounded-xl p-6 transition-all duration-300
                ${dragOverZone 
                  ? 'border-primary bg-primary/5 glow-primary' 
                  : selectedServices?.length > 0 
                    ? 'border-border/30 bg-muted/10' :'border-border/20 bg-muted/5'
                }
              `}
            >
              {selectedServices?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <Icon name="Package" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Drop Services Here
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Drag services from the left to create your custom bundle
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
                    <Icon name="Package" size={18} className="text-primary" />
                    <span>Your Bundle ({selectedServices?.length} services)</span>
                  </h3>
                  
                  {selectedServices?.map((service, index) => (
                    <div
                      key={service?.id}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 border border-border/30 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="p-2 rounded-lg bg-accent/20">
                        <Icon name={service?.icon} size={16} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm">{service?.name}</h4>
                        <p className="text-xs text-muted-foreground">{service?.category}</p>
                      </div>
                      <span className="text-sm font-data font-bold text-accent">
                        ${service?.price?.toLocaleString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeService(service?.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 p-1"
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing Summary */}
            {selectedServices?.length > 0 && (
              <div className="mt-4 p-4 rounded-xl glass border border-accent/20">
                <h4 className="font-heading font-semibold text-foreground mb-3">Bundle Pricing</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Original Price:</span>
                    <span className="text-foreground line-through">
                      ${pricing?.originalPrice?.toLocaleString()}
                    </span>
                  </div>
                  
                  {pricing?.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bundle Discount ({pricing?.discount}%):</span>
                      <span className="text-accent">
                        -${pricing?.savings?.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  <div className="border-t border-border/30 pt-2">
                    <div className="flex justify-between">
                      <span className="font-heading font-semibold text-foreground">Bundle Price:</span>
                      <span className="text-xl font-data font-bold text-accent">
                        ${pricing?.discountedPrice?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Discount Tiers */}
                <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-xs text-muted-foreground mb-2">Bundle Discounts:</div>
                  <div className="space-y-1 text-xs">
                    <div className={`flex justify-between ${selectedServices?.length >= 2 ? 'text-accent' : 'text-muted-foreground'}`}>
                      <span>2+ services:</span>
                      <span>10% off</span>
                    </div>
                    <div className={`flex justify-between ${selectedServices?.length >= 3 ? 'text-accent' : 'text-muted-foreground'}`}>
                      <span>3+ services:</span>
                      <span>15% off</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-4 space-y-2">
              <Button
                variant="default"
                fullWidth
                onClick={handleCreateBundle}
                disabled={selectedServices?.length < 2}
                className="bg-primary hover:bg-primary/90 glow-primary transition-glow font-data"
              >
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Add Bundle to Cart
              </Button>
              
              {selectedServices?.length < 2 && (
                <p className="text-xs text-muted-foreground text-center">
                  Add at least 2 services to create a bundle
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleCreator;