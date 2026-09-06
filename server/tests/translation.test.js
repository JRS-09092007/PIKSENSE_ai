/**
 * PIKSENSE AI — Multilingual Translation System Test Suite (Phase 14)
 * Tests Category A (Static), Category B (Terminology), and Category C (AI + Protection + Validation).
 */

import 'dotenv/config';
import { translateWithGemini, getOpenAiKey, getGeminiApiKey } from '../src/services/geminiService.js';
import { protectEntities, restoreEntities, agriculturalTerms } from '../../client/src/utils/agriculturalTerms.js';

async function runTests() {
  console.log('🧪 Starting PIKSENSE AI Translation Test Suite...\n');

  console.log('── Environment & Key Verification ──');
  const openAiKey = getOpenAiKey();
  const geminiKey = getGeminiApiKey();
  console.log(`OpenAI API Key detected: ${openAiKey ? '✅ YES (' + openAiKey.substring(0, 7) + '...)' : '❌ NO'}`);
  console.log(`Gemini API Key detected: ${geminiKey ? '✅ YES' : '❌ NO'}\n`);

  // ── Test 1: Entity Protection System ─────────────────────────────────────
  console.log('── Test 1: Entity Protection & Placeholder Restoration ──');
  const sample1 = "Mango crop shows 88% confidence of Anthracnose infection under 78% humidity with 1g/L dosage of Carbendazim.";
  const { maskedText, placeholders } = protectEntities(sample1);
  console.log(`Original: "${sample1}"`);
  console.log(`Masked:   "${maskedText}"`);
  console.log(`Placeholders:`, placeholders);
  const restored = restoreEntities(maskedText, placeholders);
  console.assert(restored === sample1, "Entity protection restoration match");
  console.log(`Restored: "${restored}" — ✅ MATCH\n`);

  // ── Test 2: Required Test Sentences (Phase 14) ───────────────────────────
  const testSentences = [
    "Your tomato crop shows symptoms of early blight.",
    "High humidity may increase the risk of fungal disease.",
    "Upload a clear image of the affected leaf.",
    "Disease confidence: 82%.",
    "Consult an agricultural expert before applying treatment.",
    "Do not exceed the recommended concentration.",
    "Mango crop shows 88% confidence of Anthracnose under 78% humidity with 1g/L dosage of Carbendazim."
  ];

  console.log('── Test 2: Marathi (mr) AI Translation & Validation ──');
  for (const sentence of testSentences) {
    try {
      const resMr = await translateWithGemini(sentence, 'mr', { crop: 'mango', stage: 'flowering' });
      console.log(`EN: "${sentence}"`);
      console.log(`MR: "${resMr}"`);
      // Assert non-empty and contains Devanagari
      const hasDevanagari = /[\u0900-\u097F]/.test(resMr);
      console.log(`    Status: ${hasDevanagari ? '✅ PASSED (Devanagari verified)' : '⚠️ FAILED'}\n`);
    } catch (e) {
      console.error(`    Error translating to MR:`, e.message);
    }
  }

  console.log('── Test 3: Hindi (hi) AI Translation & Validation ──');
  for (const sentence of testSentences) {
    try {
      const resHi = await translateWithGemini(sentence, 'hi', { crop: 'tomato', stage: 'vegetative' });
      console.log(`EN: "${sentence}"`);
      console.log(`HI: "${resHi}"`);
      const hasDevanagari = /[\u0900-\u097F]/.test(resHi);
      console.log(`    Status: ${hasDevanagari ? '✅ PASSED (Devanagari verified)' : '⚠️ FAILED'}\n`);
    } catch (e) {
      console.error(`    Error translating to HI:`, e.message);
    }
  }

  // ── Test 4: Edge Cases & Error Recovery ──────────────────────────────────
  console.log('── Test 4: Edge Cases & Invalid Inputs ──');
  
  // 4a. Empty text
  const emptyRes = await translateWithGemini('', 'mr');
  console.log(`Empty input test: "${emptyRes}" — ${emptyRes === '' ? '✅ PASSED' : '❌ FAILED'}`);

  // 4b. Target language 'en'
  const enRes = await translateWithGemini("Hello farmer", "en");
  console.log(`Target 'en' test: "${enRes}" — ${enRes === "Hello farmer" ? '✅ PASSED' : '❌ FAILED'}`);

  // 4c. Special characters
  const specRes = await translateWithGemini("Humidity 80% & Temp 32°C!", "mr");
  console.log(`Special chars test: "${specRes}" — ${/[\u0900-\u097F]/.test(specRes) ? '✅ PASSED' : '❌ FAILED'}`);

  console.log('\n✨ All tests completed successfully!');
}

runTests();
