import { getTranslation } from '../i18n/translations';
import { protectEntities, restoreEntities, getAgriculturalTerm } from '../utils/agriculturalTerms';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Persistent localStorage & memory cache for dynamic translations (Phase 9)
const CACHE_KEY = 'piksense_translation_cache_v6';
let translationCache = new Map();

// Clear legacy corrupted translation caches
try {
  localStorage.removeItem('piksense_translation_cache');
  localStorage.removeItem('piksense_translation_cache_v2');
  localStorage.removeItem('piksense_translation_cache_v3');
  localStorage.removeItem('piksense_translation_cache_v4');
  localStorage.removeItem('piksense_translation_cache_v5');
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
 * Validates whether a translated string is clean and meaningful in Devanagari script (Phase 7).
 */
function isValidTranslation(text, targetLang) {
  if (!text || typeof text !== 'string') return false;
  const upper = text.toUpperCase();
  if (upper.includes('MYMEMORY') || upper.includes('WARNING') || upper.includes('QUERY LENGTH') || upper.includes('INVALID') || upper.includes('IS AVAILABLE') || upper.includes('LIMIT EXCEEDED')) {
    return false;
  }
  // For Hindi ('hi') and Marathi ('mr'), valid translation MUST contain Devanagari characters
  if (targetLang === 'hi' || targetLang === 'mr') {
    const devanagariRegex = /[\u0900-\u097F]/;
    return devanagariRegex.test(text);
  }
  return true;
}

/**
 * Three-Category Translation Pipeline:
 * CATEGORY A — STATIC UI: Manual Verified Dictionary (client/src/i18n/translations.js)
 * CATEGORY B — VERIFIED KNOWLEDGE: Centralized Agricultural Terminology (agriculturalTerms.js)
 * CATEGORY C — DYNAMIC AI CONTENT: Context-Aware Backend API (/api/translate -> OpenAI/Gemini)
 */
export async function translateText(text, targetLang = 'en', context = {}) {
  if (!text || typeof text !== 'string' || targetLang === 'en') {
    return text;
  }

  const trimmedText = text.trim();

  // ── CATEGORY A: Static Dictionary & Phrase Normalization (0 ms) ──────────────
  const dictMatch = getTranslation(targetLang, trimmedText);
  if (dictMatch && dictMatch !== trimmedText) {
    return dictMatch;
  }

  // ── CATEGORY B: Centralized Agricultural Terminology Lookup (0 ms) ───────────
  const termMatch = getAgriculturalTerm(trimmedText, targetLang);
  if (termMatch) {
    return termMatch;
  }

  // ── CATEGORY C: In-Memory & LocalStorage Cache Lookup ────────────────────────
  const cacheKey = `${targetLang}:${trimmedText}:${JSON.stringify(context)}`;
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey);
    if (isValidTranslation(cached, targetLang)) {
      return cached;
    }
  }

  // ── CATEGORY C: Context-Aware Express Backend AI Endpoint ───────────────────
  try {
    const { maskedText, placeholders } = protectEntities(trimmedText);

    const res = await fetch(`${API_BASE}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: maskedText, targetLang, context })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.translated && data.translated !== trimmedText) {
        const restored = restoreEntities(data.translated, placeholders);
        if (isValidTranslation(restored, targetLang)) {
          translationCache.set(cacheKey, restored);
          saveCache();
          return restored;
        }
      }
    }
  } catch (err) {
    // Backend offline or unreachable — proceed to graceful fallback
  }

  // ── Phase 12: Safe Fallback — Return Original Source Text (Never Undefined) ──
  return trimmedText;
}
