import { useState } from 'react';
import { 
  ClipboardCheck, AlertTriangle, Users, MapPin, Calendar, CheckCircle2, 
  Clock, ShieldAlert, ArrowUpRight, Upload, Plus, FileText, Check, X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function ExtensionDashboard() {
  const { user } = useAuth();
  const { showToast } = useApp();

  const [cases, setCases] = useState([
    {
      id: 'CASE-2026-00421',
      farmer: 'Rajesh Kumar (राजेश कुमार)',
      phone: '9876543210',
      location: 'Dindori, Nashik',
      crop: 'Soybean',
      disease: 'Anthracnose & Pod Blight',
      aiConfidence: '87%',
      severity: 'Critical',
      status: 'Validation Pending',
      reportedAt: 'Today, 07:45 AM',
      priorityRank: 1,
      proximity: '1.2 km from Nashik Hotspot #4',
      delayed: false
    },
    {
      id: 'CASE-2026-00418',
      farmer: 'Priya Patil (प्रिया पाटील)',
      phone: '9876543211',
      location: 'Malegaon, Nashik',
      crop: 'Mango',
      disease: 'Powdery Mildew',
      aiConfidence: '92%',
      severity: 'High',
      status: 'Visit Scheduled',
      reportedAt: 'Yesterday, 04:20 PM',
      priorityRank: 2,
      proximity: '3.5 km from Hotspot',
      delayed: true
    },
    {
      id: 'CASE-2026-00415',
      farmer: 'Suresh More (सुरेश मोरे)',
      phone: '9876543219',
      location: 'Igatpuri, Nashik',
      crop: 'Tomato',
      disease: 'Early Blight Lesions',
      aiConfidence: '78%',
      severity: 'High',
      status: 'Follow-up Due',
      reportedAt: '2 days ago',
      priorityRank: 3,
      proximity: '0.8 km from Trap #3',
      delayed: false
    },
    {
      id: 'CASE-2026-00410',
      farmer: 'Babu Rao (बाबूराव)',
      phone: '9876543222',
      location: 'Sinnar, Nashik',
      crop: 'Onion',
      disease: 'Purple Blotch',
      aiConfidence: '81%',
      severity: 'Moderate',
      status: 'Confirmed',
      reportedAt: '3 days ago',
      priorityRank: 4,
      proximity: 'Isolated Farm',
      delayed: false
    }
  ]);

  const [selectedCase, setSelectedCase] = useState(null);
  const [fieldNotes, setFieldNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const handleUpdateCase = (caseId) => {
    if (!newStatus) {
      showToast('Please select a status update', 'error');
      return;
    }
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, status: newStatus } : c));
    showToast(`Case ${caseId} updated to ${newStatus}`, 'success');
    setSelectedCase(null);
    setFieldNotes('');
    setNewStatus('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Extension Header */}
      <div className="glass-card p-6 border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ClipboardCheck size={20} />
            </div>
            <h1 className="text-xl font-extrabold text-white font-heading">
              Extension Worker Field Triage Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold uppercase">
              KRISHI SEVAK PORTAL
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            Assigned Worker: <strong className="text-white">{user?.name || 'Aniket Deshmukh'}</strong> ({user?.region || 'Nashik District'})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold">Assigned Panchayats:</span>
          <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs font-bold">
            38 Farms • 12 Active Cases
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 glass-card border-red-500/30 bg-red-950/20">
          <span className="text-[10px] font-extrabold text-red-300 uppercase">Critical Cases</span>
          <p className="text-2xl font-black text-white font-mono mt-1">3</p>
          <span className="text-[9px] text-red-400 font-bold">Immediate Visit Needed</span>
        </div>

        <div className="p-4 glass-card border-amber-500/30 bg-amber-950/20">
          <span className="text-[10px] font-extrabold text-amber-300 uppercase">High Risk Farms</span>
          <p className="text-2xl font-black text-white font-mono mt-1">7</p>
          <span className="text-[9px] text-amber-400 font-bold">Within Hotspot 2km</span>
        </div>

        <div className="p-4 glass-card border-blue-500/30 bg-blue-950/20">
          <span className="text-[10px] font-extrabold text-blue-300 uppercase">Pending Visits</span>
          <p className="text-2xl font-black text-white font-mono mt-1">4</p>
          <span className="text-[9px] text-blue-400 font-bold">Scheduled for Today</span>
        </div>

        <div className="p-4 glass-card border-cyan-500/30 bg-cyan-950/20">
          <span className="text-[10px] font-extrabold text-cyan-300 uppercase">Active Hotspots</span>
          <p className="text-2xl font-black text-white font-mono mt-1">2</p>
          <span className="text-[9px] text-cyan-400 font-bold">Nashik Taluka</span>
        </div>

        <div className="p-4 glass-card border-emerald-500/30 bg-emerald-950/20 col-span-2 md:col-span-1">
          <span className="text-[10px] font-extrabold text-emerald-300 uppercase">Validations Awaiting</span>
          <p className="text-2xl font-black text-white font-mono mt-1">5</p>
          <span className="text-[9px] text-emerald-400 font-bold">Ready for Expert Sign-off</span>
        </div>
      </div>

      {/* Priority Case Queue */}
      <div className="glass-card p-6 border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-white font-heading flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-400" />
            <span>Priority Field Cases (Automated Risk Ranking)</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">Sorted by Outbreak Spread Potential & Delay</span>
        </div>

        <div className="space-y-3">
          {cases.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-black text-blue-400">{c.id}</span>
                  <span className="text-sm font-extrabold text-white font-heading">{c.farmer}</span>
                  <span className="text-xs text-slate-400">({c.phone})</span>
                  {c.severity === 'Critical' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-500/20 text-red-300 border border-red-500/40">CRITICAL</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">HIGH</span>
                  )}
                  {c.delayed && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-600/30 text-white border border-red-400 animate-pulse">DELAYED FOLLOW-UP</span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-medium pt-1">
                  <span>Crop: <strong className="text-white">{c.crop}</strong></span>
                  <span>Condition: <strong className="text-amber-300">{c.disease}</strong></span>
                  <span>AI Confidence: <strong className="text-emerald-400 font-mono">{c.aiConfidence}</strong></span>
                  <span className="flex items-center gap-1 text-slate-400"><MapPin size={12} className="text-emerald-400" /> {c.location}</span>
                </div>

                <p className="text-[11px] text-slate-400 mt-1">
                  Proximity Alert: <span className="text-slate-200 font-semibold">{c.proximity}</span> • Reported: {c.reportedAt}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => { setSelectedCase(c); setNewStatus(c.status); }}
                  className="px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-bold border border-blue-500/40 transition-all flex items-center gap-1">
                  <span>Manage Case</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Management Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-card p-6 w-full max-w-lg border-blue-500/40">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <span className="text-[10px] text-blue-400 font-mono font-bold">{selectedCase.id}</span>
                <h3 className="text-base font-extrabold text-white font-heading">{selectedCase.farmer} — {selectedCase.crop}</h3>
              </div>
              <button onClick={() => setSelectedCase(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <p className="text-slate-300"><strong className="text-slate-400">Suspected Condition:</strong> {selectedCase.disease} ({selectedCase.aiConfidence} AI Score)</p>
                <p className="text-slate-300"><strong className="text-slate-400">Location:</strong> {selectedCase.location}</p>
                <p className="text-slate-300"><strong className="text-slate-400">Current Status:</strong> <span className="text-amber-300 font-bold">{selectedCase.status}</span></p>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Update Case Status</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                  className="glass-input bg-surface-900 text-white">
                  <option value="Visit Scheduled">Schedule Field Visit</option>
                  <option value="Field Observation Recorded">Record Field Observation</option>
                  <option value="Submitted for Expert Validation">Submit for Expert Validation</option>
                  <option value="Referred to Soil/Lab Testing">Refer to Diagnostic Lab</option>
                  <option value="Follow-up Completed">Mark Follow-up Complete</option>
                  <option value="Case Resolved">Resolve Case</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Extension Field Notes / Upload</label>
                <textarea
                  rows={3}
                  placeholder="Record symptoms observed on plant stems, leaf undersides, soil dampness, or farmer feedback..."
                  value={fieldNotes}
                  onChange={e => setFieldNotes(e.target.value)}
                  className="glass-input resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Upload size={14} className="text-blue-400" />
                <span>Optionally attach fresh on-site photo during visit</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCase(null)}
                  className="w-1/2 py-2.5 rounded-xl bg-white/10 text-slate-300 font-bold hover:bg-white/15">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateCase(selectedCase.id)}
                  className="w-1/2 py-2.5 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 shadow-lg glow-emerald">
                  Save Status & Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
