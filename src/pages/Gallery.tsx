import { useState, useEffect, useMemo } from 'react';
import SEO from '@/components/SEO';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';

type Category =
  | 'All'
  | 'Plumbing'
  | 'Civil Works'
  | 'Heating'
  | 'Ventilation & AC'
  | 'Boilers'
  | 'Water Treatment'
  | 'Commercial Equipment';

interface GalleryImage {
  src: string;
  category: Exclude<Category, 'All'>;
  title: string;
}

const base = '/images/Gallery/';

const images: GalleryImage[] = [
  // Civil Works — outdoor pipe networks, trenches, excavation
  { src: `${base}gallery 1.jpeg`, category: 'Civil Works', title: 'Drainage Pipe Installation' },
  { src: `${base}gallery 2.jpeg`, category: 'Civil Works', title: 'Foundation Pipework' },
  { src: `${base}gallery 3.jpeg`, category: 'Civil Works', title: 'Underground Drainage System' },
  { src: `${base}gallery 5.jpeg`, category: 'Civil Works', title: 'Pipe Levelling On Site' },
  { src: `${base}gallery 21.jpeg`, category: 'Civil Works', title: 'Construction Site Pipework' },
  { src: `${base}gallery 54.jpeg`, category: 'Civil Works', title: 'Excavation Works' },
  { src: `${base}gallery 55.jpeg`, category: 'Civil Works', title: 'HDPE Pipe Network Laying' },

  // Plumbing — indoor pipework, fixtures, copper, bathroom
  { src: `${base}gallery 4.jpeg`, category: 'Plumbing', title: 'Wall-Mounted Pipework' },
  { src: `${base}gallery 7.jpeg`, category: 'Plumbing', title: 'Overhead Service Corridor' },
  { src: `${base}gallery 13.jpeg`, category: 'Plumbing', title: 'Commercial Kitchen Gas Lines' },
  { src: `${base}gallery 17.jpeg`, category: 'Plumbing', title: 'Copper Pipe Brazing' },
  { src: `${base}gallery 18.jpeg`, category: 'Plumbing', title: 'Copper Pipe Soldering' },
  { src: `${base}gallery 19.jpeg`, category: 'Plumbing', title: 'Wall Fixture Installation' },
  { src: `${base}gallery 20.jpeg`, category: 'Plumbing', title: 'Bathroom Installation' },
  { src: `${base}gallery 22.jpeg`, category: 'Plumbing', title: 'Pipework Rough-In' },
  { src: `${base}gallery 23.jpeg`, category: 'Plumbing', title: 'Bathroom Pipe Rough-In' },
  { src: `${base}gallery 24.jpeg`, category: 'Plumbing', title: 'Wall Pipework' },
  { src: `${base}gallery 25.jpeg`, category: 'Plumbing', title: 'Sink Installation' },
  { src: `${base}gallery 26.jpeg`, category: 'Plumbing', title: 'Wall-Mounted Basin' },

  // Heating
  { src: `${base}gallery 11.jpeg`, category: 'Heating', title: 'Heating Pipework On Ceiling' },
  { src: `${base}gallery 12.jpeg`, category: 'Heating', title: 'Heating Manifold Installation' },
  { src: `${base}gallery 51.jpeg`, category: 'Heating', title: 'Copper Heating Pipework' },

  // Ventilation & AC
  { src: `${base}gallery 27.jpeg`, category: 'Ventilation & AC', title: 'Ductwork Installation' },
  { src: `${base}gallery 28.jpeg`, category: 'Ventilation & AC', title: 'Roof Ventilation Ductwork' },
  { src: `${base}gallery 29.jpeg`, category: 'Ventilation & AC', title: 'Round Duct Assembly' },
  { src: `${base}gallery 30.jpeg`, category: 'Ventilation & AC', title: 'Insulated Ductwork Install' },
  { src: `${base}gallery 31.jpeg`, category: 'Ventilation & AC', title: 'Duct Component Fitting' },
  { src: `${base}gallery 32.jpeg`, category: 'Ventilation & AC', title: 'Spiral Duct Network' },
  { src: `${base}gallery 33.jpeg`, category: 'Ventilation & AC', title: 'Roof Vent Stack' },
  { src: `${base}gallery 34.jpeg`, category: 'Ventilation & AC', title: 'Duct Elbow Components' },
  { src: `${base}gallery 35.jpeg`, category: 'Ventilation & AC', title: 'AC Outdoor Unit Servicing' },
  { src: `${base}gallery 36.jpeg`, category: 'Ventilation & AC', title: 'AC Compressor Install' },
  { src: `${base}gallery 37.jpeg`, category: 'Ventilation & AC', title: 'AC Manifold Gauge Test' },
  { src: `${base}gallery 38.jpeg`, category: 'Ventilation & AC', title: 'AC Vacuum Pump Setup' },
  { src: `${base}gallery 39.jpeg`, category: 'Ventilation & AC', title: 'Wall AC Installation' },
  { src: `${base}gallery 40.jpeg`, category: 'Ventilation & AC', title: 'Indoor AC Unit Install' },
  { src: `${base}gallery 41.jpeg`, category: 'Ventilation & AC', title: 'Daikin AC Commissioning' },
  { src: `${base}gallery 42.jpeg`, category: 'Ventilation & AC', title: 'Insulated Ceiling Ducts' },
  { src: `${base}gallery 44.jpeg`, category: 'Ventilation & AC', title: 'AHU Connection Ducts' },
  { src: `${base}gallery 45.jpeg`, category: 'Ventilation & AC', title: 'Insulated AHU Ducts' },
  { src: `${base}gallery 47.jpeg`, category: 'Ventilation & AC', title: 'Ductwork Team Install' },
  { src: `${base}gallery 48.jpeg`, category: 'Ventilation & AC', title: 'Air Handling Unit' },
  { src: `${base}gallery 49.jpeg`, category: 'Ventilation & AC', title: 'Ceiling Cassette AC Service' },

  // Boilers
  { src: `${base}gallery 50.jpeg`, category: 'Boilers', title: 'Twin Boiler Installation' },
  { src: `${base}gallery 52.jpeg`, category: 'Boilers', title: 'Water Heater Plant Room' },
  { src: `${base}gallery 53.jpeg`, category: 'Boilers', title: 'Triple Boiler System' },

  // Water Treatment & Pumps
  { src: `${base}gallery 8.jpeg`, category: 'Water Treatment', title: 'Water Treatment Manifold' },
  { src: `${base}gallery 9.jpeg`, category: 'Water Treatment', title: 'Pool Filtration System' },
  { src: `${base}gallery 10.jpeg`, category: 'Water Treatment', title: 'Reverse Osmosis Plant' },
  { src: `${base}gallery 56.jpeg`, category: 'Water Treatment', title: 'Sand Filter Tank' },
  { src: `${base}gallery 57.jpeg`, category: 'Water Treatment', title: 'Pool Pump Plumbing' },
  { src: `${base}gallery 58.jpeg`, category: 'Water Treatment', title: 'Grundfos Pump Array' },
  { src: `${base}gallery 60.jpeg`, category: 'Water Treatment', title: 'RO Treatment Plant' },
  { src: `${base}gallery 61.jpeg`, category: 'Water Treatment', title: 'Pump Station Install' },

  // Commercial Equipment
  { src: `${base}gallery 14.jpeg`, category: 'Commercial Equipment', title: 'Industrial Kitchen Setup' },
  { src: `${base}gallery 15.jpeg`, category: 'Commercial Equipment', title: 'Commercial Stainless Sinks' },
  { src: `${base}gallery 16.jpeg`, category: 'Commercial Equipment', title: 'Commercial Laundry Install' },
];

