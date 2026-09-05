# PIKSENSE_ai (पीकSense) - Master Implementation Plan & Phase Roadmap

## Project Goal
Upgrade the existing repository into a production-grade, functional, SIH-ready crop health intelligence platform for Indian farmers, field officers, and agriculture department officials.

---

## 14-Phase Execution Roadmap

| Phase | Module / Focus Area | Key Deliverables | Status |
|---|---|---|---|
| **Phase 1** | Audit & Architecture Docs | Audit repo, create `/docs/ARCHITECTURE.md`, `/docs/IMPLEMENTATION_PLAN.md`, `/docs/API_DOCUMENTATION.md`, update branding to पीकSense | **In Progress** |
| **Phase 2** | Authentication & Database Migration | Replace in-memory arrays with PostgreSQL/PostGIS, implement bcrypt + JWT auth, enforce backend RBAC (`farmer`, `extension`, `officer`) | Pending |
| **Phase 3** | Real ML Service (FastAPI + YOLO11) | Build Python FastAPI service with YOLO11 model inference, `/predict`, `/health`, `/validate-image` | Pending |
| **Phase 4** | Frontend-Backend Scan Integration | Connect React camera scanner -> Express API -> FastAPI YOLO11 ML service | Pending |
| **Phase 5** | Crop Management & Stage Calculator | Implement crop registration, sowing date tracking, and automated growth stage calculation engine | Pending |
| **Phase 6** | Real Weather Integration | Implement `weatherService.js` connecting to Open-Meteo API with response caching | Pending |
| **Phase 7** | Explainable Risk Engine | Implement weighted 5-factor scoring engine (30% weather, 25% stage, 20% cases, 15% history, 10% scans) | Pending |
| **Phase 8** | Hotspot & Spatial Intelligence | Build PostGIS spatial clustering pipeline for disease outbreak maps | Pending |
| **Phase 9** | Expert Validation & Feedback | Implement agronomist review portal and scan feedback collection | Pending |
| **Phase 10**| Grounded Gemini Assistant | Implement `geminiService.js` for conversational advisories using verified knowledge bases | Pending |
| **Phase 11**| Follow-Up Crop Health Timeline | Implement persistent Day 0 to Day 14 disease recovery timeline with before/after photos | Pending |
| **Phase 12**| Offline & Multilingual Support | Enhance i18n dictionaries (EN/HI/MR) and PWA offline queueing | Pending |
| **Phase 13**| UI/UX Polish & Mobile Optimization | Refine touch targets, responsive layouts, botanical dark aesthetics | Pending |
| **Phase 14**| Testing & Deployment Specs | Unit/integration test suites, deployment specs for Vercel/Node/FastAPI/Postgres | Pending |

---

## Verification Criteria for Success
1. `npm run build` in `client` completes with 0 errors.
2. `npm test` in `server` runs clean integration tests.
3. FastAPI ML service responds to `/predict` with structured YOLO JSON detections.
4. Open-Meteo live weather telemetry successfully calculates risk scores.
5. All role operations are strictly verified by JWT signatures.
