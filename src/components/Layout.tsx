import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const routeTitles: Record<string, string> = {
  '/': 'Home',
  '/about': 'About Us',
  '/services': 'Our Services',
  '/services/plumbing-works': 'Plumbing Works',
  '/services/civil-works': 'Civil Works',
  '/services/heating-systems': 'Heating Systems',
  '/services/ventilation-ac': 'Ventilation & AC',
  '/services/boiler-installations': 'Boiler Installations',
  '/services/apprenticeship': 'Apprenticeship & Training',
  '/services/maintenance': 'Maintenance',
  '/services/consulting': 'Consulting',
  '/projects': 'Our Projects',
  '/why-choose-us': 'Why Choose Us',
  '/blog': 'Blog & Updates',
  '/contact': 'Contact Us',
  '/request-quote': 'Request a Quotation',
  '/login': 'Login Portal',
  '/admin-register': 'Admin Registration',
  '/admin-dashboard': 'Admin Dashboard',
  '/client-dashboard': 'Client Portal',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms & Conditions',
  '/cookies': 'Cookie Policy',
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = routeTitles[location.pathname] || 'Services';
    document.title = `${pageTitle} | Acquans Ventures`;
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
