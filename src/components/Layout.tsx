import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const seoConfig: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Professional Technical Installation & Building Services in Ghana',
    description: 'Expert plumbing, civil engineering, HVAC, and boiler installations. Acquans Ventures provides premium technical solutions for industrial and domestic clients across Ghana.'
  },
  '/about': {
    title: 'About Us | Leading Technical Services Provider',
    description: 'Learn about Acquans Ventures, our mission, values, and our commitment to delivering excellence in technical and building services since our inception.'
  },
  '/services': {
    title: 'Our Services | Comprehensive Building Solutions',
    description: 'Discover our wide range of services including plumbing, civil works, heating, AC, and maintenance tailored for both industrial and domestic environments.'
  },
  '/services/plumbing-works': {
    title: 'Expert Plumbing Works | Industrial & Domestic',
    description: 'Professional plumbing services from luxury residential fittings to heavy-duty industrial pipework and drainage systems.'
  },
  '/services/civil-works': {
    title: 'Civil Engineering & Construction Works',
    description: 'Building strong foundations with expert structural concrete, rebar installation, and site infrastructure for any scale of project.'
  },
  '/services/heating-systems': {
    title: 'Advanced Heating Systems & Solar Solutions',
    description: 'Efficient thermal engineering including underfloor heating, solar water heaters, and industrial boiler installations.'
  },
  '/services/ventilation-ac': {
    title: 'Ventilation & Air-Conditioning (HVAC) Experts',
    description: 'Precision climate control solutions including energy-efficient split units, industrial VRF systems, and clean room ventilation.'
  },
  '/projects': {
    title: 'Our Projects | Proven Track Record of Excellence',
    description: 'Explore our portfolio of completed works across various sectors, demonstrating our engineering precision and commitment to quality.'
  },
  '/contact': {
    title: 'Contact Us | Get in Touch with Our Experts',
    description: 'Have a project? Contact Acquans Ventures for expert advice and professional technical service inquiries.'
  },
  '/request-quote': {
    title: 'Request a Quotation | Start Your Project',
    description: 'Fill out our inquiry form to receive a professional estimate for your plumbing, civil, or HVAC project within 24 hours.'
  },
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    const config = seoConfig[location.pathname] || {
      title: 'Technical Installation & Building Services',
      description: 'Acquans Ventures provides premium building and technical services in Ghana.'
    };

    // Update Title
    document.title = `${config.title} | Acquans Ventures`;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', config.description);
      document.head.appendChild(metaDescription);
    }

    // Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://acquansventures.com${location.pathname}`);
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);
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

