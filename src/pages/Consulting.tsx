import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ClipboardList, FileText, HardHat, BarChart3, Lightbulb, Users } from 'lucide-react';
import Layout from '@/components/Layout';

const areas = [
  { title: 'Project Planning & Feasibility', icon: ClipboardList },
  { title: 'Technical Design & Specifications', icon: FileText },
  { title: 'Site Assessment & Audits', icon: HardHat },
  { title: 'Energy Efficiency Consulting', icon: BarChart3 },
  { title: 'Regulatory Compliance', icon: Lightbulb },
  { title: 'Project Management Support', icon: Users },
];

const process = [
  { step: '01', title: 'Consultation', desc: 'We discuss your project goals and challenges.' },
  { step: '02', title: 'Site Assessment', desc: 'Our team inspects conditions and gathers data.' },
  { step: '03', title: 'Recommendations', desc: 'We deliver a detailed report with cost estimates.' },
  { step: '04', title: 'Implementation', desc: 'We support execution to ensure quality results.' },
];

export default function Consulting() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/Construction professionals in discussion on-site.png"
            alt="Construction professionals in discussion on-site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Consulting Services
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Expert Technical Consulting for Smarter Projects
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              From feasibility studies to post-installation audits — leverage our deep industry 
              experience to make informed decisions on your building and infrastructure projects.
            </p>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label">Areas of Expertise</p>
            <h2 className="section-title">How We Can Help</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((a) => (
              <div
                key={a.title}
                className="bg-white rounded-xl border border-border p-6 flex items-start gap-4 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <a.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mt-2">{a.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 section-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="/images/Construction professionals in discussion on-site.png"
                alt="Experts in discussion on-site"
                className="rounded-xl shadow-lg w-full h-72 object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="section-label">Our Process</p>
              <h2 className="text-2xl font-extrabold text-foreground mb-6">
                How We Work With You
              </h2>
              <div className="flex flex-col gap-5">
                {process.map((p) => (
                  <div key={p.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {p.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{p.title}</h3>
                      <p className="text-sm text-gray-600">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl mx-auto">
          <p className="section-label">Why Acquans Ventures?</p>
          <h2 className="section-title mb-6">Industry Knowledge You Can Trust</h2>
          <div className="flex flex-col gap-3 text-left">
            {[
              'Multidisciplinary team covering plumbing, HVAC, civil & mechanical',
              'Transparent reporting with clear, actionable insights',
              'Strong network of suppliers, contractors & regulatory bodies',
              'Track record across residential & commercial sectors in Ghana',
            ].map((r) => (
              <div key={r} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium text-sm">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Need Expert Advice?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Get in touch for a free initial discussion about your project needs.
          </p>
          <Link to="/request-quote" className="btn-white px-8 py-3.5">
            Request For Quotation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
