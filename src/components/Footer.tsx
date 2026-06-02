import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';

const quickLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Why Choose Us', path: '/why-choose-us' },
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
              <img loading="lazy"
                src="/images/official logo of acquans ventures.png"
                alt="Acquans Ventures"
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Professional technical installation and building services based in Ghana. Delivering quality workmanship since day one.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/p/DYPp4TAiLd9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@acquans_ventures"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 448 512" 
                  className="h-5 w-5 fill-current"
                >
                  <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
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
              <a 
                href="https://maps.app.goo.gl/ciNGa9cqHqrn2MXA6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                Ghana
              </a>
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
              className="text-blue-500 hover:text-blue-400 font-semibold transition-colors"
            >
              Russolution Consult
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
