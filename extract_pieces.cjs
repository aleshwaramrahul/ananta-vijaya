const fs = require('fs');

const origHtml = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

// Extract Header
const headerHtml = origHtml.match(/<header[\s\S]*?<\/header>/i)[0];
// Extract Main
const mainHtml = origHtml.match(/<main[\s\S]*?<\/main>/i)[0];
// Extract Footer
const footerHtml = origHtml.match(/<footer[\s\S]*?<\/footer>/i)[0];

fs.writeFileSync('d:/ASR/ananta vijaya 5/extracted_header.html', headerHtml);
fs.writeFileSync('d:/ASR/ananta vijaya 5/extracted_main.html', mainHtml);
fs.writeFileSync('d:/ASR/ananta vijaya 5/extracted_footer.html', footerHtml);

console.log('Extracted raw pieces successfully.');
