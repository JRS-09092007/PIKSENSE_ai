import { useState } from 'react';
import { Cpu, CheckCircle2, XCircle, BarChart2, RefreshCw, Database, Layers, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ModelFeedback() {
  const { t, T, showToast } = useApp();

  const [metrics] = useState({
    totalPredictions: 1420,
    expertConfirmations: 1248,
    expertRejections: 172,
    accuracyRate: '87.9%',
    validationCoverage: '94.2%',
    retrainingBatchSize: '500 Verified Images',
    lastRetrained: '2026-08-15'
  });

  const [feedbackLogs] = useState([
    { id: 'FB-901', crop: 'Soybean', aiClass: 'Anthracnose', expertClass: 'Anthracnose', status: 'Confirmed', date: 'Today' },
    { id: 'FB-900', crop: 'Mango', aiClass: 'Leaf Spot', expertClass: 'Powdery Mildew', status: 'Corrected by Expert', date: 'Yesterday' },
    { id: 'FB-899', crop: 'Tomato', aiClass: 'Early Blight', expertClass: 'Early Blight', status: 'Confirmed', date: 'Yesterday' },
    { id: 'FB-898', crop: 'Cotton', aiClass: 'Pink Bollworm Damage', expertClass: 'Pink Bollworm Damage', status: 'Confirmed', date: '2 days ago' },
  ]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-card p-6 border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Cpu size={20} />
            </div>
            <h1 className="text-xl font-extrabold text-white font-heading">
              {t('model_feedback_title')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold uppercase">
              FEEDBACK PIPELINE — PROTOTYPE
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            {t('model_feedback_subtitle')}
          </p>
        </div>

        <button
          onClick={() => showToast('Queued 500 expert-verified field images for next YOLOv12 epoch training!', 'info')}
          className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 glow-emerald">
          <RefreshCw size={14} />
          <span>Queue Retraining Pipeline</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 glass-card border-white/10">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Total AI Predictions</span>
          <p className="text-2xl font-black text-white font-mono mt-1">{metrics.totalPredictions}</p>
          <span className="text-[10px] text-emerald-400 font-bold">Field Scans Processed</span>
        </div>

        <div className="p-4 glass-card border-emerald-500/30">
          <span className="text-[10px] font-extrabold text-emerald-300 uppercase">Expert Confirmations</span>
          <p className="text-2xl font-black text-emerald-400 font-mono mt-1">{metrics.expertConfirmations}</p>
          <span className="text-[10px] text-emerald-300 font-bold">Validated by Agronomists</span>
        </div>

        <div className="p-4 glass-card border-amber-500/30">
          <span className="text-[10px] font-extrabold text-amber-300 uppercase">Expert Corrections</span>
          <p className="text-2xl font-black text-amber-400 font-mono mt-1">{metrics.expertRejections}</p>
          <span className="text-[10px] text-amber-300 font-bold">Added to Misclassification Set</span>
        </div>

        <div className="p-4 glass-card border-purple-500/30">
          <span className="text-[10px] font-extrabold text-purple-300 uppercase">Model Precision Rate</span>
          <p className="text-2xl font-black text-purple-300 font-mono mt-1">{metrics.accuracyRate}</p>
          <span className="text-[10px] text-purple-400 font-bold">Validated Accuracy</span>
        </div>
      </div>

      {/* Feedback Logs Table */}
      <div className="glass-card p-6 border-white/10 space-y-4">
        <h2 className="text-base font-extrabold text-white font-heading flex items-center gap-2">
          <Database size={18} className="text-purple-400" />
          <span>Recent Field Confirmation Logs (Ground Truth Dataset)</span>
        </h2>

        <div className="space-y-3">
          {feedbackLogs.map(log => (
            <div key={log.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-purple-400">{log.id}</span>
                  <span className="font-extrabold text-white"><T text={log.crop} /></span>
                </div>
                <p className="text-slate-300">
                  AI Predicted: <strong className="text-slate-200"><T text={log.aiClass} /></strong> → Expert Ground Truth: <strong className="text-emerald-300"><T text={log.expertClass} /></strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                {log.status === 'Confirmed' ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                    ✓ Confirmed
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    ✎ Corrected
                  </span>
                )}
                <span className="text-[10px] text-slate-400"><T text={log.date} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
