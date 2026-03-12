import { BookOpen, ArrowRight, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of HVAC Systems in Commercial Buildings',
    excerpt: 'Explore how smart technology and energy efficiency are revolutionizing modern HVAC installations across Ghana and West Africa.',
    date: 'March 15, 2026',
    author: 'Kwame Mensah',
    category: 'HVAC',
    image: '/images/hvac.png'
  },
  {
    id: 2,
    title: 'Preventative Maintenance for Industrial Boilers',
    excerpt: 'A comprehensive guide to extending the lifespan of your boiler systems and preventing costly down-times in your facility.',
    date: 'March 02, 2026',
    author: 'Ama Osei',
    category: 'Maintenance',
    image: '/images/boiler.png'
  },
  {
    id: 3,
    title: 'Choosing the Right Pipes for Large Scale Plumbing',
    excerpt: 'Copper vs. PEX vs. PVC: An engineering breakdown of materials for durable and safe commercial plumbing networks.',
    date: 'February 18, 2026',
    author: 'John Doe',
    category: 'Plumbing',
    image: '/images/plumbing.png'
  }
];

export default function Blog() {
  return (
    <Layout>
      {/* Hero Header */}
      <section className="bg-primary pt-24 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <BookOpen className="h-10 w-10 text-blue-300 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Our Insights & News
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Stay updated with the latest trends, expert guides, and technical advice from our engineering and installation professionals.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" /> {post.date}
                    </span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4 text-primary" /> {post.author}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                    <Link to="#">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="border-t border-border pt-4 mt-auto">
                    <Link 
                      to="#" 
                      className="inline-flex items-center text-sm font-bold text-primary hover:text-blue-700 transition-colors"
                    >
                      Read Article <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
