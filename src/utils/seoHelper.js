/**
 * Client-side Dynamic SEO and Schema Manager
 * Updates <title>, meta tags, canonical link, and JSON-LD schemas on client route transitions.
 */

export function updateDocumentHead({ title, description, keywords, canonical, ogImage, ogType, schema }) {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  if (title) {
    document.title = title;
  }

  // 2. Helper to set or create meta tags
  const setMeta = (name, content, isProperty = false) => {
    if (!content) return;
    const attr = isProperty ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Meta description & keywords
  setMeta('description', description);
  setMeta('keywords', keywords);

  // Open Graph
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', ogType || 'website', true);
  setMeta('og:url', canonical, true);
  if (ogImage) {
    setMeta('og:image', ogImage, true);
  }

  // Twitter Cards
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  if (ogImage) {
    setMeta('twitter:image', ogImage);
  }

  // 3. Update Canonical Link
  if (canonical) {
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);
  }

  // 4. Update Dynamic Schema Script
  if (schema) {
    let schemaEl = document.getElementById('dynamic-page-schema');
    if (!schemaEl) {
      schemaEl = document.createElement('script');
      schemaEl.id = 'dynamic-page-schema';
      schemaEl.type = 'application/ld+json';
      document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(schema, null, 2);
  }
}
