import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Droplets, ShieldCheck } from 'lucide-react';
import Layout from '@/components/Layout';

const capabilities = [
  'Pipe installation, threading & soldering for all building types',
  'Water supply & distribution system design and setup',
  'Drainage and sewage system installation',
  'Sanitary fitting and bathroom fixture installation',
  'Leak detection, repair & pipe replacement',
  'Code-compliant work using certified materials',
];

export default function PlumbingWorks() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/professional-plumbing-works-pipe-installation-construction.jpeg"
            alt="Professional plumbing pipe installation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Plumbing Works
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Reliable Plumbing Solutions You Can Count On
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              From residential homes to large commercial buildings, our skilled plumbing team 
              delivers leak-free, code-compliant installations using quality materials and 
              proven techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                <Droplets className="h-4 w-4" /> What We Offer
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">
                Complete Plumbing Services
              </h2>
              <p className="text-gray-600 mb-6">
                We handle every aspect of plumbing — from new installations on construction 
                sites to repairs and upgrades on existing systems. Our team ensures every 
                joint is secure and every system meets regulatory standards.
              </p>
              <div className="flex flex-col gap-3">
                {capabilities.map((c) => (
                  <div key={c} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" /> Our Promise
                </h3>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Every project is completed with precision, on schedule, and backed by 
                  our workmanship guarantee. We use only certified materials that meet 
                  international standards.
                </p>
                <img
                  src="/images/project-plumbing.png"
                  alt="Plumbing project work"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Need Professional Plumbing Work?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Get a free quote for your residential or commercial plumbing project today.
          </p>
          <Link to="/request-quote" className="btn-white px-8 py-3.5">
            Request For Quotation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
