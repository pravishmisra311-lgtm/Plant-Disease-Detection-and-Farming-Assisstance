/**
 * PlantVillage 15-Class Disease Label Map
 * ─────────────────────────────────────────
 * Classes are listed in ALPHABETICAL ORDER of folder name — this is exactly
 * how Keras `flow_from_directory` assigns class indices (0-based).
 *
 * Folder name → class index mapping (auto-sorted alphabetically):
 *   0  Pepper__bell___Bacterial_spot
 *   1  Pepper__bell___healthy
 *   2  Potato___Early_blight
 *   3  Potato___Late_blight
 *   4  Potato___healthy
 *   5  Tomato_Bacterial_spot
 *   6  Tomato_Early_blight
 *   7  Tomato_Late_blight
 *   8  Tomato_Leaf_Mold
 *   9  Tomato_Septoria_leaf_spot
 *  10  Tomato_Spider_mites_Two_spotted_spider_mite
 *  11  Tomato__Target_Spot
 *  12  Tomato__Tomato_YellowLeaf__Curl_Virus
 *  13  Tomato__Tomato_mosaic_virus
 *  14  Tomato_healthy
 *
 * NOTE: This file is auto-aligned with the trained model output.
 * After training, classLabels.json confirms the exact order.
 */
export const DISEASE_LABELS = [
  { label: 'Pepper — Bacterial Spot',           plant: 'Pepper',    disease: 'Bacterial Spot',                         isHealthy: false, folder: 'Pepper__bell___Bacterial_spot' },
  { label: 'Pepper — Healthy',                  plant: 'Pepper',    disease: 'Healthy',                                isHealthy: true,  folder: 'Pepper__bell___healthy' },
  { label: 'Potato — Early Blight',             plant: 'Potato',    disease: 'Early Blight',                           isHealthy: false, folder: 'Potato___Early_blight' },
  { label: 'Potato — Late Blight',              plant: 'Potato',    disease: 'Late Blight',                            isHealthy: false, folder: 'Potato___Late_blight' },
  { label: 'Potato — Healthy',                  plant: 'Potato',    disease: 'Healthy',                                isHealthy: true,  folder: 'Potato___healthy' },
  { label: 'Tomato — Bacterial Spot',           plant: 'Tomato',    disease: 'Bacterial Spot',                         isHealthy: false, folder: 'Tomato_Bacterial_spot' },
  { label: 'Tomato — Early Blight',             plant: 'Tomato',    disease: 'Early Blight',                           isHealthy: false, folder: 'Tomato_Early_blight' },
  { label: 'Tomato — Late Blight',              plant: 'Tomato',    disease: 'Late Blight',                            isHealthy: false, folder: 'Tomato_Late_blight' },
  { label: 'Tomato — Leaf Mold',                plant: 'Tomato',    disease: 'Leaf Mold',                              isHealthy: false, folder: 'Tomato_Leaf_Mold' },
  { label: 'Tomato — Septoria Leaf Spot',       plant: 'Tomato',    disease: 'Septoria Leaf Spot',                     isHealthy: false, folder: 'Tomato_Septoria_leaf_spot' },
  { label: 'Tomato — Spider Mites',             plant: 'Tomato',    disease: 'Spider Mites (Two-spotted Spider Mite)', isHealthy: false, folder: 'Tomato_Spider_mites_Two_spotted_spider_mite' },
  { label: 'Tomato — Target Spot',              plant: 'Tomato',    disease: 'Target Spot',                            isHealthy: false, folder: 'Tomato__Target_Spot' },
  { label: 'Tomato — Yellow Leaf Curl Virus',   plant: 'Tomato',    disease: 'Tomato Yellow Leaf Curl Virus',          isHealthy: false, folder: 'Tomato__Tomato_YellowLeaf__Curl_Virus' },
  { label: 'Tomato — Mosaic Virus',             plant: 'Tomato',    disease: 'Tomato Mosaic Virus',                    isHealthy: false, folder: 'Tomato__Tomato_mosaic_virus' },
  { label: 'Tomato — Healthy',                  plant: 'Tomato',    disease: 'Healthy',                                isHealthy: true,  folder: 'Tomato_healthy' },
];

/**
 * Disease treatment / management recommendations.
 * Keyed by disease name (matches DISEASE_LABELS[i].disease).
 */
