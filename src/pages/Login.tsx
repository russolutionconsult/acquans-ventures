import SEO from '@/components/SEO';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle2, ShieldCheck, ArrowLeft, Mail, Lock, Loader2, AlertCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';

type LoginRole = 'admin' | 'client' | 'project_team' | null;

export default function Login() {
  const [role, setRole] = useState<LoginRole>(null);
  const [companySubSelect, setCompanySubSelect] = useState(false);
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
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
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
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      const user = data.user;

      // Get profile from Supabase
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        await supabase.auth.signOut();
        throw new Error('This account does not have a profile.');
      }

      if (profile.role !== role) {
        await supabase.auth.signOut();
        throw new Error(`This account is not authorized for ${role} access.`);
      }

      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'project_team') {
        navigate('/team-dashboard');
      } else {
        navigate('/client-dashboard');
      }
    } catch (err: any) {
       if (err.message?.includes('Invalid login credentials')) {
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
