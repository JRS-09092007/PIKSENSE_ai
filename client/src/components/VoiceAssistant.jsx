import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, MicOff, X, Sparkles, Volume2, HelpCircle } from 'lucide-react';

export default function VoiceAssistant() {
  const { t, language, showToast, isVoiceOpen, setIsVoiceOpen } = useApp();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef(null);

  const langMap = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' };

  const presetQueries = [
    { label: '🥭 Mango Anthracnose Treatment', query: 'How to treat Mango Anthracnose?' },
    { label: '🌧️ Rain Forecast', query: 'What is the rain weather forecast?' },
    { label: '👨‍🌾 Talk to Expert', query: 'Connect me with an agricultural expert' },
    { label: '🥔 Potato Storage Tips', query: 'How to store potatoes?' }
  ];

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const fallbackMsg = 'Speech recognition requires Chrome browser. You can tap preset queries below!';
      setResponse(fallbackMsg);
      showToast(fallbackMsg, 'info');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = langMap[language] || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      processQuery(text);
    };
    recognition.onerror = () => { setListening(false); setResponse('Could not hear clearly. Please tap a preset query below!'); };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setTranscript('');
    setResponse('');
  };

  const processQuery = (text) => {
    const lower = text.toLowerCase();
    let answer = '';
    if (lower.includes('disease') || lower.includes('scan') || lower.includes('bimari') || lower.includes('rog') || lower.includes('anthracnose')) {
      answer = t('voice_scan_response');
    } else if (lower.includes('weather') || lower.includes('mausam') || lower.includes('rain') || lower.includes('forecast')) {
      answer = t('voice_weather_response');
    } else if (lower.includes('expert') || lower.includes('doctor') || lower.includes('visheshagya')) {
      answer = t('voice_expert_response');
    } else if (lower.includes('store') || lower.includes('storage') || lower.includes('bhandi')) {
      answer = t('voice_storage_response');
    } else {
      answer = t('voice_default_response');
    }
    setResponse(answer);
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(answer);
      utter.lang = langMap[language] || 'en-IN';
      utter.rate = 0.9;
      speechSynthesis.speak(utter);
    }
  };

  if (!isVoiceOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center animate-fade-in p-4" onClick={() => setIsVoiceOpen(false)}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div className="relative w-full max-w-md glass-card p-6 space-y-5 animate-slide-up border border-emerald-500/30 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="font-extrabold text-white text-base font-heading flex items-center gap-2">
            <Sparkles size={20} className="text-primary-400" /> {t('voice_assistant')}
          </h3>
          <button onClick={() => setIsVoiceOpen(false)} className="text-surface-400 hover:text-white p-1 rounded-xl hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Listening Visualizer */}
        <div className="text-center py-5">
          <button onClick={listening ? () => recognitionRef.current?.stop() : startListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all shadow-2xl ${
              listening
                ? 'bg-danger-500/25 border-2 border-danger-400 text-danger-300 animate-pulse glow-amber'
                : 'bg-primary-500/20 border-2 border-primary-400 text-primary-300 hover:bg-primary-500/30 glow-emerald'
            }`}>
            {listening ? <MicOff size={36} /> : <Mic size={36} />}
          </button>

          {/* Soundwave bars */}
          {listening && (
            <div className="flex justify-center items-center gap-1.5 mt-4 h-8">
              <div className="w-1.5 bg-primary-400 rounded-full animate-wave-1" />
              <div className="w-1.5 bg-primary-300 rounded-full animate-wave-2" />
              <div className="w-1.5 bg-emerald-400 rounded-full animate-wave-3" />
              <div className="w-1.5 bg-primary-400 rounded-full animate-wave-4" />
            </div>
          )}

          <p className="text-sm font-bold text-white mt-3">
            {listening ? t('listening') : t('tap_to_speak')}
          </p>
          <p className="text-xs text-surface-400 mt-0.5">Supports English, Hindi (हिंदी), and Marathi (मराठी)</p>
        </div>

        {/* Quick Preset Prompts */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-surface-400 uppercase tracking-wider flex items-center gap-1">
            <HelpCircle size={12} className="text-primary-400" /> {t('quick_voice_queries')}
          </p>
          <div className="flex flex-wrap gap-2">
            {presetQueries.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTranscript(pq.query);
                  processQuery(pq.query);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-surface-200 border border-white/10 transition-colors text-left">
                {pq.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-[11px] text-surface-400 font-bold mb-1 uppercase tracking-wider">{t('you_said')}</p>
            <p className="text-sm text-white font-semibold">"{transcript}"</p>
          </div>
        )}

        {/* AI Response Display */}
        {response && (
          <div className="p-4 rounded-2xl bg-primary-950/40 border border-primary-500/30 space-y-2">
            <div className="flex items-center gap-1.5 text-primary-300 text-xs font-bold uppercase tracking-wider">
              <Volume2 size={16} className="text-primary-400 animate-pulse" /> {t('assistant')}
            </div>
            <p className="text-sm text-primary-100 leading-relaxed font-medium">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
