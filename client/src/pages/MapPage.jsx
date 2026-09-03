import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { hotspotReports, cropsList } from '../utils/diseaseData';
import { MapPin, Filter, AlertTriangle, Calendar, ShieldAlert, Activity, Plus, Navigation, Target } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

function MapFlyTo({ center, useMap }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      map.flyTo(center, 11, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function MapPage() {
  const { t, showToast, language } = useApp();
  const { user } = useAuth();
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [LeafletComponents, setLeafletComponents] = useState(null);

  // Real-time GPS Location State
  const defaultCenter = user?.region === 'Ratnagiri' ? [16.99, 73.31] : user?.region === 'Pune' ? [18.52, 73.86] : [19.99, 73.79];
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    Promise.all([import('leaflet'), import('react-leaflet')]).then(([L, RL]) => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
      setLeafletComponents(RL);
      setMapLoaded(true);
    });
  }, []);

  const trackRealTimeLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.', 'danger');
      return;
    }
    showToast('Locating your farm GPS coordinates...', 'info');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = [latitude, longitude];
        setUserLocation(coords);
        setMapCenter(coords);
        showToast(`GPS Position Acquired: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`, 'success');
      },
      (err) => {
        showToast('Unable to fetch live GPS. Using default district center.', 'warning');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const getDistanceKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const filtered = hotspotReports.filter(r => {
    if (selectedCrop !== 'all' && r.crop_type !== selectedCrop) return false;
    if (selectedDisease !== 'all' && r.disease !== selectedDisease) return false;
    return true;
  });

  const diseases = [...new Set(hotspotReports.map(r => r.disease))];
  const severityColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };
  const severityBadge = {
    low: 'bg-primary-500/15 text-primary-300 border-primary-500/30',
    medium: 'bg-accent-500/15 text-accent-300 border-accent-500/30',
    high: 'bg-danger-500/15 text-danger-300 border-danger-500/30',
  };

  return (
    <div className="pb-32 lg:pb-12 px-4 sm:px-6 pt-6 max-w-5xl mx-auto animate-slide-up space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading flex items-center gap-2">
            <MapPin className="text-primary-400" /> {t('hotspot_map')}
          </h1>
          <p className="text-sm text-surface-400">{t('hotspot_subtitle')}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* GPS Live Tracker Button */}
          <button
            onClick={trackRealTimeLocation}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 font-bold border border-primary-500/30 text-xs transition-all active:scale-95 glow-emerald">
            <Target size={16} className="text-primary-400 animate-pulse" /> Locate My Farm (GPS)
          </button>

          <button
            onClick={() => showToast('Report submitted! Local KVK officer notified.', 'success')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-danger-500/15 hover:bg-danger-500/25 text-danger-300 font-bold border border-danger-500/30 text-xs transition-all active:scale-95">
            <Plus size={16} /> {t('report_outbreak')}
          </button>
        </div>
      </div>

      {/* Outbreak Stats Banner */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center border border-white/5">
          <p className="text-[11px] text-surface-400 font-bold uppercase tracking-wider">{t('active_outbreaks')}</p>
          <p className="text-2xl font-extrabold text-white font-heading mt-1">{filtered.length}</p>
        </div>
        <div className="glass-card p-4 text-center border border-danger-500/20 bg-danger-500/5">
          <p className="text-[11px] text-danger-300 font-bold uppercase tracking-wider">{t('high_risk_zones')}</p>
          <p className="text-2xl font-extrabold text-danger-400 font-heading mt-1">
            {filtered.filter(r => r.severity === 'high').length}
          </p>
        </div>
        <div className="glass-card p-4 text-center border border-primary-500/20 bg-primary-500/5">
          <p className="text-[11px] text-primary-300 font-bold uppercase tracking-wider">{t('primary_crop')}</p>
          <p className="text-xl font-extrabold text-primary-400 font-heading mt-1">Mango 🥭</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2 glass-card px-4 py-2.5 shrink-0 rounded-2xl border border-white/10">
          <Filter size={16} className="text-primary-400" />
          <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)}
            className="text-xs font-bold bg-transparent outline-none text-surface-200">
            <option value="all" className="bg-surface-900">{t('all_crops')}</option>
            {cropsList.slice(0, 6).map(c => (
              <option key={c.id} value={c.id} className="bg-surface-900">
                {language === 'hi' ? c.nameHi : language === 'mr' ? (c.nameMr || c.name) : c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 glass-card px-4 py-2.5 shrink-0 rounded-2xl border border-white/10">
          <ShieldAlert size={16} className="text-accent-400" />
          <select value={selectedDisease} onChange={e => setSelectedDisease(e.target.value)}
            className="text-xs font-bold bg-transparent outline-none text-surface-200">
            <option value="all" className="bg-surface-900">{t('all_diseases')}</option>
            {diseases.map(d => <option key={d} value={d} className="bg-surface-900">{d}</option>)}
          </select>
        </div>
      </div>

      {/* Interactive Leaflet Map Container */}
      <div className="glass-card overflow-hidden border border-emerald-500/30 shadow-2xl relative" style={{ height: '440px' }}>
        {mapLoaded && LeafletComponents ? (() => {
          const { MapContainer, TileLayer, CircleMarker, Circle, Popup, useMap } = LeafletComponents;
          return (
            <MapContainer center={mapCenter} zoom={10} style={{ height: '100%', width: '100%', borderRadius: '24px' }}>
              <MapFlyTo center={mapCenter} useMap={useMap} />
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; CartoDB &copy; OpenStreetMap' />

              {/* User Live GPS Marker */}
              {userLocation && (
                <>
                  <Circle center={userLocation} radius={3000} pathOptions={{ fillColor: '#3b82f6', fillOpacity: 0.25, color: '#60a5fa', weight: 2 }} />
                  <CircleMarker center={userLocation} radius={10} pathOptions={{ fillColor: '#3b82f6', fillOpacity: 1, color: '#ffffff', weight: 3 }}>
                    <Popup>
                      <div className="p-1 text-slate-900 font-sans">
                        <p className="font-extrabold text-sm text-blue-600">📍 Your Live Farm Location (GPS)</p>
                        <p className="text-xs font-semibold text-slate-600 mt-1">Lat: {userLocation[0].toFixed(4)}, Lng: {userLocation[1].toFixed(4)}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                </>
              )}

              {/* Disease Outbreak Hotspots */}
              {filtered.map(r => (
                <CircleMarker key={r.id} center={[r.lat, r.lng]} radius={14}
                  pathOptions={{ fillColor: severityColors[r.severity], fillOpacity: 0.75, color: severityColors[r.severity], weight: 3 }}>
                  <Popup>
                    <div className="p-1.5 text-slate-900 font-sans">
                      <p className="font-extrabold text-sm">{r.disease}</p>
                      <p className="text-xs font-medium">Crop: {r.crop_type.toUpperCase()}</p>
                      <p className="text-xs font-medium">District: {r.district}</p>
                      {userLocation && (
                        <p className="text-xs font-bold text-blue-600 mt-1">
                          📏 {getDistanceKm(userLocation[0], userLocation[1], r.lat, r.lng)} km away from you
                        </p>
                      )}
                      <p className="text-xs font-extrabold mt-1 text-red-600">Severity: {r.severity.toUpperCase()}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          );
        })() : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-primary-400/20 border-t-primary-400 rounded-full animate-spin mx-auto mb-3 glow-emerald" />
              <p className="text-sm text-surface-400 font-medium">{t('loading_map')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2 text-sm font-heading">
          <Activity size={16} className="text-primary-400" /> {t('active_reports')} ({filtered.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(r => {
            const dist = userLocation ? getDistanceKm(userLocation[0], userLocation[1], r.lat, r.lng) : null;
            return (
              <div key={r.id} className="glass-card p-4 flex items-center gap-3.5 card-hover border border-white/5">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${severityBadge[r.severity]}`}>
                  <MapPin size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm truncate font-heading">{r.disease}</p>
                  <p className="text-xs text-surface-400 mt-0.5">{r.crop_type.toUpperCase()} • {r.district}</p>
                  {dist && <p className="text-[11px] text-blue-300 font-bold mt-0.5 flex items-center gap-1"><Navigation size={10} /> {dist} km away</p>}
                </div>
                <div className="text-right shrink-0">
                  <span className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase border ${severityBadge[r.severity]}`}>
                    {r.severity}
                  </span>
                  <p className="text-[10px] text-surface-400 mt-1 flex items-center gap-1">
                    <Calendar size={10} /> {r.reported_at}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
