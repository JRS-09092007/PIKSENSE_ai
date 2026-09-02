import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { cropsList } from '../utils/diseaseData';
import { Check, ArrowRight, Leaf } from 'lucide-react';

export default function SelectCrops() {
  const { user, updateUser } = useAuth();
  const { t, language } = useApp();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(user?.crops || []);

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const handleContinue = () => {
    updateUser({ crops: selected });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen min-h-dvh p-4 sm:p-6 bg-[#090e17]">
      <div className="max-w-xl mx-auto pt-8 sm:pt-14 animate-slide-up space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-3xl bg-primary-500/15 border border-primary-500/30 flex items-center justify-center mx-auto mb-4 text-primary-400 glow-emerald">
            <Leaf size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight font-heading">{t('select_crops_title')}</h1>
          <p className="text-surface-400 text-sm max-w-md mx-auto">{t('select_crops_desc')}</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {cropsList.map(crop => {
            const isSelected = selected.includes(crop.id);
            return (
              <button key={crop.id} onClick={() => toggle(crop.id)}
                className={`relative p-4 rounded-2xl border-2 text-center transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? 'border-primary-500/50 bg-primary-500/15 shadow-xl glow-emerald'
                    : 'border-white/5 bg-white/3 hover:border-white/10 hover:bg-white/5'
                }`}>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center shadow-md">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <span className="text-3xl block mb-2">{crop.icon}</span>
                <span className={`text-xs font-bold ${isSelected ? 'text-primary-300' : 'text-surface-400'}`}>
                  {language === 'hi' ? crop.nameHi : language === 'mr' ? (crop.nameMr || crop.name) : crop.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="glass-card p-4 rounded-2xl text-center border border-white/10">
          <p className="text-sm text-surface-300 font-medium">
            <span className="text-primary-400 font-extrabold">{selected.length}</span> {t('crops_selected')}
          </p>
        </div>

        <button onClick={handleContinue} disabled={selected.length === 0} className="btn-primary py-4 text-base font-extrabold">
          {t('continue')} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
