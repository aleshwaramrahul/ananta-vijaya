const fs = require('fs');

const origHtml = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

// The original JS soapData:
const soapDataJs = `
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

console.log('Ready to assemble exact components.');
