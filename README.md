# 🌱 Crop Health & Advisory Platform

AI-powered crop disease detection and advisory web app for Indian farmers and agriculture extension workers.

## Architecture

```
crop-health-platform/
├── client/              # React + Vite + Tailwind CSS (PWA)
│   └── src/
│       ├── components/  # BottomNav, Sidebar, VoiceAssistant, LanguageSwitcher
│       ├── pages/       # 12 screens: Dashboard, Scan, Map, Experts, Library, etc.
│       ├── context/     # AuthContext, AppContext (state management)
│       ├── i18n/        # Translations (English, Hindi, Marathi)
│       └── utils/       # Disease knowledge data, mock data
├── server/              # Node.js + Express REST API
│   ├── src/index.js     # API server with auth, scans, diseases, experts, weather
│   ├── src/seeds/       # Seed data for demo
│   └── schema.sql       # PostgreSQL + PostGIS schema for production
├── ml-service/          # Python FastAPI YOLOv12 inference microservice
│   ├── main.py          # Mock inference (plug in real model)
│   └── requirements.txt
└── package.json         # Root scripts for dev/build
```

## Quick Start

### Frontend (React + Vite)
```bash
cd client
npm install
npm run dev          # → http://localhost:5173
```

### Backend (Express API)
```bash
cd server
npm install
npm run dev          # → http://localhost:5000
```

### ML Service (FastAPI)
```bash
cd ml-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000  # → http://localhost:8000
```

## Demo Login
- **Email:** rajesh@example.com
- **Password:** farmer123

## Features

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Onboarding** | 4-slide tutorial, language selector, shown once |
| 2 | **Register/Login** | Phone/email + password, region/state selector |
| 3 | **Crop Selection** | Multi-select grid of crops with icons |
| 4 | **Dashboard** | Weather risk card, 5-day forecast, quick actions |
| 5 | **Scan & Diagnose** | Camera/upload → bounding boxes + disease cards with confidence %, treatments |
| 6 | **Hotspot Map** | Leaflet map with disease pins, filters by crop/disease |
| 7 | **Expert Directory** | Verified experts, call/send-scan buttons |
| 8 | **Storage Tips** | Per-crop storage guides (temp, humidity, shelf life) |
| 9 | **My History** | Past scans, status filters, mark resolved |
| 10 | **Disease Library** | Before/after, symptoms, organic/chemical treatments |
| 11 | **Voice Assistant** | Web Speech API, multilingual, floating mic |
| 12 | **Profile & Settings** | Language, crops, notifications, logout |

## Tech Stack
- **Frontend:** React 19, Vite 8, Tailwind CSS 4, React Router 7, Leaflet, Lucide Icons
- **Backend:** Node.js, Express, JWT, bcrypt, multer
- **Database:** PostgreSQL + PostGIS (schema provided, MVP uses in-memory)
- **ML:** FastAPI, YOLOv12 (mock inference, swap-ready)
- **i18n:** English 🇬🇧 + Hindi 🇮🇳 + Marathi 🇮🇳
- **PWA:** Installable, offline-ready architecture

## Dataset
- **Source:** Roboflow Crop Disease v1 (YOLOv12 format)
- **Images:** 105 (74 train / 21 valid / 10 test)
- **Format:** YOLO normalized bounding boxes
- **Classes mapped to:** Anthracnose, Powdery Mildew, Fruit Rot, Leaf Spot, Sooty Mold

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new farmer |
| POST | `/api/auth/login` | Login with email/phone + password |
| GET | `/api/user/profile` | Get user profile (auth required) |
| PUT | `/api/user/crops` | Update user's crop list |
| POST | `/api/scans` | Upload image for disease detection |
| GET | `/api/scans` | Get user's scan history |
| GET | `/api/diseases` | List all disease knowledge entries |
| GET | `/api/diseases/:classId` | Get specific disease info |
| GET | `/api/experts` | List experts (filter by region/crop) |
| GET | `/api/hotspots` | Get disease hotspot reports |
| GET | `/api/weather/:district` | Get weather + risk for district |

## License
CC BY 4.0 (dataset) • MIT (application code)
