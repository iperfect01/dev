import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TimelineView = ({ projects, onProjectSelect }) => {
  const [activeProject, setActiveProject] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef?.current && containerRef?.current) {
        const container = containerRef?.current;
        const timeline = timelineRef?.current;
        const scrollLeft = container?.scrollLeft;
        const maxScroll = timeline?.scrollWidth - container?.clientWidth;
        const progress = (scrollLeft / maxScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    const container = containerRef?.current;
    if (container) {
      container?.addEventListener('scroll', handleScroll);
      return () => container?.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToProject = (index) => {
    if (containerRef?.current && timelineRef?.current) {
      const container = containerRef?.current;
      const projectWidth = 320; // Width of each project card
      const scrollPosition = index * (projectWidth + 24); // 24px gap
      container?.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setActiveProject(index);
    }
  };

  const nextProject = () => {
    const nextIndex = (activeProject + 1) % projects?.length;
    scrollToProject(nextIndex);
  };

  const prevProject = () => {
    const prevIndex = activeProject === 0 ? projects?.length - 1 : activeProject - 1;
    scrollToProject(prevIndex);
  };

  return (
    <div className="relative py-16">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Project Timeline
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our journey through innovative projects, from concept to completion
          </p>
        </div>
      </div>
      {/* Timeline Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={prevProject}
            className="border-primary/30 text-primary hover:bg-primary/10 hover:glow-primary transition-glow"
          >
            <Icon name="ChevronLeft" size={16} className="mr-2" />
            Previous
          </Button>

          {/* Progress Bar */}
          <div className="flex-1 mx-8">
            <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-300 glow-primary"
                style={{ width: `${scrollProgress}%` }}
              />
              
              {/* Year Markers */}
              <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs text-muted-foreground font-data">
                <span>2020</span>
                <span>2021</span>
                <span>2022</span>
                <span>2023</span>
                <span>2024</span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextProject}
            className="border-primary/30 text-primary hover:bg-primary/10 hover:glow-primary transition-glow"
          >
            Next
            <Icon name="ChevronRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
      {/* Timeline Container */}
      <div 
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          ref={timelineRef}
          className="flex space-x-6 px-6 lg:px-8"
          style={{ width: `${projects?.length * 344}px` }}
        >
          {projects?.map((project, index) => (
            <div
              key={project?.id}
              className={`relative flex-shrink-0 w-80 transition-all duration-500 ${
                index === activeProject ? 'scale-105' : 'scale-95 opacity-70'
              }`}
            >
              {/* Timeline Connector */}
              <div className="absolute top-1/2 -left-3 w-6 h-0.5 bg-gradient-to-r from-primary to-secondary" />
              
              {/* Project Card */}
              <div 
                className={`glass rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                  index === activeProject 
                    ? 'border-primary/50 glow-primary' :'border-border/30 hover:border-primary/30'
                }`}
                onClick={() => {
                  setActiveProject(index);
                  onProjectSelect(project);
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project?.image}
                    alt={project?.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-sm font-data bg-background/80 text-foreground border border-border/30">
                      {project?.year}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-data border ${
                      project?.status === 'completed' 
                        ? 'bg-accent/20 text-accent border-accent/30' 
                        : project?.status === 'ongoing' ?'bg-warning/20 text-warning border-warning/30' :'bg-primary/20 text-primary border-primary/30'
                    }`}>
                      {project?.status}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Client & Duration */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-primary font-data">{project?.client}</span>
                    <span className="text-xs text-muted-foreground">{project?.duration}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 line-clamp-2">
                    {project?.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {project?.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project?.technologies?.slice(0, 3)?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 rounded text-xs bg-secondary/10 text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                    {project?.technologies?.length > 3 && (
                      <span className="px-2 py-1 rounded text-xs bg-muted/20 text-muted-foreground">
                        +{project?.technologies?.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Project Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent font-data">{project?.impact}</div>
                      <div className="text-xs text-muted-foreground">Impact</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary font-data">{project?.rating}/5</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={(e) => {
                      e?.stopPropagation();
                      onProjectSelect(project);
                    }}
                    className="border-primary/30 text-primary hover:bg-primary/10 hover:glow-primary transition-glow"
                  >
                    <Icon name="Eye" size={14} className="mr-2" />
                    View Details
                  </Button>
                </div>

                {/* Timeline Dot */}
                <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                  index === activeProject 
                    ? 'bg-primary border-background glow-primary' :'bg-muted border-background'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Timeline Stats */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12">
        <div className="glass rounded-2xl p-8 border border-border/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary font-data mb-2">
                {projects?.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent font-data mb-2">
                {projects?.filter(p => p?.status === 'completed')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary font-data mb-2">
                {Math.round(projects?.reduce((acc, p) => acc + p?.rating, 0) / projects?.length * 10) / 10}
              </div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning font-data mb-2">
                {new Set(projects.flatMap(p => p.technologies))?.size}
              </div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;