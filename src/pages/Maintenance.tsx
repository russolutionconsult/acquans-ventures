import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Wrench, Wind, Thermometer, Flame } from 'lucide-react';
import Layout from '@/components/Layout';

const services = [
  { title: 'Plumbing', icon: Wrench, items: ['Leak detection & pipe repair', 'Drain cleaning & fixture upgrades'] },
  { title: 'HVAC Systems', icon: Wind, items: ['Filter replacement & refrigerant checks', 'Duct inspection & thermostat calibration'] },
  { title: 'Heating', icon: Thermometer, items: ['Radiator balancing & heat pump checks', 'Underfloor heating diagnostics'] },
  { title: 'Boilers', icon: Flame, items: ['Annual safety inspections', 'Descaling, flushing & breakdown repair'] },
];

export default function Maintenance() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0">
          <img
            src="/images/maintenance-service.png"
            alt="Technician servicing equipment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
              Maintenance Services
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Keep Your Systems Running at Peak Performance
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Our preventive and corrective maintenance services protect your investment, 
              minimize downtime, and extend the lifespan of your building systems.
            </p>
          </div>
        </div>
      </section>

      {/* What We Maintain */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label">What We Maintain</p>
            <h2 className="section-title">Comprehensive Coverage</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{s.title}</h3>
                <div className="flex flex-col gap-2">
                  {s.items.map((i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Maintain */}
      <section className="py-20 section-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="/images/project-hvac.png"
                alt="HVAC maintenance work"
                className="rounded-xl shadow-lg w-full h-72 object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="section-label">Why Regular Maintenance?</p>
              <h2 className="text-2xl font-extrabold text-foreground mb-4">
                Don't Wait for a Breakdown
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Regular servicing prevents costly emergency repairs, improves energy efficiency, 
                and ensures safe operation of all your building systems. We offer flexible 
                plans — from on-demand call-outs to comprehensive annual coverage.
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {['On-demand repairs — no commitment needed', 'Quarterly preventive plans with discounts', 'All-inclusive annual coverage with priority support'].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
                    <span className="text-sm text-gray-700 font-medium">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary">
                Schedule Maintenance <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Protect Your Investment
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Contact us today to discuss a maintenance plan tailored to your property.
          </p>
          <Link to="/request-quote" className="btn-white px-8 py-3.5">
            Request For Quotation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
