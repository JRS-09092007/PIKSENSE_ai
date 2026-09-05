import { NavLink } from 'react-router-dom';
import { 
  Home, ScanLine, Map, Users, BookOpen, User, Archive, Clock, 
  Activity, Leaf, Building2, Sparkles, Bug, ThermometerSun, 
  ClipboardCheck, RotateCcw, Cpu, ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { t } = useApp();
  const { user, switchRole } = useAuth();
  const role = user?.role || 'farmer';

  // Navigation Items per Role
  const farmerNav = [
    { to: '/dashboard', icon: Home, label: 'Farmer Home' },
    { to: '/scan', icon: ScanLine, label: 'Scan & Diagnose' },
    { to: '/pest-sensors', icon: Bug, label: 'Pest Traps & Sensors' },
    { to: '/risk-intelligence', icon: ThermometerSun, label: 'Risk Intelligence' },
    { to: '/map', icon: Map, label: 'Outbreak Map' },
    { to: '/followup-timeline', icon: RotateCcw, label: 'Follow-up Recovery' },
    { to: '/library', icon: BookOpen, label: 'IPM Advisories' },
    { to: '/experts', icon: Users, label: 'Consult Experts' },
    { to: '/history', icon: Clock, label: 'Scan History' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const extensionNav = [
    { to: '/extension-dashboard', icon: ClipboardCheck, label: 'Extension Triage' },
    { to: '/expert-validation', icon: ShieldCheck, label: 'Case Validations' },
    { to: '/map', icon: Map, label: 'Hotspot Surveillance' },
    { to: '/pest-sensors', icon: Bug, label: 'Pest Traps' },
    { to: '/followup-timeline', icon: RotateCcw, label: 'Field Follow-ups' },
    { to: '/library', icon: BookOpen, label: 'IPM Library' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const officerNav = [
    { to: '/admin-dashboard', icon: Building2, label: 'Govt Command Center' },
    { to: '/map', icon: Map, label: 'District Hotspots' },
    { to: '/risk-intelligence', icon: ThermometerSun, label: 'State Risk Analytics' },
    { to: '/pest-sensors', icon: Bug, label: 'Pest & Sensor Matrix' },
    { to: '/model-feedback', icon: Cpu, label: 'AI Continuous Learning' },
    { to: '/expert-validation', icon: ShieldCheck, label: 'Validation Monitor' },
    { to: '/library', icon: BookOpen, label: 'Advisory Standards' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const activeNav = role === 'officer' ? officerNav : role === 'extension' ? extensionNav : farmerNav;

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 shrink-0 z-40 py-5 glass border-r border-emerald-500/20 shadow-2xl">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xl glow-emerald shrink-0 border border-white/20">
          <Leaf size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-extrabold text-white tracking-tight font-heading flex items-center gap-1">
            पीक<span className="text-emerald-400">Sense</span>
          </h1>
          <p className="text-[10px] text-emerald-300/80 font-bold uppercase tracking-wider">
            SIH 2024 • Govt of Maha
          </p>
        </div>
      </div>

      {/* Role Switcher Widget */}
      <div className="mx-4 mb-4 p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-xs font-medium">
        <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-extrabold mb-1.5 flex items-center justify-between">
          <span>Active Role View</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </p>
        <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-xl border border-white/10">
          <button
            onClick={() => switchRole('farmer')}
            className={`py-1 rounded-lg text-[10px] font-bold transition-all ${
              role === 'farmer' ? 'bg-emerald-500 text-white shadow-md' : 'text-surface-400 hover:text-white'
            }`}>
            🌾 Farmer
          </button>
          <button
            onClick={() => switchRole('extension')}
            className={`py-1 rounded-lg text-[10px] font-bold transition-all ${
              role === 'extension' ? 'bg-emerald-500 text-white shadow-md' : 'text-surface-400 hover:text-white'
            }`}>
            🧑‍🌾 Field
          </button>
          <button
            onClick={() => switchRole('officer')}
            className={`py-1 rounded-lg text-[10px] font-bold transition-all ${
              role === 'officer' ? 'bg-amber-500 text-white shadow-md' : 'text-surface-400 hover:text-white'
            }`}>
            🏛️ Officer
          </button>
        </div>
      </div>

      {/* Navigation Directory */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-none">
        {activeNav.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all duration-300 text-xs font-extrabold group ${
              isActive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 glow-emerald'
                : 'text-surface-300 hover:bg-white/6 hover:text-white border border-transparent'
            }`
          }>
            {({ isActive }) => (
              <>
                <Icon size={17} strokeWidth={isActive ? 2.4 : 1.8} className={`transition-transform duration-300 ${isActive ? 'scale-110 text-emerald-400' : 'group-hover:scale-105 text-emerald-400/80'}`} />
                <span className="truncate">{label}</span>
                {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/80 shrink-0" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer Info */}
      <div className="px-5 pt-3 border-t border-emerald-500/15">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-emerald-300/70 font-extrabold flex items-center gap-1">
            <Sparkles size={11} className="text-emerald-400" /> SIH 26131 Prototype
          </p>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
            v2.5
          </span>
        </div>
      </div>
    </aside>
  );
}

