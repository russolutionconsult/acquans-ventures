import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle2, ShieldCheck, ArrowLeft, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Layout from '@/components/Layout';

type LoginRole = 'admin' | 'client' | null;

export default function Login() {
  const [role, setRole] = useState<LoginRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address to reset your password.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Please check your inbox.');
    } catch (err: any) {
      setError('Failed to send reset email. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get profile from Firestore
      const profileSnap = await getDoc(doc(db, 'profiles', user.uid));
      
      if (!profileSnap.exists()) {
        await signOut(auth);
        throw new Error('This account does not have a profile.');
      }

      const profile = profileSnap.data();

      if (profile.role !== role) {
        await signOut(auth);
        throw new Error(`This account is not authorized for ${role} access.`);
      }

      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/client-dashboard');
      }
    } catch (err: any) {
       if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError(err.message || 'Failed to login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden bg-[#0F172A]">
        {/* Background blobs for vibrancy */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 w-full text-white">
          <AnimatePresence mode="wait">
            {!role ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="mb-12">
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Welcome Back
                  </h1>
                  <p className="text-white/60 text-lg">
                    Which portal would you like to access today?
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto items-stretch">
                  {/* Admin Login Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, translateY: -4 }}
                    className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] overflow-hidden transition-all hover:bg-white/15 hover:border-primary/50 group h-full shadow-2xl"
                  >
                    <div 
                      className="flex-1 flex flex-col items-center justify-center p-12 cursor-pointer"
                      onClick={() => setRole('admin')}
                    >
                      <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-all duration-300">
                        <ShieldCheck className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Admin Login</h3>
                      <p className="text-white/60 text-center text-sm">
                        Access management dashboard, view quotes, and manage clients.
                      </p>
                    </div>
                    
                    {/* Symmetry Footer */}
                    <div className="px-6 py-6 border-t border-white/5 bg-white/5 text-center">
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-extrabold">Authorized Access Only</p>
                    </div>
                  </motion.div>

                  {/* Client Login Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, translateY: -4 }}
                    className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] overflow-hidden transition-all hover:bg-white/15 hover:border-primary/50 group h-full shadow-2xl"
                  >
                    <div 
                      className="flex-1 flex flex-col items-center justify-center p-12 cursor-pointer"
                      onClick={() => setRole('client')}
                    >
                      <div className="w-20 h-20 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-all duration-300">
                        <UserCircle2 className="w-10 h-10 text-secondary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Client Login</h3>
                      <p className="text-white/60 text-center text-sm">
                        View project status, quotes, and communication history.
                      </p>
                    </div>
                    
                    {/* Unified Footer CTA */}
                    <div className="px-6 py-6 border-t border-white/5 bg-white/5 text-center">
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-extrabold mb-2">New to Acquans?</p>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Link 
                          to="/request-quote" 
                          className="text-primary font-bold hover:text-white transition-all hover:underline"
                        >
                          Request For Quotation
                        </Link>
                        <span className="text-white/20 px-1">•</span>
                        <Link 
                          to="/contact" 
                          className="text-primary font-bold hover:text-white transition-all hover:underline"
                        >
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-md mx-auto"
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <button
                    onClick={() => setRole(null)}
                    className="flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to options
                  </button>

                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                      role === 'admin' ? 'bg-primary/20' : 'bg-secondary/20'
                    }`}>
                      {role === 'admin' ? (
                        <ShieldCheck className="w-8 h-8 text-primary" />
                      ) : (
                        <UserCircle2 className="w-8 h-8 text-secondary" />
                      )}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {role === 'admin' ? 'Admin' : 'Client'} Portal
                    </h2>
                    <p className="text-white/60">Please enter your credentials</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-white/20"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-white/20"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="flex justify-end mt-2">
                        <button 
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-xs font-semibold text-primary/80 hover:text-primary transition-all hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    {success && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm"
                      >
                        <ShieldCheck className="w-5 h-5 shrink-0" />
                        {success}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                        role === 'admin' 
                          ? 'bg-primary hover:bg-primary-dark text-white' 
                          : 'bg-secondary hover:bg-secondary-dark text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        'Sign In'
                      )}
                    </button>
                  </form>

                  {role === 'admin' && (
                    <p className="mt-8 text-center text-sm text-white/40">
                      Internal use only. Need access?{' '}
                      <button 
                        onClick={() => navigate('/admin-register')} 
                        className="text-primary hover:underline font-medium"
                      >
                        Register here
                      </button>
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );

}
