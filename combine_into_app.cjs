const fs = require('fs');

const header = fs.readFileSync('d:/ASR/ananta vijaya 5/p_header.jsx', 'utf8');
const hero = fs.readFileSync('d:/ASR/ananta vijaya 5/p_hero.jsx', 'utf8');
const s3 = fs.readFileSync('d:/ASR/ananta vijaya 5/p_s3.jsx', 'utf8');
const s4 = fs.readFileSync('d:/ASR/ananta vijaya 5/p_s4.jsx', 'utf8');
const footer = fs.readFileSync('d:/ASR/ananta vijaya 5/p_footer.jsx', 'utf8');

const s2 = `
{/* SECTION 2: OUR SOAP COLLECTION (Luxury Interactive 3-Column Product Showcase) */}
<section className="w-full bg-[#FAF5EB] py-space-xl lg:py-28 relative overflow-hidden" id="collection">
{/* Ambient Background Ornamentation */}
<div className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full bg-[#E8D4B5]/40 blur-3xl pointer-events-none"></div>
<div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#C59A45]/10 blur-2xl pointer-events-none"></div>
<div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin relative z-10">
{/* Section Header */}
<div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 lg:mb-16">
<div className="inline-flex items-center gap-space-sm mb-space-xs px-4 py-1 rounded-full bg-[#E8D4B5]/60 border border-[#C59A45]/30">
<span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
<span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-[#C59A45] font-semibold">Sacred Botanical Showcase</span>
<span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
</div>
<h2 className="font-display-md text-3xl md:text-5xl text-[#173D32] tracking-tight mb-3">Crafted by Nature. Consecrated for Wellness.</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-xl">Explore each handcrafted Ayurvedic bar in high-fidelity formulation.</p>
</div>
{/* 3-Column Luxury Interactive Showcase Layout */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
{/* LEFT COLUMN (Product Information) */}
<div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 bg-surface/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-2xl lg:rounded-none border border-[#E8D4B5]/60 lg:border-none shadow-sm lg:shadow-none">
{/* Label & Badges */}
<div className="flex items-center gap-3 mb-2">
<span className="uppercase tracking-widest text-[#C59A45] font-semibold text-xs">Our Products</span>
<span className="h-3 w-[1px] bg-[#C59A45]/40"></span>
<span className="font-label-sm text-[11px] text-[#173D32]/80 bg-[#E8D4B5]/60 px-2.5 py-0.5 rounded-full font-medium" id="product-badge">{currentSoap.badge}</span>
</div>
{/* Main Dynamic Product Title */}
<h3 className="font-headline-lg font-display-md text-3xl md:text-4xl text-[#173D32] font-bold tracking-tight mb-3 transition-opacity duration-300" id="product-title" style={{ opacity: animating ? 0 : 1 }}>
{currentSoap.title}
</h3>
{/* Dynamic Botanical Description */}
<p className="font-body-md text-[15px] leading-relaxed text-[#414845] mb-6 transition-opacity duration-300 min-h-[72px]" id="product-desc" style={{ opacity: animating ? 0 : 1 }}>
{currentSoap.desc}
</p>
{/* 3 Key Benefits with Gold Icons */}
<div className="flex flex-col gap-3.5 mb-7 border-y border-[#E8D4B5] py-5">
<div className="flex items-start gap-3">
<div className="w-8 h-8 rounded-full bg-[#E8D4B5]/50 flex items-center justify-center shrink-0 mt-0.5 text-[#C59A45]">
<span className="material-symbols-outlined text-[19px]">spa</span>
</div>
<div>
<h4 className="text-sm font-semibold text-[#173D32]" id="benefit-1-title">{currentSoap.b1Title}</h4>
<p className="text-xs text-[#414845] leading-relaxed" id="benefit-1-desc">{currentSoap.b1Desc}</p>
</div>
</div>
<div className="flex items-start gap-3">
<div className="w-8 h-8 rounded-full bg-[#E8D4B5]/50 flex items-center justify-center shrink-0 mt-0.5 text-[#C59A45]">
<span className="material-symbols-outlined text-[19px]">clean_hands</span>
</div>
<div>
<h4 className="text-sm font-semibold text-[#173D32]" id="benefit-2-title">{currentSoap.b2Title}</h4>
<p className="text-xs text-[#414845] leading-relaxed" id="benefit-2-desc">{currentSoap.b2Desc}</p>
</div>
</div>
<div className="flex items-start gap-3">
<div className="w-8 h-8 rounded-full bg-[#E8D4B5]/50 flex items-center justify-center shrink-0 mt-0.5 text-[#C59A45]">
<span className="material-symbols-outlined text-[19px]">self_improvement</span>
</div>
<div>
<h4 className="text-sm font-semibold text-[#173D32]" id="benefit-3-title">{currentSoap.b3Title}</h4>
<p className="text-xs text-[#414845] leading-relaxed" id="benefit-3-desc">{currentSoap.b3Desc}</p>
</div>
</div>
</div>
{/* Price & Offer Note */}
<div className="mb-6">
<div className="flex items-baseline gap-2 mb-1">
<span className="text-2xl font-bold text-[#173D32] font-display-md" id="product-price">{currentSoap.price}</span>
<span className="text-sm text-[#414845]/70 font-normal">/ $18 USD</span>
</div>
<p className="text-xs text-[#7B5802] font-medium flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-[#C59A45]">redeem</span>
<span className="">Complimentary Ayurvedic Wooden Soap Dish on orders over ₹1200</span>
</p>
</div>
{/* Action Bar */}
<div className="flex items-center gap-3">
<button onClick={() => addToCart(currentSoap)} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C59A45] hover:bg-[#b08638] text-white font-label-md text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 group" type="button">
<span className="material-symbols-outlined text-[19px] transition-transform group-hover:scale-110">shopping_bag</span>
<span className="">Add to Cart</span>
</button>
<button aria-label="Add to Wishlist" onClick={() => toggleWishlist(currentSoap.title)} className="p-3.5 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] text-[#173D32] hover:text-[#C59A45] bg-surface transition-colors flex items-center justify-center shadow-sm" type="button">
<span className={\`material-symbols-outlined text-[20px] \${wishlist.includes(currentSoap.title) ? 'text-[#C59A45]' : ''}\`}>favorite</span>
</button>
</div>
</div>
{/* CENTRE COLUMN (Dominant Product Stage Presentation) */}
<div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 relative py-4">
{/* Circular Halo Stage with Pedestal */}
<div className="relative w-full max-w-[430px] aspect-[4/5] flex items-center justify-center">
{/* Outer Glowing Atmospheric Ring */}
<div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#E8D4B5]/70 via-[#F5E8D0] to-[#E8D4B5]/50 blur-xl opacity-90 pointer-events-none"></div>
{/* Concentric Sacred Mandala/Halos */}
<div className="absolute inset-8 rounded-full border border-[#C59A45]/30 pointer-events-none"></div>
<div className="absolute inset-14 rounded-full border border-[#C59A45]/20 border-dashed pointer-events-none"></div>
<div className="absolute inset-20 rounded-full bg-gradient-to-b from-[#FFF8F1] to-[#E8D4B5]/40 shadow-inner pointer-events-none"></div>
{/* Botanical Elements: Fresh Jasmine & Leaves Framing Left & Right */}
<div className="absolute -left-3 bottom-24 z-10 flex flex-col items-center pointer-events-none opacity-85">
<span className="material-symbols-outlined text-[#173D32] text-3xl drop-shadow-sm rotate-45">eco</span>
<span className="material-symbols-outlined text-[#FAF5EB] bg-[#C59A45] rounded-full p-1 text-sm shadow">local_florist</span>
</div>
<div className="absolute -right-2 bottom-28 z-10 flex flex-col items-center pointer-events-none opacity-85">
<span className="material-symbols-outlined text-[#173D32] text-2xl drop-shadow-sm -rotate-45">spa</span>
<span className="material-symbols-outlined text-[#C59A45] text-xl drop-shadow-sm">filter_vintage</span>
</div>
{/* Traditional Brass Diya Frame Accent (Right Floor) */}
<div className="absolute right-4 bottom-14 z-20 flex items-center gap-1 bg-[#173D32]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#ffdea6] shadow-md border border-[#C59A45]/40 pointer-events-none">
<span className="material-symbols-outlined text-[#fdcd73] text-[15px] animate-pulse">local_fire_department</span>
<span className="tracking-wider uppercase font-semibold">Devotional</span>
</div>
{/* Layered Natural Stone Pedestal Base */}
<div className="absolute bottom-10 inset-x-8 h-12 bg-gradient-to-b from-[#E8D4B5] to-[#cbb28d] rounded-[50%] shadow-[0_24px_30px_rgba(57,37,29,0.22)] z-10 border-t border-white/50"></div>
<div className="absolute bottom-6 inset-x-12 h-8 bg-gradient-to-b from-[#d9be95] to-[#bca076] rounded-[50%] shadow-[0_12px_20px_rgba(57,37,29,0.28)] z-10"></div>
<div className="absolute bottom-2 inset-x-16 h-4 bg-[#39251D]/25 blur-md rounded-full z-0"></div>
{/* Dominant Active Soap Packaging with Float Physics */}
<div className="relative z-20 w-full flex items-center justify-center px-6 pb-12">
<img alt={currentSoap.title} className="floating-product w-auto max-h-[360px] sm:max-h-[420px] object-contain drop-shadow-[0_28px_32px_rgba(23,61,50,0.32)] transition-all duration-500 transform hover:scale-105 cursor-pointer" id="main-product-img" src={currentSoap.image} style={{ opacity: animating ? 0 : 1 }} />
</div>
</div>
{/* Carousel Dot Indicator Pills */}
<div className="flex items-center gap-2 mt-2" id="carousel-dots">
{soapData.map((_, i) => (
  <button key={i} aria-label={\`Go to product \${i + 1}\`} className={i === activeSoapIndex ? "w-8 h-2 rounded-full bg-[#C59A45] transition-all duration-300" : "w-2 h-2 rounded-full bg-[#E8D4B5] hover:bg-[#C59A45]/60 transition-all duration-300"} onClick={() => selectSoap(i)} type="button"></button>
))}
</div>
</div>
{/* RIGHT COLUMN (Vertical Product Selector) */}
<div className="lg:col-span-3 flex flex-col order-3">
{/* Selector Header with Arrow Controls */}
<div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E8D4B5]">
<div>
<h4 className="font-headline-sm text-base text-[#173D32] font-semibold">Select Formulation</h4>
<span className="text-xs text-[#7B5802]/80">5 Sacred Varieties</span>
</div>
<div className="flex items-center gap-1.5">
<button aria-label="Previous product" className="w-8 h-8 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] hover:bg-[#E8D4B5]/40 flex items-center justify-center text-[#173D32] transition-colors" onClick={prevSoap} type="button">
<span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
</button>
<button aria-label="Next product" className="w-8 h-8 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] hover:bg-[#E8D4B5]/40 flex items-center justify-center text-[#173D32] transition-colors" onClick={nextSoap} type="button">
<span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
</button>
</div>
</div>
{/* Vertical 5-Item Card List */}
<div className="flex flex-col gap-2.5" id="product-card-list">
{soapData.map((soap, i) => {
  const isCurrent = (i === activeSoapIndex);
  return (
    <div key={i} className={isCurrent ? "product-item-card cursor-pointer p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-3 bg-[#173D32] border-[#C59A45] shadow-md ring-2 ring-[#C59A45]/30" : "product-item-card cursor-pointer p-2.5 rounded-xl border border-transparent hover:border-[#C59A45]/50 transition-all duration-300 flex items-center gap-3 bg-[#E8D4B5]/60 hover:bg-[#E8D4B5]"} onClick={() => selectSoap(i)}>
      <div className="w-12 h-14 bg-surface/10 rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden">
        <img alt={soap.title} className="h-full w-auto object-contain drop-shadow" src={soap.image} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h5 className={isCurrent ? "text-sm font-semibold truncate text-[#FAF5EB]" : "text-sm font-semibold truncate text-[#173D32]"}>{soap.title}</h5>
          <span className={isCurrent ? "text-[11px] font-medium text-[#fdcd73]" : "text-[11px] font-medium text-[#7B5802]"}>{soap.price}</span>
        </div>
        <p className={isCurrent ? "text-[11px] truncate text-[#81a899]" : "text-[11px] truncate text-[#414845]"}>
          {i === 0 ? "Aegle marmelos • Cooling" : i === 1 ? "Golden Blossom • Nourishing" : i === 2 ? "Sacred Lotus • Glow Luster" : i === 3 ? "Sacred Ash • Meditative Purity" : "Divine Seed • Vital Energy"}
        </p>
      </div>
      <span className={isCurrent ? "material-symbols-outlined text-[#fdcd73] text-[18px] shrink-0" : "material-symbols-outlined text-transparent text-[18px] shrink-0"}>check_circle</span>
    </div>
  );
})}
</div>
</div>
</div>
{/* Ingredient Verification Banner */}
<div className="mt-space-xl bg-[#FAF5EB] border border-[#E8D4B5] p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm rounded-xl">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-surface-container">
<span className="material-symbols-outlined text-[24px]">science</span>
</div>
<div>
<h4 className="font-headline-sm text-headline-sm text-primary">Conscious Botanical Craft</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Cold-pressed sesame, virgin coconut, and pure unadulterated botanical elixirs.</p>
</div>
</div>
<div className="flex items-center gap-space-lg">
<div className="text-center">
<span className="block font-headline-md text-headline-md text-primary">45</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Days Cured</span>
</div>
<div className="w-[1px] h-8 bg-outline-variant"></div>
<div className="text-center">
<span className="block font-headline-md text-headline-md text-primary">0%</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Chemicals</span>
</div>
<div className="w-[1px] h-8 bg-outline-variant"></div>
<div className="text-center">
<span className="block font-headline-md text-headline-md text-primary">100%</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Biodegradable</span>
</div>
</div>
</div>
</div>
</section>
`;

