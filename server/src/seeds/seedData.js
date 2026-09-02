import bcrypt from 'bcryptjs';

const hash = bcrypt.hashSync('farmer123', 10);

export const farmers = [
  { id: 1, name: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh@example.com', password_hash: hash, region: 'Nashik', state: 'Maharashtra', language: 'hi', crops: ['mango', 'tomato', 'onion'], created_at: '2026-01-15T00:00:00Z' },
  { id: 2, name: 'Priya Patil', phone: '9876543211', email: 'priya@example.com', password_hash: hash, region: 'Ratnagiri', state: 'Maharashtra', language: 'mr', crops: ['mango', 'rice'], created_at: '2026-02-20T00:00:00Z' },
  { id: 3, name: 'Amit Singh', phone: '9876543212', email: 'amit@example.com', password_hash: hash, region: 'Lucknow', state: 'Uttar Pradesh', language: 'hi', crops: ['wheat', 'potato', 'sugarcane'], created_at: '2026-03-10T00:00:00Z' },
  { id: 4, name: 'Lakshmi Devi', phone: '9876543213', email: 'lakshmi@example.com', password_hash: hash, region: 'Guntur', state: 'Andhra Pradesh', language: 'en', crops: ['chili', 'cotton', 'rice'], created_at: '2026-04-05T00:00:00Z' },
];

export const experts = [
  { id: 1, name: 'Dr. Anil Sharma', shop: 'KVK Nashik - Krishi Vigyan Kendra', contact: '9876500001', region: 'Nashik', specializations: ['mango', 'tomato'], diseases: ['Anthracnose', 'Powdery Mildew'], verified: true },
  { id: 2, name: 'Sunita Deshmukh', shop: 'Green Agri Solutions Pvt Ltd', contact: '9876500002', region: 'Ratnagiri', specializations: ['mango'], diseases: ['Fruit Rot', 'Anthracnose'], verified: true },
  { id: 3, name: 'Prakash Jadhav', shop: 'Jadhav Krishi Kendra', contact: '9876500003', region: 'Pune', specializations: ['tomato', 'onion', 'potato'], diseases: ['Leaf Spot', 'Powdery Mildew'], verified: false },
  { id: 4, name: 'Dr. Meena Kulkarni', shop: 'Agriculture Extension Office, Nashik', contact: '9876500004', region: 'Nashik', specializations: ['mango', 'cotton', 'soybean'], diseases: ['Sooty Mold', 'Anthracnose'], verified: true },
  { id: 5, name: 'Ravi Agro Chemicals', shop: 'Ravi Pesticide & Seed Store', contact: '9876500005', region: 'Aurangabad', specializations: ['cotton', 'soybean'], diseases: ['Leaf Spot'], verified: false },
];

export const diseaseKnowledge = [
  {
    class_id: 0, display_name: "Anthracnose", crop: ["mango"],
    description: "Fungal disease caused by Colletotrichum gloeosporioides. Causes dark, sunken lesions on fruits, leaves, and flowers of mango. Most destructive disease of mango worldwide.",
    cause: "Fungal spores spread via rain splash, wind, and infected plant debris. Favored by warm, humid conditions (25-30°C with >80% humidity).",
    symptoms: ["Dark brown to black irregular spots on leaves", "Sunken dark lesions on fruits", "Flower blight and panicle dieback", "Fruit rot during ripening", "Twig dieback in severe cases"],
    immediate_action: "Remove and destroy all infected fruits and plant parts. Avoid overhead irrigation. Improve air circulation by pruning dense canopy.",
    preventive_measures: ["Prune dead wood and remove fallen debris before monsoon", "Maintain proper tree spacing for airflow", "Apply copper-based fungicide before flowering", "Harvest fruits at proper maturity stage", "Use hot water treatment (52°C for 5 min) post-harvest"],
    treatment: { organic: "Neem oil spray (5ml/L) every 10 days. Trichoderma viride bio-agent application on soil.", chemical: "Carbendazim 50% WP (1g/L) or Mancozeb 75% WP (2.5g/L) spray at 15-day intervals during flowering and fruiting." },
    severity_by_confidence: { low: "Monitor weekly. Check neighboring trees.", medium: "Begin treatment within 3 days. Remove affected fruits.", high: "Treat immediately. Isolate affected trees. Contact expert." },
    expert_review_needed: true
  },
  {
    class_id: 1, display_name: "Powdery Mildew", crop: ["mango"],
    description: "Fungal disease caused by Oidium mangiferae. Appears as white powdery coating on young leaves, flowers, and small fruits.",
    cause: "Airborne fungal spores. Favored by cool nights (10-15°C) and warm days (25-30°C). Most common during flowering season.",
    symptoms: ["White powdery growth on panicles and young leaves", "Flower and fruit drop", "Distorted young leaves", "Reduced fruit set", "Premature leaf fall"],
    immediate_action: "Spray wettable sulfur (3g/L) immediately. Remove severely affected panicles.",
    preventive_measures: ["Apply sulfur dust before flowering season", "Avoid excess nitrogen fertilization", "Ensure good air circulation through pruning", "Monitor weather — cool nights signal risk", "Time flowering-stage sprays preventatively"],
    treatment: { organic: "Wettable sulfur (3g/L) or potassium bicarbonate spray.", chemical: "Dinocap 48% EC (1ml/L) or Tridemorph 80% EC (0.5ml/L)." },
    severity_by_confidence: { low: "Monitor biweekly during flowering season.", medium: "Apply sulfur spray within 2 days.", high: "Immediate chemical treatment needed." },
    expert_review_needed: false
  },
  {
    class_id: 2, display_name: "Fruit Rot", crop: ["mango"],
    description: "Post-harvest disease caused by multiple fungi (Aspergillus niger, Rhizopus). Causes rapid decay of ripe mango fruits.",
    cause: "Fungal infection through wounds during harvesting. Favored by high temperature and humidity during storage.",
    symptoms: ["Soft, water-soaked spots on ripe fruit", "Rapid fruit decay", "Black mold growth on fruit surface", "Foul smell", "Fruit skin turns brown/black"],
    immediate_action: "Separate infected fruits immediately. Do not store with healthy fruits. Reduce storage temperature.",
    preventive_measures: ["Handle fruits gently during harvest", "Use sharp tools, leave stem attached", "Hot water dip (52°C for 5 min) after harvest", "Store in cool ventilated area (12-14°C)", "Sort and remove damaged fruits before storage"],
    treatment: { organic: "Hot water treatment post-harvest. Coating with bee wax.", chemical: "Dip in Carbendazim (500 ppm) for 5 minutes post-harvest." },
    severity_by_confidence: { low: "Check storage conditions weekly.", medium: "Improve ventilation. Remove soft fruits.", high: "Emergency — separate all fruits. May lose batch." },
    expert_review_needed: true
  },
  {
    class_id: 3, display_name: "Leaf Spot", crop: ["mango"],
    description: "Caused by Pestalotiopsis mangiferae. Grey-brown spots with dark margins on mango leaves.",
    cause: "Fungal spores spread through rain and wind. Attacks stressed or nutrient-deficient trees.",
    symptoms: ["Grey-brown circular spots on leaves", "Dark brown margins around spots", "Leaf yellowing around spots", "Premature leaf drop", "Reduced canopy vigor"],
    immediate_action: "Remove badly affected leaves. Apply foliar fertilizer to boost tree health.",
    preventive_measures: ["Maintain proper nutrition (balanced NPK)", "Avoid water stress during summer", "Remove fallen leaves and debris", "Maintain spacing between trees", "Prune to improve light penetration"],
    treatment: { organic: "Neem oil spray (5ml/L). Bordeaux mixture (1%) spray.", chemical: "Copper oxychloride 50% WP (3g/L) or Mancozeb 75% WP (2.5g/L)." },
    severity_by_confidence: { low: "Monitor monthly.", medium: "Start organic treatment.", high: "Chemical treatment recommended." },
    expert_review_needed: false
  },
  {
    class_id: 4, display_name: "Sooty Mold", crop: ["mango"],
    description: "Black sooty coating on leaves caused by Capnodium spp. growing on honeydew from sap-sucking insects.",
    cause: "Secondary fungal growth on insect honeydew. Primary problem is insect infestation (mango hoppers, mealybugs).",
    symptoms: ["Black velvety coating on leaf surface", "Reduced photosynthesis", "Sticky honeydew on leaves", "Presence of hoppers/mealybugs", "Stunted growth"],
    immediate_action: "Spray insecticide to control hoppers/mealybugs first. Wash leaves with water + mild soap.",
    preventive_measures: ["Control mango hoppers with timely sprays", "Prune overcrowded branches", "Apply sticky bands on trunk", "Encourage natural predators", "Remove weeds around tree base"],
    treatment: { organic: "Neem oil (5ml/L) + liquid soap spray.", chemical: "Imidacloprid 17.8% SL (0.3ml/L) for hoppers, then Mancozeb for mold." },
    severity_by_confidence: { low: "Check for insects on leaf undersides.", medium: "Begin insect control within a week.", high: "Immediate insecticide application." },
    expert_review_needed: true
  }
];

export const hotspotReports = [
  { id: 1, crop_type: 'mango', disease: 'Anthracnose', lat: 19.9975, lng: 73.7898, district: 'Nashik', severity: 'high', reported_at: '2026-08-28' },
  { id: 2, crop_type: 'mango', disease: 'Powdery Mildew', lat: 20.0063, lng: 73.7700, district: 'Nashik', severity: 'medium', reported_at: '2026-08-30' },
  { id: 3, crop_type: 'mango', disease: 'Fruit Rot', lat: 16.9902, lng: 73.3120, district: 'Ratnagiri', severity: 'high', reported_at: '2026-08-29' },
  { id: 4, crop_type: 'mango', disease: 'Anthracnose', lat: 17.0005, lng: 73.2900, district: 'Ratnagiri', severity: 'medium', reported_at: '2026-08-27' },
  { id: 5, crop_type: 'mango', disease: 'Sooty Mold', lat: 18.5204, lng: 73.8567, district: 'Pune', severity: 'low', reported_at: '2026-08-31' },
  { id: 6, crop_type: 'tomato', disease: 'Leaf Spot', lat: 19.9800, lng: 73.8000, district: 'Nashik', severity: 'medium', reported_at: '2026-08-30' },
  { id: 7, crop_type: 'mango', disease: 'Powdery Mildew', lat: 19.8762, lng: 75.3433, district: 'Aurangabad', severity: 'low', reported_at: '2026-08-25' },
];
