import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { UserPlus, Leaf, Building2, User, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const STATES = ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Gujarat', 'Madhya Pradesh', 'Uttar Pradesh'];
const DISTRICTS = {
  Maharashtra: ['Nashik', 'Pune', 'Ratnagiri', 'Chhatrapati Sambhaji Nagar', 'Nagpur', 'Kolhapur', 'Amravati', 'Dharashiv', 'Solapur'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Dharwad'],
  'Andhra Pradesh': ['Guntur', 'Krishna'],
  'Tamil Nadu': ['Coimbatore', 'Salem'],
  Gujarat: ['Ahmedabad', 'Surat'],
  'Madhya Pradesh': ['Indore', 'Bhopal'],
  'Uttar Pradesh': ['Lucknow', 'Varanasi']
};

export default function Register() {
  const [role, setRole] = useState('farmer');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    state: 'Maharashtra',
    region: 'Nashik',
    language: 'mr',
    department: 'Department of Agriculture, Govt of Maharashtra',
    designation: '',
    govCode: ''
  });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { t, setLanguage, showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) { setError('Please accept the data consent checkbox'); return; }
    if (!form.name || !form.phone || !form.password) { setError('Please fill all required fields'); return; }

    setLanguage(form.language);
    const res = register({ ...form, role });
    if (res.success) {
      showToast(`Account registered successfully as ${role === 'officer' ? 'Govt Agriculture Officer' : role === 'extension' ? 'Field Extension Officer' : 'Farmer'}!`, 'success');
      if (role === 'officer') navigate('/admin-dashboard');
      else if (role === 'extension') navigate('/extension-dashboard');
      else navigate('/select-crops');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen p-4 py-8 flex items-center justify-center bg-[#030d0a] relative">
      <div className="w-full max-w-xl animate-slide-up space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Govt of Maharashtra • Registration Portal
          </span>
          <LanguageSwitcher compact />
        </div>

        <div className="text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 flex items-center justify-center mx-auto mb-3 shadow-2xl glow-emerald border border-white/20">
            <UserPlus size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-heading">
            Create Portal Account
          </h1>
          <p className="text-slate-400 text-xs mt-1">Select your account role and complete registration</p>
        </div>

        {/* Role Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setRole('farmer')}
            className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              role === 'farmer'
                ? 'bg-emerald-500/20 border-emerald-500/50 shadow-xl glow-emerald ring-2 ring-emerald-400'
                : 'bg-white/3 border-white/10 opacity-70 hover:opacity-100 hover:bg-white/8'
            }`}>
            <span className="text-xl mb-1">🌾</span>
            <div>
              <p className="font-extrabold text-white text-xs font-heading">Farmer</p>
              <p className="text-[10px] text-slate-300">शेतकरी खाता</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole('extension')}
            className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              role === 'extension'
                ? 'bg-blue-500/20 border-blue-500/50 shadow-xl ring-2 ring-blue-400'
                : 'bg-white/3 border-white/10 opacity-70 hover:opacity-100 hover:bg-white/8'
            }`}>
            <span className="text-xl mb-1">🧑‍🌾</span>
            <div>
              <p className="font-extrabold text-white text-xs font-heading">Field Officer</p>
              <p className="text-[10px] text-slate-300">कृषी सेवक</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole('officer')}
            className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              role === 'officer'
                ? 'bg-amber-500/20 border-amber-500/50 shadow-xl ring-2 ring-amber-400'
                : 'bg-white/3 border-white/10 opacity-70 hover:opacity-100 hover:bg-white/8'
            }`}>
            <span className="text-xl mb-1">🏛️</span>
            <div>
              <p className="font-extrabold text-white text-xs font-heading">Govt Official</p>
              <p className="text-[10px] text-slate-300">शासकीय अधिकारी</p>
            </div>
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4 border border-emerald-500/20 shadow-2xl">
          {error && <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs p-3 rounded-xl font-bold">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Full Name (पूर्ण नाव) *"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="glass-input text-xs"
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number *"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="glass-input text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="email"
              placeholder={role === 'farmer' ? 'Email Address (Optional)' : 'Official Email (@mahacrop.gov.in) *'}
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="glass-input text-xs"
            />
            <input
              type="password"
              placeholder="Account Password *"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="glass-input text-xs"
              required
            />
          </div>

          {/* Departmental Authorization Fields for Officers */}
          {role !== 'farmer' && (
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-300 font-heading">
                <ShieldCheck size={16} /> Official Department Verification
              </div>
              <input
                type="text"
                placeholder="Department Name (e.g. Dept of Agriculture, KVK Nashik)"
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
                className="glass-input text-xs"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Designation (e.g. District Agriculture Officer / DAO)"
                  value={form.designation}
                  onChange={e => setForm({ ...form, designation: e.target.value })}
                  className="glass-input text-xs"
                />
                <input
                  type="text"
                  placeholder="Govt Badge / Employee ID"
                  value={form.govCode}
                  onChange={e => setForm({ ...form, govCode: e.target.value })}
                  className="glass-input text-xs font-mono"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value, region: '' })} className="glass-input text-xs bg-surface-900">
              <option value="">Select State</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} className="glass-input text-xs bg-surface-900">
              <option value="">Select District</option>
              {(DISTRICTS[form.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <label className="flex items-start gap-3 p-3 rounded-2xl bg-black/40 border border-white/5 cursor-pointer">
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="w-4 h-4 mt-0.5 rounded accent-emerald-500" />
            <span className="text-[11px] text-slate-300 font-medium">I agree to share agricultural & field telemetry data with the Department of Agriculture, Govt of Maharashtra.</span>
          </label>

          <button
            type="submit"
            className={`w-full py-3.5 rounded-2xl font-extrabold text-sm text-white shadow-xl flex items-center justify-center gap-2 transition-all glow-emerald ${
              role === 'officer'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500'
                : role === 'extension'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600'
            }`}>
            <UserPlus size={18} />
            <span>Complete Registration</span>
            <ArrowRight size={18} />
          </button>

          <p className="text-center text-xs text-slate-400 pt-1 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors underline">Login Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

