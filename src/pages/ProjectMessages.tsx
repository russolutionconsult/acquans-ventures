import React, { useState, useEffect, useRef } from 'react';
import SEO from '@/components/SEO';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';
import {
  Send,
  Paperclip,
  ArrowLeft,
  Clock,
  FileText,
  MessageSquare,
  MoreVertical,
  Loader2,
  X,
  Download,
  Image as ImageIcon
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
  const [sending, setSending] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [role, setRole] = useState<'admin' | 'client' | null>(null);
  const [actualRole, setActualRole] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserAndProject = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentUser(user);

      const { data: profileDoc } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', user.id)
        .single();

      if (profileDoc) {
        setActualRole(profileDoc.role);
      }

      if (profileDoc?.role === 'admin' || profileDoc?.role === 'staff' || profileDoc?.role === 'project_team') {
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

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('project_messages')
        .select('*')
        .eq('quote_id', quoteId)
        .order('timestamp', { ascending: true });

      if (data) {
        setMessages(data as Message[]);
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel(`project-messages-${quoteId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'project_messages',
        filter: `quote_id=eq.${quoteId}`
      }, (payload) => {
        setMessages(prev => {
          // Avoid duplicates (optimistic update)
          if (prev.some(m => m.id === (payload.new as Message).id)) return prev;
          return [...prev, payload.new as Message];
        });
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [quoteId]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File must be under 10MB');
        return;
      }
      setAttachment(file);
    }
  };

  const uploadAttachment = async (file: File): Promise<{ url: string; name: string } | null> => {
    try {
      setUploadingFile(true);
      const ext = file.name.split('.').pop();
      const path = `${quoteId}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from('message-attachments')
        .upload(path, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('message-attachments')
        .getPublicUrl(path);

      return { url: publicUrl, name: file.name };
    } catch (err) {
      console.error('Upload error:', err);
      return null;
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !attachment) || !quoteId || !currentUser || !project || !role) return;

    setSending(true);
    try {
      let attachmentData: { url: string; name: string } | null = null;
      if (attachment) {
        attachmentData = await uploadAttachment(attachment);
      }

      const is_admin = role === 'admin';
      const receiver_id = is_admin
        ? project.client_id
        : (project.assigned_to || null);

      const msgData = {
        quote_id: quoteId,
        id_from: currentUser.id,
        id_to: receiver_id,
        message: newMessage.trim() || (attachment ? `📎 ${attachment.name}` : ''),
        sender_name: is_admin ? 'Acquans Ventures Admin' : (project.name || 'Client'),
        sender_role: role,
        timestamp: new Date().toISOString(),
        ...(attachmentData ? { attachment_url: attachmentData.url, attachment_name: attachmentData.name } : {})
      };

      const { data, error } = await supabase
        .from('project_messages')
        .insert(msgData)
        .select()
        .single();

      if (error) throw error;

      // Optimistic update — realtime listener will deduplicate
      if (data) {
        setMessages(prev => [...prev, data as Message]);
      }

      setNewMessage('');
      setAttachment(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  const isImageFile = (name?: string) => {
    if (!name) return false;
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(name);
  };

  const formatTime = (ts: any) => {
    try {
      return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch { return ''; }
  };

  const formatDate = (ts: any) => {
    try {
      return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return ''; }
  };

  // Group messages by date
  const groupedMessages: { date: string; msgs: Message[] }[] = [];
  messages.forEach((msg) => {
    const d = formatDate(msg.timestamp);
    const last = groupedMessages[groupedMessages.length - 1];
    if (last && last.date === d) {
      last.msgs.push(msg);
    } else {
      groupedMessages.push({ date: d, msgs: [msg] });
    }
  });

  if (loading) {
    return (
      <Layout>
      <SEO title="Project Messages" />
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
          <Link to={actualRole === 'project_team' ? '/team-dashboard' : (role === 'admin' ? '/admin-dashboard' : '/client-dashboard')} className="btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-8">
        <div className="max-w-5xl mx-auto px-0 md:px-4 h-[calc(100dvh-160px)] md:h-[calc(100vh-140px)] flex flex-col">

          {/* Header */}
          <header className="bg-white rounded-none md:rounded-t-[32px] border-b border-slate-100 shadow-sm p-4 md:p-5 flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
              <Link
                to={actualRole === 'project_team' ? '/team-dashboard' : (role === 'admin' ? `/admin/client-journey/${quoteId}` : '/client-dashboard')}
                className="p-2.5 md:p-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl md:rounded-2xl transition-all shadow-lg shrink-0"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 stroke-[3]" />
              </Link>
              <div className="overflow-hidden">
                <h1 className="text-sm md:text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2 truncate">
                  <span className="hidden sm:inline"><MessageSquare className="w-5 h-5 text-blue-600" /></span>
                  Communication Hub
                </h1>
                <p className="text-[10px] md:text-sm text-slate-500 flex items-center gap-1.5 font-bold truncate">
                  <span className="text-blue-600">Re:</span>
                  {project.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project ID</span>
                <span className="text-xs font-black text-slate-900"># {quoteId?.slice(-6).toUpperCase()}</span>
              </div>
              <div className="h-10 w-px bg-slate-100 mx-2" />
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Live</span>
              </div>
              <button className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-2xl hover:bg-blue-50 transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-white p-6 space-y-2 scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-transparent">
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-40 pt-20">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-10 h-10 text-blue-600" />
                  </div>
                  <p className="font-black uppercase tracking-widest text-slate-900 text-xs">No messages yet</p>
                  <p className="text-slate-400 text-xs mt-1">Start the conversation below</p>
                </div>
              ) : (
                groupedMessages.map(({ date, msgs }) => (
                  <div key={date}>
                    {/* Date divider */}
                    <div className="flex items-center gap-3 my-6">
                      <div className="flex-1 h-px bg-slate-100" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                        {date}
                      </span>
                      <div className="flex-1 h-px bg-slate-100" />
                    </div>

                    <div className="space-y-4">
                      {msgs.map((msg) => {
                        const isMe = msg.id_from === currentUser?.id;
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[80%] md:max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                              <div className={`flex items-center gap-2 mb-1 px-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  {isMe ? 'You' : msg.sender_name}
                                </span>
                                <span className="text-[10px] text-slate-300 hidden md:block">
                                  {formatTime(msg.timestamp)}
                                </span>
                              </div>

                              <div className={`p-4 rounded-3xl shadow-sm ${
                                isMe
                                  ? 'bg-blue-600 text-white rounded-tr-none'
                                  : 'bg-slate-50 text-slate-900 border border-slate-100 rounded-tl-none'
                              }`}>
                                {msg.message && msg.message !== `📎 ${msg.attachment_name}` && (
                                  <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                )}

                                {msg.attachment_url && (
                                  <div className="mt-2">
                                    {isImageFile(msg.attachment_name) ? (
                                      <a href={msg.attachment_url} target="_blank" rel="noreferrer">
                                        <img loading="lazy"
                                          src={msg.attachment_url}
                                          alt={msg.attachment_name}
                                          className="max-w-full max-h-64 rounded-2xl object-cover border border-white/20 mt-2 hover:opacity-90 transition-opacity"
                                        />
                                      </a>
                                    ) : (
                                      <a
                                        href={msg.attachment_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`mt-2 flex items-center gap-3 p-3 rounded-2xl text-xs font-bold transition-all ${
                                          isMe ? 'bg-blue-700/50 hover:bg-blue-800/50' : 'bg-white hover:bg-slate-100 border border-slate-200'
                                        }`}
                                      >
                                        <div className={`p-2 rounded-xl ${isMe ? 'bg-white/10' : 'bg-blue-600/10 text-blue-600'}`}>
                                          <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="truncate max-w-[150px]">{msg.attachment_name || 'Download File'}</span>
                                        <Download className={`w-4 h-4 ml-auto shrink-0 ${isMe ? 'text-white/70' : 'text-slate-400'}`} />
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className={`flex items-center gap-1 px-1 mt-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                                <Clock className="w-3 h-3 text-slate-300" />
                                <span className="text-[10px] text-slate-300 md:hidden">{formatTime(msg.timestamp)}</span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
              <div ref={scrollRef} />
            </AnimatePresence>
          </div>

          {/* Attachment Preview Banner */}
          <AnimatePresence>
            {attachment && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-blue-50 border-t border-blue-100 px-6 py-3 flex items-center gap-3 overflow-hidden"
              >
                <div className="p-2 bg-blue-600/10 rounded-xl">
                  {isImageFile(attachment.name)
                    ? <ImageIcon className="w-4 h-4 text-blue-600" />
                    : <FileText className="w-4 h-4 text-blue-600" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{attachment.name}</p>
                  <p className="text-[10px] text-slate-400">{(attachment.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  onClick={() => {
                    setAttachment(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="p-1.5 hover:bg-blue-100 rounded-xl transition-all text-slate-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <footer className="bg-white rounded-b-[32px] border-t border-slate-100 p-5">
            <form onSubmit={handleSendMessage} className="relative flex items-center gap-3">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip"
                onChange={handleFileSelect}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach file (max 10MB)"
                className={`p-4 rounded-2xl transition-all shrink-0 ${
                  attachment
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSendMessage(e as any); }}
                placeholder={attachment ? 'Add a caption (optional)...' : 'Type your message here...'}
                className="flex-1 bg-slate-50 border-none rounded-3xl px-6 h-14 text-slate-900 focus:ring-2 focus:ring-blue-600/20 font-medium placeholder:text-slate-400 outline-none"
              />

              <button
                type="submit"
                disabled={(!newMessage.trim() && !attachment) || sending || uploadingFile}
                className="h-14 w-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-blue-600/30 shrink-0"
              >
                {sending || uploadingFile
                  ? <Loader2 className="w-5 h-5 animate-spin" />
                  : <Send className="w-5 h-5" />
                }
              </button>
            </form>
            <p className="text-center text-[10px] text-slate-300 font-medium mt-3 uppercase tracking-widest">
              Supports images, PDF, Word, Excel · Max 10MB per file
            </p>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectMessages;
