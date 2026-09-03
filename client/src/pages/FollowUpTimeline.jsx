import { useState } from 'react';
import { RotateCcw, Calendar, CheckCircle2, Clock, Upload, ArrowRight, ShieldCheck, Activity, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function FollowUpTimeline() {
  const { showToast } = useApp();

  const [activeCase] = useState({
    id: 'CASE-2026-00421',
    crop: 'Soybean (सोयाबीन)',
    disease: 'Anthracnose & Leaf Blight',
    farmLocation: 'Dindori Plot A, Nashik',
    startDate: 'Aug 28, 2026',
    currentStage: 'Day 7 — Expert Post-Treatment Check',
    recoveryScore: 78,
    beforeImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?auto=format&fit=crop&w=500&q=80',
    afterImage: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=500&q=80',
    steps: [
      { day: 'Day 0', title: 'Initial Disease Detection', date: '28 Aug', status: 'Completed', desc: 'AI flagged Anthracnose (87% confidence). High humidity alert issued.' },
      { day: 'Day 2', title: 'IPM Advisory Spray Applied', date: '30 Aug', status: 'Completed', desc: 'Farmer applied Neem oil + Carbendazim 50% WP spray as instructed.' },
      { day: 'Day 5', title: 'Follow-up Photo Uploaded', date: '02 Sep', status: 'Completed', desc: 'Fresh canopy leaf photo uploaded by farmer. Lesion growth arrested.' },
      { day: 'Day 7', title: 'Agronomist Progress Review', date: 'Today', status: 'In Progress', desc: 'Expert verified 78% reduction in active fungal spots.' },
      { day: 'Day 14', title: 'Final Recovery Sign-off', date: '09 Sep', status: 'Upcoming', desc: 'Final crop vigor assessment and yield protection confirmation.' },
    ]
  });

  const [newImageUploaded, setNewImageUploaded] = useState(false);

  const handleUploadFollowup = () => {
    setNewImageUploaded(true);
    showToast('New follow-up leaf photo uploaded for Day 7 verification!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-card p-6 border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <RotateCcw size={20} />
            </div>
            <h1 className="text-xl font-extrabold text-white font-heading">
              Case Recovery & Follow-up Monitoring
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase">
              POST-TREATMENT TRACKING
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            Monitor crop recovery over time with side-by-side photo comparisons and agronomist follow-up sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleUploadFollowup}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 glow-emerald">
            <Upload size={14} />
            <span>Upload Day 7 Image</span>
          </button>
        </div>
      </div>

      {/* Case Overview & Recovery Progress */}
      <div className="glass-card p-6 border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-400">{activeCase.id}</span>
            <h2 className="text-2xl font-extrabold text-white font-heading">{activeCase.crop}</h2>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              Target Problem: <span className="text-amber-300 font-bold">{activeCase.disease}</span> • {activeCase.farmLocation}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
            <div className="text-center">
              <span className="text-[10px] uppercase font-extrabold text-slate-400">Recovery Index</span>
              <p className="text-3xl font-black text-emerald-400 font-mono mt-0.5">{activeCase.recoveryScore}%</p>
            </div>
            <div className="w-24 h-2 bg-surface-900 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${activeCase.recoveryScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Before vs After Comparison */}
      <div className="glass-card p-6 border-emerald-500/30 space-y-4">
        <h3 className="text-base font-extrabold text-white font-heading flex items-center gap-2">
          <ImageIcon size={18} className="text-emerald-400" />
          <span>Before vs After Treatment Visual Comparison</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Day 0 Before */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-red-400">DAY 0: INITIAL INFECTION</span>
              <span className="text-slate-400 font-mono">28 Aug 2026</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-red-500/40 aspect-video bg-black">
              <img src={activeCase.beforeImage} alt="Infected Leaf" className="w-full h-full object-cover opacity-90" />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-red-500/80 backdrop-blur-md text-white text-[10px] font-extrabold">
                Active Anthracnose Lesions
              </div>
            </div>
          </div>

          {/* Day 7 After */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-emerald-400">DAY 7: POST-TREATMENT RECOVERY</span>
              <span className="text-slate-400 font-mono">Today</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 aspect-video bg-black">
              <img src={activeCase.afterImage} alt="Recovered Leaf" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-extrabold">
                78% Fungal Spot Healing
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recovery Timeline Milestones */}
      <div className="glass-card p-6 border-white/10 space-y-6">
        <h3 className="text-base font-extrabold text-white font-heading flex items-center gap-2">
          <Clock size={18} className="text-emerald-400" />
          <span>Follow-up Milestone Progression</span>
        </h3>

        <div className="relative border-l-2 border-emerald-500/30 ml-4 pl-6 space-y-6">
          {activeCase.steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Timeline Dot */}
              <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                step.status === 'Completed'
                  ? 'bg-emerald-400 border-emerald-500'
                  : step.status === 'In Progress'
                  ? 'bg-amber-400 border-amber-500 animate-ping'
                  : 'bg-surface-900 border-slate-600'
              }`} />

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-extrabold">
                      {step.day}
                    </span>
                    <h4 className="text-sm font-extrabold text-white font-heading">{step.title}</h4>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{step.date}</span>
                </div>
                <p className="text-xs text-slate-300 font-medium pt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
