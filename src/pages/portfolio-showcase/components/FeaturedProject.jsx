import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProject = ({ project, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <Image
          src={project?.heroImage}
          alt={project?.title}
          className={`w-full h-full object-cover transition-transform duration-1000 ${
            isHovered ? 'scale-110' : 'scale-105'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)]?.map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Holographic Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,224,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,224,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Featured Badge */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full glass border border-accent/30 glow-accent">
                <Icon name="Star" size={16} className="text-accent" />
                <span className="text-sm font-data text-accent">Featured Project</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                <span className="text-xs font-data">{project?.year}</span>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 leading-tight">
                {project?.title}
              </h1>
              <p className="text-xl text-primary font-data mb-2">{project?.client}</p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project?.tagline}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-6">
              {project?.keyMetrics?.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent font-data mb-1">
                    {metric?.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric?.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div>
              <p className="text-sm text-muted-foreground mb-3 font-data">Built with</p>
              <div className="flex flex-wrap gap-2">
                {project?.technologies?.slice(0, 6)?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-lg text-sm bg-secondary/10 text-secondary border border-secondary/20"
                  >
                    {tech}
                  </span>
                ))}
                {project?.technologies?.length > 6 && (
                  <span className="px-3 py-1 rounded-lg text-sm bg-muted/20 text-muted-foreground">
                    +{project?.technologies?.length - 6} more
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={() => onViewDetails(project)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary hover:glow-lg transition-glow"
              >
                <Icon name="Eye" size={20} className="mr-2" />
                View Case Study
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-accent/30 text-accent hover:bg-accent/10 hover:glow-accent transition-glow"
                onClick={() => window.open(project?.liveUrl, '_blank')}
              >
                <Icon name="ExternalLink" size={20} className="mr-2" />
                View Live Site
              </Button>
            </div>

            {/* Awards */}
            {project?.awards && project?.awards?.length > 0 && (
              <div className="flex items-center space-x-4 pt-4 border-t border-border/30">
                <Icon name="Award" size={20} className="text-warning" />
                <div className="flex flex-wrap gap-2">
                  {project?.awards?.map((award, index) => (
                    <span
                      key={index}
                      className="text-sm text-warning font-data"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Interactive Preview */}
          <div className="relative">
            {/* Device Mockup */}
            <div className="relative glass rounded-3xl p-8 border border-border/30 glow-primary">
              {/* Screen */}
              <div className="relative h-96 rounded-2xl overflow-hidden bg-background/50">
                <Image
                  src={project?.previewImage}
                  alt={`${project?.title} Preview`}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                />
                
                {/* Interactive Hotspots */}
                <div className="absolute inset-0">
                  {project?.hotspots?.map((hotspot, index) => (
                    <div
                      key={index}
                      className="absolute w-4 h-4 bg-accent rounded-full animate-pulse cursor-pointer hover:scale-150 transition-transform"
                      style={{ 
                        left: `${hotspot?.x}%`, 
                        top: `${hotspot?.y}%`,
                        animationDelay: `${index * 0.5}s`
                      }}
                      title={hotspot?.description}
                    />
                  ))}
                </div>

                {/* Play Button Overlay */}
                {project?.hasVideo && (
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Button
                      variant="default"
                      size="lg"
                      className="glass glow-primary animate-pulse"
                      onClick={() => onViewDetails(project)}
                    >
                      <Icon name="Play" size={32} className="text-primary" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Device Details */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                </div>
                <div className="text-xs text-muted-foreground font-data">
                  {project?.deviceType || 'Desktop Preview'}
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 glass rounded-xl p-4 border border-accent/30 glow-accent">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-accent" />
                <div>
                  <div className="text-lg font-bold text-accent font-data">
                    {project?.performanceScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Performance</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 glass rounded-xl p-4 border border-secondary/30 glow-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-secondary" />
                <div>
                  <div className="text-lg font-bold text-secondary font-data">
                    {project?.userSatisfaction}%
                  </div>
                  <div className="text-xs text-muted-foreground">User Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-muted-foreground font-data">Scroll to explore</span>
          <Icon name="ChevronDown" size={20} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;