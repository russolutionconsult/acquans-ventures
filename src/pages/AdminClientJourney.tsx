import SEO from '@/components/SEO';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, Clock, AlertCircle,
  Mail, Phone, Calendar, Briefcase, Users,
  MapPin, MessageSquare, Heart, Filter,
  ShieldCheck, Loader2, FileText, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'pending' | 'reviewed' | 'in_review' | 'contacted' | 'quoted' | 'negotiating' | 'converted' | 'completed' | 'lost' | 'suspended';
  assigned_to?: string;
  assigned_name?: string;
  client_id?: string;
  manual_progress?: number;
  project_info?: string;
  location?: string;
  created_at: any;
}

interface Staff {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

export default function AdminClientJourney() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    init();
    fetchQuoteData();
    fetchStaff();
  }, [id]);

  const fetchQuoteData = async () => {
    if (!id) return;
    try {
      const { data: quoteData, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (quoteData) {
        setQuote(quoteData as Quote);
      }
    } catch (err) {
      console.error('Error fetching quote:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['admin', 'staff', 'project_team'])
        .order('full_name');
      if (error) throw error;
      setStaffList((data || []) as Staff[]);
    } catch (err) {
      console.error('Error fetching staff:', err);
    }
  };

  const updateQuoteStatus = async (status: Quote['status']) => {
    if (!id || !quote) return;
    try {
      const { error } = await supabase.from('quotes').update({ status }).eq('id', id);
      if (error) throw error;
      setQuote({ ...quote, status });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const assignQuote = async (staff: Staff) => {
    if (!id || !quote) return;
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ assigned_to: staff.id, assigned_name: staff.full_name })
        .eq('id', id);
      if (error) throw error;
      setQuote({ ...quote, assigned_to: staff.id, assigned_name: staff.full_name });
    } catch (err) {
      console.error('Error assigning quote:', err);
    }
  };

  const updateProjectProgress = async (progress: number) => {
    if (!id || !quote) return;
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ manual_progress: progress, last_progress_update: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      setQuote({ ...quote, manual_progress: progress });
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const updateProjectLocation = async (location: string) => {
    if (!id || !quote) return;
    try {
      const { error } = await supabase.from('quotes').update({ location }).eq('id', id);
      if (error) throw error;
      setQuote({ ...quote, location });
    } catch (err) {
      console.error('Error updating location:', err);
    }
  };



  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'No Date';
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (err) { return 'Invalid Date'; }
  };

  if (loading) {
    return (
      <Layout>
      <SEO title="Admin - Client Journey" />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!quote) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
          <AlertCircle className="w-16 h-16 text-gray-200 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quote Not Found</h1>
          <p className="text-gray-500 mb-8">This inquiry might have been deleted or doesn't exist.</p>
          <Link to="/admin-dashboard" className="btn-primary">Back to Dashboard</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#F1F5F9] relative overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        {/* Journey Header */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 relative z-40">
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/admin-dashboard')}
                  className="p-3.5 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl transition-all shadow-lg shadow-blue-600/30"
                >
                  <ArrowLeft className="w-6 h-6 stroke-[3]" />
                </button>
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-2xl font-bold text-slate-900">{quote.name}</h1>
                      <StatusBadge status={quote.status} />
                   </div>
                   <div className="flex items-center gap-4 text-sm text-slate-900 font-black">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {formatDate(quote.created_at)}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-primary" /> {quote.service}</span>
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <Link to={`/messages/${id}`} className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:border-primary hover:text-primary transition-all shadow-sm" title="Project Messaging">
                    <Mail className="w-5 h-5" />
                 </Link>
                 <a href={`tel:${quote.phone}`} className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:border-primary hover:text-primary transition-all shadow-sm">
                    <Phone className="w-5 h-5" />
                 </a>
                 <div className="h-10 w-px bg-slate-100 mx-2" />
                 <button
                   onClick={() => navigate('/admin-dashboard')}
                   className="btn-primary px-8"
                 >
                   Save & Close
                 </button>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 lg:px-8 pb-10 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Progress & Management */}
            <div className="lg:col-span-2 space-y-8">
              {/* Client Journey Visualizer */}
              <section className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(37,99,235,0.15)] border-2 border-blue-500 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 p-8 flex items-center justify-between">
                    <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-wider">
                       <Clock className="w-6 h-6 text-blue-200" /> Lifecycle Management
                    </h2>
                    <span className="text-xs font-black text-white uppercase bg-white/30 px-6 py-2 rounded-full border border-white/40 backdrop-blur-xl">Stage: {(quote.status || 'pending').replace('_', ' ')}</span>
                </div>

                <div className="p-8 bg-blue-50/20">
                  <div className="relative mb-12">
                    {/* Desktop Connector Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden md:block" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-700 hidden md:block"
                        style={{
                          width: (
                            !quote.status || quote.status === 'pending' || quote.status === 'reviewed' ? '12.5%' :
                            quote.status === 'in_review' ? '25%' :
                            quote.status === 'contacted' ? '37.5%' :
                            quote.status === 'quoted' ? '50%' :
                            quote.status === 'negotiating' ? '62.5%' :
                            quote.status === 'converted' ? '75%' :
                            quote.status === 'completed' ? '100%' : '0%'
                          )
                        }}
                    />
                    
                    {/* Status Steps */}
                    <div className="relative grid grid-cols-2 sm:grid-cols-4 md:flex md:justify-between gap-6 md:gap-0">
                        {['pending', 'in_review', 'contacted', 'quoted', 'negotiating', 'converted', 'completed'].map((stage, i) => (
                          <div key={stage} className="flex flex-col items-center gap-3">
                            <div className={`w-10 h-10 rounded-full border-4 ${
                              quote.status === stage || isAfter(quote.status || 'pending', stage) ? 'bg-primary border-primary/20 text-white' : 'bg-white border-slate-100 text-slate-300'
                            } flex items-center justify-center transition-all z-10 shadow-lg`}>
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest text-center ${quote.status === stage ? 'text-blue-800' : 'text-slate-900'}`}>
                                {stage.replace('_', ' ')}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <StageButton active={quote.status === 'in_review'} onClick={() => updateQuoteStatus('in_review')} icon={Filter} label="Review Request" color="blue" />
                    <StageButton active={quote.status === 'contacted'} onClick={() => updateQuoteStatus('contacted')} icon={Phone} label="Call Made" color="purple" />
                    <StageButton active={quote.status === 'quoted'} onClick={() => updateQuoteStatus('quoted')} icon={FileText} label="Invoice Sent" color="amber" />
                    <StageButton active={quote.status === 'negotiating'} onClick={() => updateQuoteStatus('negotiating')} icon={Users} label="Negotiating" color="orange" />
                    <StageButton active={quote.status === 'converted'} onClick={() => updateQuoteStatus('converted')} icon={Heart} label="Client Signed" color="pink" />
                    <StageButton active={quote.status === 'completed'} onClick={() => updateQuoteStatus('completed')} icon={CheckCircle2} label="Job Done" color="emerald" />
                  </div>
                </div>
              </section>

              {/* Execution Progress Center */}
              <section className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(16,185,129,0.15)] border-2 border-emerald-500 overflow-hidden">
                 <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-800 p-8 flex items-center justify-between">
                    <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-wider">
                       <Briefcase className="w-6 h-6 text-emerald-200" /> Execution Center
                    </h2>
                    <div className="text-right">
                       <p className="text-xs text-white/70 font-bold uppercase tracking-widest">Manual Progress</p>
                       <p className="text-4xl font-black text-white leading-none drop-shadow-md">{quote.manual_progress || 0}%</p>
                    </div>
                 </div>

                 <div className="p-8 bg-emerald-50/20">
                  <div className="bg-slate-50 p-6 rounded-[24px] mb-8 border border-slate-100">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-black text-slate-900">Slide to Update Job Status</span>
                        <span className="text-xs text-primary font-black bg-white px-3 py-1 rounded-lg border border-primary/10">Real-time sync</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={quote.manual_progress || 0}
                        onChange={(e) => updateProjectProgress(parseInt(e.target.value))}
                        className="w-full h-4 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #10B981 ${quote.manual_progress || 0}%, #E2E8F0 ${quote.manual_progress || 0}%)`
                        }}
                      />
                      <style dangerouslySetInnerHTML={{ __html: `
                         input[type=range]::-webkit-slider-thumb {
                           -webkit-appearance: none;
                           height: 24px;
                           width: 24px;
                           border-radius: 50%;
                           background: #2563EB;
                           cursor: pointer;
                           border: 3px solid white;
                           box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                         }
                         input[type=range]::-moz-range-thumb {
                           height: 24px;
                           width: 24px;
                           border-radius: 50%;
                           background: #2563EB;
                           cursor: pointer;
                           border: 3px solid white;
                           box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                         }
                      `}} />
                      <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Startup</span>
                        <span>Final Delivery</span>
                      </div>
                  </div>

                  <div>
                      <p className="text-xs text-slate-900 font-black uppercase mb-4 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" /> Client Communication Hub
                      </p>

                      <Link
                        to={`/messages/${id}`}
                        className="group flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[24px] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <MessageSquare className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-black text-base uppercase tracking-wide">Open Communication Hub</p>
                            <p className="text-blue-200 text-xs font-bold mt-0.5">Real-time messaging with client · Supports files &amp; images</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 group-hover:bg-white/30 px-5 py-2.5 rounded-2xl transition-all">
                          <span className="text-white text-xs font-black uppercase tracking-widest">Open</span>
                          <ExternalLink className="w-4 h-4 text-white" />
                        </div>
                      </Link>

                      <p className="text-[10px] text-slate-400 italic mt-3 text-center font-medium">
                        All messages are project-specific and visible to both admin and client.
                      </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Key Details */}
            <div className="space-y-8">
              {/* Site Details */}
              <section className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(139,92,246,0.15)] border-2 border-violet-500 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-700 via-violet-600 to-purple-800 p-8">
                  <h3 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-widest">
                    <MapPin className="w-6 h-6 text-violet-200" /> Site & Logistics
                  </h3>
                </div>

                <div className="p-8 bg-violet-50/20">
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs text-slate-900 font-black uppercase block mb-2">Project Location</label>
                      <div className="relative">
                        <input
                            type="text"
                            className="w-full p-4 bg-white border-2 border-slate-900 rounded-2xl font-black text-black outline-none focus:ring-4 focus:ring-primary/20"
                            placeholder="Enter site address..."
                            defaultValue={quote.location || ""}
                            onBlur={(e) => updateProjectLocation(e.target.value)}
                        />
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border-2 border-slate-900 shadow-sm">
                      <label className="text-xs text-slate-900 font-black uppercase block mb-2">Service Required</label>
                      <p className="text-black font-black flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" /> {quote.service}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs text-slate-900 font-black uppercase block mb-2">Internal Management</label>
                      <select
                        className="w-full p-4 bg-white border-2 border-slate-900 rounded-2xl font-black text-black outline-none focus:ring-4 focus:ring-primary/20 appearance-none"
                        value={quote.assigned_to || ""}
                        onChange={(e) => {
                          const staff = staffList.find(s => s.id === e.target.value);
                          if (staff) assignQuote(staff);
                        }}
                      >
                        <option value="">Unassigned</option>
                        {staffList.map(staff => (
                          <option key={staff.id} value={staff.id}>{staff.full_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Inquiry Details */}
              <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" /> Initial Request
                </h3>
                <div className="bg-white p-6 rounded-2xl text-black font-black text-sm leading-relaxed border-2 border-slate-900 shadow-sm italic">
                  "{quote.message}"
                </div>
              </section>

              {/* Risk Tools */}
              <section className="bg-red-50/50 rounded-[32px] p-8 border border-red-100">
                 <h3 className="font-bold text-red-700 mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> Danger Zone
                 </h3>
                 <div className="flex gap-4">
                    <button
                      onClick={() => updateQuoteStatus('lost')}
                      className={`flex-1 py-3 text-xs font-bold rounded-xl border-2 transition-all ${
                        quote.status === 'lost' ? 'bg-red-600 border-red-600 text-white' : 'border-red-100 text-red-600 hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      Lost Lead
                    </button>
                    <button
                      onClick={() => updateQuoteStatus('suspended')}
                      className={`flex-1 py-3 text-xs font-bold rounded-xl border-2 transition-all ${
                        quote.status === 'suspended' ? 'bg-slate-600 border-slate-600 text-white' : 'border-red-100 text-slate-400 hover:bg-slate-600 hover:text-white'
                      }`}
                    >
                      Archive
                    </button>
                 </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

function StageButton({ active, icon: Icon, label, color, onClick }: any) {
  const colors: any = {
    blue: active ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    purple: active ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    amber: active ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-600 hover:bg-amber-100',
    orange: active ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    pink: active ? 'bg-pink-600 text-white' : 'bg-pink-50 text-pink-600 hover:bg-pink-100',
    emerald: active ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${colors[color]}`}
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}

function StatusBadge({ status }: { status: any }) {
  const styles: any = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    reviewed: 'bg-blue-100 text-blue-700 border-blue-200',
    in_review: 'bg-blue-100 text-blue-700 border-blue-200',
    contacted: 'bg-purple-100 text-purple-700 border-purple-200',
    quoted: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    negotiating: 'bg-orange-100 text-orange-700 border-orange-200',
    converted: 'bg-pink-100 text-pink-700 border-pink-200',
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    lost: 'bg-red-100 text-red-700 border-red-200',
    suspended: 'bg-gray-100 text-gray-400 border-gray-200 shadow-none grayscale'
  };

  const currentStatus = status || 'pending';
  const currentStyle = styles[currentStatus] || styles.pending;

  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${currentStyle}`}>
      {currentStatus.replace('_', ' ')}
    </span>
  );
}

function isAfter(currentStatus: string, stage: string) {
  const order = ['pending', 'in_review', 'contacted', 'quoted', 'negotiating', 'converted', 'completed'];
  return order.indexOf(currentStatus) > order.indexOf(stage);
}
