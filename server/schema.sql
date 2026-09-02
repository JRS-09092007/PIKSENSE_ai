-- Crop Health & Advisory Platform — PostgreSQL Schema
-- Requires PostGIS extension for geospatial hotspot queries

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ══════════════════════════════════════════════════════════════════════════════
-- FARMERS
-- ══════════════════════════════════════════════════════════════════════════════
CREATE TABLE farmers (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  phone         VARCHAR(15) UNIQUE NOT NULL,
  email         VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  region        VARCHAR(100),          -- district
  state         VARCHAR(100),
  preferred_language VARCHAR(10) DEFAULT 'en',
  crops         TEXT[] DEFAULT '{}',   -- array of crop IDs
  role          VARCHAR(20) DEFAULT 'farmer', -- 'farmer' | 'official'
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════════════════
-- CROP SCANS
-- ══════════════════════════════════════════════════════════════════════════════
CREATE TABLE crop_scans (
  id            SERIAL PRIMARY KEY,
  farmer_id     INT REFERENCES farmers(id) ON DELETE CASCADE,
  image_url     TEXT,
  crop_type     VARCHAR(50),
  detections    JSONB DEFAULT '[]',    -- array of {class_id, class_name, bounding_box, confidence}
  status        VARCHAR(30) DEFAULT 'pending', -- pending | expert-reviewed | resolved
  expert_notes  TEXT,
  reviewed_by   INT REFERENCES experts(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════════════════
-- EXPERTS
-- ══════════════════════════════════════════════════════════════════════════════
CREATE TABLE experts (
  id              SERIAL PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  shop_name       VARCHAR(200),
  contact_number  VARCHAR(15),
  email           VARCHAR(100),
  region          VARCHAR(100),
  specializations TEXT[] DEFAULT '{}',  -- crop types
  diseases        TEXT[] DEFAULT '{}',  -- disease names
  verified        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════════════════
-- HOTSPOT REPORTS (geospatial)
-- ══════════════════════════════════════════════════════════════════════════════
CREATE TABLE hotspot_reports (
  id            SERIAL PRIMARY KEY,
  crop_type     VARCHAR(50),
  disease       VARCHAR(100),
  location      GEOMETRY(POINT, 4326), -- PostGIS point
  district      VARCHAR(100),
  severity      VARCHAR(20) DEFAULT 'low', -- low | medium | high
  scan_id       INT REFERENCES crop_scans(id),
  reported_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hotspots_location ON hotspot_reports USING GIST(location);
CREATE INDEX idx_hotspots_disease ON hotspot_reports(disease);
CREATE INDEX idx_hotspots_crop ON hotspot_reports(crop_type);

-- ══════════════════════════════════════════════════════════════════════════════
-- WEATHER RISK
-- ══════════════════════════════════════════════════════════════════════════════
CREATE TABLE weather_risks (
  id            SERIAL PRIMARY KEY,
  district      VARCHAR(100),
  date          DATE,
  risk_level    VARCHAR(20), -- low | medium | high
  risk_reason   TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════════════════
-- DISEASE KNOWLEDGE BASE
-- ══════════════════════════════════════════════════════════════════════════════
CREATE TABLE disease_knowledge (
  id                    SERIAL PRIMARY KEY,
  class_id              INT UNIQUE NOT NULL,  -- matches YOLOv12 class map
  display_name          VARCHAR(100) NOT NULL,
  crop                  TEXT[] DEFAULT '{}',
  description           TEXT,
  cause                 TEXT,
  symptoms              TEXT[] DEFAULT '{}',
  immediate_action      TEXT,
  preventive_measures   TEXT[] DEFAULT '{}',
  treatment_organic     TEXT,
  treatment_chemical    TEXT,
  severity_low_action   TEXT,
  severity_med_action   TEXT,
  severity_high_action  TEXT,
  expert_review_needed  BOOLEAN DEFAULT FALSE,
  before_image_url      TEXT,
  after_image_url       TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════════════════
-- KNOWN DISEASE CASES (library/before-after)
-- ══════════════════════════════════════════════════════════════════════════════
CREATE TABLE known_disease_cases (
  id              SERIAL PRIMARY KEY,
  crop_type       VARCHAR(50),
  disease_name    VARCHAR(100),
  before_image    TEXT,
  after_image     TEXT,
  description     TEXT,
  solution_steps  TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════════════════
-- SEED DATA
-- ══════════════════════════════════════════════════════════════════════════════

-- Seed farmers (password = 'farmer123' hashed with bcrypt)
INSERT INTO farmers (name, phone, email, password_hash, region, state, preferred_language, crops) VALUES
('Rajesh Kumar', '9876543210', 'rajesh@example.com', '$2a$10$QfG5Y6U1N8v6Z5v3K4C7OeQrV0L3Y6H9X2W1M4P7S8D0F3G5H7J9', 'Nashik', 'Maharashtra', 'hi', '{mango,tomato,onion}'),
('Priya Patil', '9876543211', 'priya@example.com', '$2a$10$QfG5Y6U1N8v6Z5v3K4C7OeQrV0L3Y6H9X2W1M4P7S8D0F3G5H7J9', 'Ratnagiri', 'Maharashtra', 'mr', '{mango,rice}'),
('Amit Singh', '9876543212', 'amit@example.com', '$2a$10$QfG5Y6U1N8v6Z5v3K4C7OeQrV0L3Y6H9X2W1M4P7S8D0F3G5H7J9', 'Lucknow', 'Uttar Pradesh', 'hi', '{wheat,potato,sugarcane}'),
('Lakshmi Devi', '9876543213', 'lakshmi@example.com', '$2a$10$QfG5Y6U1N8v6Z5v3K4C7OeQrV0L3Y6H9X2W1M4P7S8D0F3G5H7J9', 'Guntur', 'Andhra Pradesh', 'en', '{chili,cotton,rice}');

-- Seed experts
INSERT INTO experts (name, shop_name, contact_number, region, specializations, diseases, verified) VALUES
('Dr. Anil Sharma', 'KVK Nashik', '9876500001', 'Nashik', '{mango,tomato}', '{Anthracnose,"Powdery Mildew"}', TRUE),
('Sunita Deshmukh', 'Green Agri Solutions', '9876500002', 'Ratnagiri', '{mango}', '{"Fruit Rot",Anthracnose}', TRUE),
('Prakash Jadhav', 'Jadhav Krishi Kendra', '9876500003', 'Pune', '{tomato,onion,potato}', '{"Leaf Spot","Powdery Mildew"}', FALSE),
('Dr. Meena Kulkarni', 'Agriculture Extension Office', '9876500004', 'Nashik', '{mango,cotton,soybean}', '{"Sooty Mold",Anthracnose}', TRUE),
('Ravi Agro Chemicals', 'Ravi Pesticide Store', '9876500005', 'Aurangabad', '{cotton,soybean}', '{"Leaf Spot"}', FALSE);

-- Seed disease knowledge
INSERT INTO disease_knowledge (class_id, display_name, crop, description, cause, symptoms, immediate_action, preventive_measures, treatment_organic, treatment_chemical, severity_low_action, severity_med_action, severity_high_action, expert_review_needed) VALUES
(0, 'Anthracnose', '{mango}', 'Fungal disease caused by Colletotrichum gloeosporioides.', 'Fungal spores spread via rain, wind, and debris. Favored by warm humid conditions.', '{" Dark brown/black spots on leaves","Sunken lesions on fruits","Flower blight","Fruit rot during ripening","Twig dieback"}', 'Remove infected parts. Avoid overhead irrigation. Improve air circulation.', '{"Prune dead wood before monsoon","Proper tree spacing","Copper fungicide before flowering","Harvest at proper maturity","Hot water treatment post-harvest"}', 'Neem oil spray (5ml/L) every 10 days.', 'Carbendazim 50% WP (1g/L) at 15-day intervals.', 'Monitor weekly.', 'Treat within 3 days.', 'Treat immediately. Contact expert.', TRUE),
(1, 'Powdery Mildew', '{mango}', 'Caused by Oidium mangiferae. White powdery coating on young leaves and flowers.', 'Airborne spores. Cool nights + warm days.', '{"White powdery growth","Flower/fruit drop","Distorted leaves","Reduced fruit set","Premature leaf fall"}', 'Spray wettable sulfur (3g/L). Remove affected panicles.', '{"Sulfur dust before flowering","Avoid excess nitrogen","Good air circulation","Monitor weather","Preventive sprays"}', 'Wettable sulfur or potassium bicarbonate.', 'Dinocap 48% EC (1ml/L).', 'Monitor biweekly.', 'Apply sulfur within 2 days.', 'Immediate chemical treatment.', FALSE),
(2, 'Fruit Rot', '{mango}', 'Post-harvest disease by Aspergillus/Rhizopus. Causes rapid fruit decay.', 'Fungal infection through harvest wounds.', '{"Soft water-soaked spots","Rapid decay","Black mold","Foul smell","Brown/black skin"}', 'Separate infected fruits. Reduce temperature.', '{"Gentle handling","Sharp tools","Hot water dip post-harvest","Cool ventilated storage","Sort before storage"}', 'Hot water treatment. Bee wax coating.', 'Carbendazim dip (500 ppm).', 'Check storage weekly.', 'Improve ventilation.', 'Emergency separation.', TRUE),
(3, 'Leaf Spot', '{mango}', 'Caused by Pestalotiopsis mangiferae. Grey-brown spots on leaves.', 'Fungal spores via rain/wind. Attacks stressed trees.', '{"Grey-brown circular spots","Dark margins","Yellowing","Premature leaf drop","Reduced vigor"}', 'Remove affected leaves. Apply foliar fertilizer.', '{"Balanced NPK","Avoid water stress","Remove debris","Proper spacing","Prune for light"}', 'Neem oil. Bordeaux mixture (1%).', 'Copper oxychloride (3g/L).', 'Monitor monthly.', 'Start organic treatment.', 'Chemical treatment recommended.', FALSE),
(4, 'Sooty Mold', '{mango}', 'Black coating caused by Capnodium spp. on insect honeydew.', 'Secondary growth on insect honeydew (hoppers, mealybugs).', '{"Black velvety coating","Reduced photosynthesis","Sticky honeydew","Visible hoppers","Stunted growth"}', 'Control insects first. Wash leaves with soap water.', '{"Control hoppers","Prune overcrowded branches","Sticky trunk bands","Encourage predators","Remove weeds"}', 'Neem oil + liquid soap spray.', 'Imidacloprid for hoppers, then Mancozeb.', 'Check for insects.', 'Begin insect control.', 'Immediate insecticide.', TRUE);

-- Seed hotspot reports
INSERT INTO hotspot_reports (crop_type, disease, location, district, severity, reported_at) VALUES
('mango', 'Anthracnose', ST_SetSRID(ST_MakePoint(73.7898, 19.9975), 4326), 'Nashik', 'high', '2026-08-28'),
('mango', 'Powdery Mildew', ST_SetSRID(ST_MakePoint(73.7700, 20.0063), 4326), 'Nashik', 'medium', '2026-08-30'),
('mango', 'Fruit Rot', ST_SetSRID(ST_MakePoint(73.3120, 16.9902), 4326), 'Ratnagiri', 'high', '2026-08-29'),
('mango', 'Anthracnose', ST_SetSRID(ST_MakePoint(73.2900, 17.0005), 4326), 'Ratnagiri', 'medium', '2026-08-27'),
('mango', 'Sooty Mold', ST_SetSRID(ST_MakePoint(73.8567, 18.5204), 4326), 'Pune', 'low', '2026-08-31');
