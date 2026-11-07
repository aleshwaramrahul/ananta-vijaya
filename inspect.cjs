const fs = require('fs');
const html = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
if (headMatch) {
  console.log('--- HEAD CONTENT ---');
  console.log(headMatch[1].replace(/<script id="tailwind-config"[\s\S]*?<\/script>/, '[TAILWIND_CONFIG]'));
}
