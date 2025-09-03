import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    priceRange: true,
    delivery: true,
    bundles: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleCategoryChange = (categoryId, checked) => {
    const updatedCategories = checked
      ? [...filters?.categories, categoryId]
      : filters?.categories?.filter(id => id !== categoryId);
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handlePriceRangeChange = (range) => {
    onFiltersChange({
      ...filters,
      priceRange: range
    });
  };

  const handleDeliveryChange = (deliveryId, checked) => {
    const updatedDelivery = checked
      ? [...filters?.delivery, deliveryId]
      : filters?.delivery?.filter(id => id !== deliveryId);
    
    onFiltersChange({
      ...filters,
      delivery: updatedDelivery
    });
  };

  const categories = [
    { id: 'ai-solutions', name: 'AI Solutions', count: 12, icon: 'Zap' },
    { id: 'web-development', name: 'Web Development', count: 18, icon: 'Globe' },
    { id: 'mobile-apps', name: 'Mobile Apps', count: 15, icon: 'Smartphone' },
    { id: 'ui-ux-design', name: 'UI/UX Design', count: 22, icon: 'Palette' },
    { id: 'consulting', name: 'Consulting', count: 8, icon: 'Users' },
    { id: 'maintenance', name: 'Maintenance', count: 10, icon: 'Settings' }
  ];

  const priceRanges = [
    { id: 'under-1000', label: 'Under $1,000', min: 0, max: 1000 },
    { id: '1000-5000', label: '$1,000 - $500', min: 1000, max: 5000 },
    { id: '5000-10000', label: '$500 - $10,000', min: 5000, max: 10000 },
    { id: '10000-25000', label: '$10,000 - $2500', min: 10000, max: 25000 },
    { id: 'over-25000', label: 'Over $2500', min: 25000, max: Infinity }
  ];

  const deliveryOptions = [
    { id: 'express', name: 'Express Delivery', description: '1-2 weeks', icon: 'Zap' },
    { id: 'standard', name: 'Standard Delivery', description: '2-4 weeks', icon: 'Clock' },
    { id: 'extended', name: 'Extended Timeline', description: '1-3 months', icon: 'Calendar' }
  ];

  const aiBundles = [
    {
      id: 'startup-bundle',
      name: 'Startup Essentials',
      description: 'Website + Mobile App + Branding',
      originalPrice: 15000,
      bundlePrice: 12000,
      savings: 20,
      glow: 'glow-accent'
    },
    {
      id: 'enterprise-bundle',
      name: 'Enterprise Suite',
      description: 'Full Stack + AI + Consulting',
      originalPrice: 45000,
      bundlePrice: 35000,
      savings: 22,
      glow: 'glow-secondary'
    },
    {
      id: 'ai-bundle',
      name: 'AI Innovation Pack',
      description: 'Chatbot + Analytics + Automation',
      originalPrice: 25000,
      bundlePrice: 19000,
      savings: 24,
      glow: 'glow-primary'
    }
  ];

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-border/30 pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-3 group"
      >
        <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <Icon
          name={isExpanded ? "ChevronUp" : "ChevronDown"}
          size={16}
          className="text-muted-foreground group-hover:text-primary transition-colors"
        />
      </button>
      {isExpanded && children}
    </div>
  );

  return (
    <div className="glass rounded-2xl p-6 border border-primary/20 h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <span>Filters</span>
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <Icon name="X" size={16} className="mr-1" />
          Clear
        </Button>
      </div>
      {/* Categories */}
      <FilterSection
        title="Categories"
        isExpanded={expandedSections?.categories}
        onToggle={() => toggleSection('categories')}
      >
        <div className="space-y-3">
          {categories?.map((category) => (
            <div key={category?.id} className="flex items-center justify-between">
              <Checkbox
                label={
                  <div className="flex items-center space-x-2">
                    <Icon name={category?.icon} size={16} className="text-primary" />
                    <span className="text-sm">{category?.name}</span>
                  </div>
                }
                checked={filters?.categories?.includes(category?.id)}
                onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
              />
              <span className="text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded-full">
                {category?.count}
              </span>
            </div>
          ))}
        </div>
      </FilterSection>
      {/* Price Range */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections?.priceRange}
        onToggle={() => toggleSection('priceRange')}
      >
        <div className="space-y-2">
          {priceRanges?.map((range) => (
            <label key={range?.id} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="priceRange"
                value={range?.id}
                checked={filters?.priceRange === range?.id}
                onChange={() => handlePriceRangeChange(range?.id)}
                className="w-4 h-4 text-primary bg-transparent border-2 border-primary/30 focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {range?.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
      {/* Delivery Options */}
      <FilterSection
        title="Delivery Timeline"
        isExpanded={expandedSections?.delivery}
        onToggle={() => toggleSection('delivery')}
      >
        <div className="space-y-3">
          {deliveryOptions?.map((option) => (
            <Checkbox
              key={option?.id}
              label={
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <Icon name={option?.icon} size={16} className="text-secondary" />
                    <div>
                      <div className="text-sm font-medium">{option?.name}</div>
                      <div className="text-xs text-muted-foreground">{option?.description}</div>
                    </div>
                  </div>
                </div>
              }
              checked={filters?.delivery?.includes(option?.id)}
              onChange={(e) => handleDeliveryChange(option?.id, e?.target?.checked)}
            />
          ))}
        </div>
      </FilterSection>
      {/* AI-Suggested Bundles */}
      <FilterSection
        title="AI Recommended Bundles"
        isExpanded={expandedSections?.bundles}
        onToggle={() => toggleSection('bundles')}
      >
        <div className="space-y-4">
          {aiBundles?.map((bundle) => (
            <div
              key={bundle?.id}
              className={`p-4 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-all duration-300 cursor-pointer group ${bundle?.glow} hover:glow-lg`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm mb-1 group-hover:text-accent transition-colors">
                    {bundle?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {bundle?.description}
                  </p>
                </div>
                <div className="text-xs bg-success/20 text-success px-2 py-1 rounded-full border border-success/30">
                  {bundle?.savings}% OFF
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground line-through">
                    ${bundle?.originalPrice?.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-accent font-data">
                    ${bundle?.bundlePrice?.toLocaleString()}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-accent hover:text-accent hover:bg-accent/20 p-1"
                >
                  <Icon name="Plus" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>
      {/* AI Insights */}
      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Sparkles" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">AI Insight</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Based on your browsing, 87% of similar clients also purchased UI/UX Design services. 
          Consider bundling for 20% savings.
        </p>
      </div>
    </div>
  );
};

export default FilterSidebar;