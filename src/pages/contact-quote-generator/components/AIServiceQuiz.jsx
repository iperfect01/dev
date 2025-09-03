import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIServiceQuiz = ({ onServiceRecommendation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const questions = [
    {
      id: 'business_type',
      question: 'What type of business are you in?',
      type: 'single',
      options: [
        { value: 'startup', label: 'Startup/New Business', icon: 'Rocket' },
        { value: 'ecommerce', label: 'E-commerce/Retail', icon: 'ShoppingBag' },
        { value: 'saas', label: 'SaaS/Software', icon: 'Monitor' },
        { value: 'healthcare', label: 'Healthcare/Medical', icon: 'Heart' },
        { value: 'finance', label: 'Finance/Banking', icon: 'DollarSign' },
        { value: 'education', label: 'Education/Training', icon: 'BookOpen' },
        { value: 'other', label: 'Other Industry', icon: 'Building' }
      ]
    },
    {
      id: 'primary_goal',
      question: 'What\'s your primary goal for this project?',
      type: 'single',
      options: [
        { value: 'increase_sales', label: 'Increase Sales & Revenue', icon: 'TrendingUp' },
        { value: 'improve_efficiency', label: 'Improve Business Efficiency', icon: 'Zap' },
        { value: 'customer_experience', label: 'Enhance Customer Experience', icon: 'Users' },
        { value: 'digital_presence', label: 'Build Digital Presence', icon: 'Globe' },
        { value: 'automate_processes', label: 'Automate Manual Processes', icon: 'Settings' },
        { value: 'data_insights', label: 'Get Better Data Insights', icon: 'BarChart' }
      ]
    },
    {
      id: 'current_challenges',
      question: 'What challenges are you currently facing?',
      type: 'multiple',
      options: [
        { value: 'outdated_website', label: 'Outdated Website/App', icon: 'RefreshCw' },
        { value: 'manual_processes', label: 'Too Many Manual Processes', icon: 'Clock' },
        { value: 'poor_user_experience', label: 'Poor User Experience', icon: 'Frown' },
        { value: 'lack_of_data', label: 'Lack of Data/Analytics', icon: 'PieChart' },
        { value: 'security_concerns', label: 'Security Concerns', icon: 'Shield' },
        { value: 'scalability_issues', label: 'Scalability Issues', icon: 'ArrowUp' },
        { value: 'integration_problems', label: 'System Integration Problems', icon: 'Link' }
      ]
    },
    {
      id: 'target_audience',
      question: 'Who is your target audience?',
      type: 'single',
      options: [
        { value: 'consumers', label: 'General Consumers (B2C)', icon: 'Users' },
        { value: 'businesses', label: 'Other Businesses (B2B)', icon: 'Building' },
        { value: 'internal_team', label: 'Internal Team/Employees', icon: 'UserCheck' },
        { value: 'mixed', label: 'Mixed Audience', icon: 'Globe' }
      ]
    },
    {
      id: 'technical_complexity',
      question: 'How technically complex should the solution be?',
      type: 'single',
      options: [
        { value: 'simple', label: 'Simple & Straightforward', icon: 'Minimize2' },
        { value: 'moderate', label: 'Moderate Complexity', icon: 'Layers' },
        { value: 'advanced', label: 'Advanced Features', icon: 'Cpu' },
        { value: 'cutting_edge', label: 'Cutting-edge Technology', icon: 'Zap' }
      ]
    },
    {
      id: 'existing_systems',
      question: 'Do you have existing systems that need integration?',
      type: 'single',
      options: [
        { value: 'none', label: 'No existing systems', icon: 'Circle' },
        { value: 'few', label: 'A few simple systems', icon: 'Link' },
        { value: 'many', label: 'Multiple complex systems', icon: 'Network' },
        { value: 'legacy', label: 'Legacy systems requiring migration', icon: 'Database' }
      ]
    }
  ];

  const handleAnswerSelect = (questionId, value, isMultiple = false) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev?.[questionId] || [];
        const newAnswers = currentAnswers?.includes(value)
          ? currentAnswers?.filter(a => a !== value)
          : [...currentAnswers, value];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: value };
      }
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeQuiz = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const serviceRecommendations = generateRecommendations(answers);
    setRecommendations(serviceRecommendations);
    setIsCompleted(true);
    setIsAnalyzing(false);
    
    // Pass recommendations to parent
    onServiceRecommendation(serviceRecommendations);
  };

  const generateRecommendations = (userAnswers) => {
    const recommendations = [];
    
    // Business type based recommendations
    if (userAnswers?.business_type === 'ecommerce') {
      recommendations?.push({
        service: 'ecommerce-platform',
        title: 'E-commerce Platform Development',
        priority: 'high',
        reason: 'Perfect for retail businesses looking to sell online',
        features: ['Product catalog', 'Payment integration', 'Inventory management'],
        estimatedCost: '$150 - $5,000'
      });
    }
    
    if (userAnswers?.business_type === 'saas') {
      recommendations?.push({
        service: 'web-application',
        title: 'SaaS Web Application',
        priority: 'high',
        reason: 'Ideal for software-as-a-service businesses',
        features: ['User management', 'Subscription billing', 'API integration'],
        estimatedCost: '$250 - $10,000'
      });
    }
    
    // Goal based recommendations
    if (userAnswers?.primary_goal === 'customer_experience') {
      recommendations?.push({
        service: 'ui-ux-design',
        title: 'UI/UX Design & Research',
        priority: 'high',
        reason: 'Essential for improving customer experience',
        features: ['User research', 'Wireframing', 'Prototype testing'],
        estimatedCost: '$50 - $150'
      });
    }
    
    if (userAnswers?.primary_goal === 'automate_processes') {
      recommendations?.push({
        service: 'ai-automation',
        title: 'AI Process Automation',
        priority: 'high',
        reason: 'Perfect for automating manual workflows',
        features: ['Workflow automation', 'AI integration', 'Process optimization'],
        estimatedCost: '$200 - $750'
      });
    }
    
    // Challenge based recommendations
    if (userAnswers?.current_challenges?.includes('outdated_website')) {
      recommendations?.push({
        service: 'website-redesign',
        title: 'Modern Website Redesign',
        priority: 'medium',
        reason: 'Address your outdated web presence',
        features: ['Responsive design', 'Performance optimization', 'SEO improvement'],
        estimatedCost: '$250 - $800'
      });
    }
    
    if (userAnswers?.current_challenges?.includes('lack_of_data')) {
      recommendations?.push({
        service: 'analytics-dashboard',
        title: 'Analytics & Reporting Dashboard',
        priority: 'medium',
        reason: 'Get insights from your business data',
        features: ['Real-time analytics', 'Custom reports', 'Data visualization'],
        estimatedCost: '$1,000 - $3,000'
      });
    }
    
    // Technical complexity adjustments
    if (userAnswers?.technical_complexity === 'cutting_edge') {
      recommendations?.push({
        service: 'ai-integration',
        title: 'AI/ML Integration',
        priority: 'high',
        reason: 'Cutting-edge AI features for competitive advantage',
        features: ['Machine learning models', 'Natural language processing', 'Predictive analytics'],
        estimatedCost: '$3,000 - $15,000'
      });
    }
    
    // Mobile app recommendation for B2C
    if (userAnswers?.target_audience === 'consumers') {
      recommendations?.push({
        service: 'mobile-app',
        title: 'Mobile App Development',
        priority: 'medium',
        reason: 'Reach customers on their mobile devices',
        features: ['iOS & Android apps', 'Push notifications', 'Offline functionality'],
        estimatedCost: '$200 - $600'
      });
    }
    
    // Default recommendations if none match
    if (recommendations?.length === 0) {
      recommendations?.push({
        service: 'consultation',
        title: 'Technical Consultation',
        priority: 'high',
        reason: 'Let\'s discuss your unique requirements',
        features: ['Requirements analysis', 'Technology recommendations', 'Project roadmap'],
        estimatedCost: '$20 - $50'
      });
    }
    
    return recommendations?.slice(0, 4); // Limit to top 4 recommendations
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setRecommendations([]);
    setIsAnalyzing(false);
  };

  const currentQ = questions?.[currentQuestion];
  const isAnswered = currentQ?.type === 'multiple' 
    ? answers?.[currentQ?.id]?.length > 0 
    : answers?.[currentQ?.id];

  if (isAnalyzing) {
    return (
      <div className="glass rounded-2xl p-8 border border-primary/20 shadow-depth">
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary via-secondary to-accent animate-spin">
            <div className="w-16 h-16 m-2 rounded-full bg-background flex items-center justify-center">
              <Icon name="Brain" size={32} className="text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
           iperfect AI is Analyzing Your Needs
          </h3>
          <p className="text-muted-foreground mb-6">
            Our intelligent system is processing your answers to create personalized recommendations
          </p>
          <div className="space-y-3">
            <div className="text-sm text-primary animate-pulse">
              ✓ Analyzing business requirements
            </div>
            <div className="text-sm text-secondary animate-pulse" style={{ animationDelay: '0.5s' }}>
              ✓ Matching services to your goals
            </div>
            <div className="text-sm text-accent animate-pulse" style={{ animationDelay: '1s' }}>
              ✓ Calculating cost estimates
            </div>
            <div className="text-sm text-warning animate-pulse" style={{ animationDelay: '1.5s' }}>
              ✓ Generating recommendations
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="glass rounded-2xl p-8 border border-accent/20 shadow-depth">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent via-primary to-secondary p-3 glow-accent">
              <Icon name="CheckCircle" size={24} className="text-background" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground">
                Your Personalized Recommendations
              </h3>
              <p className="text-muted-foreground">
                Based on your answers, here are our iperfect AI-powered suggestions
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={restartQuiz}
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Retake Quiz
          </Button>
        </div>
        <div className="space-y-4">
          {recommendations?.map((rec, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border transition-all duration-300 hover:scale-102 ${
                rec?.priority === 'high' ?'border-accent bg-accent/5 glow-accent' :'border-primary bg-primary/5'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-heading font-semibold text-foreground">
                      {rec?.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec?.priority === 'high' ?'bg-accent/20 text-accent' :'bg-primary/20 text-primary'
                    }`}>
                      {rec?.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {rec?.reason}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {rec?.features?.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-muted/20 text-foreground px-2 py-1 rounded-full border border-border/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-sm text-muted-foreground">Estimated Cost</div>
                  <div className="font-data font-bold text-accent">
                    {rec?.estimatedCost}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  className={`${
                    rec?.priority === 'high' ?'bg-accent hover:bg-accent/90 text-accent-foreground' :'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                >
                  <Icon name="Plus" size={14} className="mr-2" />
                  Add to Quote
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border/30 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Info" size={14} className="mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Lightbulb" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Pro Tip</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Consider bundling multiple services for better value and integrated solutions. 
            Our team can create a custom package that saves you 15-25% on total costs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8 border border-secondary/20 shadow-depth">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary via-accent to-primary p-3 glow-secondary">
            <Icon name="MessageCircle" size={24} className="text-background" />
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground">
              iperfect AI Service Recommendation Quiz
            </h3>
            <p className="text-muted-foreground">
              Answer a few questions to get personalized service recommendations
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Progress</div>
          <div className="text-lg font-data font-bold text-secondary">
            {currentQuestion + 1}/{questions?.length}
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Question {currentQuestion + 1}</span>
          <span>{Math.round(((currentQuestion + 1) / questions?.length) * 100)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-muted/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500 glow-secondary"
            style={{ width: `${((currentQuestion + 1) / questions?.length) * 100}%` }}
          />
        </div>
      </div>
      {/* Question */}
      <div className="mb-8">
        <h4 className="text-xl font-heading font-semibold text-foreground mb-6">
          {currentQ?.question}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ?.options?.map((option) => {
            const isSelected = currentQ?.type === 'multiple'
              ? answers?.[currentQ?.id]?.includes(option?.value)
              : answers?.[currentQ?.id] === option?.value;
              
            return (
              <div
                key={option?.value}
                onClick={() => handleAnswerSelect(currentQ?.id, option?.value, currentQ?.type === 'multiple')}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-102 ${
                  isSelected
                    ? 'border-secondary bg-secondary/10 glow-secondary' :'border-border hover:border-secondary/30 bg-muted/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg p-2 ${
                    isSelected 
                      ? 'bg-secondary/20 text-secondary' :'bg-muted/20 text-muted-foreground'
                  }`}>
                    <Icon name={option?.icon} size={24} />
                  </div>
                  <span className="font-medium text-foreground">
                    {option?.label}
                  </span>
                  {isSelected && (
                    <Icon name="Check" size={16} className="text-secondary ml-auto" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="border-border/30 text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          <Icon name="ChevronLeft" size={16} className="mr-2" />
          Previous
        </Button>
        
        <Button
          variant="default"
          onClick={handleNext}
          disabled={!isAnswered}
          className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-background glow-secondary hover:glow-lg transition-glow disabled:opacity-50"
        >
          {currentQuestion === questions?.length - 1 ? (
            <>
              <Icon name="Sparkles" size={16} className="mr-2" />
              Get Recommendations
            </>
          ) : (
            <>
              Next
              <Icon name="ChevronRight" size={16} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AIServiceQuiz;