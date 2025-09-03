import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuoteGenerator = ({ formData, selectedServices }) => {
  const [quote, setQuote] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Base pricing for different project types (reduced by 10x)
  const basePricing = {
    'web-development': { min: 800, max: 2500, complexity: 1.2 },
    'mobile-app': { min: 1500, max: 5000, complexity: 1.5 },
    'ai-solution': { min: 2500, max: 10000, complexity: 2.0 },
    'ecommerce': { min: 1200, max: 4000, complexity: 1.3 },
    'enterprise': { min: 5000, max: 25000, complexity: 2.5 },
    'consulting': { min: 500, max: 1500, complexity: 0.8 }
  };

  // Service pricing multipliers (reduced by 10x)
  const servicePricing = {
    'ui-ux-design': 0.03,
    'frontend-dev': 0.04,
    'backend-dev': 0.05,
    'mobile-dev': 0.06,
    'ai-integration': 0.08,
    'cloud-deployment': 0.02,
    'maintenance': 0.015,
    'seo-optimization': 0.01
  };

  // Timeline multipliers
  const timelineMultipliers = {
    'asap': 1.8,
    '1-3months': 1.3,
    '3-6months': 1.0,
    '6-12months': 0.9,
    '12months+': 0.8,
    'flexible': 0.85
  };

  useEffect(() => {
    if (formData?.projectType && formData?.budget && formData?.timeline) {
      generateQuote();
    }
  }, [formData, selectedServices]);

  const generateQuote = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const basePrice = basePricing?.[formData?.projectType] || basePricing?.['web-development'];
      const timelineMultiplier = timelineMultipliers?.[formData?.timeline] || 1.0;
      
      // Calculate service costs
      let serviceCost = 0;
      selectedServices?.forEach(service => {
        serviceCost += (servicePricing?.[service] || 0.2) * basePrice?.min;
      });
      
      // Calculate total estimate
      const baseEstimate = basePrice?.min + serviceCost;
      const finalEstimate = Math.round(baseEstimate * timelineMultiplier);
      const maxEstimate = Math.round((basePrice?.max + serviceCost) * timelineMultiplier);
      
      // Generate timeline estimate
      const getTimelineEstimate = () => {
        switch (formData?.timeline) {
          case 'asap': return '2-4 weeks';
          case '1-3months': return '4-12 weeks';
          case '3-6months': return '12-24 weeks';
          case '6-12months': return '24-48 weeks';
          case '12months+': return '48+ weeks';
          default: return '8-16 weeks';
        }
      };

      // Generate AI analysis
      const projectAnalysis = {
        complexity: basePrice?.complexity,
        riskLevel: formData?.timeline === 'asap' ? 'High' : 'Medium',
        teamSize: Math.ceil(selectedServices?.length / 2) + 2,
        phases: [
          'Discovery & Planning',
          'Design & Prototyping',
          'Development',
          'Testing & QA',
          'Deployment & Launch'
        ],
        technologies: getTechnologies(),
        challenges: getChallenges()
      };

      // Generate recommendations
      const aiRecommendations = generateRecommendations();

      setQuote({
        minEstimate: finalEstimate,
        maxEstimate: maxEstimate,
        timeline: getTimelineEstimate(),
        confidence: 85,
        currency: 'USD'
      });

      setAnalysis(projectAnalysis);
      setRecommendations(aiRecommendations);
      
    } catch (error) {
      console.error('Quote generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getTechnologies = () => {
    const techStack = [];
    
    if (selectedServices?.includes('frontend-dev')) {
      techStack?.push('React', 'TypeScript', 'Tailwind CSS');
    }
    if (selectedServices?.includes('backend-dev')) {
      techStack?.push('Node.js', 'PostgreSQL', 'Redis');
    }
    if (selectedServices?.includes('mobile-dev')) {
      techStack?.push('React Native', 'Expo');
    }
    if (selectedServices?.includes('ai-integration')) {
      techStack?.push('OpenAI API', 'TensorFlow', 'Python');
    }
    if (selectedServices?.includes('cloud-deployment')) {
      techStack?.push('AWS', 'Docker', 'Kubernetes');
    }
    
    return techStack?.length > 0 ? techStack : ['React', 'Node.js', 'PostgreSQL'];
  };

  const getChallenges = () => {
    const challenges = [];
    
    if (formData?.timeline === 'asap') {
      challenges?.push('Tight timeline requires dedicated team');
    }
    if (selectedServices?.includes('ai-integration')) {
      challenges?.push('AI integration complexity');
    }
    if (formData?.hasExistingSystem) {
      challenges?.push('Legacy system integration');
    }
    if (selectedServices?.length > 5) {
      challenges?.push('Multiple service coordination');
    }
    
    return challenges?.length > 0 ? challenges : ['Standard development challenges'];
  };

  const generateRecommendations = () => {
    const recs = [];
    
    if (!selectedServices?.includes('ui-ux-design')) {
      recs?.push({
        type: 'service',
        title: 'Add UI/UX Design',
        description: 'Professional design will improve user experience and conversion rates',
        impact: 'High',
        cost: '+$3,000 - $8,000'
      });
    }
    
    if (!selectedServices?.includes('seo-optimization')) {
      recs?.push({
        type: 'service',
        title: 'SEO Optimization',
        description: 'Improve search visibility and organic traffic',
        impact: 'Medium',
        cost: '+$1,500 - $3,000'
      });
    }
    
    if (formData?.timeline === 'asap') {
      recs?.push({
        type: 'timeline',
        title: 'Consider Extended Timeline',
        description: 'A 3-6 month timeline could reduce costs by 20-30%',
        impact: 'High',
        cost: '-$500 - $1500'
      });
    }
    
    return recs;
  };

  const handleScheduleCall = () => {
    // Simulate calendar integration
    alert('Calendar integration would open here. For demo purposes, please contact us directly.');
  };

  const handleDownloadQuote = () => {
    // Simulate PDF generation
    alert('PDF quote would be generated and downloaded. Feature available in production.');
  };

  return (
    <div className="space-y-6">
      {/* Quote Display */}
      <div className="glass rounded-2xl p-8 border border-secondary/20 shadow-depth">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary via-accent to-primary p-3 glow-secondary">
              <Icon name="Calculator" size={24} className="text-background" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">
                iperfect AI Quote Generator
              </h2>
              <p className="text-muted-foreground">
                Intelligent project analysis & pricing
              </p>
            </div>
          </div>
          
          {quote && (
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Confidence</div>
              <div className="text-lg font-data font-bold text-accent">
                {quote?.confidence}%
              </div>
            </div>
          )}
        </div>

        {isGenerating ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent animate-spin">
              <div className="w-12 h-12 m-2 rounded-full bg-background"></div>
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              Analyzing Your Project
            </h3>
            <p className="text-muted-foreground">
              Our iperfect AI is processing your requirements...
            </p>
            <div className="mt-4 space-y-2">
              <div className="text-sm text-primary animate-pulse">
                ✓ Analyzing project complexity
              </div>
              <div className="text-sm text-secondary animate-pulse" style={{ animationDelay: '0.5s' }}>
                ✓ Calculating resource requirements
              </div>
              <div className="text-sm text-accent animate-pulse" style={{ animationDelay: '1s' }}>
                ✓ Generating cost estimates
              </div>
            </div>
          </div>
        ) : quote ? (
          <div className="space-y-6">
            {/* Price Range */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
              <div className="text-sm text-muted-foreground mb-2">Estimated Project Cost</div>
              <div className="text-4xl font-heading font-bold text-foreground mb-2">
                ${quote?.minEstimate?.toLocaleString()} - ${quote?.maxEstimate?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Timeline: {quote?.timeline}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20">
                <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">Timeline</div>
                <div className="font-data font-semibold text-foreground">
                  {quote?.timeline}
                </div>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                <Icon name="Users" size={24} className="text-secondary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">Team Size</div>
                <div className="font-data font-semibold text-foreground">
                  {analysis?.teamSize || 3} People
                </div>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-accent/5 border border-accent/20">
                <Icon name="Layers" size={24} className="text-accent mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">Services</div>
                <div className="font-data font-semibold text-foreground">
                  {selectedServices?.length} Selected
                </div>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-warning/5 border border-warning/20">
                <Icon name="TrendingUp" size={24} className="text-warning mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">Complexity</div>
                <div className="font-data font-semibold text-foreground">
                  {analysis?.complexity > 2 ? 'High' : analysis?.complexity > 1.5 ? 'Medium' : 'Low'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                onClick={handleScheduleCall}
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-background glow-primary hover:glow-lg transition-glow"
              >
                <Icon name="Calendar" size={16} className="mr-2" />
                Schedule Free Consultation
              </Button>
              
              <Button
                variant="outline"
                onClick={handleDownloadQuote}
                className="flex-1 border-accent/30 text-accent hover:bg-accent/10 hover:glow-accent transition-glow"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Download Quote PDF
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Calculator" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              Ready to Generate Quote
            </h3>
            <p className="text-muted-foreground">
              Fill out the form to get your iperfect AI-powered project estimate
            </p>
          </div>
        )}
      </div>
      {/* Project Analysis */}
      {analysis && (
        <div className="glass rounded-2xl p-6 border border-accent/20 shadow-depth">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Brain" size={20} className="text-accent" />
            <span>AI Project Analysis</span>
          </h3>
          
          <div className="space-y-4">
            {/* Technologies */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Recommended Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {analysis?.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Project Phases */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Project Phases</h4>
              <div className="space-y-2">
                {analysis?.phases?.map((phase, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm text-foreground">{phase}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Challenges */}
            {analysis?.challenges?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Potential Challenges</h4>
                <div className="space-y-2">
                  {analysis?.challenges?.map((challenge, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5" />
                      <span className="text-sm text-muted-foreground">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Recommendations */}
      {recommendations?.length > 0 && (
        <div className="glass rounded-2xl p-6 border border-warning/20 shadow-depth">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Lightbulb" size={20} className="text-warning" />
            <span>AI Recommendations</span>
          </h3>
          
          <div className="space-y-4">
            {recommendations?.map((rec, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-border/30 hover:border-warning/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{rec?.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rec?.impact === 'High' ? 'bg-accent/10 text-accent' :
                    rec?.impact === 'Medium'? 'bg-warning/10 text-warning' : 'bg-muted/20 text-muted-foreground'
                  }`}>
                    {rec?.impact} Impact
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{rec?.description}</p>
                <div className="text-sm font-data text-primary">{rec?.cost}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteGenerator;