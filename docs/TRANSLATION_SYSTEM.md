# PIKSENSE AI — Multilingual Agricultural Translation System

This document provides complete operational details, architecture specifications, and maintenance guides for the multilingual translation system in PIKSENSE AI.

---

## 1. Architecture Overview

The system uses a **3-Tier Context-Aware Architecture** tailored specifically for Indian agriculture:

```
                                  Source Content
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
     [CATEGORY A]                  [CATEGORY B]              [CATEGORY C]
      Static UI                Verified Knowledge            Dynamic AI
(Manual Dictionaries)       (Disease Data Store)       (Context + Masking)
             │                          │                          │
    client/src/i18n/          client/src/utils/            server/src/services/
     translations.js            diseaseData.js               geminiService.js
             │                          │                          │
        (0ms latency)              (0ms latency)             (Mask -> LLM ->
                                                               Validate -> Unmask)
```

---

## 2. Static UI Translations (Category A)

Fixed UI labels, buttons, navigation items, header items, and form elements are maintained in manual dictionaries inside `client/src/i18n/translations.js`.

- **Supported Languages**: English (`en`), Hindi (`hi`), Marathi (`mr`).
- **Execution**: Instant 0ms lookup via `t(key)` or `<TranslatedText text="key" />`.
- **Rule**: Static UI labels are **never** sent to an external translation API.

---

## 3. Verified Disease Knowledge Base (Category B)

Structured disease metadata (symptoms, cause, treatment, immediate actions, preventive measures) are stored in `client/src/utils/diseaseData.js` with human-verified Hindi (`hi`) and Marathi (`mr`) translations.

- **Lookup Helper**: `getLocalizedDisease(diseaseObj, language)`.
- **Safety**: Bypasses AI to prevent hallucination of chemical dosages or treatment instructions.

---

## 4. Dynamic AI Translation & Protection Pipeline (Category C)

For dynamic user content, scan rationale, and weather risk explanations:

1. **Entity Protection (Placeholder Masking)**:
   - Technical chemical names (*Carbendazim*, *Mancozeb*, *Trichoderma viride*), scientific species (*Colletotrichum gloeosporioides*), dosages (*1g/L*, *5ml/L*, *52°C*), percentages (*82%*), and model tags (*YOLOv12*, *PIKSENSE*) are replaced with placeholders (`__P_ENTITY_0__`, `__P_METRIC_1__`).
2. **Contextual AI Prompting**:
   - Sent to OpenAI (`gpt-4o-mini`) or Google Gemini (`gemini-1.5-flash`) with a strict 20-rule system prompt enforcing simple, conversational Marathi (Maharashtra-friendly) or Hindi as spoken by local farmers.
3. **Post-Translation Validation**:
   - Validates that output is non-empty, contains Devanagari script for `hi`/`mr`, and preserves numbers/units.
4. **Entity Unmasking**:
   - Placeholders are restored with exact values or verified agricultural terms.
5. **Content-Hash Caching**:
   - Results are cached using a cryptographic hash (`targetLang:sourceText:context`) on both client (`localStorage`) and server (in-memory Map).

---

## 5. Agricultural Terminology Database

Centralized in `client/src/utils/agriculturalTerms.js`. Contains verified regional farming terms:

```javascript
import { agriculturalTerms } from '../utils/agriculturalTerms';

// Example terms:
// "early blight" -> { hi: "अगेती झुलसा", mr: "लवकर येणारा करपा (Early Blight)" }
// "pink bollworm" -> { hi: "गुलाबी सुंडी", mr: "गुलाबी बोंड अळी" }
```

---

## 6. Environment Variables & API Setup

Configure API keys in `server/.env`:

```env
# OpenAI API Key (Primary)
open_aI_api=sk-proj-...
# OR
OPENAI_API_KEY=sk-proj-...

# Google Gemini API Key (Secondary / Fallback)
GEMINI_API_KEY=AIzaSy...
```

*Note*: The system automatically detects OpenAI keys even if pasted under `open_aI_api`, `open_ai_key`, or `GEMINI_API_KEY` (if prefixed with `sk-`).

---

## 7. How to Add a New Agricultural Term

1. Open `client/src/utils/agriculturalTerms.js`.
2. Add the term to `agriculturalTerms`:

```javascript
"downy mildew": {
  hi: "मृदु रोमिल आसिता",
  mr: "केवड्या रोग (Downy Mildew)"
}
```

---

## 8. How to Add a New Language (e.g. Gujarati `gu` or Kannada `kn`)

1. Add static UI translations to `client/src/i18n/translations.js` under the new language code (e.g. `gu`).
2. Update language switcher in `client/src/components/Header.jsx` or `AppContext.jsx`.
3. Add regional terminology in `client/src/utils/agriculturalTerms.js`.
4. Update `server/src/services/geminiService.js` prompt generator to include language guidelines for the new locale.

---

## 9. Running Tests

Run the automated translation test suite:

```bash
cd server
node tests/translation.test.js
```
