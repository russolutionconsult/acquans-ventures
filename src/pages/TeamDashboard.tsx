import SEO from '@/components/SEO';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, MessageSquare, LogOut, Clock,
  CheckCircle2, Menu, X, Loader2, MapPin, Mail, ChevronRight, ExternalLink
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
  status: 'pending' | 'reviewed' | 'in_review' | 'contacted' | 'quoted' | 'negotiating' | 'converted' | 'wip' | 'closeout' | 'completed' | 'lost' | 'suspended';
  assigned_to?: string;
  assigned_name?: string;
  created_at: any;
  manual_progress?: number;
  project_info?: string;
  location?: string;
  client_id?: string;
  amount?: number;
}

export default function TeamDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages'>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [activeTab]);

  useEffect(() => {
    const fetchUserAndData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }

        const { data: profileDoc } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!profileDoc || profileDoc.role !== 'project_team') {
          navigate('/login');
          return;
        }

        setProfile(profileDoc);

        // Fetch assigned projects
        const { data: quotesData } = await supabase
          .from('quotes')
          .select('*')
          .eq('assigned_to', user.id)
          .order('created_at', { ascending: false });

        const assignedProjects = (quotesData || []) as Quote[];
        setProjects(assignedProjects);

        // Fetch messages for assigned projects
        if (assignedProjects.length > 0) {
          const projectIds = assignedProjects.map(p => p.id);
          const { data: messagesData } = await supabase
            .from('project_messages')
            .select('*')
            .in('quote_id', projectIds)
            .neq('id_from', user.id)
            .order('timestamp', { ascending: false });

          // Group by project to just show latest
          if (messagesData) {
            const grouped = messagesData.reduce((acc: any, msg: any) => {
              if (!acc[msg.quote_id]) acc[msg.quote_id] = msg;
              return acc;
            }, {});
            setRecentMessages(Object.values(grouped).slice(0, 5));
          }
        }
      } catch (err) {
        console.error('Error in TeamDashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const updateProjectProgress = async (quoteId: string, progress: number) => {
    try {
      await supabase
        .from('quotes')
        .update({ manual_progress: progress, last_progress_update: new Date().toISOString() })
        .eq('id', quoteId);
      setProjects(projects.map(p => p.id === quoteId ? { ...p, manual_progress: progress } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const updateProjectInfo = async (quoteId: string, info: string) => {
    try {
      await supabase
        .from('quotes')
        .update({ project_info: info, last_info_update: new Date().toISOString() })
        .eq('id', quoteId);
      setProjects(projects.map(p => p.id === quoteId ? { ...p, project_info: info } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const updateProjectStatus = async (quoteId: string, status: string) => {
    try {
      await supabase
        .from('quotes')
        .update({ status })
        .eq('id', quoteId);
      setProjects(projects.map(p => p.id === quoteId ? { ...p, status: status as any } : p));
    } catch (err) {
      console.error(err);
    }
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

  const activeProjectsCount = projects.filter(q => ['converted', 'wip', 'closeout'].includes(q.status)).length;
  const completedProjectsCount = projects.filter(q => q.status === 'completed').length;

  const statsList = [
    { label: 'Assigned Projects', value: projects.length, icon: Briefcase, color: 'bg-blue-500' },
    { label: 'Active', value: activeProjectsCount, icon: Clock, color: 'bg-amber-500' },
    { label: 'Completed', value: completedProjectsCount, icon: CheckCircle2, color: 'bg-emerald-500' },
  ];

  return (
    <Layout>
      <SEO title="Team Dashboard" />
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden bg-[#0F172A] p-4 flex items-center justify-between sticky top-[72px] z-40 border-b border-white/5 shadow-lg">
          <h2 className="text-white font-bold tracking-widest text-xs uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Team Console
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
                <h2 className="text-xl font-bold text-green-400">Team Panel</h2>
              </div>

              <nav className="flex-1 px-4 space-y-2">
                <SidebarItem 
                  icon={LayoutDashboard} 
                  label="Overview" 
                  active={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')} 
                />
                <SidebarItem 
                  icon={Briefcase} 
                  label="Assigned Projects" 
                  active={activeTab === 'projects'} 
                  onClick={() => setActiveTab('projects')} 
                />
                <SidebarItem 
                  icon={MessageSquare} 
                  label="Communications" 
                  active={activeTab === 'messages'} 
                  onClick={() => setActiveTab('messages')} 
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
                <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                {activeTab === 'overview' && (
                  <p className="text-gray-500 mt-1">Welcome back, {profile?.full_name?.split(' ')[0]}. Here are your assigned projects.</p>
                )}
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Recent Assignments</h2>
                      <button
                        onClick={() => setActiveTab('projects')}
                        className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                      >
                        View all <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-4">
                      {projects.length === 0 ? (
                        <p className="text-gray-500 text-center py-6">No assigned projects yet.</p>
                      ) : (
                        projects.slice(0, 5).map((project) => (
                          <div
                            key={project.id}
                            onClick={() => navigate(`/messages/${project.id}`)}
                            className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                {project.service[0]}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-gray-900 line-clamp-1">{project.name}</p>
                                 <p className="text-[10px] text-gray-400 font-medium">{project.service} · AQ-RFQ-{project.id.slice(0, 8).toUpperCase()}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <StatusBadge status={project.status} />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-50 bg-blue-50/50 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <h2 className="text-lg font-bold text-gray-900">Recent Messages</h2>
                    </div>
                    <div className="p-4 flex-1 space-y-4">
                       {recentMessages.length === 0 ? (
                         <div className="text-center py-10">
                            <MessageSquare className="w-10 h-10 text-gray-100 mx-auto mb-2" />
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">No messages</p>
                         </div>
                       ) : (
                         recentMessages.map((msg) => {
                            const p = projects.find(proj => proj.id === msg.quote_id);
                            return (
                               <div
                                  key={msg.id}
                                  onClick={() => navigate(`/messages/${msg.quote_id}`)}
                                  className="p-4 rounded-2xl border transition-all cursor-pointer hover:border-primary hover:bg-primary/5 bg-gray-50/50 border-gray-100"
                               >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-tighter">{p?.name || msg.sender_name}</span>
                                  </div>
                                  <p className="text-xs text-gray-700 font-bold line-clamp-2">"{msg.message}"</p>
                               </div>
                            )
                         })
                       )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {projects.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                      <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900">No Projects Assigned</h3>
                      <p className="text-gray-500">You currently have no projects assigned to you.</p>
                    </div>
                  ) : (
                    projects.map(project => (
                      <ProjectTeamCard
                        key={project.id}
                        project={project}
                        onUpdateProgress={(p: number) => updateProjectProgress(project.id, p)}
                        onUpdateInfo={(i: string) => updateProjectInfo(project.id, i)}
                        onUpdateStatus={(s: string) => updateProjectStatus(project.id, s)}
                        onMessage={() => navigate(`/messages/${project.id}`)}
                      />
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {recentMessages.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                      <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900">No Communications</h3>
                      <p className="text-gray-500">You don't have any messages across your assigned projects.</p>
                    </div>
                  ) : (
                    recentMessages.map((msg) => {
                      const project = projects.find(p => p.id === msg.quote_id);
                      return (
                        <div
                          key={msg.id}
                          onClick={() => navigate(`/messages/${msg.quote_id}`)}
                          className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                               <h3 className="text-lg font-bold text-gray-900">{project?.name || msg.sender_name}</h3>
                               <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{project?.service}</span>
                            </div>
                            <p className="text-gray-600 line-clamp-2">"{msg.message}"</p>
                          </div>
                          <button className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors">
                             Reply
                          </button>
                        </div>
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

function ProjectTeamCard({ project, onUpdateProgress, onUpdateInfo, onUpdateStatus, onMessage }: any) {
  const [info, setInfo] = useState(project.project_info || '');
  const [progress, setProgress] = useState(project.manual_progress || 0);

  const statuses = [
    'pending', 'reviewed', 'in_review', 'contacted', 'quoted', 
    'negotiating', 'converted', 'wip', 'closeout', 'completed', 'lost', 'suspended'
  ];

  return (
    <div className="bg-white rounded-[32px] border border-gray-200 shadow-sm p-8 flex flex-col group">
      <div className="flex justify-between items-start mb-6">
        <div>
           <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
           <p className="text-sm font-medium text-gray-500 mb-2">{project.service} · AQ-RFQ-{project.id.slice(0, 8).toUpperCase()}</p>
           <a href={`mailto:${project.email}`} className="text-sm text-primary hover:underline flex items-center gap-1"><Mail className="w-4 h-4"/> {project.email}</a>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex justify-between">
            <span>Execution Progress</span>
            <span className="text-primary">{progress}%</span>
          </label>
          <input 
            type="range" min="0" max="100" 
            value={progress}
            onChange={(e) => {
              setProgress(Number(e.target.value));
            }}
            onMouseUp={() => onUpdateProgress(progress)}
            onTouchEnd={() => onUpdateProgress(progress)}
            className="w-full accent-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Project Status Update (Visible to Client)</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={info} 
              onChange={(e) => setInfo(e.target.value)} 
              placeholder="e.g. Site clearing completed" 
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <button 
              onClick={() => onUpdateInfo(info)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-bold transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Overall Project Status</label>
          <select 
            value={project.status} 
            onChange={(e) => onUpdateStatus(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary"
          >
            {statuses.map(s => <option key={s} value={s}>{s.replace('_', ' ').toUpperCase()}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
        <button 
          onClick={onMessage}
          className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" /> Message Client
        </button>
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
    wip: 'bg-blue-100 text-blue-700 border-blue-200',
    closeout: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    lost: 'bg-red-100 text-red-700 border-red-200',
    suspended: 'bg-gray-100 text-gray-400 border-gray-200'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${styles[status] || 'bg-gray-100 text-gray-500'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}
