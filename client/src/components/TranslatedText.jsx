import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translateText } from '../services/translator';

/**
 * Component for automatically translating dynamic or static text strings into Marathi/Hindi.
 * Usage: <TranslatedText text="Some text" className="..." />
 */
export default function TranslatedText({ text, className = '', fallback = null }) {
  const { language, t } = useApp();
  const [translated, setTranslated] = useState(() => t(text));

  useEffect(() => {
    let isMounted = true;
    if (!text || typeof text !== 'string') {
      setTranslated(text || fallback || '');
      return;
    }

    const dictResult = t(text);
    if (dictResult !== text || language === 'en') {
      setTranslated(dictResult);
      return;
    }

    // Call dynamic multi-layered translator
    translateText(text, language).then(res => {
      if (isMounted) {
        setTranslated(res || text);
      }
    });

    return () => { isMounted = false; };
  }, [text, language, t]);

  return <span className={className}>{translated || fallback || text}</span>;
}
