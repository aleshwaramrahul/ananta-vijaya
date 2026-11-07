const fs = require('fs');

const origHtml = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

// Header
const headerHtml = origHtml.match(/<header[\s\S]*?<\/header>/i)[0];

// Main sections
// Section 1: Hero
const heroHtml = origHtml.match(/<!-- HERO SECTION -->[\s\S]*?<\/section>/i)[0];

// Section 3: Brand Highlight
const s3Html = origHtml.match(/<!-- SECTION 3: BRAND HIGHLIGHT[\s\S]*?<\/section>/i)[0];

// Section 4: Why Choose Us
const s4Html = origHtml.match(/<!-- SECTION 4: WHY CHOOSE US[\s\S]*?<\/section>/i)[0];

// Footer
const footerHtml = origHtml.match(/<footer[\s\S]*?<\/footer>/i)[0];

function cleanJsx(str) {
  return str
    .replace(/\bclass="/g, 'className="')
    .replace(/\bfor="/g, 'htmlFor="')
    .replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />')
    .replace(/<input([^>]*?)(?<!\/)>/gi, '<input$1 />')
    .replace(/<br>/gi, '<br />')
    .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
    .replace(/<script[\s\S]*?<\/script>/gi, '');
}

console.log('Hero clean length:', cleanJsx(heroHtml).length);
console.log('S3 clean length:', cleanJsx(s3Html).length);
console.log('S4 clean length:', cleanJsx(s4Html).length);
console.log('Header clean length:', cleanJsx(headerHtml).length);
console.log('Footer clean length:', cleanJsx(footerHtml).length);
