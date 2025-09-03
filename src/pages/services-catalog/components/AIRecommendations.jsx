import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ userBehavior, onServiceSelect, onQuizStart }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState(0);

  const sampleRecommendations = [
    {
      id: 1,
      type: 'bundle',
      title: 'AI + Mobile Development Bundle',
      description: 'Perfect combination for modern businesses',
      services: ['AI Chatbot', 'Mobile App', 'API Integration'],
      originalPrice: 25000,
      bundlePrice: 19999,
      savings: 5001,
      confidence: 92,
      reason: 'Based on your interest in AI solutions and mobile development',
      icon: 'Package',
      color: 'primary'
    },
    {
      id: 2,
      type: 'upgrade',
      title: 'Enterprise AI Solution',
      description: 'Scale your AI implementation across the organization',
      services: ['Custom AI Model', 'Integration Suite', 'Training & Support'],
      originalPrice: 45000,
      bundlePrice: 39999,
      savings: 5001,
      confidence: 87,
      reason: 'Your browsing suggests enterprise-level requirements',
      icon: 'Zap',
      color: 'secondary'
    },
    {
      id: 3,
      type: 'complementary',
      title: 'Cloud Infrastructure Package',
      description: 'Essential foundation for your development projects',
      services: ['AWS Setup', 'DevOps Pipeline', 'Monitoring'],
      originalPrice: 15000,
      bundlePrice: 12999,
      savings: 2001,
      confidence: 78,
      reason: 'Commonly paired with your selected services',
      icon: 'Cloud',
      color: 'accent'
    }
  ];

  useEffect(() => {
    // Simulate AI analysis of user behavior
    // REMOVE AUTO SHOW LOGIC
    // const analyzeUserBehavior = () => {
    //   setTimeout(() => {
    //     setRecommendations(sampleRecommendations);
    //     setIsVisible(true);
    //   }, 2000);
    // };

    // analyzeUserBehavior();
  }, [userBehavior]);

  useEffect(() => {
    if (recommendations?.length > 1) {
      const interval = setInterval(() => {
        setCurrentRecommendation((prev) => (prev + 1) % recommendations?.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [recommendations?.length]);

  const handleAcceptRecommendation = (recommendation) => {
    onServiceSelect(recommendation);
    // Track acceptance for AI learning
    console.log('AI Recommendation accepted:', recommendation?.title);
  };

  const handleDismissRecommendation = (recommendationId) => {
    setRecommendations(prev => prev?.filter(r => r?.id !== recommendationId));
    // Track dismissal for AI learning
    console.log('AI Recommendation dismissed:', recommendationId);
  };

  if (!isVisible || recommendations?.length === 0) {
    return null;
  }

  const currentRec = recommendations?.[currentRecommendation];

  return (
    <div className="fixed bottom-6 right-6 z-30 max-w-sm animate-slide-in-right">
      {/* Main Recommendation Card */}
      <div className="glass rounded-2xl shadow-depth border border-primary/20 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg bg-${currentRec?.color}/20`}>
                <Icon name="Sparkles" size={16} className={`text-${currentRec?.color}`} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">AI Recommendation</h3>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-muted-foreground">Confidence:</span>
                  <span className={`text-xs font-data text-${currentRec?.color}`}>
                    {currentRec?.confidence}%
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDismissRecommendation(currentRec?.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Recommendation Info */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={currentRec?.icon} size={20} className={`text-${currentRec?.color}`} />
              <h4 className="font-medium text-foreground">{currentRec?.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {currentRec?.description}
            </p>
            <p className="text-xs text-muted-foreground italic">
              {currentRec?.reason}
            </p>
          </div>

          {/* Services Included */}
          <div className="mb-4">
            <h5 className="text-sm font-medium text-foreground mb-2">Includes:</h5>
            <div className="space-y-1">
              {currentRec?.services?.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={12} className="text-accent" />
                  <span className="text-xs text-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground line-through">
                ${currentRec?.originalPrice?.toLocaleString()}
              </span>
              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-data">
                Save ${currentRec?.savings?.toLocaleString()}
              </span>
            </div>
            <div className="text-xl font-data font-bold text-accent">
              ${currentRec?.bundlePrice?.toLocaleString()}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="default"
              fullWidth
              onClick={() => handleAcceptRecommendation(currentRec)}
              className={`bg-${currentRec?.color} hover:bg-${currentRec?.color}/90 glow-${currentRec?.color} transition-glow font-data`}
            >
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Add Bundle to Cart
            </Button>
            <Button
              variant="outline"
              fullWidth
              className="border-secondary/30 text-secondary hover:bg-secondary/10 font-data"
            >
              <Icon name="Info" size={16} className="mr-2" />
              Learn More
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        {recommendations?.length > 1 && (
          <div className="px-4 pb-4">
            <div className="flex space-x-1">
              {recommendations?.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentRecommendation 
                      ? `bg-${currentRec?.color} flex-1` 
                      : 'bg-muted/30 w-1'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Quiz Prompt */}
      <div className="mt-4 glass rounded-xl p-4 border border-secondary/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MessageSquare" size={16} className="text-secondary" />
          <span className="text-sm font-medium text-foreground">Get Better Recommendations</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Take our AI quiz for personalized service suggestions
        </p>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={onQuizStart}
          className="border-secondary/30 text-secondary hover:bg-secondary/10 font-data"
        >
          <Icon name="Brain" size={14} className="mr-2" />
          Start AI Quiz
        </Button>
      </div>
      {/* Learning Indicator */}
      <div className="mt-2 flex items-center justify-center space-x-1 text-xs text-muted-foreground">
        <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
        <span className="font-data">iperfect AI is learning your preferences</span>
      </div>
    </div>
  );
};

export default AIRecommendations;