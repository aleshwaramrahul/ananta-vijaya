/**
 * Complete SEO Configuration and Schema Data for Ananta Vijaya – Lotica Glow
 * Brand: Lotica Glow
 * Company: Ananta Vijaya Private Limited
 * Location: Hyderabad, Telangana, India
 */

export const SITE_URL = "https://anantavijaya.com";

export const BUSINESS_INFO = {
  companyName: "Ananta Vijaya Private Limited",
  brandName: "Lotica Glow",
  tagline: "Traditional Inspired Soaps & Personal Care",
  email: "info@anantavijaya.com",
  phone: "+91 73867 59777",
  phoneFormatted: "+91 73867 59777",
  address: {
    streetAddress: "Plot No. 42, Jubilee Enclave, HITEC City",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
    countryName: "India"
  },
  geo: {
    latitude: 17.4483,
    longitude: 78.3915
  },
  supportHours: "9:00 AM – 7:00 PM IST (Monday – Saturday)",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ],
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB993sfXG98XREyGP3l0QhO-ic0V-KZI_WgZ5ASeUn17ZYjDY1LQznLiBxa31iajLzMHy-l6LQZbFyjgZPZPoZEyH16sZghNVanlWWtraxjG_usqzD9a36TW00dqeMbOVmO-_4HgHQ1hH0jRiSY6jMEsP-gDkSnslm7AH3RRvlxspeGFBnaVtvSyPJb3FrpvNZRz_Ezo_ykC4ksX7ZF6e5xKKpJDlOXxcqeBV5FWRmp8XVZiI6sVKpx_g",
  socialProfiles: [
    "https://www.instagram.com/loticaglow",
    "https://www.facebook.com/loticaglow",
    "https://wa.me/917386759777"
  ]
};

