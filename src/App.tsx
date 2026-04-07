import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import PlumbingWorks from '@/pages/PlumbingWorks';
import CivilWorks from '@/pages/CivilWorks';
import HeatingSystems from '@/pages/HeatingSystems';
import VentilationAC from '@/pages/VentilationAC';
import BoilerInstallations from '@/pages/BoilerInstallations';
import Apprenticeship from '@/pages/Apprenticeship';
import Maintenance from '@/pages/Maintenance';
import Consulting from '@/pages/Consulting';
import Projects from '@/pages/Projects';
import WhyChooseUs from '@/pages/WhyChooseUs';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import AdminRegister from '@/pages/AdminRegister';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminClientJourney from '@/pages/AdminClientJourney';
import ClientDashboard from '@/pages/ClientDashboard';
import RequestQuote from '@/pages/RequestQuote';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsConditions from '@/pages/TermsConditions';
import CookiePolicy from '@/pages/CookiePolicy';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/cookies" element={<CookiePolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

