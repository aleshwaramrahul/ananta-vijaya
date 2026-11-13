import bilvamImg from '../assets/images/3d/bilvam.png';
import kadambaImg from '../assets/images/3d/kadamba.png';
import kamalamImg from '../assets/images/3d/kamalam.png';
import rudrakshaImg from '../assets/images/3d/rudraksha.png';
import vibhudiImg from '../assets/images/3d/vibhudi.png';
import singleStonePedestalImg from '../assets/images/single_stone_pedestal.png';
import templeArchImg from '../assets/images/temple_arch.png';
import logoImg from '../assets/images/logo.png';
import lotusMandalaImg from '../assets/images/lotus_mandala.png';
import bilvamLeavesImg from '../assets/images/bilvam_leaves.png';
import hangingBellsImg from '../assets/images/hanging_bells.png';
import brassDiyaImg from '../assets/images/brass_diya.png';
import powderBowlImg from '../assets/images/powder_bowl.png';
import jasmineFlowersImg from '../assets/images/jasmine_flowers.png';
import pinkLotusImg from '../assets/images/pink_lotus.png';
import rudrakshaMalaImg from '../assets/images/rudraksha_mala.png';
import sanctuaryRitualImg from '../assets/images/sanctuary_ritual.png';

// 3D Packaging Textures
import kamalamFront from '../assets/textures/kamalam/front.jpg';
import kamalamBack from '../assets/textures/kamalam/back.jpg';
import kamalamTop from '../assets/textures/kamalam/top.jpg';
import kamalamBottom from '../assets/textures/kamalam/bottom.jpg';
import kamalamLeft from '../assets/textures/kamalam/left.jpg';
import kamalamRight from '../assets/textures/kamalam/right.jpg';

import kadambaFront from '../assets/textures/kadamba/front.jpg';
import kadambaBack from '../assets/textures/kadamba/back.jpg';
import kadambaTop from '../assets/textures/kadamba/top.jpg';
import kadambaBottom from '../assets/textures/kadamba/bottom.jpg';
import kadambaLeft from '../assets/textures/kadamba/left.jpg';
import kadambaRight from '../assets/textures/kadamba/right.jpg';

import bilvamFront from '../assets/textures/bilvam/front.jpg';
import bilvamBack from '../assets/textures/bilvam/back.jpg';
import bilvamTop from '../assets/textures/bilvam/top.jpg';
import bilvamBottom from '../assets/textures/bilvam/bottom.jpg';
import bilvamLeft from '../assets/textures/bilvam/left.jpg';
import bilvamRight from '../assets/textures/bilvam/right.jpg';

import vibhudiFront from '../assets/textures/vibhudi/front.jpg';
import vibhudiBack from '../assets/textures/vibhudi/back.jpg';
import vibhudiTop from '../assets/textures/vibhudi/top.jpg';
import vibhudiBottom from '../assets/textures/vibhudi/bottom.jpg';
import vibhudiLeft from '../assets/textures/vibhudi/left.jpg';
import vibhudiRight from '../assets/textures/vibhudi/right.jpg';

import rudrakshaFront from '../assets/textures/rudraksha/front.jpg';
import rudrakshaBack from '../assets/textures/rudraksha/back.jpg';
import rudrakshaTop from '../assets/textures/rudraksha/top.jpg';
import rudrakshaBottom from '../assets/textures/rudraksha/bottom.jpg';
import rudrakshaLeft from '../assets/textures/rudraksha/left.jpg';
import rudrakshaRight from '../assets/textures/rudraksha/right.jpg';

