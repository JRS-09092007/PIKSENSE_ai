import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { MapPin, Bell, Activity, Sparkles, Mic, AlertTriangle, UserCheck, CloudRain, CheckCheck, X, Building2, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const { user, switchRole } = useAuth();
  const { t, T, showToast, setIsVoiceOpen } = useApp();
  const navigate = useNavigate();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [notifFilter, setNotifFilter] = useState('all');
  
  const notifRef = useRef(null);
  const roleRef = useRef(null);
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
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setShowRoleMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelectRole = (newRole, navigatePath) => {
    switchRole(newRole);
    setShowRoleMenu(false);
    showToast(`Switched active portal view to ${newRole === 'officer' ? 'Govt Agriculture Officer' : newRole === 'extension' ? 'Field Extension Officer' : 'Farmer'}`, 'info');
    navigate(navigatePath);
  };

  const unreadCount = alerts.filter(a => a.unread).length;

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, unread: false })));
    showToast(t('all_notifications_read') || 'All notifications marked as read', 'info');
  };

  const filteredAlerts = alerts.filter(a => notifFilter === 'all' || a.type === notifFilter);

  const getAlertIcon = (type) => {
    if (type === 'outbreak') return <AlertTriangle size={16} className="text-danger-400" />;
    if (type === 'weather') return <CloudRain size={16} className="text-amber-400" />;
    return <UserCheck size={16} className="text-primary-400" />;
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-header px-3 sm:px-8 py-2.5 flex items-center justify-between gap-2 overflow-x-hidden">
      {/* Brand Logo & Location Metadata */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md glow-emerald shrink-0 border border-white/20">
          <Sparkles size={18} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-white text-sm sm:text-base tracking-tight font-heading">
              पीक<span className="text-emerald-400">Sense</span>
            </h1>
            {isOfficer ? (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                <Building2 size={11} className="text-amber-400" /> {t('officer_portal')}
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                <Activity size={11} className="text-emerald-400 animate-pulse" /> 88%
              </span>
            )}
          </div>
          <p className="text-[11px] text-surface-400 flex items-center gap-0.5 font-medium">
            <MapPin size={11} className="text-emerald-400" /> <T text={user?.region || 'Ratnagiri'} />
          </p>
        </div>
      </div>

      {/* Header Controls Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Voice Assistant Header Trigger Button */}
        <button
          onClick={() => setIsVoiceOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-500/30 text-xs transition-all active:scale-95 glow-emerald">
          <Mic size={14} className="text-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">{t('ask_voice')}</span>
        </button>

        {/* Notifications Popover Bell Icon */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all relative border ${
              showNotifications
                ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40 glow-emerald'
                : 'bg-white/5 hover:bg-white/10 text-surface-300 border-white/10'
            }`}>
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent-500 text-white text-[9px] font-extrabold flex items-center justify-center shadow-lg border border-surface-900 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Popover Modal */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 sm:w-96 glass-card p-4 z-50 animate-slide-up shadow-2xl border border-emerald-500/30">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Bell size={15} />
                  </div>
                  <h3 className="font-extrabold text-white text-sm font-heading">
                    {t('view_alerts')}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={markAllRead} title={t('mark_all_read')}
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
                    <T text={cat} />
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
                        <p className="font-extrabold text-white text-xs font-heading"><T text={alert.title} /></p>
                        <span className="text-[10px] text-surface-400">{alert.time}</span>
                      </div>
                      <p className="text-xs text-surface-300 mt-1 leading-snug font-medium"><T text={alert.text} /></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Compact Mobile Role Switcher Dropdown */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold transition-all shadow-md active:scale-95"
            title={t('switch_portal_role')}>
            <span>{user?.role === 'officer' ? '🏛️' : user?.role === 'extension' ? '🧑‍🌾' : '🌾'}</span>
            <span className="hidden sm:inline capitalize">
              {user?.role === 'officer' ? t('officer_view') : user?.role === 'extension' ? t('field_view') : t('farmer_view')}
            </span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${showRoleMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Role Selection Popover */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 sm:w-72 glass-card p-3 z-50 animate-slide-up shadow-2xl border border-emerald-500/40 space-y-2">
              <div className="pb-2 border-b border-white/10">
                <p className="text-xs font-extrabold text-white font-heading">{t('switch_portal_role')}</p>
              </div>

              <button
                onClick={() => handleSelectRole('farmer', '/dashboard')}
                className={`w-full p-2 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
                  user?.role === 'farmer' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-white/3 border-white/5 text-slate-300'
                }`}>
                <span className="text-lg">🌾</span>
                <div>
                  <p className="text-xs font-extrabold text-white font-heading">{t('farmer_view')}</p>
                </div>
              </button>

              <button
                onClick={() => handleSelectRole('extension', '/extension-dashboard')}
                className={`w-full p-2 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
                  user?.role === 'extension' ? 'bg-blue-500/20 border-blue-500/40 text-blue-300' : 'bg-white/3 border-white/5 text-slate-300'
                }`}>
                <span className="text-lg">🧑‍🌾</span>
                <div>
                  <p className="text-xs font-extrabold text-white font-heading">{t('field_view')}</p>
                </div>
              </button>

              <button
                onClick={() => handleSelectRole('officer', '/admin-dashboard')}
                className={`w-full p-2 rounded-xl text-left border transition-all flex items-center gap-2.5 ${
                  user?.role === 'officer' ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-white/3 border-white/5 text-slate-300'
                }`}>
                <span className="text-lg">🏛️</span>
                <div>
                  <p className="text-xs font-extrabold text-white font-heading">{t('officer_view')}</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Multilingual Selector (EN | हि | म) */}
        <LanguageSwitcher compact />
      </div>
    </header>
  );
}
