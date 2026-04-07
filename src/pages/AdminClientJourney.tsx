import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Clock, AlertCircle, 
  Mail, Phone, Calendar, Briefcase, Users,
  MapPin, MessageSquare, Heart, Filter, 
  ChevronRight, ExternalLink, ShieldCheck, Loader2, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, collection, query, orderBy, getDocs, setDoc } from 'firebase/firestore';
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

  useEffect(() => {
    fetchQuoteData();
    fetchStaff();
  }, [id]);

  const fetchQuoteData = async () => {
    if (!id) return;
    try {
      const quoteRef = doc(db, 'quotes', id);
      const quoteSnap = await getDoc(quoteRef);
      if (quoteSnap.exists()) {
        setQuote({ id: quoteSnap.id, ...quoteSnap.data() } as Quote);
      }
    } catch (err) {
      console.error('Error fetching quote:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const q = query(collection(db, 'profiles'), orderBy('full_name'));
      const querySnapshot = await getDocs(q);
      const fetchedStaff = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Staff))
        .filter((s: any) => s.role === 'admin' || s.role === 'staff');
      setStaffList(fetchedStaff);
    } catch (err) {
      console.error('Error fetching staff:', err);
    }
  };

  const updateQuoteStatus = async (status: Quote['status']) => {
    if (!id || !quote) return;
    try {
      const quoteRef = doc(db, 'quotes', id);
      await updateDoc(quoteRef, { status });
      setQuote({ ...quote, status });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const assignQuote = async (staff: Staff) => {
    if (!id || !quote) return;
    try {
      const quoteRef = doc(db, 'quotes', id);
      await updateDoc(quoteRef, { 
        assigned_to: staff.id,
        assigned_name: staff.full_name 
      });
      setQuote({ ...quote, assigned_to: staff.id, assigned_name: staff.full_name });
    } catch (err) {
      console.error('Error assigning quote:', err);
    }
  };

  const updateProjectProgress = async (progress: number) => {
    if (!id || !quote) return;
    try {
      const quoteRef = doc(db, 'quotes', id);
      await updateDoc(quoteRef, { 
        manual_progress: progress,
        last_progress_update: new Date().toISOString()
      });
      setQuote({ ...quote, manual_progress: progress });
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const updateProjectLocation = async (location: string) => {
    if (!id || !quote) return;
    try {
      const quoteRef = doc(db, 'quotes', id);
      await updateDoc(quoteRef, { location });
      setQuote({ ...quote, location });
    } catch (err) {
      console.error('Error updating location:', err);
    }
  };

  const sendMessageToClient = async (message: string) => {
    if (!id || !quote || !quote.client_id || !message.trim()) return;
    try {
      const messageData = {
        quote_id: id,
        receiver_id: quote.client_id,
        sender_id: auth.currentUser?.uid,
        sender_name: 'Acquans Ventures Admin',
        content: message,
        timestamp: new Date().toISOString(),
        is_read: false
      };
      
      const messagesRef = collection(db, 'messages');
      await setDoc(doc(messagesRef), messageData);
      alert('Message sent to client!');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message');
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'No Date';
    if (timestamp.toDate) return timestamp.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (err) { return 'Invalid Date'; }
  };

  if (loading) {
    return (
      <Layout>
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
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Journey Header */}
        <div className="bg-white border-b border-slate-200 sticky top-[72px] z-40">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/admin-dashboard')}
                  className="p-3 bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-2xl font-bold text-slate-900">{quote.name}</h1>
                      <StatusBadge status={quote.status} />
                   </div>
                   <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(quote.created_at)}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {quote.service}</span>
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <a href={`mailto:${quote.email}`} className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:border-primary hover:text-primary transition-all shadow-sm">
                    <Mail className="w-5 h-5" />
                 </a>
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

        <main className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Progress & Management */}
            <div className="lg:col-span-2 space-y-8">
              {/* Client Journey Visualizer */}
              <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                       <Clock className="w-5 h-5 text-primary" /> Lifecycle Management
                    </h2>
                    <span className="text-xs font-black text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full">Stage: {(quote.status || 'pending').replace('_', ' ')}</span>
                </div>

                <div className="relative mb-12">
                   <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2" />
                   <div 
                      className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-700" 
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
                   <div className="relative flex justify-between">
                      {['pending', 'in_review', 'contacted', 'quoted', 'negotiating', 'converted', 'completed'].map((stage, i) => (
                        <div key={stage} className="flex flex-col items-center gap-3">
                           <div className={`w-10 h-10 rounded-full border-4 ${
                             quote.status === stage || isAfter(quote.status || 'pending', stage) ? 'bg-primary border-primary/20 text-white' : 'bg-white border-slate-100 text-slate-300'
                           } flex items-center justify-center transition-all z-10 shadow-lg`}>
                              <CheckCircle2 className="w-5 h-5" />
                           </div>
                           <span className={`text-[10px] font-bold uppercase tracking-tighter ${quote.status === stage ? 'text-primary' : 'text-slate-400'}`}>
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
              </section>

              {/* Execution Progress Center */}
              <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                       <Briefcase className="w-5 h-5 text-primary" /> Execution Center
                    </h2>
                    <div className="text-right">
                       <p className="text-xs text-slate-400 font-bold uppercase">Manual Progress</p>
                       <p className="text-3xl font-black text-primary leading-none">{quote.manual_progress || 0}%</p>
                    </div>
                 </div>

                 <div className="bg-slate-50 p-6 rounded-[24px] mb-8 border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-sm font-bold text-slate-600">Slide to Update Job Status</span>
                       <span className="text-xs text-primary font-black bg-white px-3 py-1 rounded-lg border border-primary/10">Real-time sync</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={quote.manual_progress || 0}
                      onChange={(e) => updateProjectProgress(parseInt(e.target.value))}
                      className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <span>Startup</span>
                       <span>Final Delivery</span>
                    </div>
                 </div>

                 <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-4 flex items-center gap-2">
                       <MessageSquare className="w-4 h-4" /> Client Communication Hub (Dashboard Message)
                    </p>
                    <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-[24px] p-6">
                       <textarea 
                          id="client-msg-area"
                          className="w-full p-4 bg-white border border-emerald-100 rounded-2xl outline-none focus:border-emerald-500 transition-all text-sm min-h-[120px] shadow-sm mb-4"
                          placeholder="Type a message that will appear on this client's portal..."
                       />
                       <div className="flex items-center justify-between">
                          <p className="text-[10px] text-emerald-600/60 font-medium italic max-w-xs">
                             Messages sent here go directly to the 'Updates' section of the client's private dashboard.
                          </p>
                          <button 
                            onClick={() => {
                              const textarea = document.getElementById('client-msg-area') as HTMLTextAreaElement;
                              if (textarea && quote.client_id) {
                                sendMessageToClient(textarea.value);
                                textarea.value = '';
                              } else {
                                alert('This lead has no registered client account yet. Create one from the Dashboard first!');
                              }
                            }}
                            className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all text-xs flex items-center gap-2 shadow-lg shadow-emerald-100"
                          >
                            <Mail className="w-4 h-4" /> Post Update
                          </button>
                       </div>
                    </div>
                 </div>
              </section>
            </div>

            {/* Right Column: Key Details */}
            <div className="space-y-8">
              {/* Site Details */}
              <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> Site & Logistics
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase block mb-2">Project Location</label>
                    <div className="relative">
                       <input 
                          type="text" 
                          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter site address..."
                          defaultValue={quote.location || ""}
                          onBlur={(e) => updateProjectLocation(e.target.value)}
                       />
                       <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <label className="text-xs text-slate-400 font-bold uppercase block mb-2">Service Required</label>
                    <p className="text-slate-900 font-bold flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" /> {quote.service}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase block mb-2">Internal Management</label>
                    <select 
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
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
              </section>

              {/* Inquiry Details */}
              <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" /> Initial Request
                </h3>
                <div className="bg-slate-50 p-6 rounded-2xl text-slate-600 text-sm leading-relaxed border border-slate-100 italic">
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
    suspended: 'bg-gray-100 text-gray-400 border-gray-200'
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
