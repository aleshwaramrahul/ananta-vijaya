const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('[SEO Prerender] dist/index.html not found! Run "vite build" first.');
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

const SITE_URL = 'https://anantavijaya.com';

const ROUTES_DATA = [
  {
    path: '/',
    outputPath: path.join(DIST_DIR, 'index.html'),
    title: 'Lotica Glow – Traditional Inspired Soaps & Personal Care',
    description: 'Explore Lotica Glow by Ananta Vijaya. Discover five distinctive soap varieties inspired by Indian tradition and nature, with premium gifting options.',
    keywords: 'Lotica Glow, Traditional Indian soaps, Premium soap collection, Personal care products India, Devotional soaps, Herbal soaps in India, Natural ingredient soaps, Bathing products Hyderabad',
    canonical: `${SITE_URL}/`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g',
    ogType: 'website',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          "name": "Ananta Vijaya Private Limited",
          "alternateName": "Lotica Glow",
          "url": SITE_URL,
          "logo": "https://lh3.googleusercontent.com/aida-public/AB6AXuB993sfXG98XREyGP3l0QhO-ic0V-KZI_WgZ5ASeUn17ZYjDY1LQznLiBxa31iajLzMHy-l6LQZbFyjgZPZPoZEyH16sZghNVanlWWtraxjG_usqzD9a36TW00dqeMbOVmO-_4HgHQ1hH0jRiSY6jMEsP-gDkSnslm7AH3RRvlxspeGFBnaVtvSyPJb3FrpvNZRz_Ezo_ykC4ksX7ZF6e5xKKpJDlOXxcqeBV5FWRmp8XVZiI6sVKpx_g",
          "description": "Ananta Vijaya Private Limited presents Lotica Glow, offering five distinctive soap varieties inspired by Indian tradition and nature.",
          "email": "info@anantavijaya.com",
          "telephone": "+91 73867 59777",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Plot No. 42, Jubilee Enclave, HITEC City",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500081",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 17.4483,
            "longitude": 78.3915
          },
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+91 73867 59777",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["en", "hi", "te"]
            }
          ]
        },
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "url": SITE_URL,
          "name": "Lotica Glow",
          "alternateName": "Ananta Vijaya – Lotica Glow",
          "publisher": {
            "@type": "Organization",
            "name": "Ananta Vijaya Private Limited"
          },
          "inLanguage": "en-IN"
        }
      ]
    }
  },
  {
    path: '/about',
    outputPath: path.join(DIST_DIR, 'about', 'index.html'),
    title: 'About Ananta Vijaya | Lotica Glow Personal Care',
    description: 'Discover Ananta Vijaya Private Limited and Lotica Glow, a growing personal-care brand inspired by Indian tradition and nature.',
    keywords: 'Ananta Vijaya Private Limited, Lotica Glow brand, Indian personal care brand, Traditional personal care products, Personal care brand in Hyderabad, Authentic soaps India',
    canonical: `${SITE_URL}/about`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4y2UXs2WjtJREg88iKYqsnI2kLYpPymCOf7YfoE3xyxAfEWQHCaFzP5_1yaXT8ERFhZOBTcoM93cw12j9CW5sarwMGJLKIqGmLwNAGqj2bKLNHzTB5MYegjlwNXVjs5ofWxPfEatP-LYSS3c9UoZgOWrmZjq5abiKV20zijwi-EqSdxBRxJF7oEnw8QwIgElJg2PbOC0bcwAgrPcDhfuLMm0C6CxhYmDWVFv7iXi4',
    ogType: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": `${SITE_URL}/about` }
      ]
    }
  },
  {
    path: '/shop',
    outputPath: path.join(DIST_DIR, 'shop', 'index.html'),
    title: 'Shop Lotica Glow Soaps | Five Unique Soap Varieties',
    description: 'Explore Vibhudi, Bilvam, Kamalam, Kadamba and Rudraksha soaps from the Lotica Glow collection.',
    keywords: 'Buy soaps online India, Premium soap collection, Traditional inspired soaps, Lotica Glow soaps, Herbal personal care products, Devotional soaps Hyderabad',
    canonical: `${SITE_URL}/shop`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g',
    ogType: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Shop", "item": `${SITE_URL}/shop` }
      ]
    }
  },
  {
    path: '/divine-collection',
    outputPath: path.join(DIST_DIR, 'divine-collection', 'index.html'),
    title: 'Premium Soap Gift Box | The Divine Collection – Lotica Glow',
    description: 'Discover The Divine Collection, a premium five-soap gift box for weddings, return gifts, corporate gifting and festivals.',
    keywords: 'Premium soap gift box, Wedding return gifts, Corporate gifting soaps, Festival gift boxes, Five soap gift collection, Premium gifting India, Soap gift boxes in Hyderabad',
    canonical: `${SITE_URL}/divine-collection`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g',
    ogType: 'product',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${SITE_URL}/divine-collection#product`,
          "name": "The Divine Collection – Premium Five-Soap Gift Box",
          "image": ["https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g"],
          "description": "Discover The Divine Collection, a premium five-soap gift box for weddings, return gifts, corporate gifting and festivals.",
          "sku": "LG-GIFT-DIVINE-01",
          "brand": { "@type": "Brand", "name": "Lotica Glow" },
          "manufacturer": { "@type": "Organization", "name": "Ananta Vijaya Private Limited" },
          "offers": {
            "@type": "Offer",
            "url": `${SITE_URL}/divine-collection`,
            "priceCurrency": "INR",
            "price": "1199",
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": 64
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "The Divine Collection", "item": `${SITE_URL}/divine-collection` }
          ]
        }
      ]
    }
  },
  {
    path: '/products/vibhudi-soap',
    outputPath: path.join(DIST_DIR, 'products', 'vibhudi-soap', 'index.html'),
    title: 'Vibhudi Soap – Sacred Temple Ash & Tulsi | Lotica Glow',
    description: 'Experience deep pore clarification and meditative tranquility with Lotica Glow Vibhudi Soap, infused with consecrated temple ash and Krishna Tulsi.',
    keywords: 'Vibhudi Soap, Vibhuti Soap, Vibhudi inspired soap, Traditional Vibhudi soap, Sacred ash soap, Krishna Tulsi soap, Lotica Glow',
    canonical: `${SITE_URL}/products/vibhudi-soap`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSVS8HEVM89-MBcnmX0PVXNKk4HsautT7T3V2L8hupVEvVao6qZT2oooT_fX388TDpVkYanPyIl4ox9ABoy_dCV8u4_9jHMZ5bSL6jcAQ3IN5J2HoaogXecxigyJ1hSCwkXf62ph4-x-Wq-0p8xUTapBCr04vNy-uGL-ZOtIHWJgn3W4UmgqnoacbYApgzemNYmg1HlV8j0VM_ipzlOzqmtuyG0l3cyhiXiGL0jC3thp7bVmapHf21IA',
    ogType: 'product',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${SITE_URL}/products/vibhudi-soap#product`,
          "name": "Lotica Glow Vibhudi Soap",
          "image": ["https://lh3.googleusercontent.com/aida-public/AB6AXuDSVS8HEVM89-MBcnmX0PVXNKk4HsautT7T3V2L8hupVEvVao6qZT2oooT_fX388TDpVkYanPyIl4ox9ABoy_dCV8u4_9jHMZ5bSL6jcAQ3IN5J2HoaogXecxigyJ1hSCwkXf62ph4-x-Wq-0p8xUTapBCr04vNy-uGL-ZOtIHWJgn3W4UmgqnoacbYApgzemNYmg1HlV8j0VM_ipzlOzqmtuyG0l3cyhiXiGL0jC3thp7bVmapHf21IA"],
          "description": "Experience deep pore clarification and meditative tranquility with Lotica Glow Vibhudi Soap, infused with consecrated temple ash and Krishna Tulsi.",
          "sku": "LG-SOAP-VIB-01",
          "brand": { "@type": "Brand", "name": "Lotica Glow" },
          "manufacturer": { "@type": "Organization", "name": "Ananta Vijaya Private Limited" },
          "offers": {
            "@type": "Offer",
            "url": `${SITE_URL}/products/vibhudi-soap`,
            "priceCurrency": "INR",
            "price": "249",
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": 184
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Shop", "item": `${SITE_URL}/shop` },
            { "@type": "ListItem", "position": 3, "name": "Vibhudi Soap", "item": `${SITE_URL}/products/vibhudi-soap` }
          ]
        }
      ]
    }
  },
  {
    path: '/products/bilvam-soap',
    outputPath: path.join(DIST_DIR, 'products', 'bilvam-soap', 'index.html'),
    title: 'Bilvam Soap – Auspicious Bael Leaf & Vetiver | Lotica Glow',
    description: 'Purify and cool your skin with Lotica Glow Bilvam Soap, formulated with auspicious Bilva (Bael) leaf extract and cooling vetiver roots.',
    keywords: 'Bilvam Soap, Bilva Leaf Soap, Bilvam inspired soap, Traditional Bilvam soap, Bael leaf soap, Vetiver soap, Lotica Glow',
    canonical: `${SITE_URL}/products/bilvam-soap`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfolV1LLaXtImFD1RJED9kb67IiyTeUMFOLn7F0PdnKf7x4i0EZi0GcvIp2WyFRU345kGCkvaVs_U-riFWenoDGxLhE8_8DPAt-JfaoIfJahD9fp6SQdSenpZmDlD0fIBxIlt0kgEIJ-_oXOeQfRTWUts2l4aBKhDObZvb6dZ_aORjAhakYFQt0cgsvCjs_txWzdtrgKMc9P85WxpCpbaEZ3aV93mPj9z9PRs6lsbYhuJ5mdWDMnd5lQ',
    ogType: 'product',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${SITE_URL}/products/bilvam-soap#product`,
          "name": "Lotica Glow Bilvam Soap",
          "image": ["https://lh3.googleusercontent.com/aida-public/AB6AXuBfolV1LLaXtImFD1RJED9kb67IiyTeUMFOLn7F0PdnKf7x4i0EZi0GcvIp2WyFRU345kGCkvaVs_U-riFWenoDGxLhE8_8DPAt-JfaoIfJahD9fp6SQdSenpZmDlD0fIBxIlt0kgEIJ-_oXOeQfRTWUts2l4aBKhDObZvb6dZ_aORjAhakYFQt0cgsvCjs_txWzdtrgKMc9P85WxpCpbaEZ3aV93mPj9z9PRs6lsbYhuJ5mdWDMnd5lQ"],
          "description": "Purify and cool your skin with Lotica Glow Bilvam Soap, formulated with auspicious Bilva (Bael) leaf extract and cooling vetiver roots.",
          "sku": "LG-SOAP-BIL-02",
          "brand": { "@type": "Brand", "name": "Lotica Glow" },
          "manufacturer": { "@type": "Organization", "name": "Ananta Vijaya Private Limited" },
          "offers": {
            "@type": "Offer",
            "url": `${SITE_URL}/products/bilvam-soap`,
            "priceCurrency": "INR",
            "price": "249",
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": 156
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Shop", "item": `${SITE_URL}/shop` },
            { "@type": "ListItem", "position": 3, "name": "Bilvam Soap", "item": `${SITE_URL}/products/bilvam-soap` }
          ]
        }
      ]
    }
  },
  {
    path: '/products/kamalam-soap',
    outputPath: path.join(DIST_DIR, 'products', 'kamalam-soap', 'index.html'),
    title: 'Kamalam Soap – Sacred Lotus & Wild Rose | Lotica Glow',
    description: 'Restore your skin\'s natural radiance and moisture with Lotica Glow Kamalam Soap, infused with sacred pink lotus flavonoids and wild damask rose water.',
    keywords: 'Kamalam Soap, Lotus Inspired Soap, Kamalam personal care, Floral inspired soap, Wild rose soap, Lotus soap India, Lotica Glow',
    canonical: `${SITE_URL}/products/kamalam-soap`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g',
    ogType: 'product',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${SITE_URL}/products/kamalam-soap#product`,
          "name": "Lotica Glow Kamalam Soap",
          "image": ["https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g"],
          "description": "Restore your skin's natural radiance and moisture with Lotica Glow Kamalam Soap, infused with sacred pink lotus flavonoids and wild damask rose water.",
          "sku": "LG-SOAP-KAM-03",
          "brand": { "@type": "Brand", "name": "Lotica Glow" },
          "manufacturer": { "@type": "Organization", "name": "Ananta Vijaya Private Limited" },
          "offers": {
            "@type": "Offer",
            "url": `${SITE_URL}/products/kamalam-soap`,
            "priceCurrency": "INR",
            "price": "249",
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": 128
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Shop", "item": `${SITE_URL}/shop` },
            { "@type": "ListItem", "position": 3, "name": "Kamalam Soap", "item": `${SITE_URL}/products/kamalam-soap` }
          ]
        }
      ]
    }
  },
  {
    path: '/products/kadamba-soap',
    outputPath: path.join(DIST_DIR, 'products', 'kadamba-soap', 'index.html'),
    title: 'Kadamba Soap – Golden Blossom & Wild Honey | Lotica Glow',
    description: 'Nourish and soften dry skin with Lotica Glow Kadamba Soap, combining golden Kadamba blossoms, wild forest honey, and unrefined kokum butter.',
    keywords: 'Kadamba Soap, Kadambam Soap, Kadamba inspired soap, Traditional Kadamba soap, Honey blossom soap, Kokum butter soap, Lotica Glow',
    canonical: `${SITE_URL}/products/kadamba-soap`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVmdbd_bOv7DSQeUt1O4WIQ8d07_Jx-ORQXLM4-3muFdtS_kG1ET4uv9QTTTkX6JcS1wBIaq__Skv-H6nLlLECGBsV4tmsChQzjUbDtOjJ7DXV8wNtjoFwTkXH7elasXuaPloJId_7KwUu2MQ9PFszsAM2ANOD2G6oIYm_JSaOUo26w1VORXI-ZHxi6_EKUbPE2atOolg8p3CP0DURns9voCyFtkZ2fFX12xsSvJBWsMVUc6Q6suiKQw',
    ogType: 'product',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${SITE_URL}/products/kadamba-soap#product`,
          "name": "Lotica Glow Kadamba Soap",
          "image": ["https://lh3.googleusercontent.com/aida-public/AB6AXuBVmdbd_bOv7DSQeUt1O4WIQ8d07_Jx-ORQXLM4-3muFdtS_kG1ET4uv9QTTTkX6JcS1wBIaq__Skv-H6nLlLECGBsV4tmsChQzjUbDtOjJ7DXV8wNtjoFwTkXH7elasXuaPloJId_7KwUu2MQ9PFszsAM2ANOD2G6oIYm_JSaOUo26w1VORXI-ZHxi6_EKUbPE2atOolg8p3CP0DURns9voCyFtkZ2fFX12xsSvJBWsMVUc6Q6suiKQw"],
          "description": "Nourish and soften dry skin with Lotica Glow Kadamba Soap, combining golden Kadamba blossoms, wild forest honey, and unrefined kokum butter.",
          "sku": "LG-SOAP-KAD-04",
          "brand": { "@type": "Brand", "name": "Lotica Glow" },
          "manufacturer": { "@type": "Organization", "name": "Ananta Vijaya Private Limited" },
          "offers": {
            "@type": "Offer",
            "url": `${SITE_URL}/products/kadamba-soap`,
            "priceCurrency": "INR",
            "price": "249",
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": 94
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Shop", "item": `${SITE_URL}/shop` },
            { "@type": "ListItem", "position": 3, "name": "Kadamba Soap", "item": `${SITE_URL}/products/kadamba-soap` }
          ]
        }
      ]
    }
  },
  {
    path: '/products/rudraksha-soap',
    outputPath: path.join(DIST_DIR, 'products', 'rudraksha-soap', 'index.html'),
    title: 'Rudraksha Soap – Sacred Bead & Himalayan Cedar | Lotica Glow',
    description: 'Awaken vital prana and sensory harmony with Lotica Glow Rudraksha Soap, enriched with sacred Rudraksha extract and Himalayan cedarwood.',
    keywords: 'Rudraksha Soap, Rudraksha inspired soap, Traditional Rudraksha soap, Premium devotional soap, Himalayan cedar soap, Lotica Glow',
    canonical: `${SITE_URL}/products/rudraksha-soap`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAclUCm04GaDvbK0bXL289HD3OJ7qQuiJEK3peM8anDL8UoGMc7Tyu4qzvErh9WxXQ70dq8jPTNhFWGRmDnZVlWuKULgYxw7NnAGS1omr7hO0ilFQLJUg5zO_MUwyHAkrrK_fyJy6-90Fe5tTvBFtcH2fjEt4qd_UP_iAAnF3nXqpAlq8mrFkauIquLZuLO1Gcnt8u86X6K688aapasC_rUqvNffFRJDDZUDGCwG0ymnXQfyqfN0hozg',
    ogType: 'product',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${SITE_URL}/products/rudraksha-soap#product`,
          "name": "Lotica Glow Rudraksha Soap",
          "image": ["https://lh3.googleusercontent.com/aida-public/AB6AXuAAclUCm04GaDvbK0bXL289HD3OJ7qQuiJEK3peM8anDL8UoGMc7Tyu4qzvErh9WxXQ70dq8jPTNhFWGRmDnZVlWuKULgYxw7NnAGS1omr7hO0ilFQLJUg5zO_MUwyHAkrrK_fyJy6-90Fe5tTvBFtcH2fjEt4qd_UP_iAAnF3nXqpAlq8mrFkauIquLZuLO1Gcnt8u86X6K688aapasC_rUqvNffFRJDDZUDGCwG0ymnXQfyqfN0hozg"],
          "description": "Awaken vital prana and sensory harmony with Lotica Glow Rudraksha Soap, enriched with sacred Rudraksha extract and Himalayan cedarwood.",
          "sku": "LG-SOAP-RUD-05",
          "brand": { "@type": "Brand", "name": "Lotica Glow" },
          "manufacturer": { "@type": "Organization", "name": "Ananta Vijaya Private Limited" },
          "offers": {
            "@type": "Offer",
            "url": `${SITE_URL}/products/rudraksha-soap`,
            "priceCurrency": "INR",
            "price": "249",
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": 112
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Shop", "item": `${SITE_URL}/shop` },
            { "@type": "ListItem", "position": 3, "name": "Rudraksha Soap", "item": `${SITE_URL}/products/rudraksha-soap` }
          ]
        }
      ]
    }
  },
  {
    path: '/contact',
    outputPath: path.join(DIST_DIR, 'contact', 'index.html'),
    title: 'Contact Ananta Vijaya | Lotica Glow Hyderabad',
    description: 'Contact Lotica Glow by Ananta Vijaya for product enquiries, orders, customer support and customised gifting.',
    keywords: 'Contact Ananta Vijaya, Lotica Glow Hyderabad, Soap enquiries Hyderabad, Personal care brand Hyderabad, Corporate soap enquiries Telangana',
    canonical: `${SITE_URL}/contact`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB993sfXG98XREyGP3l0QhO-ic0V-KZI_WgZ5ASeUn17ZYjDY1LQznLiBxa31iajLzMHy-l6LQZbFyjgZPZPoZEyH16sZghNVanlWWtraxjG_usqzD9a36TW00dqeMbOVmO-_4HgHQ1hH0jRiSY6jMEsP-gDkSnslm7AH3RRvlxspeGFBnaVtvSyPJb3FrpvNZRz_Ezo_ykC4ksX7ZF6e5xKKpJDlOXxcqeBV5FWRmp8XVZiI6sVKpx_g',
    ogType: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${SITE_URL}/contact` }
      ]
    }
  },
  {
    path: '/faqs',
    outputPath: path.join(DIST_DIR, 'faqs', 'index.html'),
    title: 'Frequently Asked Questions | Lotica Glow Traditional Soaps',
    description: 'Find clear answers about Lotica Glow traditional soaps, cold-curing, ingredients, sensitive skin suitability, orders, shipping and custom gifting.',
    keywords: 'Lotica Glow FAQs, soap questions India, traditional soap shelf life, sensitive skin soap questions, Hyderabad soap brand',
    canonical: `${SITE_URL}/faqs`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB993sfXG98XREyGP3l0QhO-ic0V-KZI_WgZ5ASeUn17ZYjDY1LQznLiBxa31iajLzMHy-l6LQZbFyjgZPZPoZEyH16sZghNVanlWWtraxjG_usqzD9a36TW00dqeMbOVmO-_4HgHQ1hH0jRiSY6jMEsP-gDkSnslm7AH3RRvlxspeGFBnaVtvSyPJb3FrpvNZRz_Ezo_ykC4ksX7ZF6e5xKKpJDlOXxcqeBV5FWRmp8XVZiI6sVKpx_g',
    ogType: 'website',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Are your soaps suitable for all skin types, including sensitive skin?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, absolutely. Our soaps are formulated with pure cold-pressed oils, unrefined plant butters, and gentle botanical extracts. They contain zero synthetic fragrances, parabens, or harsh detergents like SLS, making them exceptionally mild and soothing even for delicate and easily irritated skin."
              }
            },
            {
              "@type": "Question",
              "name": "What makes traditional cold-cured soaps different from commercial bars?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Commercial factory soaps often remove natural glycerin to sell separately in expensive creams and substitute it with synthetic surfactants. In contrast, our artisanal soaps undergo a slow 4 to 6 week cold cure that naturally retains 100% of the precious plant glycerin, providing superior hydration and conditioning."
              }
            },
            {
              "@type": "Question",
              "name": "How long does a single 125g bar typically last?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "With daily bathing by an individual, one 125g bar generally lasts between 3 to 4 weeks. Because our bars are rich in natural glycerin and cold-pressed oils, we recommend keeping your bar in a well-draining wooden soap dish away from standing water between uses to maximize its longevity."
              }
            },
            {
              "@type": "Question",
              "name": "Do you use any artificial foaming agents, SLS, or synthetic perfumes?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Never. Every lather you experience comes purely from saponified organic coconut oil, castor oil, and sesame oil. Our rich, calming aromas are derived 100% from steam-distilled pure essential oils, floral waters, and wildcrafted herbs."
              }
            },
            {
              "@type": "Question",
              "name": "Are Ananta Vijaya soaps 100% vegan and cruelty-free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our entire range is 100% plant-based and cruelty-free. We never use animal fats (tallow/lard) or conduct animal testing. We harvest all botanicals ethically and sustainably."
              }
            },
            {
              "@type": "Question",
              "name": "Can children and the elderly use these soaps safely?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, the gentle formulation and nourishing oils make our soaps safe and comforting for family members of all ages, including infants above 6 months and elders with thinning, dry skin."
              }
            },
            {
              "@type": "Question",
              "name": "What is the shelf life of each bar?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Due to our traditional curing process and natural antioxidant-rich oils, our soaps have a shelf life of 24 months from the date of manufacture when stored in a cool, dry place away from direct sunlight."
              }
            },
            {
              "@type": "Question",
              "name": "How long does delivery take and do you offer Cash on Delivery (COD)?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Orders are dispatched within 24 hours from our apothecary. Express delivery takes 2 to 4 business days across India. We offer both secure online prepaid payment and Cash on Delivery (COD) options."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide bulk festive gifting or customized hampers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! We specialize in custom corporate, wedding, and festive gift boxes with personalized wooden cases and gift notes. Please tap the WhatsApp button or email info@anantavijaya.com for bulk orders."
              }
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Frequently Asked Questions", "item": `${SITE_URL}/faqs` }
          ]
        }
      ]
    }
  },
  {
    path: '/ingredients',
    outputPath: path.join(DIST_DIR, 'ingredients', 'index.html'),
    title: 'Sacred Botanicals & Ingredients | Lotica Glow Soaps',
    description: 'Explore the verified botanicals behind Lotica Glow soaps: Pink Lotus, Bilva leaves, Kadamba blossoms, Krishna Tulsi, Sacred Ash and Rudraksha.',
    keywords: 'Lotica Glow ingredients, sacred lotus extract, bilva patra soap, kadamba flower, krishna tulsi, rudraksha extract, botanical soaps',
    canonical: `${SITE_URL}/ingredients`,
    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCesOYXGP9LnYp5qJLNQ6D1Qypte5dvZ_CsIi_XkXSWGr07UyQDaWGvt7xY7drIJ9L9H0_mGcuh-9RNU4b9CmAlSzC3XMFXTD31k4esRfIoePG4OuLOUOzKUTAbwh9gggQaw5azXy3MYE0MiA8asw1_FqK6NCc1wPvKsYE9J-nddCf462yizZYF56zovCcTVGuIrt-vZjoIKFNv_1f0TSZSoF2GmyhsnZG7FPIkyn_q3xVlZCpMQ5Vs8g',
    ogType: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Ingredients", "item": `${SITE_URL}/ingredients` }
      ]
    }
  }
];

function injectSeoIntoHtml(html, route) {
  let modified = html;

  // Replace Title
  modified = modified.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace or update meta description
  if (/name="description"/i.test(modified)) {
    modified = modified.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${route.description}" />`);
  }

  // Replace or update meta keywords
  if (/name="keywords"/i.test(modified)) {
    modified = modified.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${route.keywords}" />`);
  }

  // Replace or update canonical
  if (/rel="canonical"/i.test(modified)) {
    modified = modified.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${route.canonical}" />`);
  }

  // Replace Open Graph tags
  modified = modified.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
  modified = modified.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
  modified = modified.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${route.canonical}" />`);
  modified = modified.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${route.ogImage}" />`);

  // Replace Twitter tags
  modified = modified.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);
  modified = modified.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);
  modified = modified.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${route.ogImage}" />`);

  // Inject route-specific schema before </head>
  if (route.schema) {
    const schemaTag = `\n    <!-- Route Structured Data -->\n    <script type="application/ld+json">\n${JSON.stringify(route.schema, null, 2)}\n    </script>\n  `;
    modified = modified.replace('</head>', `${schemaTag}</head>`);
  }

  return modified;
}

let generatedCount = 0;
for (const route of ROUTES_DATA) {
  const dir = path.dirname(route.outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const outputHtml = injectSeoIntoHtml(template, route);
  fs.writeFileSync(route.outputPath, outputHtml, 'utf-8');
  generatedCount++;
  console.log(`[SEO Prerender] Generated: ${route.path} -> ${path.relative(DIST_DIR, route.outputPath)}`);
}

console.log(`\n[SEO Prerender] Successfully generated ${generatedCount} static pages with complete SEO tags & structured data.`);
