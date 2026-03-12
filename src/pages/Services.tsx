import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const services = [
  {
    title: 'Plumbing Works',
    img: '/images/plumbing.png',
    desc: 'We provide comprehensive plumbing services including pipe installation, water supply systems, drainage solutions, and sanitary fittings for both residential and commercial buildings. Our skilled plumbers ensure leak-free, code-compliant work using quality materials.',
    reverse: false,
  },
  {
    title: 'Civil Works',
    img: '/images/civil-works.png',
    desc: 'Our civil works division handles structural construction, foundation laying, concrete works, and general building services. From ground-up construction to renovations, we deliver durable structures built to last with precision engineering.',
    reverse: true,
  },
  {
    title: 'Heating Systems',
    img: '/images/heating.png',
    desc: 'We design and install modern heating solutions for residential and commercial properties. Our heating services include underfloor heating, radiator systems, and heat pump installations tailored to your comfort needs.',
    reverse: false,
  },
  {
    title: 'Ventilation & Air-Condition Services',
    img: '/images/hvac.png',
    desc: 'Our HVAC team provides expert ventilation and air-conditioning services including system design, installation, and maintenance. We ensure optimal indoor air quality and climate control for offices, hospitals, hotels, and industrial facilities.',
    reverse: true,
  },
  {
    title: 'Boiler Installations',
    img: '/images/boiler.png',
    desc: 'We specialize in the installation, commissioning, and maintenance of industrial and commercial boilers. Our technicians handle steam boilers, hot water boilers, and related piping systems with strict adherence to safety standards.',
    reverse: false,
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Page Header */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="section-label">Our Services</p>
          <h1 className="section-title">Professional Technical Services</h1>
        </div>
      </section>

      {/* Service Blocks */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-20">
            {services.map((s) => (
              <div
                key={s.title}
                id={s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className={`flex flex-col ${s.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } items-center gap-10 scroll-m-24`}
              >
                <div className="flex-1 w-full">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="rounded-xl shadow-md w-full h-72 lg:h-80 object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-extrabold text-foreground mb-4">{s.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{s.desc}</p>
                  <Link to="/contact" className="btn-primary">
                    Request This Service <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
