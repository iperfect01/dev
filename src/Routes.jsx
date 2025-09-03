import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContactQuoteGenerator from './pages/contact-quote-generator';
import ServicesCatalog from './pages/services-catalog';
import ECommerceStore from './pages/e-commerce-store';
import PortfolioShowcase from './pages/portfolio-showcase';
import Homepage from './pages/homepage';
import About from './pages/about';
import Blog from './pages/blog';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/contact-quote-generator" element={<ContactQuoteGenerator />} />
        <Route path="/services-catalog" element={<ServicesCatalog />} />
        <Route path="/e-commerce-store" element={<ECommerceStore />} />
        <Route path="/portfolio-showcase" element={<PortfolioShowcase />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
