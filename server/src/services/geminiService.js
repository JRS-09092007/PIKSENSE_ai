/**
 * Gemini AI Integration Service
 * Handles translation of dynamic text, agricultural advisories, and risk explanations.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Translates arbitrary text to Marathi ('mr'), Hindi ('hi'), or English ('en') using Gemini API.
 */
export async function translateWithGemini(text, targetLang) {
  if (!text || targetLang === 'en' || !GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return text;
  }

  const langName = targetLang === 'mr' ? 'Marathi' : targetLang === 'hi' ? 'Hindi' : 'English';
  const prompt = `You are a professional agricultural translator. Translate the following farming text accurately into ${langName}. Return ONLY the final translated text without any quotes, notes, or extra formatting:\n\n${text}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      console.warn('Gemini API translation HTTP error:', response.status);
      return text;
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidateText ? candidateText.trim() : text;
  } catch (error) {
    console.error('Gemini translation error:', error.message);
    return text;
  }
}

/**
 * Generates structured, grounded agricultural advisory for crop health diagnoses.
 */
export async function generateAdvisoryWithGemini(crop, disease, confidence, stage, weather) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return null;
  }

  const prompt = `As an expert agronomist, provide a short 3-bullet-point field action plan for a farmer dealing with ${disease} on ${crop} during the ${stage} growth stage. Current weather: ${weather}. Keep language practical, direct, and safe.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  } catch (error) {
    console.error('Gemini advisory generation error:', error.message);
    return null;
  }
}
