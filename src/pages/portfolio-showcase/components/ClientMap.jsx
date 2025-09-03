import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientMap = ({ clients }) => {
  const [activeClient, setActiveClient] = useState(null);
  const [animatedClients, setAnimatedClients] = useState([]);

  useEffect(() => {
    // Animate client pins with staggered delays
    const timer = setTimeout(() => {
      clients?.forEach((client, index) => {
        setTimeout(() => {
          setAnimatedClients(prev => [...prev, client?.id]);
        }, index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [clients]);

  const handleClientClick = (client) => {
    setActiveClient(activeClient?.id === client?.id ? null : client);
  };

  return (
    <div className="relative py-16 bg-gradient-to-b from-background to-muted/10">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Global Client Network
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by companies worldwide, from startups to Fortune 500 enterprises
          </p>
        </div>
      </div>
      {/* World Map Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative glass rounded-3xl p-8 border border-border/30 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(0,224,255,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,224,255,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }} />
          </div>

          {/* Map Container */}
          <div className="relative h-96 md:h-[500px] bg-muted/10 rounded-2xl overflow-hidden">
            {/* Google Maps Iframe */}
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Global Client Locations"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.7128,-74.0060&z=2&output=embed"
              className="rounded-2xl"
            />

            {/* Client Location Pins */}
            <div className="absolute inset-0">
              {clients?.map((client, index) => (
                <div
                  key={client?.id}
                  className={`absolute cursor-pointer transition-all duration-500 ${
                    animatedClients?.includes(client?.id) 
                      ? 'opacity-100 scale-100' :'opacity-0 scale-0'
                  }`}
                  style={{
                    left: `${client?.mapPosition?.x}%`,
                    top: `${client?.mapPosition?.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleClientClick(client)}
                >
                  {/* Pin */}
                  <div className={`relative w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                    activeClient?.id === client?.id
                      ? 'bg-accent border-accent glow-accent scale-150' :'bg-primary border-primary glow-primary hover:scale-125'
                  }`}>
                    {/* Pulse Animation */}
                    <div className={`absolute inset-0 rounded-full animate-ping ${
                      activeClient?.id === client?.id ? 'bg-accent' : 'bg-primary'
                    }`} />
                    
                    {/* Inner Dot */}
                    <div className="absolute inset-1 rounded-full bg-background" />
                  </div>

                  {/* Client Info Popup */}
                  {activeClient?.id === client?.id && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 glass rounded-xl p-4 border border-accent/30 glow-accent animate-fade-in z-10">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                          <Icon name="Building" size={20} className="text-background" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm mb-1">
                            {client?.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {client?.location}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                            {client?.description}
                          </p>
                          
                          {/* Project Count */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-accent font-data">
                              {client?.projectCount} projects
                            </span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)]?.map((_, i) => (
                                <Icon 
                                  key={i} 
                                  name="Star" 
                                  size={10} 
                                  className={i < client?.rating ? "text-warning fill-current" : "text-muted-foreground"} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {clients?.map((client, index) => {
                if (index === 0) return null;
                const prevClient = clients?.[index - 1];
                return (
                  <line
                    key={`line-${client?.id}`}
                    x1={`${prevClient?.mapPosition?.x}%`}
                    y1={`${prevClient?.mapPosition?.y}%`}
                    x2={`${client?.mapPosition?.x}%`}
                    y2={`${client?.mapPosition?.y}%`}
                    stroke="rgba(0,224,255,0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="glass text-foreground hover:text-primary"
              onClick={() => setActiveClient(null)}
            >
              <Icon name="RotateCcw" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="glass text-foreground hover:text-primary"
            >
              <Icon name="Maximize" size={16} />
            </Button>
          </div>
        </div>

        {/* Client Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div className="glass rounded-xl p-6 border border-border/30 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary p-3 mx-auto mb-4 glow-primary">
              <Icon name="Globe" size={24} className="text-background" />
            </div>
            <div className="text-2xl font-bold text-primary font-data mb-1">
              {new Set(clients.map(c => c.country))?.size}
            </div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>

          <div className="glass rounded-xl p-6 border border-border/30 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary p-3 mx-auto mb-4 glow-accent">
              <Icon name="Building" size={24} className="text-background" />
            </div>
            <div className="text-2xl font-bold text-accent font-data mb-1">
              {clients?.length}
            </div>
            <div className="text-sm text-muted-foreground">Clients</div>
          </div>

          <div className="glass rounded-xl p-6 border border-border/30 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent p-3 mx-auto mb-4 glow-secondary">
              <Icon name="Briefcase" size={24} className="text-background" />
            </div>
            <div className="text-2xl font-bold text-secondary font-data mb-1">
              {clients?.reduce((acc, client) => acc + client?.projectCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>

          <div className="glass rounded-xl p-6 border border-border/30 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning to-accent p-3 mx-auto mb-4 glow-warning">
              <Icon name="Star" size={24} className="text-background" />
            </div>
            <div className="text-2xl font-bold text-warning font-data mb-1">
              {(clients?.reduce((acc, client) => acc + client?.rating, 0) / clients?.length)?.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
        </div>

        {/* Client Testimonials Carousel */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
              What Our Clients Say
            </h3>
            <p className="text-muted-foreground">
              Success stories from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients?.slice(0, 3)?.map((client) => (
              <div key={client?.id} className="glass rounded-xl p-6 border border-border/30">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-sm font-bold text-background">
                      {client?.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{client?.name}</div>
                    <div className="text-xs text-muted-foreground">{client?.location}</div>
                  </div>
                </div>
                
                <blockquote className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  "{client?.testimonial}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={12} 
                        className={i < client?.rating ? "text-warning fill-current" : "text-muted-foreground"} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-primary font-data">
                    {client?.projectCount} projects
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMap;