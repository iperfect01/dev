import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsSection = () => {
  const sectionRef = useRef(null);
  const [activeComparison, setActiveComparison] = useState(0);
  const [counters, setCounters] = useState({
    projects: 0,
    satisfaction: 0,
    revenue: 0,
    efficiency: 0
  });
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const comparisons = [
    {
      id: 1,
      title: "E-commerce Platform Transformation",
      category: "Retail Technology",
      before: {
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        metrics: {
          "Conversion Rate": "2.3%",
          "Page Load Time": "4.2s",
          "Mobile Traffic": "35%",
          "User Engagement": "1.2 min"
        }
      },
      after: {
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
        metrics: {
          "Conversion Rate": "8.7%",
          "Page Load Time": "1.1s",
          "Mobile Traffic": "78%",
          "User Engagement": "4.8 min"
        }
      },
      improvements: {
        "Conversion Rate": "+278%",
        "Page Load Time": "-74%",
        "Mobile Traffic": "+123%",
        "User Engagement": "+300%"
      }
    },
    {
      id: 2,
      title: "Healthcare AI Integration",
      category: "Medical Technology",
      before: {
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
        metrics: {
          "Diagnosis Time": "45 min",
          "Accuracy Rate": "78%",
          "Patient Wait": "2.5 hrs",
          "Staff Efficiency": "65%"
        }
      },
      after: {
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
        metrics: {
          "Diagnosis Time": "12 min",
          "Accuracy Rate": "94%",
          "Patient Wait": "35 min",
          "Staff Efficiency": "89%"
        }
      },
      improvements: {
        "Diagnosis Time": "-73%",
        "Accuracy Rate": "+21%",
        "Patient Wait": "-77%",
        "Staff Efficiency": "+37%"
      }
    },
    {
      id: 3,
      title: "Financial Trading Platform",
      category: "FinTech Innovation",
      before: {
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
        metrics: {
          "Trade Execution": "850ms",
          "Daily Volume": "$2.3M",
          "User Base": "12K",
          "Uptime": "97.2%"
        }
      },
      after: {
        image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop",
        metrics: {
          "Trade Execution": "23ms",
          "Daily Volume": "$18.7M",
          "User Base": "89K",
          "Uptime": "99.9%"
        }
      },
      improvements: {
        "Trade Execution": "-97%",
        "Daily Volume": "+713%",
        "User Base": "+642%",
        "Uptime": "+2.8%"
      }
    }
  ];

  const kpiData = [
    {
      id: 1,
      label: "Projects Delivered",
      value: 500,
      suffix: "+",
      icon: "CheckCircle",
      color: "primary"
    },
    {
      id: 2,
      label: "Client Satisfaction",
      value: 98,
      suffix: "%",
      icon: "Heart",
      color: "secondary"
    },
    {
      id: 3,
      label: "Revenue Growth",
      value: 340,
      suffix: "%",
      icon: "TrendingUp",
      color: "accent"
    },
    {
      id: 4,
      label: "Efficiency Boost",
      value: 275,
      suffix: "%",
      icon: "Zap",
      color: "primary"
    }
  ];

  // Animated counter effect
  useEffect(() => {
    if (!isInView) return;

    const animateCounters = () => {
      kpiData?.forEach((kpi) => {
        let start = 0;
        const end = kpi?.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          
          setCounters(prev => ({
            ...prev,
            [kpi?.label?.toLowerCase()?.replace(' ', '')]: Math.floor(start)
          }));
        }, 16);
      });
    };

    const timeout = setTimeout(animateCounters, 500);
    return () => clearTimeout(timeout);
  }, [isInView]);

  const nextComparison = () => {
    setActiveComparison((prev) => (prev + 1) % comparisons?.length);
  };

  const prevComparison = () => {
    setActiveComparison((prev) => (prev - 1 + comparisons?.length) % comparisons?.length);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5"></div>
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block text-sm font-data text-accent mb-4 px-4 py-2 rounded-full border border-accent/30 bg-accent/5"
            animate={{ glow: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            PROVEN_RESULTS
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Transformative Impact
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real results from real projects. See how our innovative solutions 
            have transformed businesses and delivered measurable success across industries.
          </p>
        </motion.div>

        {/* KPI Counters */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {kpiData?.map((kpi, index) => (
            <motion.div
              key={kpi?.id}
              className={`text-center p-6 glass rounded-2xl border border-${kpi?.color}/20 hover:border-${kpi?.color}/40 transition-all duration-300 group cursor-pointer`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 30px rgba(${kpi?.color === 'primary' ? '0, 224, 255' : kpi?.color === 'secondary' ? '166, 108, 255' : '0, 255, 136'}, 0.2)`
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
            >
              <div className={`w-16 h-16 rounded-full bg-${kpi?.color}/10 border border-${kpi?.color}/30 flex items-center justify-center mx-auto mb-4 group-hover:glow-${kpi?.color} transition-all duration-300`}>
                <Icon name={kpi?.icon} size={28} className={`text-${kpi?.color}`} />
              </div>
              
              <div className={`text-3xl md:text-4xl font-data font-bold text-${kpi?.color} mb-2`}>
                {kpi?.label === "Projects Delivered" ? counters?.projectsdelivered || 0 :
                 kpi?.label === "Client Satisfaction" ? counters?.clientsatisfaction || 0 :
                 kpi?.label === "Revenue Growth" ? counters?.revenuegrowth || 0 :
                 counters?.efficiencyboost || 0}
                {kpi?.suffix}
              </div>
              
              <div className="text-sm text-muted-foreground font-medium">
                {kpi?.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Case Study: {comparisons?.[activeComparison]?.title}
            </h3>
            <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30">
              <span className="text-sm font-data text-secondary">
                {comparisons?.[activeComparison]?.category}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Before */}
            <motion.div
              className="glass rounded-2xl overflow-hidden border border-destructive/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={comparisons?.[activeComparison]?.before?.image}
                  alt="Before transformation"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-full text-sm font-data">
                  BEFORE
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Previous State
                </h4>
                <div className="space-y-3">
                  {Object.entries(comparisons?.[activeComparison]?.before?.metrics)?.map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{key}</span>
                      <span className="text-sm font-data text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              className="glass rounded-2xl overflow-hidden border border-accent/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={comparisons?.[activeComparison]?.after?.image}
                  alt="After transformation"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-accent/90 text-accent-foreground px-3 py-1 rounded-full text-sm font-data">
                  AFTER
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Transformed State
                </h4>
                <div className="space-y-3">
                  {Object.entries(comparisons?.[activeComparison]?.after?.metrics)?.map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{key}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-data text-foreground">{value}</span>
                        <span className="text-xs font-data text-accent bg-accent/10 px-2 py-1 rounded">
                          {comparisons?.[activeComparison]?.improvements?.[key]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={prevComparison}
              className="border-primary/30 text-primary hover:bg-primary/10"
            />
            
            <div className="flex space-x-2">
              {comparisons?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveComparison(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeComparison
                      ? 'bg-accent glow-accent' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={nextComparison}
              className="border-primary/30 text-primary hover:bg-primary/10"
            />
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            variant="default"
            size="lg"
            iconName="BarChart3"
            iconPosition="left"
            className="bg-gradient-to-r from-accent via-primary to-secondary hover:from-accent/90 hover:via-primary/90 hover:to-secondary/90 text-background glow-accent hover:glow-lg transition-all duration-300"
            onClick={() => window.location.href = '/portfolio-showcase'}
          >
            View All Case Studies
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;