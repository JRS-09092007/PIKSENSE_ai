import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { LogIn, Sparkles } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(emailOrPhone, password);
    if (res.success) navigate('/dashboard');
    else setError(res.error);
  };

  return (
    <div className="min-h-screen min-h-dvh p-4 flex items-center justify-center bg-[#090e17] relative">
      <div className="w-full max-w-md animate-slide-up space-y-6">
        <div className="flex justify-end">
          <LanguageSwitcher compact />
        </div>

        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-400 via-primary-500 to-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-2xl glow-emerald border border-white/20">
            <Sparkles size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-heading">pikSense <span className="text-primary-400">AI</span></h1>
          <p className="text-surface-400 text-sm mt-1">Demo Access: <span className="text-primary-300 font-mono">rajesh@example.com / farmer123</span></p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5 border border-emerald-500/20 shadow-2xl">
          {error && (
            <div className="bg-danger-500/15 border border-danger-500/30 text-danger-300 text-xs p-4 rounded-2xl animate-slide-up font-bold">
              {error}
            </div>
          )}
          <div>
            <label className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1.5 block">{t('phone')} / {t('email')}</label>
            <input
              type="text"
              placeholder="Enter phone or email"
              value={emailOrPhone}
              onChange={e => setEmailOrPhone(e.target.value)}
              className="glass-input"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1.5 block">{t('password')}</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="glass-input"
            />
          </div>
          <button type="submit" className="btn-primary mt-2 py-4 text-base font-extrabold">
            <LogIn size={20} /> {t('login')}
          </button>
          <p className="text-center text-xs text-surface-400 pt-2 font-medium">
            {t('dont_have_account')}{' '}
            <Link to="/register" className="text-primary-400 font-bold hover:text-primary-300 transition-colors underline">{t('register')}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
