import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import logoImg from "/public/assets/logo.png";// Adjust path if needed

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Services', path: '/services-catalog', icon: 'Layers' },
    { label: 'Portfolio', path: '/portfolio-showcase', icon: 'Briefcase' },
    { label: 'Store', path: '/e-commerce-store', icon: 'ShoppingBag' },
    { label: 'Contact', path: '/contact-quote-generator', icon: 'MessageSquare' },
    { label: 'Blog', path: '/blog', icon: 'BookOpen' }, // Styled like others
    { label: 'About', path: '/about', icon: 'Info' }    // Styled like others
  ];

  const secondaryItems = [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass shadow-depth' : 'glass-light'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-3 group transition-smooth hover:scale-105"
            onClick={closeMenu}
          >
            <div className="relative">
              <img
                src={logoImg}
                alt="DevPerfection Logo"
                className="w-10 h-10 rounded-lg object-cover transition-glow group-hover:glow-lg"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                DevPerfection
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                  isActivePath(item?.path)
                    ? item.activeClassName || 'text-primary bg-primary/10 glow-primary'
                    : item.className || 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className={`transition-colors ${
                      isActivePath(item?.path)
                        ? (item.activeClassName?.split(' ')[0] || 'text-primary')
                        : (item.className?.split(' ')[0] || 'text-current')
                    }`}
                  />
                  <span className="font-data text-sm">{item?.label}</span>
                </div>
                {isActivePath(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full glow-primary"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* AI Assistant */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Mic"
              className="text-secondary hover:text-secondary hover:bg-secondary/10 hover:glow-secondary transition-glow"
              onClick={() => {
                // Voice assistant functionality
                console.log('Voice assistant activated');
              }}
            />

            {/* Shopping Cart */}
            <Button
              variant="ghost"
              size="sm"
              iconName="ShoppingCart"
              className="text-accent hover:text-accent hover:bg-accent/10 hover:glow-accent transition-glow relative"
              onClick={() => {
                // Shopping cart functionality
                console.log('Shopping cart opened');
              }}
            >
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-foreground hover:bg-muted/50"
            onClick={toggleMenu}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass border-t border-border/50 shadow-depth">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActivePath(item?.path)
                      ? item.activeClassName || 'text-primary bg-primary/10 glow-primary'
                      : item.className || 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={`${
                      isActivePath(item?.path)
                        ? (item.activeClassName?.split(' ')[0] || 'text-primary')
                        : (item.className?.split(' ')[0] || 'text-current')
                    }`}
                  />
                  <span className="font-data">{item?.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-border/50 pt-4 mt-4">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/10 glow-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={`${
                        isActivePath(item?.path) ? 'text-primary' : 'text-current'
                      }`}
                    />
                    <span className="font-data">{item?.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border/50 mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Mic"
                  className="text-secondary hover:text-secondary hover:bg-secondary/10 hover:glow-secondary transition-glow"
                  onClick={() => {
                    console.log('Voice assistant activated');
                    closeMenu();
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ShoppingCart"
                  className="text-accent hover:text-accent hover:bg-accent/10 hover:glow-accent transition-glow relative"
                  onClick={() => {
                    console.log('Shopping cart opened');
                    closeMenu();
                  }}
                >
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;