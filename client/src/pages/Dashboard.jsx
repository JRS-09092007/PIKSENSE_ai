import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  ScanLine, Mic, Users, Bell, Sparkles, Activity, CloudSun, Wind,
  AlertTriangle, ChevronRight, ShieldCheck, ArrowUpRight, Thermometer, Droplets
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { t, T, language, scans, showToast, setIsVoiceOpen } = useApp();
  const navigate = useNavigate();

  const weatherForecast = [
    { day: 'Today', temp: '29°C', humidity: '78%', wind: '12 km/h', risk: 'low', text: 'Optimal Growth' },
    { day: 'Tomorrow', temp: '31°C', humidity: '85%', wind: '18 km/h', risk: 'medium', text: 'High Humidity Blight Alert' },
    { day: 'Thu', temp: '28°C', humidity: '72%', wind: '10 km/h', risk: 'low', text: 'Good Weather' },
    { day: 'Fri', temp: '32°C', humidity: '88%', wind: '22 km/h', risk: 'high', text: 'Fungal Outbreak Risk' },
    { day: 'Sat', temp: '30°C', humidity: '70%', wind: '14 km/h', risk: 'low', text: 'Clear Sky' }
  ];

  return (
    <div className="pb-32 lg:pb-12 px-4 sm:px-6 pt-6 max-w-7xl mx-auto animate-slide-up space-y-6">
      {/* Top Welcome & Health Score Banner */}
      <div className="glass-card p-6 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-surface-900 to-teal-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
              <Sparkles size={14} className="text-emerald-400" /> {t('ai_agronomist_active')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            {t('greeting')}, <span className="text-emerald-400">{user?.name || t('role_farmer')}</span> 👋
          </h1>
          <p className="text-xs sm:text-sm text-surface-300 max-w-lg font-medium">
            <T text={`Your farm location in ${user?.region || 'Ratnagiri'} is showing high productivity. 0 active crop diseases detected today.`} />
          </p>
        </div>

        {/* Health Score Ring Widget */}
        <div className="flex items-center gap-4 z-10 self-stretch sm:self-auto bg-white/3 p-4 rounded-2xl border border-white/5">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex flex-col items-center justify-center text-center shadow-lg glow-emerald shrink-0">
            <span className="text-lg font-extrabold text-white leading-none">88%</span>
            <span className="text-[9px] font-bold text-emerald-300 uppercase">{t('health_index')}</span>
          </div>
          <div>
            <p className="text-xs font-extrabold text-white uppercase tracking-wider">{t('optimal_state')}</p>
            <p className="text-xs text-emerald-300 font-bold mt-0.5 flex items-center gap-1">
              <ShieldCheck size={14} /> {t('crops_protected')}
            </p>
            <p className="text-[11px] text-surface-400 mt-1">Mango • Rice • Tomato</p>
          </div>
        </div>
      </div>

      {/* Quick Action Hub Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Scan Leaf */}
        <button
          onClick={() => navigate('/scan')}
          className="glass-card p-4 text-left border border-emerald-500/30 hover:border-emerald-400 transition-all card-hover group">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-2 group-hover:scale-110 transition-transform glow-emerald">
            <ScanLine size={20} />
          </div>
          <p className="font-extrabold text-white text-xs font-heading group-hover:text-emerald-300">{t('scan_crop')}</p>
          <p className="text-[10px] text-surface-400 mt-0.5">{t('ai_disease_scan')}</p>
        </button>

        {/* Pest Traps */}
        <button
          onClick={() => navigate('/pest-sensors')}
          className="glass-card p-4 text-left border border-amber-500/30 hover:border-amber-400 transition-all card-hover group">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-2 group-hover:scale-110 transition-transform">
            <Activity size={20} />
          </div>
          <p className="font-extrabold text-white text-xs font-heading group-hover:text-amber-300">{t('pest_traps')}</p>
          <p className="text-[10px] text-surface-400 mt-0.5">{t('sensor_counts')}</p>
        </button>

        {/* Risk Matrix */}
        <button
          onClick={() => navigate('/risk-intelligence')}
          className="glass-card p-4 text-left border border-cyan-500/30 hover:border-cyan-400 transition-all card-hover group">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-2 group-hover:scale-110 transition-transform">
            <Thermometer size={20} />
          </div>
          <p className="font-extrabold text-white text-xs font-heading group-hover:text-cyan-300">{t('risk_matrix')}</p>
          <p className="text-[10px] text-surface-400 mt-0.5">{t('five_factor_intel')}</p>
        </button>

        {/* Hotspot Map */}
        <button
          onClick={() => navigate('/map')}
          className="glass-card p-4 text-left border border-rose-500/30 hover:border-rose-400 transition-all card-hover group">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-2 group-hover:scale-110 transition-transform">
            <AlertTriangle size={20} />
          </div>
          <p className="font-extrabold text-white text-xs font-heading group-hover:text-rose-300">{t('nav_map')}</p>
          <p className="text-[10px] text-surface-400 mt-0.5">{t('district_hotspots')}</p>
        </button>

        {/* Consult Experts */}
        <button
          onClick={() => navigate('/experts')}
          className="glass-card p-4 text-left border border-blue-500/30 hover:border-blue-400 transition-all card-hover group">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 mb-2 group-hover:scale-110 transition-transform">
            <Users size={20} />
          </div>
          <p className="font-extrabold text-white text-xs font-heading group-hover:text-blue-300">{t('ask_expert')}</p>
          <p className="text-[10px] text-surface-400 mt-0.5">{t('krishi_sevak_advice')}</p>
        </button>

        {/* Follow-up Timeline */}
        <button
          onClick={() => navigate('/followup-timeline')}
          className="glass-card p-4 text-left border border-purple-500/30 hover:border-purple-400 transition-all card-hover group">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mb-2 group-hover:scale-110 transition-transform">
            <ShieldCheck size={20} />
          </div>
          <p className="font-extrabold text-white text-xs font-heading group-hover:text-purple-300">{t('follow_up')}</p>
          <p className="text-[10px] text-surface-400 mt-0.5">{t('recovery_track')}</p>
        </button>
      </div>

      {/* 5-Day Microclimate Weather Forecast Widget */}
      <div className="glass-card p-6 border border-emerald-500/20 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white font-heading flex items-center gap-2">
              <CloudSun className="text-cyan-400" size={20} /> {t('five_day_forecast')}
            </h2>
            <p className="text-xs text-surface-400">{t('microclimate_analysis')}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
            <T text={user?.region || 'Ratnagiri'} /> Station
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {weatherForecast.map((w, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border text-center transition-all ${
              w.risk === 'high'
                ? 'bg-danger-500/10 border-danger-500/30'
                : w.risk === 'medium'
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-white/3 border-white/5'
            }`}>
              <p className="text-xs font-extrabold text-white uppercase tracking-wider"><T text={w.day} /></p>
              <p className="text-xl font-extrabold text-white font-heading my-1">{w.temp}</p>
              <div className="flex items-center justify-center gap-2 text-[11px] text-surface-400 font-medium">
                <span className="flex items-center gap-0.5"><Droplets size={12} className="text-cyan-400" />{w.humidity}</span>
                <span className="flex items-center gap-0.5"><Wind size={12} className="text-emerald-400" />{w.wind}</span>
              </div>
              <p className={`text-[10px] font-bold mt-2 truncate ${
                w.risk === 'high' ? 'text-danger-300' : w.risk === 'medium' ? 'text-amber-300' : 'text-emerald-300'
              }`}>
                <T text={w.text} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Scans Activity Section */}
      <div className="glass-card p-6 space-y-4 border border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white font-heading flex items-center gap-2">
            <Activity className="text-emerald-400" size={20} /> {t('recent_activity')}
          </h2>
          <button onClick={() => navigate('/history')} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            {t('view_all')} <ChevronRight size={14} />
          </button>
        </div>

        {(scans || []).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(scans || []).slice(0, 4).map((s, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/3 border border-white/5 flex items-center gap-3.5 card-hover">
                <img src={s.image_url} alt="Scan" className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-white text-sm truncate font-heading"><T text={s.detections?.[0]?.class_name || 'Healthy Crop'} /></p>
                  <p className="text-xs text-surface-400"><T text={s.crop_type?.toUpperCase()} /> • {t('confidence')}: <span className="text-emerald-400 font-bold">{s.detections?.[0]?.confidence || 95}%</span></p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 glass-card p-6 border border-white/5 space-y-3">
            <p className="text-sm text-surface-400">{t('no_recent_activity')}</p>
            <button onClick={() => navigate('/scan')} className="btn-primary max-w-xs mx-auto text-xs py-3">
              <ScanLine size={16} /> {t('start_first_scan')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
