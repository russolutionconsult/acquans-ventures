import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { ArrowLeft, User, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <Layout>
      <SEO title="Blog Post" />
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Blog Detail Hero */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-primary mb-8 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Insights
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-primary/10 text-primary text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 border-b border-slate-200 pb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{post.author}</p>
                    <p className="text-xs text-slate-400 font-bold">Engineering Specialist</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                  <Calendar className="h-4 w-4" /> {post.date}
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                  <Clock className="h-4 w-4" /> 7 min read
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-16 aspect-video"
            >
              <img loading="lazy" 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Article Text */}
            <div 
              className="prose prose-lg max-w-none prose-slate prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share & Footer */}
            <div className="mt-20 pt-10 border-t border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-4">Share this insight</h3>
                  <div className="flex items-center gap-3">
                    <button className="p-3 bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white rounded-2xl transition-all"><Facebook className="w-5 h-5" /></button>
                    <button className="p-3 bg-slate-50 text-slate-400 hover:bg-sky-500 hover:text-white rounded-2xl transition-all"><Twitter className="w-5 h-5" /></button>
                    <button className="p-3 bg-slate-50 text-slate-400 hover:bg-blue-700 hover:text-white rounded-2xl transition-all"><Linkedin className="w-5 h-5" /></button>
                    <button className="p-3 bg-slate-50 text-slate-400 hover:bg-primary hover:text-white rounded-2xl transition-all"><Share2 className="w-5 h-5" /></button>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-8 rounded-[2rem] max-w-md border border-slate-100">
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-2">Need professional help?</h4>
                  <p className="text-sm text-slate-500 mb-6 font-medium">Looking for engineering advice or a service quote for your next commercial project?</p>
                  <Link to="/request-quote" className="btn-primary w-full justify-center">Request For Quotation</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Posts */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-10">Read Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.filter(p => p.id !== id).slice(0, 2).map((suggested) => (
                <Link 
                  key={suggested.id} 
                  to={`/blog/${suggested.id}`}
                  className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">{suggested.category}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2 mb-3 group-hover:text-primary transition-colors">{suggested.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{suggested.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
