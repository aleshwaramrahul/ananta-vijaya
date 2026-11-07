const fs = require('fs');
const html = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

// Let's check the main tag content
const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);

console.log('Main length:', mainMatch ? mainMatch[0].length : 0);
console.log('Footer length:', footerMatch ? footerMatch[0].length : 0);
