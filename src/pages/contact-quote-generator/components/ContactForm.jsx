import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ContactForm = ({ onFormChange, selectedServices, onServiceChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    services: [],
    urgency: 'normal',
    hasExistingSystem: false,
    needsConsultation: true
  });

  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  const projectTypes = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'ai-solution', label: 'AI/ML Solutions' },
    { value: 'ecommerce', label: 'E-commerce Platform' },
    { value: 'enterprise', label: 'Enterprise Software' },
    { value: 'consulting', label: 'Technical Consulting' }
  ];

  const budgetRanges = [
    { value: '5k-15k', label: '$50 - $150' },
    { value: '15k-50k', label: '$150 - $500' },
    { value: '50k-100k', label: '$500 - $1,000' },
    { value: '100k-250k', label: '$1,000 - $2,500' },
    { value: '250k+', label: '$2,500+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (Rush Job)' },
    { value: '1-3months', label: '1-3 Months' },
    { value: '3-6months', label: '3-6 Months' },
    { value: '6-12months', label: '6-12 Months' },
    { value: '12months+', label: '12+ Months' },
    { value: 'flexible', label: 'Flexible Timeline' }
  ];

  const serviceOptions = [
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'frontend-dev', label: 'Frontend Development' },
    { value: 'backend-dev', label: 'Backend Development' },
    { value: 'mobile-dev', label: 'Mobile Development' },
    { value: 'ai-integration', label: 'AI Integration' },
    { value: 'cloud-deployment', label: 'Cloud Deployment' },
    { value: 'maintenance', label: 'Maintenance & Support' },
    { value: 'seo-optimization', label: 'SEO Optimization' }
  ];

  useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      services: selectedServices
    }));
  }, [selectedServices]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Real-time validation for email
    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex?.test(value)) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address'
        }));
      }
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleServiceToggle = (serviceValue) => {
    const updatedServices = formData?.services?.includes(serviceValue)
      ? formData?.services?.filter(s => s !== serviceValue)
      : [...formData?.services, serviceValue];
    
    setFormData(prev => ({
      ...prev,
      services: updatedServices
    }));
    
    onServiceChange(updatedServices);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.company?.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData?.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData?.budget) {
      newErrors.budget = 'Please select a budget range';
    }

    if (!formData?.timeline) {
      newErrors.timeline = 'Please select a timeline';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData?.description?.trim()?.length < 50) {
      newErrors.description = 'Please provide more details (minimum 50 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsValidating(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('Thank you! Your project inquiry has been submitted. We\'ll get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
        services: [],
        urgency: 'normal',
        hasExistingSystem: false,
        needsConsultation: true
      });
      
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-8 border border-primary/20 shadow-depth">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-3 glow-primary">
            <Icon name="MessageSquare" size={24} className="text-background" />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Start Your Project
            </h2>
            <p className="text-muted-foreground">
              Tell us about your vision and get a custom quote
            </p>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="flex-1 h-1 bg-primary/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 glow-primary"
              style={{ 
                width: `${Math.min(100, (Object.keys(formData)?.filter(key => 
                  formData?.[key] && formData?.[key] !== '' && formData?.[key] !== []
                )?.length / Object.keys(formData)?.length) * 100)}%` 
              }}
            />
          </div>
          <span className="text-xs font-data text-muted-foreground">
            {Math.round((Object.keys(formData)?.filter(key => 
              formData?.[key] && formData?.[key] !== '' && formData?.[key] !== []
            )?.length / Object.keys(formData)?.length) * 100)}% Complete
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="User" size={20} className="text-primary" />
            <span>Contact Information</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
              placeholder="your name"
              error={errors?.name}
              required
              className="animate-fade-in"
            />
            
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              placeholder="your email"
              error={errors?.email}
              required
              className="animate-fade-in"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              type="text"
              name="company"
              value={formData?.company}
              onChange={handleInputChange}
              placeholder="Your Company Inc."
              error={errors?.company}
              required
              className="animate-fade-in"
            />
            
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
              placeholder="+250794739944"
              className="animate-fade-in"
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Briefcase" size={20} className="text-secondary" />
            <span>Project Details</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Project Type"
              options={projectTypes}
              value={formData?.projectType}
              onChange={(value) => handleSelectChange('projectType', value)}
              placeholder="Select project type"
              error={errors?.projectType}
              required
              className="animate-fade-in"
            />
            
            <Select
              label="Budget Range"
              options={budgetRanges}
              value={formData?.budget}
              onChange={(value) => handleSelectChange('budget', value)}
              placeholder="Select budget range"
              error={errors?.budget}
              required
              className="animate-fade-in"
            />
          </div>
          
          <Select
            label="Timeline"
            options={timelineOptions}
            value={formData?.timeline}
            onChange={(value) => handleSelectChange('timeline', value)}
            placeholder="Select timeline"
            error={errors?.timeline}
            required
            className="animate-fade-in"
          />
        </div>

        {/* Services Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Layers" size={20} className="text-accent" />
            <span>Required Services</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {serviceOptions?.map((service) => (
              <div
                key={service?.value}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-102 ${
                  formData?.services?.includes(service?.value)
                    ? 'border-accent bg-accent/10 glow-accent' :'border-border hover:border-accent/30 bg-muted/10'
                }`}
                onClick={() => handleServiceToggle(service?.value)}
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={formData?.services?.includes(service?.value)}
                    onChange={() => handleServiceToggle(service?.value)}
                    className="pointer-events-none"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {service?.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="FileText" size={20} className="text-warning" />
            <span>Project Description</span>
          </h3>
          
          <div className="relative">
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              placeholder="Describe your project in detail. What are your goals, target audience, key features, and any specific requirements?"
              rows={6}
              className={`w-full px-4 py-3 bg-input border rounded-xl text-foreground placeholder-muted-foreground resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors?.description ? 'border-destructive' : 'border-border focus:border-primary'
              }`}
              required
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground font-data">
              {formData?.description?.length}/500
            </div>
          </div>
          {errors?.description && (
            <p className="text-sm text-destructive">{errors?.description}</p>
          )}
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Settings" size={20} className="text-primary" />
            <span>Additional Information</span>
          </h3>
          
          <div className="space-y-3">
            <Checkbox
              label="I have an existing system that needs integration"
              checked={formData?.hasExistingSystem}
              onChange={(e) => handleInputChange(e)}
              name="hasExistingSystem"
            />
            
            <Checkbox
              label="I would like a free consultation call before starting"
              checked={formData?.needsConsultation}
              onChange={(e) => handleInputChange(e)}
              name="needsConsultation"
            />
          </div>
          
          <Select
            label="Project Urgency"
            options={[
              { value: 'low', label: 'Low Priority' },
              { value: 'normal', label: 'Normal Priority' },
              { value: 'high', label: 'High Priority' },
              { value: 'urgent', label: 'Urgent - Rush Job' }
            ]}
            value={formData?.urgency}
            onChange={(value) => handleSelectChange('urgency', value)}
            className="animate-fade-in"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-border/50">
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isValidating}
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-background glow-primary hover:glow-lg transition-all duration-300"
          >
            {isValidating ? (
              <>
                <Icon name="Loader" size={20} className="mr-2 animate-spin" />
                Processing Your Request...
              </>
            ) : (
              <>
                <Icon name="Send" size={20} className="mr-2" />
                Get My Custom Quote
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            By submitting this form, you agree to our terms of service and privacy policy.
            We'll respond within 24 hours.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;