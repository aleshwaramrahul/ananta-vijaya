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

// 1. Header
let header = cleanJsx(origHtml.match(/<header[\s\S]*?<\/header>/i)[0]);
header = header.replace(
  '<button aria-label="Wishlist" className="p-space-xs hover:text-secondary transition-colors" type="button"><span className="material-symbols-outlined text-[22px]">favorite</span></button>',
  '<button aria-label="Wishlist" onClick={() => setWishlistOpen(true)} className="p-space-xs hover:text-secondary transition-colors relative" type="button"><span className="material-symbols-outlined text-[22px]">favorite</span>{wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>}</button>'
);
header = header.replace(
  '<button aria-label="Shopping Bag" className="p-space-xs hover:text-secondary transition-colors" type="button"><span className="material-symbols-outlined text-[22px]">shopping_bag</span></button>',
  '<button aria-label="Shopping Bag" onClick={() => setCartOpen(true)} className="p-space-xs hover:text-secondary transition-colors relative" type="button"><span className="material-symbols-outlined text-[22px]">shopping_bag</span>{cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#173D32] text-[#fdcd73] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}</button>'
);

// 2. Hero
let hero = cleanJsx(origHtml.match(/<!-- HERO SECTION -->[\s\S]*?<\/section>/i)[0]);
hero = hero.replace('alt="Vibhudi Soap Box"', 'alt="Vibhudi Soap Box" onClick={() => selectSoap(3)}');
hero = hero.replace('alt="Kadamba Soap Box"', 'alt="Kadamba Soap Box" onClick={() => selectSoap(1)}');
hero = hero.replace('alt="Bilvam Soap Box"', 'alt="Bilvam Soap Box" onClick={() => selectSoap(0)}');
hero = hero.replace('alt="Kamalam Soap Box"', 'alt="Kamalam Soap Box" onClick={() => selectSoap(2)}');
hero = hero.replace('alt="Rudraksha Soap Box"', 'alt="Rudraksha Soap Box" onClick={() => selectSoap(4)}');

// 3. Section 3
let s3 = cleanJsx(origHtml.match(/<!-- SECTION 3: BRAND HIGHLIGHT[\s\S]*?<\/section>/i)[0]);

// 4. Section 4
let s4 = cleanJsx(origHtml.match(/<!-- SECTION 4: WHY CHOOSE US[\s\S]*?<\/section>/i)[0]);

// 5. Footer
let footer = cleanJsx(origHtml.match(/<footer[\s\S]*?<\/footer>/i)[0]);

// Save pieces
fs.writeFileSync('d:/ASR/ananta vijaya 5/p_header.jsx', header);
fs.writeFileSync('d:/ASR/ananta vijaya 5/p_hero.jsx', hero);
fs.writeFileSync('d:/ASR/ananta vijaya 5/p_s3.jsx', s3);
fs.writeFileSync('d:/ASR/ananta vijaya 5/p_s4.jsx', s4);
fs.writeFileSync('d:/ASR/ananta vijaya 5/p_footer.jsx', footer);

console.log('Saved JSX pieces successfully.');
