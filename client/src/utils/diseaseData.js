export const diseaseKnowledge = [
  // ── MANGO ────────────────────────────────────────────────────────────────
  {
    class_id: 0,
    display_name: "Mango Anthracnose",
    display_name_hi: "आम एंथ्रेक्नोज (काला धब्बा)",
    display_name_mr: "आंबा करपा रोग (अँथ्रॅक्नोज)",
    crop: ["mango"],
    description: "Fungal disease caused by Colletotrichum gloeosporioides. Causes dark, sunken lesions on fruits, leaves, and flowers of mango.",
    description_hi: "कोलेलेटोट्रिचम ग्लोयोस्पोरियोइड्स कवक के कारण होने वाली बीमारी। आम के फलों, पत्तियों और फूलों पर गहरे धब्बे बनाती है।",
    description_mr: "कोलेटोट्रिचम बुरशीमुळे होणारा रोग. आंब्याची फळे, पाने आणि मोहरावर काळे चट्टे पाडतो.",
    cause: "Fungal spores spread via rain splash, wind, and infected plant debris. Favored by warm, humid conditions (25-30°C with >80% humidity).",
    cause_hi: "बारिश के पानी, हवा और संक्रमित पत्तियों से कवक फैलता है। 25-30°C तापमान और 80% से अधिक नमी में बढ़ता है।",
    cause_mr: "पावसाचे तुषार, वारा आणि संक्रमित पानांद्वारे बुरशी पसरते. २५-३०°C तापमान आणि जास्त आर्द्रतेमुळे रोग वाढतो.",
    symptoms: [
      "Dark brown to black irregular spots on leaves",
      "Sunken dark lesions on fruits",
      "Flower blight and panicle dieback",
      "Fruit rot during ripening"
    ],
    symptoms_hi: [
      "पत्तियों पर गहरे भूरे से काले अनियमित धब्बे",
      "फलों पर धंसे हुए काले निशान",
      "फूलों और मंजरियों का सूखना",
      "पकने के दौरान फलों का सड़ना"
    ],
    symptoms_mr: [
      "पानांवर काळे-तपकिरी अनियमित चट्टे",
      "फळांवर खड्ड्यासारखे काळे डाग",
      "मोहर कोमेजणे आणि सुकणे",
      "फळे पिकताना सडणे"
    ],
    immediate_action: "Remove and destroy all infected fruits and plant parts. Avoid overhead irrigation. Improve air circulation by pruning dense canopy.",
    immediate_action_hi: "संक्रमित फलों और पत्तियों को तुरंत हटाकर नष्ट करें। ऊपर से पानी छिड़कने से बचें। छंटाई करके धूप और हवा आने दें।",
    immediate_action_mr: "बाधित फळे आणि पाने काढून नष्ट करा. वरून पाणी देणे टाळा. झाडाची छाटणी करून हवा खेळती ठेवा.",
    preventive_measures: [
      "Prune dead wood and remove fallen debris before monsoon",
      "Apply copper-based fungicide before flowering",
      "Use hot water treatment (52°C for 5 min) post-harvest"
    ],
    preventive_measures_hi: [
      "मानसून से पहले सूखी टहनियों की छंटाई करें",
      "फूल आने से पहले कॉपर युक्त फफूंदनाशक छिड़कें",
      "कटाई के बाद गर्म पानी (52°C, 5 मिनट) में उपचारित करें"
    ],
    preventive_measures_mr: [
      "पावसाळ्यापूर्वी वाळलेल्या फांद्या छाटाव्या",
      "मोहर येण्यापूर्वी तांब्रयुक्त बुरशीनाशक फवारावे",
      "काढणीनंतर गरम पाण्यात (५२°C, ५ मिनिटे) प्रक्रिया करा"
    ],
    treatment: {
      organic: "Neem oil spray (5ml/L) every 10 days. Trichoderma viride bio-agent application on soil.",
      organic_hi: "हर 10 दिन में नीम के तेल (5 मिली/लीटर) का छिड़काव करें। ट्राइकोडर्मा विरिडी मिट्टी में मिलाएं।",
      organic_mr: "दर १० दिवसांनी कडुलिंब तेल (५ मि.ली./लीटर) फवारा. ट्रायकोडेर्मा विरिडी मातीत मिसळा.",
      chemical: "Carbendazim 50% WP (1g/L) or Mancozeb 75% WP (2.5g/L) spray at 15-day intervals during flowering.",
      chemical_hi: "कार्बेंडाजिम 50% WP (1 ग्राम/लीटर) या मैंकोजेब 75% WP (2.5 ग्राम/लीटर) का 15 दिनों के अंतराल पर छिड़काव करें।",
      chemical_mr: "कार्बेंडाझिम ५०% डब्ल्यूपी (१ ग्रॅम/लीटर) किंवा मॅन्कोझेब ७५% डब्ल्यूपी (२.५ ग्रॅम/लीटर) १५ दिवसांच्या अंतराने फवारा."
    },
    expert_review_needed: true,
    before_image: "🥭",
    after_image: "✅"
  },

  // ── RICE ─────────────────────────────────────────────────────────────────
  {
    class_id: 10,
    display_name: "Rice Blast Disease",
    display_name_hi: "धान का ब्लास्ट रोग (झोंका)",
    display_name_mr: "भातावरील मानमोडी / ब्लास्ट रोग",
    crop: ["rice"],
    description: "Caused by the fungus Magnaporthe oryzae. Most destructive disease affecting rice worldwide, forming spindle-shaped lesions.",
    description_hi: "मैग्नापोर्थे ओराइजी कवक से होने वाला विनाशकारी रोग। पत्तियों पर नाव के आकार के धब्बे बनाता है।",
    description_mr: "मॅग्नापोर्थे बुरशीमुळे होणारा भाताचा अत्यंत घातक रोग. पानांवर लांबट चाकूच्या आकाराचे डाग पडतात.",
    cause: "Spores transported by wind and dew droplets. Thrives in high humidity (>90%) and high nitrogen levels.",
    cause_hi: "हवा और ओस की बूंदों से कवक फैलता है। 90% से अधिक नमी और अधिक नाइट्रोजन से बढ़ता है।",
    cause_mr: "वारा आणि दवाच्या थेंबांद्वारे बुरशी पसरते. जास्त आर्द्रता आणि नत्राचा अतिवापर याला कारणीभूत ठरतो.",
    symptoms: [
      "Spindle-shaped lesions with grey centers on leaves",
      "Neck blast causing white unfilled panicles",
      "Stunted seedling growth"
    ],
    symptoms_hi: [
      "पत्तियों पर भूरे केंद्र वाले नाव के आकार के धब्बे",
      "गर्दन तोड़ रोग के कारण बालियों का सफेद पड़ना",
      "पौधों की वृद्धि रुकना"
    ],
    symptoms_mr: [
      "पानांवर मध्यभागी करड्या रंगाचे लांबट चट्टे",
      "भाताची ताटे आणि लोंब्या पांढऱ्या पडून सुकणे",
      "रोपांची वाढ खुंटणे"
    ],
    immediate_action: "Reduce nitrogen fertilizer application immediately. Drain field for 3-4 days to lower canopy humidity.",
    immediate_action_hi: "नाइट्रोजन (यूरिया) उर्वरक तुरंत बंद करें। खेत का पानी 3-4 दिनों के लिए निकाल दें।",
    immediate_action_mr: "युरिया खताचा वापर त्वरित थांबवा. शेतातील पाणी ३-४ दिवस काढून सुकू द्या.",
    preventive_measures: [
      "Plant blast-resistant certified rice varieties",
      "Avoid excessive nitrogenous fertilizer dosages",
      "Treat seeds with Pseudomonas fluorescens bio-agent"
    ],
    preventive_measures_hi: [
      "रोगरोधी बीजों का प्रयोग करें",
      "आवश्यकता से अधिक यूरिया न डालें",
      "स्यूडोमोनास फ्लुओरेसेंस से बीज उपचारित करें"
    ],
    preventive_measures_mr: [
      "रोगप्रतिकारक भात वाणांची निवड करा",
      "नत्र खताचा प्रमाणापेक्षा जास्त वापर टाळा",
      "सुडोमोनास जिवाणूने बियाणे प्रक्रिया करा"
    ],
    treatment: {
      organic: "Spray Pseudomonas fluorescens (10g/L) or Neem leaf extract (5%) at 10-day intervals.",
      organic_hi: "स्यूडोमोनास (10 ग्राम/लीटर) या नीम की पत्ती के अर्क (5%) का छिड़काव करें।",
      organic_mr: "सुडोमोनास (१० ग्रॅम/लीटर) किंवा कडुलिंब पाला अर्क (५%) फवारा.",
      chemical: "Tricyclazole 75% WP (0.6g/L) or Isoprothiolane 40% EC (1.5ml/L) spray at onset of spots.",
      chemical_hi: "ट्राइसाइक्लाजोल 75% WP (0.6 ग्राम/लीटर) का छिड़काव करें।",
      chemical_mr: "ट्रायसायक्लाझोल ७५% डब्ल्यूपी (०.६ ग्रॅम/लीटर) रोगाची लक्षणे दिसताच फवारा."
    },
    expert_review_needed: true,
    before_image: "🌾",
    after_image: "✅"
  },

  // ── WHEAT ────────────────────────────────────────────────────────────────
  {
    class_id: 20,
    display_name: "Wheat Stripe / Yellow Rust",
    display_name_hi: "गेहूं का पीला रतुआ (हल्दी रोग)",
    display_name_mr: "गव्हानावरील पिवळा तांबेरा",
    crop: ["wheat"],
    description: "Caused by Puccinia striiformis. Produces bright yellow powdery stripes along wheat leaf veins.",
    description_hi: "पुसीनिया स्ट्राइफॉर्मिस कवक से होता है। गेहूं की पत्तियों की नसों पर पीले रंग की धारियां बनाता है।",
    description_mr: "पुसिनिया बुरशीमुळे होणारा रोग. पानांवर पिवळ्या रंगाच्या पावडरच्या ओळी तयार होतात.",
    cause: "Airborne fungal spores blowing from cold regions. Favored by cool temperatures (10-15°C) and morning fog.",
    cause_hi: "ठंडी हवाओं और कोहरे से फैलता है। 10-15°C तापमान और सुबह के कोहरे में बढ़ता है।",
    cause_mr: "थंड हवा आणि धुक्यामुळे बुरशी पसरते. १०-१५°C तापमान या रोगाला पोषक असते.",
    symptoms: [
      "Yellow powdery pustules in linear stripes on leaves",
      "Premature leaf drying",
      "Shrivelled wheat grains"
    ],
    symptoms_hi: [
      "पत्तियों पर पीली पाउडर जैसी धारियां",
      "पत्तियों का समय से पहले सूखना",
      "गेहूं के दानों का सिकुड़ना"
    ],
    symptoms_mr: [
      "पानांवर पिवळ्या पावडरच्या रेषा",
      "पाने पिवळी पडून लवकर वाळणे",
      "गव्हाचे दाणे बारिक व बारीक होणे"
    ],
    immediate_action: "Spray Propiconazole (Tilt 25 EC) immediately upon first sighting of yellow stripes in field.",
    immediate_action_hi: "पीली धारियां दिखते ही तुरंत प्रोपिकोनाजोल (टिल्ट 25 EC) 1 मिली/लीटर छिड़कें।",
    immediate_action_mr: "पिवळ्या रेषा दिसताच प्रॉपिकोनाझोल (टिल्ट २५ ईसी) १ मि.ली./लीटर त्वरित फवारा.",
    preventive_measures: [
      "Sow rust-resistant wheat cultivars (HD 2967, DBW 187)",
      "Sow early in November",
      "Surveil fields weekly during cool winter months"
    ],
    preventive_measures_hi: [
      "रतुआ रोधी किस्मों की बुवाई करें",
      "नवंबर के प्रथम सप्ताह में समय पर बुवाई करें",
      "सर्दियों में नियमित रूप से खेत का निरीक्षण करें"
    ],
    preventive_measures_mr: [
      "तांबेरा प्रतिकारक गव्हाच्या वाणांची पेरणी करा",
      "नोव्हेंबरच्या पहिल्या आठवड्यात वेळेवर पेरणी करा",
      "हिवाळ्यात शेताची नियमित पाहणी करा"
    ],
    treatment: {
      organic: "Foliar spray of fermented buttermilk (1L in 10L water) mixed with neem oil.",
      organic_hi: "खट्टी छाछ (1 लीटर को 10 लीटर पानी में) नीम के तेल के साथ छिड़कें।",
      organic_mr: "आंबट ताक (१ लीटर १० लीटर पाण्यात) कडुलिंब तेलासोबत फवारा.",
      chemical: "Propiconazole 25% EC (1ml/L) or Tebuconazole 250 EC (1ml/L) spray.",
      chemical_hi: "प्रोपिकोनाजोल 25% EC (1 मिली/लीटर) का छिड़काव करें।",
      chemical_mr: "प्रॉपिकोनाझोल २५% ईसी (१ मि.ली./लीटर) फवारा."
    },
    expert_review_needed: true,
    before_image: "🌾",
    after_image: "✅"
  },

  // ── TOMATO ───────────────────────────────────────────────────────────────
  {
    class_id: 30,
    display_name: "Tomato Late Blight",
    display_name_hi: "टमाटर का पछेती झुलसा",
    display_name_mr: "टोमॅटोवरील उशिरा येणारा करपा",
    crop: ["tomato", "potato"],
    description: "Caused by Phytophthora infestans. Destroys leaves, stems, and tomato fruit rapidly under damp conditions.",
    description_hi: "फाइटोफ्थोरा इन्फेस्टान्स से होने वाला गंभीर रोग। पत्तियों, तनों और टमाटर के फलों को सड़ता है।",
    description_mr: "फायटोप्थोरा बुरशीमुळे होणारा रोग. ओलसर हवामानात पाने, खोड आणि टोमॅटो फळे वेगाने सडवतो.",
    cause: "Water-borne spores spread via wet foliage, rain drops, and cool damp weather (15-22°C with high humidity).",
    cause_hi: "गीली पत्तियों और बारिश की बूंदों से कवक फैलता है। 15-22°C तापमान और नमी में बढ़ता है।",
    cause_mr: "ओल्या पानांवरून आणि पावसाच्या थेंबांवरून बुरशी पसरते. थंड व दमट हवामानात वेगाने वाढतो.",
    symptoms: [
      "Water-soaked dark green/brown spots on leaves",
      "White fungal growth under leaves in wet mornings",
      "Firm dark brown rot on fruits"
    ],
    symptoms_hi: [
      "पत्तियों पर जल-सोखे भूरे-काले धब्बे",
      "सुबह के समय पत्तियों के पीछे सफेद फफूंद",
      "फलों पर कठोर भूरा सड़न"
    ],
    symptoms_mr: [
      "पानांवर काळे-तपकिरी ओले डाग",
      "सकाळी पानांच्या खालच्या बाजूला पांढरी बुरशी",
      "फळांवर कडक काळे-तपकिरी चट्टे"
    ],
    immediate_action: "Prune affected leaves immediately. Avoid sprinkler or drip overhead foliage wetting.",
    immediate_action_hi: "संक्रमित पत्तियों की छंटाई करें। ऊपर से पानी छिड़कना बंद करें।",
    immediate_action_mr: "बाधित पाने लगेच छाटून घ्या. वरून पाणी देणे पूर्णपणे बंद करा.",
    preventive_measures: [
      "Use drip irrigation under soil line",
      "Maintain wide plant spacing for sunlight penetration",
      "Apply protective copper spray prior to rainy spells"
    ],
    preventive_measures_hi: [
      "ड्रिप सिंचाई का उपयोग करें",
      "पौधों के बीच उचित दूरी रखें",
      "बारिश से पहले कॉपर फफूंदनाशक का छिड़काव करें"
    ],
    preventive_measures_mr: [
      "ठिबक सिंचनाचा वापर करा",
      "झाडांमध्ये योग्य अंतर ठेवा",
      "पावसाळ्यापूर्वी तांब्रयुक्त बुरशीनाशक फवारा"
    ],
    treatment: {
      organic: "Bordeaux mixture (1%) spray or Copper Hydroxide (2g/L).",
      organic_hi: "बोर्डो मिश्रण (1%) या कॉपर हाइड्रॉक्साइड (2 ग्राम/लीटर) छिड़कें।",
      organic_mr: "बोर्डो मिश्रण (१%) किंवा कॉपर हायड्रॉक्साइड (२ ग्रॅम/लीटर) फवारा.",
      chemical: "Metalaxyl 8% + Mancozeb 64% WP (2.5g/L) spray.",
      chemical_hi: "मेटालेक्सिल + मैंकोजेब (2.5 ग्राम/लीटर) का छिड़काव करें।",
      chemical_mr: "मेटॅलॅक्सिल ८% + मॅन्कोझेब ६४% डब्ल्यूपी (२.५ ग्रॅम/लीटर) फवारा."
    },
    expert_review_needed: true,
    before_image: "🍅",
    after_image: "✅"
  }
];

