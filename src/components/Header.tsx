import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Menu, X, ArrowRight, ChevronDown, LogOut } from 'lucide-react';
import { technicalServices } from '@/data/services';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const navLinks = [
  { label: 'Overview', path: '/' },
  { label: 'About', path: '/about' },
  { 
    label: 'Services', 
    path: '/services',
    dropdown: technicalServices
  },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    let active = true;

    const getProfile = async (uid: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', uid)
          .single();
        if (error) throw error;
        if (data && active) {
          setRole(data.role);
        }
      } catch (err) {
        console.error('Error fetching role in Header:', err);
      }
    };

    const initAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && active) {
        setUser(user);
        await getProfile(user.id);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!active) return;
      if (session?.user) {
        setUser(session.user);
        await getProfile(session.user.id);
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    localStorage.removeItem('impersonatedClientId');
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Close dropdowns on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
    setMobileOpen(false);
  }, [location]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img fetchPriority="high"
              src="/images/official logo of acquans ventures.png"
              alt="Acquans Ventures"
              width="160"
              height="64"
              className="h-12 lg:h-16 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              
              if (link.dropdown) {
                return (
                  <div key={link.path} className="relative dropdown-container">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                        ? 'text-primary bg-primary/5 border border-primary/20'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                        }`}
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 pt-2 animate-fade-in">
                        <div className="bg-slate-50 rounded-xl shadow-xl border border-border py-2 w-64 flex flex-col">
                          {link.dropdown.map((sublink) => (
                            <Link
                              key={sublink.path}
                              to={sublink.path}
                              onClick={() => setDropdownOpen(false)}
                              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-white hover:bg-primary transition-colors"
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                    ? 'text-primary bg-primary/5 border border-primary/20'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/request-quote"
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-black text-primary font-bold rounded-lg hover:bg-gray-50 transition-all active:scale-95"
            >
              Get Quotation
            </Link>
            {user ? (
              <>
                <Link
                  to={
                    role === 'admin'
                      ? '/admin-dashboard'
                      : role === 'project_team'
                      ? '/team-dashboard'
                      : '/client-dashboard'
                  }
                  className="flex items-center gap-2 btn-primary py-2.5"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-50/50 border-2 border-red-500 hover:bg-red-600 hover:border-red-600 text-red-600 hover:text-white rounded-lg text-base font-bold transition-all active:scale-95 shadow-sm"
                  title="Log Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 btn-primary py-2.5"
              >
                Login <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-12 h-12 bg-primary text-white rounded-xl shadow-lg hover:bg-primary-dark transition-all active:scale-95"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50/95 backdrop-blur-md">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                
                if (link.dropdown) {
                  return (
                    <div key={link.path} className="flex flex-col gap-1">
                      <button
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className={`px-4 py-3 rounded-md text-base font-medium flex items-center justify-between transition-colors ${isActive || mobileDropdownOpen
                          ? 'text-primary bg-primary/5'
                          : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                          }`}
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Mobile Dropdown Sublinks */}
                      {mobileDropdownOpen && (
                        <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20 ml-4 mb-2 animate-fade-in">
                          {link.dropdown.map((sublink) => (
                            <Link
                              key={sublink.path}
                              to={sublink.path}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileDropdownOpen(false);
                              }}
                              className="px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors"
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${isActive
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 px-4 pb-2 space-y-3">
              <Link
                to="/request-quote"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-black text-primary font-bold rounded-xl"
              >
                Get Quotation
              </Link>
              {user ? (
                <>
                  <Link
                    to={
                      role === 'admin'
                        ? '/admin-dashboard'
                        : role === 'project_team'
                        ? '/team-dashboard'
                        : '/client-dashboard'
                    }
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50/50 border-2 border-red-500 text-red-600 font-bold rounded-xl transition-all hover:bg-red-600 hover:border-red-600 hover:text-white"
                  >
                    <LogOut className="h-4 w-4" /> Log Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  Login <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[24px] shadow-2xl overflow-hidden p-6 text-center border border-gray-150"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Log Out</h3>
              <p className="text-gray-500 text-sm mb-6 font-medium leading-relaxed">
                Are you sure you want to log out of your dashboard? You will need to enter your credentials to log in again.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-200 hover:bg-gray-50 rounded-xl font-bold text-sm text-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-600/20 transition-all"
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
