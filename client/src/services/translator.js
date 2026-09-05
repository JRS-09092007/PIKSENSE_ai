import { getTranslation } from '../i18n/translations';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const translationCache = new Map();

/**
 * Translates text into targetLang (mr, hi, en) via local dictionary or Gemini API endpoint.
 */
export async function translateText(text, targetLang = 'en') {
  if (!text || typeof text !== 'string' || targetLang === 'en') {
    return text;
  }

  // Check static key dictionary
  const dictMatch = getTranslation(targetLang, text);
  if (dictMatch && dictMatch !== text) {
    return dictMatch;
  }

  // Check runtime translation cache
  const cacheKey = `${targetLang}:${text}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const res = await fetch(`${API_BASE}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.translated) {
        translationCache.set(cacheKey, data.translated);
        return data.translated;
      }
    }
  } catch (err) {
    // Graceful fallback if backend API or network is unavailable
  }

  return text;
}