export const getLocalizedDisease = (disease, lang) => {
  if (!disease) return {};
  if (lang === 'hi') {
    return {
      ...disease,
      display_name: disease.display_name_hi || disease.display_name,
      description: disease.description_hi || disease.description,
      cause: disease.cause_hi || disease.cause,
      symptoms: disease.symptoms_hi || disease.symptoms,
      immediate_action: disease.immediate_action_hi || disease.immediate_action,
      preventive_measures: disease.preventive_measures_hi || disease.preventive_measures,
      treatment: {
        organic: disease.treatment?.organic_hi || disease.treatment?.organic,
        chemical: disease.treatment?.chemical_hi || disease.treatment?.chemical,
      }
    };
  }
  if (lang === 'mr') {
    return {
      ...disease,
      display_name: disease.display_name_mr || disease.display_name,
      description: disease.description_mr || disease.description,
      cause: disease.cause_mr || disease.cause,
      symptoms: disease.symptoms_mr || disease.symptoms,
      immediate_action: disease.immediate_action_mr || disease.immediate_action,
      preventive_measures: disease.preventive_measures_mr || disease.preventive_measures,
      treatment: {
        organic: disease.treatment?.organic_mr || disease.treatment?.organic,
        chemical: disease.treatment?.chemical_mr || disease.treatment?.chemical,
      }
    };
  }
  return disease;
};

