import { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, HelpCircle, FlaskConical, MessageSquare, AlertTriangle, Eye, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ExpertValidation() {
  const { showToast } = useApp();

  const [validations, setValidations] = useState([
    {
      id: 'VAL-2026-0091',
      caseId: 'CASE-2026-00421',
      farmerName: 'Rajesh Kumar (राजेश कुमार)',
      crop: 'Soybean',
      location: 'Dindori, Nashik',
      aiPrediction: 'Anthracnose & Pod Blight',
      aiConfidence: '87%',
      severity: 'Critical',
      date: 'Today, 08:15 AM',
      symptoms: ['Dark brown sunken lesions on leaves', 'Panicle dieback', 'Lower stem rot'],
      weatherContext: '86% RH, 38mm Rainfall in 24h',
      nearbyHotspot: '1.2 km from Nashik Outbreak Cluster #4',
      status: 'Pending Expert Review',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19655?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'VAL-2026-0089',
      caseId: 'CASE-2026-00418',
      farmerName: 'Priya Patil (प्रिया पाटील)',
      crop: 'Mango',
      location: 'Ratnagiri Belt',
      aiPrediction: 'Powdery Mildew (Oidium mangiferae)',
      aiConfidence: '92%',
      severity: 'High',
      date: 'Yesterday',
      symptoms: ['White powdery coating on blossom panicles', 'Flower drop'],
      weatherContext: '14°C night temp, morning fog',
      nearbyHotspot: '3.5 km from Konkan Mildew Zone',
      status: 'Pending Expert Review',
      image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  const [activeVal, setActiveVal] = useState(validations[0]);
  const [expertNote, setExpertNote] = useState('');

  const handleAction = (actionType) => {
    let newStatus = '';
    let msg = '';
    if (actionType === 'confirm') {
      newStatus = 'Confirmed by Expert';
      msg = 'Diagnosis confirmed! IPM advisory dispatched to farmer.';
    } else if (actionType === 'reject') {
      newStatus = 'Diagnosis Rejected';
      msg = 'Diagnosis rejected. Re-analysis queued.';
    } else if (actionType === 'lab') {
      newStatus = 'Referred to Diagnostic Lab';
      msg = 'Case referred for ICAR/KVK laboratory PCR testing.';
    } else if (actionType === 'info') {
      newStatus = 'More Information Requested';
      msg = 'Requested additional leaf images from Extension Officer.';
    }

    setValidations(prev => prev.map(v => v.id === activeVal.id ? { ...v, status: newStatus } : v));
    showToast(msg, 'success');
    setExpertNote('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-card p-6 border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h1 className="text-xl font-extrabold text-white font-heading">
              Agronomist & Expert Validation Portal
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase">
              EXPERT DECISION LOOP
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            Review AI preliminary crop health predictions, inspect field evidence, and issue official verified advisories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
            {validations.filter(v => v.status.includes('Pending')).length} Pending Verification
          </span>
        </div>
      </div>

      {/* Main Validation Split View */}
      {activeVal && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Field Evidence & Image Analysis */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-4 border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400">{activeVal.caseId}</span>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
                  {activeVal.severity} SEVERITY
                </span>
              </div>

              {/* Sample Photo Preview */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-video bg-black flex items-center justify-center">
                <img
                  src={activeVal.image}
                  alt="Crop Leaf Evidence"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-white font-mono">
                  Visual AI Detection Overlay: {activeVal.aiConfidence}
                </div>
              </div>

              {/* Quick Case Metadata */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs text-slate-300">
                <p><strong className="text-slate-400">Farmer:</strong> {activeVal.farmerName}</p>
                <p><strong className="text-slate-400">Location:</strong> {activeVal.location}</p>
                <p><strong className="text-slate-400">Weather Context:</strong> {activeVal.weatherContext}</p>
                <p><strong className="text-slate-400">Hotspot Proximity:</strong> <span className="text-amber-300">{activeVal.nearbyHotspot}</span></p>
              </div>
            </div>
          </div>

          {/* Right Column: AI Analysis & Expert Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-card p-6 border-emerald-500/30 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">AI Preliminary Assessment</span>
                  <h2 className="text-xl font-extrabold text-white font-heading mt-0.5">{activeVal.aiPrediction}</h2>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">AI Confidence</span>
                  <p className="text-2xl font-black text-emerald-400 font-mono">{activeVal.aiConfidence}</p>
                </div>
              </div>

              {/* Symptoms Breakdown */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-2">Detected Visual Symptoms:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeVal.symptoms.map((sym, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 text-xs font-bold">
                      ✓ {sym}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expert Notes Box */}
              <div>
                <label className="block text-xs font-extrabold text-slate-200 mb-1.5">
                  Agronomist Remarks & Management Note
                </label>
                <textarea
                  rows={3}
                  placeholder="Add specific chemical active ingredients, spray interval, or laboratory instructions..."
                  value={expertNote}
                  onChange={e => setExpertNote(e.target.value)}
                  className="glass-input resize-none text-xs"
                />
              </div>

              {/* Validation Decision Buttons */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">Official Validation Action:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleAction('confirm')}
                    className="p-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold flex flex-col items-center gap-1 transition-all">
                    <CheckCircle2 size={18} />
                    <span>Confirm</span>
                  </button>

                  <button
                    onClick={() => handleAction('reject')}
                    className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-extrabold flex flex-col items-center gap-1 transition-all">
                    <XCircle size={18} />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => handleAction('lab')}
                    className="p-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-extrabold flex flex-col items-center gap-1 transition-all">
                    <FlaskConical size={18} />
                    <span>Refer Lab</span>
                  </button>

                  <button
                    onClick={() => handleAction('info')}
                    className="p-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-extrabold flex flex-col items-center gap-1 transition-all">
                    <HelpCircle size={18} />
                    <span>Req Info</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
