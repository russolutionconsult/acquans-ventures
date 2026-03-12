import { Wrench, Clock, Users, Gem, ThumbsUp } from 'lucide-react';
import Layout from '@/components/Layout';

const advantages = [
  {
    icon: Wrench,
    title: 'Professional Workmanship',
    desc: 'Every project is executed with precision, following industry best practices and international standards to deliver flawless results.',
  },
  {
    icon: Clock,
    title: 'Reliable Service',
    desc: 'We deliver on time, every time. Our project management ensures deadlines are met without compromising on quality.',
  },
  {
    icon: Users,
    title: 'Skilled Technicians',
    desc: 'Our team comprises certified and experienced technicians who bring expertise and dedication to every installation.',
  },
  {
    icon: Gem,
    title: 'Quality Materials',
    desc: 'We source only premium-grade materials from trusted suppliers to ensure the longevity and performance of every installation.',
  },
  {
    icon: ThumbsUp,
    title: 'Customer Satisfaction',
    desc: 'Your satisfaction is our priority. We work closely with clients to understand their needs and exceed expectations.',
  },
];

export default function WhyChooseUs() {
  return (
    <Layout>
      {/* Page Header */}
      <section className="py-16 lg:py-20 section-alt">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="section-label">Why Choose Us</p>
          <h1 className="section-title">The Acquans Advantage</h1>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-20 section-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {advantages.slice(0, 3).map((a) => (
              <div key={a.title} className="card-hover">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <a.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{a.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {advantages.slice(3).map((a) => (
              <div key={a.title} className="card-hover">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <a.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{a.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
