import { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../i18n/translations';
import { translateText } from '../services/translator';
import TranslatedText from '../components/TranslatedText';

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
  const [notificationSettings, setNotificationSettings] = useState(() => {
    const stored = localStorage.getItem('crophealth_notif_settings');
    return stored ? JSON.parse(stored) : { weatherAlerts: true, hotspotAlerts: true, outbreakAlerts: true, expertAlerts: true };
  });

  useEffect(() => { localStorage.setItem('crophealth_lang', language); }, [language]);
  useEffect(() => { localStorage.setItem('crophealth_scans', JSON.stringify(scanHistory)); }, [scanHistory]);
  useEffect(() => { localStorage.setItem('crophealth_notif_settings', JSON.stringify(notificationSettings)); }, [notificationSettings]);

  const t = (key) => getTranslation(language, key);
  const translateDynamicText = (text) => translateText(text, language);

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

  const toggleNotificationSetting = (key) => {
    setNotificationSettings(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast(`Notification setting updated!`, 'info');
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage, t, translateDynamicText, T: TranslatedText, scans: scanHistory, scanHistory, setScanHistory, addScan,
      onboardingDone, completeOnboarding, resetOnboarding, toast, showToast,
      isVoiceOpen, setIsVoiceOpen,
      notificationSettings, toggleNotificationSetting
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