export const cropsList = [
  { id: 'mango', name: 'Mango', nameHi: 'आम', nameMr: 'आंबा', icon: '🥭' },
  { id: 'rice', name: 'Rice', nameHi: 'चावल', nameMr: 'भात / तांदूळ', icon: '🌾' },
  { id: 'wheat', name: 'Wheat', nameHi: 'गेहूं', nameMr: 'गहू', icon: '🌾' },
  { id: 'tomato', name: 'Tomato', nameHi: 'टमाटर', nameMr: 'टोमॅटो', icon: '🍅' },
  { id: 'onion', name: 'Onion', nameHi: 'प्याज', nameMr: 'कांदा', icon: '🧅' },
  { id: 'cotton', name: 'Cotton', nameHi: 'कपास', nameMr: 'कापूस', icon: '🌿' },
  { id: 'potato', name: 'Potato', nameHi: 'आलू', nameMr: 'बटाटा', icon: '🥔' },
  { id: 'sugarcane', name: 'Sugarcane', nameHi: 'गन्ना', nameMr: 'ऊस', icon: '🎋' },
  { id: 'banana', name: 'Banana', nameHi: 'केला', nameMr: 'केळी', icon: '🍌' },
  { id: 'chili', name: 'Chili', nameHi: 'मिर्च', nameMr: 'मिरची', icon: '🌶️' },
  { id: 'soybean', name: 'Soybean', nameHi: 'सोयाबीन', nameMr: 'सोयाबीन', icon: '🫘' },
  { id: 'groundnut', name: 'Groundnut', nameHi: 'मूंगफली', nameMr: 'भुईमूग', icon: '🥜' },
];

