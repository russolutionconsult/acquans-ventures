import SEO from '@/components/SEO';
import { useState } from 'react';
import { Phone, MapPin, Mail, Send, CheckCircle, ChevronDown, Instagram, Facebook, Linkedin } from 'lucide-react';
import Layout from '@/components/Layout';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rfqNumber, setRfqNumber] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.from('quotes').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        status: 'pending',
        created_at: new Date().toISOString()
      }).select().single();

      if (error) throw error;

      if (data) {
        setRfqNumber(`AQ-RFQ-${data.id.slice(0, 8).toUpperCase()}`);
      }

      // Send Email Notification
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'contact', data: formData })
        });
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr);
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
        setRfqNumber('');
      }, 7000);
    } catch (err) {
      console.error('Error submitting quote:', err);
      alert('Failed to send message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO title="Contact Us" />
      {/* Hero */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy"
            src="/images/project-construction.png"
            alt="Contact Acquans Ventures"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/75 to-primary/40" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Contact Us
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto">
            Ready to start your project? Get in touch and we'll respond promptly.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Form — takes 3 cols */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Kwame Mensah"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="024 123 4567"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="kwame@email.com"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-foreground mb-2">
                    Select a Service
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-gray-50 text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="" disabled>Choose a service...</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Plumbing Works">Plumbing Works</option>
                      <option value="Civil Works">Civil Works</option>
                      <option value="Heating Systems">Heating Systems</option>
                      <option value="Ventilation & AC">Ventilation & Air-Conditioning</option>
                      <option value="Boiler Installations">Boiler Installations</option>
                      <option value="Apprenticeship & Training">Apprenticeship & Training</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Choice not listed">Choice not listed</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={5}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all resize-vertical"
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3.5 text-base rounded-xl">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </button>

                {submitted && (
                  <div className="flex flex-col items-center justify-center gap-2 text-sm text-green-600 font-medium animate-fade-in bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 shrink-0" />
                      <span>Thank you! Your message has been sent successfully.</span>
                    </div>
                    {rfqNumber && (
                      <div className="mt-2 text-xs text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-lg inline-block font-black tracking-wide">
                        RFQ Reference: <span className="text-primary select-all">{rfqNumber}</span>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info — takes 2 cols */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="flex flex-col gap-4">
                <a
                  href="tel:0244425035"
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone</p>
                    <p className="font-bold text-foreground">0244425035</p>
                  </div>
                </a>

                <a
                  href="tel:0543861162"
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone</p>
                    <p className="font-bold text-foreground">0543861162</p>
                  </div>
                </a>

                <a
                  href="tel:0506624555"
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone</p>
                    <p className="font-bold text-foreground">0506624555</p>
                  </div>
                </a>

                <a
                  href="https://maps.app.goo.gl/ciNGa9cqHqrn2MXA6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Location</p>
                    <p className="font-bold text-foreground">Get Direction</p>
                  </div>
                </a>

                <a
                  href="mailto:info@acquansventures.com"
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:shadow-md transition-shadow mb-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email</p>
                    <p className="font-bold text-foreground">info@acquansventures.com</p>
                  </div>
                </a>

                {/* Social Links */}
                <h3 className="text-lg font-bold text-foreground mb-4">Follow Us</h3>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-border bg-white flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary hover:shadow-md transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/p/DYPp4TAiLd9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-border bg-white flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary hover:shadow-md transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@acquans_ventures"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-border bg-white flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary hover:shadow-md transition-all"
                    aria-label="TikTok"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 448 512" 
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-border bg-white flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary hover:shadow-md transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
