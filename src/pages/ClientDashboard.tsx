import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BarChart3, LayoutDashboard, Briefcase, MessageSquare, Settings, LogOut,
  Bell, ChevronRight, CheckCircle2, Clock, MapPin,
  Calendar, CreditCard, ShieldCheck, ArrowLeft, Mail, Phone, Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';

interface Project {
  id: string;
  name: string;
  status: 'planning' | 'ongoing' | 'completed';
  progress: number;
  location: string;
  start_date: string;
  service_type: string;
  project_info?: string;
}

export default function ClientDashboard() {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeView, setActiveView] = useState<'overview' | 'projects' | 'messages' | 'settings'>('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState({ active: 0, completed: 0, pending: 0 });
  const [messages, setMessages] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientData = async (email: string) => {
      try {
        const { data: allQuotes, error } = await supabase
          .from('quotes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const clientQuotes = (allQuotes || []).filter((q: any) => q.email?.toLowerCase() === email?.toLowerCase());

        const mappedProjects = clientQuotes
          .filter((q: any) => ['quoted', 'negotiating', 'converted', 'completed'].includes(q.status))
          .map((q: any) => ({
            id: q.id,
            name: q.service,
            status: q.status === 'completed' ? 'completed' : 'ongoing',
            progress: q.manual_progress !== undefined ? q.manual_progress : (q.status === 'completed' ? 100 : (q.status === 'converted' ? 75 : 30)),
            location: q.location || 'Site Location',
            start_date: formatDate(q.created_at),
            service_type: q.service,
            project_info: q.project_info || ''
          })) as Project[];

        setProjects(mappedProjects);
        setStats({
          active: mappedProjects.filter(p => p.status === 'ongoing').length,
          completed: mappedProjects.filter(p => p.status === 'completed').length,
          pending: clientQuotes.filter((q: any) => q.status === 'pending').length
        });
      } catch (err) {
        console.error('Error fetching client data:', err);
      }
    };

    const fetchProfile = async (targetUid: string, isAdmin: boolean) => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', targetUid)
          .single();

        if (profile) {
          setUserProfile({ ...profile, isAdminViewing: isAdmin });
          if (profile.email) await fetchClientData(profile.email);
        } else {
          setUserProfile({ full_name: 'Client Account', email: '', isAdminViewing: isAdmin, id: targetUid });
        }

        // Fetch Messages
        const { data: allMsgs } = await supabase
          .from('messages')
          .select('*')
          .order('timestamp', { ascending: false });

        if (allMsgs) {
          setMessages(allMsgs.filter((m: any) => m.receiver_id === targetUid || m.sender_id === targetUid));
        }

      } catch (err) {
        console.error('Error fetching target profile:', err);
      } finally {
        setLoading(false);
      }
    };

    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const impersonatedId = localStorage.getItem('impersonatedClientId');

      if (!user && !impersonatedId) { navigate('/login'); return; }

      let targetUid = user?.id;
      let isAdminMode = false;
      setCurrentUserId(user?.id || null);

      if (user) {
        const { data: adminProfile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (adminProfile?.role === 'admin' && impersonatedId) {
          targetUid = impersonatedId;
          isAdminMode = true;
        }
      } else if (impersonatedId) { navigate('/login'); return; }

      if (!targetUid) { navigate('/login'); return; }
      await fetchProfile(targetUid, isAdminMode);
    };

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !localStorage.getItem('impersonatedClientId')) {
        navigate('/login');
      }
    });

    init();
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const markAsRead = async () => {
      if (activeView === 'messages' && messages.some(m => !m.is_read)) {
        try {
          const unreadIds = messages.filter(m => !m.is_read).map(m => m.id);
          for (const id of unreadIds) {
            await supabase.from('messages').update({ is_read: true }).eq('id', id);
          }
          setMessages(prev => prev.map(m => ({ ...m, is_read: true })));
        } catch (err) {
          console.error('Error marking as read:', err);
        }
      }
    };
    markAsRead();
  }, [activeView, messages.length]);

  const formatDate = (date: any) => {
    if (!date) return 'Recent';
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) { return 'Recent'; }
  };

  const returnToAdmin = () => {
    localStorage.removeItem('impersonatedClientId');
    navigate('/admin-dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">

        {/* Professional Sidebar */}
        <aside className="w-full lg:w-72 bg-[#1A2332] text-white flex flex-col shrink-0">
          <div className="p-8 border-b border-white/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-xl font-bold">
                {userProfile?.full_name?.[0] || 'C'}
              </div>
              <div className="overflow-hidden">
                <h2 className="font-bold text-lg truncate">{userProfile?.full_name || 'Client'}</h2>
                <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">Client Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <SidebarItem
              active={activeView === 'overview'}
              onClick={() => setActiveView('overview')}
              icon={LayoutDashboard} label="Overview"
            />
            <SidebarItem
              active={activeView === 'projects'}
              onClick={() => setActiveView('projects')}
              icon={Briefcase} label="Active Projects"
              count={projects.length}
            />
            <SidebarItem
              active={activeView === 'messages'}
              onClick={() => setActiveView('messages')}
              icon={MessageSquare} label="Communications"
              count={messages.filter((m: any) => !m.is_read).length}
            />
            <SidebarItem
              active={activeView === 'settings'}
              onClick={() => setActiveView('settings')}
              icon={Settings} label="Account Settings"
            />

            <div className="pt-8 mt-auto px-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-white/50 hover:text-red-400 transition-colors w-full py-3 text-sm font-bold"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content Content */}
        <main className="flex-1 overflow-y-auto">

          {/* Admin Bar */}
          {userProfile?.isAdminViewing && (
            <div className="bg-primary text-white py-3 px-8 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-bold">Currently Viewing: {userProfile?.full_name}</span>
              </div>
              <button
                onClick={returnToAdmin}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Exit View
              </button>
            </div>
          )}

          <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-10">

            {activeView === 'overview' && (
              <div className="space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {userProfile?.full_name?.split(' ')[0]}</h1>
                    <p className="text-gray-500 mt-1">Manage your active projects and collaboration details.</p>
                  </div>
                  <div className="mt-6 md:mt-0 flex items-center gap-4">
                    <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
                      <Mail className="w-4 h-4" /> Message Manager
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <DashboardStat icon={Clock} label="Projects Ongoing" value={stats.active} color="primary" />
                   <DashboardStat icon={CheckCircle2} label="Handed Over" value={stats.completed} color="green" />
                   <DashboardStat icon={BarChart3} label="Pending Requests" value={stats.pending} color="slate" />
                </div>

                {/* Projects Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest text-sm">Target Projects</h2>
                    <button onClick={() => setActiveView('projects')} className="text-primary font-bold text-sm hover:underline">View All</button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {projects.length === 0 ? (
                      <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-sm">
                        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No active project history found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2">When your service requests are converted into active projects, they will be listed here.</p>
                      </div>
                    ) : (
                      projects.slice(0, 3).map(project => (
                        <ProjectRow key={project.id} project={project} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeView === 'projects' && (
               <div className="space-y-8">
                 <h2 className="text-2xl font-bold text-gray-900">Comprehensive Project History</h2>
                 <div className="grid grid-cols-1 gap-4">
                    {projects.map(project => (
                      <ProjectRow key={project.id} project={project} />
                    ))}
                 </div>
               </div>
            )}

            {activeView === 'settings' && (
              <div className="max-w-xl space-y-8">
                <h2 className="text-2xl font-bold text-gray-900">Account Configuration</h2>
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-6">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 uppercase">Contact Name</label>
                     <input type="text" defaultValue={userProfile?.full_name} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary transition-all font-medium" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 uppercase">Registered Email</label>
                     <input type="email" disabled defaultValue={userProfile?.email} className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl opacity-60 cursor-not-allowed font-medium" />
                   </div>
                   <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:shadow-lg shadow-primary/20 transition-all">
                     Update Profile
                   </button>
                </div>
              </div>
            )}

            {activeView === 'messages' && (
              <div className="space-y-8 max-w-4xl">
                 <div className="border-b border-gray-200 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Collaboration Inbox</h1>
                    <p className="text-gray-500 mt-1">Direct instructions and updates from our management team.</p>
                 </div>

                 <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="bg-white border border-gray-200 rounded-[32px] p-20 text-center shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                           <MessageSquare className="w-10 h-10 text-gray-200" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Your inbox is clear</h3>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">Private communications regarding your projects will appear here.</p>
                      </div>
                    ) : (
                      messages.map((msg: any) => {
                        const isSentByMe = msg.sender_id === (userProfile?.id || currentUserId);

                        return (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id}
                            className={`p-8 rounded-[32px] shadow-sm hover:shadow-md transition-all border-2 ${
                              isSentByMe
                                ? 'bg-blue-50 border-blue-100 ml-auto max-w-[90%]'
                                : 'bg-white border-emerald-100 mr-auto max-w-[90%]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-4">
                                 <div className={`w-12 h-12 ${isSentByMe ? 'bg-blue-600' : 'bg-emerald-500'} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                                    {isSentByMe ? <MessageSquare className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{isSentByMe ? 'You' : msg.sender_name}</h4>
                                    <p className={`text-[10px] ${isSentByMe ? 'text-blue-600' : 'text-emerald-600'} font-black uppercase tracking-widest`}>
                                       {isSentByMe ? 'Client Response' : 'Official Management Note'}
                                    </p>
                                 </div>
                              </div>
                              <span className="text-xs font-bold text-gray-400">
                                 {new Date(msg.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div className={`${isSentByMe ? 'bg-white' : 'bg-emerald-50/30'} p-6 rounded-2xl border ${isSentByMe ? 'border-blue-100' : 'border-emerald-50'} text-gray-800 leading-relaxed text-base font-medium`}>
                               {msg.content}
                            </div>

                            {!isSentByMe && (
                              <div className="mt-6 flex flex-col gap-4">
                                 <textarea
                                    id={`reply-${msg.id}`}
                                    placeholder="Type your reply here..."
                                    className="w-full p-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-primary transition-all text-sm min-h-[100px]"
                                 />
                                 <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                       <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-emerald-500" /> End-to-end encrypted.
                                    </p>
                                    <button
                                      onClick={async () => {
                                        const textarea = document.getElementById(`reply-${msg.id}`) as HTMLTextAreaElement;
                                        if (!textarea?.value.trim()) return;

                                        try {
                                          const replyData = {
                                            quote_id: msg.quote_id || '',
                                            receiver_id: msg.sender_id,
                                            sender_id: currentUserId,
                                            sender_name: userProfile?.full_name || 'Client',
                                            content: textarea.value,
                                            timestamp: new Date().toISOString(),
                                            is_read: false
                                          };

                                          const { error } = await supabase.from('messages').insert(replyData);
                                          if (error) throw error;
                                          textarea.value = '';
                                          alert('Reply sent!');
                                          setMessages(prev => [{...replyData, id: Math.random().toString()}, ...prev]);
                                        } catch (err) {
                                          console.error('Error sending reply:', err);
                                        }
                                      }}
                                      className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-xs flex items-center gap-2"
                                    >
                                      Send Reply
                                    </button>
                                 </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })
                    )}
                 </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </Layout>
  );
}

function SidebarItem({ active, icon: Icon, label, onClick, count }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all font-bold text-sm ${
        active
          ? 'bg-primary text-white shadow-lg shadow-primary/10'
          : 'text-white/50 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && count > 0 && (
        <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-white/20 text-white' : 'bg-white/10 text-white/40'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function DashboardStat({ icon: Icon, label, value, color }: any) {
  const colorMap: any = {
    primary: 'text-primary bg-primary/10',
    green: 'text-green-600 bg-green-50',
    slate: 'text-slate-600 bg-slate-50'
  }
  return (
    <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${colorMap[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
      <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const serviceStyles: any = {
    'Plumbing Works': { border: 'border-blue-200', bg: 'bg-blue-50/30', text: 'text-blue-600', iconBg: 'bg-blue-100', accent: 'bg-blue-500' },
    'Civil Works': { border: 'border-amber-200', bg: 'bg-amber-50/30', text: 'text-amber-600', iconBg: 'bg-amber-100', accent: 'bg-amber-500' },
    'Electrical Works': { border: 'border-yellow-200', bg: 'bg-yellow-50/30', text: 'text-yellow-600', iconBg: 'bg-yellow-100', accent: 'bg-yellow-500' },
    'General Consultation': { border: 'border-purple-200', bg: 'bg-purple-50/30', text: 'text-purple-600', iconBg: 'bg-purple-100', accent: 'bg-purple-500' },
    'Construction': { border: 'border-emerald-200', bg: 'bg-emerald-50/30', text: 'text-emerald-600', iconBg: 'bg-emerald-100', accent: 'bg-emerald-500' }
  };

  const style = serviceStyles[project.service_type] || serviceStyles['Construction'];

  return (
    <div className={`${style.bg} border-2 ${style.border} p-8 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500`}>
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${style.border} ${style.text} bg-white/50 backdrop-blur-sm`}>
            {project.service_type}
          </span>
          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
            project.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-primary text-white'
          } shadow-sm`}>
            {project.status === 'completed' ? 'Delivered' : 'In Progress'}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">{project.name}</h3>

          {project.project_info && (
            <div className="mt-4 p-5 bg-white/60 backdrop-blur-sm border-l-4 border-emerald-500 rounded-r-2xl shadow-sm">
              <p className="text-[10px] font-black text-emerald-600 uppercase mb-2 flex items-center gap-2 tracking-widest">
                <MessageSquare className="w-3.5 h-3.5" /> Latest Site Status Update
              </p>
              <p className="text-sm text-gray-700 italic font-medium leading-relaxed">"{project.project_info}"</p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-6 mt-5 text-gray-400 text-xs font-bold uppercase tracking-tight">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" /> Start: {project.start_date}
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 shadow-sm">
              <MapPin className="w-4 h-4" /> Site: {project.location || "Setting coordinate..."}
            </span>
            <Link
              to={`/messages/${project.id}`}
              className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 shadow-sm hover:bg-blue-100 transition-all font-black"
            >
              <MessageSquare className="w-4 h-4" /> Message Project Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full md:w-72 space-y-4 shrink-0 bg-white/40 p-6 rounded-3xl border border-white/50">
        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
          <span>Execution Progress</span>
          <span className="text-emerald-600 font-black text-sm">{project.progress}%</span>
        </div>
        <div className="h-4 bg-gray-200/50 rounded-full overflow-hidden p-1 border border-gray-100 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          />
        </div>
        <p className="text-[10px] text-gray-400 font-bold italic text-center uppercase tracking-tighter">Verified Site Progress</p>
      </div>
    </div>
  );
}
