const fs = require('fs');
const path = require('path');

const noJekyllPath = path.join(__dirname, '..', 'out', '.nojekyll');

// Ensure the out folder exists
if (!fs.existsSync(path.join(__dirname, '..', 'out'))) {
  console.error('Error: out/ folder does not exist. Run `npm run export` first.');
  process.exit(1);
}

// Create .nojekyll
fs.writeFileSync(noJekyllPath, '');
console.log('.nojekyll file created successfully!');
