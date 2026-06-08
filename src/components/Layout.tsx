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
  '/services/pump-installation': {
    title: 'Professional Pump Installation & Maintenance',
    description: 'Expert water pump solutions for domestic supply and industrial water management across Ghana.'
  },
  '/services/boiler-installations': {
    title: 'Boiler Installations & Industrial Maintenance',
    description: 'Professional commercial and industrial boiler installations, steam piping systems, and maintenance services by certified technicians in Ghana.'
  },
  '/services/apprenticeship': {
    title: 'Apprenticeship & Technical Training Programmes',
    description: 'Developing local skills and empowering Ghanaian youth with hands-on vocational training in plumbing, HVAC, and building services.'
  },
  '/services/maintenance': {
    title: 'Comprehensive Building Maintenance Services',
    description: 'Preventive and corrective facility maintenance for plumbing, electrical, and HVAC building systems to ensure optimal efficiency and safety.'
  },
  '/services/consulting': {
    title: 'Technical Consulting & Engineering Advisory',
    description: 'Expert engineering consulting, system design auditing, and project planning advisory for building service installations.'
  },
  '/projects': {
    title: 'Our Projects | Proven Track Record of Excellence',
    description: 'Explore our portfolio of completed works across various sectors, demonstrating our engineering precision and commitment to quality.'
  },
  '/gallery': {
    title: 'Photo Gallery | Plumbing, Civil, HVAC & Boiler Works',
    description: 'Browse our photo gallery of completed plumbing, civil, heating, ventilation, boiler, and water treatment installations across Ghana.'
  },
  '/why-choose-us': {
    title: 'Why Choose Us | Our Technical Edge & Values',
    description: 'Discover the technical expertise, reliability, safety compliance, and quality workmanship that make Acquans Ventures the preferred building services partner.'
  },
  '/blog': {
    title: 'Blog & Technical Insights | Industry Guides',
    description: 'Stay updated with technical installation guides, building services best practices, plumbing tips, and industry news from our engineering team.'
  },
  '/contact': {
    title: 'Contact Us | Get in Touch with Our Experts',
    description: 'Have a project? Contact Acquans Ventures for expert advice and professional technical service inquiries.'
  },
  '/request-quote': {
    title: 'Request a Quotation | Start Your Project',
    description: 'Fill out our inquiry form to receive a professional estimate for your plumbing, civil, or HVAC project within 24 hours.'
  },
  '/login': {
    title: 'Account Login | Client & Staff Portal',
    description: 'Access the Acquans Ventures client portal or administrative console to track project execution progress and message team members.'
  },
  '/admin-register': {
    title: 'Register Account | Staff Access Portal',
    description: 'Create an administrator or project team account to manage project inquiries, chat threads, and site progress.'
  },
  '/admin-dashboard': {
    title: 'Admin Dashboard | Project Management Hub',
    description: 'Administrative console for managing project quotes, clients, staff assignments, and project messages.'
  },
  '/client-dashboard': {
    title: 'Client Dashboard | Track Project Progress',
    description: 'Secure client portal to monitor ongoing site works, read progress updates, and chat with technical managers in real-time.'
  },
  '/team-dashboard': {
    title: 'Team Dashboard | Project Execution Console',
    description: 'Project team console for updating project progress, saving site status updates, and communicating with clients.'
  },
  '/privacy': {
    title: 'Privacy Policy | Data Protection',
    description: 'Read the privacy policy of Acquans Ventures to understand how we collect, protect, and use your personal information.'
  },
  '/terms': {
    title: 'Terms & Conditions | Service Agreement',
    description: 'Terms of service and building services contract guidelines for projects undertaken by Acquans Ventures.'
  },
  '/cookies': {
    title: 'Cookie Policy | Website Preferences',
    description: 'Information on how we use cookies and tracking technologies to improve your experience on our website.'
  },
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    let config = seoConfig[location.pathname];
    
    // Handle dynamic blog post titles
    if (!config && location.pathname.startsWith('/blog/')) {
      config = {
        title: 'Industry Insights & Technical Guides',
        description: 'Read the latest technical guides, engineering insights, and maintenance tips from the professionals at Acquans Ventures.'
      };
    }

    if (!config) {
      config = {
        title: 'Technical Installation & Building Services',
        description: 'Acquans Ventures provides premium building and technical services in Ghana.'
      };
    }

    const fullTitle = `${config.title} | Acquans Ventures`;
    const url = `https://acquansventures.com${location.pathname}`;

    // Update Title
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, attrValue: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard
    setMeta('meta[name="description"]', 'name', 'description', config.description);

    // Open Graph
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', config.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);

    // Twitter
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);

    // Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

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