export const SOAP_PRODUCTS = [
  {
    id: "vibhudi",
    slug: "vibhudi-soap",
    sku: "LG-SOAP-VIB-01",
    title: "Vibhudi Soap",
    subtitle: "Sacred Ash & Holy Tulsi",
    tagline: "Deep Pore Detox & Meditative Stillness",
    badge: "100g • Traditional Plant Extraction Bar",
    image: vibhudiImg,
    boxImage: vibhudiImg,
    textures3d: {
      front: vibhudiFront,
      back: vibhudiBack,
      top: vibhudiTop,
      bottom: vibhudiBottom,
      left: vibhudiLeft,
      right: vibhudiRight,
    },
    desc: "Sacred temple ash and Krishna Tulsi combined for gentle mineral detoxification, drawing out airborne impurities while enveloping your senses in profound meditative tranquility.",
    price: "₹150",
    rating: "5.0",
    reviewsCount: 184,
    benefits: [
      {
        icon: "spa",
        title: "Sacred Ash Purification",
        desc: "Authentic consecrated ash provides ultra-fine mineral micro-exfoliation."
      },
      {
        icon: "clean_hands",
        title: "Pore Detoxification",
        desc: "Clarifies congested pores and harmonizes excess sebum production."
      },
      {
        icon: "self_improvement",
        title: "Meditative Focus",
        desc: "Warm temple notes evoke tranquility and spiritual centering."
      }
    ],
    ingredients: [
      { name: "Consecrated Temple Ash", role: "Mineral Micro-Exfoliation", icon: "temple_hindu" },
      { name: "Krishna Tulsi Extract", role: "Anti-Pollution Purification", icon: "eco" },
      { name: "Activated Coconut Charcoal", role: "Draws Out Deep Toxins", icon: "dark_mode" },
      { name: "Cold-Pressed Sesame Oil", role: "Skin Barrier Balancing", icon: "water_drop" },
      { name: "Frankincense Resin Oil", role: "Cellular Renewal & Serenity", icon: "flare" },
      { name: "Myrrh & Clove Infusion", role: "Soothes Sensitive Skin", icon: "spa" }
    ]
  },,
  {
    id: "rudraksha",
    slug: "rudraksha-soap",
    sku: "LG-SOAP-RUD-05",
    title: "Rudraksha Soap",
    subtitle: "Sacred Bead & Himalayan Cedar",
    tagline: "Vital Prana & Sensory Shielding",
    badge: "100g • Traditional Plant Extraction Bar",
    image: rudrakshaImg,
    boxImage: rudrakshaImg,
    textures3d: {
      front: rudrakshaFront,
      back: rudrakshaBack,
      top: rudrakshaTop,
      bottom: rudrakshaBottom,
      left: rudrakshaLeft,
      right: rudrakshaRight,
    },
    desc: "Auspicious Rudraksha bead extract crafted to awaken vital energy, protect skin from environmental stress, and balance sensory harmony. Enriched with rare Himalayan cedarwood.",
    price: "₹150",
    rating: "4.9",
    reviewsCount: 112,
    benefits: [
      {
        icon: "spa",
        title: "Rudraksha Bead Infusion",
        desc: "Sacred seed cold extract revered for bio-energetic grounding."
      },
      {
        icon: "bolt",
        title: "Pranic Vitality",
        desc: "Revives tired skin with energizing botanical phytonutrients."
      },
      {
        icon: "shield",
        title: "Aura Harmonizing",
        desc: "Protective and shielding cleansing ritual passed down through monks."
      }
    ],
    ingredients: [
      { name: "Panchamukhi Rudraksha Extract", role: "Bio-Magnetic Vitality", icon: "all_inclusive" },
      { name: "Himalayan Deodar Cedar", role: "Skin Firming & Tone", icon: "forest" },
      { name: "Pure Jojoba Golden Oil", role: "Mimics Natural Sebum", icon: "water_drop" },
      { name: "Cold-Pressed Castor Oil", role: "Velvety Cushioning Lather", icon: "spa" },
      { name: "Ashwagandha Root Extract", role: "Adaptogenic Skin Defense", icon: "eco" },
      { name: "Black Pepper & Clove Leaf", role: "Micro-Circulation Warmth", icon: "local_fire_department" }
    ]
  },
  {
    id: "bilvam",
    slug: "bilvam-soap",
    sku: "LG-SOAP-BIL-02",
    title: "Bilvam Soap",
    subtitle: "Auspicious Bael Leaf & Vetiver",
    tagline: "Sacred Purification & Dermal Cooling",
    badge: "100g • Traditional Plant Extraction Bar",
    image: bilvamImg,
    boxImage: bilvamImg,
    textures3d: {
      front: bilvamFront,
      back: bilvamBack,
      top: bilvamTop,
      bottom: bilvamBottom,
      left: bilvamLeft,
      right: bilvamRight,
    },
    desc: "Auspicious Aegle marmelos (Bael) leaves providing deep dermal rejuvenation, antimicrobial protection, and cooling herbal prana. Prepared following classical Ayurvedic texts.",
    price: "₹150",
    rating: "4.9",
    reviewsCount: 156,
    benefits: [
      {
        icon: "spa",
        title: "100% Consecrated Botanicals",
        desc: "Wild bael leaves hand-collected and cold-infused in virgin coconut oil."
      },
      {
        icon: "clean_hands",
        title: "Purifying Botanical Clarity",
        desc: "Natural tannins protect against environmental stressors and purify skin."
      },
      {
        icon: "self_improvement",
        title: "Cooling Herbal Prana",
        desc: "Soothes skin inflammation, redness, and balances Pitta-Kapha."
      }
    ],
    ingredients: [
      { name: "Sacred Bilva Patra", role: "Antimicrobial & Rejuvenating", icon: "eco" },
      { name: "Cold-Pressed Neem Oil", role: "Clarifying & Detoxifying", icon: "spa" },
      { name: "Vetiver (Khus) Root", role: "Deep Earthy Cooling", icon: "grass" },
      { name: "Castor Seed Oil", role: "Rich Luxurious Lather", icon: "water_drop" },
      { name: "Tulsi (Holy Basil)", role: "Purifying & Shielding", icon: "local_florist" },
      { name: "Cedarwood Essential Oil", role: "Grounding Forest Note", icon: "forest" }
    ]
  },,
  {
    id: "kamalam",
    slug: "kamalam-soap",
    sku: "LG-SOAP-KAM-03",
    title: "Kamalam Soap",
    subtitle: "Sacred Lotus & Wild Rose",
    tagline: "Radiant Glow & Cellular Hydration",
    badge: "100g • Traditional Plant Extraction Bar",
    image: kamalamImg,
    boxImage: kamalamImg,
    textures3d: {
      front: kamalamFront,
      back: kamalamBack,
      top: kamalamTop,
      bottom: kamalamBottom,
      left: kamalamLeft,
      right: kamalamRight,
    },
    desc: "Sacred pink lotus and wild damask rose water infusion formulated for gentle illumination, deep dermal hydration, and restoring skin's natural glow. Harmonizes Pitta dosha.",
    price: "₹150",
    rating: "4.9",
    reviewsCount: 128,
    benefits: [
      {
        icon: "auto_awesome",
        title: "Radiant Complexion",
        desc: "Lotus flavonoids gently brighten and restore luminous skin clarity."
      },
      {
        icon: "water_drop",
        title: "Deep Long-Lasting Moisture",
        desc: "Cold-pressed coconut and almond oils prevent dryness all day."
      },
      {
        icon: "local_florist",
        title: "Soothing Natural Floral Aroma",
        desc: "Steam-distilled rose hydrosol calms senses and reduces skin heat."
      }
    ],
    ingredients: [
      { name: "Sacred Lotus Extract", role: "Antioxidant Brightening", icon: "local_florist" },
      { name: "Wild Damask Rose Water", role: "Gentle Toning & Calming", icon: "water_drop" },
      { name: "Virgin Cold-Pressed Coconut Oil", role: "Deep Lipid Nourishment", icon: "spa" },
      { name: "Pure Shea & Mango Butter", role: "Protective Barrier Repair", icon: "shield" },
      { name: "Kasturi Manjal (Wild Turmeric)", role: "Even Tone & Radiance", icon: "sunny" },
      { name: "Pure Sandalwood Essential Oil", role: "Soothes Irritation & Heat", icon: "eco" }
    ]
  },,
  {
    id: "kadamba",
    slug: "kadamba-soap",
    sku: "LG-SOAP-KAD-04",
    title: "Kadamba Soap",
    subtitle: "Golden Blossom & Wild Honey",
    tagline: "Deep Nourishment & Velvet Softness",
    badge: "100g • Traditional Plant Extraction Bar",
    image: kadambaImg,
    boxImage: kadambaImg,
    textures3d: {
      front: kadambaFront,
      back: kadambaBack,
      top: kadambaTop,
      bottom: kadambaBottom,
      left: kadambaLeft,
      right: kadambaRight,
    },
    desc: "Golden Kadamba blossoms with warm, intoxicating floral notes and deeply nourishing wild honey to restore elasticity, relieve parched skin, and impart velvety softness.",
    price: "₹150",
    rating: "4.8",
    reviewsCount: 94,
    benefits: [
      {
        icon: "spa",
        title: "Floral Nectar Extract",
        desc: "Hand-picked Kadamba petals infused into soothing virgin almond oil."
      },
      {
        icon: "water_drop",
        title: "Deep Hydration Barrier",
        desc: "Replenishes skin lipids with raw unrefined botanical butters."
      },
      {
        icon: "self_improvement",
        title: "Aromatic Serenity",
        desc: "Warm honeyed floral notes inspired by sacred Vrindavan groves."
      }
    ],
    ingredients: [
      { name: "Golden Kadamba Blossoms", role: "Skin Softening Nectar", icon: "local_florist" },
      { name: "Forest Wild Honey", role: "Natural Humectant Hydration", icon: "water_drop" },
      { name: "Sweet Almond Oil", role: "Vitamin E Nourishment", icon: "spa" },
      { name: "Virgin Sesame Oil", role: "Vedic Dermal Strengthening", icon: "eco" },
      { name: "Raw Kokum Butter", role: "Intense Moisture Seal", icon: "shield" },
      { name: "Vetiver (Khus) Extract", role: "Cooling Aromatic Calm", icon: "grass" }
    ]
  },
];

