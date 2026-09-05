import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { diseaseKnowledge, cropsList, getLocalizedDisease } from '../utils/diseaseData';
import { Search, ChevronDown, ChevronUp, AlertTriangle, Leaf, FlaskConical, Zap, BookOpen, ShieldCheck, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Library() {
  const { t, T, language, showToast } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [expanded, setExpanded] = useState(0);

  const userCropIds = user?.crops || [];
  const sorted = [...diseaseKnowledge].sort((a, b) => {
    const aMatch = a.crop.some(c => userCropIds.includes(c));
    const bMatch = b.crop.some(c => userCropIds.includes(c));
    return aMatch === bMatch ? 0 : aMatch ? -1 : 1;
  });

  const filtered = sorted.filter(d => {
    const loc = getLocalizedDisease(d, language);
    if (search) {
      const q = search.toLowerCase();
      return loc.display_name.toLowerCase().includes(q) || loc.description.toLowerCase().includes(q) || loc.symptoms?.some(s => s.toLowerCase().includes(q));
    }
    if (selectedCrop !== 'all') return d.crop.includes(selectedCrop);
    return true;
  });

  return (
    <div className="pb-32 lg:pb-12 px-4 sm:px-6 pt-6 max-w-4xl mx-auto animate-slide-up space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading flex items-center gap-2">
          <BookOpen className="text-primary-400" /> {t('library_title')}
        </h1>
        <p className="text-sm text-surface-400">{t('library_subtitle')}</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          placeholder={t('search_library_placeholder') || t('search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="glass-input pl-11 py-3.5"
        />
      </div>

      {/* Crop Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCrop('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCrop === 'all'
              ? 'bg-primary-500/20 text-primary-300 border border-primary-500/40 shadow-md'
              : 'bg-white/4 text-surface-400 border border-white/5 hover:bg-white/8'
          }`}>
          {t('all_crops')}
        </button>
        {cropsList.filter(c => diseaseKnowledge.some(d => d.crop.includes(c.id))).map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCrop(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCrop === c.id
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/40 shadow-md'
                : 'bg-white/4 text-surface-400 border border-white/5 hover:bg-white/8'
            }`}>
            <span>{c.icon}</span>
            <span>{language === 'hi' ? c.nameHi : language === 'mr' ? (c.nameMr || c.name) : c.name}</span>
          </button>
        ))}
      </div>

      {/* Disease Knowledge Cards */}
      <div className="space-y-4">
        {filtered.map((rawDisease, i) => {
          const disease = getLocalizedDisease(rawDisease, language);
          const isOpen = expanded === i;
          return (
            <div key={disease.class_id} className="glass-card overflow-hidden border border-white/8 card-hover">
              <button onClick={() => setExpanded(isOpen ? -1 : i)} className="w-full p-5 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-danger-500/15 border border-danger-500/30 flex items-center justify-center text-3xl shrink-0">
                      {disease.before_image}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-white text-base font-heading"><T text={disease.display_name} /></h3>
                        {disease.expert_review_needed && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                            ⚠️ Expert Review
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-surface-400 capitalize mt-0.5">
                        Crops: {disease.crop.join(', ')}
                      </p>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp size={20} className="text-surface-400" /> : <ChevronDown size={20} className="text-surface-400" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 space-y-5 animate-slide-up border-t border-white/5 pt-4">
                  {/* Before / After Comparison */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl p-4 text-center bg-danger-950/30 border border-danger-500/20">
                      <p className="text-xs font-bold text-danger-300 mb-2 uppercase tracking-wider">Infected Stage</p>
                      <span className="text-4xl inline-block mb-1">{disease.before_image}</span>
                      <p className="text-[11px] text-danger-400 font-medium">Pathogen Lesions Visible</p>
                    </div>
                    <div className="rounded-2xl p-4 text-center bg-emerald-950/30 border border-emerald-500/20">
                      <p className="text-xs font-bold text-emerald-300 mb-2 uppercase tracking-wider">Cured Stage</p>
                      <span className="text-4xl inline-block mb-1">{disease.after_image}</span>
                      <p className="text-[11px] text-emerald-400 font-medium">{t('optimal_state')}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">{t('description')}</h4>
                    <p className="text-sm text-surface-200 leading-relaxed font-medium"><T text={disease.description} /></p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/3 border border-white/5">
                    <h4 className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">{t('cause')}</h4>
                    <p className="text-sm text-surface-300 leading-relaxed"><T text={disease.cause} /></p>
                  </div>

                  {/* Immediate Action */}
                  <div className="rounded-2xl p-4 bg-amber-500/10 border border-amber-500/20">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Zap size={14} /> {t('immediate_action')}
                    </h4>
                    <p className="text-sm text-amber-200/90 font-semibold"><T text={disease.immediate_action} /></p>
                  </div>

                  {/* Organic & Chemical Treatments */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl p-4 bg-emerald-950/30 border border-emerald-500/20">
                      <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Leaf size={14} /> {t('organic')} {t('solution')}
                      </h4>
                      <p className="text-xs text-emerald-200/80 leading-relaxed font-medium"><T text={disease.treatment?.organic} /></p>
                    </div>
                    <div className="rounded-2xl p-4 bg-blue-950/30 border border-blue-500/20">
                      <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <FlaskConical size={14} /> {t('chemical')} {t('solution')}
                      </h4>
                      <p className="text-xs text-blue-200/80 leading-relaxed font-medium"><T text={disease.treatment?.chemical} /></p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      showToast(`Opened consultation for ${disease.display_name}`, 'info');
                      navigate('/experts');
                    }}
                    className="w-full py-3.5 rounded-2xl bg-primary-500/15 hover:bg-primary-500/25 text-primary-300 font-bold border border-primary-500/30 text-xs flex items-center justify-center gap-2 transition-colors">
                    <UserCheck size={16} /> {t('talk_to_expert')}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