export const PAGE_SEO = {
  home: {
    path: "/",
    title: "Lotica Glow – Traditional Inspired Soaps & Personal Care",
    metaTitle: "Lotica Glow – Traditional Inspired Soaps & Personal Care",
    description: "Explore Lotica Glow by Ananta Vijaya. Discover five distinctive soap varieties inspired by Indian tradition and nature, with premium gifting options.",
    keywords: "Lotica Glow, Traditional Indian soaps, Premium soap collection, Personal care products India, Devotional soaps, Herbal soaps in India, Natural ingredient soaps, Bathing products Hyderabad",
    canonical: `${SITE_URL}/`,
    ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g",
    ogType: "website"
  },
  about: {
    path: "/about",
    title: "About Ananta Vijaya | Lotica Glow Personal Care",
    metaTitle: "About Ananta Vijaya | Lotica Glow Personal Care",
    description: "Discover Ananta Vijaya Private Limited and Lotica Glow, a growing personal-care brand inspired by Indian tradition and nature.",
    keywords: "Ananta Vijaya Private Limited, Lotica Glow brand, Indian personal care brand, Traditional personal care products, Personal care brand in Hyderabad, Authentic soaps India",
    canonical: `${SITE_URL}/about`,
    ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4y2UXs2WjtJREg88iKYqsnI2kLYpPymCOf7YfoE3xyxAfEWQHCaFzP5_1yaXT8ERFhZOBTcoM93cw12j9CW5sarwMGJLKIqGmLwNAGqj2bKLNHzTB5MYegjlwNXVjs5ofWxPfEatP-LYSS3c9UoZgOWrmZjq5abiKV20zijwi-EqSdxBRxJF7oEnw8QwIgElJg2PbOC0bcwAgrPcDhfuLMm0C6CxhYmDWVFv7iXi4",
    ogType: "article"
  },
  shop: {
    path: "/shop",
    title: "Shop Lotica Glow Soaps | Five Unique Soap Varieties",
    metaTitle: "Shop Lotica Glow Soaps | Five Unique Soap Varieties",
    description: "Explore Vibhudi, Bilvam, Kamalam, Kadamba and Rudraksha soaps from the Lotica Glow collection.",
    keywords: "Buy soaps online India, Premium soap collection, Traditional inspired soaps, Lotica Glow soaps, Herbal personal care products, Devotional soaps Hyderabad",
    canonical: `${SITE_URL}/shop`,
    ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g",
    ogType: "website"
  },
  "divine-collection": {
    path: "/divine-collection",
    title: "Premium Soap Gift Box | The Divine Collection – Lotica Glow",
    metaTitle: "Premium Soap Gift Box | The Divine Collection – Lotica Glow",
    description: "Discover The Divine Collection, a premium five-soap gift box for weddings, return gifts, corporate gifting and festivals.",
    keywords: "Premium soap gift box, Wedding return gifts, Corporate gifting soaps, Festival gift boxes, Five soap gift collection, Premium gifting India, Soap gift boxes in Hyderabad",
    canonical: `${SITE_URL}/divine-collection`,
    ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g",
    ogType: "product"
  },
  contact: {
    path: "/contact",
    title: "Contact Ananta Vijaya | Lotica Glow Hyderabad",
    metaTitle: "Contact Ananta Vijaya | Lotica Glow Hyderabad",
    description: "Contact Lotica Glow by Ananta Vijaya for product enquiries, orders, customer support and customised gifting.",
    keywords: "Contact Ananta Vijaya, Lotica Glow Hyderabad, Soap enquiries Hyderabad, Personal care brand Hyderabad, Corporate soap enquiries Telangana",
    canonical: `${SITE_URL}/contact`,
    ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB993sfXG98XREyGP3l0QhO-ic0V-KZI_WgZ5ASeUn17ZYjDY1LQznLiBxa31iajLzMHy-l6LQZbFyjgZPZPoZEyH16sZghNVanlWWtraxjG_usqzD9a36TW00dqeMbOVmO-_4HgHQ1hH0jRiSY6jMEsP-gDkSnslm7AH3RRvlxspeGFBnaVtvSyPJb3FrpvNZRz_Ezo_ykC4ksX7ZF6e5xKKpJDlOXxcqeBV5FWRmp8XVZiI6sVKpx_g",
    ogType: "website"
  },
  faqs: {
    path: "/faqs",
    title: "Frequently Asked Questions | Lotica Glow Traditional Soaps",
    metaTitle: "Frequently Asked Questions | Lotica Glow Traditional Soaps",
    description: "Find clear answers about Lotica Glow traditional soaps, cold-curing, ingredients, sensitive skin suitability, orders, shipping and custom gifting.",
    keywords: "Lotica Glow FAQs, soap questions India, traditional soap shelf life, sensitive skin soap questions, Hyderabad soap brand",
    canonical: `${SITE_URL}/faqs`,
    ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB993sfXG98XREyGP3l0QhO-ic0V-KZI_WgZ5ASeUn17ZYjDY1LQznLiBxa31iajLzMHy-l6LQZbFyjgZPZPoZEyH16sZghNVanlWWtraxjG_usqzD9a36TW00dqeMbOVmO-_4HgHQ1hH0jRiSY6jMEsP-gDkSnslm7AH3RRvlxspeGFBnaVtvSyPJb3FrpvNZRz_Ezo_ykC4ksX7ZF6e5xKKpJDlOXxcqeBV5FWRmp8XVZiI6sVKpx_g",
    ogType: "website"
  },
  ingredients: {
    path: "/ingredients",
    title: "Sacred Botanicals & Ingredients | Lotica Glow Soaps",
    metaTitle: "Sacred Botanicals & Ingredients | Lotica Glow Soaps",
    description: "Explore the verified botanicals behind Lotica Glow soaps: Pink Lotus, Bilva leaves, Kadamba blossoms, Krishna Tulsi, Sacred Ash and Rudraksha.",
    keywords: "Lotica Glow ingredients, sacred lotus extract, bilva patra soap, kadamba flower, krishna tulsi, rudraksha extract, botanical soaps",
    canonical: `${SITE_URL}/ingredients`,
    ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g",
    ogType: "website"
  }
};

