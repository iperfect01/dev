import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import AIContextualSuggestions from '../../components/ui/AIContextualSuggestions';
import FloatingShoppingCart from '../../components/ui/FloatingShoppingCart';
import VoiceAssistant from '../../components/ui/VoiceAssistant';


// Import components
import ProjectCard from './components/ProjectCard';
import ProjectFilters from './components/ProjectFilters';
import ProjectModal from './components/ProjectModal';
import FeaturedProject from './components/FeaturedProject';
import TimelineView from './components/TimelineView';
import ClientMap from './components/ClientMap';

const PortfolioShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('grid');
  const [activeFilters, setActiveFilters] = useState({
    industry: [],
    technology: [],
    type: [],
    budget: [],
    year: []
  });
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "AI-Powered E-commerce Platform",
      client: "TechMart Solutions",
      description: "Revolutionary e-commerce platform with AI-driven product recommendations and personalized shopping experiences.",
      fullDescription: `TechMart Solutions approached us to create a next-generation e-commerce platform that would revolutionize online shopping through artificial intelligence. The challenge was to build a system that could understand customer preferences, predict buying patterns, and deliver personalized experiences at scale.\n\nOur solution integrated advanced machine learning algorithms with a modern, responsive interface that adapts to user behavior in real-time. The platform features intelligent product recommendations, dynamic pricing optimization, and automated inventory management.`,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop",
      previewImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "Node.js", "TensorFlow", "AWS", "MongoDB", "Redis"],
      industry: "E-commerce",
      type: "Web Application",
      budget: "Enterprise",
      year: "2024",
      duration: "8 months",
      status: "completed",
      featured: true,
      hasVideo: true,
      rating: 5,
      metrics: {
        duration: "8 months",
        team: "12 people",
        budget: "$250K+"
      },
      keyMetrics: [
        { label: "Revenue Increase", value: "340%" },
        { label: "User Engagement", value: "85%" },
        { label: "Performance Score", value: "98/100" }
      ],
      results: [
        { icon: "TrendingUp", label: "Revenue Growth", value: "340%", improvement: "+240% vs previous" },
        { icon: "Users", label: "Active Users", value: "2.5M", improvement: "+180% monthly growth" },
        { icon: "ShoppingCart", label: "Conversion Rate", value: "12.8%", improvement: "+85% improvement" }
      ],
      challenge: "The client needed a platform that could handle millions of products while providing personalized experiences for each user. Traditional e-commerce solutions couldn't scale to meet their AI-driven requirements.",
      solution: "We built a microservices architecture with AI recommendation engines, real-time analytics, and automated testing pipelines. The platform uses machine learning to continuously improve user experiences.",
      beforeAfter: {
        before: ["Manual product categorization", "Generic user experience", "Limited scalability", "Basic analytics"],
        after: ["AI-powered categorization", "Personalized recommendations", "Auto-scaling infrastructure", "Advanced ML analytics"]
      },
      team: [
        { name: "Sarah Chen", role: "Lead Developer" },
        { name: "Michael Rodriguez", role: "AI Specialist" },
        { name: "Emily Johnson", role: "UX Designer" },
        { name: "David Kim", role: "DevOps Engineer" }
      ],
      testimonial: {
        quote: "DevPerfection transformed our vision into reality. The AI-powered platform exceeded all our expectations and delivered incredible ROI within the first quarter.",
        author: "James Wilson",
        position: "CTO",
        company: "TechMart Solutions"
      },
      awards: ["Best E-commerce Innovation 2024", "AI Excellence Award"],
      liveUrl: "https://techmart-demo.com",
      performanceScore: 98,
      userSatisfaction: 94,
      impact: "340%",
      hotspots: [
        { x: 25, y: 30, description: "AI Recommendation Engine" },
        { x: 75, y: 45, description: "Real-time Analytics Dashboard" },
        { x: 50, y: 70, description: "Personalized Shopping Cart" }
      ]
    },
    {
      id: 2,
      title: "Healthcare Management System",
      client: "MediCare Plus",
      description: "Comprehensive healthcare management platform with patient records, appointment scheduling, and telemedicine capabilities.",
      fullDescription: `MediCare Plus required a comprehensive digital transformation to modernize their healthcare delivery system. The project involved creating a unified platform that could handle patient management, appointment scheduling, electronic health records, and telemedicine consultations.\n\nOur team developed a HIPAA-compliant system with advanced security measures, real-time communication tools, and integration with existing medical equipment and databases.`,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&h=1080&fit=crop",
      previewImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop"
      ],
      technologies: ["Vue.js", "Python", "PostgreSQL", "Docker", "WebRTC", "FHIR"],
      industry: "Healthcare",
      type: "Web Application",
      budget: "Enterprise",
      year: "2023",
      duration: "12 months",
      status: "completed",
      featured: false,
      hasVideo: true,
      rating: 5,
      metrics: {
        duration: "12 months",
        team: "15 people",
        budget: "$400K+"
      },
      keyMetrics: [
        { label: "Patient Satisfaction", value: "96%" },
        { label: "Efficiency Gain", value: "65%" },
        { label: "Cost Reduction", value: "40%" }
      ],
      results: [
        { icon: "Heart", label: "Patient Satisfaction", value: "96%", improvement: "+28% improvement" },
        { icon: "Clock", label: "Processing Time", value: "-65%", improvement: "Faster operations" },
        { icon: "DollarSign", label: "Cost Savings", value: "$2.1M", improvement: "Annual savings" }
      ],
      challenge: "The healthcare provider needed to digitize their entire operation while maintaining HIPAA compliance and ensuring zero downtime during the transition.",
      solution: "We implemented a phased migration approach with comprehensive staff training, data encryption, and redundant systems to ensure continuous operation throughout the transition.",
      beforeAfter: {
        before: ["Paper-based records", "Manual scheduling", "Limited patient access", "Fragmented communication"],
        after: ["Digital health records", "Automated scheduling", "Patient portal access", "Integrated communication"]
      },
      team: [
        { name: "Dr. Lisa Park", role: "Healthcare Consultant" },
        { name: "Robert Chen", role: "Backend Developer" },
        { name: "Maria Garcia", role: "Security Specialist" },
        { name: "Alex Thompson", role: "Frontend Developer" }
      ],
      testimonial: {
        quote: "The system has revolutionized how we deliver healthcare. Our patients love the convenience, and our staff is more efficient than ever.",
        author: "Dr. Patricia Adams",
        position: "Chief Medical Officer",
        company: "MediCare Plus"
      },
      liveUrl: "https://medicare-demo.com",
      performanceScore: 95,
      userSatisfaction: 96,
      impact: "65%"
    },
    {
      id: 3,
      title: "FinTech Mobile Banking App",
      client: "NextGen Bank",
      description: "Secure mobile banking application with biometric authentication, real-time transactions, and AI-powered financial insights.",
      fullDescription: `NextGen Bank wanted to create a mobile-first banking experience that would compete with leading fintech companies. The project required building a secure, intuitive mobile application with advanced features like biometric authentication, real-time transaction processing, and AI-powered financial insights.\n\nOur solution included end-to-end encryption, multi-factor authentication, and machine learning algorithms for fraud detection and personalized financial recommendations.`,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&h=1080&fit=crop",
      previewImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ],
      technologies: ["React Native", "Node.js", "Blockchain", "AWS", "TensorFlow", "Stripe"],
      industry: "Financial Services",
      type: "Mobile Application",
      budget: "Enterprise",
      year: "2023",
      duration: "10 months",
      status: "completed",
      featured: true,
      hasVideo: true,
      rating: 5,
      metrics: {
        duration: "10 months",
        team: "18 people",
        budget: "$500K+"
      },
      keyMetrics: [
        { label: "Security Score", value: "99.9%" },
        { label: "User Adoption", value: "78%" },
        { label: "Transaction Speed", value: "2.1s" }
      ],
      results: [
        { icon: "Shield", label: "Security Rating", value: "99.9%", improvement: "Zero breaches" },
        { icon: "Smartphone", label: "App Downloads", value: "1.2M", improvement: "+300% in 6 months" },
        { icon: "Zap", label: "Transaction Speed", value: "2.1s", improvement: "75% faster" }
      ],
      challenge: "Creating a mobile banking app that meets strict financial regulations while providing a seamless user experience and advanced security features.",
      solution: "We implemented a layered security architecture with biometric authentication, blockchain technology for transactions, and AI-powered fraud detection systems.",
      beforeAfter: {
        before: ["Web-only banking", "Basic security", "Manual processes", "Limited insights"],
        after: ["Mobile-first experience", "Biometric security", "Automated workflows", "AI-powered insights"]
      },
      team: [
        { name: "Jennifer Liu", role: "Mobile Lead" },
        { name: "Carlos Rodriguez", role: "Security Engineer" },
        { name: "Amanda Foster", role: "UX Designer" },
        { name: "Kevin Zhang", role: "Blockchain Developer" }
      ],
      testimonial: {
        quote: "Our customers love the new mobile app. It's secure, fast, and intuitive. DevPerfection delivered beyond our expectations.",
        author: "Mark Stevens",
        position: "Head of Digital Banking",
        company: "NextGen Bank"
      },
      liveUrl: "https://nextgen-banking.com",
      performanceScore: 97,
      userSatisfaction: 92,
      impact: "78%"
    },
    {
      id: 4,
      title: "Smart City IoT Platform",
      client: "Urban Solutions",
      description: "IoT-enabled smart city management platform for traffic optimization, energy management, and citizen services.",
      fullDescription: `Urban Solutions needed a comprehensive IoT platform to transform their city into a smart, connected ecosystem. The project involved integrating thousands of sensors, cameras, and devices to monitor and optimize city operations in real-time.\n\nOur platform provides centralized control over traffic systems, energy grids, waste management, and citizen services, using AI to predict and prevent issues before they occur.`,
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1920&h=1080&fit=crop",
      previewImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      ],
      technologies: ["Angular", "Python", "IoT", "Azure", "TensorFlow", "MQTT"],
      industry: "Government",
      type: "IoT Platform",
      budget: "Enterprise",
      year: "2022",
      duration: "18 months",
      status: "completed",
      featured: false,
      hasVideo: false,
      rating: 4,
      metrics: {
        duration: "18 months",
        team: "25 people",
        budget: "$800K+"
      },
      keyMetrics: [
        { label: "Energy Savings", value: "35%" },
        { label: "Traffic Efficiency", value: "42%" },
        { label: "Citizen Satisfaction", value: "88%" }
      ],
      results: [
        { icon: "Zap", label: "Energy Reduction", value: "35%", improvement: "Annual savings" },
        { icon: "Car", label: "Traffic Flow", value: "+42%", improvement: "Improved efficiency" },
        { icon: "Users", label: "Citizen Satisfaction", value: "88%", improvement: "+25% increase" }
      ],
      challenge: "Integrating thousands of IoT devices across the city while ensuring data security, real-time processing, and scalable infrastructure.",
      solution: "We built a distributed IoT platform with edge computing capabilities, secure data transmission, and AI-powered analytics for predictive city management.",
      beforeAfter: {
        before: ["Manual monitoring", "Reactive maintenance", "Isolated systems", "Limited data insights"],
        after: ["Automated monitoring", "Predictive maintenance", "Integrated platform", "AI-driven insights"]
      },
      team: [
        { name: "Thomas Anderson", role: "IoT Architect" },
        { name: "Rachel Green", role: "Data Scientist" },
        { name: "Miguel Santos", role: "DevOps Lead" },
        { name: "Sophie Turner", role: "Frontend Developer" }
      ],
      testimonial: {
        quote: "The smart city platform has transformed how we manage urban infrastructure. The predictive capabilities have saved us millions in maintenance costs.",
        author: "Mayor Elizabeth Johnson",
        position: "Mayor",
        company: "Urban Solutions City"
      },
      liveUrl: "https://smartcity-demo.com",
      performanceScore: 94,
      userSatisfaction: 88,
      impact: "42%"
    },
    {
      id: 5,
      title: "EdTech Learning Platform",
      client: "EduFuture Academy",
      description: "Interactive online learning platform with AI tutoring, progress tracking, and collaborative study tools.",
      fullDescription: `EduFuture Academy wanted to create an innovative online learning platform that could provide personalized education experiences for students of all ages. The platform needed to support various learning styles, track progress, and provide AI-powered tutoring assistance.\n\nOur solution includes adaptive learning algorithms, interactive content creation tools, real-time collaboration features, and comprehensive analytics for educators and administrators.`,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop",
      previewImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "Django", "PostgreSQL", "WebRTC", "TensorFlow", "AWS"],
      industry: "Education",
      type: "Web Application",
      budget: "Mid-range",
      year: "2023",
      duration: "6 months",
      status: "ongoing",
      featured: false,
      hasVideo: true,
      rating: 4,
      metrics: {
        duration: "6 months",
        team: "8 people",
        budget: "$150K+"
      },
      keyMetrics: [
        { label: "Student Engagement", value: "89%" },
        { label: "Learning Outcomes", value: "73%" },
        { label: "Teacher Satisfaction", value: "91%" }
      ],
      results: [
        { icon: "BookOpen", label: "Course Completion", value: "89%", improvement: "+45% vs traditional" },
        { icon: "TrendingUp", label: "Learning Improvement", value: "73%", improvement: "Better outcomes" },
        { icon: "Users", label: "Active Students", value: "50K", improvement: "Growing monthly" }
      ],
      challenge: "Creating an engaging online learning environment that could adapt to different learning styles and provide personalized education experiences.",
      solution: "We developed an AI-powered platform with adaptive learning paths, interactive content, and real-time collaboration tools to enhance the online learning experience.",
      beforeAfter: {
        before: ["Static content delivery", "One-size-fits-all approach", "Limited interaction", "Basic progress tracking"],
        after: ["Interactive learning paths", "Personalized experiences", "Collaborative tools", "Advanced analytics"]
      },
      team: [
        { name: "Dr. Sarah Williams", role: "Education Consultant" },
        { name: "Jake Morrison", role: "Full Stack Developer" },
        { name: "Nina Patel", role: "UX Designer" },
        { name: "Chris Lee", role: "AI Developer" }
      ],
      testimonial: {
        quote: "The platform has revolutionized how our students learn. The AI tutoring feature is particularly impressive and has significantly improved learning outcomes.",
        author: "Dr. Michael Brown",
        position: "Academic Director",
        company: "EduFuture Academy"
      },
      liveUrl: "https://edufuture-demo.com",
      performanceScore: 92,
      userSatisfaction: 91,
      impact: "73%"
    },
    {
      id: 6,
      title: "Logistics Optimization System",
      client: "GlobalShip Logistics",
      description: "AI-powered logistics and supply chain optimization platform with real-time tracking and predictive analytics.",
      fullDescription: `GlobalShip Logistics needed a comprehensive solution to optimize their supply chain operations across multiple countries. The system required real-time tracking, route optimization, inventory management, and predictive analytics to reduce costs and improve delivery times.\n\nOur platform integrates with existing logistics systems, provides real-time visibility into operations, and uses machine learning to optimize routes and predict potential disruptions.`,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
      heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop",
      previewImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=600&fit=crop"
      ],
      technologies: ["Vue.js", "Java", "MySQL", "Kubernetes", "TensorFlow", "Google Maps"],
      industry: "Logistics",
      type: "Web Application",
      budget: "Enterprise",
      year: "2022",
      duration: "14 months",
      status: "completed",
      featured: false,
      hasVideo: false,
      rating: 5,
      metrics: {
        duration: "14 months",
        team: "20 people",
        budget: "$600K+"
      },
      keyMetrics: [
        { label: "Cost Reduction", value: "28%" },
        { label: "Delivery Speed", value: "45%" },
        { label: "Accuracy", value: "99.2%" }
      ],
      results: [
        { icon: "DollarSign", label: "Cost Savings", value: "28%", improvement: "$5.2M annually" },
        { icon: "Truck", label: "Delivery Speed", value: "+45%", improvement: "Faster deliveries" },
        { icon: "Target", label: "Accuracy", value: "99.2%", improvement: "+12% improvement" }
      ],
      challenge: "Optimizing complex global supply chains with multiple variables including weather, traffic, customs, and inventory levels across different time zones.",
      solution: "We created an AI-powered optimization engine that processes real-time data from multiple sources to provide optimal routing and predictive insights.",
      beforeAfter: {
        before: ["Manual route planning", "Reactive problem solving", "Limited visibility", "High operational costs"],
        after: ["AI-optimized routing", "Predictive analytics", "Real-time tracking", "Reduced operational costs"]
      },
      team: [
        { name: "David Kumar", role: "Logistics Expert" },
        { name: "Lisa Zhang", role: "Backend Developer" },
        { name: "Roberto Silva", role: "Data Scientist" },
        { name: "Emma Watson", role: "Project Manager" }
      ],
      testimonial: {
        quote: "The optimization system has transformed our operations. We're saving millions while delivering faster and more reliably than ever before.",
        author: "James Mitchell",
        position: "Operations Director",
        company: "GlobalShip Logistics"
      },
      liveUrl: "https://globalship-demo.com",
      performanceScore: 96,
      userSatisfaction: 93,
      impact: "28%"
    }
  ];

  // Mock client data for map
  const clients = [
    {
      id: 1,
      name: "TechMart Solutions",
      location: "Kigali, Rwanda",
      country: "USA",
      mapPosition: { x: 15, y: 35 },
      projectCount: 3,
      rating: 5,
      description: "Leading e-commerce technology company specializing in AI-driven retail solutions.",
      testimonial: "DevPerfection transformed our vision into reality with their innovative AI platform."
    },
    {
      id: 2,
      name: "MediCare Plus",
      location: "Toronto, Canada",
      country: "Canada",
      mapPosition: { x: 22, y: 28 },
      projectCount: 2,
      rating: 5,
      description: "Healthcare provider focused on digital transformation and patient care innovation.",
      testimonial: "The healthcare management system has revolutionized how we deliver patient care."
    },
    {
      id: 3,
      name: "NextGen Bank",
      location: "London, UK",
      country: "UK",
      mapPosition: { x: 50, y: 32 },
      projectCount: 4,
      rating: 5,
      description: "Digital-first banking institution pioneering mobile financial services.",
      testimonial: "Our mobile banking app has exceeded all expectations for security and user experience."
    },
    {
      id: 4,
      name: "Urban Solutions",
      location: "Amsterdam, Netherlands",
      country: "Netherlands",
      mapPosition: { x: 52, y: 30 },
      projectCount: 1,
      rating: 4,
      description: "Smart city technology provider focused on IoT and urban infrastructure.",
      testimonial: "The smart city platform has saved us millions in infrastructure maintenance costs."
    },
    {
      id: 5,
      name: "EduFuture Academy",
      location: "Sydney, Australia",
      country: "Australia",
      mapPosition: { x: 85, y: 70 },
      projectCount: 2,
      rating: 4,
      description: "Educational technology company creating innovative online learning experiences.",
      testimonial: "The AI tutoring features have significantly improved our students' learning outcomes."
    },
    {
      id: 6,
      name: "GlobalShip Logistics",
      location: "Singapore",
      country: "Singapore",
      mapPosition: { x: 75, y: 55 },
      projectCount: 3,
      rating: 5,
      description: "International logistics company optimizing global supply chain operations.",
      testimonial: "The optimization system has transformed our operations and reduced costs significantly."
    }
  ];

  // Filter options
  const filterOptions = {
    industry: [
      { value: "e-commerce", label: "E-commerce", count: 1 },
      { value: "healthcare", label: "Healthcare", count: 1 },
      { value: "financial-services", label: "Financial Services", count: 1 },
      { value: "government", label: "Government", count: 1 },
      { value: "education", label: "Education", count: 1 },
      { value: "logistics", label: "Logistics", count: 1 }
    ],
    technology: [
      { value: "react", label: "React", count: 3 },
      { value: "ai", label: "AI/ML", count: 4 },
      { value: "node", label: "Node.js", count: 2 },
      { value: "python", label: "Python", count: 2 },
      { value: "mobile", label: "Mobile", count: 1 },
      { value: "iot", label: "IoT", count: 1 }
    ],
    type: [
      { value: "web", label: "Web Application", count: 4 },
      { value: "mobile", label: "Mobile App", count: 1 },
      { value: "platform", label: "Platform", count: 1 }
    ],
    budget: [
      { value: "startup", label: "Startup ($10K-50K)", count: 0 },
      { value: "mid-range", label: "Mid-range ($50K-200K)", count: 1 },
      { value: "enterprise", label: "Enterprise ($200K+)", count: 5 }
    ],
    year: [
      { value: "2024", label: "2024", count: 1 },
      { value: "2023", label: "2023", count: 3 },
      { value: "2022", label: "2022", count: 2 }
    ]
  };

  // Featured project (first project)
  const featuredProject = projects?.[0];

  useEffect(() => {
    // Apply filters
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = projects;
      
      Object.entries(activeFilters)?.forEach(([category, values]) => {
        if (values?.length > 0) {
          filtered = filtered?.filter(project => {
            switch (category) {
              case 'industry':
                return values?.some(value => 
                  project?.industry?.toLowerCase()?.replace(/\s+/g, '-') === value
                );
              case 'technology':
                return values?.some(value => 
                  project?.technologies?.some(tech => 
                    tech?.toLowerCase()?.includes(value) || 
                    (value === 'ai' && (tech?.includes('TensorFlow') || tech?.includes('AI')))
                  )
                );
              case 'type':
                return values?.some(value => {
                  if (value === 'web') return project?.type?.includes('Web');
                  if (value === 'mobile') return project?.type?.includes('Mobile');
                  if (value === 'platform') return project?.type?.includes('Platform');
                  return false;
                });
              case 'budget':
                return values?.includes(project?.budget?.toLowerCase()?.replace(/\s+/g, '-'));
              case 'year':
                return values?.includes(project?.year);
              default:
                return true;
            }
          });
        }
      });
      
      setFilteredProjects(filtered);
      setIsLoading(false);
    }, 500);
  }, [activeFilters]);

  useEffect(() => {
    setFilteredProjects(projects);
  }, []);

  const handleFilterChange = (category, value, checked) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev?.[category], value]
        : prev?.[category]?.filter(item => item !== value)
    }));
  };

  const handleClearAllFilters = () => {
    setActiveFilters({
      industry: [],
      technology: [],
      type: [],
      budget: [],
      year: []
    });
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Featured Project Hero */}
      <FeaturedProject 
        project={featuredProject}
        onViewDetails={handleProjectSelect}
      />
      {/* Main Content */}
      <div className="relative">
        {/* View Toggle */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Explore Our Work
              </h2>
              <p className="text-muted-foreground">
                Discover innovative solutions across industries
              </p>
            </div>
            
            <div className="flex items-center space-x-2 glass rounded-lg p-1 border border-border/30">
              <Button
                variant={activeView === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('grid')}
                className={activeView === 'grid' 
                  ? "bg-primary/20 text-primary border-primary/30 glow-primary" :"text-muted-foreground hover:text-foreground"
                }
              >
                <Icon name="Grid" size={16} className="mr-2" />
                Grid
              </Button>
              <Button
                variant={activeView === 'timeline' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('timeline')}
                className={activeView === 'timeline' 
                  ? "bg-primary/20 text-primary border-primary/30 glow-primary" :"text-muted-foreground hover:text-foreground"
                }
              >
                <Icon name="Clock" size={16} className="mr-2" />
                Timeline
              </Button>
            </div>
          </div>

          {/* Filters */}
          {activeView === 'grid' && (
            <ProjectFilters
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAllFilters}
            />
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center space-x-3">
                <Icon name="Loader" size={24} className="text-primary animate-spin" />
                <span className="text-muted-foreground font-data">Loading projects...</span>
              </div>
            </div>
          )}

          {/* Grid View */}
          {activeView === 'grid' && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects?.map((project) => (
                <ProjectCard
                  key={project?.id}
                  project={project}
                  onViewDetails={handleProjectSelect}
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {activeView === 'grid' && !isLoading && filteredProjects?.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to see more results
              </p>
              <Button
                variant="outline"
                onClick={handleClearAllFilters}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Timeline View */}
        {activeView === 'timeline' && (
          <TimelineView
            projects={projects}
            onProjectSelect={handleProjectSelect}
          />
        )}

        {/* Client Map Section */}
        <ClientMap clients={clients} />

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="glass rounded-3xl p-12 border border-border/30 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join our growing list of satisfied clients and transform your vision into reality with our expert development team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact-quote-generator">
                  <Button
                    variant="default"
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary hover:glow-lg transition-glow"
                  >
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Get Custom Quote
                  </Button>
                </Link>
                
                <Link to="/services-catalog">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-accent/30 text-accent hover:bg-accent/10 hover:glow-accent transition-glow"
                  >
                    <Icon name="Layers" size={20} className="mr-2" />
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/* Global Components */}
      <AIContextualSuggestions />
      <FloatingShoppingCart />
      <VoiceAssistant />
    </div>
  );
};

export default PortfolioShowcase;