export const ASSETS = {
  logo: logoImg,
  lotusMandala: lotusMandalaImg,
  bilvamLeaves: bilvamLeavesImg,
  hangingBells: hangingBellsImg,
  stonePedestal: singleStonePedestalImg,
  templeArch: templeArchImg,
  brassDiya: brassDiyaImg,
  powderBowl: powderBowlImg,
  jasmineFlowers: jasmineFlowersImg,
  pinkLotus: pinkLotusImg,
  rudrakshaMala: rudrakshaMalaImg,
  sanctuaryRitual: sanctuaryRitualImg,
  // 5 Hero soap boxes:
  vibhudiBox: vibhudiImg,
  kadambaBox: kadambaImg,
  bilvamBox: bilvamImg,
  kamalamBox: kamalamImg,
  rudrakshaBox: rudrakshaImg
};

export const FAQ_ITEMS = [
  {
    category: "About Soaps",
    question: "Are your soaps suitable for all skin types, including sensitive skin?",
    answer: "Yes, absolutely. Our soaps are formulated with pure cold-pressed oils, unrefined plant butters, and gentle botanical extracts. They contain zero synthetic fragrances, parabens, or harsh detergents like SLS, making them exceptionally mild and soothing even for delicate and easily irritated skin."
  },
  {
    category: "About Soaps",
    question: "What makes traditional plant-extracted soaps different from commercial bars?",
    answer: "Commercial factory soaps often remove natural glycerin to sell separately in expensive creams and substitute it with synthetic surfactants. In contrast, our artisanal soaps undergo a slow plant extraction and curing method that naturally retains 100% of the precious plant glycerin, providing superior hydration and conditioning."
  },
  {
    category: "About Soaps",
    question: "How long does a single 100g bar typically last?",
    answer: "With daily bathing by an individual, one 100g bar generally lasts between 3 to 4 weeks. Because our bars are rich in natural glycerin and cold-pressed oils, we recommend keeping your bar in a well-draining wooden soap dish away from standing water between uses to maximize its longevity."
  },
  {
    category: "About Soaps",
    question: "Do you use any artificial foaming agents, SLS, or synthetic perfumes?",
    answer: "Never. Every lather you experience comes purely from saponified organic coconut oil, castor oil, and sesame oil. Our rich, calming aromas are derived 100% from steam-distilled pure essential oils, floral waters, and wildcrafted herbs."
  },
  {
    category: "Skin Care",
    question: "Are Ananta Vijaya soaps 100% vegan and cruelty-free?",
    answer: "Yes, our entire range is 100% plant-based and cruelty-free. We never use animal fats (tallow/lard) or conduct animal testing. We harvest all botanicals ethically and sustainably."
  },
  {
    category: "Skin Care",
    question: "Can children and the elderly use these soaps safely?",
    answer: "Yes, the gentle pH-balanced formulation and nourishing oils make our soaps safe and comforting for family members of all ages, including infants above 6 months and elders with thinning, dry skin."
  },
  {
    category: "Orders & Shipping",
    question: "What is the shelf life of each handcrafted bar?",
    answer: "Due to our traditional curing process and natural antioxidant-rich oils, our soaps have a shelf life of 24 months from the date of manufacture when stored in a cool, dry place away from direct sunlight."
  },
  {
    category: "Orders & Shipping",
    question: "How long does delivery take and do you offer Cash on Delivery (COD)?",
    answer: "Orders are dispatched within 24 hours from our apothecary. Express delivery takes 2 to 4 business days across India. We offer both secure online prepaid payment and Cash on Delivery (COD) options."
  },
  {
    category: "Orders & Shipping",
    question: "Do you provide bulk festive gifting or customized hampers?",
    answer: "Yes! We specialize in custom corporate, wedding, and festive gift boxes with personalized wooden cases and gift notes. Please tap the WhatsApp button or email care@anantavijaya.com for bulk orders."
  }
];

