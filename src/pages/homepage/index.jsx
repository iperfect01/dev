import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import AIContextualSuggestions from '../../components/ui/AIContextualSuggestions';
import FloatingShoppingCart from '../../components/ui/FloatingShoppingCart';
import VoiceAssistant from '../../components/ui/VoiceAssistant';

import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AIServiceQuiz from './components/AIServiceQuiz';
import TimelineSection from './components/TimelineSection';
import ResultsSection from './components/ResultsSection';

const Homepage = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add custom scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head?.appendChild(style);

    return () => {
      document.head?.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fixed Header */}
      <Header />
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroSection />
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, threshold: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <ServicesSection />
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, threshold: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <TimelineSection />
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, threshold: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <ResultsSection />
        </motion.div>

        {/* Footer Section */}
        <motion.footer
          className="py-16 bg-gradient-to-t from-background via-muted/5 to-background border-t border-border/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, threshold: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent p-2 glow-primary">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-background"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-background"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-background"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      DevPerfection
                    </h3>
                    <p className="text-sm text-muted-foreground font-data">
                      Where innovation meets perfection
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                  Transforming businesses through cutting-edge AI solutions, immersive experiences, 
                  and next-generation technology that creates extraordinary digital journeys.
                </p>
                <div className="flex space-x-4">
                  {['Github', 'Twitter', 'Linkedin', 'Youtube']?.map((social) => (
                    <button
                      key={social}
                      className="w-10 h-10 rounded-lg bg-muted/20 hover:bg-primary/10 border border-border/30 hover:border-primary/30 flex items-center justify-center transition-all duration-300 hover:glow-primary"
                    >
                      <span className="text-xs font-data text-muted-foreground hover:text-primary transition-colors">
                        {social?.charAt(0)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-4">Solutions</h4>
                <ul className="space-y-2">
                  {['AI & Machine Learning', 'Web Development', 'Mobile Apps', 'Cloud Services']?.map((link) => (
                    <li key={link}>
                      <button className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>devperfection0@gmail.com</li>
                  <li>+250794739944</li>
                  <li>Kigali, Rwanda</li>
                  <li>Available 24/7</li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground font-data">
                © {new Date()?.getFullYear()} DevPerfection. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy']?.map((link) => (
                  <button
                    key={link}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </main>
      {/* Floating Components */}
      <AIServiceQuiz />
      <AIContextualSuggestions />
      <FloatingShoppingCart />
      <VoiceAssistant />
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 224, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 224, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Particles */}
        {Array.from({ length: 30 })?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;