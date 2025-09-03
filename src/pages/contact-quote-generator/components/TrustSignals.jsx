import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityBadges = [
    {
      id: 1,
      name: 'SSL Secured',
      icon: 'Shield',
      description: '256-bit SSL encryption',
      verified: true
    },
    {
      id: 2,
      name: 'GDPR Compliant',
      icon: 'Lock',
      description: 'EU data protection compliant',
      verified: true
    },
    {
      id: 3,
      name: 'ISO 27001',
      icon: 'Award',
      description: 'Information security certified',
      verified: true
    },
    {
      id: 4,
      name: 'SOC 2 Type II',
      icon: 'CheckCircle',
      description: 'Security & availability audited',
      verified: true
    }
  ];

  const clientTestimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CEO',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: `DevPerfection transformed our outdated system into a modern, efficient platform. The AI-powered features they implemented increased our productivity by 40%. Their team's expertise and attention to detail is unmatched.`,project: 'Enterprise Web Application',completedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Michael Chen',company: 'Global Retail Solutions',role: 'CTO',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: `The e-commerce platform they built for us handles millions of transactions seamlessly. The mobile app has a 4.8-star rating on app stores. ROI was achieved within 6 months of launch.`,
      project: 'E-commerce Platform + Mobile App',completedDate: '2023-11-20'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',company: 'HealthTech Innovations',role: 'Product Director',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: `Their AI integration capabilities are phenomenal. The machine learning models they developed for patient data analysis have revolutionized our diagnostic processes. Highly recommended!`,
      project: 'AI-Powered Healthcare Platform',completedDate: '2024-02-28'
    }
  ];

  const industryRecognitions = [
    {
      id: 1,
      title: 'Top Web Development Agency 2024',
      organization: 'TechReview Awards',
      icon: 'Trophy',
      year: '2024'
    },
    {
      id: 2,
      title: 'Best AI Implementation',
      organization: 'Innovation Summit',
      icon: 'Star',
      year: '2024'
    },
    {
      id: 3,
      title: 'Client Satisfaction Excellence',
      organization: 'Business Excellence Awards',
      icon: 'Heart',
      year: '2023'
    },
    {
      id: 4,
      title: 'Fastest Growing Tech Company',
      organization: 'Startup Magazine',
      icon: 'TrendingUp',
      year: '2023'
    }
  ];

  const companyStats = [
    {
      label: 'Projects Completed',
      value: '500+',
      icon: 'Briefcase',
      color: 'primary'
    },
    {
      label: 'Happy Clients',
      value: '200+',
      icon: 'Users',
      color: 'secondary'
    },
    {
      label: 'Years Experience',
      value: '8+',
      icon: 'Calendar',
      color: 'accent'
    },
    {
      label: 'Team Members',
      value: '50+',
      icon: 'UserCheck',
      color: 'warning'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${
          index < rating ? 'text-warning fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Security Badges */}
      <div className="glass rounded-2xl p-6 border border-accent/20 shadow-depth">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-accent" />
          <span>Security & Compliance</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {securityBadges?.map((badge) => (
            <div
              key={badge?.id}
              className="text-center p-4 rounded-xl bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-accent/20 flex items-center justify-center">
                <Icon name={badge?.icon} size={24} className="text-accent" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">
                {badge?.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {badge?.description}
              </p>
              {badge?.verified && (
                <div className="flex items-center justify-center mt-2">
                  <Icon name="CheckCircle" size={12} className="text-accent mr-1" />
                  <span className="text-xs text-accent">Verified</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Client Testimonials */}
      <div className="glass rounded-2xl p-6 border border-primary/20 shadow-depth">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <span>Client Success Stories</span>
        </h3>
        
        <div className="space-y-6">
          {clientTestimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="p-6 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <img
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">
                        {testimonial?.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial?.role} at {testimonial?.company}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial?.rating)}
                    </div>
                  </div>
                  
                  <blockquote className="text-sm text-foreground mb-3 italic">
                    "{testimonial?.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {testimonial?.project}
                    </span>
                    <span>
                      Completed: {new Date(testimonial.completedDate)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Company Stats */}
      <div className="glass rounded-2xl p-6 border border-secondary/20 shadow-depth">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="BarChart" size={20} className="text-secondary" />
          <span>Our Track Record</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {companyStats?.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-4 rounded-xl bg-${stat?.color}/5 border border-${stat?.color}/20`}
            >
              <Icon 
                name={stat?.icon} 
                size={32} 
                className={`text-${stat?.color} mx-auto mb-2`} 
              />
              <div className={`text-2xl font-heading font-bold text-${stat?.color} mb-1`}>
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Industry Recognition */}
      <div className="glass rounded-2xl p-6 border border-warning/20 shadow-depth">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-warning" />
          <span>Industry Recognition</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industryRecognitions?.map((recognition) => (
            <div
              key={recognition?.id}
              className="flex items-center space-x-4 p-4 rounded-xl bg-warning/5 border border-warning/20 hover:bg-warning/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                <Icon name={recognition?.icon} size={24} className="text-warning" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">
                  {recognition?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {recognition?.organization} • {recognition?.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Guarantee */}
      <div className="glass rounded-2xl p-6 border border-accent/20 shadow-depth bg-gradient-to-r from-accent/5 via-primary/5 to-secondary/5">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent via-primary to-secondary p-4 glow-accent">
            <Icon name="Shield" size={32} className="text-background" />
          </div>
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
            100% Satisfaction Guarantee
          </h3>
          <p className="text-muted-foreground mb-4">
            We stand behind our work with a comprehensive satisfaction guarantee. 
            If you're not completely happy with our service, we'll make it right.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-accent" />
              <span className="text-foreground">24h Response Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="RefreshCw" size={16} className="text-primary" />
              <span className="text-foreground">Free Revisions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-secondary" />
              <span className="text-foreground">Dedicated Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;