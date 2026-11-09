import React, { useState, useEffect } from 'react';
import { SOAP_PRODUCTS, ASSETS, FAQ_ITEMS, COMING_SOON_PRODUCTS } from './data/soaps';
import { PAGE_SEO, PRODUCT_SEO, SITE_URL, BUSINESS_INFO, getProductSchema, getBreadcrumbSchema, getFAQPageSchema } from './data/seoData';
import { initGA, trackPageView, trackViewItem, trackSelectItem, trackAddToCart, trackRemoveFromCart, trackBeginCheckout, trackContactSubmit, trackWhatsAppClick, trackGiftEnquiry } from './utils/analytics';
import { updateDocumentHead } from './utils/seoHelper';
import Breadcrumbs from './components/Breadcrumbs';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';

function resolveRouteFromLocation() {
  if (typeof window === 'undefined') return { page: 'home', slug: null };
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.replace('#', '').toLowerCase();

  // Check product paths /products/:slug
  const productMatch = path.match(/^\/products\/([a-z0-9-]+)$/);
  if (productMatch) {
    return { page: 'product', slug: productMatch[1] };
  }
  if (hash.startsWith('product-')) {
    return { page: 'product', slug: hash.replace('product-', '') };
  }

  if (path === '/about' || hash === 'our-story' || hash === 'about') return { page: 'about', slug: null };
  if (path === '/shop' || hash === 'our-soaps' || hash === 'shop') return { page: 'shop', slug: null };
  if (path === '/divine-collection' || hash === 'divine-collection') return { page: 'divine-collection', slug: null };
  if (path === '/contact' || hash === 'contact') return { page: 'contact', slug: null };
  if (path === '/faqs' || hash === 'faq' || hash === 'faqs') return { page: 'faqs', slug: null };
  if (path === '/ingredients' || hash === 'ingredients') return { page: 'ingredients', slug: null };

  return { page: 'home', slug: null };
}

