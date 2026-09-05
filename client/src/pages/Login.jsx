import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { LogIn, Sparkles, UserPlus, CheckCircle2, ArrowRight, KeyRound, Phone, UserCheck } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Login() {
  const [role, setRole] = useState('farmer');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, DEFAULT_USERS } = useAuth();
  const { t, showToast } = useApp();
  const navigate = useNavigate();

  const handleRoleSelect = (newRole) => {
    setRole(newRole);
    setError('');
  };

  const handleQuickDemo = (demoRole) => {
    setRole(demoRole);
    const demo = DEFAULT_USERS.find(u => u.role === demoRole) || DEFAULT_USERS[0];
    setEmailOrPhone(demo.email);
    setPassword(demo.password);
    setError('');
    showToast(`Loaded demo credentials for ${demoRole === 'officer' ? 'Govt Official' : demoRole === 'extension' ? 'Field Officer' : 'Farmer'}`, 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = login(emailOrPhone, password, role);
    if (res.success) {
      showToast(`Welcome back, ${res.user.name}! Accessing ${
        res.user.role === 'officer' ? 'Govt Officer Command Center' : res.user.role === 'extension' ? 'Extension Field Portal' : 'Farmer Portal'
      }`, 'success');
      if (res.user.role === 'officer') {
        navigate('/admin-dashboard');
      } else if (res.user.role === 'extension') {
        navigate('/extension-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(res.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen p-4 py-8 flex items-center justify-center bg-[#030d0a] relative">
      <div className="w-full max-w-xl animate-slide-up space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Govt of Maharashtra • Dual Portal System
          </span>
          <LanguageSwitcher compact />
        </div>

        <div className="text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 flex items-center justify-center mx-auto mb-3 shadow-2xl glow-emerald border border-white/20">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">
            पीक<span className="text-emerald-400">Sense</span> Portal Login
          </h1>
          <p className="text-slate-400 text-xs mt-1">Please log in to your account or register to access the platform</p>
        </div>

        {/* Role Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Farmer Card */}
          <button
            type="button"
            onClick={() => handleRoleSelect('farmer')}
            className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              role === 'farmer'
                ? 'bg-emerald-500/20 border-emerald-500/50 shadow-xl glow-emerald ring-2 ring-emerald-400'
                : 'bg-white/3 border-white/10 opacity-70 hover:opacity-100 hover:bg-white/8'
            }`}>
            <span className="text-2xl mb-2">🌾</span>
            <div>
              <p className="font-extrabold text-white text-xs font-heading">I'm a Farmer</p>
              <p className="text-[10px] text-slate-300 font-medium">शेतकरी पोर्टल</p>
            </div>
          </button>

          {/* Extension Worker Card */}
          <button
            type="button"
            onClick={() => handleRoleSelect('extension')}
            className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              role === 'extension'
                ? 'bg-blue-500/20 border-blue-500/50 shadow-xl ring-2 ring-blue-400'
                : 'bg-white/3 border-white/10 opacity-70 hover:opacity-100 hover:bg-white/8'
            }`}>
            <span className="text-2xl mb-2">🧑‍🌾</span>
            <div>
              <p className="font-extrabold text-white text-xs font-heading">Field Officer</p>
              <p className="text-[10px] text-slate-300 font-medium">कृषी सेवक</p>
            </div>
          </button>

          {/* Dept Officer Card */}
          <button
            type="button"
            onClick={() => handleRoleSelect('officer')}
            className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              role === 'officer'
                ? 'bg-amber-500/20 border-amber-500/50 shadow-xl ring-2 ring-amber-400'
                : 'bg-white/3 border-white/10 opacity-70 hover:opacity-100 hover:bg-white/8'
            }`}>
            <span className="text-2xl mb-2">🏛️</span>
            <div>
              <p className="font-extrabold text-white text-xs font-heading">Govt Official</p>
              <p className="text-[10px] text-slate-300 font-medium">शासकीय अधिकारी</p>
            </div>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4 border border-emerald-500/20 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5 font-heading">
              {role === 'officer' ? (
                <>🏛️ Agriculture Department Official Access</>
              ) : role === 'extension' ? (
                <>🧑‍🌾 Krishi Sevak Field Officer Access</>
              ) : (
                <>🌾 Farmer Portal Access</>
              )}
            </span>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs p-3.5 rounded-2xl font-bold flex items-start gap-2 animate-shake">
              <span className="text-sm">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 block flex items-center gap-1">
              <Phone size={13} className="text-emerald-400" />
              {role === 'officer' ? 'Official Govt Email / Mobile Number' : role === 'extension' ? 'Krishi Sevak ID / Mobile Number' : 'Farmer Mobile / Email'}
            </label>
            <input
              type="text"
              placeholder="Enter your registered mobile or email"
              value={emailOrPhone}
              onChange={e => setEmailOrPhone(e.target.value)}
              className="glass-input text-xs"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 block flex items-center gap-1">
              <KeyRound size={13} className="text-emerald-400" /> Password
            </label>
            <input
              type="password"
              placeholder="Enter account password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="glass-input text-xs"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3.5 rounded-2xl font-extrabold text-sm text-white shadow-xl flex items-center justify-center gap-2 transition-all glow-emerald ${
              role === 'officer'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500'
                : role === 'extension'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600'
            }`}>
            <LogIn size={18} />
            <span>Login & Access Portal</span>
            <ArrowRight size={18} />
          </button>

          {/* Registration Prompt Link */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
            <p className="text-xs text-slate-300 font-medium">
              Don't have a registered account yet?
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-400 hover:text-emerald-300 underline transition-colors">
              <UserPlus size={14} />
              <span>Create New Account / Register Here</span>
            </Link>
          </div>

          {/* Quick Demo Credentials Assistant */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-300 space-y-2">
            <p className="font-bold text-white text-[11px] flex items-center gap-1">
              <UserCheck size={13} className="text-emerald-400" /> Quick Demo Login Preset:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('farmer')}
                className="py-1.5 px-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 text-[10px] font-bold text-emerald-300 transition-all">
                🌾 Demo Farmer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('extension')}
                className="py-1.5 px-2 rounded-xl bg-white/5 hover:bg-blue-500/20 border border-white/10 text-[10px] font-bold text-blue-300 transition-all">
                🧑‍🌾 Demo Sevak
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('officer')}
                className="py-1.5 px-2 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 text-[10px] font-bold text-amber-300 transition-all">
                🏛️ Demo Officer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

