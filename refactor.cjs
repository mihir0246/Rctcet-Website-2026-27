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
  
  // Backgrounds
  content = content.replace(/bg-white dark:bg-\[\#1A1612\]/gi, 'bg-card');
  content = content.replace(/bg-white dark:bg-stone-800/gi, 'bg-card');
  content = content.replace(/bg-stone-100 dark:bg-\[\#1A1612\]/gi, 'bg-background');
  content = content.replace(/bg-stone-100 dark:bg-stone-900/gi, 'bg-background');
  content = content.replace(/bg-\[\#1A1612\]/gi, 'bg-background'); // Catch stragglers
  content = content.replace(/bg-stone-100/g, 'bg-background');
  content = content.replace(/bg-white/g, 'bg-card'); 
  
  // Texts
  content = content.replace(/text-stone-800 dark:text-white/gi, 'text-foreground');
  content = content.replace(/text-stone-900 dark:text-white/gi, 'text-foreground');
  content = content.replace(/text-stone-800 dark:text-stone-200/gi, 'text-foreground');
  content = content.replace(/text-stone-600 dark:text-stone-300/gi, 'text-muted');
  content = content.replace(/text-stone-700 dark:text-stone-200/gi, 'text-muted');
  content = content.replace(/text-stone-700 dark:text-stone-300/gi, 'text-muted');
  content = content.replace(/text-stone-600 dark:text-stone-400/gi, 'text-muted');
  content = content.replace(/text-stone-500 dark:text-stone-400/gi, 'text-muted');
  content = content.replace(/text-stone-800/g, 'text-foreground');
  content = content.replace(/text-stone-700/g, 'text-muted');
  content = content.replace(/text-stone-600/g, 'text-muted');

  // Accents & Borders
  content = content.replace(/border-stone-300 dark:border-stone-600/gi, 'border-muted');
  content = content.replace(/border-stone-300 dark:border-stone-700/gi, 'border-muted');
  content = content.replace(/border-stone-200 dark:border-stone-800/gi, 'border-muted');
  content = content.replace(/border-stone-300/gi, 'border-muted');
  
  // Primary (Orange -> Primary)
  content = content.replace(/bg-orange-600 hover:bg-orange-700/gi, 'bg-primary hover:bg-primary-hover');
  content = content.replace(/bg-orange-500 hover:bg-orange-600/gi, 'bg-primary hover:bg-primary-hover');
  content = content.replace(/bg-orange-600/g, 'bg-primary');
  content = content.replace(/bg-orange-500/g, 'bg-primary');
  content = content.replace(/text-orange-600/g, 'text-primary');
  content = content.replace(/text-orange-500/g, 'text-primary');
  content = content.replace(/text-orange-400/g, 'text-primary-light');
  content = content.replace(/bg-orange-100/g, 'bg-primary-light');
  content = content.replace(/hover:bg-orange-100/g, 'hover:bg-primary-light');
  
  // Specific Custom Hexes used in old code
  content = content.replace(/text-\[\#9D320F\]/gi, 'text-primary');
  content = content.replace(/bg-\[\#9D320F\]/gi, 'bg-primary');
  content = content.replace(/bg-\[\#FFD6A8\]/gi, 'bg-secondary');
  content = content.replace(/text-\[\#FFD6A8\]/gi, 'text-secondary');
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log("Refactoring complete!");
