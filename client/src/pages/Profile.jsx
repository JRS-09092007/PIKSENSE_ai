import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { cropsList } from '../utils/diseaseData';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { MapPin, Leaf, Bell, RefreshCw, LogOut, ChevronRight, Check, Globe, User, ShieldCheck } from 'lucide-react';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const { t, language, resetOnboarding, showToast } = useApp();
  const navigate = useNavigate();
  const [editingCrops, setEditingCrops] = useState(false);
  const [selectedCrops, setSelectedCrops] = useState(user?.crops || []);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [hotspotAlerts, setHotspotAlerts] = useState(true);

  const toggleCrop = (id) => setSelectedCrops(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  const saveCrops = () => {
    updateUser({ crops: selectedCrops });
    setEditingCrops(false);
    showToast('Saved crop preferences!', 'success');
  };
  const handleLogout = () => { logout(); navigate('/login'); };
  const handleReplayTutorial = () => { resetOnboarding(); navigate('/onboarding'); };

  return (
    <div className="pb-32 lg:pb-12 px-4 sm:px-6 pt-6 max-w-3xl mx-auto animate-slide-up space-y-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading flex items-center gap-2">
        <User className="text-primary-400" /> {t('profile_settings')}
      </h1>

      {/* Profile summary card */}
      <div className="glass-card p-6 border border-emerald-500/20">
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-primary-400 via-primary-500 to-emerald-700 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl glow-emerald font-heading">
            {user?.name?.charAt(0) || 'F'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white font-heading">{user?.name || 'Farmer'}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-500/15 text-primary-300 text-[10px] font-extrabold border border-primary-500/30">
                {t('verified_farmer')}
              </span>
            </div>
            <p className="text-xs text-surface-400 flex items-center gap-1 mt-1 font-medium">
              <MapPin size={13} className="text-primary-400" /> {user?.region}, {user?.state}
            </p>
            <p className="text-xs text-surface-400 mt-0.5">{user?.phone || user?.email}</p>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="glass-card p-6">
        <h3 className="font-extrabold text-white text-base mb-4 flex items-center gap-2 font-heading">
          <Globe size={18} className="text-primary-400" /> {t('select_app_language')}
        </h3>
        <LanguageSwitcher />
      </div>

      {/* Crops list */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-white text-base flex items-center gap-2 font-heading">
            <Leaf size={18} className="text-primary-400" /> {t('my_cultivated_crops')}
          </h3>
          <button onClick={() => editingCrops ? saveCrops() : setEditingCrops(true)}
            className="text-xs font-extrabold text-primary-400 hover:text-primary-300 transition-colors px-3 py-1.5 rounded-xl bg-primary-500/10 border border-primary-500/20">
            {editingCrops ? t('save_selection') : t('edit_crops')}
          </button>
        </div>

        {editingCrops ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {cropsList.map(crop => {
              const isSelected = selectedCrops.includes(crop.id);
              return (
                <button key={crop.id} onClick={() => toggleCrop(crop.id)}
                  className={`relative p-3 rounded-2xl border text-center text-sm transition-all active:scale-95 ${
                    isSelected ? 'border-primary-500/40 bg-primary-500/15' : 'border-white/5 bg-white/3 hover:bg-white/5'
                  }`}>
                  {isSelected && <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center"><Check size={10} className="text-white" /></div>}
                  <span className="text-2xl block mb-1">{crop.icon}</span>
                  <p className={`text-[11px] font-bold ${isSelected ? 'text-primary-300' : 'text-surface-400'}`}>{language === 'hi' ? crop.nameHi : language === 'mr' ? (crop.nameMr || crop.name) : crop.name}</p>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(user?.crops || []).map(cId => {
              const crop = cropsList.find(c => c.id === cId);
              return crop ? (
                <span key={cId} className="px-3.5 py-2 rounded-2xl bg-primary-500/10 text-primary-300 text-xs font-bold border border-primary-500/20 flex items-center gap-1.5">
                  <span>{crop.icon}</span>
                  <span>{language === 'hi' ? crop.nameHi : language === 'mr' ? (crop.nameMr || crop.name) : crop.name}</span>
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="glass-card p-6 space-y-3">
        <h3 className="font-extrabold text-white text-base mb-3 flex items-center gap-2 font-heading">
          <Bell size={18} className="text-primary-400" /> {t('notifications')}
        </h3>
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/3 border border-white/5">
          <span className="text-xs font-bold text-surface-200">{t('weather_alerts')}</span>
          <div className={`toggle-switch ${weatherAlerts ? 'active' : 'inactive'}`} onClick={() => setWeatherAlerts(!weatherAlerts)}>
            <div className="toggle-knob" />
          </div>
        </div>
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/3 border border-white/5">
          <span className="text-xs font-bold text-surface-200">{t('hotspot_alerts')}</span>
          <div className={`toggle-switch ${hotspotAlerts ? 'active' : 'inactive'}`} onClick={() => setHotspotAlerts(!hotspotAlerts)}>
            <div className="toggle-knob" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="glass-card overflow-hidden border border-white/8">
        <button onClick={handleReplayTutorial} className="w-full flex items-center justify-between p-4.5 hover:bg-white/4 transition-colors border-b border-white/5 text-left">
          <span className="flex items-center gap-3 text-xs font-bold text-surface-300">
            <RefreshCw size={18} className="text-primary-400" /> {t('replay_tutorial')}
          </span>
          <ChevronRight size={18} className="text-surface-500" />
        </button>
        <button onClick={handleLogout} className="w-full flex items-center justify-between p-4.5 hover:bg-danger-500/10 transition-colors text-left">
          <span className="flex items-center gap-3 text-xs font-bold text-danger-400">
            <LogOut size={18} /> {t('logout')}
          </span>
          <ChevronRight size={18} className="text-surface-500" />
        </button>
      </div>

      <p className="text-center text-xs text-surface-500 font-medium">pikSense AI v1.2.0 • Smart India Hackathon (SIH)</p>
    </div>
  );
}
