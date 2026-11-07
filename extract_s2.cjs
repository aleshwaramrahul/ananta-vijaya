const fs = require('fs');

const origHtml = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');
const s2Html = origHtml.match(/<!-- SECTION 2: OUR SOAP COLLECTION[\s\S]*?<\/section>/i)[0];

fs.writeFileSync('d:/ASR/ananta vijaya 5/section2_raw.html', s2Html);
console.log('Section 2 written, length:', s2Html.length);
