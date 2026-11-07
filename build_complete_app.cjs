const fs = require('fs');

const origHtml = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

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

// 1. Extract Header
let header = cleanJsx(origHtml.match(/<header[\s\S]*?<\/header>/i)[0]);

// 2. Extract Hero
let hero = cleanJsx(origHtml.match(/<!-- HERO SECTION -->[\s\S]*?<\/section>/i)[0]);

// 3. Extract Section 3
let s3 = cleanJsx(origHtml.match(/<!-- SECTION 3: BRAND HIGHLIGHT[\s\S]*?<\/section>/i)[0]);

// 4. Extract Section 4
let s4 = cleanJsx(origHtml.match(/<!-- SECTION 4: WHY CHOOSE US[\s\S]*?<\/section>/i)[0]);

// 5. Extract Footer
let footer = cleanJsx(origHtml.match(/<footer[\s\S]*?<\/footer>/i)[0]);

console.log('Parts extracted.');