export const demoSamples = [
  {
    id: 'sample_mango',
    crop: 'mango',
    title: 'Mango Anthracnose Leaf Spot',
    url: 'https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sample_rice',
    crop: 'rice',
    title: 'Rice Blast Disease (Magnaporthe)',
    url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sample_wheat',
    crop: 'wheat',
    title: 'Wheat Stripe Rust (Puccinia)',
    url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sample_tomato',
    crop: 'tomato',
    title: 'Tomato Late Blight Infection',
    url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=800&auto=format&fit=crop'
  }
];

export const expertsList = [
  { id: 1, name: 'Dr. Anil Sharma', shop: 'KVK Nashik', contact: '9876500001', region: 'Nashik', specializations: ['mango', 'tomato', 'grapes'], diseases: ['Anthracnose', 'Powdery Mildew'], verified: true, rating: 4.9, reviews: 128 },
  { id: 2, name: 'Sunita Deshmukh', shop: 'Green Agri Solutions', contact: '9876500002', region: 'Ratnagiri', specializations: ['mango', 'rice', 'banana'], diseases: ['Fruit Rot', 'Anthracnose', 'Rice Blast'], verified: true, rating: 4.8, reviews: 94 },
  { id: 3, name: 'Prakash Jadhav', shop: 'Jadhav Krishi Kendra', contact: '9876500003', region: 'Pune', specializations: ['tomato', 'onion', 'potato'], diseases: ['Leaf Spot', 'Purple Blotch'], verified: false, rating: 4.6, reviews: 62 },
  { id: 4, name: 'Dr. Meena Kulkarni', shop: 'Agriculture Extension Office', contact: '9876500004', region: 'Nashik', specializations: ['mango', 'cotton', 'soybean'], diseases: ['Sooty Mold', 'Bacterial Blight'], verified: true, rating: 5.0, reviews: 215 }
];

