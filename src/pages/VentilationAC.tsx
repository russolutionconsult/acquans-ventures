import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Wind } from 'lucide-react';
import Layout from '@/components/Layout';

const offerings = [
  'Air-conditioning system design & installation',
  'Ventilation ductwork fabrication & fitting',
  'Chiller & split-unit installation',
  'Indoor air quality assessment & improvement',
  'System maintenance, servicing & repairs',
  'Energy-efficient climate control solutions',
];

const sectors = [
  { name: 'Commercial Offices', desc: 'Comfortable working environments that boost productivity.' },
  { name: 'Hotels & Hospitality', desc: 'Guest comfort through reliable climate control.' },
  { name: 'Hospitals & Clinics', desc: 'Clean air and precise temperature management.' },
  { name: 'Industrial Facilities', desc: 'Ventilation solutions for factories and warehouses.' },
];

export default function VentilationAC() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/hvac.png"
            alt="HVAC system installation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Ventilation & Air-Conditioning
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Optimal Indoor Climate, Every Season
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Our HVAC team delivers expert ventilation and air-conditioning services — 
              from system design and installation to ongoing maintenance — ensuring 
              comfort and air quality across all building types.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                <Wind className="h-4 w-4" /> Our HVAC Services
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">
                What We Offer
              </h2>
              <p className="text-gray-600 mb-6">
                We provide end-to-end HVAC solutions — designing systems that balance 
                performance with energy efficiency, then installing and maintaining them 
                for long-term reliability.
              </p>
              <div className="flex flex-col gap-3">
                {offerings.map((o) => (
                  <div key={o} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{o}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <img
                src="/images/project-hvac.png"
                alt="HVAC project installation"
                className="w-full h-full min-h-[300px] object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-label">Sectors We Serve</p>
            <h2 className="section-title">Built for Every Environment</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((s) => (
              <div key={s.name} className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-foreground mb-2">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Need HVAC Solutions?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Let us design and install the perfect climate control system for your space.
          </p>
          <Link to="/request-quote" className="btn-white px-8 py-3.5">
            Request For Quotation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
