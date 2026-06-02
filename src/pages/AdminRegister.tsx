import SEO from '@/components/SEO';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowLeft, Loader2, AlertCircle, CheckCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Layout from '@/components/Layout';

export default function AdminRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'admin' | 'project_team'>('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Restrict staff registration to branded domain only
    if (!email.toLowerCase().endsWith('@acquansventures.com')) {
      setError('Unauthorized access. Staff registration requires an @acquansventures.com email address.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role }
        }
      });

      if (signUpError) throw signUpError;

      const user = data.user;
      if (!user) throw new Error('Registration failed. Please try again.');

      // Create profile in Supabase
      const { error: profileError } = await supabase.from('profiles').insert({
        id: user.id,
        email,
        full_name: fullName,
        role,
        created_at: new Date().toISOString()
      });

      if (profileError) throw profileError;

      setSuccess(true);
      setTimeout(() => navigate('/login'), 5000);
    } catch (err: any) {
      if (err.message?.includes('already registered')) {
        setError('This email is already in use.');
      } else if (err.message?.includes('invalid')) {
        setError('Invalid email address.');
      } else if (err.message?.includes('password')) {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Failed to register');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO title="Admin Register" />
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden bg-[#0F172A]">
        {/* Background blobs for vibrancy */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to login
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-primary/20">
                  {role === 'admin' ? (
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  ) : (
                    <Users className="w-8 h-8 text-green-500" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Company Registration</h2>
                <p className="text-white/60">Restricted to authorized emails only</p>
              </div>

              {success ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Registration Successful!</h3>
                  <p className="text-white/60 mb-8">
                    Please check your email to verify your account. Redirecting to login...
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="btn-primary w-full py-3.5"
                  >
                    Go to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Account Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setRole('admin')}
                        className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                          role === 'admin'
                            ? 'bg-primary/20 border-primary text-white font-bold'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        <ShieldCheck className="w-5 h-5" /> Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('project_team')}
                        className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                          role === 'project_team'
                            ? 'bg-green-500/20 border-green-500 text-white font-bold'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        <Users className="w-5 h-5" /> Project Team
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-white/20"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Authorized Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-white/20"
                        placeholder="calebendk@gmail.com"
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      'Register Account'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
