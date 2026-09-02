import { NavLink } from 'react-router-dom';
import { Home, ScanLine, Map, Users, BookOpen, User, Archive, Clock, Sparkles, Activity, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'nav_home' },
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
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 shrink-0 z-40 py-6 glass border-r border-emerald-500/20">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 via-primary-500 to-emerald-700 flex items-center justify-center text-white shadow-xl glow-emerald shrink-0">
          <Leaf size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight font-heading">pikSense <span className="text-primary-400">AI</span></h1>
          <p className="text-[11px] text-emerald-300/80 font-bold tracking-wide">Smart Agronomist</p>
        </div>
      </div>

      {/* Farm Health Pill */}
      <div className="mx-6 mb-6 p-3 rounded-2xl bg-primary-500/15 border border-primary-500/30 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-primary-500/25 flex items-center justify-center shrink-0">
          <Activity size={16} className="text-primary-300 animate-pulse" />
        </div>
        <div>
          <p className="text-xs font-bold text-white font-heading">88% Farm Index</p>
          <p className="text-[10px] text-primary-300 font-semibold">Optimal Health</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-none">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-semibold group ${
              isActive
                ? 'bg-primary-500/22 text-primary-300 border border-primary-500/40 shadow-lg shadow-primary-500/15'
                : 'text-surface-300 hover:bg-white/6 hover:text-white border border-transparent'
            }`
          }>
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} className={`transition-transform duration-300 ${isActive ? 'scale-110 text-primary-400' : 'group-hover:scale-105 text-emerald-400/80'}`} />
                <span className="truncate">{t(label)}</span>
                {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-primary-400 shadow-md shadow-primary-400/80 shrink-0" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer info */}
      <div className="px-6 pt-4 border-t border-emerald-500/15">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-emerald-300/70 font-semibold">SIH 2024 • v1.2.0</p>
          <span className="w-2 h-2 rounded-full bg-primary-400 animate-ping" />
        </div>
      </div>
    </aside>
  );
}
