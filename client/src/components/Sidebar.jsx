import { NavLink } from 'react-router-dom';
import { Home, ScanLine, Map, Users, BookOpen, User, Archive, Clock, Activity, Leaf, Building2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'nav_home' },
  { to: '/admin-dashboard', icon: Building2, label: 'nav_admin', badge: 'Govt' },
  { to: '/scan', icon: ScanLine, label: 'nav_scan' },
  { to: '/map', icon: Map, label: 'nav_map' },
  { to: '/experts', icon: Users, label: 'nav_experts' },
  { to: '/library', icon: BookOpen, label: 'nav_library' },
  { to: '/storage', icon: Archive, label: 'storage_tips' },
  { to: '/history', icon: Clock, label: 'my_history' },
  { to: '/profile', icon: User, label: 'nav_profile' },
];

export default function Sidebar() {
  const { t } = useApp();
  const { user } = useAuth();
  const isOfficer = user?.role === 'officer';

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 shrink-0 z-40 py-6 glass border-r border-emerald-500/20 shadow-2xl">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 mb-7">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xl glow-emerald shrink-0 border border-white/20">
          <Leaf size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight font-heading flex items-center gap-1">
            pikSense <span className="text-emerald-400">AI</span>
          </h1>
          <p className="text-[11px] text-emerald-300/80 font-extrabold tracking-wide">
            {isOfficer ? '🏛️ Govt Operations' : 'Smart Agronomist'}
          </p>
        </div>
      </div>

      {/* Role / Farm Health Pill Card */}
      <div className={`mx-5 mb-6 p-3.5 rounded-2xl border transition-all ${
        isOfficer
          ? 'bg-amber-500/10 border-amber-500/30'
          : 'bg-emerald-500/10 border-emerald-500/30 glow-emerald'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
            isOfficer ? 'bg-amber-500/20 border-amber-500/40' : 'bg-emerald-500/20 border-emerald-500/40'
          }`}>
            {isOfficer ? (
              <Building2 size={18} className="text-amber-300" />
            ) : (
              <Activity size={18} className="text-emerald-300 animate-pulse" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold text-white font-heading truncate">
              {isOfficer ? (user?.name || 'Govt Official') : '88% Health Index'}
            </p>
            <p className={`text-[10px] font-bold truncate ${
              isOfficer ? 'text-amber-300' : 'text-emerald-300'
            }`}>
              {isOfficer ? (user?.designation || 'DAO Officer') : 'Optimal Crop State'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Directory */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-none">
        {navItems.map(({ to, icon: Icon, label, badge }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 text-xs font-extrabold group ${
              isActive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 glow-emerald'
                : 'text-surface-300 hover:bg-white/6 hover:text-white border border-transparent'
            }`
          }>
            {({ isActive }) => (
              <>
                <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} className={`transition-transform duration-300 ${isActive ? 'scale-110 text-emerald-400' : 'group-hover:scale-105 text-emerald-400/80'}`} />
                <span className="truncate">{t(label)}</span>
                {badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 ml-auto shrink-0 uppercase tracking-wider">
                    {badge}
                  </span>
                )}
                {isActive && !badge && <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/80 shrink-0" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer Info */}
      <div className="px-6 pt-4 border-t border-emerald-500/15">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-emerald-300/70 font-extrabold flex items-center gap-1">
            <Sparkles size={12} className="text-emerald-400" /> SIH 2024 • v2.0
          </p>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>
    </aside>
  );
}
