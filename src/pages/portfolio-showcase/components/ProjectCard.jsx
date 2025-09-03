import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative glass rounded-2xl overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:glow-primary"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image with Overlay */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Video Preview Button */}
        {project?.hasVideo && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button
              variant="default"
              size="lg"
              className="glass glow-primary animate-pulse"
              onClick={() => onViewDetails(project)}
            >
              <Icon name="Play" size={24} className="text-primary" />
            </Button>
          </div>
        )}

        {/* Project Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-data bg-primary/20 text-primary border border-primary/30 glow-primary">
            {project?.type}
          </span>
        </div>

        {/* Featured Badge */}
        {project?.featured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 glow-accent">
              <Icon name="Star" size={12} />
              <span className="text-xs font-data">Featured</span>
            </div>
          </div>
        )}
      </div>
      {/* Project Content */}
      <div className="p-6">
        {/* Client Logo */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-muted/20 flex items-center justify-center">
              <Icon name="Building" size={16} className="text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground font-data">{project?.client}</span>
          </div>
          <div className="flex items-center space-x-1 text-warning">
            {[...Array(5)]?.map((_, i) => (
              <Icon 
                key={i} 
                name="Star" 
                size={12} 
                className={i < project?.rating ? "text-warning fill-current" : "text-muted-foreground"} 
              />
            ))}
          </div>
        </div>

        {/* Project Title */}
        <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {project?.title}
        </h3>

        {/* Project Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {project?.description}
        </p>

        {/* Technology Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project?.technologies?.slice(0, 3)?.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-md text-xs bg-secondary/10 text-secondary border border-secondary/20"
            >
              {tech}
            </span>
          ))}
          {project?.technologies?.length > 3 && (
            <span className="px-2 py-1 rounded-md text-xs bg-muted/20 text-muted-foreground">
              +{project?.technologies?.length - 3} more
            </span>
          )}
        </div>

        {/* Project Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 rounded-lg bg-muted/10 border border-border/20">
          <div className="text-center">
            <div className="text-lg font-bold text-accent font-data">{project?.metrics?.duration}</div>
            <div className="text-xs text-muted-foreground">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary font-data">{project?.metrics?.team}</div>
            <div className="text-xs text-muted-foreground">Team Size</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-secondary font-data">{project?.metrics?.budget}</div>
            <div className="text-xs text-muted-foreground">Budget</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(project)}
            className="border-primary/30 text-primary hover:bg-primary/10 hover:glow-primary transition-glow"
          >
            <Icon name="Eye" size={16} className="mr-2" />
            View Details
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-accent hover:bg-accent/10"
            >
              <Icon name="ExternalLink" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-secondary hover:bg-secondary/10"
            >
              <Icon name="Heart" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
        isHovered ? 'shadow-[0_0_30px_rgba(0,224,255,0.3)]' : ''
      }`} />
    </div>
  );
};

export default ProjectCard;