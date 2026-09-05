import { getTranslation } from '../i18n/translations';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Persistent localStorage & memory cache for dynamic translations
const CACHE_KEY = 'piksense_translation_cache';
let translationCache = new Map();

try {
  const stored = localStorage.getItem(CACHE_KEY);
  if (stored) {
    translationCache = new Map(Object.entries(JSON.parse(stored)));
  }
} catch (e) {
  translationCache = new Map();
}

function saveCache() {
  try {
    const obj = Object.fromEntries(translationCache.entries());
    localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
  } catch (e) {}
}

/**
 * Translates text into targetLang (mr, hi, en) via:
 * 1. Static dictionary & phrase normalization lookup
 * 2. In-memory & localStorage translation cache
 * 3. Express backend API endpoint (/api/translate - Gemini AI)
 * 4. Free MyMemory API fallback (if Gemini API key is missing or offline)
 */
export async function translateText(text, targetLang = 'en') {
  if (!text || typeof text !== 'string' || targetLang === 'en') {
    return text;
  }

  const trimmedText = text.trim();

  // 1. Check static dictionary & phrase normalization map
  const dictMatch = getTranslation(targetLang, trimmedText);
  if (dictMatch && dictMatch !== trimmedText) {
    return dictMatch;
  }

  // 2. Check translation cache
  const cacheKey = `${targetLang}:${trimmedText}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  // 3. Try Express Backend API Endpoint (Gemini API)
  try {
    const res = await fetch(`${API_BASE}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmedText, targetLang })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.translated && data.translated !== trimmedText) {
        translationCache.set(cacheKey, data.translated);
        saveCache();
        return data.translated;
      }
    }
  } catch (err) {
    // Backend offline or unreachable
  }

  // 4. Try Free MyMemory Public Translation API Fallback
  try {
    const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmedText)}&langpair=en|${targetLang}`;
    const mmRes = await fetch(myMemoryUrl);
    if (mmRes.ok) {
      const mmData = await mmRes.json();
      const translated = mmData.responseData?.translatedText;
      if (translated && typeof translated === 'string' && translated !== trimmedText && !translated.includes('MYMEMORY WARNING')) {
        translationCache.set(cacheKey, translated);
        saveCache();
        return translated;
      }
    }
  } catch (e) {
    // Network offline
  }

  return trimmedText;
}
