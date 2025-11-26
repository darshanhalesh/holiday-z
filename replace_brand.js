const fs = require('fs');
const path = require('path');

const files = [
  'views/terms.ejs',
  'views/privacy.ejs',
  'views/index.ejs',
  'views/contributors.ejs',
  'views/about.ejs',
  'README.md'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all variations
    content = content.replace(/Aerovia/g, 'holiday z');
    content = content.replace(/AEROVIA/g, 'holidayz');
    content = content.replace(/aerovia/g, 'holidayz');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${file}`);
  } catch (err) {
    console.error(`✗ Error updating ${file}:`, err.message);
  }
});

console.log('\n✅ All files updated!');
