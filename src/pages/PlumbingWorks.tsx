import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Droplets, ShieldCheck } from 'lucide-react';
import Layout from '@/components/Layout';

const domesticServices = [
  'Sanitary fitting & modern bathroom fixture installation',
  'Residential water supply & distribution design',
  'Kitchen plumbing & appliance water connections',
  'Home drainage & sewage system setup',
  'Water heater installation & maintenance',
  'Leak detection & residential pipe repair',
];

const industrialServices = [
  'Large-scale industrial water supply systems',
  'High-pressure pipe threading & specialized welding',
  'Industrial waste & sewage treatment plants',
  'Commercial boiler pipework & pump installations',
  'Specialized chemical & laboratory piping',
  'Factory-wide preventive plumbing maintenance',
];

export default function PlumbingWorks() {
  return (
    <Layout>
      <SEO title="Plumbing Works" />
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0">
          <img loading="lazy"
            src="/images/plumbing-works-hero.jpeg"
            alt="Professional plumbing pipe installation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-light text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6 border border-primary/30">
              <Droplets className="h-4 w-4" /> Professional Plumbing
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Expert Plumbing for <span className="text-primary-light">Industrial</span> & <span className="text-primary-light">Domestic</span> Needs
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
              From high-pressure industrial systems to modern domestic installations, we deliver 
              precision engineering and leak-free solutions across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Image Column */}
            <div className="flex-1 sticky top-32">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl group-hover:bg-primary/10 transition-colors" />
                <img 
                  src="/images/plumbing-works-hero.jpeg" 
                  alt="Professional Plumbing Work"
                  loading="lazy"
                  decoding="async"
                  className="relative rounded-[2.5rem] w-full h-[600px] object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold">Guaranteed Quality</p>
                      <p className="text-slate-500 text-sm">Certified materials & skilled experts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Column */}
            <div className="flex-1 flex flex-col gap-8">
              
              {/* Domestic Block */}
              <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Domestic Plumbing</h2>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  High-quality residential plumbing prioritizing durability and aesthetics. 
                  We handle luxury bathroom fittings, home drainage, and modern kitchen systems.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {domesticServices.map((s) => (
                    <div key={s} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industrial Block */}
              <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-slate-800 shadow-xl text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                    <ShieldCheck className="h-6 w-6 text-primary-light" />
                  </div>
                  <h2 className="text-3xl font-bold">Industrial Plumbing</h2>
                </div>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Heavy-duty solutions for complex infrastructure. Our experts manage high-pressure systems 
                  and factory-wide plumbing with absolute precision.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {industrialServices.map((s) => (
                    <div key={s} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-light shrink-0 mt-0.5" />
                      <span className="text-slate-300 font-medium text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Starting a Plumbing Project?
          </h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg">
            Whether it's a single residential unit or a massive industrial facility, 
            request a free quotation today and let's build something lasting.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/request-quote" className="btn-white px-10 py-4 text-lg">
              Get My Quotation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
