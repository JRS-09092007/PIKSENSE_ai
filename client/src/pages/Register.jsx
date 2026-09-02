import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { UserPlus, Leaf } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const STATES = ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Gujarat', 'Madhya Pradesh', 'Uttar Pradesh', 'Rajasthan', 'Punjab', 'Haryana'];
const DISTRICTS = { Maharashtra: ['Nashik', 'Pune', 'Ratnagiri', 'Aurangabad', 'Nagpur', 'Kolhapur'], Karnataka: ['Bengaluru', 'Mysuru', 'Dharwad'], 'Andhra Pradesh': ['Guntur', 'Krishna'], 'Tamil Nadu': ['Coimbatore', 'Salem'], Gujarat: ['Ahmedabad', 'Surat'], 'Madhya Pradesh': ['Indore', 'Bhopal'], 'Uttar Pradesh': ['Lucknow', 'Varanasi'], Rajasthan: ['Jaipur', 'Jodhpur'], Punjab: ['Ludhiana', 'Amritsar'], Haryana: ['Hisar', 'Karnal'] };

export default function Register() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', state: '', region: '', language: 'en' });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { t, setLanguage } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) { setError('Please accept the consent checkbox'); return; }
    if (!form.name || !form.phone || !form.password) { setError('Please fill all required fields'); return; }
    setLanguage(form.language);
    const res = register(form);
    if (res.success) navigate('/select-crops');
    else setError(res.error);
  };

  return (
    <div className="min-h-screen min-h-dvh p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-5 shadow-2xl" style={{ boxShadow: '0 12px 40px rgba(16,185,129,0.3)' }}>
            <Leaf size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{t('register')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-4">
          <LanguageSwitcher compact />
          {error && <div className="bg-danger-500/10 border border-danger-500/20 text-danger-400 text-sm p-3 rounded-2xl">{error}</div>}

          <input type="text" placeholder={t('name') + ' *'} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="glass-input" />
          <input type="tel" placeholder={t('phone') + ' *'} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="glass-input" />
          <input type="email" placeholder={t('email')} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="glass-input" />
          <input type="password" placeholder={t('password') + ' *'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="glass-input" />

          <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value, region: '' })} className="glass-input">
            <option value="">{t('state')}</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {form.state && (
            <select value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} className="glass-input">
              <option value="">{t('region')}</option>
              {(DISTRICTS[form.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          )}

          <label className="flex items-start gap-3 p-3 rounded-2xl bg-white/3 border border-white/5 cursor-pointer">
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="w-5 h-5 mt-0.5 rounded accent-primary-500" />
            <span className="text-sm text-surface-300">{t('consent_text')}</span>
          </label>

          <button type="submit" className="btn-primary">
            <UserPlus size={20} /> {t('register')}
          </button>

          <p className="text-center text-sm text-surface-400 pt-1">
            {t('already_have_account')}{' '}
            <Link to="/login" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">{t('login')}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
