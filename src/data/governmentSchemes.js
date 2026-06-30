/**
 * Government Agricultural Schemes Data
 * ─────────────────────────────────────────
 * Major Indian central/state government schemes for farmers.
 */

export const SCHEME_CATEGORIES = ['All', 'Income Support', 'Insurance', 'Credit', 'Market', 'Organic/Sustainability', 'Technology'];

export const GOVERNMENT_SCHEMES = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN',
    fullName: 'Pradhan Mantri Kisan Samman Nidhi',
    category: 'Income Support',
    icon: '💰',
    color: '#ff6b35',
    launchYear: 2019,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      'Provides income support of ₹6,000 per year to all land-holding farmer families across the country, paid in three equal installments of ₹2,000 every four months.',
    eligibility: [
      'All land-holding farmer families with cultivable land',
      'Land records must be updated with state/UT government',
      'Excludes: institutional land holders, constitutional post holders, serving/retired government employees (excluding Group D/MTS), income tax payers',
    ],
    benefits: [
      '₹2,000 per installment, 3 installments per year',
      'Total ₹6,000 per year directly to farmer\'s bank account',
      'No intermediaries — direct bank transfer (DBT)',
    ],
    documents: ['Aadhaar card', 'Bank account (linked to Aadhaar)', 'Land ownership documents (Khasra/Khatauni)'],
    applyUrl: 'https://pmkisan.gov.in',
    applyLabel: 'Apply on PM-KISAN Portal',
    helpline: '155261 / 011-23381092',
  },

  {
    id: 'pmfby',
    name: 'PMFBY',
    fullName: 'Pradhan Mantri Fasal Bima Yojana',
    category: 'Insurance',
    icon: '🛡️',
    color: '#4361ee',
    launchYear: 2016,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      'Comprehensive crop insurance scheme providing financial support to farmers suffering crop loss/damage due to unforeseen events like natural calamities, pests, and diseases.',
    eligibility: [
      'All farmers — loanee and non-loanee',
      'Sharecroppers and tenant farmers also eligible',
      'Crops notified by State Government must be grown',
    ],
    benefits: [
      'Premium: Only 2% of sum insured for Kharif crops, 1.5% for Rabi, 5% for annual commercial/horticultural crops',
      'Full actuarial premium paid by government',
      'Covers: yield losses, prevented sowing, post-harvest losses, localized calamities',
      'Smart/rapid claim settlement using technology',
    ],
    documents: ['Land records', 'Bank account details', 'Aadhaar card', 'Crop sowing certificate'],
    applyUrl: 'https://pmfby.gov.in',
    applyLabel: 'Apply on PMFBY Portal',
    helpline: '1800-180-1551',
  },

  {
    id: 'kcc',
    name: 'KCC',
    fullName: 'Kisan Credit Card',
    category: 'Credit',
    icon: '💳',
    color: '#06d6a0',
    launchYear: 1998,
    ministry: 'Ministry of Finance / NABARD',
    description:
      'Provides farmers with affordable credit for agricultural and allied activities including crop cultivation, post-harvest expenses, maintenance of farm assets, and allied activities.',
    eligibility: [
      'All farmers — individual/joint borrowers who are owner cultivators',
      'Tenant farmers, oral lessees, share croppers',
      'Farmers with SHGs or joint liability groups',
      'Allied/non-farm activities: fisheries and animal husbandry farmers',
    ],
    benefits: [
      'Revolving credit facility up to ₹3 lakh at 7% interest per annum',
      'Interest subvention of 2% — effective rate 5%/year for timely repayment',
      'Additional 3% incentive for prompt repayment — effective rate 4%',
      'Flexible repayment: linked to harvest season',
      'ATM/debit card for easy access; personal accident insurance included',
    ],
    documents: ['Land records/tenancy agreement', 'Aadhaar', 'Photo', 'Bank account'],
    applyUrl: 'https://www.nabard.org/content1.aspx?id=572&catid=8&mid=530',
    applyLabel: 'Learn More on NABARD',
    helpline: '1800-180-1961 (NABARD)',
  },

  {
    id: 'enam',
    name: 'eNAM',
    fullName: 'Electronic National Agriculture Market',
    category: 'Market',
    icon: '🏪',
    color: '#f77f00',
    launchYear: 2016,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      'Online trading platform for agricultural commodities that integrates existing APMC mandis and creates a unified national market to get better prices for farmers\' produce.',
    eligibility: [
      'Any farmer registered under an eNAM-integrated APMC mandi',
      'Traders and buyers registered on the platform',
      '1361+ mandis across 23 states/UTs integrated',
    ],
    benefits: [
      'Transparent auction process — farmers see real-time bids',
      'Better price discovery through competitive online bidding',
      'Reduced transportation cost — sell from nearby mandi with national buyers',
      'Electronic payment directly to farmer account within 24 hours',
      'Assaying (quality testing) done at mandi for standardization',
    ],
    documents: ['Registration at local APMC mandi', 'Aadhaar', 'Bank account'],
    applyUrl: 'https://enam.gov.in',
    applyLabel: 'Register on eNAM',
    helpline: '1800-270-0224',
  },

  {
    id: 'rkvy',
    name: 'RKVY-RAFTAAR',
    fullName: 'Rashtriya Krishi Vikas Yojana',
    category: 'Technology',
    icon: '🚀',
    color: '#7b2d8b',
    launchYear: 2007,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      'Flagship scheme to make agriculture more remunerative for farmers by incentivizing states to increase public investment in agriculture and allied sectors.',
    eligibility: [
      'State government schemes and district-level projects',
      'Farmer Producer Organizations (FPOs)',
      'Agri-startups (through RAFTAAR — Remunerative Approaches for Agriculture and Allied sector Rejuvenation)',
    ],
    benefits: [
      'Funding for irrigation, horticulture, fisheries, animal husbandry projects',
      'Agri-startups: up to ₹25 lakh seed funding + incubation support',
      'FPO strengthening and capacity building',
      'Farm mechanization and technology adoption',
    ],
    documents: ['Project proposal submitted through State Agriculture Dept.', 'Business plan (for startups)'],
    applyUrl: 'https://rkvy.nic.in',
    applyLabel: 'Visit RKVY Portal',
    helpline: '011-23070305',
  },

  {
    id: 'soil-health-card',
    name: 'Soil Health Card',
    fullName: 'Soil Health Card Scheme',
    category: 'Technology',
    icon: '🌱',
    color: '#558b2f',
    launchYear: 2015,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      'Provides every farmer with a Soil Health Card — a report card on the nutrient status of their soil along with recommendations for appropriate dosage of nutrients for improved productivity.',
    eligibility: [
      'All farmers across India',
      'Soil samples collected once every 2 years from each farm',
    ],
    benefits: [
      'Free soil testing (12 parameters: NPK, organic carbon, pH, EC, micro-nutrients)',
      'Customized fertilizer recommendations for each farm',
      'Helps reduce fertilizer cost by 8–10% through balanced nutrition',
      'Prevents soil degradation from over-fertilization',
    ],
    documents: ['Land ownership / tenancy details', 'Request at local Krishi Vigyan Kendra (KVK) or Agriculture Dept.'],
    applyUrl: 'https://soilhealth.dac.gov.in',
    applyLabel: 'Soil Health Portal',
    helpline: '1800-180-1551',
  },

  {
    id: 'pkvy',
    name: 'PKVY',
    fullName: 'Paramparagat Krishi Vikas Yojana',
    category: 'Organic/Sustainability',
    icon: '🌿',
    color: '#2d6a4f',
    launchYear: 2015,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      'Promotes organic farming through adoption of organic village cluster approach, certification, and marketing support. Focuses on cluster formation, certification, and market linkage.',
    eligibility: [
      'Farmer clusters of 50 farmers with 50 acres minimum',
      'Registered FPOs / Self Help Groups',
      'Farmers willing to convert to organic farming over 3 years',
    ],
    benefits: [
      '₹50,000/ha financial assistance over 3 years',
      'Cluster-based organic certification (PGS certification — free)',
      'Marketing support: organic fairs, e-commerce tie-ups',
      'Training on organic practices, composting, and biological pest control',
    ],
    documents: ['Cluster registration', 'Land records', 'Bank account'],
    applyUrl: 'https://pgsindia-ncof.gov.in',
    applyLabel: 'PKVY / PGS Portal',
    helpline: '011-23070305',
  },

  {
    id: 'micro-irrigation',
    name: 'PMKSY-MI',
    fullName: 'Pradhan Mantri Krishi Sinchayee Yojana (Micro Irrigation)',
    category: 'Technology',
    icon: '💧',
    color: '#0096c7',
    launchYear: 2015,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      '"More Crop Per Drop" — promotes adoption of drip and sprinkler irrigation systems to improve water use efficiency and reduce irrigation costs for farmers.',
    eligibility: [
      'All farmers — individual, cooperatives, FPOs, SHGs',
      'State-wise priority crop/area lists apply',
    ],
    benefits: [
      'Subsidy on drip/sprinkler systems: 55% for small/marginal farmers, 45% for others',
      'Some states provide additional 20–25% top-up subsidy',
      'Saves 40–50% water compared to flood irrigation',
      'Increases crop yield by 40–50%; reduces labour cost',
      'Fertigation support — apply fertilizers through drip system',
    ],
    documents: ['Land documents', 'Quotation from approved vendor', 'Bank account', 'Aadhaar'],
    applyUrl: 'https://pmksy.gov.in',
    applyLabel: 'PMKSY Portal',
    helpline: '1800-180-1551',
  },

  {
    id: 'agriculture-infrastructure-fund',
    name: 'AIF',
    fullName: 'Agriculture Infrastructure Fund',
    category: 'Credit',
    icon: '🏗️',
    color: '#6d4c41',
    launchYear: 2020,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      'Long-term debt financing facility for investment in agriculture infrastructure projects like cold storage, warehouses, processing units, and primary processing centres.',
    eligibility: [
      'Farmers, FPOs, PACS, marketing cooperatives',
      'SHGs, joint liability groups',
      'Agri-entrepreneurs, startups, agri-tech companies',
      'State agencies, local bodies (for public agriculture infrastructure)',
    ],
    benefits: [
      'Loans up to ₹2 crore at interest subvention of 3%/year',
      'Credit guarantee cover under CGTMSE for loans up to ₹2 crore',
      'Covers: cold storage, silos, grading/sorting/packing units, assaying labs, logistic parks',
      'Moratorium of 6 months to 2 years',
    ],
    documents: ['Project report', 'Land documents', 'Bank account', 'Business registration'],
    applyUrl: 'https://agriinfra.dac.gov.in',
    applyLabel: 'AIF Portal',
    helpline: '011-23070277',
  },

  {
    id: 'national-beekeeping-honey-mission',
    name: 'NBHM',
    fullName: 'National Beekeeping and Honey Mission',
    category: 'Income Support',
    icon: '🍯',
    color: '#f9a825',
    launchYear: 2020,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      'Supports holistic promotion and development of beekeeping and to attain the goal of "Sweet Revolution" by increasing honey production and its export.',
    eligibility: [
      'Individual beekeepers, farmers',
      'FPOs, cooperatives, SHGs',
      'Enterprises setting up honey processing plants',
    ],
    benefits: [
      'Subsidy on bee colonies, bee boxes, and equipment',
      '50% subsidy for individual beekeepers, 80% for SC/ST/Women',
      'Training at AICRP on Honeybees centres',
      'Market linkage with NAFED and state cooperatives',
      'Honey testing laboratories at district level',
    ],
    documents: ['Registration as beekeeper', 'Land/shed availability', 'Bank account'],
    applyUrl: 'https://midh.gov.in/NBHM/index.html',
    applyLabel: 'MIDH / NBHM Portal',
    helpline: '011-23070277',
  },

  {
    id: 'agri-market-infra-fund',
    name: 'AMIF',
    fullName: 'Agriculture Market Infrastructure Fund',
    category: 'Market',
    icon: '🏬',
    color: '#e63946',
    launchYear: 2018,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      'Provides low-interest loans to State/UT governments for strengthening and creating agriculture market infrastructure in GrAMs (Gramin Agricultural Markets) and APMCs.',
    eligibility: [
      'State and UT governments',
      'APMC boards and rural market committees',
    ],
    benefits: [
      '₹2,000 crore fund via NABARD',
      'Upgrade of 22,000 rural haats into GrAMs (Gramin Agricultural Markets)',
      'Basic infrastructure: platforms, storage, grading units, sanitation',
      'Online price display boards, weather display systems',
    ],
    documents: ['Administered through State Agriculture Departments'],
    applyUrl: 'https://www.nabard.org',
    applyLabel: 'NABARD Portal',
    helpline: '1800-22-7575',
  },

  {
    id: 'fisheries-aquaculture-infra',
    name: 'PMMSY',
    fullName: 'Pradhan Mantri Matsya Sampada Yojana',
    category: 'Income Support',
    icon: '🐟',
    color: '#0077b6',
    launchYear: 2020,
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying',
    description:
      'Flagship scheme for development of fisheries sector with a focus on enhancing fish production, productivity, quality, technology, post-harvest infrastructure, and modernization.',
    eligibility: [
      'Fishers, fish farmers, fish workers, fish vendors',
      'SHGs, FPOs, cooperatives',
      'Fish feed plants, processing units',
    ],
    benefits: [
      '₹20,050 crore investment over 5 years (2020–25)',
      '40–60% subsidy on pond construction, cage culture, biofloc',
      'Reefer vehicles, cold storage, processing units support',
      'Fishermen insurance scheme',
      'Kishan Credit Card for fishers',
    ],
    documents: ['Fishermen registration', 'Land/water body documents', 'Bank account', 'Aadhaar'],
    applyUrl: 'https://pmmsy.dof.gov.in',
    applyLabel: 'PMMSY Portal',
    helpline: '1800-425-1660',
  },
];