const soapDataCode = `
const soapData = [
  {
    title: "Bilvam Soap",
    badge: "125g • Traditional Cold-Cured Bar",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAU554dI6DTu-_JSnVEPaQZllKicTFDpG69oBa3ECk_TkP3FN9aYYTm9a2oB6NNoRQDjq9kvg-0Owwjlz4Rh-nMiPU4Tqw7I7NSaCMMbaqkK0WKENMBHT-YKW4X5hPsveUO7NjBXmUdvmzp_8EWaiXjuYeyY-BMwnrz_ihV1p-eYhco9k8S0adX3UVOHsXY0h0dQfOaxfzO3sS2ZnEpbUlvuzyTzRASh6cijcMFbyUI4sXZpS9u9xD6vw",
    desc: "Auspicious Aegle marmelos leaves providing deep dermal rejuvenation, sacred purification, and cooling herbal prana. Handcrafted according to classical Ayurvedic scripture.",
    price: "₹480",
    b1Title: "100% Natural",
    b1Desc: "Cold-pressed virgin botanical oils and hand-harvested wild herbs.",
    b2Title: "Chemical Free",
    b2Desc: "Zero synthetic fragrances, sulfates, parabens, or preservatives.",
    b3Title: "Devotional Care",
    b3Desc: "Consecrated Vedic formulation prepared with meditative mindfulness."
  },
  {
    title: "Kadamba Soap",
    badge: "125g • Traditional Cold-Cured Bar",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqe7MGLybZVX8Tc2rfuuoQ-GVoJpPhptUN8pA_Ls48gGspnONXY0jkuWmIy6tThW6hCTbyIr1hsWk4gupDnJ2tzzyJUEph8iqslHdnD-2IEE2DNQv8M-E-DqcpSZnghGWT50qf7lZt1ZXQE6QYIgf8D3YWzZNBANO1x7g3hefbLhbXF6FQAzP3-2o7EurcjngE5MDp7UPocRpF9gXm_qBQNVEdVOIbF1NsdGeCIPEqHuWOeVha2oBB_g",
    desc: "Golden Kadamba blossoms with warm, intoxicating floral notes and deep nourishing moisture. Infused with pure honey and botanical nectar to soothe dryness.",
    price: "₹480",
    b1Title: "Floral Nectar Extract",
    b1Desc: "Hand-picked Kadamba petals infused into soothing virgin almond oil.",
    b2Title: "Deep Hydration",
    b2Desc: "Restores the lipid barrier with long-lasting herbal nourishment.",
    b3Title: "Aromatic Serenity",
    b3Desc: "Subtle Vedic temple fragrance celebrating Krishna's sacred tree."
  },
  {
    title: "Kamalam Soap",
    badge: "125g • Traditional Cold-Cured Bar",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjYfFAD94Fk20i1tNy3KOGmJODETNjnw2GkUC_-Pikxnovs0JX91w-HHryjNULxDlaUIQJ1PQxz9dZlKFwlNgiyoA_mUI3SRf-_pfZkkdq4tt612_dOVpMUb3AP39Rff9K7j7YvyHNjeXdnUfSqonSYRBiKMOt6xl-IscuZ3ZAz4tD2ndLc_NkGHgPARG_PtkqHHzTLTBQAhARFAI7xjOSs-OuR3_-x2Wxs8IqZiL2C6lEkwl6djikvw",
    desc: "Sacred lotus extracts delivering gentle hydration, supple softness, and a luminous natural glow. Harmonizes Pitta dosha and reveals skin's natural radiant clarity.",
    price: "₹480",
    b1Title: "Sacred Lotus Petals",
    b1Desc: "Pink Nelumbo nucifera distillation rich in antioxidants.",
    b2Title: "Radiant Skin Tone",
    b2Desc: "Naturally illuminates complexion and balances excessive heat.",
    b3Title: "Sattvic Essence",
    b3Desc: "Promotes peaceful skin tranquility and silk-like soft touch."
  },
  {
    title: "Vibhudi Soap",
    badge: "125g • Traditional Cold-Cured Bar",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEoT2vSDjpo1lglg5ht_ASqmz5dSjZS70oK-HBisOlCvU-tMfCkVWtG5R2oPP9I3thwsf5MnBNabCxPG8oTh6qbI_IlS1E4lWclI5_4bYnbAkeQ6XEOoqHYQtWL61TzK1PX7VHPHjvrOgZi0mMdR7ebQ9dghwT_KqrlYH2RMy8M5raUtTP7IV10wvp5tXz_Qw8LsehLbuGf7Ze1oGPjPibUetsH11b9ulz-9T_z5itTXkI3gXmbzqEdg",
    desc: "Sacred ash purification infused with pure calming essence for a meditative, refreshing cleanse. Balances excess oils while enveloping senses in pure stillness.",
    price: "₹480",
    b1Title: "Sacred Ash Purification",
    b1Desc: "Authentic consecrated ash with gentle mineral micro-exfoliation.",
    b2Title: "Pore Detoxification",
    b2Desc: "Draws out airborne pollutants and balances cellular moisture.",
    b3Title: "Meditative Focus",
    b3Desc: "Earthy, grounding aroma engineered for inward contemplation."
  },
  {
    title: "Rudraksha Soap",
    badge: "125g • Traditional Cold-Cured Bar",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwyNXRNThpq5NgrEc3oRtzDZEJw7MNGJgrFadA1adbmbr5fkYOq8iebaeY3DlVjC1XdOyvIxsCSI6ZMNqzRwMfMNGxqPntV00cM7oCHLgQq1ILRkVKPRyMsJBqO3yVh1gt89ebDzw9K1FcSOU0PYV03TAobe28lcsPvQz42A8u26Q4OgJncJcn3cnQOa5XQfJZlMqkaBseurCxZ3TIjv-6Ne5FRyVnhRiNMraZERQnHD9oqOE_5fo-LA",
    desc: "Divine beads infusion crafted to energize skin, awaken vital prana, and balance sensory harmony. Enriched with rare Himalayan cedar and grounding roots.",
    price: "₹480",
    b1Title: "Rudraksha Infusion",
    b1Desc: "Sacred bead cold extract revered for bio-magnetic grounding.",
    b2Title: "Pranic Vitality",
    b2Desc: "Awakens tired skin with revitalizing botanical phytonutrients.",
    b3Title: "Aura Harmonizing",
    b3Desc: "Protective and shielding cleansing ritual passed down through monks."
  }
];
`;

