import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Wrench, Building2, Flame, Wind, CircleDot, ArrowRight, CheckCircle, Settings, Star } from 'lucide-react';
import Layout from '@/components/Layout';
import EnlargeableImage from '@/components/EnlargeableImage';
import SEO from '@/components/SEO';

const services = [
  { title: 'Plumbing Works', icon: Wrench, img: '/images/professional-plumbing-works-pipe-installation-construction.jpeg', path: '/services/plumbing-works', desc: 'Complete plumbing solutions for residential and commercial projects.', color: 'text-blue-600', shadow: 'hover:shadow-blue-100' },
  { title: 'Civil Works', icon: Building2, img: '/images/civil works at acquans ventures.jpeg', path: '/services/civil-works', desc: 'Structural and civil engineering construction services.', color: 'text-emerald-600', shadow: 'hover:shadow-emerald-100' },
  { title: 'Heating', icon: Flame, img: '/images/worker working on heating.jpeg', path: '/services/heating-systems', desc: 'Modern heating system design and installation.', color: 'text-orange-600', shadow: 'hover:shadow-orange-100' },
  { title: 'Ventilation & AC', icon: Wind, img: '/images/ventilation installation.jpeg', path: '/services/ventilation-ac', desc: 'HVAC systems for optimal indoor climate control.', color: 'text-sky-600', shadow: 'hover:shadow-sky-100' },
  { title: 'Boiler Installations', icon: CircleDot, img: '/images/boiler installation.jpeg', path: '/services/boiler-installations', desc: 'Industrial and commercial boiler setup and maintenance.', color: 'text-slate-700', shadow: 'hover:shadow-slate-200' },
  { title: 'Maintenance', icon: Settings, img: '/images/maintenance-planning.jpeg', path: '/services/maintenance', desc: 'Preventive and corrective maintenance for all your building systems.', color: 'text-rose-600', shadow: 'hover:shadow-rose-100' },
];

const reasons = [
  'Professional Workmanship',
  'Reliable & Timely Service',
  'Skilled Technicians',
  'Quality Materials',
  'Customer Satisfaction',
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.4;
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      <SEO title="Home" />
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/civil-engineering-rebar-foundation-construction-workers.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/Acquans Ventures homepage video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative container mx-auto px-4 lg:px-8 py-20 flex items-center justify-center">
          <div className="max-w-3xl text-center mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-white/15 border border-white/30 text-white font-semibold text-[10px] sm:text-xs tracking-widest uppercase px-5 py-2 rounded-full mb-4 backdrop-blur-sm"
            >
              Technical Installation & Building Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              <span className="text-blue-300">Delivering</span> Quality Projects in Ghana with <span className="text-blue-300">Excellence</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80 mb-8 leading-relaxed"
            >
              Acquans Ventures delivers professional plumbing, civil works, HVAC, and boiler
              installation services with unmatched quality and reliability.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/request-quote" className="btn-primary px-8 py-3.5 text-base border-2 border-white">
                Request For Quotation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/95 font-medium text-sm"
            >
              <CheckCircle className="h-4 w-4 text-blue-400" /> 
              <span>
                Trusted Excellence in <span className="font-bold text-white">Industrial</span> and <span className="font-bold text-white">Domestic</span> Technical Solutions
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex items-center justify-center gap-2 text-white"
            >
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <div className="relative h-5 w-5">
                  <Star className="absolute inset-0 h-5 w-5 text-yellow-400" />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: '90%' }}>
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
              </div>
              <span className="font-semibold">4.9/5</span>
              <span className="text-white/80 text-sm">rated by our clients</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="pt-8 pb-12 bg-white relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="section-label">Our Services</p>
              <h2 className="section-title">What We Do Best</h2>
              <div className="h-1.5 w-20 bg-primary/20 rounded-full mx-auto mt-4" />
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((s) => (
              <motion.div key={s.title} variants={itemVariants}>
                <Link
                  to={s.path}
                  className={`group block bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500 shadow-sm ${s.shadow} hover:-translate-y-2`}
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:border-transparent transition-all transition-all duration-300">
                        <s.icon className={`h-6 w-6 ${s.color}`} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                    <div className="flex items-center text-primary font-bold text-sm tracking-tight group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Teaser */}
      <section className="pt-12 pb-20 section-alt">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="section-label">Why Choose Us</p>
            <h2 className="section-title mb-6">Trusted Technical Experts in Ghana</h2>
            <div className="flex flex-col gap-3 mb-8">
              {reasons.map((r) => (
                <div key={r} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium">{r}</span>
                </div>
              ))}
            </div>
            <Link to="/why-choose-us" className="btn-primary">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="flex-1 relative">
            {/* Decorative background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative p-2 bg-white border-2 border-blue-600 rounded-[2.5rem] shadow-xl overflow-hidden max-w-md mx-auto">
              <EnlargeableImage
                src="/images/our team of experts.png"
                alt="Our team of experts"
                className="rounded-[2rem] w-full h-auto object-cover transition-transform hover:scale-105 duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 mb-6 font-medium">Request a free quotation for your next project today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/request-quote" className="btn-white px-8 py-3.5">
              Request For Quotation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
