import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { mockWeather } from '../utils/diseaseData';
import {
  ScanLine, Mic, AlertTriangle, Cloud, Droplets, Wind, ChevronRight,
  Calendar, MapPin, TrendingUp, ShieldCheck, Sparkles, UserCheck, Flame, ArrowUpRight
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { t, scanHistory, setIsVoiceOpen, language } = useApp();
  const navigate = useNavigate();
  const w = mockWeather;

  const riskStyles = {
    low: { card: 'border-primary-500/30 bg-primary-500/10', badge: 'bg-primary-500/20 text-primary-300 border-primary-500/30', icon: 'text-primary-400' },
    medium: { card: 'border-accent-500/30 bg-accent-500/10', badge: 'bg-accent-500/20 text-accent-300 border-accent-500/30', icon: 'text-accent-400' },
    high: { card: 'border-danger-500/30 bg-danger-500/10', badge: 'bg-danger-500/20 text-danger-300 border-danger-500/30', icon: 'text-danger-400' },
  };
  const riskLabels = { low: t('risk_low'), medium: t('risk_medium'), high: t('risk_high') };
  const rs = riskStyles[w.risk_level] || riskStyles.low;
  const lastScan = scanHistory[0];

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'hi') {
      if (hour < 12) return { text: 'शुभ प्रभात', icon: '☀️' };
      if (hour < 17) return { text: 'शुभ दोपहर', icon: '🌤️' };
      return { text: 'शुभ संध्या', icon: '🌙' };
    }
    if (language === 'mr') {
      if (hour < 12) return { text: 'शुभ सकाळ', icon: '☀️' };
      if (hour < 17) return { text: 'शुभ दुपार', icon: '🌤️' };
      return { text: 'शुभ संध्याकाळ', icon: '🌙' };
    }
    if (hour < 12) return { text: 'Good Morning', icon: '☀️' };
    if (hour < 17) return { text: 'Good Afternoon', icon: '🌤️' };
    return { text: 'Good Evening', icon: '🌙' };
  };
  const timeGreeting = getTimeGreeting();

  const regionalAlerts = {
    en: [
      "⚠️ Mango Anthracnose outbreak detected 12km away in Ratnagiri district. Spray Neem oil early.",
      "🌧️ High Humidity (85%) expected tomorrow — monitor Rice crops for Blast disease.",
      "👨‍🌾 4 verified experts currently online for instant video consultation."
    ],
    hi: [
      "⚠️ रत्नागिरी जिले में 12 किमी दूर आम के एंथ्रेक्नोज का प्रकोप। नीम का तेल का छिड़काव करें।",
      "🌧️ कल उच्च आर्द्रता (85%) की उम्मीद — धान की फसल पर नजर रखें।",
      "👨‍🌾 4 सत्यापित विशेषज्ञ तुरंत वीडियो परामर्श के लिए ऑनलाइन हैं।"
    ],
    mr: [
      "⚠️ रत्नागिरी जिल्ह्यात १२ किमी अंतरावर आंब्यावर करपा रोगाचा प्रादुर्भाव. कडुलिंब तेलाची फवारणी करा.",
      "🌧️ उद्या जास्त आर्द्रता (८५%) राहण्याची शक्यता — भात पिकावर लक्ष ठेवा.",
      "👨‍🌾 ४ सत्यापित तज्ञ त्वरित सल्लामसलतीसाठी ऑनलाइन उपलब्ध आहेत."
    ]
  };
  const currentTickerAlerts = regionalAlerts[language] || regionalAlerts.en;

  return (
    <div className="pb-32 lg:pb-12 px-4 sm:px-6 pt-6 max-w-4xl mx-auto space-y-6 animate-slide-up">
      {/* Hero Welcome Banner */}
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 via-surface-900/60 to-surface-900/80 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-primary-500/15 text-primary-300 text-xs font-extrabold tracking-wide uppercase flex items-center gap-1 border border-primary-500/20">
                <Sparkles size={12} className="text-primary-400" /> {t('ai_agronomist_active')}
              </span>
              <span className="text-xs text-surface-400 font-medium">{timeGreeting.icon} {timeGreeting.text}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              {t('greeting')}, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-surface-300 text-xs sm:text-sm mt-1 flex items-center gap-1.5 font-medium">
              <MapPin size={14} className="text-primary-400" /> {user?.farmSize || '5 Acres'} • {user?.region || 'Ratnagiri'}, {user?.state || 'Maharashtra'}
            </p>
          </div>

          {/* Farm Health Index Circle */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary-400" strokeDasharray="88, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-center">
                <span className="text-base font-extrabold text-white font-heading">88%</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider font-heading">{t('health_index')}</p>
              <p className="text-[11px] text-primary-300 font-semibold flex items-center gap-1">
                <ShieldCheck size={12} /> {t('optimal_state')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Regional Outbreak Ticker */}
      <div className="glass-card px-4 py-3 rounded-2xl flex items-center gap-3 border border-amber-500/20 bg-amber-500/5 overflow-hidden">
        <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase shrink-0 flex items-center gap-1 border border-amber-500/30 font-heading">
          <Flame size={12} className="animate-bounce" /> {t('regional_alert')}
        </span>
        <div className="overflow-hidden whitespace-nowrap text-xs text-amber-200/90 font-medium">
          <div className="animate-ticker space-x-8">
            {currentTickerAlerts.map((alert, idx) => (
              <span key={idx}>{alert}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Pod Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Scan Plant Pod */}
        <button onClick={() => navigate('/scan')}
          className="card-hover rounded-3xl p-5 text-left relative overflow-hidden glass-card-interactive group border border-emerald-500/30"
          style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,150,105,0.28) 100%)' }}>
          <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform glow-emerald">
            <ScanLine size={24} className="text-primary-300" />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-extrabold text-lg text-white font-heading">{t('scan_plant')}</p>
            <ArrowUpRight size={18} className="text-primary-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
          <p className="text-primary-200/70 text-xs mt-1 font-medium">{t('instant_ai_diagnosis')}</p>
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary-400/10 blur-xl pointer-events-none" />
        </button>

        {/* Voice Assistant Pod */}
        <button onClick={() => setIsVoiceOpen(true)}
          className="card-hover rounded-3xl p-5 text-left relative overflow-hidden glass-card-interactive group border border-amber-500/30"
          style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(217,119,6,0.25) 100%)' }}>
          <div className="w-12 h-12 rounded-2xl bg-accent-500/20 border border-accent-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform glow-amber">
            <Mic size={24} className="text-accent-300" />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-extrabold text-lg text-white font-heading">{t('ask_voice')}</p>
            <ArrowUpRight size={18} className="text-accent-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
          <p className="text-accent-200/70 text-xs mt-1 font-medium">{t('multilingual_advice')}</p>
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-accent-400/10 blur-xl pointer-events-none" />
        </button>

        {/* Expert Consult Pod */}
        <button onClick={() => navigate('/experts')}
          className="card-hover rounded-3xl p-5 text-left relative overflow-hidden glass-card-interactive group border border-blue-500/30"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.25) 100%)' }}>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform glow-blue">
            <UserCheck size={24} className="text-blue-300" />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-extrabold text-lg text-white font-heading">{t('consult_expert')}</p>
            <ArrowUpRight size={18} className="text-blue-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
          <p className="text-blue-200/70 text-xs mt-1 font-medium">{t('verified_doctors')}</p>
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-400/10 blur-xl pointer-events-none" />
        </button>
      </div>

      {/* Weather Risk Card */}
      <div className={`glass-card p-6 border-2 ${rs.card} shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
              <AlertTriangle size={22} className={rs.icon} />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white font-heading flex items-center gap-2">
                {t('weather_risk')} {t('weather_advisory')}
              </h3>
              <p className="text-xs text-surface-400">{t('microclimate_analysis')}</p>
            </div>
          </div>
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold border ${rs.badge}`}>
            {riskLabels[w.risk_level]}
          </span>
        </div>
        <p className="text-sm text-surface-200 leading-relaxed mb-5 font-medium">{w.risk_reason}</p>

        {/* Weather Metrics Row */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
          <div className="p-3 rounded-2xl bg-white/3 border border-white/5">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 text-xs font-semibold mb-1">
              <Cloud size={16} /> {t('temperature')}
            </div>
            <p className="text-xl font-extrabold text-white font-heading">{w.temp}°C</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/3 border border-white/5">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-semibold mb-1">
              <Droplets size={16} /> {t('humidity')}
            </div>
            <p className="text-xl font-extrabold text-white font-heading">{w.humidity}%</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/3 border border-white/5">
            <div className="flex items-center justify-center gap-1.5 text-surface-300 text-xs font-semibold mb-1">
              <Wind size={16} /> {t('wind_speed')}
            </div>
            <p className="text-xl font-extrabold text-white font-heading">{w.wind} km/h</p>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-extrabold text-white text-base flex items-center gap-2 font-heading">
            <Calendar size={18} className="text-primary-400" /> {t('five_day_forecast')}
          </h3>
          <span className="text-xs text-surface-400 font-medium">{t('updated_recently')}</span>
        </div>
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {w.forecast.map((d, i) => (
            <div key={i} className="text-center p-3 rounded-2xl bg-white/3 hover:bg-white/8 transition-colors border border-white/5">
              <p className="text-xs text-surface-400 mb-2 font-semibold">{d.day}</p>
              <p className="text-3xl mb-2 hover:scale-125 transition-transform">{d.icon}</p>
              <p className="text-base font-extrabold text-white font-heading">{d.temp}°</p>
              <span className="mt-1 inline-block px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-300 text-[10px] font-bold">
                {d.rain}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-white text-base flex items-center gap-2 font-heading">
            <TrendingUp size={18} className="text-primary-400" /> {t('recent_activity')}
          </h3>
          <button onClick={() => navigate('/history')} className="text-xs text-primary-400 hover:text-primary-300 font-semibold flex items-center gap-1">
            {t('view_all')} →
          </button>
        </div>

        {lastScan ? (
          <button onClick={() => navigate('/history')}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/3 hover:bg-white/8 transition-all text-left border border-white/5 group">
            <div className="w-14 h-14 rounded-2xl bg-primary-500/15 border border-primary-500/20 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
              🌿
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-white text-base truncate font-heading">{lastScan.detections?.[0]?.class_name || 'Crop Health Scan'}</p>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-500/20 text-primary-300 text-[10px] font-bold">
                  {lastScan.detections?.[0]?.confidence}% {t('confidence')}
                </span>
              </div>
              <p className="text-xs text-surface-400 mt-1 flex items-center gap-2">
                <span>Crop: {lastScan.crop_type?.toUpperCase()}</span>
                <span>•</span>
                <span>{new Date(lastScan.created_at).toLocaleDateString()}</span>
              </p>
            </div>
            <ChevronRight size={20} className="text-surface-500 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="text-center py-8 bg-white/2 rounded-2xl border border-dashed border-white/10">
            <ScanLine size={36} className="mx-auto text-surface-600 mb-2" />
            <p className="text-sm text-surface-400 font-medium">{t('no_recent_activity')}</p>
            <button onClick={() => navigate('/scan')} className="mt-3 px-4 py-2 rounded-xl bg-primary-500/15 text-primary-300 text-xs font-bold border border-primary-500/20 hover:bg-primary-500/25 transition-colors">
              {t('start_first_scan')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
