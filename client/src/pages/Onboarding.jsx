import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ScanLine, CloudRain, Users, Mic, ChevronRight, Sparkles } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const slides = [
  { icon: ScanLine, gradient: 'from-emerald-400 to-teal-500', titleKey: 'onboarding_slide1_title', descKey: 'onboarding_slide1_desc' },
  { icon: CloudRain, gradient: 'from-blue-400 to-indigo-500', titleKey: 'onboarding_slide2_title', descKey: 'onboarding_slide2_desc' },
  { icon: Users, gradient: 'from-amber-400 to-orange-500', titleKey: 'onboarding_slide3_title', descKey: 'onboarding_slide3_desc' },
  { icon: Mic, gradient: 'from-purple-400 to-fuchsia-500', titleKey: 'onboarding_slide4_title', descKey: 'onboarding_slide4_desc' },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const { t, completeOnboarding } = useApp();
  const navigate = useNavigate();

  const handleFinish = () => { completeOnboarding(); navigate('/login'); };
  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen min-h-dvh flex flex-col items-center justify-between p-6 sm:p-8 bg-[#090e17]">
      {/* Top bar */}
      <div className="w-full max-w-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-md">
            <Sparkles size={18} />
          </div>
          <span className="font-extrabold text-white text-base tracking-tight font-heading">pikSense AI</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          <button onClick={handleFinish} className="text-xs text-surface-400 hover:text-white font-semibold transition-colors px-3 py-1.5 rounded-xl hover:bg-white/5">
            {t('skip')} →
          </button>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm px-4 animate-slide-up" key={current}>
        <div className={`w-36 h-36 sm:w-40 sm:h-40 rounded-[36px] bg-gradient-to-br ${slide.gradient} flex items-center justify-center mb-10 shadow-2xl animate-float glow-emerald border border-white/20`}>
          <Icon size={64} className="text-white" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight font-heading">{t(slide.titleKey)}</h2>
        <p className="text-surface-300 text-sm sm:text-base leading-relaxed font-medium">{t(slide.descKey)}</p>
      </div>

      {/* Bottom controls */}
      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-center gap-2.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-400 ${
                i === current ? 'w-8 bg-primary-400 shadow-md shadow-primary-400/80' : 'w-2 bg-surface-700 hover:bg-surface-600'
              }`} />
          ))}
        </div>
        {current === slides.length - 1 ? (
          <button onClick={handleFinish} className="btn-primary py-4 text-base font-extrabold">
            <Sparkles size={20} /> {t('get_started')}
          </button>
        ) : (
          <button onClick={() => setCurrent(c => c + 1)} className="btn-primary py-4 text-base font-extrabold">
            {t('next')} <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
