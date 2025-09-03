import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartBundleCreator = ({ products, onCreateBundle, isOpen, onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bundleName, setBundleName] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const dropZoneRef = useRef(null);

  if (!isOpen) return null;

  const handleDragStart = (e, product) => {
    setDraggedItem(product);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    if (draggedItem && !selectedProducts?.find(p => p?.id === draggedItem?.id)) {
      setSelectedProducts([...selectedProducts, draggedItem]);
    }
    setDraggedItem(null);
  };

  const removeFromBundle = (productId) => {
    setSelectedProducts(selectedProducts?.filter(p => p?.id !== productId));
  };

  const calculateBundlePrice = () => {
    const totalPrice = selectedProducts?.reduce((sum, product) => sum + product?.price, 0);
    const discount = selectedProducts?.length >= 3 ? 0.2 : selectedProducts?.length >= 2 ? 0.1 : 0;
    return {
      originalPrice: totalPrice,
      discountedPrice: totalPrice * (1 - discount),
      discount: discount * 100,
      savings: totalPrice * discount
    };
  };

  const getCompatibilityScore = () => {
    if (selectedProducts?.length < 2) return 0;
    
    // Simple compatibility logic based on categories
    const categories = selectedProducts?.map(p => p?.category);
    const uniqueCategories = [...new Set(categories)];
    
    // Higher score for complementary services
    const complementaryPairs = [
      ['AI Solutions', 'Web Development'],
      ['Web Development', 'UI/UX Design'],
      ['Mobile Apps', 'UI/UX Design'],
      ['AI Solutions', 'Mobile Apps']
    ];
    
    let score = 60; // Base score
    
    complementaryPairs?.forEach(pair => {
      if (categories?.includes(pair?.[0]) && categories?.includes(pair?.[1])) {
        score += 20;
      }
    });
    
    return Math.min(100, score);
  };

  const bundlePricing = calculateBundlePrice();
  const compatibilityScore = getCompatibilityScore();

  const suggestedProducts = products?.filter(product => 
    !selectedProducts?.find(selected => selected?.id === product?.id) &&
    selectedProducts?.some(selected => 
      product?.category !== selected?.category && 
      ['AI Solutions', 'Web Development', 'UI/UX Design', 'Mobile Apps']?.includes(product?.category)
    )
  )?.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-lg">
      <div className="w-full max-w-6xl max-h-[90vh] glass rounded-2xl shadow-depth border border-secondary/20 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary via-accent to-primary p-2 glow-secondary">
              <Icon name="Package" size={32} className="text-background" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-foreground text-xl">Smart Bundle Creator</h2>
              <p className="text-sm text-muted-foreground">Drag & drop to create custom service bundles</p>
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
          {/* Left Panel - Available Products */}
          <div className="lg:w-1/2 p-6 border-r border-border/50">
            <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Icon name="Grid" size={20} className="text-primary" />
              <span>Available Services</span>
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {products?.slice(0, 8)?.map((product) => (
                <div
                  key={product?.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, product)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-move hover:scale-102 ${
                    selectedProducts?.find(p => p?.id === product?.id)
                      ? 'border-muted/30 bg-muted/10 opacity-50' :'border-primary/30 bg-primary/5 hover:border-primary/50 hover:glow-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name="Package" size={20} className="text-background" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">{product?.name}</h4>
                      <p className="text-xs text-muted-foreground">{product?.category}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-bold text-accent font-data">
                          ${product?.price?.toLocaleString()}
                        </span>
                        <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* iperfect AI Suggestions */}
            {suggestedProducts?.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="Sparkles" size={16} className="text-secondary" />
                  <span>iperfect AI Suggested Additions</span>
                </h4>
                <div className="space-y-2">
                  {suggestedProducts?.map((product) => (
                    <button
                      key={product?.id}
                      onClick={() => setSelectedProducts([...selectedProducts, product])}
                      className="w-full p-3 rounded-lg border border-secondary/30 bg-secondary/5 hover:bg-secondary/10 text-left transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-foreground">{product?.name}</div>
                          <div className="text-xs text-muted-foreground">Increases compatibility by 15%</div>
                        </div>
                        <Icon name="Plus" size={16} className="text-secondary" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Bundle Builder */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Bundle Name */}
            <div className="p-6 border-b border-border/50">
              <label className="block text-sm font-medium text-foreground mb-2">Bundle Name</label>
              <input
                type="text"
                value={bundleName}
                onChange={(e) => setBundleName(e?.target?.value)}
                placeholder="Enter custom bundle name"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border/30 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Drop Zone */}
            <div className="flex-1 p-6">
              <div
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`min-h-64 rounded-xl border-2 border-dashed transition-all duration-300 ${
                  draggedItem 
                    ? 'border-accent bg-accent/10 glow-accent' :'border-border/50 bg-muted/10'
                }`}
              >
                {selectedProducts?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Icon name="Package" size={48} className="text-muted-foreground mb-4" />
                    <h4 className="font-medium text-foreground mb-2">Drop Services Here</h4>
                    <p className="text-sm text-muted-foreground">
                      Drag services from the left to create your custom bundle
                    </p>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    {selectedProducts?.map((product) => (
                      <div
                        key={product?.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/30"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="Package" size={16} className="text-accent" />
                          <div>
                            <div className="text-sm font-medium text-foreground">{product?.name}</div>
                            <div className="text-xs text-muted-foreground">{product?.category}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-data text-accent">
                            ${product?.price?.toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromBundle(product?.id)}
                            className="w-6 h-6 p-0 text-destructive hover:bg-destructive/10"
                          >
                            <Icon name="X" size={12} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bundle Analytics */}
              {selectedProducts?.length > 0 && (
                <div className="mt-6 space-y-4">
                  {/* Compatibility Score */}
                  <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Compatibility Score</span>
                      <span className="text-sm font-bold text-secondary">{compatibilityScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-secondary to-accent rounded-full transition-all duration-500"
                        style={{ width: `${compatibilityScore}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {compatibilityScore >= 80 ? 'Excellent synergy between services' :
                       compatibilityScore >= 60 ? 'Good compatibility detected': 'Consider adding complementary services'}
                    </p>
                  </div>

                  {/* Pricing Summary */}
                  <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Original Price</span>
                        <span className="text-sm line-through text-muted-foreground">
                          ${bundlePricing?.originalPrice?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Bundle Discount ({bundlePricing?.discount}%)</span>
                        <span className="text-sm text-success">
                          -${bundlePricing?.savings?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border/30">
                        <span className="font-medium text-foreground">Bundle Price</span>
                        <span className="text-xl font-bold text-accent font-data">
                          ${bundlePricing?.discountedPrice?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        setSelectedProducts([]);
                        setBundleName('');
                      }}
                      className="border-muted/30 text-muted-foreground hover:bg-muted/20"
                    >
                      Clear Bundle
                    </Button>
                    <Button
                      variant="default"
                      fullWidth
                      iconName="ShoppingCart"
                      iconPosition="left"
                      onClick={() => {
                        onCreateBundle({
                          name: bundleName || 'Custom Bundle',
                          products: selectedProducts,
                          pricing: bundlePricing,
                          compatibility: compatibilityScore
                        });
                        onClose();
                      }}
                      disabled={selectedProducts?.length === 0}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground glow-accent hover:glow-lg transition-glow"
                    >
                      Add Bundle to Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartBundleCreator;