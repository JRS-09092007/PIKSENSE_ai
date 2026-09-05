import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { cropsList, getMockDetections, diseaseKnowledge, demoSamples, getLocalizedDisease } from '../utils/diseaseData';
import {
  Camera, Upload, ChevronDown, ChevronUp, UserCheck, Leaf, ScanLine, Zap,
  Shield, FlaskConical, Sparkles, CheckCircle2, AlertTriangle, Cpu, RefreshCw, Send
} from 'lucide-react';

export default function Scan() {
  const { user } = useAuth();
  const { t, T, language, addScan, showToast } = useApp();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [cropType, setCropType] = useState(user?.crops?.[0] || 'mango');
  const [analyzing, setAnalyzing] = useState(false);
  const [scanStepText, setScanStepText] = useState('');
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
    setResults(null);
  };

  const handleCapture = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*'; input.capture = 'environment';
    input.onchange = handleImage; input.click();
  };

  const selectSample = (sample) => {
    setImageUrl(sample.url);
    setCropType(sample.crop);
    setResults(null);
    showToast(`Loaded sample: ${sample.title}`, 'info');
  };

  const analyze = () => {
    if (!imageUrl) {
      showToast('Please capture or select an image first!', 'info');
      return;
    }
    setAnalyzing(true);
    setScanStepText(language === 'hi' ? 'कंप्यूटर विजन मॉडल शुरू हो रहा है...' : language === 'mr' ? 'संगणक दृष्टी मॉडेल सुरू होत आहे...' : 'Initializing Vision Transformer (ViT-v4)...');

    setTimeout(() => setScanStepText(language === 'hi' ? 'पत्ते की कोशिकाओं की जांच हो रही है...' : language === 'mr' ? 'पानावरील डागांची तपासणी होत आहे...' : 'Detecting leaf cellular necrosis & spots...'), 600);
    setTimeout(() => setScanStepText(language === 'hi' ? '50,000+ रोगाणुक डेटाबेस से मिलान...' : language === 'mr' ? '५०,०००+ रोग डेटाबेससह जुळवत आहे...' : 'Matching pathogen signatures against 50,000+ DB...'), 1200);

    setTimeout(() => {
      const detections = getMockDetections(cropType);
      const enriched = detections.map(d => {
        const rawK = diseaseKnowledge.find(dk => dk.class_id === d.class_id) || diseaseKnowledge[0];
        const localizedK = getLocalizedDisease(rawK, language);
        return {
          ...d,
          class_name: localizedK.display_name,
          knowledge: localizedK
        };
      });
      const result = { crop_type: cropType, image_url: imageUrl, detections: enriched };
      setResults(result);
      addScan(result);
      setAnalyzing(false);
    }, 2000);
  };

  const getConfColor = (c) => c >= 80 ? 'text-primary-400' : c >= 60 ? 'text-accent-400' : 'text-danger-400';
  const getConfBorder = (c) => c >= 80 ? 'border-primary-500/30' : c >= 60 ? 'border-accent-500/30' : 'border-danger-500/30';
  const userCrops = cropsList.filter(c => user?.crops?.includes(c.id));
  const displayCrops = userCrops.length > 0 ? userCrops : cropsList;

  return (
    <div className="pb-32 lg:pb-12 px-4 sm:px-6 pt-6 max-w-4xl mx-auto animate-slide-up space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading flex items-center gap-2.5">
            <ScanLine className="text-primary-400" /> {t('scan_title')}
          </h1>
          <p className="text-sm text-surface-400">{t('scan_subtitle')}</p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20 text-xs font-bold flex items-center gap-1.5">
          <Cpu size={14} className="text-primary-400" /> {t('model_accuracy')}
        </span>
      </div>

      {!results && (
        <div className="space-y-6">
          {/* Main Upload / Viewfinder Card */}
          <div className="glass-card p-5 sm:p-7 relative overflow-hidden border border-emerald-500/20">
            {imageUrl ? (
              <div className="relative rounded-2xl overflow-hidden mb-5 border border-white/10 group shadow-2xl">
                <img src={imageUrl} alt="Crop" className="w-full h-64 sm:h-80 object-cover" />

                {/* HUD Laser Scan Overlay when Analyzing */}
                {analyzing && (
                  <div className="absolute inset-0 bg-primary-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent shadow-[0_0_20px_#10b981] animate-scan-laser" />
                    <div className="w-16 h-16 rounded-full bg-primary-500/20 border-2 border-primary-400 flex items-center justify-center mb-4 animate-pulse glow-emerald">
                      <Cpu size={32} className="text-primary-300" />
                    </div>
                    <p className="text-white font-extrabold text-lg font-heading tracking-wide mb-1">{t('analyzing')}</p>
                    <p className="text-xs text-primary-300 font-mono bg-primary-950/80 px-3 py-1.5 rounded-full border border-primary-500/30">
                      {scanStepText}
                    </p>
                  </div>
                )}

                {!analyzing && (
                  <button onClick={() => setImageUrl('')}
                    className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md transition-colors">
                    {t('change_image')}
                  </button>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/15 hover:border-primary-500/40 rounded-3xl p-10 sm:p-14 text-center bg-white/2 transition-colors mb-5">
                <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-4 text-primary-400">
                  <Leaf size={36} />
                </div>
                <h3 className="font-extrabold text-white text-lg mb-1 font-heading">{t('upload_capture_leaf')}</h3>
                <p className="text-surface-400 text-sm max-w-sm mx-auto mb-6">
                  {t('upload_desc')}
                </p>

                {/* Demo Sample Presets */}
                <div className="mb-2 text-left">
                  <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-accent-400" /> {t('quick_demo_samples')}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {demoSamples.map((sample) => (
                      <button
                        key={sample.id}
                        onClick={() => selectSample(sample)}
                        className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all hover:scale-105 group">
                        <img src={sample.url} alt={sample.title} className="w-full h-16 object-cover rounded-xl mb-1.5" />
                        <p className="text-[11px] font-bold text-white truncate group-hover:text-primary-300"><T text={sample.title} /></p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Upload & Camera Buttons */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button onClick={handleCapture} disabled={analyzing}
                className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-500/15 hover:bg-primary-500/25 text-primary-300 font-bold border border-primary-500/30 active:scale-95 transition-all text-sm shadow-lg">
                <Camera size={20} /> {t('take_photo')}
              </button>
              <button onClick={() => fileRef.current?.click()} disabled={analyzing}
                className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-surface-200 font-bold border border-white/10 active:scale-95 transition-all text-sm">
                <Upload size={20} /> {t('upload_image')}
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </div>

          {/* Crop Selector */}
          <div className="glass-card p-6">
            <label className="text-xs font-extrabold text-surface-300 uppercase tracking-wider mb-3 block">{t('select_crop')}</label>
            <div className="flex flex-wrap gap-2">
              {displayCrops.map(c => (
                <button key={c.id} onClick={() => setCropType(c.id)} disabled={analyzing}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                    cropType === c.id
                      ? 'bg-primary-500/25 text-primary-300 border border-primary-500/40 shadow-md shadow-primary-500/10'
                      : 'bg-white/4 text-surface-400 border border-white/5 hover:bg-white/8 hover:text-surface-200'
                  }`}>
                  <span className="text-lg">{c.icon}</span>
                  <span>{language === 'hi' ? c.nameHi : language === 'mr' ? (c.nameMr || c.name) : c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Analyze CTA Button */}
          {imageUrl && (
            <button onClick={analyze} disabled={analyzing} className="btn-primary py-5 text-lg font-extrabold">
              {analyzing ? (
                <><RefreshCw size={22} className="animate-spin" /> {t('analyzing')}</>
              ) : (
                <><ScanLine size={24} /> {t('run_ai_analysis')}</>
              )}
            </button>
          )}
        </div>
      )}

      {/* Analysis Results View */}
      {results && (
        <div className="space-y-6 animate-slide-up">
          {/* Annotated Image Box */}
          <div className="glass-card p-5 border border-primary-500/30">
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img src={results.image_url} alt="Analyzed" className="w-full h-64 sm:h-80 object-cover" />
              {results.detections.map((d, i) => {
                const colors = ['#10b981', '#f59e0b', '#ef4444'];
                const color = colors[i % colors.length];
                const localizedK = getLocalizedDisease(d.knowledge || d, language);
                return (
                  <div key={i} className="bbox-overlay glow-emerald" style={{
                    left: `${d.bounding_box.x * 100}%`, top: `${d.bounding_box.y * 100}%`,
                    width: `${d.bounding_box.w * 100}%`, height: `${d.bounding_box.h * 100}%`,
                    borderColor: color
                  }}>
                    <div className="bbox-label" style={{ backgroundColor: color }}>
                      {localizedK.display_name || d.class_name} • {d.confidence}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Primary Detection Card */}
          {results.detections.map((d, i) => {
            const k = getLocalizedDisease(d.knowledge || d, language);
            const localizedClassName = k.display_name || d.class_name;
            return (
              <div key={i} className={`glass-card p-6 border-2 ${getConfBorder(d.confidence)} space-y-6 shadow-2xl`}>
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-danger-500/15 border border-danger-500/30 flex items-center justify-center text-3xl shrink-0">
                      {k?.before_image || '🦠'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-extrabold text-white font-heading"><T text={localizedClassName} /></h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-danger-500/20 text-danger-300 text-xs font-bold border border-danger-500/30">
                          {t('detected')}
                        </span>
                      </div>
                      <p className="text-xs text-surface-400 mt-1">Crop: {cropType.toUpperCase()} • {t('confidence')}: <span className={`font-bold ${getConfColor(d.confidence)}`}>{d.confidence}%</span></p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      showToast(`Scan report sent to Dr. Sunita Deshmukh!`, 'success');
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-accent-500/15 hover:bg-accent-500/25 text-accent-300 font-bold border border-accent-500/30 text-xs transition-colors self-start sm:self-auto">
                    <Send size={14} /> {t('send_to_agronomist')}
                  </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 border-b border-white/10 pb-2 overflow-x-auto scrollbar-none">
                  <button onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${activeTab === 'overview' ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'text-surface-400 hover:text-surface-200'}`}>
                    {t('overview_cause')}
                  </button>
                  <button onClick={() => setActiveTab('symptoms')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${activeTab === 'symptoms' ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'text-surface-400 hover:text-surface-200'}`}>
                    {t('symptoms')} ({k?.symptoms?.length || 0})
                  </button>
                  <button onClick={() => setActiveTab('treatment')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${activeTab === 'treatment' ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'text-surface-400 hover:text-surface-200'}`}>
                    {t('treatment_plan')}
                  </button>
                </div>

                {/* Tab Contents */}
                {activeTab === 'overview' && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h4 className="text-xs font-extrabold text-surface-400 uppercase tracking-wider mb-1">{t('description')}</h4>
                      <p className="text-sm text-surface-200 leading-relaxed font-medium"><T text={k?.description} /></p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/3 border border-white/5">
                      <h4 className="text-xs font-extrabold text-surface-400 uppercase tracking-wider mb-1">{t('cause')}</h4>
                      <p className="text-sm text-surface-300 leading-relaxed"><T text={k?.cause} /></p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                      <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Zap size={14} /> {t('immediate_action')}
                      </h4>
                      <p className="text-sm text-amber-200/90 font-semibold"><T text={k?.immediate_action} /></p>
                    </div>
                  </div>
                )}

                {activeTab === 'symptoms' && (
                  <div className="space-y-3 animate-fade-in">
                    <h4 className="text-xs font-extrabold text-surface-400 uppercase tracking-wider mb-2">{t('identified_symptoms')}</h4>
                    {k?.symptoms?.map((s, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-white/3 border border-white/5 flex items-start gap-3 text-sm text-surface-200">
                        <AlertTriangle size={16} className="text-danger-400 mt-0.5 shrink-0" />
                        <span><T text={s} /></span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'treatment' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Organic */}
                      <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
                        <h4 className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Leaf size={16} className="text-emerald-400" /> {t('organic')} {t('solution')}
                        </h4>
                        <p className="text-sm text-emerald-200/90 leading-relaxed font-medium"><T text={k?.treatment?.organic} /></p>
                      </div>

                      {/* Chemical */}
                      <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30">
                        <h4 className="text-xs font-extrabold text-blue-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <FlaskConical size={16} className="text-blue-400" /> {t('chemical')} {t('solution')}
                        </h4>
                        <p className="text-sm text-blue-200/90 leading-relaxed font-medium"><T text={k?.treatment?.chemical} /></p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/3 border border-white/5">
                      <h4 className="text-xs font-extrabold text-surface-400 uppercase tracking-wider mb-2">{t('prevention_measures')}</h4>
                      <ol className="space-y-2">
                        {k?.preventive_measures?.map((m, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-xs text-surface-300 font-medium">
                            <span className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-300 text-[10px] font-extrabold flex items-center justify-center shrink-0">{j + 1}</span>
                            <span><T text={m} /></span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex gap-3">
            <button onClick={() => { setResults(null); setImageUrl(''); }}
              className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-surface-200 font-bold border border-white/10 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
              <RefreshCw size={18} /> {t('scan_another')}
            </button>
            <button onClick={() => navigate('/experts')}
              className="flex-1 py-4 rounded-2xl bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 font-bold border border-primary-500/30 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
              <UserCheck size={18} /> {t('talk_to_expert')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
