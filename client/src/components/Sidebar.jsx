import { NavLink } from 'react-router-dom';
import { Home, ScanLine, Map, Users, BookOpen, User, Archive, Clock, Activity, Leaf, Building2 } from 'lucide-react';
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
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 shrink-0 z-40 py-6 glass border-r border-emerald-500/20">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 via-primary-500 to-emerald-700 flex items-center justify-center text-white shadow-xl glow-emerald shrink-0">
          <Leaf size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight font-heading">pikSense <span className="text-primary-400">AI</span></h1>
          <p className="text-[11px] text-emerald-300/80 font-bold tracking-wide">
            {isOfficer ? '🏛️ Officer Console' : 'Smart Agronomist'}
          </p>
        </div>
      </div>

      {/* Role / Farm Health Pill */}
      <div className={`mx-6 mb-6 p-3 rounded-2xl border flex items-center gap-3 ${
        isOfficer
          ? 'bg-amber-500/15 border-amber-500/30'
          : 'bg-primary-500/15 border-primary-500/30'
      }`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
          isOfficer ? 'bg-amber-500/25' : 'bg-primary-500/25'
        }`}>
          {isOfficer ? (
            <Building2 size={16} className="text-amber-300" />
          ) : (
            <Activity size={16} className="text-primary-300 animate-pulse" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-white font-heading truncate">
            {isOfficer ? (user?.name || 'Govt Officer') : '88% Farm Index'}
          </p>
          <p className={`text-[10px] font-semibold truncate ${
            isOfficer ? 'text-amber-300' : 'text-primary-300'
          }`}>
            {isOfficer ? (user?.designation || 'DAO Officer') : 'Optimal Health'}
          </p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-none">
        {navItems.map(({ to, icon: Icon, label, badge }) => (
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
                {badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 ml-auto shrink-0">
                    {badge}
                  </span>
                )}
                {isActive && !badge && <div className="ml-auto w-2 h-2 rounded-full bg-primary-400 shadow-md shadow-primary-400/80 shrink-0" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer info */}
      <div className="px-6 pt-4 border-t border-emerald-500/15">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-emerald-300/70 font-semibold">SIH 2024 • v1.3.0</p>
          <span className="w-2 h-2 rounded-full bg-primary-400 animate-ping" />
        </div>
      </div>
    </aside>
  );
}
