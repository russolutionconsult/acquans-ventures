import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Wrench, Building2, Flame, Wind, CircleDot, ArrowRight, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';

const services = [
  { title: 'Plumbing Works', icon: Wrench, img: '/images/plumbing.png', desc: 'Complete plumbing solutions for residential and commercial projects.' },
  { title: 'Civil Works', icon: Building2, img: '/images/civil-works.png', desc: 'Structural and civil engineering construction services.' },
  { title: 'Heating', icon: Flame, img: '/images/heating.png', desc: 'Modern heating system design and installation.' },
  { title: 'Ventilation & AC', icon: Wind, img: '/images/hvac.png', desc: 'HVAC systems for optimal indoor climate control.' },
  { title: 'Boiler Installations', icon: CircleDot, img: '/images/boiler.png', desc: 'Industrial and commercial boiler setup and maintenance.' },
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

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/Acquans Ventures homepage video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative container mx-auto px-4 lg:px-8 py-20 flex items-center justify-center">
          <div className="max-w-3xl text-center mx-auto">
            <span className="inline-block bg-white/15 border border-white/30 text-white font-semibold text-xs tracking-widest uppercase px-5 py-2 rounded-full mb-4 animate-fade-in-up backdrop-blur-sm">
              Technical Installation & Building Services
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="text-blue-300">Building</span> Quality Projects With <span className="text-blue-300">Excellence</span>
            </h1>
            <p
              className="text-lg text-white/80 mb-8 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Acquans Ventures delivers professional plumbing, civil works, HVAC, and boiler
              installation services with unmatched quality and reliability.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/contact" className="btn-primary px-8 py-3.5 text-base">
                Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="tel:0543861162"
                className="inline-flex items-center justify-center border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-md hover:bg-white/10 transition-colors text-base"
              >
                <Phone className="mr-2 h-4 w-4" /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label">Our Services</p>
            <h2 className="section-title">What We Do Best</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                to="/services"
                key={s.title}
                className="group rounded-xl overflow-hidden border border-border bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-foreground">{s.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Teaser */}
      <section className="py-20 section-alt">
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
          <div className="flex-1">
            <img
              src="/images/civil-works.png"
              alt="Quality civil works"
              className="rounded-xl shadow-lg w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 mb-6">Call us today or send an inquiry.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:0543861162"
              className="inline-flex items-center justify-center border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition-colors text-sm"
            >
              <Phone className="mr-2 h-4 w-4" /> 0543861162
            </a>
            <a
              href="tel:0506624555"
              className="inline-flex items-center justify-center border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition-colors text-sm"
            >
              <Phone className="mr-2 h-4 w-4" /> 0506624555
            </a>
            <Link to="/contact" className="btn-white">
              Send Inquiry <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