export const DISEASE_TREATMENTS = {
  'Bacterial Spot': {
    severity: 'Moderate',
    description: 'Bacterial disease causing water-soaked spots on leaves and fruit, leading to defoliation and yield loss.',
    treatment: [
      'Apply copper-based bactericide (e.g., Kocide 3000) every 5–7 days',
      'Avoid overhead irrigation — water at the base',
      'Remove and destroy severely infected plant parts',
      'Do not work with plants when foliage is wet',
    ],
    prevention: 'Use disease-free certified transplants; practice crop rotation (3-year cycle); avoid overhead irrigation.',
  },
  'Early Blight': {
    severity: 'Moderate',
    description: 'Fungal disease (Alternaria solani) causing target-like brown spots on older leaves first, leading to defoliation.',
    treatment: [
      'Apply chlorothalonil or mancozeb fungicide every 7–10 days',
      'Remove infected lower leaves to prevent spread',
      'Mulch around plants to prevent soil splash',
      'Ensure proper plant spacing for airflow',
    ],
    prevention: 'Rotate crops with non-solanaceous plants; use disease-free seed; stake plants to improve air circulation.',
  },
  'Late Blight': {
    severity: 'Critical',
    description: 'Oomycete disease (Phytophthora infestans) — caused the Irish Potato Famine. Spreads rapidly in cool, wet conditions.',
    treatment: [
      'Apply copper-based fungicide or chlorothalonil IMMEDIATELY',
      'Remove and destroy ALL infected plant material',
      'Do NOT compost infected material — bag and dispose',
      'Improve field drainage urgently',
    ],
    prevention: 'Use certified disease-free seed potatoes/transplants; plant resistant varieties; monitor weather forecasts.',
  },
  'Leaf Mold': {
    severity: 'Low',
    description: 'Fungal disease (Passalora fulva) thriving in high humidity greenhouses, causing yellow spots on upper leaf surfaces.',
    treatment: [
      'Improve ventilation to reduce humidity below 85%',
      'Apply fungicides (chlorothalonil, mancozeb, or copper)',
      'Remove and destroy infected leaves',
      'Avoid excessive wetting of foliage',
    ],
    prevention: 'Use resistant varieties; maintain proper plant spacing; ventilate greenhouses properly.',
  },
  'Septoria Leaf Spot': {
    severity: 'Moderate',
    description: 'Fungal disease with small circular spots with dark borders and gray centers, starting on lower leaves.',
    treatment: [
      'Remove infected leaves and dispose of them',
      'Apply mancozeb, chlorothalonil, or copper fungicide',
      'Avoid wetting foliage when watering',
      'Mulch to prevent soil-borne spore splash',
    ],
    prevention: 'Crop rotation; use disease-free transplants; avoid working with wet plants.',
  },
  'Spider Mites (Two-spotted Spider Mite)': {
    severity: 'Moderate',
    description: 'Pest infestation causing stippling, bronzing, and fine webbing on leaf undersides, especially in hot dry conditions.',
    treatment: [
      'Apply miticides (abamectin, bifenazate, or spiromesifen)',
      'Introduce predatory mites (Phytoseiulus persimilis)',
      'Spray forcefully with water to dislodge mite colonies',
      'Apply neem oil or insecticidal soap as organic options',
    ],
    prevention: 'Avoid excessive nitrogen fertilization; monitor plants regularly; keep plants well-watered in hot weather.',
  },
  'Target Spot': {
    severity: 'Moderate',
    description: 'Fungal disease (Corynespora cassiicola) producing concentric ring patterns resembling a target on affected tissue.',
    treatment: [
      'Apply azoxystrobin or pyraclostrobin fungicide',
      'Improve air circulation by pruning',
      'Reduce leaf wetness duration',
      'Remove and destroy infected leaves',
    ],
    prevention: 'Crop rotation with non-solanaceous crops (3+ year cycle); avoid dense planting.',
  },
  'Tomato Yellow Leaf Curl Virus': {
    severity: 'Severe',
    description: 'Viral disease transmitted by silverleaf whiteflies. Causes severe stunting, leaf curl, and up to 100% yield loss.',
    treatment: [
      'No cure — remove and destroy infected plants immediately',
      'Control whitefly populations with imidacloprid or thiamethoxam',
      'Use yellow sticky traps to monitor and catch whiteflies',
      'Apply reflective silver mulch to repel whiteflies',
    ],
    prevention: 'Plant virus-resistant varieties (e.g., HY series); use insect-proof net houses; remove weed hosts.',
  },
  'Tomato Mosaic Virus': {
    severity: 'Moderate',
    description: 'Viral disease causing mosaic patterns, leaf distortion, and mottling. Spread by contact and aphid vectors.',
    treatment: [
      'Remove and destroy infected plants immediately',
      'Wash hands and disinfect tools with 10% bleach solution',
      'Control aphid vectors with insecticides or neem oil',
      'Avoid smoking near plants (tobacco mosaic related)',
    ],
    prevention: 'Use virus-free certified seed; plant resistant varieties; control insect vectors; sanitize equipment.',
  },
  'Healthy': {
    severity: 'None',
    description: 'Plant appears healthy with no visible signs of disease or pest damage.',
    treatment: ['No treatment needed — plant is healthy!'],
    prevention: 'Continue good agricultural practices: balanced nutrition, regular monitoring, proper irrigation, and integrated pest management.',
  },
};
