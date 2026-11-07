const fs = require('fs');

function htmlToJsx(html) {
  let jsx = html;
  
  // Replace class= with className=
  jsx = jsx.replace(/\bclass="/g, 'className="');
  
  // Replace for= with htmlFor=
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
  
  // Self close void elements: img, input, br, hr
  jsx = jsx.replace(/<(img|input|hr)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
  jsx = jsx.replace(/<br>/gi, '<br />');

  // Replace onclick with onClick
  jsx = jsx.replace(/\bonclick="selectSoap\((\d+)\)"/g, 'onClick={() => selectSoap($1)}');
  jsx = jsx.replace(/\bonclick="prevSoap\(\)"/g, 'onClick={prevSoap}');
  jsx = jsx.replace(/\bonclick="nextSoap\(\)"/g, 'onClick={nextSoap}');

  // Remove the <script> tags inside main/footer
  jsx = jsx.replace(/<script[\s\S]*?<\/script>/gi, '');

  return jsx;
}

const origHtml = fs.readFileSync('d:/ASR/ananta vijaya 5/stitch_original.html', 'utf8');

// Extract Header, Main, Footer
const headerHtml = origHtml.match(/<header[\s\S]*?<\/header>/i)[0];
const mainHtml = origHtml.match(/<main[\s\S]*?<\/main>/i)[0];
const footerHtml = origHtml.match(/<footer[\s\S]*?<\/footer>/i)[0];

fs.writeFileSync('d:/ASR/ananta vijaya 5/jsx_header.txt', htmlToJsx(headerHtml));
fs.writeFileSync('d:/ASR/ananta vijaya 5/jsx_main.txt', htmlToJsx(mainHtml));
fs.writeFileSync('d:/ASR/ananta vijaya 5/jsx_footer.txt', htmlToJsx(footerHtml));

console.log('JSX conversion completed!');
