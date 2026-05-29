import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Images, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const projects = [
  { title: 'Commercial Plumbing Installation', category: 'PLUMBING', img: '/images/commercial plumbing.jpeg' },
  { title: 'Building & Construction', category: 'CIVIL WORKS', img: '/images/construction project.jpeg' },
  { title: 'Industrial Installation', category: 'BOILER', img: '/images/boilers .jpeg' },
];

const categoryColors: Record<string, string> = {
  PLUMBING: 'text-blue-600',
  'CIVIL WORKS': 'text-amber-600',
  HVAC: 'text-teal-600',
  BOILER: 'text-red-600',
};

export default function Projects() {
  return (
    <Layout>
      <SEO title="Projects" />
      {/* Page Header */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="section-label">Our Portfolio</p>
          <h1 className="section-title mb-4">Projects & Work Gallery</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Showcasing our technical capability and quality workmanship across plumbing, civil, HVAC,
            and boiler installations.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.title}
                className="group rounded-xl overflow-hidden border border-border bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className={`text-xs font-bold tracking-wider mb-1 ${categoryColors[p.category] || 'text-primary'}`}>
                    {p.category}
                  </p>
                  <h3 className="font-bold text-foreground">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-blue-600 p-8 lg:p-12 text-center text-white">
            <Images className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              See more of our work
            </h2>
            <p className="text-white/90 max-w-xl mx-auto mb-6">
              Browse our full photo gallery of completed plumbing, civil, heating, ventilation,
              boiler, and water treatment installations.
            </p>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
