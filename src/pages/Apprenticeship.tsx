import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { ArrowRight, CheckCircle, GraduationCap } from 'lucide-react';
import Layout from '@/components/Layout';

const programs = [
  'Plumbing — Pipe fitting, water systems & drainage',
  'HVAC — Air-conditioning installation & servicing',
  'Civil Works — Concrete, rebar & structural building',
  'Boiler & Heating — Installation, testing & maintenance',
];

const benefits = [
  'Hands-on training on live project sites',
  'Mentorship from experienced professionals',
  'Industry-recognized certification on completion',
  'Job placement support & career guidance',
];

export default function Apprenticeship() {
  return (
    <Layout>
      <SEO title="Apprenticeship" />
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img loading="lazy"
            src="/images/apprentices in industrial workshop.png"
            alt="Apprentices in industrial workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Apprenticeship & Training
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Building the Next Generation of Skilled Technicians
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Our hands-on programs equip aspiring technicians with real-world skills in 
              plumbing, HVAC, civil works, and more — guided by industry professionals on 
              active project sites across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Programs & Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Programs */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                <GraduationCap className="h-4 w-4" /> Training Programs
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">
                Available Apprenticeship Tracks
              </h2>
              <p className="text-gray-600 mb-6">
                Each program runs 12 – 24 months and combines supervised field work with 
                technical theory sessions and milestone assessments.
              </p>
              <div className="flex flex-col gap-3">
                {programs.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="flex-1">
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 h-full">
                <h3 className="text-xl font-bold text-foreground mb-5">Why Train With Us?</h3>
                <div className="flex flex-col gap-3">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{b}</span>
                    </div>
                  ))}
                </div>
                <img loading="lazy"
                  src="/images/apprentices in industrial workshop.png"
                  alt="Students training in industrial workshop"
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
            Ready to Start Your Career?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Applications are open year-round. Contact us to learn about enrollment and schedules.
          </p>
          <Link to="/contact" className="btn-white">
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
