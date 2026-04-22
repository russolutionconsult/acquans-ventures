import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, ShieldCheck } from 'lucide-react';
import Layout from '@/components/Layout';

const services = [
  'Industrial water distribution pumps',
  'Commercial booster pump systems',
  'Heavy-duty borehole pump setups',
  'Fire hydrant booster pump sets',
  'Industrial plant cooling pumps',
  'Submersible sewage & drainage pumps',
  'Water tank automated filling systems',
  'Swimming pool & irrigation pump systems',
  'Technical pump maintenance & repair',
];

export default function PumpInstallation() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0">
          <img
            src="/images/project-boiler-clean.png"
            alt="Professional pump installation services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-light text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6 border border-primary/30">
              <Zap className="h-4 w-4" /> Comprehensive Pump Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Professional <span className="text-primary-light">Pump</span> Solutions & Installations
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
              We provide high-performance water management solutions for residential, commercial, 
              and industrial facilities across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Image Column */}
            <div className="flex-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl group-hover:bg-primary/10 transition-colors" />
                <img 
                  src="/images/project-boiler-clean.png" 
                  alt="Industrial Pump Work"
                  loading="lazy"
                  decoding="async"
                  className="relative rounded-[2.5rem] w-full h-[500px] object-cover shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-3xl shadow-xl hidden md:block">
                  <ShieldCheck className="h-12 w-12 text-white mb-2" />
                  <p className="text-white font-bold text-lg">Reliable Flow</p>
                  <p className="text-white/80 text-sm">Engineered for Durability</p>
                </div>
              </div>
            </div>

            {/* List Column */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Our Technical Pump Expertise
              </h2>
              <p className="text-slate-600 mb-10 text-lg leading-relaxed">
                From high-capacity industrial lifting to automated home distribution, 
                our team ensures your water systems operate with peak efficiency.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {services.map((s) => (
                  <div key={s} className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="text-slate-700 font-bold text-sm">{s}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-slate-600 italic font-medium leading-relaxed">
                  "We don't just install pumps; we design entire pressure systems that minimize energy 
                  consumption while maximizing consistent throughput."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Need Expert Pump Installation?
          </h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg font-medium">
            Join hundreds of satisfied clients who trust Acquans Ventures for their technical plumbing and pump needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/request-quote" className="btn-white px-10 py-4 text-lg">
              Get A Quote Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