export const storageGuides = [
  { crop: 'mango', temp: '12-14°C', humidity: '85-90%', shelfLife: '2-3 weeks', method: 'Store in cool, ventilated area. Do not stack more than 3 layers. Use newspaper wrapping.', issues: ['Fruit rot from bruising', 'Over-ripening in heat', 'Chilling injury below 10°C'] },
  { crop: 'rice', temp: '15-20°C', humidity: '<14% moisture', shelfLife: '6-12 months', method: 'Dry grain to <14% moisture level. Store in hermetic triple-layer bags on elevated wooden pallets.', issues: ['Rice weevil infestation', 'Storage mold from high moisture', 'Rodent damage'] },
  { crop: 'wheat', temp: '12-18°C', humidity: '<12% moisture', shelfLife: '12-24 months', method: 'Clean wheat grains thoroughly. Store in cool airtight metal bins or Neem-treated bags.', issues: ['Lesser grain borer', 'Damp rot', 'Loss of seed viability'] },
  { crop: 'tomato', temp: '12-15°C', humidity: '85-95%', shelfLife: '1-2 weeks', method: 'Store stem-side down in plastic ventilated crates. Keep away from direct sunlight. Do not refrigerate green tomatoes.', issues: ['Soft rot decay', 'Skin cracking', 'Chilling injury below 10°C'] }
];

