const fs = require('fs');
const html = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

const bodyMatch = html.match(/<body([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  // Let's print the main sections
  const sections = bodyMatch[1].match(/<!--[\s\S]*?-->/g);
  console.log('Sections/Comments found:', sections);
}
