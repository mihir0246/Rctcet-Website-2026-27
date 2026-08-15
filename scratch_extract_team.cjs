const fs = require('fs');

const content = fs.readFileSync('src/pages/meetTheTeam.jsx', 'utf-8');
const lines = content.split('\n');

// The data spans from line 5 to 1742 (index 4 to 1741)
const dataLines = lines.slice(4, 1742);

// Add 'export' to the variable declarations
let dataContent = dataLines.join('\n');
dataContent = dataContent.replace('const teamMembers = [', 'export const teamMembers = [');
dataContent = dataContent.replace('const boardOfDirectors = [', 'export const boardOfDirectors = [');

fs.writeFileSync('src/data/teamData.js', dataContent);

// Write the modified meetTheTeam.jsx
const modifiedComponent = lines.slice(0, 4).join('\n') + 
  '\nimport { teamMembers, boardOfDirectors } from "../data/teamData";\n\n' + 
  lines.slice(1742).join('\n');

fs.writeFileSync('src/pages/meetTheTeam.jsx', modifiedComponent);

console.log('meetTheTeam extraction complete!');
