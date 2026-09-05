import { useState } from 'react';
import { 
  Bug, Activity, Thermometer, Droplets, MapPin, TrendingUp, 
  Plus, Play, AlertTriangle, CheckCircle2, ShieldAlert, Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PestTrapSensor() {
  const { t, T, showToast } = useApp();
  const [traps, setTraps] = useState([
    { id: 1, name: 'Pheromone Trap #1 (Fall Armyworm)', pest: 'Fall Armyworm', count: 18, prevCount: 11, trend: 'Increasing (+63%)', risk: 'High', crop: 'Soybean', location: 'Dindori Plot A', lastChecked: 'Today, 08:30 AM' },
    { id: 2, name: 'Light Trap #2 (Yellow Stem Borer)', pest: 'Stem Borer', count: 7, prevCount: 9, trend: 'Decreasing (-22%)', risk: 'Moderate', crop: 'Rice', location: 'Field B2, Igatpuri', lastChecked: 'Yesterday' },
    { id: 3, name: 'Sticky Trap #3 (Whitefly / Thrips)', pest: 'Whitefly', count: 24, prevCount: 14, trend: 'Increasing (+71%)', risk: 'Critical', crop: 'Tomato', location: 'Greenhouse #1', lastChecked: 'Today, 09:15 AM' },
    { id: 4, name: 'Pheromone Trap #4 (Pink Bollworm)', pest: 'Pink Bollworm', count: 4, prevCount: 5, trend: 'Stable', risk: 'Low', crop: 'Cotton', location: 'Malegaon Zone 3', lastChecked: '2 days ago' },
  ]);

  const [sensors] = useState([
    { id: 1, name: 'Leaf Wetness Sensor #1', value: '88%', status: 'High Fungal Risk', icon: Droplets, color: 'text-amber-400', desc: 'Prolonged moisture (>6h) promotes spore germination' },
    { id: 2, name: 'Soil Moisture Probe', value: '34%', status: 'Optimal', icon: Layers, color: 'text-emerald-400', desc: 'Well irrigated root zone' },
    { id: 3, name: 'Canopy Temperature', value: '29.4 °C', status: 'Moderate Stress', icon: Thermometer, color: 'text-cyan-400', desc: 'Slight thermal stress during peak noon' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTrap, setNewTrap] = useState({ name: '', pest: 'Fall Armyworm', count: '', crop: 'Soybean', location: '' });

  const handleAddTrap = (e) => {
    e.preventDefault();
    if (!newTrap.name || !newTrap.count) {
      showToast('Please fill in trap name and count', 'error');
      return;
    }
    const countNum = parseInt(newTrap.count);
    const added = {
      id: Date.now(),
      name: newTrap.name,
      pest: newTrap.pest,
      count: countNum,
      prevCount: Math.max(0, countNum - 5),
      trend: 'New Entry',
      risk: countNum > 15 ? 'High' : countNum > 8 ? 'Moderate' : 'Low',
      crop: newTrap.crop,
      location: newTrap.location || 'Nashik Farm',
      lastChecked: 'Just Now'
    };
    setTraps([added, ...traps]);
    setShowAddModal(false);
    showToast('New trap observation logged!', 'success');
  };

  const handleSimulateIoT = () => {
    setTraps(prev => prev.map(tItem => {
      const delta = Math.floor(Math.random() * 5) - 2;
      const newCount = Math.max(0, tItem.count + delta);
      return {
        ...tItem,
        prevCount: tItem.count,
        count: newCount,
        trend: delta > 0 ? `Increasing (+${delta})` : delta < 0 ? `Decreasing (${delta})` : 'Stable',
        risk: newCount > 20 ? 'Critical' : newCount > 12 ? 'High' : newCount > 6 ? 'Moderate' : 'Low',
        lastChecked: 'Just Now (IoT Stream)'
      };
    }));
    showToast('Simulated live IoT sensor telemetry sync!', 'info');
  };

  const getRiskBadge = (risk) => {
    if (risk === 'Critical') return <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-red-500/20 text-red-300 border border-red-500/40">{t('risk_high')}</span>;
    if (risk === 'High') return <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">{t('risk_high')}</span>;
    if (risk === 'Moderate') return <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">{t('risk_medium')}</span>;
    return <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">{t('risk_low')}</span>;
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header & Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 border-emerald-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Bug size={20} />
            </div>
            <h1 className="text-xl font-extrabold text-white font-heading">
              {t('pest_traps_title')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase">
              DEMO / SENSOR TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            {t('pest_traps_subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateIoT}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-500/40 transition-all flex items-center gap-1.5">
            <Play size={14} className="text-cyan-400" />
            <span>Simulate IoT Pulse</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 glow-emerald">
            <Plus size={14} />
            <span>Log Trap Count</span>
          </button>
        </div>
      </div>

      {/* Sensor Gauge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sensors.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="glass-card p-5 border-white/10 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-300"><T text={s.name} /></span>
                <Icon size={18} className={s.color} />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-black text-white font-mono">{s.value}</span>
                <span className="text-xs font-bold text-amber-300"><T text={s.status} /></span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-medium leading-snug"><T text={s.desc} /></p>
            </div>
          );
        })}
      </div>

      {/* Pheromone & Light Trap Telemetry Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-white font-heading flex items-center gap-2">
          <Activity size={18} className="text-emerald-400" />
          <span>{t('live_sensor_telemetry')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {traps.map(trap => (
            <div key={trap.id} className="glass-card p-5 border border-white/10 hover:border-emerald-500/40 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-white text-sm font-heading"><T text={trap.name} /></h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin size={12} className="text-emerald-400" /> <T text={trap.location} /> • <span className="text-slate-300 font-semibold"><T text={trap.crop} /></span>
                  </p>
                </div>
                {getRiskBadge(trap.risk)}
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-white/5 grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Current Count</span>
                  <p className="text-xl font-black text-white font-mono mt-0.5">{trap.count}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Previous Count</span>
                  <p className="text-xl font-black text-slate-400 font-mono mt-0.5">{trap.prevCount}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Trend</span>
                  <p className={`text-xs font-bold mt-1 ${trap.trend.includes('Increasing') ? 'text-red-400' : 'text-emerald-400'}`}>
                    <T text={trap.trend} />
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Target Pest: <strong className="text-slate-200"><T text={trap.pest} /></strong></span>
                <span>Checked: <T text={trap.lastChecked} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Trap Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-card p-6 w-full max-w-md border-emerald-500/40">
            <h3 className="text-base font-extrabold text-white font-heading mb-4">Log Trap Observation</h3>
            <form onSubmit={handleAddTrap} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Trap Name / ID</label>
                <input
                  type="text"
                  placeholder="e.g. Trap #5 (Fall Armyworm)"
                  value={newTrap.name}
                  onChange={e => setNewTrap({ ...newTrap, name: e.target.value })}
                  className="glass-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Pest Species</label>
                  <select
                    value={newTrap.pest}
                    onChange={e => setNewTrap({ ...newTrap, pest: e.target.value })}
                    className="glass-input bg-surface-900 text-white">
                    <option value="Fall Armyworm">Fall Armyworm</option>
                    <option value="Pink Bollworm">Pink Bollworm</option>
                    <option value="Whitefly">Whitefly</option>
                    <option value="Thrips">Thrips</option>
                    <option value="Stem Borer">Stem Borer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Pest Count</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    value={newTrap.count}
                    onChange={e => setNewTrap({ ...newTrap, count: e.target.value })}
                    className="glass-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Crop</label>
                <input
                  type="text"
                  placeholder="e.g. Soybean, Cotton"
                  value={newTrap.crop}
                  onChange={e => setNewTrap({ ...newTrap, crop: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Location / Field</label>
                <input
                  type="text"
                  placeholder="e.g. Dindori Block 2"
                  value={newTrap.location}
                  onChange={e => setNewTrap({ ...newTrap, location: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-white/10 text-slate-300 font-bold hover:bg-white/15">
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 shadow-lg glow-emerald">
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
