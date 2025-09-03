import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'gallery', label: 'Gallery', icon: 'Image' },
    { id: 'results', label: 'Results', icon: 'TrendingUp' },
    { id: 'testimonial', label: 'Testimonial', icon: 'MessageSquare' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project?.gallery?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project?.gallery?.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-6xl max-h-[90vh] glass rounded-3xl shadow-depth border border-primary/20 overflow-hidden animate-scale-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-3 glow-primary">
              <Icon name="Briefcase" size={24} className="text-background" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground">{project?.title}</h2>
              <p className="text-muted-foreground font-data">{project?.client} • {project?.year}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="ExternalLink" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 p-6 border-b border-border/30 bg-muted/5">
          {tabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab?.id)}
              className={activeTab === tab?.id 
                ? "bg-primary/20 text-primary border-primary/30 glow-primary" :"text-muted-foreground hover:text-foreground hover:bg-muted/20"
              }
            >
              <Icon name={tab?.icon} size={16} className="mr-2" />
              {tab?.label}
            </Button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Hero Image/Video */}
              <div className="relative h-80 rounded-2xl overflow-hidden">
                {project?.hasVideo && !isVideoPlaying ? (
                  <div className="relative h-full">
                    <Image
                      src={project?.image}
                      alt={project?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/20 flex items-center justify-center">
                      <Button
                        variant="default"
                        size="lg"
                        onClick={() => setIsVideoPlaying(true)}
                        className="glass glow-primary animate-pulse"
                      >
                        <Icon name="Play" size={32} className="text-primary mr-2" />
                        Watch Case Study
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={project?.image}
                    alt={project?.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">Project Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">{project?.fullDescription}</p>
                  </div>

                  {/* Challenge */}
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">The Challenge</h3>
                    <p className="text-muted-foreground leading-relaxed">{project?.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">Our Solution</h3>
                    <p className="text-muted-foreground leading-relaxed">{project?.solution}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Project Info */}
                  <div className="glass rounded-xl p-4 border border-border/30">
                    <h3 className="font-heading font-semibold text-foreground mb-4">Project Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry</span>
                        <span className="text-foreground font-data">{project?.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="text-foreground font-data">{project?.metrics?.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Team Size</span>
                        <span className="text-foreground font-data">{project?.metrics?.team}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget Range</span>
                        <span className="text-foreground font-data">{project?.metrics?.budget}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies?.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-lg text-sm bg-secondary/10 text-secondary border border-secondary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Team */}
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">Project Team</h3>
                    <div className="space-y-2">
                      {project?.team?.map((member, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <span className="text-xs font-bold text-background">
                              {member?.name?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{member?.name}</p>
                            <p className="text-xs text-muted-foreground">{member?.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={project?.gallery?.[currentImageIndex]}
                  alt={`${project?.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 glass text-foreground hover:text-primary"
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 glass text-foreground hover:text-primary"
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass px-3 py-1 rounded-full">
                  <span className="text-sm font-data text-foreground">
                    {currentImageIndex + 1} / {project?.gallery?.length}
                  </span>
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-6 gap-3">
                {project?.gallery?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'border-primary glow-primary' :'border-border/30 hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project?.results?.map((result, index) => (
                  <div key={index} className="glass rounded-xl p-6 border border-border/30 text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent via-primary to-secondary p-3 mx-auto mb-4 glow-accent">
                      <Icon name={result?.icon} size={24} className="text-background" />
                    </div>
                    <div className="text-3xl font-bold text-accent font-data mb-2">{result?.value}</div>
                    <div className="text-sm text-muted-foreground">{result?.label}</div>
                    <div className="text-xs text-accent mt-1">{result?.improvement}</div>
                  </div>
                ))}
              </div>

              {/* Before/After Comparison */}
              <div className="glass rounded-xl p-6 border border-border/30">
                <h3 className="font-heading font-semibold text-foreground mb-4">Before vs After</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-destructive mb-2">Before</h4>
                    <ul className="space-y-2">
                      {project?.beforeAfter?.before?.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="X" size={16} className="text-destructive" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-accent mb-2">After</h4>
                    <ul className="space-y-2">
                      {project?.beforeAfter?.after?.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={16} className="text-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonial Tab */}
          {activeTab === 'testimonial' && (
            <div className="space-y-6">
              <div className="glass rounded-xl p-8 border border-border/30 text-center">
                <Icon name="Quote" size={48} className="text-primary mx-auto mb-6" />
                <blockquote className="text-lg text-foreground leading-relaxed mb-6 italic">
                  "{project?.testimonial?.quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-lg font-bold text-background">
                      {project?.testimonial?.author?.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{project?.testimonial?.author}</div>
                    <div className="text-sm text-muted-foreground">{project?.testimonial?.position}</div>
                    <div className="text-sm text-primary font-data">{project?.testimonial?.company}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border/30 bg-muted/5">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Icon name="ExternalLink" size={16} className="mr-2" />
              View Live Site
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-secondary/30 text-secondary hover:bg-secondary/10"
            >
              <Icon name="Download" size={16} className="mr-2" />
              Case Study PDF
            </Button>
          </div>
          
          <Button
            variant="default"
            onClick={() => window.location.href = '/contact-quote-generator'}
            className="bg-accent hover:bg-accent/90 text-accent-foreground glow-accent"
          >
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Start Similar Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;