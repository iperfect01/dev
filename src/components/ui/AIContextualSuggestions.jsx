import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AIContextualSuggestions = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  // Context-aware suggestions based on current page
  const getSuggestionsForPage = (pathname) => {
    const suggestionMap = {
      '/homepage': [
        {
          id: 1,
          title: 'Explore AI Solutions',
          description: 'Discover our cutting-edge AI development services',
          action: 'View Services',
          path: '/services-catalog',
          icon: 'Zap',
          priority: 'high'
        },
        {
          id: 2,
          title: 'See Success Stories',
          description: 'Browse our portfolio of innovative projects',
          action: 'View Portfolio',
          path: '/portfolio-showcase',
          icon: 'Star',
          priority: 'medium'
        }
      ],
      '/services-catalog': [
        {
          id: 3,
          title: 'Bundle Recommendation',
          description: 'AI + Mobile App Development (20% savings)',
          action: 'Add Bundle',
          path: '/e-commerce-store',
          icon: 'Package',
          priority: 'high'
        },
        {
          id: 4,
          title: 'Similar Projects',
          description: 'See how we solved similar challenges',
          action: 'View Cases',
          path: '/portfolio-showcase',
          icon: 'Eye',
          priority: 'medium'
        }
      ],
      '/portfolio-showcase': [
        {
          id: 5,
          title: 'Start Your Project',
          description: 'Get a custom quote for similar solutions',
          action: 'Get Quote',
          path: '/contact-quote-generator',
          icon: 'MessageCircle',
          priority: 'high'
        },
        {
          id: 6,
          title: 'Explore Services',
          description: 'See all available development services',
          action: 'Browse All',
          path: '/services-catalog',
          icon: 'Grid',
          priority: 'medium'
        }
      ],
      '/e-commerce-store': [
        {
          id: 7,
          title: 'Consultation Included',
          description: 'Free 1-hour strategy session with purchase',
          action: 'Learn More',
          path: '/contact-quote-generator',
          icon: 'Users',
          priority: 'high'
        },
        {
          id: 8,
          title: 'Success Examples',
          description: 'See results from similar projects',
          action: 'View Results',
          path: '/portfolio-showcase',
          icon: 'TrendingUp',
          priority: 'medium'
        }
      ],
      '/contact-quote-generator': [
        {
          id: 9,
          title: 'Instant Estimate',
          description: 'Use our iperfect AI-powered cost calculator',
          action: 'Calculate Now',
          path: '#calculator',
          icon: 'Calculator',
          priority: 'high'
        },
        {
          id: 10,
          title: 'Portfolio Review',
          description: 'See examples before you decide',
          action: 'Browse Work',
          path: '/portfolio-showcase',
          icon: 'FolderOpen',
          priority: 'medium'
        }
      ]
    };

    return suggestionMap?.[pathname] || [];
  };

  useEffect(() => {
    const newSuggestions = getSuggestionsForPage(location?.pathname);
    setSuggestions(newSuggestions);
    
    // Auto-show suggestions on page change
    if (newSuggestions?.length > 0) {
      setIsVisible(true);
      // Auto-expand for high priority suggestions
      const hasHighPriority = newSuggestions?.some(s => s?.priority === 'high');
      if (hasHighPriority) {
        setTimeout(() => setIsExpanded(true), 1000);
      }
    }
  }, [location?.pathname]);

  const handleSuggestionClick = (suggestion) => {
    if (suggestion?.path?.startsWith('#')) {
      // Handle anchor links or internal actions
      const element = document.querySelector(suggestion?.path);
      if (element) {
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle navigation
      window.location.href = suggestion?.path;
    }
    
    // Analytics tracking
    console.log('AI Suggestion clicked:', suggestion?.title);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const dismissSuggestions = () => {
    setIsVisible(false);
  };

  if (!isVisible || suggestions?.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm">
      {/* Collapsed State - Floating Button */}
      {!isExpanded && (
        <Button
          variant="default"
          size="lg"
          onClick={toggleExpanded}
          className="glass glow-primary hover:glow-lg transition-all duration-300 animate-float shadow-depth"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={20} className="text-primary-foreground" />
            <span className="font-data text-sm">iperfect AI Suggestions</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          </div>
        </Button>
      )}
      {/* Expanded State - Suggestions Panel */}
      {isExpanded && (
        <div className="glass rounded-2xl p-6 shadow-depth border border-primary/20 animate-slide-in-right">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <h3 className="font-heading font-semibold text-foreground">iperfect AI Suggestions</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Minimize2" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissSuggestions}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Suggestions List */}
          <div className="space-y-3">
            {suggestions?.map((suggestion, index) => (
              <div
                key={suggestion?.id}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer group hover:scale-102 ${
                  suggestion?.priority === 'high' ?'border-primary/30 bg-primary/5 hover:bg-primary/10 hover:glow-primary' :'border-border hover:border-secondary/30 bg-muted/20 hover:bg-secondary/5 hover:glow-secondary'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    suggestion?.priority === 'high' ?'bg-primary/20 text-primary' :'bg-secondary/20 text-secondary'
                  }`}>
                    <Icon name={suggestion?.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                      {suggestion?.title}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                      {suggestion?.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-data ${
                        suggestion?.priority === 'high' ? 'text-primary' : 'text-secondary'
                      }`}>
                        {suggestion?.action}
                      </span>
                      <Icon 
                        name="ArrowRight" 
                        size={12} 
                        className="text-muted-foreground group-hover:text-primary transition-colors" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-data">Powered by devperfection</span>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
                <span>Learning your preferences</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIContextualSuggestions;