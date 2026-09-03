import { NavLink } from 'react-router-dom';
import { Home, ScanLine, Map, Users, Building2, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function BottomNav() {
  const { t } = useApp();
  const { user } = useAuth();
  const isOfficer = user?.role === 'officer';

  const navItems = [
    { to: isOfficer ? '/admin-dashboard' : '/dashboard', icon: isOfficer ? Building2 : Home, label: isOfficer ? 'nav_admin' : 'nav_home' },
    { to: '/scan', icon: ScanLine, label: 'nav_scan', highlight: true },
    { to: '/map', icon: Map, label: 'nav_map' },
    { to: '/experts', icon: Users, label: 'nav_experts' },
    { to: '/profile', icon: User, label: 'nav_profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bottom-nav glass border-t border-white/10 shadow-2xl">
      <div className="flex justify-around items-center h-[70px] max-w-lg mx-auto px-3">
        {navItems.map(({ to, icon: Icon, label, highlight }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-300 min-w-[54px] relative ${
              isActive
                ? 'text-emerald-300 font-extrabold'
                : 'text-surface-400 hover:text-surface-200'
            }`
          }>
            {({ isActive }) => (
              <>
                {highlight ? (
                  <div className={`w-12 h-12 -mt-6 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-xl glow-emerald transition-transform active:scale-90 border border-white/20 ${isActive ? 'scale-110 ring-2 ring-emerald-300' : ''}`}>
                    <Icon size={24} strokeWidth={2.4} />
                  </div>
                ) : (
                  <div className={`transition-transform duration-300 ${isActive ? 'scale-110 text-emerald-400' : ''}`}>
                    <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} />
                  </div>
                )}
                <span className={`text-[10px] truncate max-w-[64px] ${isActive ? 'font-extrabold text-emerald-300' : 'font-medium'}`}>{t(label)}</span>
                {isActive && !highlight && (
                  <div className="w-3.5 h-1 rounded-full bg-emerald-400 mt-0.5 shadow-sm shadow-emerald-400/80" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