export const PRODUCT_SEO = {
  "vibhudi-soap": {
    id: "vibhudi",
    slug: "vibhudi-soap",
    path: "/products/vibhudi-soap",
    sku: "LG-SOAP-VIB-01",
    title: "Vibhudi Soap – Sacred Temple Ash & Tulsi | Lotica Glow",
    metaTitle: "Vibhudi Soap – Sacred Temple Ash & Tulsi | Lotica Glow",
    description: "Experience deep pore clarification and meditative tranquility with Lotica Glow Vibhudi Soap, infused with consecrated temple ash and Krishna Tulsi.",
    keywords: "Vibhudi Soap, Vibhuti Soap, Vibhudi inspired soap, Traditional Vibhudi soap, Sacred ash soap, Krishna Tulsi soap, Lotica Glow",
    canonical: `${SITE_URL}/products/vibhudi-soap`,
    price: "150",
    currency: "INR",
    availability: "https://schema.org/InStock",
    rating: "5.0",
    reviewCount: 184,
    imageAlt: "Lotica Glow Vibhudi Soap product packaging",
    image: `${SITE_URL}/images/3d/vibhudi.png`
  },
  "bilvam-soap": {
    id: "bilvam",
    slug: "bilvam-soap",
    path: "/products/bilvam-soap",
    sku: "LG-SOAP-BIL-02",
    title: "Bilvam Soap – Auspicious Bael Leaf & Vetiver | Lotica Glow",
    metaTitle: "Bilvam Soap – Auspicious Bael Leaf & Vetiver | Lotica Glow",
    description: "Purify and cool your skin with Lotica Glow Bilvam Soap, formulated with auspicious Bilva (Bael) leaf extract and cooling vetiver roots.",
    keywords: "Bilvam Soap, Bilva Leaf Soap, Bilvam inspired soap, Traditional Bilvam soap, Bael leaf soap, Vetiver soap, Lotica Glow",
    canonical: `${SITE_URL}/products/bilvam-soap`,
    price: "150",
    currency: "INR",
    availability: "https://schema.org/InStock",
    rating: "4.9",
    reviewCount: 156,
    imageAlt: "Lotica Glow Bilvam Soap product packaging",
    image: `${SITE_URL}/images/3d/bilvam.png`
  },
  "kamalam-soap": {
    id: "kamalam",
    slug: "kamalam-soap",
    path: "/products/kamalam-soap",
    sku: "LG-SOAP-KAM-03",
    title: "Kamalam Soap – Sacred Lotus & Wild Rose | Lotica Glow",
    metaTitle: "Kamalam Soap – Sacred Lotus & Wild Rose | Lotica Glow",
    description: "Restore your skin's natural radiance and moisture with Lotica Glow Kamalam Soap, infused with sacred pink lotus flavonoids and wild damask rose water.",
    keywords: "Kamalam Soap, Lotus Inspired Soap, Kamalam personal care, Floral inspired soap, Wild rose soap, Lotus soap India, Lotica Glow",
    canonical: `${SITE_URL}/products/kamalam-soap`,
    price: "150",
    currency: "INR",
    availability: "https://schema.org/InStock",
    rating: "4.9",
    reviewCount: 128,
    imageAlt: "Lotica Glow Kamalam Soap product packaging",
    image: `${SITE_URL}/images/3d/kamalam.png`
  },
  "kadamba-soap": {
    id: "kadamba",
    slug: "kadamba-soap",
    path: "/products/kadamba-soap",
    sku: "LG-SOAP-KAD-04",
    title: "Kadamba Soap – Golden Blossom & Wild Honey | Lotica Glow",
    metaTitle: "Kadamba Soap – Golden Blossom & Wild Honey | Lotica Glow",
    description: "Nourish and soften dry skin with Lotica Glow Kadamba Soap, combining golden Kadamba blossoms, wild forest honey, and unrefined kokum butter.",
    keywords: "Kadamba Soap, Kadambam Soap, Kadamba inspired soap, Traditional Kadamba soap, Honey blossom soap, Kokum butter soap, Lotica Glow",
    canonical: `${SITE_URL}/products/kadamba-soap`,
    price: "150",
    currency: "INR",
    availability: "https://schema.org/InStock",
    rating: "4.8",
    reviewCount: 94,
    imageAlt: "Lotica Glow Kadamba Soap product packaging",
    image: `${SITE_URL}/images/3d/kadamba.png`
  },
  "rudraksha-soap": {
    id: "rudraksha",
    slug: "rudraksha-soap",
    path: "/products/rudraksha-soap",
    sku: "LG-SOAP-RUD-05",
    title: "Rudraksha Soap – Sacred Bead & Himalayan Cedar | Lotica Glow",
    metaTitle: "Rudraksha Soap – Sacred Bead & Himalayan Cedar | Lotica Glow",
    description: "Awaken vital prana and sensory harmony with Lotica Glow Rudraksha Soap, enriched with sacred Rudraksha extract and Himalayan cedarwood.",
    keywords: "Rudraksha Soap, Rudraksha inspired soap, Traditional Rudraksha soap, Premium devotional soap, Himalayan cedar soap, Lotica Glow",
    canonical: `${SITE_URL}/products/rudraksha-soap`,
    price: "150",
    currency: "INR",
    availability: "https://schema.org/InStock",
    rating: "4.9",
    reviewCount: 112,
    imageAlt: "Lotica Glow Rudraksha Soap product packaging",
    image: `${SITE_URL}/images/3d/rudraksha.png`
  },
  "divine-collection-gift-box": {
    id: "divine-collection",
    slug: "divine-collection",
    path: "/divine-collection",
    sku: "LG-GIFT-DIVINE-01",
    title: "The Divine Collection – Premium Five-Soap Gift Box | Lotica Glow",
    metaTitle: "The Divine Collection – Premium Five-Soap Gift Box | Lotica Glow",
    description: "Discover The Divine Collection, a premium five-soap gift box for weddings, return gifts, corporate gifting and festivals.",
    keywords: "Premium soap gift box, Wedding return gifts, Corporate gifting soaps, Festival gift boxes, Five soap gift collection, Premium gifting India, Soap gift boxes in Hyderabad",
    canonical: `${SITE_URL}/divine-collection`,
    price: "699",
    currency: "INR",
    availability: "https://schema.org/InStock",
    rating: "5.0",
    reviewCount: 64,
    imageAlt: "Lotica Glow Divine Collection premium five-soap gift box",
    image: `${SITE_URL}/images/3d/bilvam.png`
  }
};

