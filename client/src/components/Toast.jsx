import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="text-primary-400 shrink-0" />,
    error: <AlertCircle size={18} className="text-danger-400 shrink-0" />,
    info: <Info size={18} className="text-accent-400 shrink-0" />
  };

  const borders = {
    success: 'border-primary-500/30 bg-primary-950/80 text-primary-200',
    error: 'border-danger-500/30 bg-danger-950/80 text-danger-200',
    info: 'border-accent-500/30 bg-accent-950/80 text-accent-200'
  };

  return (
    <div className="fixed top-5 right-5 z-[100] animate-slide-up max-w-sm">
      <div className={`glass px-4 py-3 rounded-2xl border shadow-2xl flex items-center gap-3 backdrop-blur-xl ${borders[toast.type] || borders.info}`}>
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium pr-2">{toast.message}</p>
      </div>
    </div>
  );
}
