import { useApp } from '../context/AppContext';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
];

export default function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage, showToast } = useApp();

  const changeLang = (code, label) => {
    setLanguage(code);
    showToast(`Language changed to ${label}`, 'info');
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1 glass-card-light p-1 rounded-2xl border border-emerald-500/20">
        {languages.map(l => (
          <button key={l.code} onClick={() => changeLang(l.code, l.label)}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 ${
              language === l.code
                ? 'bg-primary-500/30 text-primary-200 shadow-md border border-primary-500/40'
                : 'text-surface-300 hover:text-white'
            }`}>
            {l.flag} {l.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-xs font-bold text-surface-300 uppercase tracking-wider">
        <Globe size={16} className="text-primary-400" /> Select Application Language
      </label>
      <div className="grid grid-cols-3 gap-2.5">
        {languages.map(l => (
          <button key={l.code} onClick={() => changeLang(l.code, l.label)}
            className={`p-3.5 rounded-2xl border-2 text-center transition-all duration-200 active:scale-95 ${
              language === l.code
                ? 'border-primary-500/60 bg-primary-500/20 shadow-lg glow-emerald'
                : 'border-white/5 hover:border-white/15 bg-white/4'
            }`}>
            <span className="text-2xl block mb-1">{l.flag}</span>
            <p className={`text-xs font-bold ${language === l.code ? 'text-primary-300 font-heading' : 'text-surface-300'}`}>{l.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
