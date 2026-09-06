/**
 * PIKSENSE AI — Agricultural Terminology Database & Entity Protection Utility
 * Provides verified Marathi and Hindi agricultural terms, protected entity parsing,
 * entity placeholder masking, and post-translation entity restoration.
 */

// ── 1. Centralized Agricultural Terminology Dictionary ────────────────────────
export const agriculturalTerms = {
  "early blight": { hi: "अगेती झुलसा", mr: "लवकर येणारा करपा (Early Blight)" },
  "late blight": { hi: "पछेती झुलसा", mr: "उशिरा येणारा करपा (Late Blight)" },
  "powdery mildew": { hi: "चूर्णिल आसिता (सफेद रोग)", mr: "भुरी रोग (Powdery Mildew)" },
  "downy mildew": { hi: "मृदु रोमिल आसिता", mr: "केवड्या रोग (Downy Mildew)" },
  "leaf spot": { hi: "पत्ती धब्बा रोग", mr: "पानावरील डाग (Leaf Spot)" },
  "fungal disease": { hi: "कवक जनित रोग", mr: "बुरशीजन्य रोग" },
  "bacterial blight": { hi: "जीवाणु झुलसा", mr: "जीवाणूजन्य करपा" },
  "pest infestation": { hi: "कीट प्रकोप", mr: "कीटकांचा प्रादुर्भाव" },
  "pink bollworm": { hi: "गुलाबी सुंडी", mr: "गुलाबी बोंड अळी" },
  "soil moisture": { hi: "मृदा नमी", mr: "मातीतील ओलावा" },
  "humidity": { hi: "आर्द्रता", mr: "हवेतील आर्द्रता" },
  "crop stage": { hi: "फसल अवस्था", mr: "पिकाची अवस्था" },
  "anthracnose": { hi: "एंथ्रेक्नोज (काला धब्बा)", mr: "अँथ्रॅक्नोज (करपा)" },
  "rice blast": { hi: "धान का झोंका (ब्लास्ट रोग)", mr: "भातावरील मानमोडी (ब्लास्ट रोग)" },
  "stripe rust": { hi: "पीला रतुआ (हल्दी रोग)", mr: "पिवळा तांबेरा (Stripe Rust)" },
  "fungicide": { hi: "फफूंदनाशक", mr: "बुरशीनाशक" },
  "insecticide": { hi: "कीटनाशक", mr: "कीटकनाशक" },
  "bio-agent": { hi: "जैविक घटक", mr: "जैविक घटक" },
  "neem oil": { hi: "नीम का तेल", mr: "कडुलिंब तेल" },
  "carbendazim": { hi: "कार्बेंडाजिम (Carbendazim)", mr: "कार्बेंडाझिम (Carbendazim)" },
  "mancozeb": { hi: "मैंकोजेब (Mancozeb)", mr: "मॅन्कोझेब (Mancozeb)" },
  "copper oxychloride": { hi: "कॉपर ऑक्सीक्लोराइड", mr: "कॉपर ऑक्सिक्लोराईड" },
  "trichoderma viride": { hi: "ट्राइकोडर्मा विरिडी", mr: "ट्रायकोडेर्मा विरिडी" },
  "nitrogen fertilizer": { hi: "नाइट्रोजन उर्वरक (यूरिया)", mr: "नत्र खत (युरिया)" },
  "canopy": { hi: "फसल छत्र (कैनोपी)", mr: "पिकाचे आच्छादन" },
  "pruning": { hi: "छंटाई", mr: "फांद्यांची छाटणी" },
  "relative humidity": { hi: "सापेक्ष आर्द्रता", mr: "सापेक्ष आर्द्रता" },
  "growth stage": { hi: "वृद्धि चरण", mr: "वाढीचा टप्पा" },
  "yield loss": { hi: "उपज हानि", mr: "उत्पादनात घट" }
};

// Protected chemical & scientific names to freeze during translation
export const protectedChemicalsAndNames = [
  "Carbendazim", "Mancozeb", "Trichoderma viride", "Colletotrichum gloeosporioides",
  "Magnaporthe oryzae", "Puccinia striiformis", "Phytophthora infestans",
  "YOLOv12", "YOLO", "PIKSENSE", "PiKSense AI", "KVK"
];

// ── 2. Entity Masking & Placeholder System (Phase 6) ──────────────────────────

/**
 * Protects critical technical entities, numbers, percentages, dosages, and chemical names
 * by replacing them with unique placeholders before translation.
 */
export function protectEntities(text) {
  if (!text || typeof text !== 'string') {
    return { maskedText: text || '', placeholders: {} };
  }

  const placeholders = {};
  let counter = 0;
  let maskedText = text;

  // Protect Chemical & Scientific Names
  for (const name of protectedChemicalsAndNames) {
    const regex = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    maskedText = maskedText.replace(regex, (match) => {
      const tag = `__PROTECTED_NAME_${counter++}__`;
      placeholders[tag] = match;
      return tag;
    });
  }

  // Protect Dosages & Measurements (e.g. 5ml/L, 1g/L, 52°C, 15-day, 80-90%, 10-14°C)
  const dosageRegex = /\b\d+(?:\.\d+)?\s*(?:ml\/L|g\/L|kg\/ha|°C|%|mm|km|cm|m)\b/gi;
  maskedText = maskedText.replace(dosageRegex, (match) => {
    const tag = `__PROTECTED_DOSAGE_${counter++}__`;
    placeholders[tag] = match;
    return tag;
  });

  // Protect Standalone Percentages & Numbers with units (e.g., 82%, 94.8%, 15 days)
  const percentRegex = /\b\d+(?:\.\d+)?\s*%/g;
  maskedText = maskedText.replace(percentRegex, (match) => {
    const tag = `__PROTECTED_PERCENT_${counter++}__`;
    placeholders[tag] = match;
    return tag;
  });

  return { maskedText, placeholders };
}

/**
 * Restores protected entity placeholders back into the translated output.
 */
export function restoreEntities(maskedText, placeholders) {
  if (!maskedText || typeof maskedText !== 'string' || !placeholders) {
    return maskedText || '';
  }

  let restored = maskedText;
  for (const [tag, val] of Object.entries(placeholders)) {
    restored = restored.replace(new RegExp(tag, 'g'), val);
  }
  return restored;
}

// ── 3. Terminology Matcher ───────────────────────────────────────────────────

/**
 * Checks if a phrase exists in the centralized agricultural terms dictionary.
 */
export function getAgriculturalTerm(phrase, targetLang) {
  if (!phrase || typeof phrase !== 'string') return null;
  const lower = phrase.trim().toLowerCase();
  const entry = agriculturalTerms[lower];
  if (entry && entry[targetLang]) {
    return entry[targetLang];
  }
  return null;
}
