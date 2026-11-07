const fs = require('fs');
const html = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

// Let's inspect the sections in stitch_original.html
const sectionRegex = /<section[\s\S]*?<\/section>/gi;
let match;
let count = 0;
while ((match = sectionRegex.exec(html)) !== null) {
  count++;
  console.log(`=== SECTION ${count} ===`);
  const lines = match[0].split('\n');
  console.log('First 5 lines:', lines.slice(0, 5).join('\n'));
  console.log('Last 3 lines:', lines.slice(-3).join('\n'));
  console.log('Total characters:', match[0].length);
}
