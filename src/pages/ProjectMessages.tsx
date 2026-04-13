import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';
import {
  Send,
  Paperclip,
  ArrowLeft,
  User,
  Clock,
  CheckCircle2,
  FileText,
  MessageSquare,
  MoreVertical,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  id_from: string;
  id_to: string;
  message: string;
  timestamp: any;
  sender_name: string;
  sender_role: 'admin' | 'client';
  attachment_url?: string;
  attachment_name?: string;
}

const ProjectMessages = () => {
  const { quoteId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [role, setRole] = useState<'admin' | 'client' | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserAndProject = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentUser(user);

      // Check if user is admin or client via profiles table
      const { data: profileDoc } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileDoc?.role === 'admin' || profileDoc?.role === 'staff') {
        setRole('admin');
      } else {
        setRole('client');
      }

      if (quoteId) {
        const { data: projectDoc } = await supabase
          .from('quotes')
          .select('*')
          .eq('id', quoteId)
          .single();

        if (projectDoc) {
          setProject({ id: projectDoc.id, ...projectDoc });
        }
      }
      setLoading(false);
    };

    fetchUserAndProject();
  }, [quoteId]);

  useEffect(() => {
    if (!quoteId) return;

    // Initial fetch
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('project_messages')
        .select('*')
        .eq('quote_id', quoteId)
        .order('timestamp', { ascending: true });

      if (data) {
        setMessages(data as Message[]);
        setTimeout(() => {
          scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    fetchMessages();

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`project-messages-${quoteId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'project_messages',
        filter: `quote_id=eq.${quoteId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
        setTimeout(() => {
          scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [quoteId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !quoteId || !currentUser || !project || !role) return;

    try {
      const is_admin = role === 'admin';
      const receiver_id = is_admin ? project.client_id : (project.assigned_to || project.admin_id || null);

      const msgData = {
        quote_id: quoteId,
        id_from: currentUser.id,
        id_to: receiver_id,
        message: newMessage,
        sender_name: is_admin ? 'Acquans Ventures Admin' : project.name,
        sender_role: role,
        timestamp: new Date().toISOString()
      };

      const { data, error } = await supabase.from('project_messages').insert(msgData).select().single();

      if (error) throw error;

      // Add message to local state immediately
      if (data) {
        setMessages(prev => [...prev, data as Message]);
      }
      setNewMessage('');
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Project Not Found</h2>
          <p className="text-gray-500 mb-6">We couldn't find the messaging channel for this project.</p>
          <Link to={role === 'admin' ? '/admin-dashboard' : '/client-dashboard'} className="btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-8">
        <div className="max-w-5xl mx-auto px-4 h-[calc(100vh-140px)] flex flex-col">
          {/* Header */}
          <header className="bg-white rounded-t-[32px] border-b border-slate-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <Link
                  to={role === 'admin' ? `/admin/client-journey/${quoteId}` : '/client-dashboard'}
                  className="p-3 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl transition-all shadow-lg"
                >
                  <ArrowLeft className="w-6 h-6 stroke-[3]" />
                </Link>
                <div>
                  <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Project Communication Hub
                  </h1>
                  <p className="text-sm text-slate-500 flex items-center gap-2 font-bold">
                    <span className="text-blue-600">Re:</span> {project.service} - {project.name}
                  </p>
                </div>
             </div>

             <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project ID</span>
                  <span className="text-xs font-black text-slate-900"># {quoteId?.slice(-6).toUpperCase()}</span>
                </div>
                <div className="h-10 w-px bg-slate-100 mx-2" />
                <button className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-2xl hover:bg-blue-50 transition-all">
                   <MoreVertical className="w-5 h-5" />
                </button>
             </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-white p-6 space-y-6 scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-transparent">
             <AnimatePresence initial={false}>
               {messages.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center opacity-40">
                   <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                     <MessageSquare className="w-10 h-10 text-blue-600" />
                   </div>
                   <p className="font-black uppercase tracking-widest text-slate-900 text-xs">Start a conversation</p>
                 </div>
               ) : (
                 messages.map((msg, index) => {
                   const isMe = msg.id_from === currentUser?.id;
                   return (
                     <motion.div
                       key={msg.id}
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                     >
                        <div className={`max-w-[80%] md:max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                           <div className={`flex items-center gap-2 mb-1 px-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                 {msg.sender_name}
                              </span>
                              <span className="text-[10px] items-center gap-1 text-slate-400 hidden md:flex">
                                 <Clock className="w-3 h-3" />
                                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                           </div>

                           <div className={`p-4 rounded-3xl shadow-sm border ${
                             isMe
                               ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none'
                               : 'bg-white text-slate-900 border-slate-100 rounded-tl-none'
                           }`}>
                              <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.message}</p>

                              {msg.attachment_url && (
                                <a
                                  href={msg.attachment_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={`mt-3 flex items-center gap-3 p-3 rounded-2xl text-xs font-bold transition-all ${
                                    isMe ? 'bg-blue-700/50 hover:bg-blue-800/50' : 'bg-slate-50 hover:bg-slate-100'
                                  }`}
                                >
                                   <div className={`p-2 rounded-xl ${isMe ? 'bg-white/10' : 'bg-blue-600/10 text-blue-600'}`}>
                                      <FileText className="w-4 h-4" />
                                   </div>
                                   <span className="truncate max-w-[150px]">{msg.attachment_name || 'Download Attachment'}</span>
                                </a>
                              )}
                           </div>
                        </div>
                     </motion.div>
                   );
                 })
               )}
               <div ref={scrollRef} />
             </AnimatePresence>
          </div>

          {/* Input Area */}
          <footer className="bg-white rounded-b-[32px] border-t border-slate-100 p-6">
             <form onSubmit={handleSendMessage} className="relative flex items-center gap-4">
                <button
                  type="button"
                  className="p-4 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-2xl hover:bg-blue-50 transition-all"
                >
                   <Paperclip className="w-6 h-6" />
                </button>

                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 bg-slate-50 border-none rounded-3xl px-6 h-14 text-slate-900 focus:ring-2 focus:ring-blue-600/20 font-medium placeholder:text-slate-400"
                />

                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="h-14 w-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-blue-600/30"
                >
                   <Send className="w-6 h-6" />
                </button>
             </form>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectMessages;
