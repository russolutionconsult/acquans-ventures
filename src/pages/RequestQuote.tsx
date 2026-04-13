import { useState } from 'react';
import { Send, CheckCircle, ChevronDown, User, Mail, Phone, Briefcase, MessageSquare } from 'lucide-react';
import Layout from '@/components/Layout';
import { supabase } from '@/lib/supabase';

export default function RequestQuote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('quotes').insert({
        ...formData,
        status: 'pending',
        created_at: new Date().toISOString()
      });

      if (error) throw error;

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting quote:', err);
      alert('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/civil-engineering-rebar-foundation-construction-workers.png"
            alt="Request a Quote"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            <span className="text-primary">Request For</span> Quotation
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to build? Fill out the form below with your project requirements,
            and our technical experts will get back to you with a professional estimate.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border border-gray-100 -mt-24 sm:-mt-32 relative z-10">

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Request Received!</h2>
                  <p className="text-gray-500 text-lg mb-8">
                    Thank you for reaching out. A member of our technical team will review your project
                    details and contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary px-8 py-4"
                  >
                    View Our Other Services
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        <User className="w-4 h-4 text-primary" /> Full Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g Kwasi Mensah"
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        <Mail className="w-4 h-4 text-primary" /> Email Address
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="kwasi@email.com"
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        <Phone className="w-4 h-4 text-primary" /> Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+233 24 000 0000"
                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                      />
                    </div>

                    {/* Service Select */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        <Briefcase className="w-4 h-4 text-primary" /> Type of Service
                      </label>
                      <div className="relative">
                        <select
                          required
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none"
                        >
                          <option value="" disabled>Choose a service...</option>
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
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                      <MessageSquare className="w-4 h-4 text-primary" /> Project Details
                    </label>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project requirements, location, and any specific goals..."
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-primary hover:bg-primary-dark text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Request For Quotation'}
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
