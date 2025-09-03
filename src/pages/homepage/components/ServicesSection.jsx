import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const services = [
    {
      id: 1,
      title: "AI & Machine Learning",
      description: "Intelligent solutions that learn, adapt, and evolve with your business needs through advanced neural networks and deep learning algorithms.",
      icon: "Brain",
      morphIcon: "Zap",
      color: "primary",
      features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics", "AI Chatbots"],
      demoType: "ai",
      price: "From $1500"
    },
    {
      id: 2,
      title: "Immersive Web Experiences",
      description: "Next-generation web applications with 3D visuals, AR/VR integration, and interactive elements that captivate and engage users.",
      icon: "Globe",
      morphIcon: "Eye",
      color: "secondary",
      features: ["3D Visualization", "WebGL Integration", "AR/VR Support", "Interactive UI"],
      demoType: "3d",
      price: "From $1200"
    },
    {
      id: 3,
      title: "Mobile Innovation",
      description: "Cross-platform mobile applications with native performance, AI integration, and cutting-edge features for iOS and Android.",
      icon: "Smartphone",
      morphIcon: "Rocket",
      color: "accent",
      features: ["Cross-Platform", "AI Integration", "Real-time Sync", "Push Notifications"],
      demoType: "mobile",
      price: "From $1800"
    },
    {
      id: 4,
      title: "Cloud Architecture",
      description: "Scalable cloud solutions with microservices, serverless computing, and enterprise-grade security for modern applications.",
      icon: "Cloud",
      morphIcon: "Shield",
      color: "primary",
      features: ["Microservices", "Auto-scaling", "Security First", "DevOps Integration"],
      demoType: "cloud",
      price: "From $2000 "
    },
    {
      id: 5,
      title: "Blockchain Solutions",
      description: "Decentralized applications, smart contracts, and cryptocurrency integration for next-generation financial technology.",
      icon: "Link",
      morphIcon: "Lock",
      color: "secondary",
      features: ["Smart Contracts", "DeFi Integration", "NFT Platforms", "Crypto Wallets"],
      demoType: "blockchain",
      price: "From $2500"
    },
    {
      id: 6,
      title: "IoT & Edge Computing",
      description: "Connected device ecosystems with real-time data processing, edge computing, and intelligent automation systems.",
      icon: "Cpu",
      morphIcon: "Wifi",
      color: "accent",
      features: ["Device Management", "Real-time Processing", "Edge Computing", "Data Analytics"],
      demoType: "iot",
      price: "From $2200"
    }
  ];

  const handleMouseMove = (e, cardId) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const y = e?.clientY - rect?.top;
    setMousePosition({ x, y });
  };

  const getDemoContent = (type) => {
    const demos = {
      ai: (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Processing natural language...</span>
          </div>
          <div className="bg-muted/20 rounded p-2 text-xs">
            <span className="text-primary">AI:</span> "How can I help you today?"
          </div>
        </div>
      ),
      "3d": (
        <div className="relative h-16 bg-muted/20 rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20"
            animate={{ x: [-100, 100, -100] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="Box" size={24} className="text-secondary animate-spin" />
          </div>
        </div>
      ),
      mobile: (
        <div className="flex space-x-2">
          <div className="w-8 h-12 bg-muted/20 rounded border border-accent/30 flex items-center justify-center">
            <Icon name="Smartphone" size={12} className="text-accent" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-2 bg-accent/30 rounded animate-pulse"></div>
            <div className="h-2 bg-accent/20 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      ),
      cloud: (
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 6 })?.map((_, i) => (
            <motion.div
              key={i}
              className="h-3 bg-primary/20 rounded"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      ),
      blockchain: (
        <div className="flex items-center space-x-1">
          {Array.from({ length: 4 })?.map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 border border-secondary rounded"
              animate={{ borderColor: ['rgba(166, 108, 255, 0.3)', 'rgba(166, 108, 255, 1)', 'rgba(166, 108, 255, 0.3)'] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      ),
      iot: (
        <div className="relative">
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 })?.map((_, i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-accent/20 rounded-full border border-accent/50 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                <div className="w-1 h-1 bg-accent rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    };
    return demos?.[type] || null;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 10, repeat: Infinity }}
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
            CUTTING-EDGE_SOLUTIONS
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Revolutionary Services
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pioneering the future with AI-driven innovation, immersive experiences, 
            and next-generation technology solutions that transform businesses and 
            create extraordinary digital journeys.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <motion.div
              key={service?.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(service?.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onMouseMove={(e) => handleMouseMove(e, service?.id)}
            >
              {/* Card Container with Tilt Effect */}
              <motion.div
                className="relative h-full glass rounded-2xl p-6 border border-border/30 overflow-hidden cursor-pointer"
                style={{
                  transform: hoveredCard === service?.id 
                    ? `perspective(1000px) rotateX(${(mousePosition?.y - 150) * 0.05}deg) rotateY(${(mousePosition?.x - 150) * 0.05}deg)`
                    : 'none'
                }}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: `var(--color-${service?.color})`,
                  boxShadow: `0 0 30px rgba(${service?.color === 'primary' ? '0, 224, 255' : service?.color === 'secondary' ? '166, 108, 255' : '0, 255, 136'}, 0.3)`
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover Gradient Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-${service?.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Icon Section */}
                <div className="relative mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-${service?.color}/10 border border-${service?.color}/30 flex items-center justify-center mb-4 group-hover:glow-${service?.color} transition-all duration-300`}
                  >
                    <motion.div
                      animate={hoveredCard === service?.id ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon 
                        name={hoveredCard === service?.id ? service?.morphIcon : service?.icon} 
                        size={28} 
                        className={`text-${service?.color} transition-all duration-300`}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Price Tag */}
                  <div className={`absolute top-0 right-0 text-xs font-data text-${service?.color} bg-${service?.color}/10 px-2 py-1 rounded-lg border border-${service?.color}/30`}>
                    {service?.price}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service?.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service?.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service?.features?.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center space-x-2 text-xs"
                        initial={{ opacity: 0, x: -10 }}
                        animate={hoveredCard === service?.id ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className={`w-1 h-1 bg-${service?.color} rounded-full`}></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Interactive Demo */}
                  <motion.div
                    className="mt-4 p-3 rounded-lg bg-muted/10 border border-border/30"
                    initial={{ height: 0, opacity: 0 }}
                    animate={hoveredCard === service?.id ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-xs text-muted-foreground mb-2 font-data">LIVE DEMO:</div>
                    {getDemoContent(service?.demoType)}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={hoveredCard === service?.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      className={`w-full border-${service?.color}/30 text-${service?.color} hover:bg-${service?.color}/10 hover:glow-${service?.color} transition-all duration-300`}
                      onClick={() => window.location.href = '/services-catalog'}
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </div>

                {/* Floating Particles */}
                {hoveredCard === service?.id && (
                  <>
                    {Array.from({ length: 5 })?.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-${service?.color} rounded-full`}
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + i * 10}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button
            variant="default"
            size="lg"
            iconName="Sparkles"
            iconPosition="left"
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-background glow-primary hover:glow-lg transition-all duration-300"
            onClick={() => window.location.href = '/services-catalog'}
          >
            Explore All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;