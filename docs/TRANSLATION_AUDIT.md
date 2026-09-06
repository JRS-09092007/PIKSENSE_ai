# PIKSENSE AI — Translation System Audit Report

**Date**: September 6, 2026  
**Project**: PIKSENSE AI (Crop Health & Advisory Platform for Indian Farmers)  

---

## Executive Summary

An in-depth audit of the multilingual translation infrastructure in PIKSENSE AI was conducted to identify why Hindi (`hi`) and Marathi (`mr`) translations were occasionally unnatural, overly literal, or agriculturally inaccurate.

This document details the current architecture, data flow, identified flaws, and the comprehensive plan to establish an agriculture-aware, 3-tier translation architecture.

---

## 1. Current Architecture & Data Flow

```
[User UI Component] 
       │
       ▼
[<TranslatedText /> / t() / getLocalizedDisease()]
       │
       ├──────► 1. Static UI Dictionary Lookup (client/src/i18n/translations.js)
       ├──────► 2. Local Verified Disease Knowledge (client/src/utils/diseaseData.js)
       ├──────► 3. LocalStorage Cache (piksense_translation_cache_v5)
       ├──────► 4. Express Backend API (/api/translate -> server/src/services/geminiService.js)
       │              ├── OpenAI API (gpt-4o-mini) via open_aI_api / OPENAI_API_KEY
       │              └── Google Gemini API (gemini-1.5-flash) via GEMINI_API_KEY
       └──────► 5. [Legacy Fallback] MyMemory Public Translation API (client/src/services/translator.js)
```

---

## 2. Findings on Audit Questions

| # | Question | Finding |
|---|---|---|
| 1 | **Which components perform translation?** | `client/src/components/TranslatedText.jsx`, `client/src/services/translator.js`, `client/src/utils/diseaseData.js`, and `server/src/services/geminiService.js`. |
| 2 | **Which API/providers are used?** | Primary: OpenAI API (`gpt-4o-mini`). Secondary: Google Gemini (`gemini-1.5-flash`). Legacy Fallback: MyMemory API (`api.mymemory.translated.net`). |
| 3 | **Is translation on frontend or backend?** | **Hybrid**: Static UI & disease knowledge lookups happen on frontend; AI dynamic translations and advisories execute on Express backend; MyMemory fallback was on frontend. |
| 4 | **Is text translated repeatedly?** | **Yes**, re-renders of `<TranslatedText />` fired repeated async API calls if text was missing from static dictionary or cache. |
| 5 | **Can already-translated text be re-translated?** | **Yes**, passing Devanagari text into `translateText(text, 'mr')` caused redundant API queries and potential corruption. |
| 6 | **Is translation happening word-by-word?** | **Yes**, fallback APIs (MyMemory) and unconstrained AI prompts translated isolated phrases literally, producing unnatural Marathi/Hindi. |
| 7 | **Does the system lose context?** | **Yes**, raw phrases were sent without agricultural context (crop type, disease, severity, Maharashtra farming terminology). |
| 8 | **Are disease/agricultural terms translated incorrectly?** | **Yes**, technical disease names (e.g. *Anthracnose*, *Magnaporthe oryzae*), chemical dosages (e.g. *Carbendazim 50% WP (1g/L)*), and numbers were getting altered or mistranslated. |
| 9 | **Are API responses parsed incorrectly?** | **Yes**, raw LLM outputs sometimes included markdown code blocks, quotes, or conversational conversational preambles. |
| 10 | **Are language codes correct?** | **Yes**, standard language codes are consistently `en` (English), `hi` (Hindi), and `mr` (Marathi). |
| 11 | **Are hardcoded translations available?** | **Yes**, comprehensive static dictionaries exist in `client/src/i18n/translations.js` and verified disease entries exist in `client/src/utils/diseaseData.js`. |
| 12 | **Is Gemini / OpenAI available?** | **Yes**, both `open_aI_api` and `GEMINI_API_KEY` are configured in `server/.env`. |

---

## 3. Identified Core Problems

1. **Unprotected Agricultural Entities**: Chemical names (*Carbendazim*, *Mancozeb*), scientific pathogens (*Colletotrichum gloeosporioides*), percentages (*82% confidence*), and dosage metrics (*1g/L*) were exposed to raw translation, leading to dangerous hallucinated advice or broken metrics.
2. **Lack of Entity Placeholder Protection**: Numbers, units, and disease names were not tokenized before calling LLMs.
3. **Public Fallback API Corruption**: MyMemory API fallback occasionally returned warning headers or literal gibberish, which got saved to `localStorage`.
4. **Missing Validation Pipeline**: No post-translation validation step checked whether numbers, units, chemical names, or Devanagari script integrity remained intact.
5. **Categorization Deficit**: UI labels, disease knowledge, and AI dynamic advisories were not strictly segregated into Categories A, B, and C.

---

## 4. Target 3-Tier Architecture & Solution Plan

```
Source Content
   │
   ├──► CATEGORY A: Static UI Labels
   │      └── Direct Manual Dictionary (client/src/i18n/translations.js) -> 0ms, 100% accurate
   │
   ├──► CATEGORY B: Verified Disease Knowledge Base
   │      └── Direct Field Mapping (client/src/utils/diseaseData.js) -> 0ms, verified agronomist text
   │
   └──► CATEGORY C: Dynamic AI Text & Advisories
          │
          ├── 1. Agricultural Terminology Protection (Placeholder Masking: DISEASE_1, DOSAGE_1)
          ├── 2. Centralized Agricultural Lexicon (client/src/utils/agriculturalTerms.js)
          ├── 3. Strict Server-Side AI Prompting (OpenAI gpt-4o-mini / Gemini 1.5 Flash)
          ├── 4. Post-Translation Validation Pipeline (Devanagari, Number/Unit, Chemical check)
          ├── 5. Content-Hash Caching Layer (SHA-256 / MD5 key hashing)
          └── 6. Graceful Fallback (Cached -> Verified -> Source text, Never broken UI)
```

---

## 5. Files Involved

- `client/src/i18n/translations.js` (Static UI translations dictionary)
- `client/src/utils/diseaseData.js` (Verified disease knowledge base)
- `client/src/utils/agriculturalTerms.js` (NEW: Centralized Agricultural Terminology Database & Entity Protection)
- `client/src/services/translator.js` (Frontend translation service & cache management)
- `client/src/components/TranslatedText.jsx` (React UI translation component)
- `server/src/services/geminiService.js` (Backend AI translation, protection, validation & prompt enforcement)
- `server/src/index.js` (Express endpoints `/api/translate` & `/api/advisory`)
- `docs/TRANSLATION_SYSTEM.md` (NEW: Comprehensive system documentation)
- `server/tests/translation.test.js` (NEW: Automated translation test suite)

---

## 6. Risk Assessment & Mitigations

- **Risk**: API downtime or network latency affecting UI response time.
  - **Mitigation**: Categories A & B bypass network completely. Category C uses content-hash caching and immediate fallback to verified source text.
- **Risk**: Hallucinated chemical dosages or altered treatment advice.
  - **Mitigation**: Tokenize all numbers, units, dosages, and chemical names before sending to AI, restoring them strictly post-translation. Post-translation validation rejects any output where numbers or dosages differ from source.
