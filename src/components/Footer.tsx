import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Cookie Policy', path: '/cookies' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-300">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/official logo of acquans ventures.png"
                alt="Acquans Ventures"
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Professional technical installation and building services based in Ghana. Delivering quality workmanship since day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-base font-bold text-white mb-4">Legal</h4>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold text-white mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:0543861162"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                0543861162 / 0506624555
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 shrink-0" />
                Ghana
              </div>
              <a
                href="mailto:info@acquansventures.com"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                info@acquansventures.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 py-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Acquans Ventures. All rights reserved. Powered by{' '}
            <a 
              href="https://www.russolutionconsult.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Russolution Consult
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