export const hotspotReports = [
  { id: 1, crop_type: 'mango', disease: 'Anthracnose', lat: 19.9975, lng: 73.7898, district: 'Nashik', severity: 'high', reported_at: '2026-08-28' },
  { id: 2, crop_type: 'rice', disease: 'Rice Blast Disease', lat: 16.9902, lng: 73.3120, district: 'Ratnagiri', severity: 'high', reported_at: '2026-08-29' },
  { id: 3, crop_type: 'wheat', disease: 'Wheat Stripe Rust', lat: 30.9010, lng: 75.8573, district: 'Ludhiana', severity: 'high', reported_at: '2026-08-30' },
  { id: 4, crop_type: 'tomato', disease: 'Tomato Late Blight', lat: 18.5204, lng: 73.8567, district: 'Pune', severity: 'medium', reported_at: '2026-08-31' }
];

export const mockWeather = {
  temp: 32, humidity: 78, condition: 'Partly Cloudy', wind: 12,
  risk_level: 'medium',
  risk_reason: 'High humidity (78%) with warm monsoon temperatures increases risk of Anthracnose, Rice Blast, and Late Blight across orchards and paddies.',
  forecast: [
    { day: 'Today', temp: 32, icon: '⛅', rain: '20%' },
    { day: 'Tomorrow', temp: 30, icon: '🌧️', rain: '60%' },
    { day: 'Wed', temp: 29, icon: '🌧️', rain: '70%' },
    { day: 'Thu', temp: 31, icon: '⛅', rain: '30%' },
    { day: 'Fri', temp: 33, icon: '☀️', rain: '10%' },
  ]
};

export function getMockDetections(cropType) {
  const diseases = diseaseKnowledge.filter(d => d.crop.includes(cropType || 'mango'));
  const targetDisease = diseases.length > 0 ? diseases[0] : diseaseKnowledge[0];
  return [
    {
      class_id: targetDisease.class_id,
      class_name: targetDisease.display_name,
      confidence: 94.8,
      bounding_box: { x: 0.18, y: 0.16, w: 0.58, h: 0.54 }
    }
  ];
}
