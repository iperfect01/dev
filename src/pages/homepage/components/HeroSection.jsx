import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const heroTexts = [
    "Transforming Ideas into Digital Reality",
    "where innovation meets perfection",
    "Building Tomorrow\'s Technology Today",
    "Where Creativity Meets Code"
  ];

  const glitchTexts = [
    "FUTURE_READY_SOLUTIONS",
    "NEXT_GEN_DEVELOPMENT",
    "QUANTUM_LEAP_INNOVATION"
  ];

  // Typing animation effect
  useEffect(() => {
    const text = heroTexts?.[textIndex];
    let currentIndex = 0;
    
    const typeText = () => {
      if (currentIndex <= text?.length) {
        setCurrentText(text?.slice(0, currentIndex));
        currentIndex++;
        setTimeout(typeText, 100);
      } else {
        setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => {
            setTextIndex((prev) => (prev + 1) % heroTexts?.length);
            setCurrentText('');
            setIsTyping(true);
          }, 2000);
        }, 1000);
      }
    };

    if (isTyping) {
      typeText();
    }
  }, [textIndex, isTyping]);

  // 3D Globe Animation
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas?.offsetWidth;
      canvas.height = canvas?.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Globe parameters
    const centerX = canvas?.width / 2;
    const centerY = canvas?.height / 2;
    const radius = Math.min(canvas?.width, canvas?.height) * 0.3;
    
    // Data nodes
    const nodes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      lat: (Math.random() - 0.5) * Math.PI,
      lng: Math.random() * 2 * Math.PI,
      size: Math.random() * 4 + 2,
      pulse: Math.random() * 2 * Math.PI,
      color: ['#00E0FF', '#A66CFF', '#00FF88']?.[Math.floor(Math.random() * 3)]
    }));

    let rotation = 0;

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      
      // Draw globe wireframe
      ctx.strokeStyle = 'rgba(192, 208, 227, 0.2)';
      ctx.lineWidth = 1;
      
      // Meridians
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * 2 * Math.PI + rotation;
        ctx?.beginPath();
        for (let j = 0; j <= 50; j++) {
          const lat = (j / 50 - 0.5) * Math.PI;
          const x = centerX + Math.cos(lat) * Math.cos(angle) * radius;
          const y = centerY + Math.sin(lat) * radius;
          const z = Math.cos(lat) * Math.sin(angle) * radius;
          
          if (z > 0) {
            if (j === 0) ctx?.moveTo(x, y);
            else ctx?.lineTo(x, y);
          }
        }
        ctx?.stroke();
      }
      
      // Parallels
      for (let i = 0; i < 8; i++) {
        const lat = (i / 8 - 0.5) * Math.PI;
        const r = Math.cos(lat) * radius;
        ctx?.beginPath();
        for (let j = 0; j <= 100; j++) {
          const lng = (j / 100) * 2 * Math.PI + rotation;
          const x = centerX + Math.cos(lng) * r;
          const y = centerY + Math.sin(lat) * radius;
          const z = Math.sin(lng) * r;
          
          if (z > -r * 0.5) {
            if (j === 0) ctx?.moveTo(x, y);
            else ctx?.lineTo(x, y);
          }
        }
        ctx?.stroke();
      }

      // Draw data nodes
      nodes?.forEach(node => {
        const x = centerX + Math.cos(node?.lat) * Math.cos(node?.lng + rotation) * radius;
        const y = centerY + Math.sin(node?.lat) * radius;
        const z = Math.cos(node?.lat) * Math.sin(node?.lng + rotation) * radius;
        
        if (z > 0) {
          const pulse = Math.sin(Date.now() * 0.005 + node?.pulse) * 0.5 + 0.5;
          const size = node?.size * (0.5 + pulse * 0.5);
          
          // Glow effect
          const gradient = ctx?.createRadialGradient(x, y, 0, x, y, size * 3);
          gradient?.addColorStop(0, node?.color + '80');
          gradient?.addColorStop(1, node?.color + '00');
          
          ctx.fillStyle = gradient;
          ctx?.beginPath();
          ctx?.arc(x, y, size * 3, 0, 2 * Math.PI);
          ctx?.fill();
          
          // Core node
          ctx.fillStyle = node?.color;
          ctx?.beginPath();
          ctx?.arc(x, y, size, 0, 2 * Math.PI);
          ctx?.fill();
        }
      });

      rotation += 0.005;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="absolute inset-0 holographic-gradient opacity-30"></div>
        
        {/* Floating Particles */}
        {Array.from({ length: 20 })?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            {/* Glitch Text */}
            <motion.div
              className="text-sm font-data text-accent opacity-80"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {glitchTexts?.[Math.floor(Date.now() / 3000) % glitchTexts?.length]}
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {currentText}
                </span>
                <motion.span
                  className="inline-block w-1 h-12 md:h-16 lg:h-20 bg-primary ml-2"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </h1>
              
              <motion.p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Pioneering the future of digital innovation with AI-powered solutions, 
                immersive experiences, and cutting-edge technology that transforms businesses 
                and creates extraordinary user journeys.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                variant="default"
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-background glow-primary hover:glow-lg transition-all duration-300 group"
                onClick={() => window.location.href = '/services-catalog'}
              >
                <span className="group-hover:scale-105 transition-transform">
                  Explore Solutions
                </span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="border-accent/30 text-accent hover:bg-accent/10 hover:glow-accent transition-all duration-300"
                onClick={() => {
                  // Play demo video
                  console.log('Play demo video');
                }}
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8 border-t border-border/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[
                { number: '500+', label: 'Projects Delivered' },
                { number: '98%', label: 'Client Satisfaction' },
                { number: '24/7', label: 'AI Support' }
              ]?.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-data font-bold text-accent mb-1">
                    {stat?.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat?.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Globe Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
              {/* Canvas for 3D Globe */}
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0, 224, 255, 0.3))' }}
              />
              
              {/* Floating Info Cards */}
              <motion.div
                className="absolute top-16 -left-4 glass rounded-xl p-4 border border-primary/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium text-foreground">AI Processing</div>
                    <div className="text-xs text-muted-foreground font-data">Real-time</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-20 -right-4 glass rounded-xl p-4 border border-secondary/20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Global Reach</div>
                    <div className="text-xs text-muted-foreground font-data">50+ Countries</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 right-8 glass rounded-xl p-4 border border-accent/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Innovation</div>
                    <div className="text-xs text-muted-foreground font-data">24/7 Active</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-muted-foreground font-data">Scroll to explore</span>
          <Icon name="ChevronDown" size={20} className="text-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;