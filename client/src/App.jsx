import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';

import AppLayout from './components/AppLayout';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Register from './pages/Register';
import Login from './pages/Login';
import SelectCrops from './pages/SelectCrops';

import Dashboard from './pages/Dashboard';
import ExtensionDashboard from './pages/ExtensionDashboard';
import AdminDashboard from './pages/AdminDashboard';

import Scan from './pages/Scan';
import PestTrapSensor from './pages/PestTrapSensor';
import RiskIntelligence from './pages/RiskIntelligence';
import MapPage from './pages/MapPage';
import ExpertValidation from './pages/ExpertValidation';
import FollowUpTimeline from './pages/FollowUpTimeline';
import ModelFeedback from './pages/ModelFeedback';

import Experts from './pages/Experts';
import Storage from './pages/Storage';
import History from './pages/History';
import Library from './pages/Library';
import Profile from './pages/Profile';

function ProtectedLayout() {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#030d0a]">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin glow-emerald" />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return <AppLayout />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<Landing />} />

            {/* Onboarding & Auth */}
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/select-crops" element={<SelectCrops />} />

            {/* Protected application routes */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/extension-dashboard" element={<ExtensionDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

              <Route path="/scan" element={<Scan />} />
              <Route path="/pest-sensors" element={<PestTrapSensor />} />
              <Route path="/risk-intelligence" element={<RiskIntelligence />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/expert-validation" element={<ExpertValidation />} />
              <Route path="/followup-timeline" element={<FollowUpTimeline />} />
              <Route path="/model-feedback" element={<ModelFeedback />} />

              <Route path="/experts" element={<Experts />} />
              <Route path="/storage" element={<Storage />} />
              <Route path="/history" element={<History />} />
              <Route path="/library" element={<Library />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

