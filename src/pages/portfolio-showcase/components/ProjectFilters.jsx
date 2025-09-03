import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectFilters = ({ filters, activeFilters, onFilterChange, onClearAll }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const getActiveCount = () => {
    return Object.values(activeFilters)?.flat()?.length;
  };

  return (
    <div className="glass rounded-2xl p-6 border border-border/30 mb-8">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">Filter Projects</h3>
          {getActiveCount() > 0 && (
            <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary border border-primary/30 font-data">
              {getActiveCount()} active
            </span>
          )}
        </div>
        
        {getActiveCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Icon name="X" size={16} className="mr-2" />
            Clear All
          </Button>
        )}
      </div>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-6">
          {Object.entries(filters)?.map(([category, options]) => (
            <div key={category} className="space-y-3">
              <h4 className="font-medium text-foreground capitalize font-data">
                {category?.replace(/([A-Z])/g, ' $1')?.trim()}
              </h4>
              <div className="space-y-2">
                {options?.map((option) => (
                  <label
                    key={option?.value}
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={activeFilters?.[category]?.includes(option?.value) || false}
                      onChange={(e) => onFilterChange(category, option?.value, e?.target?.checked)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      activeFilters?.[category]?.includes(option?.value)
                        ? 'bg-primary border-primary glow-primary' :'border-border group-hover:border-primary/50'
                    }`}>
                      {activeFilters?.[category]?.includes(option?.value) && (
                        <Icon name="Check" size={12} className="text-primary-foreground" />
                      )}
                    </div>
                    <span className={`text-sm transition-colors ${
                      activeFilters?.[category]?.includes(option?.value)
                        ? 'text-primary' :'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      {option?.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({option?.count})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Filters */}
      <div className="lg:hidden space-y-4">
        {Object.entries(filters)?.map(([category, options]) => (
          <div key={category} className="border border-border/30 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between p-4 bg-muted/10 hover:bg-muted/20 transition-colors"
            >
              <span className="font-medium text-foreground capitalize font-data">
                {category?.replace(/([A-Z])/g, ' $1')?.trim()}
              </span>
              <div className="flex items-center space-x-2">
                {activeFilters?.[category]?.length > 0 && (
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                    {activeFilters?.[category]?.length}
                  </span>
                )}
                <Icon 
                  name={expandedCategory === category ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </div>
            </button>
            
            {expandedCategory === category && (
              <div className="p-4 space-y-3 border-t border-border/30">
                {options?.map((option) => (
                  <label
                    key={option?.value}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={activeFilters?.[category]?.includes(option?.value) || false}
                      onChange={(e) => onFilterChange(category, option?.value, e?.target?.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      activeFilters?.[category]?.includes(option?.value)
                        ? 'bg-primary border-primary glow-primary' :'border-border group-hover:border-primary/50'
                    }`}>
                      {activeFilters?.[category]?.includes(option?.value) && (
                        <Icon name="Check" size={14} className="text-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className={`text-sm transition-colors ${
                        activeFilters?.[category]?.includes(option?.value)
                          ? 'text-primary' :'text-muted-foreground group-hover:text-foreground'
                      }`}>
                        {option?.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({option?.count})
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Filter Tags */}
      <div className="mt-6 pt-6 border-t border-border/30">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Zap" size={16} className="text-accent" />
          <span className="text-sm font-medium text-foreground font-data">Quick Filters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Featured', category: 'featured', value: true },
            { label: 'Recent', category: 'timeframe', value: '2024' },
            { label: 'AI Projects', category: 'technology', value: 'ai' },
            { label: 'Mobile Apps', category: 'type', value: 'mobile' },
            { label: 'Enterprise', category: 'budget', value: 'enterprise' }
          ]?.map((quickFilter) => (
            <Button
              key={quickFilter?.label}
              variant={activeFilters?.[quickFilter?.category]?.includes(quickFilter?.value) ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(
                quickFilter?.category, 
                quickFilter?.value, 
                !activeFilters?.[quickFilter?.category]?.includes(quickFilter?.value)
              )}
              className={activeFilters?.[quickFilter?.category]?.includes(quickFilter?.value) 
                ? "bg-accent/20 text-accent border-accent/30 glow-accent" :"border-border/30 text-muted-foreground hover:text-foreground hover:border-accent/30"
              }
            >
              {quickFilter?.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;