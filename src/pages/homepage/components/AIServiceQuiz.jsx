import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIServiceQuiz = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const quizSteps = [
    {
      id: 'welcome',
      type: 'message',
      message: "Hi! I\'m your iperfect AI. Let\'s find the perfect solution for your business. What\'s your primary goal?",
      options: [
        { id: 'growth', label: 'Scale my business', icon: 'TrendingUp' },
        { id: 'efficiency', label: 'Improve efficiency', icon: 'Zap' },
        { id: 'innovation', label: 'Drive innovation', icon: 'Lightbulb' },
        { id: 'customer', label: 'Enhance customer experience', icon: 'Heart' }
      ]
    },
    {
      id: 'industry',
      type: 'message',
      message: "Great choice! What industry are you in?",
      options: [
        { id: 'tech', label: 'Technology', icon: 'Cpu' },
        { id: 'finance', label: 'Finance', icon: 'DollarSign' },
        { id: 'healthcare', label: 'Healthcare', icon: 'Activity' },
        { id: 'retail', label: 'Retail/E-commerce', icon: 'ShoppingBag' },
        { id: 'education', label: 'Education', icon: 'BookOpen' },
        { id: 'other', label: 'Other', icon: 'Building' }
      ]
    },
    {
      id: 'budget',
      type: 'message',
      message: "What\'s your project budget range?",
      options: [
        { id: 'small', label: '$10K - $25K', icon: 'DollarSign' },
        { id: 'medium', label: '$25K - $50K', icon: 'DollarSign' },
        { id: 'large', label: '$50K - $100K', icon: 'DollarSign' },
        { id: 'enterprise', label: '$100K+', icon: 'DollarSign' }
      ]
    },
    {
      id: 'timeline',
      type: 'message',
      message: "When do you need this completed?",
      options: [
        { id: 'urgent', label: '1-2 months', icon: 'Clock' },
        { id: 'normal', label: '3-6 months', icon: 'Calendar' },
        { id: 'flexible', label: '6+ months', icon: 'Timer' }
      ]
    }
  ];

  const getRecommendations = (userAnswers) => {
    const serviceMap = {
      growth: {
        tech: ['AI & Machine Learning', 'Cloud Architecture', 'Mobile Innovation'],
        finance: ['Blockchain Solutions', 'AI & Machine Learning', 'Cloud Architecture'],
        healthcare: ['AI & Machine Learning', 'IoT & Edge Computing', 'Mobile Innovation'],
        retail: ['AI & Machine Learning', 'Mobile Innovation', 'Immersive Web Experiences'],
        education: ['AI & Machine Learning', 'Immersive Web Experiences', 'Mobile Innovation'],
        other: ['AI & Machine Learning', 'Cloud Architecture', 'Mobile Innovation']
      },
      efficiency: {
        tech: ['Cloud Architecture', 'AI & Machine Learning', 'IoT & Edge Computing'],
        finance: ['AI & Machine Learning', 'Cloud Architecture', 'Blockchain Solutions'],
        healthcare: ['IoT & Edge Computing', 'AI & Machine Learning', 'Cloud Architecture'],
        retail: ['AI & Machine Learning', 'Cloud Architecture', 'IoT & Edge Computing'],
        education: ['AI & Machine Learning', 'Cloud Architecture', 'Immersive Web Experiences'],
        other: ['AI & Machine Learning', 'Cloud Architecture', 'IoT & Edge Computing']
      },
      innovation: {
        tech: ['Immersive Web Experiences', 'AI & Machine Learning', 'Blockchain Solutions'],
        finance: ['Blockchain Solutions', 'AI & Machine Learning', 'Immersive Web Experiences'],
        healthcare: ['AI & Machine Learning', 'IoT & Edge Computing', 'Immersive Web Experiences'],
        retail: ['Immersive Web Experiences', 'AI & Machine Learning', 'Mobile Innovation'],
        education: ['Immersive Web Experiences', 'AI & Machine Learning', 'Mobile Innovation'],
        other: ['Immersive Web Experiences', 'AI & Machine Learning', 'Blockchain Solutions']
      },
      customer: {
        tech: ['Immersive Web Experiences', 'Mobile Innovation', 'AI & Machine Learning'],
        finance: ['Mobile Innovation', 'AI & Machine Learning', 'Immersive Web Experiences'],
        healthcare: ['Mobile Innovation', 'AI & Machine Learning', 'IoT & Edge Computing'],
        retail: ['Immersive Web Experiences', 'Mobile Innovation', 'AI & Machine Learning'],
        education: ['Immersive Web Experiences', 'Mobile Innovation', 'AI & Machine Learning'],
        other: ['Mobile Innovation', 'Immersive Web Experiences', 'AI & Machine Learning']
      }
    };

    const goal = userAnswers?.welcome;
    const industry = userAnswers?.industry;
    const budget = userAnswers?.budget;
    const timeline = userAnswers?.timeline;

    const services = serviceMap?.[goal]?.[industry] || serviceMap?.[goal]?.['other'] || [];
    
    return services?.slice(0, 3)?.map((service, index) => ({
      name: service,
      confidence: 95 - (index * 5),
      reason: getReasonForRecommendation(service, goal, industry, budget, timeline)
    }));
  };

  const getReasonForRecommendation = (service, goal, industry, budget, timeline) => {
    const reasons = {
      'AI & Machine Learning': `Perfect for ${goal} in ${industry}. AI can automate processes and provide intelligent insights.`,
      'Immersive Web Experiences': `Ideal for ${goal}. 3D visuals and interactive elements will set you apart in ${industry}.`,
      'Mobile Innovation': `Essential for ${goal}. Mobile-first approach is crucial for ${industry} success.`,
      'Cloud Architecture': `Scalable solution for ${goal}. Cloud infrastructure supports growth in ${industry}.`,
      'Blockchain Solutions': `Revolutionary for ${goal}. Blockchain technology offers transparency and security in ${industry}.`,
      'IoT & Edge Computing': `Smart choice for ${goal}. Connected devices and real-time processing benefit ${industry}.`
    };
    return reasons?.[service] || `Recommended based on your ${goal} goals in ${industry}.`;
  };

  const typeMessage = (message) => {
    setIsTyping(true);
    setCurrentMessage('');
    
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < message?.length) {
        setCurrentMessage(message?.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 50);
  };

  const handleAnswer = (stepId, answerId) => {
    const newAnswers = { ...answers, [stepId]: answerId };
    setAnswers(newAnswers);

    if (currentStep < quizSteps?.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeout(() => {
        typeMessage(quizSteps?.[currentStep + 1]?.message);
      }, 500);
    } else {
      // Generate recommendations
      const recs = getRecommendations(newAnswers);
      setRecommendations(recs);
      setTimeout(() => {
        typeMessage("Based on your answers, here are my top recommendations:");
      }, 500);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendations([]);
    setCurrentMessage('');
    setTimeout(() => {
      typeMessage(quizSteps?.[0]?.message);
    }, 300);
  };

  useEffect(() => {
    if (isOpen && currentMessage === '') {
      setTimeout(() => {
        typeMessage(quizSteps?.[0]?.message);
      }, 500);
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating AI Assistant Button */}
      <motion.div
        className="fixed top-1/2 right-0 transform -translate-y-1/2 z-30"
        initial={{ x: 100 }}
        animate={{ x: isOpen ? 100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="default"
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-background glow-secondary hover:glow-lg transition-all duration-300 rounded-l-2xl rounded-r-none shadow-depth"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Bot" size={20} />
            <span className="font-data text-sm">AI Quiz</span>
          </div>
        </Button>
      </motion.div>
      {/* Quiz Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-1/2 right-6 transform -translate-y-1/2 w-96 max-w-[90vw] z-40"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", damping: 25 }}
          >
            <div className="glass rounded-2xl shadow-depth border border-secondary/20 overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-border/50 bg-gradient-to-r from-secondary/10 to-accent/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent p-2 glow-secondary">
                      <Icon name="Bot" size={24} className="text-background" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">iperfect AI</h3>
                      <p className="text-xs text-muted-foreground font-data">Finding your perfect solution</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              </div>

              {/* Chat Area */}
              <div className="p-4 max-h-96 overflow-y-auto">
                {/* AI Message */}
                <div className="mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Bot" size={16} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-muted/20 rounded-2xl rounded-tl-sm p-3 border border-border/30">
                        <p className="text-sm text-foreground">
                          {currentMessage}
                          {isTyping && (
                            <motion.span
                              className="inline-block w-1 h-4 bg-secondary ml-1"
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Options */}
                {!isTyping && currentStep < quizSteps?.length && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {quizSteps?.[currentStep]?.options?.map((option, index) => (
                      <motion.button
                        key={option?.id}
                        onClick={() => handleAnswer(quizSteps?.[currentStep]?.id, option?.id)}
                        className="w-full p-3 rounded-xl border border-border/30 hover:border-secondary/50 bg-muted/10 hover:bg-secondary/5 text-left transition-all duration-300 group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + (index * 0.1) }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center group-hover:glow-secondary transition-all duration-300">
                            <Icon name={option?.icon} size={16} className="text-secondary" />
                          </div>
                          <span className="text-sm font-medium text-foreground group-hover:text-secondary transition-colors">
                            {option?.label}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Recommendations */}
                {recommendations?.length > 0 && !isTyping && (
                  <motion.div
                    className="mt-6 space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {recommendations?.map((rec, index) => (
                      <motion.div
                        key={index}
                        className="p-4 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + (index * 0.2) }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground text-sm">{rec?.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Icon name="Zap" size={12} className="text-accent" />
                            <span className="text-xs font-data text-accent">{rec?.confidence}%</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {rec?.reason}
                        </p>
                      </motion.div>
                    ))}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="default"
                        size="sm"
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground glow-accent hover:glow-lg transition-all duration-300"
                        onClick={() => window.location.href = '/services-catalog'}
                      >
                        View Services
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="RotateCcw"
                        className="border-secondary/30 text-secondary hover:bg-secondary/10"
                        onClick={resetQuiz}
                      >
                        Retake
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-border/50 bg-muted/5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-data">Powered by iperfect AI Recommendations</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
                    <span>Step {Math.min(currentStep + 1, quizSteps?.length)} of {quizSteps?.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIServiceQuiz;