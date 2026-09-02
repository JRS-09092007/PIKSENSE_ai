import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Eye, CheckCircle, UserCheck, Trash2 } from 'lucide-react';

export default function History() {
  const { t, scanHistory, setScanHistory, showToast } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');

  const statusConfig = {
    monitoring: { label: t('monitoring'), icon: Eye, color: 'bg-accent-500/15 text-accent-300 border-accent-500/30' },
    resolved: { label: t('resolved'), icon: CheckCircle, color: 'bg-primary-500/15 text-primary-300 border-primary-500/30' },
    'expert-reviewed': { label: t('expert_reviewed'), icon: UserCheck, color: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
  };

  const filtered = scanHistory.filter(s => statusFilter === 'all' || s.status === statusFilter);

  const updateStatus = (scanId, newStatus) => {
    setScanHistory(prev => prev.map(s => s.id === scanId ? { ...s, status: newStatus } : s));
    showToast(`Status updated to ${statusConfig[newStatus]?.label || newStatus}`, 'success');
  };

  const getConfColor = (c) => c >= 80 ? 'text-primary-400' : c >= 60 ? 'text-accent-400' : 'text-danger-400';

  return (
    <div className="pb-32 lg:pb-12 px-4 sm:px-6 pt-6 max-w-4xl mx-auto animate-slide-up space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading flex items-center gap-2">
          <Clock className="text-primary-400" /> {t('my_history')}
        </h1>
        <p className="text-sm text-surface-400">{t('history_subtitle')}</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['all', 'monitoring', 'resolved', 'expert-reviewed'].map(status => (
          <button key={status} onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === status
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/40 shadow-md'
                : 'bg-white/4 text-surface-400 border border-white/5 hover:bg-white/8'
            }`}>
            {status === 'all' ? t('all_scans') : statusConfig[status]?.label || status}
          </button>
        ))}
      </div>

      {/* Scans List */}
      <div className="space-y-3">
        {filtered.map(scan => {
          const detection = scan.detections?.[0];
          const sc = statusConfig[scan.status] || statusConfig.monitoring;
          const StatusIcon = sc.icon;
          return (
            <div key={scan.id} className="glass-card p-5 card-hover border border-white/8 space-y-4">
              <div className="flex items-start gap-4">
                {scan.image_url ? (
                  <img src={scan.image_url} alt="Scan" className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-white/10" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 text-3xl border border-white/5">🌿</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-extrabold text-white text-base font-heading truncate">{detection?.class_name || 'Crop Health Scan'}</h3>
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold border shrink-0 flex items-center gap-1 ${sc.color}`}>
                      <StatusIcon size={12} /> {sc.label}
                    </span>
                  </div>
                  <p className="text-xs text-surface-400 mb-1.5">
                    Crop: <span className="font-bold text-white uppercase">{scan.crop_type}</span> • {new Date(scan.created_at).toLocaleDateString()}
                  </p>
                  {detection && (
                    <p className={`text-xs font-extrabold ${getConfColor(detection.confidence)}`}>
                      {t('confidence')}: {detection.confidence}%
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-white/5">
                {scan.status !== 'resolved' && (
                  <button onClick={() => updateStatus(scan.id, 'resolved')}
                    className="flex-1 py-2.5 rounded-xl bg-primary-500/15 hover:bg-primary-500/25 text-primary-300 text-xs font-bold border border-primary-500/30 transition-all active:scale-95">
                    ✅ {t('mark_resolved')}
                  </button>
                )}
                {scan.status === 'monitoring' && (
                  <button onClick={() => updateStatus(scan.id, 'expert-reviewed')}
                    className="flex-1 py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 text-xs font-bold border border-blue-500/30 transition-all active:scale-95">
                    👨‍🔬 {t('expert_reviewed')}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 glass-card border border-white/5">
            <Clock size={48} className="mx-auto text-surface-600 mb-3" />
            <p className="text-surface-300 font-medium">{scanHistory.length === 0 ? t('no_recent_activity') : 'No scans match this status filter'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
