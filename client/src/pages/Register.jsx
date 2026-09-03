import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { UserPlus, Leaf, Building2, User } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const STATES = ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Gujarat', 'Madhya Pradesh', 'Uttar Pradesh', 'Rajasthan', 'Punjab', 'Haryana'];
const DISTRICTS = { Maharashtra: ['Nashik', 'Pune', 'Ratnagiri', 'Aurangabad', 'Nagpur', 'Kolhapur'], Karnataka: ['Bengaluru', 'Mysuru', 'Dharwad'], 'Andhra Pradesh': ['Guntur', 'Krishna'], 'Tamil Nadu': ['Coimbatore', 'Salem'], Gujarat: ['Ahmedabad', 'Surat'], 'Madhya Pradesh': ['Indore', 'Bhopal'], 'Uttar Pradesh': ['Lucknow', 'Varanasi'], Rajasthan: ['Jaipur', 'Jodhpur'], Punjab: ['Ludhiana', 'Amritsar'], Haryana: ['Hisar', 'Karnal'] };

export default function Register() {
  const [role, setRole] = useState('farmer');
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', state: 'Maharashtra', region: 'Nashik', language: 'en', department: '', designation: '' });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { t, setLanguage } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) { setError('Please accept the data consent checkbox'); return; }
    if (!form.name || !form.phone || !form.password) { setError('Please fill all required fields'); return; }
    setLanguage(form.language);
    const res = register({ ...form, role });
    if (res.success) {
      if (role === 'officer') navigate('/admin-dashboard');
      else navigate('/select-crops');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen min-h-dvh p-4 flex items-center justify-center bg-[#061410]">
      <div className="w-full max-w-md space-y-5 animate-slide-up">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
            SIH 2024 Portal
          </span>
          <LanguageSwitcher compact />
        </div>

        <div className="text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary-400 via-primary-500 to-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-2xl glow-emerald border border-white/20">
            <Leaf size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">{t('register')}</h1>
          <p className="text-surface-400 text-xs mt-0.5">Register as a Farmer or Government Agriculture Official</p>
        </div>

        {/* Role Switcher */}
        <div className="glass-card p-1.5 flex gap-1.5 border border-white/10 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('farmer')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              role === 'farmer'
                ? 'bg-primary-500/25 text-primary-300 border border-primary-500/40 shadow-lg glow-emerald'
                : 'text-surface-400 hover:text-surface-200'
            }`}>
            <User size={14} /> 🌾 {t('role_farmer')}
          </button>
          <button
            type="button"
            onClick={() => setRole('officer')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              role === 'officer'
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-lg'
                : 'text-surface-400 hover:text-surface-200'
            }`}>
            <Building2 size={14} /> 🏛️ Govt Officer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4 border border-emerald-500/20 shadow-2xl">
          {error && <div className="bg-danger-500/15 border border-danger-500/30 text-danger-300 text-xs p-3.5 rounded-2xl font-bold">{error}</div>}

          <input type="text" placeholder={t('name') + ' *'} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="glass-input text-sm" required />
          <input type="tel" placeholder={t('phone') + ' *'} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="glass-input text-sm" required />
          <input type="email" placeholder={role === 'officer' ? 'Official Govt Email (e.g. officer@gov.in)' : t('email')} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="glass-input text-sm" />
          <input type="password" placeholder={t('password') + ' *'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="glass-input text-sm" required />

          {role === 'officer' && (
            <>
              <input type="text" placeholder="Government Department (e.g. Dept of Agriculture)" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="glass-input text-sm" />
              <input type="text" placeholder="Designation (e.g. District Agriculture Officer)" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} className="glass-input text-sm" />
            </>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value, region: '' })} className="glass-input text-xs">
              <option value="">{t('state')}</option>
              {STATES.map(s => <option key={s} value={s} className="bg-surface-900">{s}</option>)}
            </select>

            <select value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} className="glass-input text-xs">
              <option value="">{t('region')}</option>
              {(DISTRICTS[form.state] || []).map(d => <option key={d} value={d} className="bg-surface-900">{d}</option>)}
            </select>
          </div>

          <label className="flex items-start gap-3 p-3 rounded-2xl bg-white/3 border border-white/5 cursor-pointer">
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="w-5 h-5 mt-0.5 rounded accent-primary-500" />
            <span className="text-xs text-surface-300">{t('consent_text')}</span>
          </label>

          <button type="submit" className={`btn-primary ${role === 'officer' ? 'bg-gradient-to-r from-amber-600 to-yellow-600 border-amber-400/40' : ''}`}>
            <UserPlus size={20} /> {role === 'officer' ? 'Register Officer Account' : t('register')}
          </button>

          <p className="text-center text-xs text-surface-400 pt-1 font-medium">
            {t('already_have_account')}{' '}
            <Link to="/login" className="text-primary-400 font-bold hover:text-primary-300 transition-colors underline">{t('login')}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
