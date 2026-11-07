const fs = require('fs');
const html = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

// Let's inspect the exact header
const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
if (headerMatch) {
  console.log('--- EXACT STITCH HEADER ---');
  console.log(headerMatch[0]);
}
