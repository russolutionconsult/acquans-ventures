import { Target, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To provide exceptional technical installation services that exceed client expectations through quality workmanship, innovative solutions, and unwavering commitment to safety.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    accent: 'from-blue-500 to-indigo-600',
    shadow: 'hover:shadow-blue-100',
    iconBg: 'bg-blue-100/50'
  },
  {
    icon: ShieldCheck,
    title: 'Reliability',
    desc: 'We stand behind every project we deliver. Our clients trust us for consistent, dependable service and timely project completion across Ghana.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    accent: 'from-emerald-500 to-teal-600',
    shadow: 'hover:shadow-emerald-100',
    iconBg: 'bg-emerald-100/50'
  },
  {
    icon: Award,
    title: 'Excellence',
    desc: 'Our team continuously upgrades skills and embraces modern techniques to ensure every installation meets international standards of quality.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    accent: 'from-amber-400 to-orange-600',
    shadow: 'hover:shadow-amber-100',
    iconBg: 'bg-amber-100/50'
  },
];

export default function About() {
  return (
    <Layout>
      {/* Page Header */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">About Us</p>
            <h1 className="section-title">Who We Are</h1>
          </motion.div>
        </div>
      </section>

      {/* Company Info */}
      <section className="pb-20 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full lg:w-[40%] relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="relative p-2 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl overflow-hidden group">
                <img
                  src="/images/about-us.png"
                  alt="Acquans Ventures professional workmanship"
                  loading="lazy"
                  decoding="async"
                  className="rounded-[2rem] w-full h-auto object-cover max-w-xs mx-auto transition-transform hover:scale-105 duration-700"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 leading-tight">
                Building Excellence at <span className="text-primary">Acquans Ventures</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Acquans Ventures is a Ghana-based technical installation and building services
                company. We specialize in plumbing, civil works, heating, ventilation & air-conditioning,
                and boiler installations for residential, commercial, and industrial clients.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our team of skilled technicians and engineers is committed to delivering projects on
                time, within budget, and to the highest standards of quality. We take pride in our
                reputation for reliability, professionalism, and technical expertise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, index) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className={`group relative bg-white rounded-3xl border border-gray-100 p-8 shadow-sm transition-all duration-300 ${v.shadow}`}
              >
                {/* Accent line on top hover */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${v.accent} opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl`} />
                
                <div className={`w-16 h-16 rounded-2xl ${v.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <v.icon className={`h-8 w-8 ${v.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">{v.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[0.95rem]">{v.desc}</p>
                
                {/* Decorative background number/letter potentially, or just a glow */}
                <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${v.accent} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.08 transition-opacity`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
