import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, Leaf, ShieldAlert, Cpu, MapPin, Users, BarChart3, 
  ArrowRight, CheckCircle2, ChevronRight, CloudRain, Bug, ShieldCheck
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleRoleSelect = (rolePath, roleKey) => {
    switchRole(roleKey);
    navigate(rolePath);
  };

  return (
    <div className="min-h-screen bg-[#030d0a] text-slate-100 flex flex-col font-sans">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-50 glass-header px-6 py-4 flex items-center justify-between border-b border-emerald-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg glow-emerald">
            <Leaf size={22} />
          </div>
          <div>
            <h1 className="font-extrabold text-white text-lg tracking-tight font-heading">
              पीक<span className="text-emerald-400">Sense</span>
            </h1>
            <p className="text-[10px] text-emerald-300/80 font-bold uppercase tracking-wider">
              Govt of Maharashtra • SIH Problem Statement 26131
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleRoleSelect('/dashboard', 'farmer')}
            className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition-all flex items-center gap-2">
            <span>🌾 Farmer Portal</span>
          </button>
          <button
            onClick={() => handleRoleSelect('/admin-dashboard', 'officer')}
            className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition-all flex items-center gap-2">
            <span>🏛️ Official Command Center</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 max-w-6xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-6 glow-emerald">
          <Sparkles size={14} className="text-emerald-400 animate-pulse" />
          <span>Early Detection & Crop Health Intelligence Platform</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight font-heading">
          Early Detection. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Smarter Intervention.</span> Healthier Crops.
        </h1>

        <p className="mt-6 text-base md:text-lg text-slate-300 max-w-2xl font-medium leading-relaxed">
          An integrated early-warning decision-support ecosystem connecting farmers, AI visual diagnostics, weather risks, pest traps, extension workers, and agriculture officials across Maharashtra.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleRoleSelect('/scan', 'farmer')}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm shadow-xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 glow-emerald">
            <Cpu size={18} />
            <span>Scan Crop Disease (AI Demo)</span>
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => handleRoleSelect('/map', 'officer')}
            className="px-7 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-extrabold text-sm border border-white/15 hover:border-emerald-500/40 transition-all flex items-center gap-2">
            <MapPin size={18} className="text-emerald-400" />
            <span>Explore Hotspot Map</span>
          </button>
        </div>

        {/* Badge Banner */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold border-t border-white/10 pt-8 max-w-3xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Problem ID: 26131</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Govt of Maharashtra</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Dept of Skills & Entrepreneurship</span>
          </div>
        </div>
      </section>

      {/* Role Selection Launchpad */}
      <section className="px-6 py-12 bg-emerald-950/30 border-y border-emerald-500/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading">
              Select User Role Experience
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium">
              Demonstrating the full 3-tier user hierarchy required by the SIH problem statement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Farmer Card */}
            <div className="glass-card p-6 border border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Leaf size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-white font-heading">1. Farmer Experience</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">
                  Simple, large-touch interface designed for rural farmers. Upload leaf photos, view weather-based risk forecasts, monitor pest traps, and receive IPM advisories in Marathi/Hindi.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-emerald-300/90 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Instant Visual AI Scan & Symptoms</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Pest Trap & Sensor Data Tracking</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Multilingual IPM Advisories</li>
                </ul>
              </div>
              <button
                onClick={() => handleRoleSelect('/dashboard', 'farmer')}
                className="mt-6 w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-extrabold text-xs border border-emerald-500/40 transition-all flex items-center justify-center gap-2">
                <span>Launch Farmer Dashboard</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Extension Worker Card */}
            <div className="glass-card p-6 border border-blue-500/30 hover:border-blue-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-white font-heading">2. Extension Worker</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">
                  Field triage tool for Krishi Sevaks. Review incoming farmer disease reports, prioritize high-risk outbreaks, schedule farm visits, log field photos, and validate AI predictions.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-blue-300/90 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-400" /> Priority Field Case Triage Queue</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-400" /> Expert Validation & Lab Referral</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-400" /> Follow-up Recovery Monitoring</li>
                </ul>
              </div>
              <button
                onClick={() => handleRoleSelect('/extension-dashboard', 'extension')}
                className="mt-6 w-full py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-extrabold text-xs border border-blue-500/40 transition-all flex items-center justify-center gap-2">
                <span>Launch Extension Portal</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Agriculture Official Card */}
            <div className="glass-card p-6 border border-amber-500/30 hover:border-amber-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-white font-heading">3. Govt Official</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-medium">
                  Macro command center for Maharashtra State Agriculture Department. Track district-level disease hotspots, pest emergence trends, surveillance coverage, and direct preventive relief.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-amber-300/90 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-amber-400" /> Interactive Geospatial Outbreak Map</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-amber-400" /> District-wise Disease & Pest Analytics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-amber-400" /> Continuous AI Model Feedback Loop</li>
                </ul>
              </div>
              <button
                onClick={() => handleRoleSelect('/admin-dashboard', 'officer')}
                className="mt-6 w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-extrabold text-xs border border-amber-500/40 transition-all flex items-center justify-center gap-2">
                <span>Launch Official Command Center</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* End-to-End Early Warning Workflow Architecture */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
            System Architecture
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-heading mt-2">
            The Complete Early Warning & Response Loop
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 glass-card border border-white/10 text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Cpu size={20} />
            </div>
            <h4 className="text-sm font-extrabold text-white">1. AI Image Scan</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">YOLOv12 symptom bounding boxes & preliminary confidence</p>
          </div>

          <div className="p-4 glass-card border border-white/10 text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <CloudRain size={20} />
            </div>
            <h4 className="text-sm font-extrabold text-white">2. Risk Intelligence</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Combines Weather + Stage + Variety + Soil + History</p>
          </div>

          <div className="p-4 glass-card border border-white/10 text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3">
              <MapPin size={20} />
            </div>
            <h4 className="text-sm font-extrabold text-white">3. Hotspot Mapping</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Cluster overlays across Nashik, Ratnagiri & Maharashtra</p>
          </div>

          <div className="p-4 glass-card border border-white/10 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck size={20} />
            </div>
            <h4 className="text-sm font-extrabold text-white">4. Expert Validation</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Krishi Sevak & Agronomist review with IPM advisory</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto px-6 py-6 border-t border-white/10 text-center text-xs text-slate-500 font-medium">
        <p>पीकSense — Smart India Hackathon Prototype • Problem Statement 26131</p>
        <p className="mt-1 text-[11px] text-slate-600">Department of Agriculture, Government of Maharashtra</p>
      </footer>
    </div>
  );
}
