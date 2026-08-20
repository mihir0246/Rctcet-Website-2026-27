const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Stone Text
  content = content.replace(/text-stone-(800|900|950)/g, 'text-foreground');
  content = content.replace(/text-stone-(50|100|200)/g, 'text-foreground'); // In dark mode, light text is foreground
  content = content.replace(/text-stone-(300|400|500|600|700)/g, 'text-muted');

  // Stone Backgrounds
  content = content.replace(/bg-stone-(50|100|200)/g, 'bg-background');
  content = content.replace(/bg-stone-(800|900|950)/g, 'bg-card'); // Often used for dark cards or dark backgrounds

  // Stone Borders & Rings
  content = content.replace(/border-stone-\d+/g, 'border-muted');
  content = content.replace(/ring-stone-\d+/g, 'ring-muted');
  content = content.replace(/divide-stone-\d+/g, 'divide-muted');

  // Orange Text
  content = content.replace(/text-orange-\d+/g, 'text-primary');

  // Orange Backgrounds
  content = content.replace(/hover:bg-orange-(600|700|800)/g, 'hover:bg-primary-hover');
  content = content.replace(/hover:bg-orange-(50|100|200)/g, 'hover:bg-primary-light');
  content = content.replace(/bg-orange-(400|500|600|700|800|900)/g, 'bg-primary');
  content = content.replace(/bg-orange-(50|100|200|300)/g, 'bg-primary-light');
  
  // Orange Borders & Rings
  content = content.replace(/border-orange-\d+/g, 'border-primary');
  content = content.replace(/ring-orange-\d+/g, 'ring-primary');

  // Hardcoded Hexes remaining
  content = content.replace(/bg-\[\#1A1612\]/g, 'bg-background');
  content = content.replace(/text-\[\#1A1612\]/g, 'text-foreground');
  
  // Yellow Highlights (some used for dark mode accents)
  content = content.replace(/text-yellow-\d+/g, 'text-secondary');
  content = content.replace(/bg-yellow-\d+/g, 'bg-secondary');

  fs.writeFileSync(file, content, 'utf8');
});

console.log("Deep Refactoring complete!");
