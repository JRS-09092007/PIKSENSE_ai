import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Building2, AlertTriangle, ShieldCheck, UserCheck, Megaphone, CheckCircle2,
  Clock, MapPin, Send, Filter, RefreshCw, FileText, IndianRupee, Activity, Search
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { t, showToast } = useApp();

  const [statusFilter, setStatusFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Government Advisory Broadcast State
  const [advisoryTitle, setAdvisoryTitle] = useState('');
  const [advisoryBody, setAdvisoryBody] = useState('');
  const [targetDistrict, setTargetDistrict] = useState('Nashik');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Initial Farmer Complaints & Outbreak Reports Database
  const [complaints, setComplaints] = useState([
    {
      id: 'CMP-2024-8801',
      farmer_name: 'Rajesh Kumar',
      phone: '+91 9876543210',
      district: 'Nashik',
      crop: 'Tomato',
      disease: 'Early Blight',
      severity: 'high',
      status: 'pending',
      date: '2026-09-02',
      details: 'Severe fungal necrosis on 3.5 acres. Requested KVK field inspection and fungicide subsidy support.',
      action_taken: null
    },
    {
      id: 'CMP-2024-8802',
      farmer_name: 'Priya Patil',
      phone: '+91 9876543211',
      district: 'Ratnagiri',
      crop: 'Mango',
      disease: 'Anthracnose',
      severity: 'high',
      status: 'inspection',
      date: '2026-09-01',
      details: 'Fruit drop detected on Alphonso orchard. KVK Team #4 dispatched.',
      action_taken: 'KVK Agronomist Dr. Deshmukh assigned for site visit.'
    },
    {
      id: 'CMP-2024-8803',
      farmer_name: 'Suresh Deshmukh',
      phone: '+91 9876543212',
      district: 'Pune',
      crop: 'Onion',
      disease: 'Purple Blotch',
      severity: 'medium',
      status: 'action_taken',
      date: '2026-08-30',
      details: 'High humidity blight in Junnar block.',
      action_taken: '₹ 15,000 Disaster Relief Subsidy approved & Copper Fungicide issued.'
    },
    {
      id: 'CMP-2024-8804',
      farmer_name: 'Anand Shinde',
      phone: '+91 9876543213',
      district: 'Kolhapur',
      crop: 'Rice',
      disease: 'Rice Blast',
      severity: 'high',
      status: 'pending',
      date: '2026-09-02',
      details: 'Leaf blast spreading in Kagal cluster due to monsoon weather.',
      action_taken: null
    },
    {
      id: 'CMP-2024-8805',
      farmer_name: 'Ganesh More',
      phone: '+91 9876543214',
      district: 'Nagpur',
      crop: 'Cotton',
      disease: 'Boll Rot',
      severity: 'medium',
      status: 'resolved',
      date: '2026-08-28',
      details: 'Waterlogging induced boll rot.',
      action_taken: 'Organic bio-pesticide distributed & drainage advice completed.'
    }
  ]);

  // Recent Government Advisories Broadcasted
  const [broadcasts, setBroadcasts] = useState([
    { id: 1, title: 'Emergency Fungicide Subsidy Issued', district: 'Nashik', date: '2026-09-02', recipients: 1420 },
    { id: 2, title: 'High Humidity Rice Blast Warning', district: 'Ratnagiri & Konkan', date: '2026-09-01', recipients: 3850 }
  ]);

  // Status Action Handlers
  const handleUpdateStatus = (id, newStatus, actionText) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: newStatus, action_taken: actionText };
      }
      return c;
    }));
    showToast(`Complaint ${id} updated to ${newStatus.replace('_', ' ').toUpperCase()}`, 'success');
  };

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!advisoryTitle || !advisoryBody) {
      showToast('Please enter both title and message body for broadcast', 'info');
      return;
    }
    setIsBroadcasting(true);
    setTimeout(() => {
      setBroadcasts([
        { id: Date.now(), title: advisoryTitle, district: targetDistrict, date: 'Just now', recipients: 2450 },
        ...broadcasts
      ]);
      setAdvisoryTitle('');
      setAdvisoryBody('');
      setIsBroadcasting(false);
      showToast(`Government Official Advisory Broadcasted to 2,450 farmers in ${targetDistrict}!`, 'success');
    }, 1200);
  };

  const filteredComplaints = complaints.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (districtFilter !== 'all' && c.district !== districtFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.farmer_name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.crop.toLowerCase().includes(q) ||
        c.disease.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1"><Clock size={12} /> Pending Review</span>;
      case 'inspection':
        return <span className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1"><Activity size={12} /> KVK Field Team</span>;
      case 'action_taken':
        return <span className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"><IndianRupee size={12} /> Relief Approved</span>;
      case 'resolved':
        return <span className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-surface-500/20 text-surface-300 border border-surface-500/30 flex items-center gap-1"><CheckCircle2 size={12} /> Resolved</span>;
      default:
        return null;
    }
  };

  return (
    <div className="pb-32 lg:pb-12 px-4 sm:px-6 pt-6 max-w-7xl mx-auto animate-slide-up space-y-6">
      {/* Officer Header Card */}
      <div className="glass-card p-6 border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-surface-900 to-emerald-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-lg text-3xl shrink-0">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                {user?.name || 'Dr. Ramesh Shinde'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1">
                <Building2 size={12} /> {user?.designation || 'District Agriculture Officer (DAO)'}
              </span>
            </div>
            <p className="text-xs text-surface-300 mt-1 font-medium">
              {user?.department || 'Department of Agriculture, Govt. of Maharashtra'} • Jurisdictional Zone: <span className="text-amber-300 font-bold">{user?.region || 'Nashik & Konkan Zone'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <div className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-[10px] text-surface-400 font-extrabold uppercase tracking-wider">Active Monitoring</p>
            <p className="text-lg font-extrabold text-amber-400 font-heading">5 Districts</p>
          </div>
          <div className="flex-1 md:flex-initial px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <p className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-wider">Status</p>
            <p className="text-lg font-extrabold text-emerald-400 font-heading">ONLINE</p>
          </div>
        </div>
      </div>

      {/* Metrics Operations Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card p-4 sm:p-5 border border-white/5 space-y-1">
          <p className="text-xs font-extrabold text-surface-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} className="text-amber-400" /> Total Farmer Reports
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-heading">{complaints.length}</p>
          <p className="text-[11px] text-amber-300 font-semibold">{complaints.filter(c => c.status === 'pending').length} Pending Action</p>
        </div>

        <div className="glass-card p-4 sm:p-5 border border-white/5 space-y-1">
          <p className="text-xs font-extrabold text-surface-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity size={14} className="text-blue-400" /> KVK Field Teams
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-heading">12 Teams</p>
          <p className="text-[11px] text-blue-300 font-semibold">Active in Nashik & Ratnagiri</p>
        </div>

        <div className="glass-card p-4 sm:p-5 border border-white/5 space-y-1">
          <p className="text-xs font-extrabold text-surface-400 uppercase tracking-wider flex items-center gap-1.5">
            <IndianRupee size={14} className="text-emerald-400" /> Relief Fund Approved
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">₹ 4.85 Cr</p>
          <p className="text-[11px] text-emerald-300 font-semibold">State Agriculture Subsidy</p>
        </div>

        <div className="glass-card p-4 sm:p-5 border border-white/5 space-y-1">
          <p className="text-xs font-extrabold text-surface-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-primary-400" /> Case Resolution Rate
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-primary-400 font-heading">94.2%</p>
          <p className="text-[11px] text-primary-300 font-semibold">Avg Response: &lt; 24 Hrs</p>
        </div>
      </div>

      {/* Main Administrative Workstation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Cols: Farmer Complaints & Emergency Outbreak Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5 border border-emerald-500/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h2 className="text-lg font-extrabold text-white font-heading flex items-center gap-2">
                  <AlertTriangle className="text-amber-400" size={20} /> Farmer Complaints & Emergency Escalations
                </h2>
                <p className="text-xs text-surface-400">Review farmer reported crop diseases, assign agronomist field visits & issue government financial relief.</p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3.5 top-3 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search farmer name, ID, crop, or disease..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="glass-input pl-10 py-2 text-xs"
                />
              </div>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="glass-input py-2 text-xs w-full sm:w-40">
                <option value="all" className="bg-surface-900">All Statuses</option>
                <option value="pending" className="bg-surface-900">Pending Review</option>
                <option value="inspection" className="bg-surface-900">Field Team Assigned</option>
                <option value="action_taken" className="bg-surface-900">Relief Approved</option>
                <option value="resolved" className="bg-surface-900">Resolved</option>
              </select>

              <select
                value={districtFilter}
                onChange={e => setDistrictFilter(e.target.value)}
                className="glass-input py-2 text-xs w-full sm:w-36">
                <option value="all" className="bg-surface-900">All Districts</option>
                <option value="Nashik" className="bg-surface-900">Nashik</option>
                <option value="Ratnagiri" className="bg-surface-900">Ratnagiri</option>
                <option value="Pune" className="bg-surface-900">Pune</option>
                <option value="Kolhapur" className="bg-surface-900">Kolhapur</option>
                <option value="Nagpur" className="bg-surface-900">Nagpur</option>
              </select>
            </div>

            {/* Complaints List Cards */}
            <div className="space-y-3">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map(c => (
                  <div key={c.id} className="glass-card p-4 border border-white/10 hover:border-amber-500/40 transition-all space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-xl border border-amber-500/30">
                          {c.id}
                        </span>
                        <h3 className="font-extrabold text-white text-base font-heading">{c.farmer_name}</h3>
                        <span className="text-xs text-surface-400">({c.phone})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-surface-400 font-medium flex items-center gap-1">
                          <MapPin size={12} className="text-primary-400" /> {c.district}
                        </span>
                        {getStatusBadge(c.status)}
                      </div>
                    </div>

                    {/* Complaint Data Body */}
                    <div className="p-3 rounded-2xl bg-white/3 border border-white/5 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-surface-300">
                        <p><span className="font-bold text-white">Crop Infected:</span> {c.crop.toUpperCase()} • <span className="font-bold text-danger-300">{c.disease}</span></p>
                        <span className="text-[10px] text-surface-400">{c.date}</span>
                      </div>
                      <p className="text-surface-300 leading-relaxed font-medium">{c.details}</p>
                      {c.action_taken && (
                        <p className="text-emerald-300 bg-emerald-950/40 p-2 rounded-xl border border-emerald-500/20 font-semibold mt-1">
                          🏛️ Official Action: {c.action_taken}
                        </p>
                      )}
                    </div>

                    {/* Official Action Controls */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={() => handleUpdateStatus(c.id, 'inspection', `KVK Agronomist Team #2 dispatched to ${c.district} site.`)}
                        className="px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-1.5">
                        <UserCheck size={14} /> Dispatch KVK Team
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(c.id, 'action_taken', `₹ 25,000 Emergency Subsidy Approved & Bio-pesticide Kit allocated.`)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1.5">
                        <IndianRupee size={14} /> Approve Subsidy Relief
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(c.id, 'resolved', 'Case inspected, subsidy disbursed, and crop recovery confirmed.')}
                        className="px-3 py-1.5 rounded-xl bg-surface-500/20 hover:bg-surface-500/30 text-surface-200 border border-surface-500/30 text-xs font-bold transition-all flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> Mark Resolved
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 glass-card p-6 border border-white/5">
                  <p className="text-surface-400 text-sm">No farmer complaints match the selected filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1-Col: Official Government Broadcast System */}
        <div className="space-y-6">
          {/* Government Emergency Broadcast Panel */}
          <div className="glass-card p-5 border border-amber-500/30 space-y-4 shadow-xl">
            <div>
              <h3 className="font-extrabold text-white text-base font-heading flex items-center gap-2">
                <Megaphone className="text-amber-400" size={18} /> Broadcast District Advisory
              </h3>
              <p className="text-xs text-surface-400">Publish official government outbreak warnings & subsidy notifications directly to farmers' phones.</p>
            </div>

            <form onSubmit={handleBroadcastSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-surface-400 uppercase tracking-wider mb-1 block">Target District</label>
                <select
                  value={targetDistrict}
                  onChange={e => setTargetDistrict(e.target.value)}
                  className="glass-input text-xs py-2">
                  <option value="Nashik" className="bg-surface-900">Nashik District (1,420 Farmers)</option>
                  <option value="Ratnagiri" className="bg-surface-900">Ratnagiri District (980 Farmers)</option>
                  <option value="Pune" className="bg-surface-900">Pune District (2,100 Farmers)</option>
                  <option value="Kolhapur" className="bg-surface-900">Kolhapur District (1,150 Farmers)</option>
                  <option value="All Maharashtra" className="bg-surface-900">All Maharashtra Districts (15,000+ Farmers)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-surface-400 uppercase tracking-wider mb-1 block">Advisory Heading</label>
                <input
                  type="text"
                  placeholder="e.g. Emergency Fungicide Subsidy Issued for Nashik"
                  value={advisoryTitle}
                  onChange={e => setAdvisoryTitle(e.target.value)}
                  className="glass-input text-xs py-2"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-surface-400 uppercase tracking-wider mb-1 block">Advisory Guidance Message</label>
                <textarea
                  rows={3}
                  placeholder="Enter detailed treatment advice, subsidized chemical availability, or KVK contact details..."
                  value={advisoryBody}
                  onChange={e => setAdvisoryBody(e.target.value)}
                  className="glass-input text-xs py-2 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isBroadcasting}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95">
                {isBroadcasting ? (
                  <><RefreshCw size={16} className="animate-spin" /> Broadcasting to Farmers...</>
                ) : (
                  <><Send size={16} /> Broadcast Official Advisory</>
                )}
              </button>
            </form>
          </div>

          {/* Broadcast History Log */}
          <div className="glass-card p-5 border border-white/10 space-y-3">
            <h4 className="text-xs font-extrabold text-surface-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={14} className="text-primary-400" /> Recent Official Broadcasts
            </h4>
            <div className="space-y-2">
              {broadcasts.map(b => (
                <div key={b.id} className="p-3 rounded-2xl bg-white/3 border border-white/5 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold text-white">{b.title}</p>
                    <span className="text-[10px] text-surface-400">{b.date}</span>
                  </div>
                  <p className="text-surface-300 text-[11px]">District: <span className="text-amber-300 font-bold">{b.district}</span> • Sent to <span className="text-primary-300 font-bold">{b.recipients} Farmers</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
