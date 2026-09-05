import { useApp } from '../context/AppContext';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'hi', label: 'हिंदी', short: 'हि', flag: '🇮🇳' },
  { code: 'mr', label: 'मराठी', short: 'म', flag: '🇮🇳' },
];

export default function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage, showToast } = useApp();

  const changeLang = (code, label) => {
    setLanguage(code);
    showToast(`Language changed to ${label}`, 'info');
  };

  if (compact) {
    return (
      <div className="flex items-center p-0.5 rounded-xl bg-black/40 border border-emerald-500/30 shrink-0">
        {languages.map(l => (
          <button
            key={l.code}
            onClick={() => changeLang(l.code, l.label)}
            className={`px-2 py-1 rounded-lg text-[11px] font-extrabold transition-all duration-200 flex items-center gap-1 ${
              language === l.code
                ? 'bg-emerald-500 text-white shadow-md glow-emerald'
                : 'text-surface-300 hover:text-white'
            }`}>
            <span>{l.flag}</span>
            <span className="hidden xs:inline sm:inline">{l.code.toUpperCase()}</span>
            <span className="inline xs:hidden sm:hidden">{l.short}</span>
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
          <button
            key={l.code}
            onClick={() => changeLang(l.code, l.label)}
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
