import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import VoiceAssistant from './VoiceAssistant';
import Toast from './Toast';

export default function AppLayout() {
  return (
    <div className="lg:flex min-h-screen min-h-dvh bg-[#05120e] relative text-surface-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Desktop Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 min-h-screen min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1 relative">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav />

      {/* Global Voice AI Floating Trigger */}
      <VoiceAssistant />

      {/* Global Notification Toast */}
      <Toast />
    </div>
  );
}
