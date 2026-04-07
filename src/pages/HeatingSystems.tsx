import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Flame } from 'lucide-react';
import Layout from '@/components/Layout';

const services = [
  'Underfloor heating design & installation',
  'Radiator systems for residential & commercial properties',
  'Heat pump installation & commissioning',
  'Central heating system setup & pipework',
  'Heating system upgrades & energy optimization',
  'Thermostat & smart heating controls',
];

const whyUs = [
  'Energy-efficient solutions that reduce running costs',
  "Systems designed for Ghana's climate requirements",
  'Certified technicians with manufacturer training',
  'Full after-installation support & maintenance',
];

export default function HeatingSystems() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/heating-banner-clean-african.png"
            alt="Modern and clean heating system installation by expert technician"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Heating Systems
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Modern Heating Solutions for Every Space
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              We design and install efficient heating systems — from underfloor heating 
              and radiator networks to heat pumps — tailored to your comfort needs and 
              energy goals.
            </p>
          </div>
        </div>
      </section>

      {/* Services & Why Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="/images/heat expert at work.png"
                alt="Heat expert at work installing heating system"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                <Flame className="h-4 w-4" /> Our Heating Services
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">
                What We Provide
              </h2>
              <p className="text-gray-600 mb-6">
                Whether you're fitting out a new property or upgrading an existing system, 
                we deliver heating solutions that combine comfort with energy efficiency.
              </p>
              <div className="flex flex-col gap-3">
                {services.map((s) => (
                  <div key={s} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold text-foreground mb-6">Why Choose Our Heating Team?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyUs.map((w) => (
              <div key={w} className="flex items-start gap-3 text-left bg-white rounded-lg border border-border p-4">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium text-sm">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Need a Heating System Installed?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Contact us for a tailored heating solution for your property.
          </p>
          <Link to="/request-quote" className="btn-white px-8 py-3.5">
            Request For Quotation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
