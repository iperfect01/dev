import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AIContextualSuggestions from '../../components/ui/AIContextualSuggestions';
import FloatingShoppingCart from '../../components/ui/FloatingShoppingCart';
import VoiceAssistant from '../../components/ui/VoiceAssistant';

import ContactForm from './components/ContactForm';
import QuoteGenerator from './components/QuoteGenerator';
import InteractiveWorldMap from './components/InteractiveWorldMap';
import AIServiceQuiz from './components/AIServiceQuiz';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ContactQuoteGenerator = () => {
  const [formData, setFormData] = useState({});
  const [selectedServices, setSelectedServices] = useState([]);
  const [activeTab, setActiveTab] = useState('contact');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const handleServiceChange = (services) => {
    setSelectedServices(services);
  };

  const handleServiceRecommendation = (recommendations) => {
    // Extract service IDs from recommendations and add to selected services
    const recommendedServices = recommendations?.map(rec => rec?.service);
    setSelectedServices(prev => [...new Set([...prev, ...recommendedServices])]);
  };

  const tabs = [
    { id: 'contact', label: 'Contact Form', icon: 'MessageSquare' },
    { id: 'quiz', label: 'Service Quiz', icon: 'HelpCircle' },
    { id: 'quote', label: 'Live Quote', icon: 'Calculator' },
    { id: 'map', label: 'Global Reach', icon: 'Globe' }
  ];

  return (
    <>
      <Helmet>
        <title>Contact & Quote Generator - DevPerfection |iperfect AI-Powered Project Estimates</title>
        <meta 
          name="description" 
          content="Get instant iperfect AI-powered project quotes and connect with our global team. Interactive contact form with real-time validation, service recommendations, and timezone-aware meeting scheduling." 
        />
        <meta name="keywords" content="contact, quote generator, AI estimates, project consultation, global team, meeting scheduler" />
        <meta property="og:title" content="Contact & Quote Generator - DevPerfection" />
        <meta property="og:description" content="Get instant iperfect AI-powered project quotes and connect with our global team." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact-quote-generator" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section className="relative pt-24 pb-12 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-data mb-6 border border-primary/20 glow-primary">
                <Icon name="Sparkles" size={16} />
                <span>iperfect AI Quote Generation</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6">
                Get Your{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Custom Quote
                </span>
                <br />
                in Minutes
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Experience our iperfect AI-powered quote generator that analyzes your project requirements 
                and provides instant, accurate estimates with personalized service recommendations.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-primary">24h</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-secondary">95%</div>
                  <div className="text-sm text-muted-foreground">Quote Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading font-bold text-accent">500+</div>
                  <div className="text-sm text-muted-foreground">Projects Quoted</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setActiveTab('contact')}
                  className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-background glow-primary hover:glow-lg transition-glow"
                >
                  <Icon name="MessageSquare" size={20} className="mr-2" />
                  Start Your Project
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setActiveTab('quiz')}
                  className="border-secondary/30 text-secondary hover:bg-secondary/10 hover:glow-secondary transition-glow"
                >
                  <Icon name="HelpCircle" size={20} className="mr-2" />
                  Take Service Quiz
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="sticky top-16 z-30 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-1 py-4">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab?.id
                      ? 'bg-primary/10 text-primary border border-primary/20 glow-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span className="font-data">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Contact Form Tab */}
            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <ContactForm
                    onFormChange={handleFormChange}
                    selectedServices={selectedServices}
                    onServiceChange={handleServiceChange}
                  />
                </div>
                
                <div className="space-y-8">
                  <QuoteGenerator
                    formData={formData}
                    selectedServices={selectedServices}
                  />
                  <TrustSignals />
                </div>
              </div>
            )}

            {/* Service Quiz Tab */}
            {activeTab === 'quiz' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <AIServiceQuiz onServiceRecommendation={handleServiceRecommendation} />
                </div>
                
                <div className="space-y-6">
                  <QuoteGenerator
                    formData={formData}
                    selectedServices={selectedServices}
                  />
                </div>
              </div>
            )}

            {/* Live Quote Tab */}
            {activeTab === 'quote' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <QuoteGenerator
                    formData={formData}
                    selectedServices={selectedServices}
                  />
                </div>
                
                <div className="space-y-8">
                  <ContactForm
                    onFormChange={handleFormChange}
                    selectedServices={selectedServices}
                    onServiceChange={handleServiceChange}
                  />
                </div>
              </div>
            )}

            {/* Global Reach Tab */}
            {activeTab === 'map' && (
              <div className="space-y-8">
                <InteractiveWorldMap />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ContactForm
                    onFormChange={handleFormChange}
                    selectedServices={selectedServices}
                    onServiceChange={handleServiceChange}
                  />
                  
                  <TrustSignals />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Call to Action Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          </div>

          <div className="relative max-w-4xl mx-auto text-center px-6 lg:px-8">
            <div className="glass rounded-3xl p-12 border border-primary/20 shadow-depth">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-5 glow-primary">
                <Icon name="Rocket" size={40} className="text-background" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Ready to Transform Your Ideas?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 500+ successful projects and experience the DevPerfection difference. 
                Our iperfect AI-powered approach ensures accurate quotes and exceptional results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setActiveTab('contact')}
                  className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-background glow-primary hover:glow-lg transition-glow"
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Get Started Now
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/portfolio-showcase'}
                  className="border-accent/30 text-accent hover:bg-accent/10 hover:glow-accent transition-glow"
                >
                  <Icon name="Eye" size={20} className="mr-2" />
                  View Our Work
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} className="text-accent" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-primary" />
                    <span>24h Response</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-secondary" />
                    <span>500+ Happy Clients</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Award" size={16} className="text-warning" />
                    <span>Industry Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Components */}
        <AIContextualSuggestions />
        <FloatingShoppingCart />
        <VoiceAssistant />
        
        {/* Scroll to Top Button */}
        {isScrolled && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-24 w-12 h-12 glass rounded-full border border-primary/20 text-primary hover:text-primary-foreground hover:bg-primary glow-primary hover:glow-lg transition-all duration-300 z-40"
          >
            <Icon name="ArrowUp" size={20} className="mx-auto" />
          </button>
        )}
      </div>
    </>
  );
};

export default ContactQuoteGenerator;