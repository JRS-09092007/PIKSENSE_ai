# PIKSENSE_ai (पीकSense) - System Architecture Specification

## 1. Executive Overview & Problem Statement
**PIKSENSE_ai (पीकSense)** is an end-to-end, AI-powered agricultural intelligence, disease detection, risk forecasting, and advisory platform built for Smart India Hackathon (SIH) Problem Statement 26131 (Government of Maharashtra).

The platform addresses the critical challenge of late crop disease recognition by integrating:
- **Image-based Symptom Identification**: Powered by PyTorch/FastAPI YOLO11 model inference.
- **Explainable Multi-Factor Risk Intelligence**: Combining weather metrics (via Open-Meteo), crop growth stage, crop variety, soil conditions, and historical outbreak clusters.
- **Geospatial Hotspot Surveillance**: PostGIS spatial clustering for district/taluka outbreak tracking.
- **Expert Validation & Lab Referral**: Krishi Sevak field triage and ICAR diagnostic laboratory escalation.
- **Multilingual Conversational Advisory Engine**: Grounded Gemini AI integration with fallback to verified offline knowledge bases.

---

## 2. Target System Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                 React 19 Frontend                                 |
|               (Mobile-First UI, PWA/Offline Shell, i18n: EN/HI/MR)                |
+----------------------------------------+------------------------------------------+
                                         |
                                         v  REST / JSON (JWT Auth Header)
+----------------------------------------+------------------------------------------+
|                                Express.js Backend API                             |
|  - Auth & Authorization (JWT + bcrypt)        - Farm & Crop Stage Calculator      |
|  - Real Weather Service (Open-Meteo API)      - Explainable Risk Engine           |
|  - Grounded Gemini Conversational Advisory   - Image Quality Pre-Validation     |
+-------------------+-----------------------------------+---------------------------+
                    |                                   |
                    v                                   v
+-------------------+------------------+   +------------+---------------------------+
|    PostgreSQL / PostGIS Database     |   |     FastAPI ML Inference Service      |
|  - Farmers, Crops & Growth Stages    |   |  - YOLO11 Object Detection Engine     |
|  - Scans, Predictions & Bounding Boxes|   |  - PyTorch / Ultralytics Runtime      |
|  - Spatial Outbreak Clusters & Cases |   |  - Image Quality Pre-Checker Layer    |
|  - Expert Reviews & Model Feedback   |   |  - Crop Disease Class Taxonomy        |
+--------------------------------------+   +----------------------------------------+
```

---

## 3. Core Component Specifications

### 3.1 Frontend (React 19 + Vite + Tailwind CSS v4)
- **Role**: Provides farmer-friendly, multi-role interfaces (Farmer, Extension Officer, Agriculture Official).
- **Key Modules**:
  - `Scan.jsx`: Visual camera viewfinder with HUD laser scanner, bounding box overlays, and image quality warnings.
  - `RiskIntelligence.jsx`: Explainable risk score visualizer with "Why This Alert?" breakdown cards.
  - `MapPage.jsx`: Leaflet interactive geospatial outbreak map with spatial district filters.
  - `AdminDashboard.jsx`: State command center for district disease outbreak tracking and emergency advisories.

### 3.2 Backend API (Node.js + Express)
- **Role**: Enforces server-side authentication, role authorization, database persistence, weather caching, and orchestrates calls to the ML service and Gemini API.
- **Key Services**:
  - `authMiddleware.js`: Verifies JWT tokens and enforces role-based access control (`farmer`, `extension`, `officer`).
  - `weatherService.js`: Fetches and caches live weather telemetry from Open-Meteo API (temperature, humidity, precipitation, wind).
  - `riskEngine.js`: Evaluates 5 weighted parameters (weather, crop stage, variety, local cases, historical risk).
  - `geminiService.js`: Translates verified knowledge base advisories into farmer-friendly conversational guidance via Gemini API.

### 3.3 ML Microservice (Python FastAPI + YOLO11)
- **Role**: Performs real crop disease detection and bounding box extraction.
- **Endpoints**:
  - `GET /health`: Model status & version check.
  - `POST /validate-image`: Image sharpness, resolution, and leaf visibility validation.
  - `POST /predict`: YOLO11 inference returning crop disease predictions, confidence scores, and bounding boxes.

### 3.4 Database Layer (PostgreSQL + PostGIS)
- **Role**: Persistent data store with spatial GIS extension for hotspot distance calculations and outbreak clustering.

---

## 4. Security & Data Integrity Principles
1. **Zero Frontend Secrets**: All API keys (`GEMINI_API_KEY`, `JWT_SECRET`, database credentials) reside strictly on the server.
2. **Server-Side Authorization**: Roles are set and verified exclusively by the backend via signed JWT claims.
3. **No Unvalidated Predictions**: Images failing blur or brightness checks return actionable re-capture guidance instead of running model inference on corrupted frames.
4. **No Fabricated Data**: Fallback states during network disconnects are visually identified as cached or offline data.
