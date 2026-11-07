/**
 * Google Analytics 4 (GA4) Tracking Utility for Lotica Glow
 * Uses environment variable VITE_GA_MEASUREMENT_ID or falls back to production measurement ID.
 */

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

export function initGA() {
  if (typeof window === "undefined") return;
  if (window.__ga_initialized) return;

  // Only inject script tag if Measurement ID is not dummy placeholder
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false // Managed manually on route change
    });

    window.__ga_initialized = true;
  }
}

function sendEvent(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/**
 * Track Page Views
 */
export function trackPageView(pageTitle, pagePath) {
  sendEvent("page_view", {
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath
  });
}

/**
 * Track Product View (GA4 view_item)
 */
export function trackViewItem(product) {
  sendEvent("view_item", {
    currency: "INR",
    value: parseFloat((product.price || "249").replace(/[^0-9.]/g, "")),
    items: [
      {
        item_id: product.id,
        item_name: product.title,
        item_brand: "Lotica Glow",
        item_category: "Traditional Soaps",
        price: parseFloat((product.price || "249").replace(/[^0-9.]/g, "")),
        quantity: 1
      }
    ]
  });
}

/**
 * Track Soap Selection from Catalog
 */
export function trackSelectItem(product, index) {
  sendEvent("select_item", {
    item_list_id: "lotica_glow_soaps",
    item_list_name: "Lotica Glow Soap Collection",
    items: [
      {
        item_id: product.id,
        item_name: product.title,
        index: index,
        item_brand: "Lotica Glow",
        price: parseFloat((product.price || "249").replace(/[^0-9.]/g, ""))
      }
    ]
  });
}

/**
 * Track Add to Cart
 */
export function trackAddToCart(product, quantity = 1) {
  sendEvent("add_to_cart", {
    currency: "INR",
    value: parseFloat((product.price || "249").replace(/[^0-9.]/g, "")) * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.title,
        item_brand: "Lotica Glow",
        item_category: "Traditional Soaps",
        price: parseFloat((product.price || "249").replace(/[^0-9.]/g, "")),
        quantity: quantity
      }
    ]
  });
}

/**
 * Track Remove from Cart
 */
export function trackRemoveFromCart(product) {
  sendEvent("remove_from_cart", {
    currency: "INR",
    value: parseFloat((product.price || "249").replace(/[^0-9.]/g, "")),
    items: [
      {
        item_id: product.id,
        item_name: product.title,
        item_brand: "Lotica Glow"
      }
    ]
  });
}

/**
 * Track Begin Checkout
 */
export function trackBeginCheckout(cartItems, totalValue) {
  sendEvent("begin_checkout", {
    currency: "INR",
    value: totalValue,
    items: cartItems.map((item) => ({
      item_id: item.id || item.title,
      item_name: item.title,
      item_brand: "Lotica Glow",
      price: parseFloat((item.price || "249").replace(/[^0-9.]/g, "")),
      quantity: item.qty || 1
    }))
  });
}

/**
 * Track Contact Form Submission
 */
export function trackContactSubmit(topic) {
  sendEvent("generate_lead", {
    event_category: "Contact",
    event_label: topic
  });
}

/**
 * Track WhatsApp Button Clicks
 */
export function trackWhatsAppClick(source) {
  sendEvent("contact", {
    method: "WhatsApp",
    source: source || "Floating Button"
  });
}

/**
 * Track Divine Collection Gift Box Enquiry
 */
export function trackGiftEnquiry() {
  sendEvent("select_promotion", {
    promotion_id: "divine_collection_gift_box",
    promotion_name: "The Divine Collection 5-Soap Gift Box",
    creative_slot: "Festive Collector Banner"
  });
}
