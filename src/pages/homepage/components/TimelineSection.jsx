import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const milestones = [
    {
      id: 1,
      year: "2019",
      title: "Foundation",
      description: "DevPerfection was born with a vision to revolutionize digital experiences through cutting-edge technology.",
      icon: "Rocket",
      color: "primary",
      stats: { projects: "5", clients: "3", team: "2" }
    },
    {
      id: 2,
      year: "2020",
      title: "AI Integration",
      description: "Pioneered AI-powered development solutions, becoming early adopters of machine learning in web development.",
      icon: "Brain",
      color: "secondary",
      stats: { projects: "25", clients: "15", team: "8" }
    },
    {
      id: 3,
      year: "2021",
      title: "Global Expansion",
      description: "Expanded operations globally, serving clients across 20+ countries with innovative digital solutions.",
      icon: "Globe",
      color: "accent",
      stats: { projects: "75", clients: "45", team: "20" }
    },
    {
      id: 4,
      year: "2022",
      title: "Innovation Lab",
      description: "Launched our Innovation Lab, focusing on emerging technologies like AR/VR, blockchain, and IoT.",
      icon: "Lightbulb",
      color: "primary",
      stats: { projects: "150", clients: "90", team: "35" }
    },
    {
      id: 5,
      year: "2023",
      title: "Industry Recognition",
      description: "Received multiple industry awards for excellence in AI development and immersive web experiences.",
      icon: "Award",
      color: "secondary",
      stats: { projects: "300", clients: "180", team: "50" }
    },
    {
      id: 6,
      year: "2024",
      title: "Future Vision",
      description: "Leading the next wave of digital transformation with quantum computing and advanced AI integration.",
      icon: "Zap",
      color: "accent",
      stats: { projects: "500+", clients: "300+", team: "75+" }
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef?.current) return;
      
      const container = scrollContainerRef?.current;
      const scrollLeft = container?.scrollLeft;
      const maxScroll = container?.scrollWidth - container?.clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      
      setScrollProgress(progress);
      
      // Update active index based on scroll position
      const itemWidth = container?.scrollWidth / milestones?.length;
      const newActiveIndex = Math.min(
        Math.floor((scrollLeft + itemWidth / 2) / itemWidth),
        milestones?.length - 1
      );
      setActiveIndex(newActiveIndex);
    };

    const container = scrollContainerRef?.current;
    if (container) {
      container?.addEventListener('scroll', handleScroll);
      return () => container?.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToIndex = (index) => {
    if (!scrollContainerRef?.current) return;
    
    const container = scrollContainerRef?.current;
    const itemWidth = container?.scrollWidth / milestones?.length;
    const scrollLeft = index * itemWidth;
    
    container?.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent"></div>
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"
          style={{ scaleX: scrollProgress }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? scrollProgress : 0 }}
          transition={{ duration: 0.3 }}
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
            className="inline-block text-sm font-data text-secondary mb-4 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/5"
            animate={{ glow: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            INNOVATION_TIMELINE
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From humble beginnings to industry leadership, discover the milestones 
            that shaped our evolution into a cutting-edge technology company.
          </p>
        </motion.div>

        {/* Timeline Navigation */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex space-x-2 glass rounded-full p-2 border border-border/30">
            {milestones?.map((milestone, index) => (
              <button
                key={milestone?.id}
                onClick={() => scrollToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? `bg-${milestone?.color} glow-${milestone?.color}`
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Horizontal Timeline */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/30 transform -translate-y-1/2 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              style={{ width: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-8 pb-4 relative z-10"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {milestones?.map((milestone, index) => (
              <motion.div
                key={milestone?.id}
                className="flex-shrink-0 w-80 md:w-96"
                style={{ scrollSnapAlign: 'center' }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Timeline Node */}
                <div className="relative mb-8">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-${milestone?.color}/10 border-2 border-${milestone?.color}/30 flex items-center justify-center mx-auto relative z-10 glass ${
                      index === activeIndex ? `glow-${milestone?.color}` : ''
                    }`}
                    animate={index === activeIndex ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon 
                      name={milestone?.icon} 
                      size={28} 
                      className={`text-${milestone?.color}`}
                    />
                  </motion.div>
                  
                  {/* Year Badge */}
                  <div className={`absolute -top-2 -right-2 bg-${milestone?.color} text-${milestone?.color === 'accent' ? 'accent-foreground' : 'background'} text-xs font-data font-bold px-2 py-1 rounded-full`}>
                    {milestone?.year}
                  </div>
                </div>

                {/* Content Card */}
                <motion.div
                  className={`glass rounded-2xl p-6 border border-${milestone?.color}/20 hover:border-${milestone?.color}/40 transition-all duration-300 group cursor-pointer`}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 0 30px rgba(${milestone?.color === 'primary' ? '0, 224, 255' : milestone?.color === 'secondary' ? '166, 108, 255' : '0, 255, 136'}, 0.2)`
                  }}
                >
                  <h3 className={`text-xl font-heading font-bold text-foreground mb-3 group-hover:text-${milestone?.color} transition-colors`}>
                    {milestone?.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {milestone?.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`text-lg font-data font-bold text-${milestone?.color} mb-1`}>
                        {milestone?.stats?.projects}
                      </div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-data font-bold text-${milestone?.color} mb-1`}>
                        {milestone?.stats?.clients}
                      </div>
                      <div className="text-xs text-muted-foreground">Clients</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-data font-bold text-${milestone?.color} mb-1`}>
                        {milestone?.stats?.team}
                      </div>
                      <div className="text-xs text-muted-foreground">Team</div>
                    </div>
                  </div>

                  {/* Hover Effect Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {Array.from({ length: 3 })?.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-${milestone?.color} rounded-full opacity-0 group-hover:opacity-100`}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Timeline (Vertical) */}
        <div className="md:hidden mt-16">
          <div className="space-y-8">
            {milestones?.map((milestone, index) => (
              <motion.div
                key={milestone?.id}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Timeline Node */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full bg-${milestone?.color}/10 border-2 border-${milestone?.color}/30 flex items-center justify-center glass`}>
                    <Icon 
                      name={milestone?.icon} 
                      size={20} 
                      className={`text-${milestone?.color}`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className={`text-sm font-data text-${milestone?.color} mb-1`}>
                    {milestone?.year}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    {milestone?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {milestone?.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;