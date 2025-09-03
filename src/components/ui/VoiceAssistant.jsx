import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);
  const location = useLocation();

  // Voice commands for different pages
  const getPageCommands = (pathname) => {
    const commandMap = {
      '/homepage': [
        'Show me services',
        'View portfolio',
        'Contact sales',
        'Get started'
      ],
      '/services-catalog': [
        'Add to cart',
        'Show pricing',
        'Compare services',
        'Get quote'
      ],
      '/portfolio-showcase': [
        'Show details',
        'Contact about project',
        'Similar projects',
        'Get quote'
      ],
      '/e-commerce-store': [
        'Add to cart',
        'Checkout',
        'Show bundle deals',
        'Calculate total'
      ],
      '/contact-quote-generator': [
        'Fill form',
        'Schedule meeting',
        'Get estimate',
        'Submit request'
      ]
    };

    return commandMap?.[pathname] || [];
  };

  useEffect(() => {
    // Check if Speech Recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setResponse('');
      };

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event?.resultIndex; i < event?.results?.length; i++) {
          const transcript = event?.results?.[i]?.[0]?.transcript;
          if (event?.results?.[i]?.isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (transcript) {
          processVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        setIsListening(false);
        setResponse(`Error: ${event?.error}`);
      };
    }

    return () => {
      if (recognitionRef?.current) {
        recognitionRef?.current?.stop();
      }
    };
  }, [transcript]);

  const processVoiceCommand = async (command) => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerCommand = command?.toLowerCase();
    let responseText = '';
    let action = null;

    // Navigation commands
    if (lowerCommand?.includes('go to') || lowerCommand?.includes('navigate to')) {
      if (lowerCommand?.includes('home')) {
        responseText = 'Navigating to homepage';
        action = () => window.location.href = '/homepage';
      } else if (lowerCommand?.includes('services')) {
        responseText = 'Opening services catalog';
        action = () => window.location.href = '/services-catalog';
      } else if (lowerCommand?.includes('portfolio')) {
        responseText = 'Showing portfolio';
        action = () => window.location.href = '/portfolio-showcase';
      } else if (lowerCommand?.includes('store')) {
        responseText = 'Opening store';
        action = () => window.location.href = '/e-commerce-store';
      } else if (lowerCommand?.includes('contact')) {
        responseText = 'Opening contact form';
        action = () => window.location.href = '/contact-quote-generator';
      }
    }
    // Page-specific commands
    else if (location?.pathname === '/services-catalog') {
      if (lowerCommand?.includes('add to cart')) {
        responseText = 'Which service would you like to add to cart?';
      } else if (lowerCommand?.includes('pricing') || lowerCommand?.includes('price')) {
        responseText = 'Showing pricing information';
        action = () => {
          const pricingSection = document.querySelector('[data-section="pricing"]');
          if (pricingSection) pricingSection?.scrollIntoView({ behavior: 'smooth' });
        };
      } else if (lowerCommand?.includes('quote')) {
        responseText = 'Opening quote generator';
        action = () => window.location.href = '/contact-quote-generator';
      }
    }
    else if (location?.pathname === '/contact-quote-generator') {
      if (lowerCommand?.includes('fill form')) {
        responseText = 'I can help you fill the form. What\'s your name?';
      } else if (lowerCommand?.includes('schedule')) {
        responseText = 'Opening calendar for meeting scheduling';
        action = () => {
          const calendarSection = document.querySelector('[data-section="calendar"]');
          if (calendarSection) calendarSection?.scrollIntoView({ behavior: 'smooth' });
        };
      }
    }
    // General commands
    else if (lowerCommand?.includes('help')) {
      const commands = getPageCommands(location?.pathname);
      responseText = `Here are some things you can say: ${commands?.slice(0, 3)?.join(', ')}`;
    } else if (lowerCommand?.includes('scroll up')) {
      responseText = 'Scrolling up';
      action = () => window.scrollBy(0, -300);
    } else if (lowerCommand?.includes('scroll down')) {
      responseText = 'Scrolling down';
      action = () => window.scrollBy(0, 300);
    } else {
      responseText = 'I didn\'t understand that command. Try saying "help" to see available commands.';
    }

    setResponse(responseText);
    setIsProcessing(false);

    // Execute action if provided
    if (action) {
      setTimeout(action, 1500);
    }

    // Auto-collapse after response
    setTimeout(() => {
      if (!isListening) {
        setIsExpanded(false);
      }
    }, 4000);
  };

  const startListening = () => {
    if (recognitionRef?.current && isSupported) {
      setIsExpanded(true);
      recognitionRef?.current?.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef?.current) {
      recognitionRef?.current?.stop();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      {/* Collapsed State - Voice Button */}
      {!isExpanded && (
        <Button
          variant="default"
          size="lg"
          onClick={startListening}
          className={`glass transition-all duration-300 animate-float shadow-depth ${
            isListening 
              ? 'glow-secondary bg-secondary/20' :'glow-secondary hover:glow-lg bg-secondary/10'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Icon 
              name={isListening ? "MicOff" : "Mic"} 
              size={20} 
              className={`${isListening ? 'text-secondary animate-pulse' : 'text-secondary'}`}
            />
            <span className="font-data text-sm text-foreground">
              {isListening ? 'Listening...' : 'Voice Assistant'}
            </span>
          </div>
        </Button>
      )}
      {/* Expanded State - Voice Interface */}
      {isExpanded && (
        <div className="glass rounded-2xl p-6 shadow-depth border border-secondary/20 animate-slide-in-right">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Bot" size={20} className="text-secondary" />
              <h3 className="font-heading font-semibold text-foreground">Voice Assistant</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Minimize2" size={16} />
              </Button>
            </div>
          </div>

          {/* Voice Visualization */}
          <div className="mb-4 p-4 rounded-xl bg-secondary/5 border border-secondary/20">
            <div className="flex items-center justify-center space-x-2 mb-3">
              {isListening && (
                <>
                  <div className="w-2 h-8 bg-secondary rounded-full animate-pulse"></div>
                  <div className="w-2 h-12 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-6 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-10 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-4 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </>
              )}
              {!isListening && !isProcessing && (
                <Icon name="Mic" size={32} className="text-muted-foreground" />
              )}
              {isProcessing && (
                <Icon name="Loader" size={32} className="text-secondary animate-spin" />
              )}
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                {isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'Ready to help'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isListening ? 'Speak your command' : 'Click the microphone to start'}
              </p>
            </div>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="mb-4 p-3 rounded-lg bg-muted/20 border border-border/30">
              <p className="text-sm text-foreground">
                <span className="text-muted-foreground">You said:</span> "{transcript}"
              </p>
            </div>
          )}

          {/* Response */}
          {response && (
            <div className="mb-4 p-3 rounded-lg bg-secondary/10 border border-secondary/30">
              <p className="text-sm text-foreground">
                <span className="text-secondary">Assistant:</span> {response}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Button
              variant={isListening ? "destructive" : "default"}
              size="sm"
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className={isListening ? "glow-destructive" : "glow-secondary"}
            >
              <Icon name={isListening ? "MicOff" : "Mic"} size={16} className="mr-2" />
              {isListening ? 'Stop' : 'Start'}
            </Button>
          </div>

          {/* Quick Commands */}
          <div className="border-t border-border/50 pt-4">
            <p className="text-xs text-muted-foreground mb-2 font-data">Quick Commands:</p>
            <div className="grid grid-cols-2 gap-2">
              {getPageCommands(location?.pathname)?.slice(0, 4)?.map((command, index) => (
                <button
                  key={index}
                  onClick={() => processVoiceCommand(command)}
                  className="text-xs p-2 rounded-lg bg-muted/20 hover:bg-secondary/10 text-muted-foreground hover:text-secondary transition-colors text-left"
                >
                  "{command}"
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-data">Powered by iperfect AI</span>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-secondary rounded-full animate-pulse"></div>
                <span>Always learning</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;