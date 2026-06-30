/**
 * Farming Knowledge Base
 * ─────────────────────────────────────────
 * Organized by crop with detailed farming tips.
 */

export const CROPS = [
  'Tomato', 'Potato', 'Rice', 'Wheat', 'Maize (Corn)', 'Cotton',
  'Soybean', 'Sugarcane', 'Onion', 'Chilli', 'Groundnut', 'Mustard',
  'Brinjal (Eggplant)', 'Okra', 'Cabbage', 'Apple', 'Mango', 'Banana',
];

export const FARMING_TIPS = {
  'Tomato': {
    icon: '🍅',
    season: { kharif: true, rabi: true, zaid: false },
    sowingMonths: 'Jun–Jul (Kharif), Oct–Nov (Rabi)',
    harvestMonths: '60–80 days after transplanting',
    soilType: 'Well-drained loamy or sandy loam, pH 6.0–7.0',
    waterRequirement: 'Moderate (600–1200 mm/season)',
    fertilizer: {
      basal: 'FYM 25 t/ha, N:P:K = 120:60:60 kg/ha',
      topDress: 'Split N application at 20 and 40 DAT',
    },
    spacing: '75 cm × 60 cm',
    irrigation: 'Drip irrigation preferred; water stress at flowering reduces yield',
    pestManagement: [
      { pest: 'Fruit borer (Helicoverpa)', control: 'Spinosad 45% SC @ 1 ml/L; pheromone traps' },
      { pest: 'Whitefly', control: 'Imidacloprid 17.8% SL @ 0.3 ml/L; yellow sticky traps' },
      { pest: 'Aphid', control: 'Thiamethoxam 25% WG @ 0.2 g/L; neem oil 3%' },
    ],
    cropRotation: ['Onion', 'Cabbage', 'Maize (Corn)'],
    tips: [
      'Stake or cage plants to support heavy fruit loads',
      'Remove suckers for indeterminate varieties to improve fruit size',
      'Mulch with straw to conserve moisture and suppress weeds',
      'Maintain calcium supply to prevent blossom-end rot',
    ],
  },

  'Potato': {
    icon: '🥔',
    season: { kharif: false, rabi: true, zaid: false },
    sowingMonths: 'Oct–Nov (Plains), Mar–Apr (Hills)',
    harvestMonths: '70–120 days depending on variety',
    soilType: 'Deep, loose sandy loam to loam, pH 5.5–6.5',
    waterRequirement: 'Moderate (500–700 mm/season)',
    fertilizer: {
      basal: 'FYM 15–20 t/ha, N:P:K = 150:80:100 kg/ha',
      topDress: 'N at earthing up stage (30–35 DAP)',
    },
    spacing: '60 cm × 20 cm',
    irrigation: 'Furrow irrigation; critical at tuber initiation and bulking stages',
    pestManagement: [
      { pest: 'Aphid (virus vector)', control: 'Imidacloprid @ 0.5 ml/L; mineral oil spray' },
      { pest: 'Potato tuber moth', control: 'Chlorpyrifos in soil at planting; pheromone traps' },
      { pest: 'White grub', control: 'Chlorpyrifos 20% EC soil drench; crop rotation' },
    ],
    cropRotation: ['Wheat', 'Maize (Corn)', 'Mustard'],
    tips: [
      'Use certified disease-free seed tubers',
      'Earth up at 30 DAP to prevent greening of tubers',
      'Haulm killing before harvest improves skin set and storage life',
      'Store harvested potatoes in cool, dark conditions (4–7°C)',
    ],
  },

  'Rice': {
    icon: '🌾',
    season: { kharif: true, rabi: false, zaid: true },
    sowingMonths: 'Jun–Jul (Kharif), Nov–Dec (Rabi in S. India)',
    harvestMonths: '100–150 days depending on variety',
    soilType: 'Clay to clay loam, pH 5.5–7.0; water-retentive',
    waterRequirement: 'High (1100–2000 mm/season)',
    fertilizer: {
      basal: 'N:P:K = 120:60:60 kg/ha',
      topDress: 'N in 3 splits: basal, active tillering, panicle initiation',
    },
    spacing: '20 cm × 15 cm (transplanting)',
    irrigation: 'Maintain 5 cm standing water; drain 1 week before harvest',
    pestManagement: [
      { pest: 'Brown plant hopper', control: 'Imidacloprid 17.8% SL @ 0.25 ml/L' },
      { pest: 'Stem borer', control: 'Cartap hydrochloride 4G; pheromone traps' },
      { pest: 'Leaf folder', control: 'Chlorantraniliprole 18.5% SC @ 0.3 ml/L' },
    ],
    cropRotation: ['Wheat', 'Mustard', 'Pulse crops'],
    tips: [
      'System of Rice Intensification (SRI) can increase yield 20–50%',
      'Use 21-day-old seedlings for transplanting in SRI',
      'Zinc deficiency (khaira) is common; apply ZnSO4 @ 25 kg/ha',
      'Maintain proper bund height to prevent water loss',
    ],
  },

  'Wheat': {
    icon: '🌾',
    season: { kharif: false, rabi: true, zaid: false },
    sowingMonths: 'Oct–Nov (Timely), Nov–Dec (Late)',
    harvestMonths: '110–145 days',
    soilType: 'Well-drained loam to clay loam, pH 6.0–7.5',
    waterRequirement: 'Moderate (450 mm/season, 4–6 irrigations)',
    fertilizer: {
      basal: 'N:P:K = 120:60:40 kg/ha',
      topDress: 'N top dress at CRI stage (first irrigation)',
    },
    spacing: '20–22.5 cm row spacing',
    irrigation: 'Crown Root Initiation (21 DAS), Tillering, Jointing, Flowering, Grain filling',
    pestManagement: [
      { pest: 'Yellow rust (stripe rust)', control: 'Propiconazole 25% EC @ 0.1%; resistant varieties' },
      { pest: 'Termite', control: 'Chlorpyrifos 20% EC seed treatment or soil drench' },
      { pest: 'Aphid', control: 'Imidacloprid 17.8% SL @ 0.25 ml/L; natural predators' },
    ],
    cropRotation: ['Rice', 'Maize (Corn)', 'Soybean'],
    tips: [
      'Timely sowing gives 10–15% higher yield than late sowing',
      'Seed treatment with Vitavax / Thiram prevents loose smut',
      'Zero-till wheat after paddy saves fuel and moisture',
      'Harvest at 20–25% grain moisture for best quality',
    ],
  },

  'Maize (Corn)': {
    icon: '🌽',
    season: { kharif: true, rabi: true, zaid: true },
    sowingMonths: 'Jun–Jul (Kharif), Oct–Nov (Rabi), Feb–Mar (Zaid)',
    harvestMonths: '80–110 days',
    soilType: 'Well-drained deep loamy soil, pH 6.0–7.5',
    waterRequirement: 'Moderate (500–800 mm/season)',
    fertilizer: {
      basal: 'N:P:K = 150:75:75 kg/ha',
      topDress: 'N in 2 splits: knee-high stage, tasseling',
    },
    spacing: '60–75 cm × 25 cm',
    irrigation: 'Critical at knee-high, tasseling, and silking stages',
    pestManagement: [
      { pest: 'Fall armyworm', control: 'Spinetoram 11.7% SC @ 0.5 ml/L; emamectin benzoate' },
      { pest: 'Stem borer', control: 'Chlorpyrifos granules in whorl; Trichogramma cards' },
      { pest: 'Cob borer', control: 'Spinosad spray at silk emergence' },
    ],
    cropRotation: ['Soybean', 'Wheat', 'Potato'],
    tips: [
      'Fall armyworm is the #1 threat — scout whorls regularly',
      'Intercrop with legumes (cowpea/soybean) to fix nitrogen',
      'Apply borax @ 10 kg/ha for boron-deficient soils',
      'Harvest at black layer formation for seed corn',
    ],
  },

  'Cotton': {
    icon: '🌿',
    season: { kharif: true, rabi: false, zaid: false },
    sowingMonths: 'Apr–Jun depending on region',
    harvestMonths: '180–200 days',
    soilType: 'Deep black (regur) or alluvial soil, pH 7.0–8.5',
    waterRequirement: 'Moderate–High (700–1200 mm/season)',
    fertilizer: {
      basal: 'N:P:K = 150:75:75 kg/ha (Bt cotton)',
      topDress: 'N split in 3: squaring, flowering, boll development',
    },
    spacing: '90–120 cm × 60–90 cm',
    irrigation: 'Drip preferred; critical at square formation and boll opening',
    pestManagement: [
      { pest: 'Pink boll worm', control: 'Spinosad; Bt cotton varieties; pheromone traps' },
      { pest: 'Whitefly (virus vector)', control: 'Pymetrozine; reflective mulch; neem oil' },
      { pest: 'Aphid', control: 'Acetamiprid; avoid broadspectrum pesticides to conserve predators' },
    ],
    cropRotation: ['Wheat', 'Soybean', 'Sorghum'],
    tips: [
      'Use Bt cotton varieties to reduce bollworm pesticide sprays',
      'Topping at 90 DAP improves boll maturity uniformity',
      'Monitor for Bemisia tabaci (whitefly) — major virus vector',
      'Cotton stalks should be destroyed to break pest cycles',
    ],
  },

  'Soybean': {
    icon: '🫘',
    season: { kharif: true, rabi: false, zaid: false },
    sowingMonths: 'Jun–Jul',
    harvestMonths: '80–120 days',
    soilType: 'Well-drained loamy soil, pH 6.0–7.5',
    waterRequirement: 'Low–Moderate (350–500 mm/season)',
    fertilizer: {
      basal: 'N:P:K = 30:60:40 kg/ha (low N due to fixation)',
      topDress: 'Rhizobium + PSB seed inoculation',
    },
    spacing: '45 cm × 5 cm',
    irrigation: 'Critical at flowering and pod fill stages',
    pestManagement: [
      { pest: 'Girdle beetle', control: 'Triazophos; early sowing; crop rotation' },
      { pest: 'Stem fly', control: 'Thiamethoxam seed treatment; imidacloprid spray' },
      { pest: 'Tobacco caterpillar', control: 'Chlorantraniliprole; Bt formulations' },
    ],
    cropRotation: ['Wheat', 'Maize (Corn)', 'Cotton'],
    tips: [
      'Inoculate seed with Bradyrhizobium japonicum for nitrogen fixation',
      'Do not apply excess nitrogen — it reduces nodule formation',
      'Soybean is an excellent pre-wheat crop; improves soil structure',
      'Broad-leaf weed control critical in first 3 weeks',
    ],
  },

  'Sugarcane': {
    icon: '🎋',
    season: { kharif: false, rabi: true, zaid: false },
    sowingMonths: 'Feb–Mar (Spring), Oct–Nov (Autumn)',
    harvestMonths: '10–18 months',
    soilType: 'Deep loamy to clay loam, pH 6.0–7.5, well-drained',
    waterRequirement: 'High (1500–2500 mm/season)',
    fertilizer: {
      basal: 'N:P:K = 250:100:100 kg/ha',
      topDress: 'N in 3 splits at 30, 60, 90 DAP',
    },
    spacing: '90 cm row-to-row; 30 cm sett-to-sett',
    irrigation: 'Every 7–10 days until grand growth; furrow or drip',
    pestManagement: [
      { pest: 'Top borer', control: 'Chlorantraniliprole; parasitoid Trichogramma chilonis' },
      { pest: 'Pyrilla (hopper)', control: 'Malathion dust; parasitoid Epiricania melanoleuca' },
      { pest: 'White grub', control: 'Chlorpyrifos soil treatment; pheromone traps' },
    ],
    cropRotation: ['Wheat', 'Potato', 'Mustard (ratoon)'],
    tips: [
      'Treat setts with carbendazim to prevent red rot',
      'Trench method planting improves root anchorage',
      'Intercrop with potato/garlic in early stages to maximize income',
      'Maintain 10 ratoon crops maximum; replant to avoid pest build-up',
    ],
  },

  'Onion': {
    icon: '🧅',
    season: { kharif: true, rabi: true, zaid: false },
    sowingMonths: 'Oct–Nov (Rabi); Jun–Jul (Kharif)',
    harvestMonths: '120–140 days from transplanting',
    soilType: 'Fertile loamy soil, pH 6.0–7.0',
    waterRequirement: 'Moderate (350–550 mm/season)',
    fertilizer: {
      basal: 'FYM 20 t/ha, N:P:K = 100:50:50 kg/ha',
      topDress: 'N top dress at 30 and 60 DAT',
    },
    spacing: '15 cm × 10 cm',
    irrigation: 'Stop irrigation 10–15 days before harvest for proper curing',
    pestManagement: [
      { pest: 'Thrips', control: 'Spinosad 45% SC @ 1 ml/L; reflective mulch; blue sticky traps' },
      { pest: 'Stemphylium blight', control: 'Mancozeb + carbendazim; avoid excess nitrogen' },
      { pest: 'Purple blotch', control: 'Iprodione 50% WP @ 1.5 g/L' },
    ],
    cropRotation: ['Tomato', 'Rice', 'Maize (Corn)'],
    tips: [
      'Raise nursery in raised beds; transplant 6-week-old seedlings',
      'Avoid excessive nitrogen — causes poor storage quality',
      'Cure bulbs in shade for 7–10 days before storage',
      'Avoid mechanical damage at harvest to prevent storage rot',
    ],
  },

  'Chilli': {
    icon: '🌶️',
    season: { kharif: true, rabi: true, zaid: false },
    sowingMonths: 'Jun–Jul (Kharif), Sep–Oct (Rabi)',
    harvestMonths: '90–150 days from transplanting',
    soilType: 'Well-drained sandy loam to clay loam, pH 6.0–7.0',
    waterRequirement: 'Moderate (600–1250 mm/season)',
    fertilizer: {
      basal: 'FYM 25 t/ha, N:P:K = 100:50:50 kg/ha',
      topDress: 'N + K at flowering and fruiting stages',
    },
    spacing: '60 cm × 45 cm',
    irrigation: 'Drip preferred; critical at flowering and fruiting',
    pestManagement: [
      { pest: 'Thrips', control: 'Spinosad; blue sticky traps; reflective mulch' },
      { pest: 'Mites', control: 'Abamectin 1.8% EC @ 0.5 ml/L; wettable sulfur' },
      { pest: 'Fruit borer', control: 'Emamectin benzoate 5% SG @ 0.4 g/L; pheromone traps' },
    ],
    cropRotation: ['Rice', 'Groundnut', 'Maize (Corn)'],
    tips: [
      'Chilli wilt (Phytophthora) — avoid waterlogging; use raised beds',
      'Calcium deficiency causes blossom-end rot — maintain consistent irrigation',
      'Hot water seed treatment (50°C for 25 min) reduces seed-borne diseases',
      'Harvest when 50% of fruits have turned red for maximum capsaicin',
    ],
  },

  'Groundnut': {
    icon: '🥜',
    season: { kharif: true, rabi: false, zaid: true },
    sowingMonths: 'Jun–Jul (Kharif), Jan–Feb (Zaid)',
    harvestMonths: '90–130 days depending on type',
    soilType: 'Well-drained sandy loam, pH 6.0–6.5',
    waterRequirement: 'Moderate (400–600 mm/season)',
    fertilizer: {
      basal: 'N:P:K:S = 20:40:20:20 kg/ha; gypsum at pegging',
      topDress: 'Rhizobium inoculation; gypsum 400 kg/ha at pegging',
    },
    spacing: '30 cm × 15 cm',
    irrigation: 'Critical at pegging and pod filling stages',
    pestManagement: [
      { pest: 'Leaf miner', control: 'Spinosad; neem-based formulations' },
      { pest: 'Thrips', control: 'Imidacloprid seed treatment; dimethoate spray' },
      { pest: 'White grub', control: 'Chlorpyrifos soil treatment at planting' },
    ],
    cropRotation: ['Wheat', 'Maize (Corn)', 'Sorghum'],
    tips: [
      'Apply gypsum at pegging (800 kg/ha) — critical for pod fill',
      'Aflatoxin management: harvest on time, dry to <8% moisture',
      'Inoculate with Rhizobium for 25–30 kg N/ha fixation',
      'Do not remove haulms at harvest — peg count determines yield',
    ],
  },

  'Mustard': {
    icon: '🌻',
    season: { kharif: false, rabi: true, zaid: false },
    sowingMonths: 'Sep–Nov',
    harvestMonths: '90–115 days',
    soilType: 'Well-drained loamy to sandy loam, pH 6.0–7.5',
    waterRequirement: 'Low (250–400 mm/season)',
    fertilizer: {
      basal: 'N:P:K:S = 80:40:40:30 kg/ha; sulfur critical',
      topDress: 'N top dress at first irrigation',
    },
    spacing: '30 cm × 10 cm',
    irrigation: 'Critical at flower initiation and seed formation (2 irrigations)',
    pestManagement: [
      { pest: 'Aphid (mustard)', control: 'Dimethoate 30% EC @ 1 ml/L; imidacloprid; ladybird beetles' },
      { pest: 'Painted bug', control: 'Quinalphos 25% EC; crop rotation' },
      { pest: 'Powdery mildew', control: 'Wettable sulfur 80% WP @ 2 g/L' },
    ],
    cropRotation: ['Wheat', 'Rice', 'Maize (Corn)'],
    tips: [
      'Sulfur deficiency is common — apply 30 kg/ha as gypsum or SSP',
      'Boron application (0.5 kg/ha) prevents flower sterility',
      'Harvest when 75% siliquae turn yellow-brown',
      'Mustard fixes less N but improves soil structure; excellent break crop',
    ],
  },

  'Brinjal (Eggplant)': {
    icon: '🍆',
    season: { kharif: true, rabi: true, zaid: false },
    sowingMonths: 'Jun–Jul, Sep–Oct, Jan–Feb',
    harvestMonths: '150–200 days (continuous harvesting)',
    soilType: 'Well-drained loamy to sandy loam, pH 5.5–6.8',
    waterRequirement: 'Moderate (700–1250 mm/season)',
    fertilizer: {
      basal: 'FYM 25 t/ha, N:P:K = 150:100:100 kg/ha',
      topDress: 'N in 3 splits: 30, 60, 90 DAT',
    },
    spacing: '75 cm × 60 cm',
    irrigation: 'Every 5–7 days; drip irrigation preferred',
    pestManagement: [
      { pest: 'Shoot and fruit borer', control: 'Spinosad; Bt spray; pheromone traps; remove infested shoots' },
      { pest: 'Whitefly', control: 'Yellow sticky traps; imidacloprid 17.8% SL' },
      { pest: 'Aphid', control: 'Neem oil 3%; thiamethoxam 25% WG' },
    ],
    cropRotation: ['Maize (Corn)', 'Wheat', 'Onion'],
    tips: [
      'Brinjal shoot and fruit borer is most destructive — pheromone traps mandatory',
      'Do not grow brinjal after tomato, chilli, or potato (solanaceous crops)',
      'Grafting on wild brinjal rootstock provides wilt resistance',
      'Pick fruits before they become over-mature to maintain yield',
    ],
  },

  'Okra': {
    icon: '🌿',
    season: { kharif: true, rabi: false, zaid: true },
    sowingMonths: 'Feb–Mar (Zaid), Jun–Jul (Kharif)',
    harvestMonths: '50–60 days; continuous harvesting',
    soilType: 'Well-drained loamy soil, pH 6.0–6.8',
    waterRequirement: 'Moderate (600–1000 mm/season)',
    fertilizer: {
      basal: 'FYM 15 t/ha, N:P:K = 100:50:50 kg/ha',
      topDress: 'N at 25 and 45 DAS',
    },
    spacing: '45 cm × 30 cm',
    irrigation: 'Every 5–7 days; critical at flowering',
    pestManagement: [
      { pest: 'Yellow vein mosaic virus (whitefly)', control: 'Resistant varieties; imidacloprid; reflective mulch' },
      { pest: 'Jassid (leaf hopper)', control: 'Dimethoate 30% EC @ 1 ml/L' },
      { pest: 'Shoot and fruit borer', control: 'Spinosad; pheromone traps' },
    ],
    cropRotation: ['Wheat', 'Maize (Corn)', 'Legumes'],
    tips: [
      'YVMV (Yellow Vein Mosaic Virus) is the biggest threat — plant resistant varieties',
      'Harvest every 2–3 days; over-mature pods are fibrous and unmarketable',
      'Seed treatment with imidacloprid reduces early whitefly infestation',
      'Direct sow; transplanting reduces stand establishment',
    ],
  },

  'Cabbage': {
    icon: '🥬',
    season: { kharif: false, rabi: true, zaid: false },
    sowingMonths: 'Aug–Sep (nursery), Oct–Nov (transplanting)',
    harvestMonths: '90–120 days from transplanting',
    soilType: 'Rich loamy soil, pH 6.0–7.5',
    waterRequirement: 'Moderate (380–500 mm/season)',
    fertilizer: {
      basal: 'FYM 25 t/ha, N:P:K = 150:75:75 kg/ha',
      topDress: 'N at head initiation; boron 0.5 kg/ha foliar',
    },
    spacing: '60 cm × 45 cm',
    irrigation: 'Every 7–10 days; critical at head development',
    pestManagement: [
      { pest: 'Diamond-back moth', control: 'Spinosad 45% SC; Bt spray; pheromone traps' },
      { pest: 'Cabbage butterfly', control: 'Manual removal; Bt Kurstaki; HNPV' },
      { pest: 'Black rot (Xanthomonas)', control: 'Copper-based bactericide; use disease-free seeds' },
    ],
    cropRotation: ['Tomato', 'Onion', 'Legumes'],
    tips: [
      'Diamond-back moth has developed resistance to many insecticides — rotate chemicals',
      'Boron deficiency causes hollow stem — apply borax @ 10 kg/ha',
      'Harvesting at proper head firmness prevents splitting',
      'Avoid planting after other brassicas to break disease/pest cycles',
    ],
  },

  'Apple': {
    icon: '🍎',
    season: { kharif: false, rabi: false, zaid: false },
    sowingMonths: 'Feb–Mar (planting); perennial crop',
    harvestMonths: 'Aug–Oct (varies by altitude and variety)',
    soilType: 'Deep, well-drained loam, pH 5.5–6.5; high altitude (1500–2700 m)',
    waterRequirement: 'Moderate (1000–1250 mm/year)',
    fertilizer: {
      basal: 'FYM 50 kg/tree, N:P:K = 70:35:70 g/tree/year of age',
      topDress: 'N in 2 splits: pre-bloom, post-fruit set',
    },
    spacing: '5 m × 5 m (standard); 3 m × 1.5 m (high density)',
    irrigation: 'Micro-sprinkler or drip; critical at fruit set, sizing, and pre-harvest',
    pestManagement: [
      { pest: 'Coding moth', control: 'Spinosad; pheromone traps; kaolin clay' },
      { pest: 'Woolly apple aphid', control: 'Thiamethoxam; chlorpyrifos soil drench' },
      { pest: 'San Jose scale', control: 'Horticultural oil spray at dormancy' },
    ],
    cropRotation: ['Perennial; intercrop with leguminous cover crops'],
    tips: [
      'Chilling requirement (1000–1600 hours below 7°C) is critical for fruit set',
      'Thinning 30–40% of flowers improves fruit size and prevents biennial bearing',
      'Bagging individual fruits improves quality and reduces pesticide residue',
      'High-density planting (1000+ trees/ha) now preferred for commercial orchards',
    ],
  },

  'Mango': {
    icon: '🥭',
    season: { kharif: false, rabi: false, zaid: false },
    sowingMonths: 'Jul–Aug (planting); perennial crop',
    harvestMonths: 'Apr–Jul depending on region and variety',
    soilType: 'Deep, well-drained alluvial or loamy soil, pH 5.5–7.5',
    waterRequirement: 'Low–Moderate (750–2500 mm/year; drought-tolerant once established)',
    fertilizer: {
      basal: 'FYM 50 kg/tree; N:P:K = 1:0.5:1 kg/tree (mature tree)',
      topDress: 'Potassium before flowering improves fruit quality',
    },
    spacing: '10 m × 10 m (standard); 5 m × 5 m (high density)',
    irrigation: 'Critical at fruit set and grain filling; withhold pre-flowering to induce panicles',
    pestManagement: [
      { pest: 'Mango hopper', control: 'Imidacloprid 17.8% SL @ 0.25 ml/L; two sprays at panicle emergence' },
      { pest: 'Mango mealy bug', control: 'Tree banding with alkathene strip; chlorpyrifos soil spray' },
      { pest: 'Fruit fly', control: 'Methyl eugenol traps; protein bait spray; bagging' },
    ],
    cropRotation: ['Perennial; intercrops with ginger, turmeric, or vegetables in early years'],
    tips: [
      'Paclobutrazol (Cultar) soil drench promotes off-season flowering',
      'Pruning dead wood and crossing branches after harvest is essential',
      'Mango stone weevil is quarantine pest — do not move fruits with seeds',
      'Alternate bearing is the biggest economic challenge; manage with paclobutrazol',
    ],
  },

  'Banana': {
    icon: '🍌',
    season: { kharif: true, rabi: false, zaid: false },
    sowingMonths: 'Jun–Jul or Feb–Mar (tissue culture)',
    harvestMonths: '11–13 months from planting',
    soilType: 'Deep, fertile, well-drained loamy soil, pH 6.0–7.5',
    waterRequirement: 'High (1500–2500 mm/year)',
    fertilizer: {
      basal: 'FYM 20 kg/plant; N:P:K = 200:60:300 g/plant/year',
      topDress: 'N + K fortnightly splits via fertigation',
    },
    spacing: '1.8 m × 1.5 m (high density tissue culture)',
    irrigation: 'Drip with fertigation; 8–10 liters/plant/day',
    pestManagement: [
      { pest: 'Banana weevil borer', control: 'Chlorpyrifos corm injection; pheromone traps' },
      { pest: 'Nematodes', control: 'Carbofuran at planting; bioagents Trichoderma, Paecilomyces' },
      { pest: 'Thrips (fruit scarring)', control: 'Bunch bagging immediately after complete hand emergence' },
    ],
    cropRotation: ['Perennial; ratoon up to 3 crops then replant'],
    tips: [
      'Panama wilt (Fusarium) is devastating — use resistant tissue culture varieties',
      'Bunch cover bagging protects fruit from thrips and improves quality',
      'Decorticate (remove outer sheaths) to reduce weevil habitat',
      'Drip fertigation is the most efficient system for banana production',
    ],
  },
};

