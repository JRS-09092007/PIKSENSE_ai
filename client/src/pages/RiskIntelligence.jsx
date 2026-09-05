import { useState } from 'react';
import { ThermometerSun, CloudRain, Sprout, Layers, History, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RiskIntelligence() {
  const { t, T, showToast } = useApp();

  const [selectedCrop, setSelectedCrop] = useState('soybean');

  const riskProfiles = {
    soybean: {
      cropName: 'Soybean (सोयाबीन)',
      variety: 'JS 335 / Phule Sangam',
      stage: 'Flowering & Pod Formation Stage',
      soil: 'Deep Black Cotton Soil (High Moisture Retention)',
      overallRisk: 'HIGH RISK (उच्च धोका)',
      riskScore: 84,
      targetDisease: 'Stem Rot / Anthracnose & Stem Fly',
      factors: [
        { name: 'Weather Conditions (Humidity + Rain)', score: 90, level: 'Critical', desc: 'Continuous rainfall (38mm) with 86% RH creates ideal fungal germination environment' },
        { name: 'Growth Stage Sensitivity', score: 78, level: 'High', desc: 'Flowering stage is highly susceptible to flower drop and stem blight infection' },
        { name: 'Soil Condition & Drainage', score: 70, level: 'Moderate', desc: 'Heavy black soil retains moisture, increasing root rot probability' },
        { name: 'Historical Pest Pressure', score: 85, level: 'High', desc: 'Nashik district recorded Anthracnose outbreaks in 3 of the last 4 monsoon seasons' },
      ],
      whyHigh: 'The convergence of continuous monsoon rainfall (38mm), heavy black soil moisture retention, and high canopy density during the flowering stage creates a high-risk microclimate for Anthracnose and Stem Rot spread.',
      preventiveAction: 'Apply Trichoderma viride bio-agent or Carbendazim 50% WP (1g/L) before heavy rain spell. Ensure surface drainage channels are clear.'
    },
    mango: {
      cropName: 'Mango (आंबा - हापूस)',
      variety: 'Alphonso (Ratnagiri Hapus)',
      stage: 'Panicle Initiation & Flowering',
      soil: 'Laterite Red Rock Soil',
      overallRisk: 'MODERATE RISK (मध्यम धोका)',
      riskScore: 62,
      targetDisease: 'Powdery Mildew & Hopper Attack',
      factors: [
        { name: 'Weather Conditions (Humidity + Temp)', score: 65, level: 'Moderate', desc: 'Night temperatures (14°C) with morning fog favor powdery mildew spores' },
        { name: 'Growth Stage Sensitivity', score: 80, level: 'High', desc: 'Panicle stage vulnerable to flower blight and fruit drop' },
        { name: 'Soil Condition & Drainage', score: 40, level: 'Low', desc: 'Porous laterite soil prevents waterlogging' },
        { name: 'Historical Pest Pressure', score: 60, level: 'Moderate', desc: 'Moderate incidence of hopper honeydew reported in coastal belts' },
      ],
      whyHigh: 'Cool nights combined with heavy morning dew during panicle emergence create favorable humidity for Powdery Mildew fungal spores to infect young blossoms.',
      preventiveAction: 'Spray Wettable Sulfur (3g/L) preventatively before full bloom. Monitor hopper count on panicle undersides.'
    },
    tomato: {
      cropName: 'Tomato (टोमॅटो)',
      variety: 'Abhinav / S-30',
      stage: 'Fruiting & Ripening',
      soil: 'Medium Clay Loam',
      overallRisk: 'CRITICAL RISK (गंभीर धोका)',
      riskScore: 92,
      targetDisease: 'Early Blight & Whitefly / Leaf Curl Virus',
      factors: [
        { name: 'Weather Conditions (Humidity + Rain)', score: 95, level: 'Critical', desc: 'Persistent cloud cover and 90% humidity favor rapid foliar lesion expansion' },
        { name: 'Growth Stage Sensitivity', score: 88, level: 'Critical', desc: 'Heavy fruit load reduces canopy ventilation' },
        { name: 'Soil Condition & Drainage', score: 82, level: 'High', desc: 'Soil splashing spreads soil-borne fungal spores onto lower leaves' },
        { name: 'Historical Pest Pressure', score: 90, level: 'Critical', desc: 'High whitefly vector population recorded in neighboring greenhouses' },
      ],
      whyHigh: 'High atmospheric humidity combined with whitefly vector activity and soil splashing creates a compound risk of Early Blight fungal infection and Tomato Leaf Curl Virus transmission.',
      preventiveAction: 'Apply Copper Oxychloride 50% WP (3g/L) immediately. Install yellow sticky traps (15 traps/acre) to suppress whitefly population.'
    }
  };

  const current = riskProfiles[selectedCrop];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="glass-card p-6 border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ThermometerSun size={20} />
            </div>
            <h1 className="text-xl font-extrabold text-white font-heading">
              {t('risk_matrix_title')}
            </h1>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            {t('risk_matrix_subtitle')}
          </p>
        </div>

        {/* Crop Selector Tabs */}
        <div className="flex gap-2 p-1 bg-black/40 rounded-2xl border border-white/10">
          {Object.keys(riskProfiles).map(key => (
            <button
              key={key}
              onClick={() => setSelectedCrop(key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
                selectedCrop === key
                  ? 'bg-emerald-500 text-white shadow-lg glow-emerald'
                  : 'text-slate-400 hover:text-white'
              }`}>
              <T text={key} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Risk Overview Banner */}
      <div className="glass-card p-6 border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-surface-900 to-black">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-extrabold">
              <AlertTriangle size={14} className="text-red-400 animate-pulse" />
              <span><T text={current.overallRisk} /></span>
            </div>

            <h2 className="text-2xl font-extrabold text-white font-heading">
              <T text={current.cropName} /> — <T text={current.targetDisease} />
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-2 font-medium">
              <div><strong className="text-slate-400">Variety:</strong> <T text={current.variety} /></div>
              <div><strong className="text-slate-400">Growth Stage:</strong> <T text={current.stage} /></div>
              <div><strong className="text-slate-400">Soil Type:</strong> <T text={current.soil} /></div>
            </div>
          </div>

          {/* Risk Score Circle Gauge */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/50 border border-white/10 min-w-[140px]">
            <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">{t('risk_index')}</span>
            <span className="text-4xl font-black text-amber-400 font-mono my-1">{current.riskScore}/100</span>
            <span className="text-[10px] font-bold text-red-400">{t('action_required')}</span>
          </div>
        </div>
      </div>

      {/* Visual Bar Breakdown of Contributing Factors */}
      <div className="glass-card p-6 border-white/10 space-y-6">
        <h3 className="text-base font-extrabold text-white font-heading flex items-center gap-2">
          <Layers size={18} className="text-emerald-400" />
          <span>{t('risk_breakdown')}</span>
        </h3>

        <div className="space-y-5">
          {current.factors.map((factor, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-200"><T text={factor.name} /></span>
                <span className="text-amber-300 font-mono">{factor.score}% (<T text={factor.level} />)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-surface-950 border border-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    factor.score > 85
                      ? 'bg-gradient-to-r from-red-500 to-amber-500'
                      : factor.score > 60
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  }`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 font-medium"><T text={factor.desc} /></p>
            </div>
          ))}
        </div>
      </div>

      {/* Explainable AI Rationale & Action Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WHY the risk is high */}
        <div className="glass-card p-6 border-amber-500/30">
          <h3 className="text-sm font-extrabold text-amber-300 font-heading flex items-center gap-2 mb-3">
            <Info size={16} />
            <span>{t('why_elevated')}</span>
          </h3>
          <p className="text-xs text-slate-300 font-medium leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
            "<T text={current.whyHigh} />"
          </p>
        </div>

        {/* Recommended Action Plan */}
        <div className="glass-card p-6 border-emerald-500/30">
          <h3 className="text-sm font-extrabold text-emerald-300 font-heading flex items-center gap-2 mb-3">
            <ShieldCheck size={16} />
            <span>{t('recommended_intervention')}</span>
          </h3>
          <p className="text-xs text-slate-300 font-medium leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
            <T text={current.preventiveAction} />
          </p>

          <button
            onClick={() => showToast('Advisory printed & sent via SMS to farmer mobile', 'success')}
            className="mt-4 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 glow-emerald">
            <CheckCircle2 size={15} />
            <span>{t('send_advisory_sms')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