export default function App() {
  // Enhanced Route State supporting Clean Path URLs and Deep Linking
  const [currentRoute, setCurrentRoute] = useState(() => resolveRouteFromLocation());
  const currentPage = currentRoute.page;

  // Active soap in Product Showcase
  const [activeSoapIndex, setActiveSoapIndex] = useState(0); // 0: Kamalam Soap
  const [animating, setAnimating] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Active soap in Ingredient Deep Dive section
  const [ingredientTabSoap, setIngredientTabSoap] = useState(0);

  // FAQ state
  const [faqCategory, setFaqCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', topic: 'General Inquiry', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Cart & Wishlist state
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(['Kamalam Soap']);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const currentSoap = SOAP_PRODUCTS[activeSoapIndex] || SOAP_PRODUCTS[0];
  const ingredientSoap = SOAP_PRODUCTS[ingredientTabSoap] || SOAP_PRODUCTS[0];

  // Browser history & hash change listeners
  useEffect(() => {
    initGA();

    const handlePopState = () => {
      const route = resolveRouteFromLocation();
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleHashChange = () => {
      const route = resolveRouteFromLocation();
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Dynamic Document Head, Canonical URL & Schema.org JSON-LD Updates
  useEffect(() => {
    let seoConfig = PAGE_SEO.home;
    let schemaData = null;

    if (currentRoute.page === 'product' && currentRoute.slug) {
      const prodSeo = PRODUCT_SEO[currentRoute.slug];
      if (prodSeo) {
        seoConfig = prodSeo;
        schemaData = {
          "@context": "https://schema.org",
          "@graph": [
            getProductSchema(currentRoute.slug),
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Shop", url: "/shop" },
              { name: prodSeo.title.split('–')[0].trim(), url: prodSeo.path }
            ])
          ]
        };
        const matchedProd = SOAP_PRODUCTS.find(p => p.slug === currentRoute.slug || p.id === prodSeo.id);
        if (matchedProd) {
          trackViewItem(matchedProd);
          const pIdx = SOAP_PRODUCTS.indexOf(matchedProd);
          if (pIdx !== -1) setActiveSoapIndex(pIdx);
        }
      }
    } else if (currentRoute.page === 'divine-collection') {
      seoConfig = PAGE_SEO['divine-collection'];
      schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          getProductSchema("divine-collection-gift-box"),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "The Divine Collection", url: "/divine-collection" }
          ])
        ]
      };
    } else if (currentRoute.page === 'faqs' || currentRoute.page === 'faq') {
      seoConfig = PAGE_SEO.faqs;
      schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          getFAQPageSchema(FAQ_ITEMS),
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Frequently Asked Questions", url: "/faqs" }
          ])
        ]
      };
    } else if (PAGE_SEO[currentRoute.page]) {
      seoConfig = PAGE_SEO[currentRoute.page];
      schemaData = getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: seoConfig.title.split('|')[0].split('–')[0].trim(), url: seoConfig.path }
      ]);
    }

    updateDocumentHead({
      title: seoConfig.title,
      description: seoConfig.description,
      keywords: seoConfig.keywords,
      canonical: seoConfig.canonical,
      ogImage: seoConfig.ogImage,
      ogType: seoConfig.ogType || 'website',
      schema: schemaData
    });

    trackPageView(seoConfig.title, seoConfig.path || window.location.pathname);
  }, [currentRoute]);

  const navigateTo = (page, slug = null) => {
    let targetPath = '/';
    if (page === 'about' || page === 'our-story') targetPath = '/about';
    else if (page === 'shop' || page === 'our-soaps') targetPath = '/shop';
    else if (page === 'divine-collection') targetPath = '/divine-collection';
    else if (page === 'contact') targetPath = '/contact';
    else if (page === 'faqs' || page === 'faq') targetPath = '/faqs';
    else if (page === 'ingredients') targetPath = '/ingredients';
    else if (page === 'product' && slug) targetPath = `/products/${slug}`;

    try {
      if (window.history && window.history.pushState) {
        window.history.pushState({ page, slug }, '', targetPath);
      } else {
        window.location.hash = targetPath.replace('/', '');
      }
    } catch (err) {
      window.location.hash = targetPath.replace('/', '');
    }

    setCurrentRoute({ page, slug });
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectSoap = (index, shouldScroll = false) => {
    if (index === activeSoapIndex) return;
    setAnimating(true);
    setQuantity(1);
    setTimeout(() => {
      setActiveSoapIndex(index);
      setAnimating(false);
    }, 180);

    const targetSoap = SOAP_PRODUCTS[index];
    if (targetSoap) {
      trackSelectItem(targetSoap, index);
    }

    if (shouldScroll) {
      if (currentRoute.page !== 'home' && currentRoute.page !== 'shop' && currentRoute.page !== 'our-soaps') {
        navigateTo('shop');
      }
      setTimeout(() => {
        const el = document.getElementById('collection');
        if (el) {
          const headerOffset = 100;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const prevSoap = () => {
    const newIdx = (activeSoapIndex - 1 + SOAP_PRODUCTS.length) % SOAP_PRODUCTS.length;
    selectSoap(newIdx, false);
  };

  const nextSoap = () => {
    const newIdx = (activeSoapIndex + 1) % SOAP_PRODUCTS.length;
    selectSoap(newIdx, false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addToCart = (product, count = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.title === product.title);
      if (existing) {
        return prev.map((item) =>
          item.title === product.title ? { ...item, quantity: item.quantity + count } : item
        );
      }
      return [
        ...prev,
        {
          id: product.title,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: count
        }
      ];
    });
    trackAddToCart(product, count);
    showToast(`Added ${count > 1 ? count + 'x ' : ''}${product.title} to Bag`);
  };

  const addDivineBoxToCart = () => {
    setCart((prev) => {
      const title = "The Divine Collection - 5 Soap Gift Box";
      const existing = prev.find((item) => item.title === title);
      if (existing) {
        return prev.map((item) =>
          item.title === title ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: "divine-collection-box",
          title,
          price: "₹1,199",
          image: ASSETS.kamalamBox,
          quantity: 1
        }
      ];
    });
    trackGiftEnquiry();
    trackAddToCart({ id: "divine-collection-box", title: "The Divine Collection - 5 Soap Gift Box", price: "₹1,199" }, 1);
    showToast("Added The Divine Collection Gift Box to Bag!");
    setCartOpen(true);
  };

  const toggleWishlist = (title) => {
    setWishlist((prev) => {
      if (prev.includes(title)) {
        showToast(`Removed ${title} from Wishlist`);
        return prev.filter((t) => t !== title);
      }
      showToast(`Added ${title} to Wishlist`);
      return [...prev, title];
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      showToast("Thank you for joining our botanical sanctuary!");
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    trackContactSubmit(contactForm.topic);
    showToast("Message received! Our herbal care team will reach out shortly.");
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', phone: '', topic: 'General Inquiry', message: '' });
    }, 4000);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filtered FAQ items
  const filteredFaqs = faqCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === faqCategory);

  return (
      <div className="bg-[#FFF8F1] font-body-md text-[#211B0C] antialiased min-h-screen relative selection:bg-[#fdcd73] selection:text-[#173D32] w-full overflow-x-clip">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#173D32] text-[#ffdea6] px-5 py-3 rounded-full shadow-2xl border border-[#C59A45]/50 flex items-center gap-2.5 animate-bounce">
            <span className="material-symbols-outlined text-[#fdcd73] text-[20px]">check_circle</span>
            <span className="text-xs font-semibold uppercase tracking-wider">{toastMessage}</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* 1. TOP PROMO BANNER & HEADER */}
        {/* ============================================================ */}
        <header className="sticky top-0 left-0 w-full z-50 shadow-[0_1px_8px_rgba(57,37,29,0.06)]">
          {/* Top Notification Strip (Infinite Smooth Scrolling Marquee) */}
          <div className="w-full bg-[#1E394C] py-2 overflow-hidden border-b border-[#C59A45]/30 select-none relative z-50">
            <div className="animate-marquee flex items-center text-[10px] sm:text-xs text-[#FAF5EB] tracking-[0.22em] uppercase font-medium whitespace-nowrap">
              {/* Set 1 */}
              <div className="flex items-center gap-10 shrink-0 pr-10">
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse"></span>
                  Tradition in Every Touch. Thoughtful Care in Every Day.
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse"></span>
                  Free Express Shipping on Orders Above ₹499
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse"></span>
                  100% Handcrafted Ayurvedic Cold-Cured Soaps
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse"></span>
                  Pure Consecrated Botanicals &amp; Virgin Plant Oils
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse"></span>
                  Aged 45 Days • Zero Harsh Chemicals
                </span>
              </div>

              {/* Set 2 (Duplicate for seamless continuous loop) */}
              <div className="flex items-center gap-10 shrink-0 pr-10" aria-hidden="true">
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse"></span>
                  Tradition in Every Touch. Thoughtful Care in Every Day.
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse"></span>
                  Free Express Shipping on Orders Above ₹499
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse"></span>
                  100% Handcrafted Ayurvedic Cold-Cured Soaps
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse"></span>
                  Pure Consecrated Botanicals &amp; Virgin Plant Oils
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse"></span>
                  Aged 45 Days • Zero Harsh Chemicals
                </span>
              </div>
            </div>
          </div>

          {/* Main Navbar */}
          <div className="h-16 sm:h-20 md:h-[84px] bg-[#FFF8F1]/95 backdrop-blur-md border-b border-[#E8D4B5]/60 transition-all relative">
            <div className="max-w-[1440px] h-full mx-auto px-3 sm:px-6 lg:px-12 flex items-center justify-between">
              {/* Logo Group */}
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 sm:gap-3.5 shrink-0 group cursor-pointer text-left"
                type="button"
              >
                <img
                  alt="Ananta Vijaya Sacred Logo"
                  className="h-9 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_2px_8px_rgba(123,88,2,0.18)] transition-transform duration-300 group-hover:scale-105"
                  src={ASSETS.logo}
                />
                <div className="flex flex-col justify-center whitespace-nowrap">
                  <span className="font-serif text-base sm:text-xl lg:text-[22px] font-bold text-[#00271d] tracking-wider uppercase leading-none">
                    Ananta Vijaya
                  </span>
                  <span className="font-label-sm text-[8px] sm:text-[10px] text-[#7B5802] tracking-[0.2em] sm:tracking-[0.22em] uppercase font-semibold mt-0.5 sm:mt-1">
                    Natural Handmade Soaps
                  </span>
                </div>
              </button>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
                <button
                  onClick={() => navigateTo('home')}
                  className={`font-label-md text-xs tracking-widest uppercase py-1 transition-colors ${currentRoute.page === 'home'
                      ? 'text-[#00271d] font-semibold border-b-2 border-[#7B5802]'
                      : 'text-[#414845] hover:text-[#00271d] hover:border-b-2 hover:border-[#7B5802]/60'
                    }`}
                >
                  Home
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className={`font-label-md text-xs tracking-widest uppercase py-1 transition-colors ${currentRoute.page === 'about' || currentRoute.page === 'our-story'
                      ? 'text-[#00271d] font-semibold border-b-2 border-[#7B5802]'
                      : 'text-[#414845] hover:text-[#00271d] hover:border-b-2 hover:border-[#7B5802]/60'
                    }`}
                >
                  Our Story
                </button>
                <button
                  onClick={() => navigateTo('shop')}
                  className={`font-label-md text-xs tracking-widest uppercase py-1 transition-colors ${currentRoute.page === 'shop' || currentRoute.page === 'our-soaps' || currentRoute.page === 'product'
                      ? 'text-[#00271d] font-semibold border-b-2 border-[#7B5802]'
                      : 'text-[#414845] hover:text-[#00271d] hover:border-b-2 hover:border-[#7B5802]/60'
                    }`}
                >
                  Our Soaps
                </button>
                <button
                  onClick={() => navigateTo('divine-collection')}
                  className={`font-label-md text-xs tracking-widest uppercase py-1 transition-colors ${currentRoute.page === 'divine-collection'
                      ? 'text-[#00271d] font-semibold border-b-2 border-[#7B5802]'
                      : 'text-[#414845] hover:text-[#00271d] hover:border-b-2 hover:border-[#7B5802]/60'
                    }`}
                >
                  Divine Collection
                </button>
                <button
                  onClick={() => navigateTo('ingredients')}
                  className={`font-label-md text-xs tracking-widest uppercase py-1 transition-colors ${currentRoute.page === 'ingredients'
                      ? 'text-[#00271d] font-semibold border-b-2 border-[#7B5802]'
                      : 'text-[#414845] hover:text-[#00271d] hover:border-b-2 hover:border-[#7B5802]/60'
                    }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => navigateTo('faqs')}
                  className={`font-label-md text-xs tracking-widest uppercase py-1 transition-colors ${currentRoute.page === 'faqs' || currentRoute.page === 'faq'
                      ? 'text-[#00271d] font-semibold border-b-2 border-[#7B5802]'
                      : 'text-[#414845] hover:text-[#00271d] hover:border-b-2 hover:border-[#7B5802]/60'
                    }`}
                >
                  FAQ
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className={`font-label-md text-xs tracking-widest uppercase py-1 transition-colors ${currentRoute.page === 'contact'
                      ? 'text-[#00271d] font-semibold border-b-2 border-[#7B5802]'
                      : 'text-[#414845] hover:text-[#00271d] hover:border-b-2 hover:border-[#7B5802]/60'
                    }`}
                >
                  Contact
                </button>
              </nav>

              {/* Right Action Icons & Hamburger */}
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 text-[#00271d] shrink-0">
                <button
                  aria-label="Search"
                  onClick={() => {
                    navigateTo('our-soaps');
                    showToast("Browsing complete soap collection");
                  }}
                  className="p-1.5 hover:text-[#7B5802] transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">search</span>
                </button>

                <button
                  aria-label="Wishlist"
                  onClick={() => setWishlistOpen(true)}
                  className="p-1.5 hover:text-[#7B5802] transition-colors relative"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">favorite</span>
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#7B5802] text-white text-[9px] sm:text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                <button
                  aria-label="Shopping Bag"
                  onClick={() => setCartOpen(true)}
                  className="p-1.5 hover:text-[#7B5802] transition-colors relative"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">shopping_bag</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#173D32] text-[#fdcd73] text-[9px] sm:text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>

                <div
                  onClick={() => navigateTo('contact')}
                  className="hidden sm:flex w-8 h-8 rounded-full bg-[#00271d] items-center justify-center ml-0.5 text-white shadow-sm cursor-pointer hover:bg-[#173D32] transition-colors"
                  title="Account / Contact"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </div>

                {/* Mobile/Tablet Hamburger Toggle */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-1.5 hover:text-[#7B5802] transition-colors text-[#00271d] flex items-center justify-center"
                  aria-label="Toggle Navigation Menu"
                >
                  <span className="material-symbols-outlined text-[25px] sm:text-[26px]">
                    {mobileMenuOpen ? 'close' : 'menu'}
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Slide-Down Navigation Menu */}
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-[#FFF8F1] border-b-2 border-[#C59A45]/40 shadow-[0_20px_40px_rgba(57,37,29,0.25)] z-50 lg:hidden px-4 sm:px-6 py-4 flex flex-col gap-1 max-h-[85vh] overflow-y-auto">
                {/* Mobile Profile & Contact Shortcut Header */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E8D4B5] px-1">
                  <button
                    type="button"
                    onClick={() => navigateTo('contact')}
                    className="flex items-center gap-2.5 text-left group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#00271d] flex items-center justify-center text-white shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">person</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#173D32] group-hover:text-[#7B5802] transition-colors">Apothecary Atelier</span>
                      <span className="text-[10px] text-[#7B5802]">Contact &amp; Personal Inquiries</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full text-[#414845] hover:text-[#00271d]"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors uppercase font-semibold text-xs tracking-widest border-b border-[#E8D4B5]/60 text-left w-full ${currentRoute.page === 'home' ? 'bg-[#faecd4] text-[#00271d] font-bold' : 'text-[#173D32] hover:bg-[#E8D4B5]/50'
                    }`}
                >
                  <span>Home</span>
                  <span className="material-symbols-outlined text-[16px] text-[#C59A45]">east</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors uppercase font-semibold text-xs tracking-widest border-b border-[#E8D4B5]/60 text-left w-full ${currentRoute.page === 'about' || currentRoute.page === 'our-story' ? 'bg-[#faecd4] text-[#00271d] font-bold' : 'text-[#173D32] hover:bg-[#E8D4B5]/50'
                    }`}
                >
                  <span>Our Story</span>
                  <span className="material-symbols-outlined text-[16px] text-[#C59A45]">east</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('shop')}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors uppercase font-semibold text-xs tracking-widest border-b border-[#E8D4B5]/60 text-left w-full ${currentRoute.page === 'shop' || currentRoute.page === 'our-soaps' || currentRoute.page === 'product' ? 'bg-[#faecd4] text-[#00271d] font-bold' : 'text-[#173D32] hover:bg-[#E8D4B5]/50'
                    }`}
                >
                  <span>Our Soaps</span>
                  <span className="material-symbols-outlined text-[16px] text-[#C59A45]">east</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('divine-collection')}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors uppercase font-semibold text-xs tracking-widest border-b border-[#E8D4B5]/60 text-left w-full ${currentRoute.page === 'divine-collection' ? 'bg-[#faecd4] text-[#00271d] font-bold' : 'text-[#173D32] hover:bg-[#E8D4B5]/50'
                    }`}
                >
                  <span>Divine Collection</span>
                  <span className="material-symbols-outlined text-[16px] text-[#C59A45]">east</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('ingredients')}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors uppercase font-semibold text-xs tracking-widest border-b border-[#E8D4B5]/60 text-left w-full ${currentRoute.page === 'ingredients' ? 'bg-[#faecd4] text-[#00271d] font-bold' : 'text-[#173D32] hover:bg-[#E8D4B5]/50'
                    }`}
                >
                  <span>Ingredients</span>
                  <span className="material-symbols-outlined text-[16px] text-[#C59A45]">east</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('faqs')}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors uppercase font-semibold text-xs tracking-widest border-b border-[#E8D4B5]/60 text-left w-full ${currentRoute.page === 'faqs' || currentRoute.page === 'faq' ? 'bg-[#faecd4] text-[#00271d] font-bold' : 'text-[#173D32] hover:bg-[#E8D4B5]/50'
                    }`}
                >
                  <span>FAQ</span>
                  <span className="material-symbols-outlined text-[16px] text-[#C59A45]">east</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors uppercase font-semibold text-xs tracking-widest text-left w-full ${currentRoute.page === 'contact' ? 'bg-[#faecd4] text-[#00271d] font-bold' : 'text-[#173D32] hover:bg-[#E8D4B5]/50'
                    }`}
                >
                  <span>Contact</span>
                  <span className="material-symbols-outlined text-[16px] text-[#C59A45]">east</span>
                </button>

                {/* Mobile Quick Action Buttons in Drawer */}
                <div className="pt-3 mt-2 border-t border-[#E8D4B5] flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addDivineBoxToCart();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 px-4 bg-[#C59A45] text-[#173D32] font-serif font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">redeem</span>
                    <span>Order Divine Gift Box (₹1,199)</span>
                  </button>
                  <a
                    href="https://wa.me/917386759777?text=Hello%20Ananta%20Vijaya%2C%20I%20have%20an%20inquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 bg-[#25D366]/10 text-[#128C7E] font-semibold text-xs rounded-lg flex items-center justify-center gap-2 border border-[#25D366]/30"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>WhatsApp Inquiry Support</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Body */}
        <main className="w-full">
          {/* ============================================================ */}
          {/* PAGE 1: HOME PAGE */}
          {/* ============================================================ */}
          {currentPage === 'home' && (
            <div>
              {/* 2. HERO SECTION (Exact Match to Screenshot 1) */}
              <section className="relative w-full bg-[#FFF2DB] overflow-hidden pt-6 sm:pt-8 pb-10 sm:pb-12 lg:pb-16">
                {/* Subtle Ambient Radial Glow */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-b from-[#ffdea6]/40 via-[#faecd4] to-transparent blur-3xl"></div>
                  <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-[#c2ebdb]/20 blur-2xl"></div>
                </div>

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Editorial Headline & Copy */}
                    <div className="lg:col-span-6 flex flex-col justify-center pr-0 lg:pr-6">
                      {/* Eyebrow */}
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span className="w-5 sm:w-7 h-[1px] bg-[#7B5802]"></span>
                        <span className="font-label-sm text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#7B5802] font-semibold">
                          Natural Handmade Soaps
                        </span>
                        <span className="w-5 sm:w-7 h-[1px] bg-[#7B5802]"></span>
                      </div>

                      {/* Big Headline */}
                      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#00271d] leading-[1.16] sm:leading-[1.12] tracking-tight mb-4">
                        Tradition in Every Touch.<br />
                        <span className="italic font-normal text-[#7B5802]">
                          Thoughtful Care in Every Day.
                        </span>
                      </h1>

                      {/* Description */}
                      <p className="font-sans text-sm sm:text-base lg:text-lg text-[#414845] max-w-xl mb-6 leading-relaxed">
                        Handcrafted with ancient Ayurvedic wisdom and consecrated botanicals. Pure, gentle care for your skin and sacred rituals for your daily routine.
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-8 w-full sm:w-auto">
                        <button
                          onClick={() => navigateTo('our-soaps')}
                          className="inline-flex items-center justify-center px-7 py-3.5 sm:py-3 bg-[#173D32] text-[#FAF5EB] font-label-md text-xs uppercase tracking-widest shadow-md hover:bg-[#39251D] transition-all duration-300 group rounded-sm text-center"
                          type="button"
                        >
                          <span>Explore Our Soaps</span>
                          <span className="material-symbols-outlined text-[17px] ml-1.5 transition-transform group-hover:translate-x-1 text-[#ffdea6]">
                            east
                          </span>
                        </button>
                        <button
                          onClick={() => navigateTo('our-story')}
                          className="inline-flex items-center justify-center px-6 py-3.5 sm:py-3 bg-[#faecd4] text-[#39251D] font-label-md text-xs uppercase tracking-widest hover:bg-[#f4e7cf] transition-all duration-300 shadow-sm rounded-sm border border-[#E8D4B5] text-center"
                          type="button"
                        >
                          Our Philosophy
                        </button>
                      </div>

                      {/* 3 Trust Indicators */}
                      <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4 text-[#414845] font-label-sm text-[10px] sm:text-[11px] uppercase tracking-wider">
                        <div className="flex items-center gap-1.5 bg-[#FAF5EB]/90 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full sm:rounded-none border border-[#E8D4B5]/60 sm:border-none shadow-sm sm:shadow-none">
                          <span className="material-symbols-outlined text-[#7B5802] text-[15px] sm:text-[16px]">verified</span>
                          <span className="font-semibold text-[#00271d]">100% Handcrafted</span>
                        </div>
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#7B5802]/50"></span>
                        <div className="flex items-center gap-1.5 bg-[#FAF5EB]/90 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full sm:rounded-none border border-[#E8D4B5]/60 sm:border-none shadow-sm sm:shadow-none">
                          <span className="material-symbols-outlined text-[#7B5802] text-[15px] sm:text-[16px]">spa</span>
                          <span className="font-semibold text-[#00271d]">Devotional Pure Herbs</span>
                        </div>
                        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#7B5802]/50"></span>
                        <div className="flex items-center gap-1.5 bg-[#FAF5EB]/90 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full sm:rounded-none border border-[#E8D4B5]/60 sm:border-none shadow-sm sm:shadow-none">
                          <span className="material-symbols-outlined text-[#7B5802] text-[15px] sm:text-[16px]">local_florist</span>
                          <span className="font-semibold text-[#00271d]">Sacred Botanicals</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: 3D Product Stage with All 5 Packaging Boxes */}
                    <div className="lg:col-span-6 relative mt-6 sm:mt-10 lg:mt-0 flex flex-col items-center justify-center">
                      <div className="relative w-full max-w-[680px] flex flex-col items-center select-none overflow-hidden sm:overflow-visible">
                        {/* Background Glow */}
                        <div className="absolute -inset-6 bg-radial from-[#fdcd73]/25 via-[#E8D4B5]/20 to-transparent blur-3xl pointer-events-none -z-10"></div>

                        {/* Rotating Lotus Mandala Halo */}
                        <div className="absolute -top-6 sm:-top-10 left-1/2 -translate-x-1/2 w-[280px] sm:w-[380px] lg:w-[440px] h-[280px] sm:h-[380px] lg:h-[440px] pointer-events-none z-0">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#fdcd73]/30 via-[#E8D4B5]/20 to-transparent blur-2xl"></div>
                          <img
                            alt="Lotus Mandala"
                            className="w-full h-full object-contain animate-[spin_120s_linear_infinite] opacity-80 drop-shadow-[0_0_30px_rgba(253,205,115,0.45)]"
                            src={ASSETS.lotusMandala}
                          />
                        </div>

                        {/* Hanging Brass Bells & Bilva Leaves */}
                        <div className="absolute -top-4 sm:-top-6 left-0 sm:left-4 w-20 sm:w-28 lg:w-36 z-20 pointer-events-none drop-shadow-md">
                          <img alt="Bilvam Leaves" className="w-full h-auto object-contain -rotate-12" src={ASSETS.bilvamLeaves} />
                        </div>
                        <div className="absolute -top-4 sm:-top-5 right-0 sm:right-4 w-20 sm:w-28 lg:w-36 z-20 pointer-events-none drop-shadow-md">
                          <img alt="Bilvam Leaves" className="w-full h-auto object-contain rotate-45 scale-x-[-1]" src={ASSETS.bilvamLeaves} />
                        </div>
                        <div className="absolute -top-1 sm:-top-2 left-10 sm:left-14 lg:left-24 w-10 sm:w-14 lg:w-18 z-25 pointer-events-none drop-shadow-lg">
                          <img alt="Hanging Brass Bells" className="w-full h-auto object-contain" src={ASSETS.hangingBells} />
                        </div>

                        {/* Divine Collection Badge */}
                        <div className="absolute top-0 right-1 sm:right-4 lg:right-8 z-30">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-tr from-[#7b5802] via-[#fdcd73] to-[#C59A45] p-0.5 sm:p-1 shadow-[0_12px_24px_rgba(57,37,29,0.35)] flex items-center justify-center border-2 border-[#ffdea6]">
                            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#fff8f1] via-[#faecd4] to-[#e5d9c1] border border-[#C59A45] flex flex-col items-center justify-center text-center p-0.5 sm:p-1 shadow-inner">
                              <span className="font-label-sm text-[7px] sm:text-[8px] lg:text-[9px] uppercase tracking-widest text-[#7b5802] font-semibold leading-tight">The</span>
                              <span className="font-serif text-[9px] sm:text-[11px] lg:text-[12px] font-bold text-[#173D32] tracking-wider uppercase leading-tight">Divine</span>
                              <span className="font-label-sm text-[7px] sm:text-[9px] lg:text-[10px] font-semibold text-[#7b5802] tracking-wider uppercase leading-tight">Collection</span>
                              <span className="material-symbols-outlined text-[#C59A45] text-[10px] sm:text-[12px] lg:text-[13px] mt-0.5">local_florist</span>
                            </div>
                          </div>
                        </div>

                        {/* 5 Soap Boxes on Pedestal */}
                        <div className="relative w-full mt-14 sm:mt-20 lg:mt-24 flex flex-col items-center">
                          <div className="relative z-20 w-full flex items-end justify-center px-1 sm:px-2 pb-0 -mb-4 sm:-mb-8 lg:-mb-10">
                            {/* 1. Vibhudi */}
                            <div className="w-[18%] flex flex-col items-center z-10 transition-transform duration-300 hover:-translate-y-2 group cursor-pointer" onClick={() => selectSoap(3, true)}>
                              <span className="font-label-sm text-[7px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider text-[#7B5802] font-semibold mb-0.5 sm:mb-1 opacity-90 group-hover:opacity-100">Vibhudi</span>
                              <div className="relative w-full">
                                <img alt="Vibhudi Soap Box" className="w-full h-auto max-h-28 sm:max-h-48 lg:max-h-56 object-contain drop-shadow-[0_10px_14px_rgba(57,37,29,0.32)]" src={ASSETS.vibhudiBox} />
                                <div className="absolute -bottom-1.5 inset-x-1 h-2 sm:h-3 bg-[#39251D]/30 blur-sm rounded-full -z-10"></div>
                              </div>
                            </div>

                            {/* 2. Kadamba */}
                            <div className="w-[20%] flex flex-col items-center z-20 transition-transform duration-300 hover:-translate-y-3 group -ml-1 sm:-ml-2 lg:-ml-3 cursor-pointer" onClick={() => selectSoap(1, true)}>
                              <span className="font-label-sm text-[7px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider text-[#7B5802] font-semibold mb-0.5 sm:mb-1 opacity-90 group-hover:opacity-100">Kadamba</span>
                              <div className="relative w-full">
                                <img alt="Kadamba Soap Box" className="w-full h-auto max-h-32 sm:max-h-52 lg:max-h-60 object-contain drop-shadow-[0_14px_18px_rgba(57,37,29,0.35)]" src={ASSETS.kadambaBox} />
                                <div className="absolute -bottom-1.5 inset-x-1 h-2 sm:h-3 bg-[#39251D]/35 blur-sm rounded-full -z-10"></div>
                              </div>
                            </div>

                            {/* 3. Kamalam */}
                            <div className="w-[26%] flex flex-col items-center z-30 transition-transform duration-300 hover:-translate-y-4 group -mx-0.5 sm:-mx-1 lg:-mx-2 cursor-pointer" onClick={() => selectSoap(0, true)}>
                              <div className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-0.5 rounded-full bg-[#173d32] border border-[#fdcd73] mb-0.5 sm:mb-1 shadow-lg ring-1 sm:ring-2 ring-[#C59A45]/30">
                                <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#fdcd73] animate-pulse shadow-[0_0_6px_#fdcd73]"></span>
                                <span className="font-label-sm text-[6px] sm:text-[8px] lg:text-[9px] uppercase tracking-widest text-[#ffdea6] font-bold whitespace-nowrap">Consecrated Bar</span>
                              </div>
                              <div className="relative w-full">
                                <img alt="Kamalam Soap Box" className="w-full h-auto max-h-36 sm:max-h-60 lg:max-h-72 object-contain drop-shadow-[0_20px_28px_rgba(23,61,50,0.5)] scale-105 group-hover:scale-110 transition-transform duration-300" src={ASSETS.kamalamBox} />
                                <div className="absolute -bottom-2 inset-x-1.5 h-3 sm:h-4 bg-[#173d32]/50 blur-md rounded-full -z-10"></div>
                              </div>
                            </div>

                            {/* 4. Bilvam */}
                            <div className="w-[20%] flex flex-col items-center z-20 transition-transform duration-300 hover:-translate-y-3 group -mr-1 sm:-mr-2 lg:-mr-3 cursor-pointer" onClick={() => selectSoap(2, true)}>
                              <span className="font-label-sm text-[7px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider text-[#7B5802] font-semibold mb-0.5 sm:mb-1 opacity-90 group-hover:opacity-100">Bilvam</span>
                              <div className="relative w-full">
                                <img alt="Bilvam Soap Box" className="w-full h-auto max-h-32 sm:max-h-52 lg:max-h-60 object-contain drop-shadow-[0_14px_18px_rgba(57,37,29,0.35)]" src={ASSETS.bilvamBox} />
                                <div className="absolute -bottom-1.5 inset-x-1 h-2 sm:h-3 bg-[#39251D]/35 blur-sm rounded-full -z-10"></div>
                              </div>
                            </div>

                            {/* 5. Rudraksha */}
                            <div className="w-[18%] flex flex-col items-center z-10 transition-transform duration-300 hover:-translate-y-2 group cursor-pointer" onClick={() => selectSoap(4, true)}>
                              <span className="font-label-sm text-[7px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider text-[#7B5802] font-semibold mb-0.5 sm:mb-1 opacity-90 group-hover:opacity-100">Rudraksha</span>
                              <div className="relative w-full">
                                <img alt="Rudraksha Soap Box" className="w-full h-auto max-h-28 sm:max-h-48 lg:max-h-56 object-contain drop-shadow-[0_10px_14px_rgba(57,37,29,0.32)]" src={ASSETS.rudrakshaBox} />
                                <div className="absolute -bottom-1.5 inset-x-1 h-2 sm:h-3 bg-[#39251D]/30 blur-sm rounded-full -z-10"></div>
                              </div>
                            </div>
                          </div>

                          {/* Pedestal Base with Offerings */}
                          <div className="relative z-25 w-full flex flex-col items-center pointer-events-none">
                            <div className="w-full px-1 relative flex items-center justify-center">
                              <img alt="Stone Pedestal Stage" className="w-full h-auto object-contain drop-shadow-[0_16px_24px_rgba(57,37,29,0.42)]" src={ASSETS.stonePedestal} />
                              <div className="absolute bottom-1 sm:bottom-3 lg:bottom-4 left-1.5 sm:left-3 lg:left-6 w-7 sm:w-10 lg:w-14 z-30 drop-shadow-md">
                                <img alt="Brass Diya Flame" className="w-full h-auto object-contain" src={ASSETS.brassDiya} />
                              </div>
                              <div className="absolute bottom-1 sm:bottom-2 lg:bottom-3 left-7 sm:left-14 lg:left-24 w-8 sm:w-12 lg:w-16 z-30 drop-shadow-md">
                                <img alt="Herbal Powder" className="w-full h-auto object-contain" src={ASSETS.powderBowl} />
                              </div>
                              <div className="absolute bottom-1 sm:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 w-16 sm:w-24 lg:w-32 z-30 drop-shadow-sm">
                                <img alt="Jasmine Flowers" className="w-full h-auto object-contain" src={ASSETS.jasmineFlowers} />
                              </div>
                              <div className="absolute bottom-1 sm:bottom-3 lg:bottom-4 right-7 sm:right-14 lg:right-24 w-9 sm:w-14 lg:w-18 z-30 drop-shadow-md">
                                <img alt="Sacred Pink Lotus" className="w-full h-auto object-contain" src={ASSETS.pinkLotus} />
                              </div>
                              <div className="absolute bottom-1 sm:bottom-2 lg:bottom-3 right-1.5 sm:right-3 lg:right-6 w-8 sm:w-12 lg:w-16 z-30 drop-shadow-md">
                                <img alt="Rudraksha Mala Beads" className="w-full h-auto object-contain" src={ASSETS.rudrakshaMala} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* BOTANICAL TRANSITION DIVIDER */}
              <div className="w-full bg-[#FFF8F1] py-8 sm:py-10 border-y border-[#E8D4B5]/50 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-4 sm:gap-8 text-center">
                  <div className="hidden sm:flex items-center gap-2 opacity-80 shrink-0">
                    <span className="material-symbols-outlined text-2xl text-[#173D32] -rotate-45">eco</span>
                    <span className="material-symbols-outlined text-xl text-[#C59A45]">local_florist</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-label-sm text-[10px] tracking-[0.25em] uppercase text-[#7B5802] font-bold mb-1">
                      Sacred Formulation
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#00271d] font-normal tracking-wide">
                      The Essence of Sacred Botanicals
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#414845] max-w-lg mt-1.5 leading-relaxed">
                      Handcrafted with reverent care, using time-honored ingredients, cold-pressed virgin oils, and sacred herbs.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 opacity-80 shrink-0">
                    <span className="material-symbols-outlined text-xl text-[#C59A45]">local_florist</span>
                    <span className="material-symbols-outlined text-2xl text-[#173D32] rotate-45">eco</span>
                  </div>
                </div>
              </div>

              {/* 3. ABOUT TEASER SECTION */}
              <section className="w-full py-12 lg:py-16 bg-[#FFF8F1]">
                <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
                  <div className="rounded-3xl bg-white/85 border border-[#E8D4B5] p-8 sm:p-12 lg:p-14 shadow-[0_12px_36px_rgba(57,37,29,0.06)] relative overflow-hidden text-center">
                    <div className="inline-flex items-center gap-2 mb-3 px-4 py-1 rounded-full bg-[#FAF5EB] border border-[#C59A45]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
                      <span className="font-label-sm text-[11px] uppercase tracking-[0.2em] text-[#7B5802] font-semibold">
                        Heritage & Devotion
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl text-[#00271d] font-semibold tracking-tight mb-4">
                      About Ananta Vijaya &amp; Lotica Glow
                    </h2>

                    <p className="font-sans text-sm sm:text-base text-[#414845] max-w-3xl mx-auto leading-relaxed mb-6">
                      Born from a deep reverence for classical Indian Ayurveda and temple traditions, Ananta Vijaya’s Lotica Glow collection is a celebration of conscious purity. We handcraft each soap using time-honored cold process methods, infusing consecrated herbs, pure essential oils, and nourishing plant butters.
                    </p>

                    <button
                      onClick={() => navigateTo('our-story')}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7B5802] hover:text-[#00271d] transition-colors mb-10 pb-1 border-b border-[#7B5802]"
                      type="button"
                    >
                      <span>Read Our Complete Story &amp; Heritage</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>

                    {/* 4 Feature/Stat Boxes */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#E8D4B5]/60">
                      <div className="p-4 rounded-xl bg-[#FFF8F1] border border-[#E8D4B5]/80 flex flex-col items-center">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">100%</span>
                        <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#7B5802] font-semibold mt-1">
                          Pure Botanicals
                        </span>
                        <span className="text-[11px] text-[#414845]/80 mt-0.5">Cold-pressed plant oils</span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FFF8F1] border border-[#E8D4B5]/80 flex flex-col items-center">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">4–6 Wks</span>
                        <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#7B5802] font-semibold mt-1">
                          Cold Cured
                        </span>
                        <span className="text-[11px] text-[#414845]/80 mt-0.5">Patient artisanal slow aging</span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FFF8F1] border border-[#E8D4B5]/80 flex flex-col items-center">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">100%</span>
                        <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#7B5802] font-semibold mt-1">
                          Vegan &amp; Ethical
                        </span>
                        <span className="text-[11px] text-[#414845]/80 mt-0.5">Cruelty-free &amp; no animal fat</span>
                      </div>

                      <div className="p-4 rounded-xl bg-[#FFF8F1] border border-[#E8D4B5]/80 flex flex-col items-center">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">Small</span>
                        <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#7B5802] font-semibold mt-1">
                          Batch Poured
                        </span>
                        <span className="text-[11px] text-[#414845]/80 mt-0.5">Hand-cut in limited quantities</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. EXPLORE THE LADWA GLOW SOAP COLLECTION (Exact Match to Screenshot 2) */}
              <section id="collection" className="w-full bg-[#FAF5EB] py-14 lg:py-20 relative overflow-hidden scroll-mt-24">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                  <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 lg:mb-12">
                    <div className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-[#E8D4B5]/60 border border-[#C59A45]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
                      <span className="font-label-sm text-[11px] uppercase tracking-[0.2em] text-[#7B5802] font-semibold">
                        Five Sacred Formulations
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173D32] tracking-tight mb-3">
                      Explore the Lotica Glow Soap Collection
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-[#414845] max-w-xl">
                      Handcrafted with divine botanicals, cold-pressed oils, and sacred herbs. Choose the perfect bar for your skin and spirit.
                    </p>
                  </div>

                  {/* 3-Column Luxury Interactive Showcase */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* LEFT COLUMN: Product Details */}
                    <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 bg-white/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-2xl lg:rounded-none border border-[#E8D4B5]/60 lg:border-none shadow-sm lg:shadow-none">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-[#C59A45] text-sm">
                          {"★".repeat(5)}
                        </div>
                        <span className="text-xs font-semibold text-[#173D32]">
                          {currentSoap.rating} ({currentSoap.reviewsCount} reviews)
                        </span>
                      </div>

                      <h3
                        className="font-serif text-3xl sm:text-4xl text-[#173D32] font-bold tracking-tight mb-1 transition-opacity duration-300"
                        style={{ opacity: animating ? 0 : 1 }}
                      >
                        {currentSoap.title}
                      </h3>

                      <p
                        className="font-sans text-xs uppercase tracking-widest text-[#7B5802] font-semibold mb-3 transition-opacity duration-300"
                        style={{ opacity: animating ? 0 : 1 }}
                      >
                        {currentSoap.subtitle} • {currentSoap.tagline}
                      </p>

                      <p
                        className="font-sans text-sm leading-relaxed text-[#414845] mb-5 transition-opacity duration-300 min-h-[64px]"
                        style={{ opacity: animating ? 0 : 1 }}
                      >
                        {currentSoap.desc}
                      </p>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap sm:flex-nowrap mb-4">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">
                          {currentSoap.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {currentSoap.originalPrice}
                        </span>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          {currentSoap.discount}
                        </span>
                        <span className="text-xs text-[#7B5802] font-medium ml-auto">
                          (125g Cold-Cured Bar)
                        </span>
                      </div>

                      {/* Quantity & CTA */}
                      <div className="flex items-center gap-2 sm:gap-3 mb-6">
                        <div className="flex items-center border border-[#E8D4B5] rounded-full bg-[#FFF8F1] px-1.5 sm:px-2 py-1 shrink-0">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-lg font-bold text-[#173D32] hover:bg-[#E8D4B5]/50 transition-colors"
                          >
                            –
                          </button>
                          <span className="w-6 sm:w-8 text-center font-bold text-xs sm:text-sm text-[#173D32]">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQuantity((q) => q + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-lg font-bold text-[#173D32] hover:bg-[#E8D4B5]/50 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => addToCart(currentSoap, quantity)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#173D32] hover:bg-[#39251D] text-white font-label-md text-xs uppercase tracking-wider sm:tracking-widest px-4 sm:px-6 py-3 sm:py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 group"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:scale-110">
                            shopping_bag
                          </span>
                          <span>Add to Bag</span>
                        </button>

                        <button
                          aria-label="Add to Wishlist"
                          onClick={() => toggleWishlist(currentSoap.title)}
                          className="p-3 sm:p-3.5 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] text-[#173D32] hover:text-[#C59A45] bg-[#FFF8F1] transition-colors flex items-center justify-center shadow-sm shrink-0"
                          type="button"
                        >
                          <span className={`material-symbols-outlined text-[18px] sm:text-[20px] ${wishlist.includes(currentSoap.title) ? 'text-[#C59A45] fill-current' : ''}`}>
                            favorite
                          </span>
                        </button>
                      </div>

                      {/* Key Benefits Checklist */}
                      <div className="flex flex-col gap-2.5 pt-4 border-t border-[#E8D4B5]/80">
                        {currentSoap.benefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-[#414845]">
                            <span className="material-symbols-outlined text-[#7B5802] text-[16px] shrink-0">
                              check_circle
                            </span>
                            <span className="font-semibold text-[#173D32]">{b.title}:</span>
                            <span className="truncate">{b.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CENTER COLUMN: Dominant Showcase Stage */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 relative py-2 sm:py-4">
                      <div className="relative w-full max-w-[300px] sm:max-w-[420px] aspect-[4/5] flex items-center justify-center">
                        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#E8D4B5]/70 via-[#F5E8D0] to-[#E8D4B5]/50 blur-xl opacity-90 pointer-events-none"></div>
                        <div className="absolute inset-8 rounded-full border border-[#C59A45]/30 pointer-events-none"></div>
                        <div className="absolute inset-16 rounded-full border border-[#C59A45]/20 border-dashed pointer-events-none"></div>

                        <div className="absolute bottom-8 sm:bottom-10 inset-x-6 sm:inset-x-8 h-10 sm:h-12 bg-gradient-to-b from-[#E8D4B5] to-[#cbb28d] rounded-[50%] shadow-[0_24px_30px_rgba(57,37,29,0.22)] z-10 border-t border-white/50"></div>
                        <div className="absolute bottom-5 sm:bottom-6 inset-x-10 sm:inset-x-12 h-6 sm:h-8 bg-gradient-to-b from-[#d9be95] to-[#bca076] rounded-[50%] shadow-[0_12px_20px_rgba(57,37,29,0.28)] z-10"></div>
                        <div className="absolute bottom-2 inset-x-14 sm:inset-x-16 h-3 sm:h-4 bg-[#39251D]/25 blur-md rounded-full z-0"></div>

                        <div className="relative z-20 w-full flex items-center justify-center px-4 sm:px-6 pb-8 sm:pb-12">
                          <img
                            alt={currentSoap.title}
                            className="floating-product w-auto max-h-[250px] sm:max-h-[350px] lg:max-h-[410px] object-contain drop-shadow-[0_28px_32px_rgba(23,61,50,0.32)] transition-all duration-500 transform hover:scale-105 cursor-pointer"
                            src={currentSoap.boxImage}
                            style={{ opacity: animating ? 0 : 1 }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        {SOAP_PRODUCTS.map((_, i) => (
                          <button
                            key={i}
                            aria-label={`Go to soap ${i + 1}`}
                            className={
                              i === activeSoapIndex
                                ? "w-8 h-2 rounded-full bg-[#173D32] transition-all duration-300"
                                : "w-2 h-2 rounded-full bg-[#E8D4B5] hover:bg-[#C59A45]/60 transition-all duration-300"
                            }
                            onClick={() => selectSoap(i)}
                            type="button"
                          ></button>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Vertical 5-Item Soap Selector */}
                    <div className="lg:col-span-3 flex flex-col order-3">
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E8D4B5]">
                        <div>
                          <h4 className="font-serif text-base text-[#173D32] font-semibold">Select Formulation</h4>
                          <span className="text-xs text-[#7B5802]/80">5 Sacred Varieties</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            aria-label="Previous product"
                            className="w-8 h-8 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] hover:bg-[#E8D4B5]/40 flex items-center justify-center text-[#173D32] transition-colors"
                            onClick={prevSoap}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
                          </button>
                          <button
                            aria-label="Next product"
                            className="w-8 h-8 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] hover:bg-[#E8D4B5]/40 flex items-center justify-center text-[#173D32] transition-colors"
                            onClick={nextSoap}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        {SOAP_PRODUCTS.map((soap, i) => {
                          const isCurrent = i === activeSoapIndex;
                          return (
                            <div
                              key={i}
                              className={
                                isCurrent
                                  ? "cursor-pointer p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-3 bg-[#173D32] border-[#C59A45] shadow-md ring-2 ring-[#C59A45]/30 transform scale-[1.02]"
                                  : "cursor-pointer p-2.5 rounded-xl border border-transparent hover:border-[#C59A45]/50 transition-all duration-300 flex items-center gap-3 bg-[#E8D4B5]/50 hover:bg-[#E8D4B5]"
                              }
                              onClick={() => selectSoap(i)}
                            >
                              <div className="w-12 h-14 bg-white/20 rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden">
                                <img alt={soap.title} className="h-full w-auto object-contain drop-shadow" src={soap.boxImage} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h5 className={isCurrent ? "text-sm font-semibold truncate text-[#FAF5EB]" : "text-sm font-semibold truncate text-[#173D32]"}>
                                    {soap.title}
                                  </h5>
                                  <span className={isCurrent ? "text-xs font-bold text-[#fdcd73]" : "text-xs font-semibold text-[#7B5802]"}>
                                    {soap.price}
                                  </span>
                                </div>
                                <p className={isCurrent ? "text-[11px] truncate text-[#81a899]" : "text-[11px] truncate text-[#414845]"}>
                                  {soap.subtitle}
                                </p>
                              </div>
                              <span className={isCurrent ? "material-symbols-outlined text-[#fdcd73] text-[18px] shrink-0" : "material-symbols-outlined text-transparent text-[18px] shrink-0"}>
                                check_circle
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. THE DIVINE COLLECTION GIFT BOX (Exact Match to Screenshot 3) */}
              <section className="w-full bg-[#173D32] py-14 lg:py-20 text-[#FFF8F1] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C59A45]/15 blur-3xl pointer-events-none"></div>

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Side: 5-Soap Luxury Box Presentation Display */}
                    <div className="lg:col-span-6 flex items-center justify-center">
                      <div className="relative w-full max-w-[560px] bg-black/25 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#C59A45]/40 shadow-2xl backdrop-blur-sm">
                        <div className="flex items-center justify-center gap-1 sm:gap-2 select-none">
                          <img alt="Kadamba Soap" className="w-[18%] h-auto object-contain drop-shadow-lg -rotate-3 transform hover:scale-105 transition-transform" src={ASSETS.kadambaBox} />
                          <img alt="Bilvam Soap" className="w-[19%] h-auto object-contain drop-shadow-lg -rotate-1 transform hover:scale-105 transition-transform" src={ASSETS.bilvamBox} />
                          <img alt="Kamalam Soap" className="w-[24%] h-auto object-contain drop-shadow-2xl z-10 scale-105 transform hover:scale-110 transition-transform" src={ASSETS.kamalamBox} />
                          <img alt="Vibhudi Soap" className="w-[19%] h-auto object-contain drop-shadow-lg rotate-1 transform hover:scale-105 transition-transform" src={ASSETS.vibhudiBox} />
                          <img alt="Rudraksha Soap" className="w-[18%] h-auto object-contain drop-shadow-lg rotate-3 transform hover:scale-105 transition-transform" src={ASSETS.rudrakshaBox} />
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#C59A45]/30 flex items-center justify-between text-xs text-[#ffdea6]">
                          <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#fdcd73] text-[16px]">redeem</span>
                            Handcrafted Rigid Box
                          </span>
                          <span className="font-medium bg-[#C59A45]/20 px-2.5 py-0.5 rounded-full border border-[#C59A45]/30">
                            Festive Collector’s Edition
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Editorial Narrative & Pricing CTAs */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span className="w-6 h-[1px] bg-[#C59A45]"></span>
                        <span className="font-label-sm text-xs uppercase tracking-[0.22em] text-[#ffdea6] font-semibold">
                          Special Festive Edition
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FFF8F1] mb-2">
                        The Divine Collection
                      </h2>
                      <p className="font-serif italic text-lg sm:text-xl text-[#fdcd73] mb-4">
                        All 5 Sacred Soaps Gift Box
                      </p>

                      <p className="font-sans text-sm sm:text-base text-[#c2ebdb] max-w-lg mb-6 leading-relaxed">
                        Experience the complete spectrum of botanical wellness with our curated 5-bar collector’s edition. Each bar represents an ancient blessing for your skin, crafted slowly with consecrated herbs.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF5EB]">
                          <span className="material-symbols-outlined text-[#fdcd73] text-[18px]">verified</span>
                          <span>5 Full-Sized 125g Bars</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF5EB]">
                          <span className="material-symbols-outlined text-[#fdcd73] text-[18px]">redeem</span>
                          <span>Handcrafted Gift Box</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF5EB]">
                          <span className="material-symbols-outlined text-[#fdcd73] text-[18px]">spa</span>
                          <span>Free Carved Teakwood Dish</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF5EB]">
                          <span className="material-symbols-outlined text-[#fdcd73] text-[18px]">local_shipping</span>
                          <span>Free Express Delivery</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                        <button
                          onClick={addDivineBoxToCart}
                          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C59A45] hover:bg-[#b08638] text-[#173D32] font-serif font-bold text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                          type="button"
                        >
                          <span>Order Divine Box — ₹1,199</span>
                          <span className="material-symbols-outlined text-[18px]">east</span>
                        </button>

                        <a
                          href="https://wa.me/917386759777?text=Hello%2C%20I%20would%20like%20to%20order%20the%20Divine%20Collection%20Gift%20Box"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-[#ffdea6]/60 hover:bg-[#ffdea6]/10 text-[#ffdea6] font-label-md text-xs uppercase tracking-widest rounded-full transition-colors"
                        >
                          <span>Gift To Loved Ones</span>
                          <span className="material-symbols-outlined text-[16px]">favorite</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. WHY CHOOSE LADWA GLOW? (4 Value Pillars) */}
              <section className="w-full bg-[#FAF5EB] py-14 lg:py-20 border-y border-[#E8D4B5]/50">
                <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
                  <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-[#E8D4B5]/60 border border-[#C59A45]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
                      <span className="font-label-sm text-[11px] uppercase tracking-[0.2em] text-[#7B5802] font-semibold">
                        Our Commitment
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#00271d] font-semibold tracking-tight mb-2">
                      Why Choose Lotica Glow?
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-[#414845]">
                      Rooted in tradition, verified by modern standards of safety, ethics, and sustainability.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8D4B5] hover:border-[#C59A45] hover:-translate-y-1.5 transition-all duration-300 shadow-sm flex flex-col items-start group">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF5EB] group-hover:bg-[#173D32] flex items-center justify-center text-[#7B5802] group-hover:text-[#ffdea6] transition-colors mb-4 shadow-sm">
                        <span className="material-symbols-outlined text-[26px]">eco</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#173D32] mb-2">
                        Handcrafted in Small Batches
                      </h3>
                      <p className="text-xs sm:text-sm text-[#414845] leading-relaxed">
                        Every single bar is hand-poured, hand-cut, and cured for 4 to 6 weeks to preserve natural skin-nourishing glycerin.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8D4B5] hover:border-[#C59A45] hover:-translate-y-1.5 transition-all duration-300 shadow-sm flex flex-col items-start group">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF5EB] group-hover:bg-[#173D32] flex items-center justify-center text-[#7B5802] group-hover:text-[#ffdea6] transition-colors mb-4 shadow-sm">
                        <span className="material-symbols-outlined text-[26px]">verified_user</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#173D32] mb-2">
                        Traditional &amp; Mindfully Formulated
                      </h3>
                      <p className="text-xs sm:text-sm text-[#414845] leading-relaxed">
                        Zero harsh sulfates, parabens, phthalates, synthetic foaming agents, or artificial dyes. Pure nature only.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8D4B5] hover:border-[#C59A45] hover:-translate-y-1.5 transition-all duration-300 shadow-sm flex flex-col items-start group">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF5EB] group-hover:bg-[#173D32] flex items-center justify-center text-[#7B5802] group-hover:text-[#ffdea6] transition-colors mb-4 shadow-sm">
                        <span className="material-symbols-outlined text-[26px]">water_drop</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#173D32] mb-2">
                        Cold-Pressed Plant Oils
                      </h3>
                      <p className="text-xs sm:text-sm text-[#414845] leading-relaxed">
                        Enriched with unrefined coconut, sesame, castor, and almond oils that penetrate deeply to restore skin barrier health.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8D4B5] hover:border-[#C59A45] hover:-translate-y-1.5 transition-all duration-300 shadow-sm flex flex-col items-start group">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF5EB] group-hover:bg-[#173D32] flex items-center justify-center text-[#7B5802] group-hover:text-[#ffdea6] transition-colors mb-4 shadow-sm">
                        <span className="material-symbols-outlined text-[26px]">self_improvement</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#173D32] mb-2">
                        Sacred Ayurvedic Inspiration
                      </h3>
                      <p className="text-xs sm:text-sm text-[#414845] leading-relaxed">
                        Infused with auspicious consecrated herbs traditionally revered for their spiritual centering and skin wellness.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 7. COMING SOON SECTION */}
              <section className="w-full bg-[#FFF8F1] py-14 lg:py-20">
                <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
                  <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-[#FAF5EB] border border-[#C59A45]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
                      <span className="font-label-sm text-[11px] uppercase tracking-[0.2em] text-[#7B5802] font-semibold">
                        Future Offerings
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#00271d] font-semibold tracking-tight mb-2">
                      Coming Soon
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-[#414845]">
                      Expanding our sacred wellness range to complement your daily mindful bathing rituals.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                    {COMING_SOON_PRODUCTS.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white border border-[#E8D4B5]/80 hover:border-[#C59A45] hover:shadow-md transition-all flex flex-col justify-between text-center items-center group"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#FAF5EB] flex items-center justify-center text-[#7B5802] group-hover:bg-[#173D32] group-hover:text-[#ffdea6] transition-colors mb-3">
                          <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-serif text-base font-bold text-[#173D32] mb-1">
                            {item.title}
                          </h4>
                          <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#7B5802] block mb-2 font-medium">
                            {item.tagline}
                          </span>
                          <p className="text-xs text-[#414845] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-widest text-[#7B5802] bg-[#FAF5EB] px-3 py-1 rounded-full border border-[#E8D4B5]">
                          In Development
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 8. NEWSLETTER */}
              <section className="w-full bg-[#FFF8F1] pb-14 lg:pb-16">
                <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
                  <div className="rounded-3xl bg-[#173D32] p-8 sm:p-12 text-[#FFF8F1] text-center border border-[#C59A45]/40 shadow-xl relative overflow-hidden">
                    <div className="max-w-xl mx-auto relative z-10">
                      <span className="font-label-sm text-[10px] uppercase tracking-[0.25em] text-[#ffdea6] font-bold mb-2 block">
                        Join Our Inner Circle
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-white">
                        Receive Festival Offers &amp; Brand Updates
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#c2ebdb] mb-6 leading-relaxed">
                        Join our sanctuary for exclusive seasonal launches, limited festive hampers, and Ayurvedic wellness insights delivered mindfully.
                      </p>

                      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2.5 max-w-md mx-auto">
                        <input
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full px-5 py-3 rounded-full bg-white/10 border border-[#C59A45]/50 text-white placeholder:text-[#c2ebdb]/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#fdcd73]"
                        />
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#C59A45] hover:bg-[#b08638] text-[#173D32] font-semibold text-xs uppercase tracking-widest transition-all shrink-0 shadow-md"
                        >
                          {subscribed ? "Subscribed!" : "Subscribe"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ============================================================ */}
          {/* PAGE 2: OUR STORY PAGE */}
          {/* ============================================================ */}
          {(currentRoute.page === 'about' || currentRoute.page === 'our-story') && (
            <div className="w-full pb-8 lg:pb-12 relative overflow-hidden">
              {/* Story Hero Header with Ethereal Subtle Ambient Motion */}
              <div className="w-full bg-[#FFF2DB] pt-6 sm:pt-8 pb-10 sm:pb-12 border-b border-[#E8D4B5]/60 mb-10 relative overflow-hidden">
                {/* Subtle ambient rotating mandala watermark in background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] pointer-events-none opacity-[0.06] select-none z-0">
                  <img alt="Mandala Aura" className="w-full h-full object-contain animate-slow-spin" src={ASSETS.lotusMandala} />
                </div>

                {/* Gentle floating leaves on margins (non-intrusive) */}
                <div className="absolute top-6 left-6 sm:left-14 opacity-30 pointer-events-none animate-leaf-sway hidden md:block">
                  <img alt="Leaf" className="w-16 h-auto object-contain drop-shadow-sm" src={ASSETS.bilvamLeaves} />
                </div>
                <div className="absolute bottom-4 right-6 sm:right-14 opacity-30 pointer-events-none animate-leaf-sway hidden md:block scale-x-[-1]">
                  <img alt="Leaf" className="w-16 h-auto object-contain drop-shadow-sm" src={ASSETS.bilvamLeaves} />
                </div>

                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 mb-4 relative z-10 text-left">
                  <Breadcrumbs
                    items={[
                      { label: "Home", page: "home" },
                      { label: "About Us", page: "about" }
                    ]}
                    onNavigate={(p) => navigateTo(p)}
                  />
                </div>
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
                  <div className="inline-flex items-center gap-2 mb-3 px-4 py-1 rounded-full bg-[#FAF5EB] border border-[#C59A45]/30 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45] animate-pulse"></span>
                    <span className="font-label-sm text-[11px] uppercase tracking-[0.2em] text-[#7B5802] font-semibold">
                      Ananta Vijaya • Lotica Glow Heritage
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45] animate-pulse"></span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00271d] font-bold tracking-tight mb-3">
                    About Ananta Vijaya | Lotica Glow Personal Care
                  </h1>
                  <p className="font-serif italic text-base sm:text-xl text-[#7B5802] max-w-2xl mx-auto mb-2">
                    "Bathing is not merely cleansing of the body, but purification of the spirit."
                  </p>
                  <p className="text-xs sm:text-sm text-[#414845] max-w-xl mx-auto">
                    Discover Ananta Vijaya Private Limited and Lotica Glow, a growing personal-care brand inspired by Indian tradition and nature based in Hyderabad, Telangana.
                  </p>
                  <p className="font-serif italic text-lg sm:text-2xl text-[#7B5802] max-w-2xl mx-auto mb-3">
                    "Bathing is not merely cleansing of the body, but purification of the spirit."
                  </p>
                  <span className="font-label-sm text-xs text-[#414845] uppercase tracking-widest block">
                    Inspired by Classical Ayurvedic Texts • Charaka Samhita
                  </span>
                </div>
              </div>

              {/* Main Narrative Articles */}
              <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14 relative z-10">
                {/* Chapter 1: The Inspiration with Gentle Floating Editorial Image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-6 flex flex-col gap-4">
                    <div className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C59A45] animate-pulse"></span>
                      <span className="font-label-sm text-xs uppercase tracking-widest text-[#7B5802] font-bold">
                        Chapter I • The Calling
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#173D32] font-semibold">
                      A Return to Consecrated Purity
                    </h2>
                    <p className="text-sm sm:text-base text-[#414845] leading-relaxed">
                      In a modern world overwhelmed by chemical cleansers, artificial foaming agents, and mass-produced detergents disguised as soap, <strong>Ananta Vijaya</strong> was founded on a simple, reverent truth: our skin deserves the same purity we bring to our sacred spaces.
                    </p>
                    <p className="text-sm sm:text-base text-[#414845] leading-relaxed">
                      Rooted in the ancient temple traditions of Bharat, we looked to the timeless ritual of <em>Snana</em> (sacred bath), where cooling bilva leaves, fragrant wild lotus, sacred ash, and therapeutic botanicals were used to purify the body, elevate prana, and bring tranquility to the spirit.
                    </p>
                  </div>

                  {/* Right Column: Editorial Image with Non-disturbing Gentle Float & Hover Parallax */}
                  <div className="lg:col-span-6 relative flex items-center justify-center">
                    {/* Subtle ambient breathing glow aura behind image (hardware accelerated, 0 layout shift) */}
                    <div className="absolute -inset-3 bg-gradient-to-tr from-[#fdcd73]/20 via-[#E8D4B5]/30 to-transparent blur-2xl rounded-3xl pointer-events-none animate-soft-glow"></div>

                    {/* Floating Sanctuary Card */}
                    <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-[#E8D4B5] group animate-gentle-float bg-[#FAF5EB] transition-all duration-500 hover:shadow-2xl">
                      <img
                        alt="Sanctuary Bathing Still Life"
                        className="w-full h-[360px] sm:h-[390px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        src={ASSETS.sanctuaryRitual}
                      />
                      {/* Subtle corner badge tag with leaf icon */}
                      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-[#173D32]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C59A45]/40 text-[#ffdea6] text-[11px] shadow-lg pointer-events-none">
                        <span className="material-symbols-outlined text-[15px] text-[#fdcd73] animate-pulse">spa</span>
                        <span className="font-medium tracking-wider uppercase">Handcrafted Sacred Sanctuary</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chapter 2: The 45-Day Cold Process Craft */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-6 order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-xl border border-[#E8D4B5] bg-[#FAF5EB] p-8 sm:p-10 flex flex-col justify-center items-center text-center group hover:border-[#C59A45] transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/80 shadow-md flex items-center justify-center mb-4 border border-[#C59A45]/30 group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-4xl text-[#C59A45] animate-pulse">hourglass_top</span>
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#173D32] mb-1">45 Days</h3>
                    <span className="font-label-sm text-xs uppercase tracking-widest text-[#7B5802] font-semibold mb-3">
                      Slow Cold-Process Curing
                    </span>
                    <p className="text-xs sm:text-sm text-[#414845] leading-relaxed max-w-sm">
                      Unlike commercial hot-pour factory bars that strip out natural glycerin, each bar of Lotica Glow rests untouched in our temperature-controlled curing chambers for 6 weeks, retaining 100% of its moisture-rich plant glycerin.
                    </p>
                  </div>
                  <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-4">
                    <div className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C59A45] animate-pulse"></span>
                      <span className="font-label-sm text-xs uppercase tracking-widest text-[#7B5802] font-bold">
                        Chapter II • The Method
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#173D32] font-semibold">
                      The Patience of Cold Saponification
                    </h2>
                    <p className="text-sm sm:text-base text-[#414845] leading-relaxed">
                      We do not use chemical accelerators or artificial hardeners. Our saponification is a living, breathing artisan craft. Virgin cold-pressed coconut oil, raw sesame oil, sweet almond oil, and unrefined kokum butters are blended at ambient room temperature.
                    </p>
                    <p className="text-sm sm:text-base text-[#414845] leading-relaxed">
                      This preserves delicate botanical flavonoids, essential fatty acids, and active herbal tannins. Each slab is hand-poured into wooden molds, cut by hand with wire cutters, and stamped with our sacred seal.
                    </p>
                  </div>
                </div>

                {/* Chapter 3: Our 5 Auspicious Offerings */}
                <div className="bg-[#FAF5EB] rounded-3xl p-8 sm:p-12 border border-[#E8D4B5] text-center">
                  <span className="font-label-sm text-xs uppercase tracking-widest text-[#7B5802] font-bold block mb-2">
                    Chapter III • The Formulations
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#173D32] font-semibold mb-6">
                    The Five Sacred Blessings
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {SOAP_PRODUCTS.map((soap, i) => (
                      <div
                        key={soap.id}
                        onClick={() => {
                          selectSoap(i);
                          navigateTo('our-soaps');
                        }}
                        className="p-5 rounded-2xl bg-white border border-[#E8D4B5] hover:border-[#C59A45] hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center shadow-sm"
                      >
                        <img alt={soap.title} className="h-28 w-auto object-contain mb-3" src={soap.boxImage} />
                        <h4 className="font-serif text-base font-bold text-[#173D32]">{soap.title}</h4>
                        <span className="text-[11px] text-[#7B5802] font-medium mt-1">{soap.subtitle}</span>
                        <span className="mt-3 text-xs font-bold text-[#173D32] bg-[#FAF5EB] px-3 py-1 rounded-full">
                          View Details →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to action */}
                <div className="text-center pt-6">
                  <button
                    onClick={() => navigateTo('our-soaps')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#173D32] hover:bg-[#39251D] text-white font-label-md text-xs uppercase tracking-widest rounded-full shadow-lg transition-all"
                    type="button"
                  >
                    <span>Experience The Soaps</span>
                    <span className="material-symbols-outlined text-[18px]">east</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PAGE 3: OUR SOAPS PAGE */}
          {/* ============================================================ */}
          {(currentRoute.page === 'shop' || currentRoute.page === 'our-soaps') && (
            <div className="w-full">
              {/* Header banner */}
              <div className="w-full bg-[#FFF2DB] pt-4 sm:pt-6 pb-6 sm:pb-8 border-b border-[#E8D4B5]/60 mb-6">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
                  <Breadcrumbs
                    items={[
                      { label: "Home", page: "home" },
                      { label: "Shop", page: "shop" }
                    ]}
                    onNavigate={(p) => navigateTo(p)}
                  />
                  <div className="text-center max-w-2xl mx-auto mt-2">
                    <span className="font-label-sm text-[11px] uppercase tracking-[0.25em] text-[#7B5802] font-bold mb-1 block">
                      Lotica Glow Collection • Hyderabad
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00271d] font-bold mb-2">
                      Shop Lotica Glow Soaps | Five Unique Soap Varieties
                    </h1>
                    <p className="font-sans text-xs sm:text-sm text-[#414845] max-w-xl mx-auto">
                      Explore Vibhudi, Bilvam, Kamalam, Kadamba and Rudraksha soaps from the Lotica Glow collection. Select any soap to view verified ingredients and purchase.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Exact 3-Column Interactive Showcase (Screenshot 2) */}
              <section id="collection" className="w-full bg-[#FAF5EB] py-10 lg:py-16 relative overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* LEFT COLUMN: Product Details */}
                    <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 bg-white/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-2xl lg:rounded-none border border-[#E8D4B5]/60 lg:border-none shadow-sm lg:shadow-none">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-[#C59A45] text-sm">
                          {"★".repeat(5)}
                        </div>
                        <span className="text-xs font-semibold text-[#173D32]">
                          {currentSoap.rating} ({currentSoap.reviewsCount} reviews)
                        </span>
                      </div>

                      <h2
                        className="font-serif text-3xl sm:text-4xl text-[#173D32] font-bold tracking-tight mb-1 transition-opacity duration-300"
                        style={{ opacity: animating ? 0 : 1 }}
                      >
                        {currentSoap.title}
                      </h2>

                      <p
                        className="font-sans text-xs uppercase tracking-widest text-[#7B5802] font-semibold mb-3 transition-opacity duration-300"
                        style={{ opacity: animating ? 0 : 1 }}
                      >
                        {currentSoap.subtitle} • {currentSoap.tagline}
                      </p>

                      <p
                        className="font-sans text-sm leading-relaxed text-[#414845] mb-5 transition-opacity duration-300 min-h-[64px]"
                        style={{ opacity: animating ? 0 : 1 }}
                      >
                        {currentSoap.desc}
                      </p>

                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="font-serif text-3xl font-bold text-[#173D32]">
                          {currentSoap.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {currentSoap.originalPrice}
                        </span>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          {currentSoap.discount}
                        </span>
                        <span className="text-xs text-[#7B5802] font-medium ml-auto">
                          (125g Cold-Cured Bar)
                        </span>
                      </div>

                      {/* Quantity & CTA */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center border border-[#E8D4B5] rounded-full bg-[#FFF8F1] px-2 py-1">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-[#173D32] hover:bg-[#E8D4B5]/50 transition-colors"
                          >
                            –
                          </button>
                          <span className="w-8 text-center font-bold text-sm text-[#173D32]">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQuantity((q) => q + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-[#173D32] hover:bg-[#E8D4B5]/50 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => addToCart(currentSoap, quantity)}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#173D32] hover:bg-[#39251D] text-white font-label-md text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 group"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:scale-110">
                            shopping_bag
                          </span>
                          <span>Add to Bag</span>
                        </button>

                        <button
                          aria-label="Add to Wishlist"
                          onClick={() => toggleWishlist(currentSoap.title)}
                          className="p-3.5 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] text-[#173D32] hover:text-[#C59A45] bg-[#FFF8F1] transition-colors flex items-center justify-center shadow-sm"
                          type="button"
                        >
                          <span className={`material-symbols-outlined text-[20px] ${wishlist.includes(currentSoap.title) ? 'text-[#C59A45] fill-current' : ''}`}>
                            favorite
                          </span>
                        </button>
                      </div>

                      <div className="flex flex-col gap-2.5 pt-4 border-t border-[#E8D4B5]/80">
                        {currentSoap.benefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-[#414845]">
                            <span className="material-symbols-outlined text-[#7B5802] text-[16px] shrink-0">
                              check_circle
                            </span>
                            <span className="font-semibold text-[#173D32]">{b.title}:</span>
                            <span className="truncate">{b.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CENTER COLUMN: Dominant Showcase Stage */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 relative py-2 sm:py-4">
                      <div className="relative w-full max-w-[300px] sm:max-w-[420px] aspect-[4/5] flex items-center justify-center">
                        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#E8D4B5]/70 via-[#F5E8D0] to-[#E8D4B5]/50 blur-xl opacity-90 pointer-events-none"></div>
                        <div className="absolute inset-8 rounded-full border border-[#C59A45]/30 pointer-events-none"></div>
                        <div className="absolute inset-16 rounded-full border border-[#C59A45]/20 border-dashed pointer-events-none"></div>

                        <div className="absolute bottom-8 sm:bottom-10 inset-x-6 sm:inset-x-8 h-10 sm:h-12 bg-gradient-to-b from-[#E8D4B5] to-[#cbb28d] rounded-[50%] shadow-[0_24px_30px_rgba(57,37,29,0.22)] z-10 border-t border-white/50"></div>
                        <div className="absolute bottom-5 sm:bottom-6 inset-x-10 sm:inset-x-12 h-6 sm:h-8 bg-gradient-to-b from-[#d9be95] to-[#bca076] rounded-[50%] shadow-[0_12px_20px_rgba(57,37,29,0.28)] z-10"></div>
                        <div className="absolute bottom-2 inset-x-14 sm:inset-x-16 h-3 sm:h-4 bg-[#39251D]/25 blur-md rounded-full z-0"></div>

                        <div className="relative z-20 w-full flex items-center justify-center px-4 sm:px-6 pb-8 sm:pb-12">
                          <img
                            alt={currentSoap.title}
                            className="floating-product w-auto max-h-[250px] sm:max-h-[350px] lg:max-h-[410px] object-contain drop-shadow-[0_28px_32px_rgba(23,61,50,0.32)] transition-all duration-500 transform hover:scale-105 cursor-pointer"
                            src={currentSoap.boxImage}
                            style={{ opacity: animating ? 0 : 1 }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        {SOAP_PRODUCTS.map((_, i) => (
                          <button
                            key={i}
                            aria-label={`Go to soap ${i + 1}`}
                            className={
                              i === activeSoapIndex
                                ? "w-8 h-2 rounded-full bg-[#173D32] transition-all duration-300"
                                : "w-2 h-2 rounded-full bg-[#E8D4B5] hover:bg-[#C59A45]/60 transition-all duration-300"
                            }
                            onClick={() => selectSoap(i)}
                            type="button"
                          ></button>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Vertical 5-Item Soap Selector */}
                    <div className="lg:col-span-3 flex flex-col order-3">
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E8D4B5]">
                        <div>
                          <h4 className="font-serif text-base text-[#173D32] font-semibold">Select Formulation</h4>
                          <span className="text-xs text-[#7B5802]/80">5 Sacred Varieties</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            aria-label="Previous product"
                            className="w-8 h-8 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] hover:bg-[#E8D4B5]/40 flex items-center justify-center text-[#173D32] transition-colors"
                            onClick={prevSoap}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
                          </button>
                          <button
                            aria-label="Next product"
                            className="w-8 h-8 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] hover:bg-[#E8D4B5]/40 flex items-center justify-center text-[#173D32] transition-colors"
                            onClick={nextSoap}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        {SOAP_PRODUCTS.map((soap, i) => {
                          const isCurrent = i === activeSoapIndex;
                          return (
                            <div
                              key={i}
                              className={
                                isCurrent
                                  ? "cursor-pointer p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-3 bg-[#173D32] border-[#C59A45] shadow-md ring-2 ring-[#C59A45]/30 transform scale-[1.02]"
                                  : "cursor-pointer p-2.5 rounded-xl border border-transparent hover:border-[#C59A45]/50 transition-all duration-300 flex items-center gap-3 bg-[#E8D4B5]/50 hover:bg-[#E8D4B5]"
                              }
                              onClick={() => selectSoap(i)}
                            >
                              <div className="w-12 h-14 bg-white/20 rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden">
                                <img alt={soap.title} className="h-full w-auto object-contain drop-shadow" src={soap.boxImage} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h5 className={isCurrent ? "text-sm font-semibold truncate text-[#FAF5EB]" : "text-sm font-semibold truncate text-[#173D32]"}>
                                    {soap.title}
                                  </h5>
                                  <span className={isCurrent ? "text-xs font-bold text-[#fdcd73]" : "text-xs font-semibold text-[#7B5802]"}>
                                    {soap.price}
                                  </span>
                                </div>
                                <p className={isCurrent ? "text-[11px] truncate text-[#81a899]" : "text-[11px] truncate text-[#414845]"}>
                                  {soap.subtitle}
                                </p>
                              </div>
                              <span className={isCurrent ? "material-symbols-outlined text-[#fdcd73] text-[18px] shrink-0" : "material-symbols-outlined text-transparent text-[18px] shrink-0"}>
                                check_circle
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Complete 5-Soap Grid Comparison Card Set */}
              <section className="w-full bg-[#FFF8F1] py-14 lg:py-20 border-t border-[#E8D4B5]">
                <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="font-label-sm text-[11px] uppercase tracking-[0.2em] text-[#7B5802] font-bold block mb-2">
                      Complete Range
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-[#173D32]">
                      Explore All 5 Varieties
                    </h3>
                    <p className="text-xs sm:text-sm text-[#414845] mt-1">
                      Compare formulations, primary botanical extracts, and find your ritual bar.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {SOAP_PRODUCTS.map((soap, index) => (
                      <div
                        key={soap.id}
                        className="bg-white rounded-2xl p-5 border border-[#E8D4B5] hover:border-[#C59A45] hover:shadow-xl transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-full aspect-square bg-[#FAF5EB] rounded-xl flex items-center justify-center p-3 mb-4">
                            <img alt={soap.title} className="max-h-40 w-auto object-contain drop-shadow" src={soap.boxImage} />
                          </div>
                          <h4 className="font-serif text-lg font-bold text-[#173D32]">{soap.title}</h4>
                          <span className="text-xs text-[#7B5802] font-semibold block mb-2">{soap.subtitle}</span>
                          <p className="text-xs text-[#414845] line-clamp-3 mb-3 leading-relaxed">{soap.desc}</p>
                        </div>

                        <div className="pt-3 border-t border-[#E8D4B5]/60">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-serif text-lg font-bold text-[#173D32]">{soap.price}</span>
                            <span className="text-[11px] text-gray-400 line-through">{soap.originalPrice}</span>
                          </div>
                          <button
                            onClick={() => addToCart(soap, 1)}
                            className="w-full py-2.5 bg-[#173D32] hover:bg-[#39251D] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                            <span>Add to Bag</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ============================================================ */}

          {/* ============================================================ */}
          {/* DEDICATED INDIVIDUAL PRODUCT PAGE (/products/:slug) */}
          {/* ============================================================ */}
          {currentRoute.page === 'product' && (
            <div className="w-full">
              {/* Breadcrumbs & Header Banner */}
              <div className="w-full bg-[#FFF2DB] pt-4 sm:pt-6 pb-6 sm:pb-8 border-b border-[#E8D4B5]/60 mb-6">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
                  <Breadcrumbs
                    items={[
                      { label: "Home", page: "home" },
                      { label: "Shop", page: "shop" },
                      { label: currentSoap.title, page: "product", slug: currentSoap.slug }
                    ]}
                    onNavigate={(p, s) => navigateTo(p, s)}
                  />
                  <div className="mt-3">
                    <div className="inline-flex items-center gap-2 mb-2 px-3.5 py-1 rounded-full bg-[#FAF5EB] border border-[#C59A45]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45] animate-pulse"></span>
                      <span className="font-label-sm text-[11px] uppercase tracking-[0.2em] text-[#7B5802] font-semibold">
                        {currentSoap.badge} • SKU: {currentSoap.sku}
                      </span>
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00271d] font-bold leading-tight">
                      {currentSoap.title} <span className="text-[#7B5802] font-normal italic text-2xl sm:text-3xl block sm:inline sm:ml-2">– {currentSoap.subtitle}</span>
                    </h1>
                    <p className="font-sans text-xs sm:text-sm text-[#414845] mt-2 max-w-2xl leading-relaxed">
                      {currentSoap.tagline}. Traditional cold-cured botanical bar by Ananta Vijaya – Lotica Glow, Hyderabad, Telangana.
                    </p>
                  </div>
                </div>
              </div>

              {/* Product 3-Column Luxury Interactive Showcase */}
              <section className="w-full bg-[#FAF5EB] py-8 lg:py-12 relative overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* LEFT COLUMN: Price, Reviews, Quantity, CTA, Key Benefits */}
                    <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 bg-white/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-2xl lg:rounded-none border border-[#E8D4B5]/60 lg:border-none shadow-sm lg:shadow-none">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-[#C59A45] text-sm">{"★".repeat(5)}</div>
                        <span className="text-xs font-semibold text-[#173D32]">
                          {currentSoap.rating} ({currentSoap.reviewsCount} customer reviews)
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl text-[#173D32] font-bold tracking-tight mb-1">
                        {currentSoap.title}
                      </h2>

                      <p className="font-sans text-xs uppercase tracking-widest text-[#7B5802] font-semibold mb-3">
                        {currentSoap.subtitle} • {currentSoap.tagline}
                      </p>

                      <p className="font-sans text-sm leading-relaxed text-[#414845] mb-5">
                        {currentSoap.desc}
                      </p>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="font-serif text-3xl font-bold text-[#173D32]">{currentSoap.price}</span>
                        <span className="text-sm text-gray-400 line-through">{currentSoap.originalPrice}</span>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          {currentSoap.discount}
                        </span>
                        <span className="text-xs text-[#7B5802] font-medium ml-auto">
                          (125g Traditional Bar)
                        </span>
                      </div>

                      {/* Quantity & CTA */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center border border-[#E8D4B5] rounded-full bg-[#FFF8F1] px-2 py-1">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-[#173D32] hover:bg-[#E8D4B5]/50 transition-colors"
                          >–</button>
                          <span className="w-8 text-center font-bold text-sm text-[#173D32]">{quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQuantity((q) => q + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-[#173D32] hover:bg-[#E8D4B5]/50 transition-colors"
                          >+</button>
                        </div>

                        <button
                          onClick={() => addToCart(currentSoap, quantity)}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#173D32] hover:bg-[#39251D] text-white font-label-md text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 group"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:scale-110">shopping_bag</span>
                          <span>Add to Bag</span>
                        </button>

                        <button
                          type="button"
                          aria-label="Add to Wishlist"
                          onClick={() => toggleWishlist(currentSoap.title)}
                          className="w-12 h-12 rounded-full border border-[#E8D4B5] flex items-center justify-center hover:bg-[#E8D4B5]/30 transition-colors"
                        >
                          <span className={wishlist.includes(currentSoap.title) ? "material-symbols-outlined text-rose-600 text-[20px]" : "material-symbols-outlined text-[#173D32] text-[20px]"}>
                            {wishlist.includes(currentSoap.title) ? 'favorite' : 'favorite_border'}
                          </span>
                        </button>
                      </div>

                      {/* 3 Key Benefits */}
                      <div className="space-y-3 pt-4 border-t border-[#E8D4B5]">
                        {currentSoap.benefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-[#7B5802] text-[18px] mt-0.5 shrink-0">{b.icon}</span>
                            <div>
                              <h4 className="text-xs font-bold text-[#173D32]">{b.title}</h4>
                              <p className="text-[11px] text-[#414845] leading-relaxed">{b.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Direct WhatsApp Ordering */}
                      <div className="mt-5 pt-3 border-t border-[#E8D4B5]">
                        <a
                          href={`https://wa.me/917386759777?text=${encodeURIComponent(`Hello, I would like to order ${currentSoap.title} (Qty: ${quantity}) from Lotica Glow.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick('Product Page')}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-[#173D32] hover:text-[#25D366] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[#25D366] text-[18px]">chat</span>
                          <span>Inquire or Buy on WhatsApp directly</span>
                        </a>
                      </div>
                    </div>

                    {/* MIDDLE COLUMN: Hero Soap Box Image with Pedestal & Floating Effect */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 relative py-4 lg:py-8">
                      <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                        <div className="absolute inset-0 bg-radial from-[#ffdea6]/50 via-transparent to-transparent rounded-full blur-2xl pointer-events-none"></div>
                        <img
                          src={currentSoap.boxImage}
                          alt={`Lotica Glow ${currentSoap.title} product packaging`}
                          className="w-auto h-[260px] sm:h-[300px] object-contain drop-shadow-[0_20px_30px_rgba(57,37,29,0.35)] relative z-10 floating-product"
                        />
                      </div>
                      {/* Pedestal Base */}
                      <div className="w-56 h-6 bg-[#C59A45]/30 rounded-[100%] blur-sm -mt-2"></div>
                      <span className="mt-3 text-[11px] text-[#7B5802] uppercase tracking-[0.2em] font-semibold">
                        Aged 45 Days • Small Batch Cured
                      </span>
                    </div>

                    {/* RIGHT COLUMN: Formulation Switcher & Other Soaps Navigation */}
                    <div className="lg:col-span-3 flex flex-col gap-3 order-3">
                      <span className="font-label-sm text-xs font-bold text-[#7B5802] uppercase tracking-wider">
                        Explore All 5 Formulations
                      </span>
                      <div className="flex flex-col gap-2">
                        {SOAP_PRODUCTS.map((soap, idx) => {
                          const isSelected = soap.slug === currentSoap.slug;
                          return (
                            <button
                              key={soap.id}
                              type="button"
                              onClick={() => {
                                selectSoap(idx);
                                navigateTo('product', soap.slug);
                              }}
                              className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${isSelected
                                  ? 'bg-[#173D32] text-[#FFF8F1] border-[#173D32] shadow-md'
                                  : 'bg-white hover:bg-[#FFF8F1] text-[#173D32] border-[#E8D4B5]'
                                }`}
                            >
                              <img
                                src={soap.boxImage}
                                alt={`Lotica Glow ${soap.title}`}
                                className="w-10 h-10 object-contain shrink-0 drop-shadow-sm"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className={`text-xs font-bold truncate ${isSelected ? 'text-[#ffdea6]' : 'text-[#173D32]'}`}>
                                    {soap.title}
                                  </span>
                                  <span className={`text-[11px] font-semibold ${isSelected ? 'text-[#fdcd73]' : 'text-[#7B5802]'}`}>
                                    {soap.price}
                                  </span>
                                </div>
                                <p className={`text-[10px] truncate ${isSelected ? 'text-[#c2ebdb]' : 'text-[#414845]'}`}>
                                  {soap.subtitle}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Product Detailed Ingredient Breakdown */}
              <section className="w-full bg-[#FFF8F1] py-12 border-t border-[#E8D4B5]/60">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-8">
                    <span className="font-label-sm text-[11px] uppercase tracking-[0.25em] text-[#7B5802] font-bold block mb-1">
                      Formulation Breakdown
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32]">
                      What Goes Into {currentSoap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#414845] mt-1">
                      Every ingredient is verified and chosen for its therapeutic Ayurvedic harmony.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentSoap.ingredients.map((ing, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-[#E8D4B5] flex items-center gap-3.5 shadow-xs">
                        <div className="w-10 h-10 rounded-full bg-[#FFF2DB] flex items-center justify-center text-[#7B5802] shrink-0">
                          <span className="material-symbols-outlined text-[20px]">{ing.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#173D32] truncate">{ing.name}</h4>
                          <p className="text-[11px] text-[#7B5802] font-medium">{ing.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ============================================================ */}
          {/* DEDICATED THE DIVINE COLLECTION PAGE (/divine-collection) */}
          {/* ============================================================ */}
          {currentRoute.page === 'divine-collection' && (
            <div className="w-full">
              {/* Breadcrumbs & Header Banner */}
              <div className="w-full bg-[#FFF2DB] pt-4 sm:pt-6 pb-6 sm:pb-8 border-b border-[#E8D4B5]/60 mb-6">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
                  <Breadcrumbs
                    items={[
                      { label: "Home", page: "home" },
                      { label: "The Divine Collection", page: "divine-collection" }
                    ]}
                    onNavigate={(p) => navigateTo(p)}
                  />
                  <div className="mt-3 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 mb-2 px-4 py-1 rounded-full bg-[#FAF5EB] border border-[#C59A45]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45] animate-pulse"></span>
                      <span className="font-label-sm text-[11px] uppercase tracking-[0.2em] text-[#7B5802] font-semibold">
                        Special Festive &amp; Celebration Edition • SKU: LG-GIFT-DIVINE-01
                      </span>
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00271d] font-bold leading-tight mb-2">
                      The Divine Collection – Premium Five-Soap Gift Box
                    </h1>
                    <p className="font-sans text-xs sm:text-sm text-[#414845] leading-relaxed max-w-2xl mx-auto">
                      Discover The Divine Collection, a premium five-soap gift box for weddings, return gifts, corporate gifting and festivals. Formulated and crafted in Hyderabad by Ananta Vijaya – Lotica Glow.
                    </p>
                  </div>
                </div>
              </div>

              {/* The Full Festive Collector Banner (Exact Match to Screenshot 3) */}
              <section className="w-full bg-[#173D32] py-14 lg:py-20 text-[#FFF8F1] relative overflow-hidden mb-12">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C59A45]/15 blur-3xl pointer-events-none"></div>

                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Side: 5-Soap Luxury Box Presentation Display */}
                    <div className="lg:col-span-6 flex items-center justify-center">
                      <div className="relative w-full max-w-[560px] bg-black/25 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#C59A45]/40 shadow-2xl backdrop-blur-sm">
                        <div className="flex items-center justify-center gap-1 sm:gap-2 select-none">
                          <img alt="Lotica Glow Kadamba Soap" className="w-[18%] h-auto object-contain drop-shadow-lg -rotate-3 transform hover:scale-105 transition-transform" src={ASSETS.kadambaBox} />
                          <img alt="Lotica Glow Bilvam Soap" className="w-[19%] h-auto object-contain drop-shadow-lg -rotate-1 transform hover:scale-105 transition-transform" src={ASSETS.bilvamBox} />
                          <img alt="Lotica Glow Kamalam Soap" className="w-[24%] h-auto object-contain drop-shadow-2xl z-10 scale-105 transform hover:scale-110 transition-transform" src={ASSETS.kamalamBox} />
                          <img alt="Lotica Glow Vibhudi Soap" className="w-[19%] h-auto object-contain drop-shadow-lg rotate-1 transform hover:scale-105 transition-transform" src={ASSETS.vibhudiBox} />
                          <img alt="Lotica Glow Rudraksha Soap" className="w-[18%] h-auto object-contain drop-shadow-lg rotate-3 transform hover:scale-105 transition-transform" src={ASSETS.rudrakshaBox} />
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#C59A45]/30 flex items-center justify-between text-xs text-[#ffdea6]">
                          <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#fdcd73] text-[16px]">redeem</span>
                            Handcrafted Rigid Box
                          </span>
                          <span className="font-medium bg-[#C59A45]/20 px-2.5 py-0.5 rounded-full border border-[#C59A45]/30">
                            Festive Collector’s Edition
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Editorial Narrative & Pricing CTAs */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 mb-3">
                        <span className="w-6 h-[1px] bg-[#C59A45]"></span>
                        <span className="font-label-sm text-xs uppercase tracking-[0.22em] text-[#ffdea6] font-semibold">
                          Special Festive Edition
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FFF8F1] mb-2">
                        The Divine Collection
                      </h2>
                      <p className="font-serif italic text-lg sm:text-xl text-[#fdcd73] mb-4">
                        All 5 Sacred Soaps Gift Box
                      </p>

                      <p className="font-sans text-sm sm:text-base text-[#c2ebdb] max-w-lg mb-6 leading-relaxed">
                        Experience the complete spectrum of botanical wellness with our curated 5-bar collector’s edition. Each bar represents an ancient blessing for your skin, crafted slowly with consecrated herbs.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF5EB]">
                          <span className="material-symbols-outlined text-[#fdcd73] text-[18px]">verified</span>
                          <span>5 Full-Sized 125g Bars</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF5EB]">
                          <span className="material-symbols-outlined text-[#fdcd73] text-[18px]">redeem</span>
                          <span>Handcrafted Gift Box</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF5EB]">
                          <span className="material-symbols-outlined text-[#fdcd73] text-[18px]">spa</span>
                          <span>Free Carved Teakwood Dish</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF5EB]">
                          <span className="material-symbols-outlined text-[#fdcd73] text-[18px]">local_shipping</span>
                          <span>Free Express Delivery</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                        <button
                          onClick={addDivineBoxToCart}
                          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C59A45] hover:bg-[#b08638] text-[#173D32] font-serif font-bold text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                          type="button"
                        >
                          <span>Order Divine Box — ₹1,199</span>
                          <span className="material-symbols-outlined text-[18px]">east</span>
                        </button>

                        <a
                          href="https://wa.me/917386759777?text=Hello%2C%20I%20would%20like%20to%20order%20the%20Divine%20Collection%20Gift%20Box"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick('Divine Collection Page')}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-[#ffdea6]/60 hover:bg-[#ffdea6]/10 text-[#ffdea6] font-label-md text-xs uppercase tracking-widest rounded-full transition-colors"
                        >
                          <span className="material-symbols-outlined text-[#25D366] text-[18px]">chat</span>
                          <span>Inquire on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Gifting Occasions Grid */}
              <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="font-label-sm text-[11px] uppercase tracking-[0.25em] text-[#7B5802] font-bold block mb-1">
                    Thoughtful Celebrations
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#173D32]">
                    Ideal For Every Auspicious Occasion
                  </h3>
                  <p className="text-xs sm:text-sm text-[#414845] mt-2">
                    An elevated, conscious gift that communicates deep blessing and reverence.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Weddings & Return Gifts", desc: "A treasured token of gratitude for wedding guests and family celebrations.", icon: "favorite" },
                    { title: "Corporate Gifting", desc: "Distinguished festive hampers for executive clients, partners, and teams.", icon: "corporate_fare" },
                    { title: "Festivals & Pujas", desc: "Consecrated devotional soaps ideal for Diwali, Dussehra, and sacred rituals.", icon: "temple_hindu" },
                    { title: "Housewarming Gifts", desc: "Bless new homes with holy ash, tulsi, and auspicious bael leaf purity.", icon: "home" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E8D4B5] flex flex-col gap-3 shadow-xs">
                      <span className="material-symbols-outlined text-[#7B5802] text-3xl">{item.icon}</span>
                      <h4 className="font-serif text-base font-bold text-[#173D32]">{item.title}</h4>
                      <p className="text-xs text-[#414845] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* PAGE 4: INGREDIENTS PAGE */}
          {/* ============================================================ */}
          {(currentRoute.page === 'ingredients') && (
            <div className="w-full pb-8 lg:pb-12">
              <div className="w-full bg-[#FFF2DB] pt-6 sm:pt-8 pb-8 sm:pb-10 border-b border-[#E8D4B5]/60 mb-8 text-center">
                <div className="max-w-[1200px] mx-auto px-4 text-left mb-2">
                  <Breadcrumbs
                    items={[
                      { label: "Home", page: "home" },
                      { label: "Ingredients", page: "ingredients" }
                    ]}
                    onNavigate={(p) => navigateTo(p)}
                  />
                </div>
                <div className="max-w-[1200px] mx-auto px-4 text-center">
                  <span className="font-label-sm text-[11px] uppercase tracking-[0.25em] text-[#7B5802] font-bold mb-1 block">
                    Transparency &amp; Purity • Lotica Glow
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00271d] font-bold mb-2">
                    Sacred Botanicals &amp; Verified Ingredients
                  </h1>
                  <p className="font-sans text-sm sm:text-base text-[#414845] max-w-xl mx-auto">
                    Every botanical, oil, and herb we use is harvested ethically, sourced locally, and prepared with complete transparency.
                  </p>
                </div>
              </div>

              {/* Deep dive component */}
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-16">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
                  {SOAP_PRODUCTS.map((soap, idx) => {
                    const active = idx === ingredientTabSoap;
                    return (
                      <button
                        key={soap.id}
                        onClick={() => setIngredientTabSoap(idx)}
                        type="button"
                        className={
                          active
                            ? "px-5 py-2.5 rounded-full bg-[#173D32] text-[#ffdea6] font-semibold text-xs tracking-wider uppercase shadow-md border border-[#C59A45] transition-all"
                            : "px-5 py-2.5 rounded-full bg-[#E8D4B5]/50 hover:bg-[#E8D4B5] text-[#173D32] font-semibold text-xs tracking-wider uppercase transition-colors"
                        }
                      >
                        {soap.title}
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-3xl bg-white border border-[#E8D4B5] p-6 sm:p-10 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pb-6 border-b border-[#E8D4B5]/60 mb-8">
                    <div className="w-16 h-20 bg-[#FAF5EB] rounded-xl flex items-center justify-center p-2 shrink-0 border border-[#E8D4B5]/70">
                      <img alt={ingredientSoap.title} className="h-full w-auto object-contain" src={ingredientSoap.boxImage} />
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#7B5802]">
                        Formulation Breakdown
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#00271d]">
                        {ingredientSoap.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#414845] mt-1">
                        {ingredientSoap.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-[#7B5802] font-bold block mb-4">
                      Key Botanical Ingredients &amp; Properties
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ingredientSoap.ingredients.map((ing, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-[#FFF8F1] border border-[#E8D4B5]/70 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#E8D4B5]/60 flex items-center justify-center text-[#173D32] shrink-0 mt-0.5">
                            <span className="material-symbols-outlined text-[22px]">{ing.icon}</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#173D32] leading-snug">
                              {ing.name}
                            </h4>
                            <p className="text-xs text-[#7B5802] font-medium mt-1">
                              {ing.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[#E8D4B5]/60 flex flex-wrap items-center justify-between gap-3 text-xs text-[#414845]">
                    <span className="font-bold uppercase tracking-wider text-[#00271d]">
                      100% Free From:
                    </span>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-red-900/80 font-medium text-[11px] sm:text-xs">
                      <span>✕ Parabens</span>
                      <span>✕ Sulfates / SLS</span>
                      <span>✕ Phthalates</span>
                      <span>✕ Synthetic Perfume</span>
                      <span>✕ Animal Fats</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PAGE 5: FAQ PAGE */}
          {/* ============================================================ */}
          {(currentRoute.page === 'faqs' || currentRoute.page === 'faq') && (
            <div className="w-full pb-8 lg:pb-12">
              <div className="w-full bg-[#FFF2DB] pt-6 sm:pt-8 pb-8 sm:pb-10 border-b border-[#E8D4B5]/60 mb-8 text-center">
                <div className="max-w-[1200px] mx-auto px-4 text-left mb-2">
                  <Breadcrumbs
                    items={[
                      { label: "Home", page: "home" },
                      { label: "FAQs", page: "faqs" }
                    ]}
                    onNavigate={(p) => navigateTo(p)}
                  />
                </div>
                <div className="max-w-[1200px] mx-auto px-4 text-center">
                  <span className="font-label-sm text-[11px] uppercase tracking-[0.25em] text-[#7B5802] font-bold mb-1 block">
                    Support &amp; Guidance • Lotica Glow
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00271d] font-bold mb-2">
                    Frequently Asked Questions | Lotica Glow Traditional Soaps
                  </h1>
                  <p className="font-sans text-xs sm:text-sm text-[#414845] max-w-xl mx-auto">
                    Find clear answers about Lotica Glow traditional soaps, cold-curing, ingredients, sensitive skin suitability, orders, shipping and custom gifting.
                  </p>
                </div>
              </div>

              <div className="max-w-[960px] mx-auto px-4 sm:px-6 mb-16">
                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                  {['All', 'About Soaps', 'Skin Care', 'Orders & Shipping'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFaqCategory(cat)}
                      type="button"
                      className={
                        faqCategory === cat
                          ? "px-4 py-1.5 rounded-full bg-[#173D32] text-[#ffdea6] font-semibold text-xs tracking-wider uppercase shadow-sm"
                          : "px-4 py-1.5 rounded-full bg-white hover:bg-[#E8D4B5] text-[#173D32] font-semibold text-xs tracking-wider uppercase border border-[#E8D4B5] transition-colors"
                      }
                    >
                      {cat === 'All' ? 'All Questions' : cat}
                    </button>
                  ))}
                </div>

                {/* Accordion List */}
                <div className="flex flex-col gap-3">
                  {filteredFaqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={index}
                        className="rounded-xl bg-white border border-[#E8D4B5] overflow-hidden transition-all shadow-sm"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left gap-4 hover:bg-[#FFF8F1] transition-colors"
                        >
                          <span className="font-serif text-sm sm:text-base font-semibold text-[#173D32]">
                            {faq.question}
                          </span>
                          <span className="material-symbols-outlined text-[#7B5802] text-xl shrink-0 transition-transform duration-300">
                            {isOpen ? 'remove' : 'add'}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#414845] leading-relaxed border-t border-[#E8D4B5]/40 bg-[#FFF8F1]/40">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* WhatsApp direct help */}
                <div className="mt-10 p-6 rounded-2xl bg-white border border-[#E8D4B5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-[#25D366]">chat</span>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#173D32]">Need more guidance?</h4>
                      <p className="text-xs text-[#414845]">Chat directly with our herbal care team on WhatsApp.</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/917386759777?text=Hello%2C%20I%20have%20a%20question%20about%20Ananta%20Vijaya%20soaps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* PAGE 6: CONTACT PAGE */}
          {/* ============================================================ */}
          {(currentRoute.page === 'contact') && (
            <div className="w-full pb-8 lg:pb-12">
              <div className="w-full bg-[#FFF2DB] pt-6 sm:pt-8 pb-8 sm:pb-10 border-b border-[#E8D4B5]/60 mb-8 text-center">
                <div className="max-w-[1200px] mx-auto px-4 text-left mb-2">
                  <Breadcrumbs
                    items={[
                      { label: "Home", page: "home" },
                      { label: "Contact", page: "contact" }
                    ]}
                    onNavigate={(p) => navigateTo(p)}
                  />
                </div>
                <div className="max-w-[1200px] mx-auto px-4 text-center">
                  <span className="font-label-sm text-[11px] uppercase tracking-[0.25em] text-[#7B5802] font-bold mb-1 block">
                    Hyderabad Headquarters • Telangana
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#00271d] font-bold mb-2">
                    Contact Ananta Vijaya | Lotica Glow Hyderabad
                  </h1>
                  <p className="font-sans text-xs sm:text-sm text-[#414845] max-w-xl mx-auto">
                    Contact Lotica Glow by Ananta Vijaya for product enquiries, orders, customer support and customised gifting.
                  </p>
                </div>
              </div>

              <div className="max-w-[1100px] mx-auto px-4 sm:px-6 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Contact Form */}
                  <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8D4B5] shadow-sm">
                    <h3 className="font-serif text-2xl font-bold text-[#173D32] mb-1">Send a Message</h3>
                    <p className="text-xs text-[#414845] mb-6">Our herbal care specialists reply within 24 business hours.</p>

                    {contactSubmitted ? (
                      <div className="p-8 rounded-2xl bg-[#c2ebdb]/30 border border-[#406659] text-center flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl text-[#173D32] mb-2">check_circle</span>
                        <h4 className="font-serif text-xl font-bold text-[#173D32]">Thank You!</h4>
                        <p className="text-xs text-[#414845] mt-1">Your message has been received with reverence. We will get back to you shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#7B5802] mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8D4B5] bg-[#FFF8F1] text-xs sm:text-sm text-[#173D32] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                            placeholder="Your name"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7B5802] mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-[#E8D4B5] bg-[#FFF8F1] text-xs sm:text-sm text-[#173D32] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                              placeholder="you@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7B5802] mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={contactForm.phone}
                              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-[#E8D4B5] bg-[#FFF8F1] text-xs sm:text-sm text-[#173D32] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#7B5802] mb-1">
                            Inquiry Type
                          </label>
                          <select
                            value={contactForm.topic}
                            onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8D4B5] bg-[#FFF8F1] text-xs sm:text-sm text-[#173D32] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                          >
                            <option>General Inquiry</option>
                            <option>Order &amp; Delivery Tracking</option>
                            <option>Festive &amp; Corporate Gifting</option>
                            <option>Skin Compatibility Consultation</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#7B5802] mb-1">
                            Your Message *
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E8D4B5] bg-[#FFF8F1] text-xs sm:text-sm text-[#173D32] focus:outline-none focus:ring-2 focus:ring-[#C59A45]"
                            placeholder="How may we assist you?"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 bg-[#173D32] hover:bg-[#39251D] text-white rounded-full text-xs font-semibold uppercase tracking-widest transition-colors shadow-md mt-2"
                        >
                          Submit Message
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Atelier Info */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="bg-[#FAF5EB] rounded-3xl p-6 sm:p-8 border border-[#E8D4B5]">
                      <h3 className="font-serif text-xl font-bold text-[#173D32] mb-4">Apothecary Atelier</h3>
                      <div className="flex flex-col gap-3 text-xs sm:text-sm text-[#414845]">
                        <div className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-[#7B5802] text-[20px]">location_on</span>
                          <span>Plot No. 42, Jubilee Enclave, HITEC City, Hyderabad, Telangana 500081, India</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[#7B5802] text-[20px]">mail</span>
                          <span>info@anantavijaya.com</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[#7B5802] text-[20px]">call</span>
                          <span>+91 73867 59777</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[#7B5802] text-[20px]">schedule</span>
                          <span>Monday – Saturday: 9:00 AM – 6:00 PM IST</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#173D32] text-white rounded-3xl p-6 sm:p-8 border border-[#C59A45]/40 shadow-md">
                      <span className="material-symbols-outlined text-3xl text-[#25D366] mb-2">chat</span>
                      <h4 className="font-serif text-lg font-bold mb-1">Instant WhatsApp Support</h4>
                      <p className="text-xs text-[#c2ebdb] mb-4 leading-relaxed">
                        Connect directly with an Ayurvedic soap specialist on WhatsApp for quick answers.
                      </p>
                      <a
                        href="https://wa.me/917386759777?text=Hello%20Ananta%20Vijaya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <span>Open WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ============================================================ */}
        {/* FOOTER */}
        {/* ============================================================ */}
        <footer className="w-full bg-[#00271d] text-[#FFF8F1] pt-14 pb-8 border-t border-[#C59A45]/30">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#C59A45]/20">
              {/* Column 1: Brand Info */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <img
                    alt="Ananta Vijaya Sacred Logo"
                    className="h-12 w-auto object-contain drop-shadow"
                    src={ASSETS.logo}
                  />
                  <div className="flex flex-col">
                    <span className="font-serif text-xl font-bold uppercase tracking-wider text-white">
                      Ananta Vijaya
                    </span>
                    <span className="font-label-sm text-[10px] text-[#ffdea6] tracking-[0.25em] uppercase font-semibold">
                      Natural Handmade Soaps
                    </span>
                  </div>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#a7cfc0] leading-relaxed max-w-sm">
                  Honoring ancient Indian heritage through pure, handcrafted Ayurvedic soaps and mindful daily rituals. Made in small batches using traditional cold process methods.
                </p>
                <div className="flex items-center gap-3 text-[#ffdea6] pt-1">
                  <button type="button" onClick={() => navigateTo('home')} aria-label="Website" className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">public</span>
                  </button>
                  <button type="button" onClick={() => navigateTo('our-story')} aria-label="Ayurveda" className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">spa</span>
                  </button>
                  <button type="button" onClick={() => navigateTo('ingredients')} aria-label="Botanicals" className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">local_florist</span>
                  </button>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className="lg:col-span-2 flex flex-col gap-3">
                <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#ffdea6]">
                  Quick Links
                </h4>
                <ul className="flex flex-col gap-2 text-xs text-[#a7cfc0]">
                  <li><button type="button" onClick={() => navigateTo('home')} className="hover:text-white transition-colors text-left">Home</button></li>
                  <li><button type="button" onClick={() => navigateTo('about')} className="hover:text-white transition-colors text-left">Our Story</button></li>
                  <li><button type="button" onClick={() => navigateTo('shop')} className="hover:text-white transition-colors text-left">Our Soaps</button></li>
                  <li><button type="button" onClick={() => navigateTo('divine-collection')} className="hover:text-white transition-colors text-left">The Divine Collection</button></li>
                  <li><button type="button" onClick={() => navigateTo('ingredients')} className="hover:text-white transition-colors text-left">Ingredients</button></li>
                  <li><button type="button" onClick={() => navigateTo('faqs')} className="hover:text-white transition-colors text-left">FAQ</button></li>
                  <li><button type="button" onClick={() => navigateTo('contact')} className="hover:text-white transition-colors text-left">Contact</button></li>
                </ul>
              </div>

              {/* Column 3: The Soaps */}
              <div className="lg:col-span-3 flex flex-col gap-3">
                <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#ffdea6]">
                  Our Soaps
                </h4>
                <ul className="flex flex-col gap-2 text-xs text-[#a7cfc0]">
                  {SOAP_PRODUCTS.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => navigateTo('product', s.slug)}
                        className="hover:text-white transition-colors text-left"
                      >
                        {s.title} ({s.subtitle.split('&')[0].trim()})
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('divine-collection')}
                      className="hover:text-[#fdcd73] transition-colors text-left font-semibold text-[#ffdea6]"
                    >
                      The Divine Collection (5-Soap Box)
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 4: Sourcing & Contact */}
              <div className="lg:col-span-3 flex flex-col gap-3">
                <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#ffdea6]">
                  Apothecary Atelier
                </h4>
                <div className="flex flex-col gap-2 text-xs text-[#a7cfc0]">
                  <p>Plot No. 42, Jubilee Enclave, HITEC City</p>
                  <p>Hyderabad, Telangana 500081, India</p>
                  <p className="text-[#ffdea6] pt-1">info@anantavijaya.com</p>
                  <p>+91 73867 59777</p>
                  <a
                    href="https://wa.me/917386759777?text=Hello%20Ananta%20Vijaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline mt-1 font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>WhatsApp Support</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Legal / Copyright */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a7cfc0]/80 gap-3">
              <p>© 2026 Ananta Vijaya Private Limited – Lotica Glow. All rights reserved. Hyderabad, Telangana, India.</p>
              <div className="flex items-center gap-4 text-xs">
                <button type="button" onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Privacy Policy</button>
                <span>•</span>
                <button type="button" onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Terms of Ritual</button>
                <span>•</span>
                <button type="button" onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">Shipping &amp; Care</button>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Quick Chat Button */}
        <a
          href="https://wa.me/917386759777?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Ananta%20Vijaya%20soaps"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 font-medium text-xs tracking-wider transition-all transform hover:scale-105 group"
        >
          <span className="material-symbols-outlined text-[20px]">chat</span>
          <span className="hidden sm:inline font-semibold">WhatsApp Us</span>
        </a>

        {/* Cart & Wishlist Drawers */}
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cart}
          onUpdateQuantity={(id, qty) => {
            if (qty <= 0) {
              setCart((prev) => prev.filter((item) => item.id !== id));
            } else {
              setCart((prev) =>
                prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
              );
            }
          }}
          onRemoveItem={(id) => setCart((prev) => prev.filter((item) => item.id !== id))}
        />

        <WishlistDrawer
          isOpen={wishlistOpen}
          onClose={() => setWishlistOpen(false)}
          wishlistIds={wishlist}
          onAddToCart={(item) => {
            addToCart(item);
            setWishlistOpen(false);
            setCartOpen(true);
          }}
          onRemoveWishlist={toggleWishlist}
        />
      </div>
      );
}
