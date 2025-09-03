import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    technologies: [],
    complexity: [],
    priceRange: [],
    timeline: []
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);

  const filterCategories = [
    { id: 'ai-ml', label: 'AI & Machine Learning', icon: 'Brain', count: 12 },
    { id: 'web-dev', label: 'Web Development', icon: 'Globe', count: 18 },
    { id: 'mobile-dev', label: 'Mobile Development', icon: 'Smartphone', count: 15 },
    { id: 'blockchain', label: 'Blockchain', icon: 'Link', count: 8 },
    { id: 'cloud', label: 'Cloud Solutions', icon: 'Cloud', count: 14 },
    { id: 'iot', label: 'IoT Development', icon: 'Cpu', count: 10 },
    { id: 'ar-vr', label: 'AR/VR Solutions', icon: 'Eye', count: 6 },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: 'Shield', count: 9 }
  ];

  const technologies = [
    { id: 'react', label: 'React', icon: 'Code', count: 25 },
    { id: 'nodejs', label: 'Node.js', icon: 'Server', count: 22 },
    { id: 'python', label: 'Python', icon: 'FileCode', count: 20 },
    { id: 'aws', label: 'AWS', icon: 'Cloud', count: 18 },
    { id: 'tensorflow', label: 'TensorFlow', icon: 'Brain', count: 15 },
    { id: 'flutter', label: 'Flutter', icon: 'Smartphone', count: 12 },
    { id: 'solidity', label: 'Solidity', icon: 'Link', count: 8 },
    { id: 'unity', label: 'Unity', icon: 'Gamepad2', count: 6 }
  ];

  const complexityLevels = [
    { id: 'basic', label: 'Basic', description: 'Simple implementations', color: 'accent' },
    { id: 'intermediate', label: 'Intermediate', description: 'Moderate complexity', color: 'warning' },
    { id: 'advanced', label: 'Advanced', description: 'Complex solutions', color: 'secondary' },
    { id: 'enterprise', label: 'Enterprise', description: 'Large-scale systems', color: 'primary' }
  ];

  const priceRanges = [
    { id: 'budget', label: '$1K - $5K', description: 'Budget-friendly' },
    { id: 'standard', label: '$5K - $15K', description: 'Standard projects' },
    { id: 'premium', label: '$15K - $50K', description: 'Premium solutions' },
    { id: 'enterprise', label: '$50K+', description: 'Enterprise scale' }
  ];

  const timelines = [
    { id: 'rush', label: '1-2 weeks', description: 'Rush delivery' },
    { id: 'standard', label: '1-3 months', description: 'Standard timeline' },
    { id: 'extended', label: '3-6 months', description: 'Extended projects' },
    { id: 'ongoing', label: '6+ months', description: 'Long-term partnerships' }
  ];

  useEffect(() => {
    onFiltersChange(activeFilters);
  }, [activeFilters, onFiltersChange]);

  const handleFilterChange = (filterType, filterId, checked) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: checked 
        ? [...prev?.[filterType], filterId]
        : prev?.[filterType]?.filter(id => id !== filterId)
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      technologies: [],
      complexity: [],
      priceRange: [],
      timeline: []
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.reduce((total, filters) => total + filters?.length, 0);
  };

  const startVoiceSearch = () => {
    setIsVoiceSearchActive(true);
    // Voice search implementation would go here
    setTimeout(() => {
      setIsVoiceSearchActive(false);
      setSearchQuery('AI chatbot development');
    }, 2000);
  };

  const FilterSection = ({ title, children, defaultExpanded = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
      <div className="mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 rounded-lg glass hover:bg-primary/5 transition-all duration-300 group"
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
        {isExpanded && (
          <div className="mt-3 space-y-2 animate-fade-in">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile/Tablet Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleCollapse}
        className="lg:hidden fixed top-20 left-4 z-30 glass glow-primary"
      >
        <Icon name="Filter" size={20} />
        {getActiveFilterCount() > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
            {getActiveFilterCount()}
          </span>
        )}
      </Button>
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-16 left-0 h-screen lg:h-auto w-80 lg:w-full
        glass border-r border-border/50 z-20 overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} className="text-primary" />
              <h2 className="font-heading font-bold text-foreground">Filters</h2>
              {getActiveFilterCount() > 0 && (
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-data">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-12 py-3 bg-muted/20 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={startVoiceSearch}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 ${
                  isVoiceSearchActive ? 'text-secondary animate-pulse' : 'text-muted-foreground hover:text-secondary'
                }`}
              >
                <Icon name="Mic" size={14} />
              </Button>
            </div>
          </div>

          {/* Clear Filters */}
          {getActiveFilterCount() > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="w-full mb-6 border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <Icon name="X" size={14} className="mr-2" />
              Clear All Filters
            </Button>
          )}

          {/* Service Categories */}
          <FilterSection title="Service Categories">
            <div className="space-y-2">
              {filterCategories?.map((category) => (
                <label
                  key={category?.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20 cursor-pointer group transition-all duration-300"
                >
                  <Checkbox
                    checked={activeFilters?.categories?.includes(category?.id)}
                    onChange={(e) => handleFilterChange('categories', category?.id, e?.target?.checked)}
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <Icon 
                      name={category?.icon} 
                      size={16} 
                      className="text-primary group-hover:scale-110 transition-transform" 
                    />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {category?.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                    {category?.count}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Technologies */}
          <FilterSection title="Technologies">
            <div className="space-y-2">
              {technologies?.map((tech) => (
                <label
                  key={tech?.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20 cursor-pointer group transition-all duration-300"
                >
                  <Checkbox
                    checked={activeFilters?.technologies?.includes(tech?.id)}
                    onChange={(e) => handleFilterChange('technologies', tech?.id, e?.target?.checked)}
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <Icon 
                      name={tech?.icon} 
                      size={16} 
                      className="text-secondary group-hover:scale-110 transition-transform" 
                    />
                    <span className="text-sm text-foreground group-hover:text-secondary transition-colors">
                      {tech?.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                    {tech?.count}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Complexity */}
          <FilterSection title="Project Complexity">
            <div className="space-y-2">
              {complexityLevels?.map((level) => (
                <label
                  key={level?.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-border/30 hover:border-primary/30 cursor-pointer group transition-all duration-300"
                >
                  <Checkbox
                    checked={activeFilters?.complexity?.includes(level?.id)}
                    onChange={(e) => handleFilterChange('complexity', level?.id, e?.target?.checked)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {level?.label}
                      </span>
                      <div className={`w-2 h-2 rounded-full bg-${level?.color}`}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {level?.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range">
            <div className="space-y-2">
              {priceRanges?.map((range) => (
                <label
                  key={range?.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20 cursor-pointer group transition-all duration-300"
                >
                  <Checkbox
                    checked={activeFilters?.priceRange?.includes(range?.id)}
                    onChange={(e) => handleFilterChange('priceRange', range?.id, e?.target?.checked)}
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {range?.label}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {range?.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Timeline */}
          <FilterSection title="Timeline" defaultExpanded={false}>
            <div className="space-y-2">
              {timelines?.map((timeline) => (
                <label
                  key={timeline?.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20 cursor-pointer group transition-all duration-300"
                >
                  <Checkbox
                    checked={activeFilters?.timeline?.includes(timeline?.id)}
                    onChange={(e) => handleFilterChange('timeline', timeline?.id, e?.target?.checked)}
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground group-hover:text-warning transition-colors">
                      {timeline?.label}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {timeline?.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* iperfect AI Suggestions */}
          <div className="mt-8 p-4 rounded-xl glass border border-primary/20 glow-primary">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <h3 className="font-heading font-semibold text-primary">iperfect AI Suggestions</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Based on your browsing, you might be interested in:
            </p>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                <span className="text-sm text-primary">AI + Mobile Bundle</span>
                <p className="text-xs text-muted-foreground">Save 20% on combined services</p>
              </button>
              <button className="w-full text-left p-2 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                <span className="text-sm text-secondary">Enterprise Package</span>
                <p className="text-xs text-muted-foreground">Full-stack solution</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-10"
          onClick={onToggleCollapse}
        />
      )}
    </>
  );
};

export default FilterSidebar;