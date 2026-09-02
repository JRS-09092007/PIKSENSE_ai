import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { expertsList } from '../utils/diseaseData';
import { Phone, Send, ShieldCheck, MapPin, Search, Users, Star, Check } from 'lucide-react';

export default function Experts() {
  const { t, showToast } = useApp();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [sentScans, setSentScans] = useState([]);

  const filtered = expertsList.filter(e => {
    if (!search) return true;
    const q = search.toLowerCase();
    return e.name.toLowerCase().includes(q) || e.region.toLowerCase().includes(q) ||
      e.specializations.some(s => s.includes(q)) || e.diseases.some(d => d.toLowerCase().includes(q));
  });

  const handleSendScan = (expertId, name) => {
    setSentScans(prev => [...prev, expertId]);
    showToast(`Scan report sent to ${name}! They will contact you shortly.`, 'success');
  };

  return (
    <div className="pb-32 lg:pb-12 px-4 sm:px-6 pt-6 max-w-4xl mx-auto animate-slide-up space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading flex items-center gap-2">
          <Users className="text-primary-400" /> {t('expert_directory')}
        </h1>
        <p className="text-sm text-surface-400">{t('expert_subtitle')}</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          placeholder={t('search_expert_placeholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="glass-input pl-11 py-3.5"
        />
      </div>

      {/* Expert Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(expert => (
          <div key={expert.id} className="glass-card p-6 card-hover border border-white/8 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg ${
                  expert.verified ? 'bg-gradient-to-br from-primary-400 to-primary-600 glow-emerald' : 'bg-gradient-to-br from-surface-600 to-surface-700'
                }`}>
                  {expert.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-white text-base font-heading">{expert.name}</h3>
                    {expert.verified && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-300 text-[10px] font-extrabold border border-primary-500/30">
                        <ShieldCheck size={12} /> {t('verified')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-surface-400 mt-0.5">{expert.shop}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-extrabold text-amber-300">{expert.rating || 4.8}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-surface-400 pt-1">
              <span className="flex items-center gap-1"><MapPin size={13} className="text-primary-400" /> {expert.region}</span>
              <span className="flex items-center gap-1.5 text-primary-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-ping" /> {t('available_now')}
              </span>
            </div>

            {/* Specialization Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {expert.specializations.map(s => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-primary-500/10 text-primary-300 text-[11px] font-bold capitalize border border-primary-500/20">
                  {s}
                </span>
              ))}
              {expert.diseases.map(d => (
                <span key={d} className="px-2.5 py-1 rounded-lg bg-accent-500/10 text-accent-300 text-[11px] font-bold border border-accent-500/20">
                  {d}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <a href={`tel:${expert.contact}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary-500/15 hover:bg-primary-500/25 text-primary-300 font-bold text-xs border border-primary-500/30 transition-all active:scale-95">
                <Phone size={15} /> {t('call_expert')}
              </a>
              <button
                onClick={() => handleSendScan(expert.id, expert.name)}
                disabled={sentScans.includes(expert.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold border transition-all active:scale-95 ${
                  sentScans.includes(expert.id)
                    ? 'bg-white/5 text-surface-400 border-white/10'
                    : 'bg-accent-500/15 hover:bg-accent-500/25 text-accent-300 border border-accent-500/30'
                }`}>
                {sentScans.includes(expert.id) ? (
                  <><Check size={15} className="text-emerald-400" /> Sent ✓</>
                ) : (
                  <><Send size={15} /> {t('send_scan')}</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 glass-card border border-white/5">
          <Users size={48} className="mx-auto text-surface-600 mb-3" />
          <p className="text-surface-300 font-medium">No agronomists found matching your query.</p>
          <button onClick={() => setSearch('')} className="mt-3 px-4 py-2 rounded-xl bg-primary-500/15 text-primary-300 text-xs font-bold border border-primary-500/20">
            {t('clear_search')}
          </button>
        </div>
      )}
    </div>
  );
}
