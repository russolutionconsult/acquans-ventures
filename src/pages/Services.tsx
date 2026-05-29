import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Building2, Flame, Wind, CircleDot, GraduationCap, Settings, Lightbulb } from 'lucide-react';
import Layout from '@/components/Layout';

const services = [
  {
    title: 'Plumbing Works',
    icon: Wrench,
    img: '/images/plumbing-works-industrial.png',
    path: '/services/plumbing-works',
    desc: 'Complete plumbing solutions for residential and commercial projects.',
    color: 'text-blue-600',
    shadow: 'hover:shadow-blue-100'
  },
  {
    title: 'Civil Works',
    icon: Building2,
    img: '/images/civil-works-clean.png',
    path: '/services/civil-works',
    desc: 'Structural and civil engineering construction services.',
    color: 'text-emerald-600',
    shadow: 'hover:shadow-emerald-100'
  },
  {
    title: 'Heating Systems',
    icon: Flame,
    img: '/images/heating-technician.png',
    path: '/services/heating-systems',
    desc: 'Modern heating system design and installation.',
    color: 'text-orange-600',
    shadow: 'hover:shadow-orange-100'
  },
  {
    title: 'Ventilation & AC',
    icon: Wind,
    img: '/images/hvac-technician-rooftop.png',
    path: '/services/ventilation-ac',
    desc: 'HVAC systems for optimal indoor climate control.',
    color: 'text-sky-600',
    shadow: 'hover:shadow-sky-100'
  },
  {
    title: 'Boiler Installations',
    icon: CircleDot,
    img: '/images/boiler-repair-industrial.png',
    path: '/services/boiler-installations',
    desc: 'Industrial and commercial boiler setup and maintenance.',
    color: 'text-slate-700',
    shadow: 'hover:shadow-slate-200'
  },
  {
    title: 'Apprenticeship & Training',
    icon: GraduationCap,
    img: '/images/apprenticeship-training.png',
    path: '/services/apprenticeship',
    desc: 'Hands-on training programs for aspiring technicians.',
    color: 'text-indigo-600',
    shadow: 'hover:shadow-indigo-100'
  },
  {
    title: 'Maintenance',
    icon: Settings,
    img: '/images/maintenance-clean.png',
    path: '/services/maintenance',
    desc: 'Preventive and corrective maintenance for all building systems.',
    color: 'text-rose-600',
    shadow: 'hover:shadow-rose-100'
  },
  {
    title: 'Consulting',
    icon: Lightbulb,
    img: '/images/consulting-engineers.png',
    path: '/services/consulting',
    desc: 'Expert technical consulting for smarter project decisions.',
    color: 'text-violet-600',
    shadow: 'hover:shadow-violet-100'
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Layout>
      <SEO title="Services" />
      {/* Page Header */}
      <section className="py-20 lg:py-28 bg-slate-50/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Our Services</p>
            <h1 className="section-title mb-4">Professional Technical Services</h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              From installation and construction to training and consulting — we deliver 
              comprehensive technical services with quality and reliability.
            </p>
            <div className="h-1.5 w-24 bg-primary/15 rounded-full mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 -mt-10 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            {services.map((s) => (
              <motion.div key={s.title} variants={itemVariants}>
                <Link
                  to={s.path}
                  className={`group block bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500 shadow-sm ${s.shadow} hover:-translate-y-2`}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img loading="lazy"
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:border-transparent transition-all duration-300">
                        <s.icon className={`h-5 w-5 ${s.color}`} />
                      </div>
                      <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{s.title}</h2>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{s.desc}</p>
                    <span className="inline-flex items-center text-primary text-xs font-extrabold uppercase tracking-wider group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Contact us today for a free consultation and quote.
          </p>
          <Link to="/request-quote" className="btn-white px-8 py-3.5">
            Request For Quotation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
