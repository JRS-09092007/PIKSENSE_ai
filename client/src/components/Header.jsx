import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import LanguageSwitcher from './LanguageSwitcher';
import { MapPin, Bell, Activity, Sparkles, Mic, AlertTriangle, UserCheck, CloudRain, CheckCheck, X, Building2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const { user } = useAuth();
  const { t, showToast, setIsVoiceOpen } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifFilter, setNotifFilter] = useState('all');
  const notifRef = useRef(null);
  const isOfficer = user?.role === 'officer';

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'outbreak', title: 'Anthracnose Outbreak Alert', text: 'Anthracnose detected 12km away in Ratnagiri. Spray Neem oil early.', time: '10m ago', unread: true },
    { id: 2, type: 'weather', title: 'High Humidity Warning', text: '85% Humidity expected tomorrow — monitor Rice crops for Blast disease.', time: '2h ago', unread: true },
    { id: 3, type: 'expert', title: 'Agronomist Reply', text: 'Dr. Sunita Deshmukh verified your Mango scan report with organic cure.', time: '1d ago', unread: false },
    { id: 4, type: 'outbreak', title: 'Rice Blast Alert', text: 'Rice Blast reported in nearby Kolhapur district.', time: '2d ago', unread: false }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const unreadCount = alerts.filter(a => a.unread).length;

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, unread: false })));
    showToast('All notifications marked as read', 'info');
  };

  const filteredAlerts = alerts.filter(a => notifFilter === 'all' || a.type === notifFilter);

  const getAlertIcon = (type) => {
    if (type === 'outbreak') return <AlertTriangle size={16} className="text-danger-400" />;
    if (type === 'weather') return <CloudRain size={16} className="text-amber-400" />;
    return <UserCheck size={16} className="text-primary-400" />;
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-header px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Brand Logo & Location Metadata */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md glow-emerald shrink-0 border border-white/20">
          <Sparkles size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-white text-base tracking-tight font-heading">
              pikSense <span className="text-emerald-400">AI</span>
            </h1>
            {isOfficer ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold">
                <Building2 size={12} className="text-amber-400" /> Govt Officer Portal
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <Activity size={12} className="text-emerald-400 animate-pulse" /> 88% {t('health_index')}
              </span>
            )}
          </div>
          <p className="text-xs text-surface-400 flex items-center gap-1 font-medium mt-0.5">
            <MapPin size={12} className="text-emerald-400" /> {user?.region || 'Ratnagiri'}, {user?.state || 'Maharashtra'}
          </p>
        </div>
      </div>

      {/* Header Controls Bar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Voice Assistant Header Trigger Button */}
        <button
          onClick={() => setIsVoiceOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-500/30 text-xs transition-all active:scale-95 glow-emerald">
          <Mic size={15} className="text-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">{t('ask_voice')}</span>
        </button>

        {/* Notifications Popover Bell Icon */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all relative border ${
              showNotifications
                ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40 glow-emerald'
                : 'bg-white/5 hover:bg-white/10 text-surface-300 border-white/10'
            }`}>
            <Bell size={18} />
            {unreadCount > 0 && (
              <>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-lg border border-surface-900 animate-pulse">
                  {unreadCount}
                </span>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-400 animate-ping opacity-75" />
              </>
            )}
          </button>

          {/* Notifications Popover Modal */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-card p-4 z-50 animate-slide-up shadow-2xl border border-emerald-500/30">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Bell size={15} />
                  </div>
                  <h3 className="font-extrabold text-white text-sm font-heading">
                    {t('view_alerts')}
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-300 border border-accent-500/30">
                      {unreadCount} Unread
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={markAllRead} title="Mark all as read"
                    className="p-1.5 rounded-xl hover:bg-white/10 text-surface-400 hover:text-emerald-300 transition-colors text-xs flex items-center gap-1">
                    <CheckCheck size={14} />
                  </button>
                  <button onClick={() => setShowNotifications(false)}
                    className="p-1.5 rounded-xl hover:bg-white/10 text-surface-400 hover:text-white transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex gap-1 mb-3 pb-2 border-b border-white/5 overflow-x-auto scrollbar-none">
                {['all', 'outbreak', 'weather', 'expert'].map(cat => (
                  <button key={cat} onClick={() => setNotifFilter(cat)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold capitalize transition-colors ${
                      notifFilter === cat
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-surface-400 hover:text-surface-200'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* Alerts List */}
              <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-none">
                {filteredAlerts.map(alert => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      showToast(alert.text, 'info');
                      setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, unread: false } : a));
                    }}
                    className={`p-3 rounded-2xl transition-all cursor-pointer border flex items-start gap-3 ${
                      alert.unread
                        ? 'bg-emerald-500/10 border-emerald-500/25 hover:bg-emerald-500/15'
                        : 'bg-white/3 border-white/5 hover:bg-white/8 opacity-80'
                    }`}>
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-extrabold text-white text-xs font-heading">{alert.title}</p>
                        <span className="text-[10px] text-surface-400">{alert.time}</span>
                      </div>
                      <p className="text-xs text-surface-300 mt-1 leading-snug font-medium">{alert.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Multilingual Selector */}
        <LanguageSwitcher compact />
      </div>
    </header>
  );
}
