const fs = require('fs');

const content = fs.readFileSync('src/pages/projects.jsx', 'utf-8');
const lines = content.split('\n');

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/projectsData.js', 'export ' + lines.slice(3, 1273).join('\n'));
fs.writeFileSync('src/pages/projects.jsx', lines.slice(0, 3).join('\n') + '\nimport { allProjectsData } from "../data/projectsData";\n' + lines.slice(1273).join('\n'));

console.log('Extraction complete!');
