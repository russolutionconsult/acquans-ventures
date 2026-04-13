import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ScrollToTop from '@/components/ScrollToTop';

// Eager load Home (first page users see)
import Home from '@/pages/Home';

// Lazy load everything else
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const PlumbingWorks = lazy(() => import('@/pages/PlumbingWorks'));
const CivilWorks = lazy(() => import('@/pages/CivilWorks'));
const HeatingSystems = lazy(() => import('@/pages/HeatingSystems'));
const VentilationAC = lazy(() => import('@/pages/VentilationAC'));
const BoilerInstallations = lazy(() => import('@/pages/BoilerInstallations'));
const Apprenticeship = lazy(() => import('@/pages/Apprenticeship'));
const Maintenance = lazy(() => import('@/pages/Maintenance'));
const Consulting = lazy(() => import('@/pages/Consulting'));
const Projects = lazy(() => import('@/pages/Projects'));
const WhyChooseUs = lazy(() => import('@/pages/WhyChooseUs'));
const Blog = lazy(() => import('@/pages/Blog'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/Login'));
const AdminRegister = lazy(() => import('@/pages/AdminRegister'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const AdminClientJourney = lazy(() => import('@/pages/AdminClientJourney'));
const ClientDashboard = lazy(() => import('@/pages/ClientDashboard'));
const ProjectMessages = lazy(() => import('@/pages/ProjectMessages'));
const RequestQuote = lazy(() => import('@/pages/RequestQuote'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('@/pages/TermsConditions'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/plumbing-works" element={<PlumbingWorks />} />
          <Route path="/services/civil-works" element={<CivilWorks />} />
          <Route path="/services/heating-systems" element={<HeatingSystems />} />
          <Route path="/services/ventilation-ac" element={<VentilationAC />} />
          <Route path="/services/boiler-installations" element={<BoilerInstallations />} />
          <Route path="/services/apprenticeship" element={<Apprenticeship />} />
          <Route path="/services/maintenance" element={<Maintenance />} />
          <Route path="/services/consulting" element={<Consulting />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-quote" element={<RequestQuote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/client-journey/:id" element={<AdminClientJourney />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/messages/:quoteId" element={<ProjectMessages />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
