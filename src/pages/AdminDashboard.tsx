import SEO from '@/components/SEO';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3, Users, MessageSquare, Search, Filter,
  MoreVertical, CheckCircle2, Clock, AlertCircle, LogOut,
  Mail, Phone, Calendar, Briefcase, ChevronRight, UserPlus,
  Loader2, ExternalLink, Heart, MapPin, FileText, Menu, X, BookOpen, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  created_at: any;
  manual_progress?: number;
  project_info?: string;
  location?: string;
  client_id?: string;
  amount?: number | string;
}

interface Staff {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'quotes' | 'clients' | 'projects' | 'team' | 'guide'>('overview');
  const [clients, setClients] = useState<any[]>([]);
  const [showCreateClient, setShowCreateClient] = useState(false);
  const [clientData, setClientData] = useState({ name: '', email: '', password: '', amount: '', selectedQuoteId: '' });
  const [clientLoading, setClientLoading] = useState(false);
  const [clientStatus, setClientStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [activeTab]);

  useEffect(() => {
    fetchQuotes();
    fetchStaff();
    fetchClients();

    // Listen for recent client replies to admin
    const setupRealtime = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fetchAllMessages = async () => {
        // Fetch from both messages and project_messages tables
        const [directMsgs, projectMsgs] = await Promise.all([
          supabase
            .from('messages')
            .select('*')
            .eq('receiver_id', user.id)
            .order('timestamp', { ascending: false })
            .limit(5),
          supabase
            .from('project_messages')
            .select('*')
            .neq('id_from', user.id)
            .order('timestamp', { ascending: false })
            .limit(5)
        ]);

        const combined = [
          ...(directMsgs.data || []).map((m: any) => ({ ...m, source: 'direct' })),
          ...(projectMsgs.data || []).map((m: any) => ({
            id: m.id,
            sender_name: m.sender_name,
            content: m.message,
            timestamp: m.timestamp,
            is_read: false,
            quote_id: m.quote_id,
            source: 'project'
          }))
        ]
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 5);

        setRecentMessages(combined);
      };

      await fetchAllMessages();

      // Subscribe to realtime changes on both tables
      const channel = supabase
        .channel('admin-messages')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, fetchAllMessages)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'project_messages' }, fetchAllMessages)
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    };

    const cleanup = setupRealtime();
    return () => { cleanup.then(fn => fn?.()); };
  }, []);

  const updateProjectProgress = async (quoteId: string, progress: number) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ manual_progress: progress, last_progress_update: new Date().toISOString() })
        .eq('id', quoteId);
      if (error) throw error;
      setQuotes(quotes.map(q => q.id === quoteId ? { ...q, manual_progress: progress } : q));
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const updateProjectInfo = async (quoteId: string, info: string) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ project_info: info, last_info_update: new Date().toISOString() })
        .eq('id', quoteId);
      if (error) throw error;
      setQuotes(quotes.map(q => q.id === quoteId ? { ...q, project_info: info } : q));
    } catch (err) {
      console.error('Error updating info:', err);
    }
  };

  const updateProjectLocation = async (quoteId: string, location: string) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ location })
        .eq('id', quoteId);
      if (error) throw error;
      setQuotes(prev => prev.map(q => q.id === quoteId ? { ...q, location } : q));
    } catch (err) {
      console.error('Error updating location:', err);
    }
  };

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setClients(data || []);
    } catch (err) {
      console.error('Error fetching clients:', err);
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

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setQuotes((data || []) as Quote[]);
    } catch (err) {
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientLoading(true);
    setClientStatus(null);

    try {
      // Check if profile already exists
      const { data: existingProfiles } = await supabase
        .from('profiles')
        .select('id')
        .ilike('email', clientData.email);

      let targetUid = "";

      if (existingProfiles && existingProfiles.length > 0) {
        targetUid = existingProfiles[0].id;
        setClientStatus({ type: 'success', message: 'Client already exists! High-speed linking their inquiries now...' });
      } else {
        // Save current admin session
        const { data: { session: adminSession } } = await supabase.auth.getSession();

        // Create client account
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: clientData.email,
          password: clientData.password,
          options: {
            data: { full_name: clientData.name, role: 'client' }
          }
        });

        if (signUpError) throw signUpError;
        if (!signUpData.user) throw new Error('Failed to create user');

        targetUid = signUpData.user.id;

        // Restore admin session
        if (adminSession) {
          await supabase.auth.setSession({
            access_token: adminSession.access_token,
            refresh_token: adminSession.refresh_token
          });
        }

        // Create client profile
        await supabase.from('profiles').insert({
          id: targetUid,
          email: clientData.email,
          full_name: clientData.name,
          role: 'client',
          created_at: new Date().toISOString()
        });

        setClientStatus({ type: 'success', message: 'New Client account created successfully!' });
      }

      // Link all quotes with this email to this client
      const { data: clientQuotes } = await supabase
        .from('quotes')
        .select('id, email')
        .ilike('email', clientData.email);

      if (clientQuotes) {
        for (const quoteDoc of clientQuotes) {
          const updateData: any = { client_id: targetUid };
          if (quoteDoc.id === clientData.selectedQuoteId && clientData.amount) {
            updateData.amount = parseFloat(clientData.amount);
            updateData.status = 'converted';
          }
          await supabase.from('quotes').update(updateData).eq('id', quoteDoc.id);
        }
      }

      setQuotes(prev => prev.map(q => q.email?.toLowerCase() === clientData.email.toLowerCase() ? { ...q, client_id: targetUid } : q));
      setClientData({ name: '', email: '', password: '', amount: '', selectedQuoteId: '' });
      setTimeout(() => setShowCreateClient(false), 3000);

    } catch (err: any) {
      setClientStatus({ type: 'error', message: err.message || 'Verification failed' });
    } finally {
      setClientLoading(false);
    }
  };

  const viewClientPortal = (clientId: string) => {
    localStorage.setItem('impersonatedClientId', clientId);
    navigate('/client-dashboard');
  };

  const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
      const { error } = await supabase.from('quotes').update({ status }).eq('id', id);
      if (error) throw error;
      setQuotes(quotes.map(q => q.id === id ? { ...q, status } : q));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'No Date';
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
      });
    } catch (err) { return 'Invalid Date'; }
  };

  const totalRevenue = quotes.reduce((acc, quote) => acc + (parseFloat(quote.amount as any) || 0), 0);

  const statsList = [
    { label: 'Total Quotes', value: quotes.length, icon: MessageSquare, color: 'bg-blue-500' },
    { label: 'Pending Request', value: quotes.filter(q => q.status === 'pending').length, icon: Clock, color: 'bg-amber-500' },
    { label: 'Successful Clients', value: clients.length, icon: Users, color: 'bg-emerald-500' },
    { label: 'Total Revenue (GHS)', value: `₵${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, icon: BarChart3, color: 'bg-purple-500' },
  ];

  return (
    <Layout>
      <SEO title="Admin Dashboard" />
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden bg-[#0F172A] p-4 flex items-center justify-between sticky top-[72px] z-40 border-b border-white/5 shadow-lg">
          <h2 className="text-white font-bold tracking-widest text-xs uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" /> Admin Console
          </h2>
          <button 
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-white/5 rounded-lg text-white"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {(mobileSidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside 
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className={`w-64 bg-[#0F172A] text-white flex flex-col fixed lg:sticky top-[72px] h-[calc(100vh-72px)] z-50 lg:z-30 transition-all ${!mobileSidebarOpen && 'hidden lg:flex'}`}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
              </div>

              <nav className="flex-1 px-4 space-y-2">
                <SidebarItem 
                  icon={BarChart3} 
                  label="Overview" 
                  active={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')} 
                />
                <SidebarItem 
                  icon={MessageSquare} 
                  label="Project Inquiries" 
                  active={activeTab === 'quotes'} 
                  onClick={() => setActiveTab('quotes')} 
                />
                <SidebarItem 
                  icon={Briefcase} 
                  label="Projects" 
                  active={activeTab === 'projects'} 
                  onClick={() => setActiveTab('projects')} 
                />
                <SidebarItem 
                  icon={Users} 
                  label="Clients" 
                  active={activeTab === 'clients'} 
                  onClick={() => setActiveTab('clients')} 
                />
                <SidebarItem 
                  icon={ShieldCheck} 
                  label="Project Team" 
                  active={activeTab === 'team'} 
                  onClick={() => setActiveTab('team')} 
                />
                <SidebarItem 
                  icon={BookOpen} 
                  label="User Guide" 
                  active={activeTab === 'guide'} 
                  onClick={() => setActiveTab('guide')} 
                />
              </nav>

              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab} Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening at Acquans Ventures.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCreateClient(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" /> Create Client Account
                </button>
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statsList.map((stat, i) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={stat.label}
                      className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                        <stat.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Quote Requests Table */}
                  <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Recent Quote Requests</h2>
                      <button
                        onClick={() => setActiveTab('quotes')}
                        className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                      >
                        View all <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-4">
                      {quotes.slice(0, 5).map((quote) => (
                        <div
                          key={quote.id}
                          onClick={() => navigate(`/admin/client-journey/${quote.id}`)}
                          className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                              {quote.name[0]}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-gray-900 line-clamp-1">{quote.name}</p>
                               <p className="text-[10px] text-gray-400 font-medium">{formatDate(quote.created_at)} · AQ-RFQ-{quote.id.slice(0, 8).toUpperCase()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="hidden sm:block text-xs font-bold text-gray-500">{quote.service}</span>
                            <StatusBadge status={quote.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* New: Recent Client Replies Sidebar */}
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-blue-50/50">
                      <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary" /> Client Replies
                      </h2>
                      {recentMessages.filter(m => !m.is_read).length > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">NEW</span>
                      )}
                    </div>
                    <div className="p-4 flex-1 space-y-4">
                       {recentMessages.length === 0 ? (
                         <div className="text-center py-10">
                            <MessageSquare className="w-10 h-10 text-gray-100 mx-auto mb-2" />
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">No recent replies</p>
                         </div>
                       ) : (
                         recentMessages.map((msg) => (
                           <div
                              key={msg.id}
                              onClick={() => navigate(`/admin/client-journey/${msg.quote_id}`)}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer hover:border-primary hover:bg-primary/5 ${msg.is_read ? 'bg-gray-50/50 border-gray-100' : 'bg-white border-blue-200 ring-1 ring-blue-100 shadow-sm'}`}
                           >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-primary uppercase tracking-tighter">{msg.sender_name}</span>
                                <span className="text-[9px] text-gray-400 font-bold">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                              <p className="text-xs text-gray-700 font-bold line-clamp-2">"{msg.content}"</p>
                           </div>
                         ))
                       )}
                    </div>
                    <div className="p-4 border-t border-gray-50 bg-gray-50/50">
                      <button className="w-full py-3 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors">View All Messages</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quotes' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                   <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search queries..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                   </div>
                   <div className="flex gap-2">
                      <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                      </button>
                   </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <Loader2 className="w-10 h-10 animate-spin mb-4" />
                      <p>Loading project quotes...</p>
                    </div>
                  ) : quotes.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                      <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900">No quotes yet</h3>
                      <p className="text-gray-500">Quotes submitted via the contact form will appear here.</p>
                    </div>
                  ) : (
                    quotes.map((quote) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={quote.id}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                        onClick={() => navigate(`/admin/client-journey/${quote.id}`)}
                      >
                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <StatusBadge status={quote.status} />
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {formatDate(quote.created_at)}
                              </span>
                              <span className="text-xs font-bold text-primary">
                                AQ-RFQ-{quote.id.slice(0, 8).toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{quote.name}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4 font-medium">
                              <a href={`mailto:${quote.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Mail className="w-4 h-4" /> {quote.email}
                              </a>
                              <a href={`tel:${quote.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                                <Phone className="w-4 h-4" /> {quote.phone}
                              </a>
                              <span className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> {quote.service}
                              </span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl text-gray-600 text-sm italic leading-relaxed">
                              "{quote.message}"
                            </div>
                          </div>
                          <div className="flex lg:flex-col gap-2 justify-end lg:justify-start">
                             <button
                               onClick={(e) => { e.stopPropagation(); updateQuoteStatus(quote.id, 'reviewed'); }}
                               className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                               title="Mark as Reviewed"
                             >
                                <CheckCircle2 className="w-5 h-5" />
                             </button>
                             <button
                               onClick={(e) => { e.stopPropagation(); updateQuoteStatus(quote.id, 'contacted'); }}
                               className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all"
                               title="Contacted Client"
                             >
                                <Phone className="w-5 h-5" />
                             </button>
                             <button
                               onClick={(e) => { e.stopPropagation(); navigate(`/admin/client-journey/${quote.id}`); }}
                               className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
                               title="View Journey"
                             >
                                <ExternalLink className="w-5 h-5" />
                             </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-10">
                <section>
                  <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-sm flex items-center gap-3">
                      <Clock className="w-5 h-5 text-amber-500" /> Active Projects
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {quotes.filter(q => ['quoted', 'negotiating', 'converted'].includes(q.status)).length === 0 ? (
                      <p className="text-gray-400 italic col-span-full py-10 text-center bg-white rounded-3xl border border-dashed border-gray-200">No active site works found.</p>
                    ) : (
                      quotes
                        .filter(q => ['quoted', 'negotiating', 'converted'].includes(q.status))
                        .map(project => (
                          <ProjectAdminCard
                            key={project.id}
                            project={project}
                            onUpdateProgress={updateProjectProgress}
                            onUpdateInfo={updateProjectInfo}
                            onUpdateLocation={updateProjectLocation}
                            onClick={() => navigate(`/admin/client-journey/${project.id}`)}
                          />
                        ))
                    )}
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-sm flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Others
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {quotes.filter(q => q.status === 'completed').length === 0 ? (
                      <p className="text-gray-400 italic col-span-full py-10 text-center bg-white rounded-3xl border border-dashed border-gray-200">No completed project history yet.</p>
                    ) : (
                      quotes
                        .filter(q => q.status === 'completed')
                        .map(project => (
                          <ProjectAdminCard
                            key={project.id}
                            project={project}
                            onUpdateProgress={updateProjectProgress}
                            onUpdateInfo={updateProjectInfo}
                            onUpdateLocation={updateProjectLocation}
                            onClick={() => navigate(`/admin/client-journey/${project.id}`)}
                          />
                        ))
                    )}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'clients' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clients.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                      <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900">No registered clients yet</h3>
                      <p className="text-gray-500">Clients you create accounts for will appear here.</p>
                    </div>
                  ) : (
                    clients.map((client) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={client.id}
                        className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl">
                            {client.full_name ? client.full_name[0] : 'C'}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{client.full_name}</h3>
                            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">Active Client</p>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                              <Mail className="w-4 h-4" />
                            </div>
                            <span className="truncate">{client.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <span>Joined {formatDate(client.created_at)}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => viewClientPortal(client.id)}
                            className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/10"
                          >
                            <ExternalLink className="w-4 h-4" /> View Portal
                          </button>
                          <button className="flex-1 py-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-primary hover:text-white transition-all font-bold text-xs flex items-center justify-center gap-2">
                            <MessageSquare className="w-4 h-4" /> Contact
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-sm flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600" /> Project Team Members
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staffList.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                      <ShieldCheck className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900">No team members</h3>
                      <p className="text-gray-500">Admins and project team members will appear here.</p>
                    </div>
                  ) : (
                    staffList.map((staff) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={staff.id}
                        className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl ${
                            staff.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-green-500/10 text-green-600'
                          }`}>
                            {staff.full_name ? staff.full_name[0] : 'U'}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{staff.full_name}</h3>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${
                              staff.role === 'admin' ? 'text-primary' : 'text-green-600'
                            }`}>
                              {staff.role.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                        <div className="mt-auto pt-4 border-t border-gray-100">
                          <a href={`mailto:${staff.email}`} className="text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-2 transition-colors">
                            <Mail className="w-4 h-4" /> {staff.email}
                          </a>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="space-y-8 max-w-4xl">
                <div className="border-b border-gray-200 pb-6">
                  <h1 className="text-3xl font-bold text-gray-900">Administrator Guide</h1>
                  <p className="text-gray-500 mt-1">Platform documentation for the Acquans Ventures management team.</p>
                </div>
                
                <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100 space-y-8">
                  <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> 1. Dashboard Overview</h2>
                    <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                      <li><strong className="text-gray-900">High-level statistics:</strong> View Total Quotes, Pending Requests, and Successful Clients.</li>
                      <li><strong className="text-gray-900">Recent Quote Requests:</strong> Review the latest inquiries submitted via the website contact forms.</li>
                      <li><strong className="text-gray-900">Recent Client Replies:</strong> Keep track of new messages sent by clients directly on the dashboard.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> 2. Managing Project Inquiries (Quotes)</h2>
                    <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                      <li>Navigate to the <strong className="text-gray-900">Project Inquiries</strong> tab to view full details of requested services.</li>
                      <li>Update the status of an inquiry (e.g., mark as 'Reviewed', 'Contacted', or 'Converted').</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> 3. Creating Client Accounts</h2>
                    <p className="text-gray-600 mb-3">Once a project inquiry is approved and converted to an active project:</p>
                    <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                      <li>Click the <strong className="text-gray-900">Create Client Account</strong> button in the top right corner.</li>
                      <li>Select the corresponding quote from the dropdown list. The system will automatically pull in the client's name and email.</li>
                      <li>Assign a temporary password and create the account. This grants the client access to their portal.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> 4. Managing Active Projects</h2>
                    <p className="text-gray-600 mb-3">In the <strong className="text-gray-900">Projects</strong> tab, oversee ongoing site works:</p>
                    <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                      <li><strong className="text-gray-900">Execution Progress:</strong> Manually update the percentage slider to reflect real-world site progress.</li>
                      <li><strong className="text-gray-900">Project Info:</strong> Post status updates that the client will see on their dashboard.</li>
                      <li><strong className="text-gray-900">Location:</strong> Set the project site location.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> 5. Client Management & Impersonation</h2>
                    <p className="text-gray-600 mb-3">In the <strong className="text-gray-900">Clients</strong> tab, view a list of all registered clients:</p>
                    <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                      <li>Click <strong className="text-gray-900">View Portal</strong> on any client to securely log into their dashboard. This shows you exactly what the client sees.</li>
                      <li>Click <strong className="text-gray-900">Exit View</strong> at the top of the screen to return to the Admin dashboard.</li>
                    </ul>
                  </section>
                </div>
              </div>
            )}
          </div>
        </main>

        <AnimatePresence>
          {showCreateClient && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCreateClient(false)}
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Create New Client</h3>
                  <p className="text-gray-500 mb-8">Set up an account for a successful signing client.</p>

                  <form onSubmit={handleCreateClient} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Select from Project Requests</label>
                      <select
                        required
                        className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                        onChange={(e) => {
                          const quote = quotes.find(q => q.id === e.target.value);
                          if (quote) {
                            setClientData({ ...clientData, name: quote.name, email: quote.email, selectedQuoteId: quote.id });
                          }
                        }}
                      >
                        <option value="">Choose a client...</option>
                        {quotes
                          .filter(q => q.email && q.email.includes('@'))
                          .filter((q, index, self) =>
                            index === self.findIndex((t) => t.email === q.email)
                          ).map(q => (
                            <option key={q.id} value={q.id}>{q.name} ({q.email})</option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-2">Full Name (Auto)</label>
                        <input
                          readOnly
                          type="text"
                          value={clientData.name}
                          className="w-full px-5 py-3.5 rounded-2xl bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-2">Email (Auto)</label>
                        <input
                          readOnly
                          type="email"
                          value={clientData.email}
                          className="w-full px-5 py-3.5 rounded-2xl bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Assign Temporary Password</label>
                      <input
                        required
                        type="password"
                        value={clientData.password}
                        onChange={(e) => setClientData({...clientData, password: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Project Value (Amount in GHS)</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-gray-400">₵</span>
                        <input
                          required
                          type="number"
                          step="0.01"
                          value={clientData.amount}
                          onChange={(e) => setClientData({...clientData, amount: e.target.value})}
                          className="w-full pl-10 pr-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {clientStatus && (
                      <div className={`p-4 rounded-xl text-sm flex items-center gap-3 ${
                        clientStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {clientStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        {clientStatus.message}
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowCreateClient(false)}
                        className="flex-1 py-4 font-bold text-gray-600 hover:bg-gray-50 rounded-2xl transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={clientLoading}
                        type="submit"
                        className="flex-1 py-4 font-bold bg-primary text-white hover:bg-primary-dark rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center"
                      >
                        {clientLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

function ProjectAdminCard({ project, onUpdateProgress, onUpdateInfo, onUpdateLocation, onClick }: any) {
  const serviceStyles: any = {
    'Plumbing Works': { border: 'border-blue-200', bg: 'bg-blue-50/30', text: 'text-blue-600', iconBg: 'bg-blue-100' },
    'Civil Works': { border: 'border-amber-200', bg: 'bg-amber-50/30', text: 'text-amber-600', iconBg: 'bg-amber-100' },
    'Heating Systems': { border: 'border-orange-200', bg: 'bg-orange-50/30', text: 'text-orange-600', iconBg: 'bg-orange-100' },
    'Boiler Installations': { border: 'border-slate-200', bg: 'bg-slate-50/30', text: 'text-slate-600', iconBg: 'bg-slate-100' },
    'Consulting': { border: 'border-violet-200', bg: 'bg-violet-50/30', text: 'text-violet-600', iconBg: 'bg-violet-100' },
    'Maintenance': { border: 'border-rose-200', bg: 'bg-rose-50/30', text: 'text-rose-600', iconBg: 'bg-rose-100' },
    'Apprenticeship & Training': { border: 'border-indigo-200', bg: 'bg-indigo-50/30', text: 'text-indigo-600', iconBg: 'bg-indigo-100' },
    'Ventilation & AC': { border: 'border-sky-200', bg: 'bg-sky-50/30', text: 'text-sky-600', iconBg: 'bg-sky-100' }
  };

  const style = serviceStyles[project.service] || serviceStyles['Plumbing Works'];

  return (
    <div className={`border ${style.border} ${style.bg} rounded-[32px] shadow-sm hover:shadow-md transition-all group overflow-hidden`}>
      <div className="p-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${style.iconBg} flex items-center justify-center ${style.text} font-bold`}>
              {project.service[0]}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg tracking-tight line-clamp-1">{project.service}</h3>
              <p className="text-xs text-gray-400 font-medium tracking-wide">RFQ: AQ-RFQ-{project.id.slice(0, 8).toUpperCase()} | Client: {project.name}</p>
            </div>
          </div>
          <button onClick={onClick} className={`p-2 hover:bg-white rounded-lg ${style.text} transition-all`}>
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>Execution Status</span>
            <span className={`${style.text}`}>{project.manual_progress || 0}%</span>
          </div>
          <div className="h-3 bg-white/50 rounded-full overflow-hidden p-0.5 border border-white/50">
            <div
              className={`h-full rounded-full ${style.text.replace('text-', 'bg-')} shadow-sm transition-all duration-1000`}
              style={{ width: `${project.manual_progress || 0}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white/40 p-4 rounded-2xl border border-white/40">
           <div>
             <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Project Value</p>
             <p className={`text-lg font-black ${style.text}`}>₵{project.amount?.toLocaleString() || '0.00'}</p>
           </div>
           <MapPin className={`w-5 h-5 ${style.text} opacity-30`} />
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ active, icon: Icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
        active
          ? 'bg-primary text-white shadow-lg shadow-primary/10'
          : 'text-white/40 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

function StatusBadge({ status }: { status: Quote['status'] }) {
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

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${styles[status]}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