/** Soil types for reference */
export const SOIL_TYPES = {
  'Alluvial': { crops: ['Wheat', 'Rice', 'Sugarcane', 'Maize (Corn)'], description: 'Found in Indo-Gangetic plain; high fertility' },
  'Black (Regur)': { crops: ['Cotton', 'Soybean', 'Groundnut', 'Wheat'], description: 'Deccan plateau; high clay, water retention' },
  'Red Laterite': { crops: ['Groundnut', 'Rice', 'Maize (Corn)', 'Cotton'], description: 'Peninsular India; acidic, iron-rich' },
  'Sandy Loam': { crops: ['Potato', 'Groundnut', 'Mustard', 'Brinjal (Eggplant)'], description: 'Good drainage; warms up quickly' },
  'Hilly / Forest': { crops: ['Apple', 'Mango', 'Banana', 'Chilli'], description: 'High organic matter; variable pH' },
};

/** Season calendar */
export const SEASONS = {
  kharif:  { name: 'Kharif (Monsoon)', months: 'Jun – Oct', color: '#2d6a4f' },
  rabi:    { name: 'Rabi (Winter)',     months: 'Oct – Mar', color: '#1d6fb3' },
  zaid:    { name: 'Zaid (Summer)',     months: 'Mar – Jun', color: '#e07a00' },
};
