import { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../i18n/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('crophealth_lang') || 'en');
  const [scanHistory, setScanHistory] = useState(() => {
    const stored = localStorage.getItem('crophealth_scans');
    return stored ? JSON.parse(stored) : [];
  });
  const [onboardingDone, setOnboardingDone] = useState(() => localStorage.getItem('crophealth_onboarded') === 'true');
  const [toast, setToast] = useState(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  useEffect(() => { localStorage.setItem('crophealth_lang', language); }, [language]);
  useEffect(() => { localStorage.setItem('crophealth_scans', JSON.stringify(scanHistory)); }, [scanHistory]);

  const t = (key) => getTranslation(language, key);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  };

  const addScan = (scan) => {
    const newScan = { ...scan, id: Date.now(), created_at: new Date().toISOString(), status: 'monitoring' };
    setScanHistory(prev => [newScan, ...prev]);
    showToast('Scan saved to history!', 'success');
    return newScan;
  };

  const completeOnboarding = () => {
    setOnboardingDone(true);
    localStorage.setItem('crophealth_onboarded', 'true');
  };

  const resetOnboarding = () => {
    setOnboardingDone(false);
    localStorage.removeItem('crophealth_onboarded');
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage, t, scans: scanHistory, scanHistory, setScanHistory, addScan,
      onboardingDone, completeOnboarding, resetOnboarding, toast, showToast,
      isVoiceOpen, setIsVoiceOpen
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