const fullApp = [
  "import React, { useState } from 'react';",
  "import CartDrawer from './components/CartDrawer';",
  "import WishlistDrawer from './components/WishlistDrawer';",
  "",
  soapDataCode,
  "",
  "export default function App() {",
  "  const [activeSoapIndex, setActiveSoapIndex] = useState(0);",
  "  const [animating, setAnimating] = useState(false);",
  "  const [cart, setCart] = useState([]);",
  "  const [wishlist, setWishlist] = useState(['Bilvam Soap']);",
  "  const [cartOpen, setCartOpen] = useState(false);",
  "  const [wishlistOpen, setWishlistOpen] = useState(false);",
  "  const [toastMessage, setToastMessage] = useState('');",
  "",
  "  const currentSoap = soapData[activeSoapIndex];",
  "",
  "  const selectSoap = (index) => {",
  "    if (index === activeSoapIndex) return;",
  "    setAnimating(true);",
  "    setTimeout(() => {",
  "      setActiveSoapIndex(index);",
  "      setAnimating(false);",
  "    }, 180);",
  "    const el = document.getElementById('collection');",
  "    if (el) el.scrollIntoView({ behavior: 'smooth' });",
  "  };",
  "",
  "  const prevSoap = () => {",
  "    const newIdx = (activeSoapIndex - 1 + soapData.length) % soapData.length;",
  "    selectSoap(newIdx);",
  "  };",
  "",
  "  const nextSoap = () => {",
  "    const newIdx = (activeSoapIndex + 1) % soapData.length;",
  "    selectSoap(newIdx);",
  "  };",
  "",
  "  const showToast = (msg) => {",
  "    setToastMessage(msg);",
  "    setTimeout(() => setToastMessage(''), 3000);",
  "  };",
  "",
  "  const addToCart = (product) => {",
  "    setCart((prev) => {",
  "      const existing = prev.find((item) => item.title === product.title);",
  "      if (existing) {",
  "        return prev.map((item) =>",
  "          item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item",
  "        );",
  "      }",
  "      return [...prev, { id: product.title, title: product.title, price: product.price, image: product.image, quantity: 1 }];",
  "    });",
  "    showToast('Added ' + product.title + ' to Bag');",
  "  };",
  "",
  "  const toggleWishlist = (title) => {",
  "    setWishlist((prev) => {",
  "      if (prev.includes(title)) {",
  "        showToast('Removed from wishlist');",
  "        return prev.filter(t => t !== title);",
  "      }",
  "      showToast('Saved to wishlist');",
  "      return [...prev, title];",
  "    });",
  "  };",
  "",
  "  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);",
  "",
  "  return (",
  "    <div className=\"bg-surface font-body-md text-on-surface antialiased min-h-screen relative\">",
  "      {toastMessage && (",
  "        <div className=\"fixed bottom-6 right-6 z-50 bg-[#173D32] text-[#ffdea6] px-5 py-3 rounded-full shadow-2xl border border-[#C59A45]/50 flex items-center gap-2 animate-bounce\">",
  "          <span className=\"material-symbols-outlined text-[#fdcd73] text-[20px]\">check_circle</span>",
  "          <span className=\"text-xs font-semibold uppercase tracking-wider\">{toastMessage}</span>",
  "        </div>",
  "      )}",
  "",
  header,
  "",
  "      <main className=\"w-full pt-20 bg-surface\">",
  "        <div className=\"flex flex-col w-full\">",
  hero,
  s2,
  s3,
  s4,
  "        </div>",
  "      </main>",
  "",
  footer,
  "",
  "      <CartDrawer",
  "        isOpen={cartOpen}",
  "        onClose={() => setCartOpen(false)}",
  "        cartItems={cart}",
  "        onUpdateQuantity={(id, qty) => {",
  "          if (qty <= 0) {",
  "            setCart(prev => prev.filter(item => item.id !== id));",
  "          } else {",
  "            setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));",
  "          }",
  "        }}",
  "        onRemoveItem={(id) => setCart(prev => prev.filter(item => item.id !== id))}",
  "      />",
  "",
  "      <WishlistDrawer",
  "        isOpen={wishlistOpen}",
  "        onClose={() => setWishlistOpen(false)}",
  "        wishlistIds={wishlist}",
  "        onAddToCart={(item) => {",
  "          addToCart(item);",
  "          setWishlistOpen(false);",
  "          setCartOpen(true);",
  "        }}",
  "        onRemoveWishlist={toggleWishlist}",
  "      />",
  "    </div>",
  "  );",
  "}"
].join('\n');

fs.writeFileSync('d:/ASR/ananta vijaya 5/src/App.jsx', fullApp);
console.log('src/App.jsx successfully written!');
