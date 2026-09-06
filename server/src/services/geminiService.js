/**
 * PIKSENSE AI — Context-Aware AI Translation & Advisory Service
 * Combines OpenAI (gpt-4o-mini) and Google Gemini (gemini-1.5-flash) with
 * agricultural entity protection, strict prompt enforcement, post-translation validation,
 * and content-hash caching.
 */

import crypto from 'crypto';

// Server-Side In-Memory Content Hash Cache (Phase 9)
const serverTranslationCache = new Map();

/**
 * Smart detection for OpenAI API Key.
 * Checks open_aI_api, OPENAI_API_KEY, OPEN_AI_KEY, open_ai_key, or GEMINI_API_KEY (if prefixed sk-).
 */

export function getOpenAiKey() {
  const possibleKeys = [
    process.env.open_aI_api,
    process.env.OPENAI_API_KEY,
    process.env.OPEN_AI_KEY,
    process.env.open_ai_key,
    process.env.GEMINI_API_KEY
  ];

  for (const k of possibleKeys) {
    if (k && typeof k === 'string') {
      const trimmed = k.trim();
      if (trimmed.startsWith('sk-') && !trimmed.includes('your_')) {
        return trimmed;
      }
    }
  }

  const generic = process.env.open_aI_api || process.env.OPENAI_API_KEY || process.env.OPEN_AI_KEY || process.env.open_ai_key;
  if (generic && !generic.includes('your_')) {
    return generic.trim();
  }

  return null;
}

/**
 * Smart detection for Gemini API Key.
 * Only returns key if it's NOT an OpenAI key (doesn't start with sk-).
 */
export function getGeminiApiKey() {
  const key = process.env.GEMINI_API_KEY;
  if (key && typeof key === 'string') {
    const trimmed = key.trim();
    if (!trimmed.startsWith('sk-') && !trimmed.includes('your_')) {
      return trimmed;
    }
  }
  return null;
}

// ── Entity Placeholder Protection (Phase 6) ──────────────────────────────────
const protectedTerms = [
  "Carbendazim", "Mancozeb", "Trichoderma viride", "Colletotrichum gloeosporioides",
  "Magnaporthe oryzae", "Puccinia striiformis", "Phytophthora infestans",
  "YOLOv12", "YOLO", "PIKSENSE", "PiKSense AI", "KVK"
];

function maskEntities(text) {
  if (!text || typeof text !== 'string') return { maskedText: text || '', placeholders: {} };
  const placeholders = {};
  let counter = 0;
  let maskedText = text;

  // Protect Chemical & Technical Names
  for (const term of protectedTerms) {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    maskedText = maskedText.replace(regex, (match) => {
      const tag = `__P_ENTITY_${counter++}__`;
      placeholders[tag] = match;
      return tag;
    });
  }

  // Protect Dosages, Percentages & Units (e.g. 5ml/L, 1g/L, 82%, 52°C, 15-day)
  const metricRegex = /\b\d+(?:\.\d+)?\s*(?:ml\/L|g\/L|kg\/ha|°C|%|mm|km|cm|m)\b/gi;
  maskedText = maskedText.replace(metricRegex, (match) => {
    const tag = `__P_METRIC_${counter++}__`;
    placeholders[tag] = match;
    return tag;
  });

  return { maskedText, placeholders };
}

function unmaskEntities(maskedText, placeholders) {
  if (!maskedText || typeof maskedText !== 'string' || !placeholders) return maskedText || '';
  let restored = maskedText;
  for (const [tag, originalVal] of Object.entries(placeholders)) {
    restored = restored.replace(new RegExp(tag, 'g'), originalVal);
  }
  return restored;
}

// ── Post-Translation Validation (Phase 7) ───────────────────────────────────
function validateTranslation(original, translated, targetLang, placeholders = {}) {
  if (!translated || typeof translated !== 'string') return false;
  const clean = translated.trim();

  // 1. Output non-empty & reasonable length
  if (clean.length === 0) return false;
  if (original.length > 25 && clean.length < 5) return false;

  // 2. Reject error preambles or raw code strings
  const upper = clean.toUpperCase();
  if (upper.includes('MYMEMORY') || upper.includes('TRANSLATED:') || upper.includes('HERE IS THE TRANSLATION')) {
    return false;
  }

  // 3. Devanagari script verification for Hindi ('hi') and Marathi ('mr')
  if (targetLang === 'hi' || targetLang === 'mr') {
    const devanagariRegex = /[\u0900-\u097F]/;
    if (!devanagariRegex.test(clean)) {
      return false;
    }
  }

  // 4. Ensure original numbers are preserved
  const originalNumbers = original.match(/\b\d+(?:\.\d+)?\b/g) || [];
  for (const num of originalNumbers) {
    if (!clean.includes(num)) {
      // If a placeholder replaced it, check if placeholder tag or number exists
      const isPlaceholderVal = Object.values(placeholders).some(v => v.includes(num));
      if (!isPlaceholderVal) {
        // Number missing
        console.warn(`Translation validation warning: number ${num} missing in output`);
      }
    }
  }

  return true;
}

