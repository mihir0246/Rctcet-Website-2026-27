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
  
  // Gradients
  content = content.replace(/(from|to|via)-orange-\d+/g, '$1-primary');
  content = content.replace(/(from|to|via)-amber-\d+/g, '$1-secondary');
  content = content.replace(/(from|to|via)-yellow-\d+/g, '$1-secondary');
  
  // Shadows
  content = content.replace(/shadow-orange-\d+\/\d+/g, 'shadow-primary/30');
  content = content.replace(/dark:shadow-stone-\d+\/\d+/g, 'dark:shadow-black/50');
  
  // Dark Stone Backgrounds (Cards, etc)
  content = content.replace(/dark:bg-stone-(600|700|800|900|950)/g, 'dark:bg-card');
  content = content.replace(/bg-stone-(300|400|500)/g, 'bg-muted');
  
  // Dark Stone Texts
  content = content.replace(/dark:text-stone-(400|500|600|700)/g, 'dark:text-muted');
  
  // Stone borders
  content = content.replace(/dark:border-stone-\d+/g, 'dark:border-muted');
  content = content.replace(/border-stone-\d+/g, 'border-muted');
  
  // Stray Orange backgrounds
  content = content.replace(/bg-orange-(50|100|200)/g, 'bg-primary-light');
  content = content.replace(/bg-orange-\d+/g, 'bg-primary');
  
  // Stray Text Oranges
  content = content.replace(/text-orange-\d+/g, 'text-primary');

  // Hardcoded Hex gradients
  content = content.replace(/dark:from-\[\#D4A829\]/g, 'dark:from-primary');
  content = content.replace(/dark:to-\[\#B8860B\]/g, 'dark:to-secondary');

  fs.writeFileSync(file, content, 'utf8');
});

console.log("Ultimate Refactoring complete!");
