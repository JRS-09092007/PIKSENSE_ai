import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { diseaseKnowledge, farmers, experts, hotspotReports } from './seeds/seedData.js';
import { translateWithGemini, generateAdvisoryWithGemini } from './services/geminiService.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'crop-health-secret-key-2024';

app.use(cors());
app.use(express.json());

// File upload config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ── In-memory database (replace with PostgreSQL in production) ─────────────
let users = [...farmers];
let scans = [];
let scanIdCounter = 1;

// ── Auth Middleware ─────────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ── Auth Routes ─────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { name, phone, email, password, region, state, language } = req.body;
  if (!name || !phone || !password) return res.status(400).json({ error: 'Name, phone, and password are required' });
  if (users.find(u => u.phone === phone)) return res.status(400).json({ error: 'Phone number already registered' });

  const hash = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, name, phone, email, password_hash: hash, region, state, language: language || 'en', crops: [], created_at: new Date().toISOString() };
  users.push(user);

  const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  const { password_hash, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

app.post('/api/auth/login', async (req, res) => {
  const { emailOrPhone, password } = req.body;
  const user = users.find(u => u.phone === emailOrPhone || u.email === emailOrPhone);
  if (!user) return res.status(401).json({ error: 'User not found' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  const { password_hash, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

// ── User Routes ─────────────────────────────────────────────────────────────
app.get('/api/user/profile', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password_hash, ...safeUser } = user;
  res.json(safeUser);
});

app.put('/api/user/crops', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.crops = req.body.crops || [];
  res.json({ crops: user.crops });
});

// ── Scan Routes ─────────────────────────────────────────────────────────────
app.post('/api/scans', authMiddleware, upload.single('image'), async (req, res) => {
  const { crop_type } = req.body;
  // Mock detection — in production, this calls the FastAPI ML service
  const mockDetections = generateMockDetections(crop_type);

  const scan = {
    id: scanIdCounter++,
    farmer_id: req.user.id,
    image_url: req.file ? `/uploads/${req.file.filename}` : null,
    crop_type,
    detections: mockDetections,
    status: 'pending',
    created_at: new Date().toISOString()
  };
  scans.push(scan);
  res.json(scan);
});

app.get('/api/scans', authMiddleware, (req, res) => {
  const userScans = scans.filter(s => s.farmer_id === req.user.id);
  res.json(userScans.reverse());
});

// ── Disease Knowledge Routes ────────────────────────────────────────────────
app.get('/api/diseases', (req, res) => {
  res.json(diseaseKnowledge);
});

app.get('/api/diseases/:classId', (req, res) => {
  const disease = diseaseKnowledge.find(d => d.class_id === parseInt(req.params.classId));
  if (!disease) return res.status(404).json({ error: 'Disease not found' });
  res.json(disease);
});

// ── Expert Routes ───────────────────────────────────────────────────────────
app.get('/api/experts', (req, res) => {
  const { region, crop } = req.query;
  let filtered = [...experts];
  if (region) filtered = filtered.filter(e => e.region.toLowerCase().includes(region.toLowerCase()));
  if (crop) filtered = filtered.filter(e => e.specializations.includes(crop));
  res.json(filtered);
});

// ── Hotspot Routes ──────────────────────────────────────────────────────────
app.get('/api/hotspots', (req, res) => {
  const { crop_type, disease } = req.query;
  let filtered = [...hotspotReports];
  if (crop_type) filtered = filtered.filter(h => h.crop_type === crop_type);
  if (disease) filtered = filtered.filter(h => h.disease === disease);
  res.json(filtered);
});

// ── Weather Route (mock — integrate OpenWeather API in production) ──────────
app.get('/api/weather/:district', (req, res) => {
  res.json({
    district: req.params.district,
    temp: 32, humidity: 78, condition: 'Partly Cloudy', wind: 12,
    risk_level: 'medium',
    risk_reason: 'High humidity (78%) with warm temperatures increases risk of fungal diseases.',
    forecast: [
      { day: 'Today', temp: 32, condition: 'Partly Cloudy', rain_chance: 20 },
      { day: 'Tomorrow', temp: 30, condition: 'Rain', rain_chance: 60 },
      { day: 'Day 3', temp: 29, condition: 'Rain', rain_chance: 70 },
      { day: 'Day 4', temp: 31, condition: 'Partly Cloudy', rain_chance: 30 },
      { day: 'Day 5', temp: 33, condition: 'Sunny', rain_chance: 10 },
    ]
  });
});

// ── Translation & Gemini AI Advisory Routes ────────────────────────────────
app.post('/api/translate', async (req, res) => {
  const { text, targetLang } = req.body;
  if (!text) return res.status(400).json({ error: 'Text parameter required' });
  const translated = await translateWithGemini(text, targetLang || 'en');
  res.json({ original: text, targetLang, translated });
});

app.post('/api/advisory', async (req, res) => {
  const { crop, disease, confidence, stage, weather } = req.body;
  const advisory = await generateAdvisoryWithGemini(crop, disease, confidence, stage, weather);
  res.json({ advisory });
});

// ── Mock Detection Generator ────────────────────────────────────────────────
function generateMockDetections(cropType) {
  const relevant = diseaseKnowledge.filter(d => d.crop.includes(cropType || 'mango'));
  const count = Math.floor(Math.random() * 3) + 1;
  return Array.from({ length: count }, () => {
    const disease = relevant[Math.floor(Math.random() * relevant.length)];
    return {
      class_id: disease.class_id,
      class_name: disease.display_name,
      confidence: Math.round((Math.random() * 40 + 55) * 10) / 10,
      bounding_box: {
        x: +(Math.random() * 0.4 + 0.1).toFixed(3),
        y: +(Math.random() * 0.4 + 0.1).toFixed(3),
        w: +(Math.random() * 0.2 + 0.15).toFixed(3),
        h: +(Math.random() * 0.2 + 0.15).toFixed(3)
      },
      knowledge: disease
    };
  });
}

// ── Start server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🌱 Crop Health API running on http://localhost:${PORT}`);
  console.log(`   ${users.length} farmers, ${experts.length} experts, ${diseaseKnowledge.length} diseases seeded`);
});
