import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const ClientAuthWidget = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedUser = localStorage.getItem('devperfection_user');
      const savedToken = localStorage.getItem('devperfection_token');
      
      if (savedUser && savedToken) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Clear invalid data
          localStorage.removeItem('devperfection_user');
          localStorage.removeItem('devperfection_token');
        }
      }
    };

    checkAuthStatus();
  }, []);

  // Sample user data for demo
  const sampleUser = {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    company: 'Tech Innovations Inc.',
    avatar: '/assets/images/user-avatar.jpg',
    role: 'Project Manager',
    projects: [
      { id: 1, name: 'AI Chatbot Development', status: 'In Progress' },
      { id: 2, name: 'Mobile App Redesign', status: 'Completed' }
    ],
    notifications: 3
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!loginForm?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(loginForm?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!loginForm?.password) {
      newErrors.password = 'Password is required';
    } else if (loginForm?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo login - accept any email/password combo
      const userData = {
        ...sampleUser,
        email: loginForm?.email
      };
      
      // Save to localStorage
      localStorage.setItem('devperfection_user', JSON.stringify(userData));
      localStorage.setItem('devperfection_token', 'demo_token_' + Date.now());
      
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoginOpen(false);
      setLoginForm({ email: '', password: '' });
      
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('devperfection_user');
    localStorage.removeItem('devperfection_token');
    setUser(null);
    setIsAuthenticated(false);
    setIsLoginOpen(false);
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    setErrors({});
  };

  return (
    <div className="relative">
      {/* Authentication Status Indicator */}
      {!isAuthenticated ? (
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLogin}
          className="border-primary/30 text-primary hover:bg-primary/10 hover:glow-primary transition-glow"
        >
          <Icon name="LogIn" size={16} className="mr-2" />
          <span className="font-data">Login</span>
        </Button>
      ) : (
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="text-warning hover:text-warning hover:bg-warning/10 hover:glow-warning transition-glow relative"
            onClick={() => {
              console.log('Show notifications');
            }}
          >
            <Icon name="Bell" size={16} />
            {user?.notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-warning text-warning-foreground text-xs rounded-full flex items-center justify-center font-bold">
                {user?.notifications}
              </span>
            )}
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-2 glass rounded-lg px-3 py-2 border border-primary/20">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-xs font-bold text-background">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-foreground truncate max-w-24">
                {user?.name}
              </p>
              <p className="text-xs text-muted-foreground font-data">
                {user?.role}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1"
            >
              <Icon name="LogOut" size={14} />
            </Button>
          </div>
        </div>
      )}
      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md glass rounded-2xl shadow-depth border border-primary/20 animate-fade-in">
            {/* Header */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent p-2 glow-primary">
                    <Icon name="Shield" size={24} className="text-background" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-foreground">Client Portal</h2>
                    <p className="text-sm text-muted-foreground">Access your projects</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLogin}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              {errors?.general && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                  <p className="text-sm text-destructive">{errors?.general}</p>
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={loginForm?.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                error={errors?.email}
                required
                className="mb-4"
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={loginForm?.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                error={errors?.password}
                required
                className="mb-6"
              />

              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary hover:glow-lg transition-glow"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* Demo Credentials */}
              <div className="mt-4 p-3 rounded-lg bg-muted/20 border border-border/30">
                <p className="text-xs text-muted-foreground mb-2 font-data">Demo Credentials:</p>
                <div className="space-y-1">
                  <p className="text-xs text-foreground">Email: demo@company.com</p>
                  <p className="text-xs text-foreground">Password: demo123</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  (Any email/password combination will work for demo)
                </p>
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-border/50">
              <div className="text-center space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => {
                    console.log('Forgot password clicked');
                  }}
                >
                  Forgot Password?
                </Button>
                <p className="text-xs text-muted-foreground">
                  Need access? Contact your project manager
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientAuthWidget;