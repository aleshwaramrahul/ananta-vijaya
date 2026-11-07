const fs = require('fs');

const origHtml = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

// Let's get everything inside <body>...</body> except the <script> tags at the end
const bodyContent = origHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i)[1];

console.log('Body content length:', bodyContent.length);
// Let's see all top level children in body
const matches = bodyContent.match(/<(header|main|footer)[\s\S]*?<\/\1>/gi);
console.log('Top level elements found:', matches ? matches.map(m => m.slice(0, 30)) : 'none');
