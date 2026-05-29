import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { ArrowRight, CheckCircle, CircleDot, ShieldCheck } from 'lucide-react';
import Layout from '@/components/Layout';

const capabilities = [
  'Steam & hot water boiler installation',
  'Boiler commissioning & pressure testing',
  'Piping systems & valve configuration',
  'Boiler room design & layout planning',
  'Annual servicing & safety inspections',
  'Emergency breakdown repairs',
];

const safety = [
  'Strict adherence to international safety standards',
  'Certified and factory-trained technicians',
  'Comprehensive pre-commissioning testing',
  'Detailed documentation & compliance certificates',
];

export default function BoilerInstallations() {
  return (
    <Layout>
      <SEO title="Boiler Installations" />
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img loading="lazy"
            src="/images/boiler machines.png"
            alt="Large industrial boiler machines setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Boiler Installations
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Industrial & Commercial Boiler Experts
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              We specialize in the installation, commissioning, and maintenance of 
              industrial and commercial boilers — handling steam boilers, hot water 
              systems, and related piping with strict safety compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                <CircleDot className="h-4 w-4" /> What We Do
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">
                Full-Service Boiler Solutions
              </h2>
              <p className="text-gray-600 mb-6">
                From initial design and installation through to ongoing servicing, our 
                boiler team ensures reliable, efficient operation for hotels, hospitals, 
                factories, and commercial facilities.
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
                  <ShieldCheck className="h-5 w-5 text-primary" /> Safety First
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Boiler systems demand the highest safety standards. Our team is fully 
                  certified and follows rigorous protocols at every stage.
                </p>
                <div className="flex flex-col gap-3">
                  {safety.map((s) => (
                    <div key={s} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium text-sm">{s}</span>
                    </div>
                  ))}
                </div>
                <img loading="lazy"
                  src="/images/boiler machines.png"
                  alt="Professional industrial boiler machines installation"
                  className="w-full h-44 object-cover rounded-lg mt-6"
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
            Need Boiler Installation or Servicing?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Contact our team to discuss your boiler requirements and get a detailed quote.
          </p>
          <Link to="/request-quote" className="btn-white px-8 py-3.5">
            Request For Quotation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
