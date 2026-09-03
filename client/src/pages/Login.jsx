import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { LogIn, Sparkles, Building2, User, CheckCircle2 } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Login() {
  const [role, setRole] = useState('farmer');
  const [emailOrPhone, setEmailOrPhone] = useState('rajesh@example.com');
  const [password, setPassword] = useState('farmer123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t, showToast } = useApp();
  const navigate = useNavigate();

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    if (newRole === 'officer') {
      setEmailOrPhone('officer@gov.in');
      setPassword('officer123');
    } else {
      setEmailOrPhone('rajesh@example.com');
      setPassword('farmer123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(emailOrPhone, password, role);
    if (res.success) {
      showToast(`Welcome ${res.user.name}! Accessing ${role === 'officer' ? 'Govt Officer Operations Portal' : 'Farmer Portal'}`, 'success');
      if (res.user.role === 'officer') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen min-h-dvh p-4 flex items-center justify-center bg-[#061410] relative">
      <div className="w-full max-w-md animate-slide-up space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
            SIH 2024 Dual-Portal
          </span>
          <LanguageSwitcher compact />
        </div>

        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-400 via-primary-500 to-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-2xl glow-emerald border border-white/20">
            <Sparkles size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-heading">pikSense <span className="text-primary-400">AI</span></h1>
          <p className="text-surface-400 text-xs mt-1">AI Crop Health & Government Agriculture Administration</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="glass-card p-1.5 flex gap-1.5 border border-white/10 rounded-2xl">
          <button
            type="button"
            onClick={() => handleRoleSwitch('farmer')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              role === 'farmer'
                ? 'bg-primary-500/25 text-primary-300 border border-primary-500/40 shadow-lg glow-emerald'
                : 'text-surface-400 hover:text-surface-200 hover:bg-white/5'
            }`}>
            <User size={16} /> 🌾 {t('role_farmer')}
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch('officer')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              role === 'officer'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-lg'
                : 'text-surface-400 hover:text-surface-200 hover:bg-white/5'
            }`}>
            <Building2 size={16} /> 🏛️ {t('login_as_officer')}
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5 border border-emerald-500/20 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
              {role === 'officer' ? <Building2 size={14} className="text-amber-400" /> : <User size={14} className="text-primary-400" />}
              {role === 'officer' ? 'Govt Officer Access' : 'Farmer Access'}
            </span>
            <span className="text-[10px] text-surface-400 font-mono bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
              {role === 'officer' ? 'DAO / KVK Level' : 'Individual Farm Level'}
            </span>
          </div>

          {error && (
            <div className="bg-danger-500/15 border border-danger-500/30 text-danger-300 text-xs p-4 rounded-2xl animate-slide-up font-bold">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1.5 block">
              {role === 'officer' ? 'Official Govt ID / Phone' : `${t('phone')} / ${t('email')}`}
            </label>
            <input
              type="text"
              placeholder={role === 'officer' ? 'officer@gov.in' : 'Enter phone or email'}
              value={emailOrPhone}
              onChange={e => setEmailOrPhone(e.target.value)}
              className="glass-input text-sm"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1.5 block">{t('password')}</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="glass-input text-sm"
              required
            />
          </div>

          <button type="submit" className={`btn-primary mt-2 py-4 text-base font-extrabold ${role === 'officer' ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 border-amber-400/40' : ''}`}>
            <LogIn size={20} /> {role === 'officer' ? 'Enter Officer Portal' : t('login')}
          </button>

          {/* Quick Demo Autofill helper */}
          <div className="p-3 rounded-2xl bg-white/3 border border-white/5 text-xs text-surface-400 space-y-1">
            <p className="font-bold text-white flex items-center gap-1">
              <CheckCircle2 size={12} className="text-primary-400" /> Demo Credentials Pre-Loaded:
            </p>
            {role === 'officer' ? (
              <p className="text-[11px]">Officer: <span className="text-amber-300 font-mono">officer@gov.in</span> / Pass: <span className="text-amber-300 font-mono">officer123</span></p>
            ) : (
              <p className="text-[11px]">Farmer: <span className="text-primary-300 font-mono">rajesh@example.com</span> / Pass: <span className="text-primary-300 font-mono">farmer123</span></p>
            )}
          </div>

          <p className="text-center text-xs text-surface-400 pt-1 font-medium">
            {t('dont_have_account')}{' '}
            <Link to="/register" className="text-primary-400 font-bold hover:text-primary-300 transition-colors underline">{t('register')}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