export const COMING_SOON_PRODUCTS = [
  {
    title: "Bath Crystals & Ubtan",
    tagline: "Himalayan Pink Rock Salt & Herb Polish",
    desc: "Hand-pounded Ayurvedic body polish with pink mineral salt, wild turmeric, and sandalwood.",
    icon: "spa"
  },
  {
    title: "Sacred Hair Elixir",
    tagline: "Cold-Pressed Root Oil Infusion",
    desc: "Traditional Bhringraj, amla, and hibiscus root infusion for deep nourishment and luster.",
    icon: "water_drop"
  },
  {
    title: "Herbal Face Mist",
    tagline: "Steam-Distilled Kannauj Rose Hydrosol",
    desc: "Pure rose and holy basil water mist providing instant cellular hydration and pH balance.",
    icon: "local_florist"
  },
  {
    title: "Whipped Body Butter",
    tagline: "Pure Kokum & Mango Butter Velour",
    desc: "Decadently whipped unrefined tree butters with sweet almond oil for lasting suppleness.",
    icon: "auto_awesome"
  },
  {
    title: "Temple Dhoop & Incense",
    tagline: "Charcoal-Free Consecrated Cones",
    desc: "Hand-rolled sacred dhoop crafted with dried temple puja flowers, natural guggul, and resins.",
    icon: "temple_hindu"
  }
];
