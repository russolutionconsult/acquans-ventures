import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, HardHat } from 'lucide-react';
import Layout from '@/components/Layout';

const scope = [
  'Foundation laying & structural concrete works',
  'Steel reinforcement (rebar) installation',
  'Formwork construction & scaffolding',
  'Block work, plastering & finishing',
  'Road and drainage infrastructure',
  'Renovation & building restoration',
];

const strengths = [
  'Experienced site engineers & supervisors',
  'Strict quality control & safety compliance',
  'On-time project delivery track record',
  'Durable structures built to international standards',
];

export default function CivilWorks() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/civil-engineering-rebar-foundation-construction-workers.png"
            alt="Civil engineering rebar foundation work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Civil Works
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Strong Foundations, Lasting Structures
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Our civil works division delivers structural construction, foundation laying, 
              and general building services — from ground-up builds to renovations — with 
              precision engineering and durable results.
            </p>
          </div>
        </div>
      </section>

      {/* Scope & Strengths */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
                <HardHat className="h-4 w-4" /> Project Scope
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">
                What We Build
              </h2>
              <p className="text-gray-600 mb-6">
                Whether it's a new commercial complex, residential development, or 
                infrastructure upgrade, we bring the expertise and manpower to deliver 
                quality civil engineering work.
              </p>
              <div className="flex flex-col gap-3">
                {scope.map((s) => (
                  <div key={s} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <img
                src="/images/project-construction.png"
                alt="Construction project"
                className="w-full h-52 object-cover rounded-xl shadow-md"
              />
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Our Strengths</h3>
                <div className="flex flex-col gap-3">
                  {strengths.map((s) => (
                    <div key={s} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Planning a Construction Project?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Talk to our civil engineering team about your next build.
          </p>
          <Link to="/request-quote" className="btn-white px-8 py-3.5">
            Request For Quotation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
