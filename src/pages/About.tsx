import { Target, ShieldCheck, Award } from 'lucide-react';
import Layout from '@/components/Layout';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To provide exceptional technical installation services that exceed client expectations through quality workmanship, innovative solutions, and unwavering commitment to safety.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliability',
    desc: 'We stand behind every project we deliver. Our clients trust us for consistent, dependable service and timely project completion across Ghana.',
  },
  {
    icon: Award,
    title: 'Excellence',
    desc: 'Our team continuously upgrades skills and embraces modern techniques to ensure every installation meets international standards of quality.',
  },
];

export default function About() {
  return (
    <Layout>
      {/* Page Header */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="section-label">About Us</p>
          <h1 className="section-title">Who We Are</h1>
        </div>
      </section>

      {/* Company Info */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="/images/team-about.png"
                alt="Acquans Ventures team reviewing plans"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                Acquans Ventures
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Acquans Ventures is a Ghana-based technical installation and building services
                company. We specialize in plumbing, civil works, heating, ventilation & air-conditioning,
                and boiler installations for residential, commercial, and industrial clients.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our team of skilled technicians and engineers is committed to delivering projects on
                time, within budget, and to the highest standards of quality. We take pride in our
                reputation for reliability, professionalism, and technical expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 section-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card-hover">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
