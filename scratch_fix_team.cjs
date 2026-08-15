const fs = require('fs');
let content = fs.readFileSync('src/pages/meetTheTeam.jsx', 'utf-8');

// Use regex to ignore line ending differences
content = content.replace(
  /<div className="max-w-\[80%\] mx-auto">\s*<div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-8">/g,
  '<div className="w-[90%] sm:w-[80%] max-w-6xl mx-auto">\n        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-20 mt-8">'
);

content = content.replace(
  /<div className="max-w-\[80%\] mx-auto">\s*<div className="grid grid-cols-1 md:grid-cols-3 gap-20">/g,
  '<div className="w-[90%] sm:w-[80%] max-w-6xl mx-auto">\n        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-20">'
);

fs.writeFileSync('src/pages/meetTheTeam.jsx', content);
console.log('meetTheTeam updated successfully');