/**
 * Generate Organization JSON-LD Schema
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": BUSINESS_INFO.companyName,
    "alternateName": BUSINESS_INFO.brandName,
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": BUSINESS_INFO.logo,
      "caption": "Ananta Vijaya - Lotica Glow Brand Logo"
    },
    "image": BUSINESS_INFO.logo,
    "description": "Ananta Vijaya Private Limited presents Lotica Glow, offering five distinctive soap varieties inspired by Indian tradition and nature.",
    "email": BUSINESS_INFO.email,
    "telephone": BUSINESS_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_INFO.address.streetAddress,
      "addressLocality": BUSINESS_INFO.address.addressLocality,
      "addressRegion": BUSINESS_INFO.address.addressRegion,
      "postalCode": BUSINESS_INFO.address.postalCode,
      "addressCountry": BUSINESS_INFO.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BUSINESS_INFO.geo.latitude,
      "longitude": BUSINESS_INFO.geo.longitude
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": BUSINESS_INFO.phone,
        "contactType": "customer service",
        "contactOption": "TollFree",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi", "te"]
      }
    ],
    "sameAs": BUSINESS_INFO.socialProfiles
  };
}

/**
 * Generate WebSite JSON-LD Schema
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": BUSINESS_INFO.brandName,
    "alternateName": `${BUSINESS_INFO.companyName} – ${BUSINESS_INFO.brandName}`,
    "publisher": {
      "@type": "Organization",
      "name": BUSINESS_INFO.companyName,
      "url": SITE_URL
    },
    "inLanguage": "en-IN",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/shop?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate Product JSON-LD Schema
 */
export function getProductSchema(productKey) {
  const p = PRODUCT_SEO[productKey];
  if (!p) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${p.canonical}#product`,
    "name": `Lotica Glow ${p.title.split('–')[0].trim()}`,
    "image": [p.image],
    "description": p.description,
    "sku": p.sku,
    "mpn": p.sku,
    "brand": {
      "@type": "Brand",
      "name": BUSINESS_INFO.brandName
    },
    "manufacturer": {
      "@type": "Organization",
      "name": BUSINESS_INFO.companyName
    },
    "offers": {
      "@type": "Offer",
      "url": p.canonical,
      "priceCurrency": p.currency,
      "price": p.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": p.availability,
      "seller": {
        "@type": "Organization",
        "name": BUSINESS_INFO.companyName
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": p.rating,
      "reviewCount": p.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

/**
 * Generate BreadcrumbList JSON-LD Schema
 */
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? (item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`) : undefined
    }))
  };
}

/**
 * Generate FAQPage JSON-LD Schema
 */
export function getFAQPageSchema(faqList) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
