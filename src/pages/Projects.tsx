import Layout from '@/components/Layout';

const projects = [
  { title: 'Commercial Plumbing Installation', category: 'PLUMBING', img: '/images/project-plumbing.png' },
  { title: 'Multi-Story Building Construction', category: 'CIVIL WORKS', img: '/images/project-construction.png' },
  { title: 'Rooftop HVAC System Setup', category: 'HVAC', img: '/images/project-hvac.png' },
  { title: 'Industrial Boiler Room', category: 'BOILER', img: '/images/project-boiler.png' },
  { title: 'Engineering Site Project', category: 'CIVIL WORKS', img: '/images/project-engineering.png' },
  { title: 'Copper Pipe Installation', category: 'PLUMBING', img: '/images/project-copper-pipes.png' },
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
      <section className="pb-20">
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
    </Layout>
  );
}
