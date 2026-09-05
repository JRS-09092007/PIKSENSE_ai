# PIKSENSE_ai (पीकSense) - Complete API Documentation

## Base URLs
- **Node.js Express API**: `http://localhost:5000/api`
- **FastAPI ML Microservice**: `http://localhost:8000`

---

## 1. Authentication & User API

### 1.1 User Registration
- **POST** `/api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "Rajesh Kumar",
    "phone": "9876543210",
    "email": "farmer@mahacrop.gov.in",
    "password": "SecurePassword123",
    "role": "farmer",
    "region": "Nashik District",
    "state": "Maharashtra",
    "language": "mr"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "user": {
      "id": 1,
      "name": "Rajesh Kumar",
      "phone": "9876543210",
      "role": "farmer",
      "region": "Nashik District",
      "language": "mr"
    }
  }
  ```

### 1.2 User Login
- **POST** `/api/auth/login`
- **Request Body**:
  ```json
  {
    "emailOrPhone": "farmer@mahacrop.gov.in",
    "password": "SecurePassword123",
    "selectedRole": "farmer"
  }
  ```
- **Response (200 OK)**: Returns JWT bearer token and user object.

### 1.3 Get Current User Profile
- **GET** `/api/auth/me`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response (200 OK)**: Authenticated user profile details.

---

## 2. Crop Management & Stage API

### 2.1 Register New Crop
- **POST** `/api/crops`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  {
    "crop_type": "tomato",
    "variety": "Abhinav",
    "field_name": "North Orchard Block A",
    "sowing_date": "2026-07-15",
    "area_acres": 2.5,
    "location": { "lat": 19.9975, "lng": 73.7898 }
  }
  ```
- **Response (200 OK)**: Created crop record with calculated growth stage (`flowering`).

---

## 3. Crop Scan & Disease Identification API

### 3.1 Upload Crop Scan for Inference
- **POST** `/api/scans`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `image`: File (JPEG/PNG)
  - `crop_type`: "tomato" | "mango" | "rice" | "wheat"
  - `growth_stage`: "flowering"
- **Response (200 OK)**:
  ```json
  {
    "id": 1042,
    "image_url": "/uploads/1725548192-leaf.jpg",
    "crop_type": "tomato",
    "quality_check": { "passed": true, "score": 92 },
    "predictions": [
      {
        "disease": "tomato_early_blight",
        "confidence": 0.91,
        "bbox": { "x1": 100, "y1": 80, "x2": 500, "y2": 420 }
      }
    ],
    "model_version": "piksense-yolo11-v1"
  }
  ```

---

## 4. FastAPI ML Service Internal Endpoints

### 4.1 ML Health Check
- **GET** `http://localhost:8000/health`
- **Response**: `{"status": "healthy", "model_loaded": true, "model_version": "YOLO11s"}`

### 4.2 Image Quality Pre-Validation
- **POST** `http://localhost:8000/validate-image`
- **Response**: `{"passed": true, "blur_score": 142.5, "brightness": 128.0}`

### 4.3 Direct YOLO11 Prediction
- **POST** `http://localhost:8000/predict`
- **Form Data**: `file`: Image File, `crop_type`: String
- **Response**: Structured YOLO bounding boxes and predictions.

---

## 5. Risk Intelligence & Weather API

### 5.1 Get Weather Telemetry
- **GET** `/api/weather/:district`
- **Response**: Live temperature, humidity, precipitation forecast from Open-Meteo API.

### 5.2 Get Crop Risk Score & Explainability
- **GET** `/api/risk/:cropId`
- **Response**:
  ```json
  {
    "riskScore": 82,
    "riskLevel": "high",
    "factors": [
      "High ambient humidity (82%)",
      "Rain forecast within 24 hours",
      "Crop in vulnerable flowering stage",
      "3 active early blight reports in 15km radius"
    ],
    "whyThisAlert": [
      "Humidity > 75% triggers spore germination",
      "Flowering stage has high canopy density",
      "Local outbreak cluster detected in Nashik district"
    ]
  }
  ```