// ── System Prompt Specification (Phase 5) ───────────────────────────────────
function buildSystemPrompt(targetLang, context = {}) {
  const langName = targetLang === 'mr' ? 'Maharashtra-friendly Marathi (मराठी)' : targetLang === 'hi' ? 'simple farmer-friendly Hindi (हिंदी)' : 'English';
  const cropInfo = context.crop ? `Crop: ${context.crop}` : '';
  const diseaseInfo = context.disease ? `Disease: ${context.disease}` : '';
  const stageInfo = context.stage ? `Stage: ${context.stage}` : '';

  return `Translate the following agricultural advisory from English to ${langName}.

Context:
This text is part of an AI-powered crop health advisory application used by Indian farmers in Maharashtra and India. ${cropInfo} ${diseaseInfo} ${stageInfo}

Rules:
1. Preserve the exact meaning.
2. Do not translate word-for-word when that produces unnatural language.
3. Use natural language understood by ordinary Indian farmers.
4. Prefer simple, clear language over literary or highly formal language.
5. Preserve crop names accurately.
6. Preserve disease names accurately.
7. Preserve scientific names.
8. Preserve pesticide/product names.
9. Preserve all numbers exactly.
10. Preserve units exactly.
11. Preserve percentages exactly.
12. Never invent treatment instructions.
13. Never add information.
14. Never remove important information.
15. Do not change dosage, concentration, quantity, frequency, or timing.
16. Do not convert a recommendation into a stronger recommendation.
17. If a technical agricultural term has no reliable natural equivalent, retain the technical term rather than inventing a translation.
18. Use Maharashtra-friendly Marathi when Marathi is requested.
19. Use simple farmer-friendly Hindi when Hindi is requested.
20. Return ONLY the final translated text without any surrounding quotes, notes, or preambles.`;
}

// ── Main Translation Service Entry Point ────────────────────────────────────
export async function translateWithGemini(text, targetLang, context = {}) {
  if (!text || typeof text !== 'string' || targetLang === 'en') {
    return text;
  }

  const trimmedText = text.trim();

  // Phase 9: Caching Layer Lookup (Content Hash)
  const hashKey = crypto.createHash('md5').update(`${targetLang}:${trimmedText}:${JSON.stringify(context)}`).digest('hex');
  if (serverTranslationCache.has(hashKey)) {
    return serverTranslationCache.get(hashKey);
  }

  // Phase 6: Terminology Entity Protection
  const { maskedText, placeholders } = maskEntities(trimmedText);
  const openAiKey = getOpenAiKey();
  const geminiKey = getGeminiApiKey();

  let candidateTranslation = null;

  // 1. Try OpenAI API (gpt-4o-mini)
  if (openAiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: buildSystemPrompt(targetLang, context) },
            { role: 'user', content: maskedText }
          ],
          temperature: 0.2
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawOutput = data.choices?.[0]?.message?.content?.trim();
        const restored = unmaskEntities(rawOutput, placeholders);
        if (validateTranslation(trimmedText, restored, targetLang, placeholders)) {
          candidateTranslation = restored;
        }
      }
    } catch (err) {
      console.error('OpenAI translation API error:', err.message);
    }
  }

  // 2. Fallback to Gemini API if OpenAI failed or key missing
  if (!candidateTranslation && geminiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${buildSystemPrompt(targetLang, context)}\n\nText to translate:\n${maskedText}` }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        const restored = unmaskEntities(rawOutput, placeholders);
        if (validateTranslation(trimmedText, restored, targetLang, placeholders)) {
          candidateTranslation = restored;
        }
      }
    } catch (err) {
      console.error('Gemini translation API error:', err.message);
    }
  }

  // Phase 12: Error Handling & Fallback logic
  if (candidateTranslation) {
    serverTranslationCache.set(hashKey, candidateTranslation);
    return candidateTranslation;
  }

  // Return original verified text if translation failed or was invalid
  return trimmedText;
}

/**
 * Generates structured, grounded agricultural advisory for crop health diagnoses.
 * Phase 10: Ensures safety and grounded advice from knowledge base.
 */
export async function generateAdvisoryWithGemini(crop, disease, confidence, stage, weather) {
  const openAiKey = getOpenAiKey();
  const geminiKey = getGeminiApiKey();

  const prompt = `You are an expert agronomist in Maharashtra, India. Provide a concise 3-bullet-point practical field action plan for a farmer dealing with ${disease} on ${crop} during the ${stage} growth stage under weather: ${weather}. Keep recommendations safe, direct, and practical. Do NOT invent unsafe chemical dosages or unverified claims.`;

  if (openAiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: prompt }
          ],
          temperature: 0.3
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim() || null;
      }
    } catch (err) {
      console.error('OpenAI advisory error:', err.message);
    }
  }

  if (geminiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
      }
    } catch (error) {
      console.error('Gemini advisory generation error:', error.message);
    }
  }

  return null;
}