const categories: Category[] = [
  'All',
  'Plumbing',
  'Civil Works',
  'Heating',
  'Ventilation & AC',
  'Boilers',
  'Water Treatment',
  'Commercial Equipment',
];

const categoryColors: Record<Exclude<Category, 'All'>, string> = {
  Plumbing: 'text-blue-600',
  'Civil Works': 'text-amber-600',
  Heating: 'text-orange-600',
  'Ventilation & AC': 'text-teal-600',
  Boilers: 'text-red-600',
  'Water Treatment': 'text-cyan-600',
  'Commercial Equipment': 'text-purple-600',
};

export default function Gallery() {
  const [active, setActive] = useState<Category>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === 'All' ? images : images.filter((img) => img.category === active)),
    [active]
  );

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [active]);

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const galleryJsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Acquans Ventures Photo Gallery',
        description:
          "Photo gallery of Acquans Ventures' completed plumbing, civil, heating, ventilation, boiler, and water treatment installations.",
        url: 'https://acquansventures.com/gallery',
        image: images.map((img) => ({
          '@type': 'ImageObject',
          contentUrl: `https://acquansventures.com${img.src}`,
          name: img.title,
          description: `${img.title} — ${img.category}`,
        })),
      }),
    []
  );

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'gallery-jsonld';
    script.textContent = galleryJsonLd;
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById('gallery-jsonld');
      if (existing) existing.remove();
    };
  }, [galleryJsonLd]);

  return (
    <Layout>
      <SEO title="Gallery" />
      {/* Page Header */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="section-label">Our Work</p>
          <h1 className="section-title mb-4">Photo Gallery</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A visual record of installations and projects we've delivered — plumbing, civil works,
            heating, ventilation, boilers, water treatment, and commercial equipment.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const count =
                cat === 'All' ? images.length : images.filter((i) => i.category === cat).length;
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat} <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((img, idx) => (
              <button
                key={img.src}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-lg overflow-hidden bg-gray-100 aspect-square focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`View ${img.title}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  width={400}
                  height={400}
                  loading={idx < 8 ? 'eager' : 'lazy'}
                  fetchPriority={idx < 4 ? 'high' : 'auto'}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className={`text-[10px] font-bold tracking-wider ${categoryColors[img.category]} bg-white/90 inline-block px-2 py-0.5 rounded`}>
                    {img.category.toUpperCase()}
                  </p>
                  <p className="text-white text-sm font-semibold mt-1 drop-shadow">{img.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {current && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/40 hover:bg-black/60 rounded-full p-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/40 hover:bg-black/60 rounded-full p-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div
            className="max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img loading="lazy"
              src={current.src}
              alt={current.title}
              className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className={`text-xs font-bold tracking-wider ${categoryColors[current.category]} bg-white inline-block px-2 py-0.5 rounded`}>
                {current.category.toUpperCase()}
              </p>
              <p className="text-white text-lg font-semibold mt-2">{current.title}</p>
              <p className="text-gray-400 text-xs mt-1">
                {lightboxIndex + 1} of {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
