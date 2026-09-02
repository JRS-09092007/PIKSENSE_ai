import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { storageGuides, cropsList } from '../utils/diseaseData';
import { Thermometer, Droplets, Clock, Search, AlertTriangle, ChevronDown, ChevronUp, Package, Archive } from 'lucide-react';

export default function Storage() {
  const { t, language } = useApp();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(0);

  const filtered = storageGuides.filter(g => !search || g.crop.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pb-32 lg:pb-12 px-4 sm:px-6 pt-6 max-w-4xl mx-auto animate-slide-up space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading flex items-center gap-2">
          <Archive className="text-primary-400" /> {t('storage_tips')}
        </h1>
        <p className="text-sm text-surface-400">{t('storage_subtitle')}</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          placeholder={t('search_storage_placeholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="glass-input pl-11 py-3.5"
        />
      </div>

      {/* Storage Cards List */}
      <div className="space-y-4">
        {filtered.map((guide, i) => {
          const crop = cropsList.find(c => c.id === guide.crop);
          const isOpen = expanded === i;
          return (
            <div key={guide.crop} className="glass-card overflow-hidden border border-white/8 card-hover">
              <button onClick={() => setExpanded(isOpen ? -1 : i)} className="w-full p-5 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl p-2 rounded-2xl bg-white/5 border border-white/5">{crop?.icon || '🌿'}</span>
                    <div>
                      <h3 className="font-extrabold text-white text-base font-heading capitalize">
                        {language === 'hi' ? (crop?.nameHi || guide.crop) : language === 'mr' ? (crop?.nameMr || guide.crop) : guide.crop}
                      </h3>
                      <p className="text-xs text-surface-400 mt-0.5">{t('recommended_shelf_life')}: <span className="font-bold text-accent-300">{guide.shelfLife}</span></p>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp size={20} className="text-surface-400" /> : <ChevronDown size={20} className="text-surface-400" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 space-y-5 animate-slide-up border-t border-white/5 pt-4">
                  {/* Storage Parameter Gauges */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl p-4 text-center bg-blue-950/30 border border-blue-500/20">
                      <Thermometer size={22} className="mx-auto text-blue-400 mb-1" />
                      <p className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">{t('ideal_temp')}</p>
                      <p className="text-base font-extrabold text-white mt-0.5">{guide.temp}</p>
                    </div>

                    <div className="rounded-2xl p-4 text-center bg-cyan-950/30 border border-cyan-500/20">
                      <Droplets size={22} className="mx-auto text-cyan-400 mb-1" />
                      <p className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">{t('humidity')}</p>
                      <p className="text-base font-extrabold text-white mt-0.5">{guide.humidity}</p>
                    </div>

                    <div className="rounded-2xl p-4 text-center bg-accent-950/30 border border-accent-500/20">
                      <Clock size={22} className="mx-auto text-accent-400 mb-1" />
                      <p className="text-[10px] font-bold text-accent-300 uppercase tracking-wider">{t('shelf_life')}</p>
                      <p className="text-base font-extrabold text-white mt-0.5">{guide.shelfLife}</p>
                    </div>
                  </div>

                  {/* Preservation Method */}
                  <div className="rounded-2xl p-5 bg-primary-950/30 border border-primary-500/20">
                    <h4 className="text-xs font-bold text-primary-300 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                      <Package size={16} className="text-primary-400" /> {t('storage_method')}
                    </h4>
                    <p className="text-sm text-primary-200/90 leading-relaxed font-medium">{guide.method}</p>
                  </div>

                  {/* Common Pitfalls / Issues */}
                  <div>
                    <h4 className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <AlertTriangle size={14} className="text-accent-400" /> {t('common_issues')}
                    </h4>
                    <div className="space-y-2">
                      {guide.issues.map((issue, j) => (
                        <div key={j} className="p-3 rounded-xl bg-white/3 border border-white/5 flex items-center gap-2.5 text-xs text-surface-200 font-medium">
                          <span className="text-amber-400">⚠️</span>
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
