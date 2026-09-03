import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import VoiceAssistant from './components/VoiceAssistant';
import Toast from './components/Toast';

import Onboarding from './pages/Onboarding';
import Register from './pages/Register';
import Login from './pages/Login';
import SelectCrops from './pages/SelectCrops';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Scan from './pages/Scan';
import MapPage from './pages/MapPage';
import Experts from './pages/Experts';
import Storage from './pages/Storage';
import History from './pages/History';
import Library from './pages/Library';
import Profile from './pages/Profile';

function ProtectedLayout() {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen min-h-dvh flex items-center justify-center bg-[#061410]">
      <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-400 rounded-full animate-spin glow-emerald" />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="lg:flex min-h-screen min-h-dvh bg-[#061410] relative">
      <Sidebar />
      <div className="flex-1 min-w-0 min-h-screen min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <BottomNav />
      <VoiceAssistant />
      <Toast />
    </div>
  );
}

function AuthGuard({ children }) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={user.role === 'officer' ? '/admin-dashboard' : '/dashboard'} replace />;
  }
  return children;
}

function OnboardingGuard() {
  const { onboardingDone } = useApp();
  if (!onboardingDone) return <Navigate to="/onboarding" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Onboarding */}
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Auth routes */}
            <Route element={<OnboardingGuard />}>
              <Route path="/login" element={<AuthGuard><Login /></AuthGuard>} />
              <Route path="/register" element={<AuthGuard><Register /></AuthGuard>} />
            </Route>

            <Route path="/select-crops" element={<SelectCrops />} />

            {/* Protected app routes */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/experts" element={<Experts />} />
              <Route path="/storage" element={<Storage />} />
              <Route path="/history" element={<History />} />
              <Route path="/library" element={<Library />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/onboarding" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
