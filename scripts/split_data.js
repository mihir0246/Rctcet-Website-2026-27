import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allProjectsData } from './src/data/projectsData.js';
import { teamMembers, boardOfDirectors } from './src/data/teamData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const teamDir = path.join(__dirname, 'src/data/team');
const projectsDir = path.join(__dirname, 'src/data/projects');

if (!fs.existsSync(teamDir)) fs.mkdirSync(teamDir, { recursive: true });
if (!fs.existsSync(projectsDir)) fs.mkdirSync(projectsDir, { recursive: true });

for (const [year, projects] of Object.entries(allProjectsData)) {
    const fileContent = `export const projects = ${JSON.stringify(projects, null, 2)};\n`;
    fs.writeFileSync(path.join(projectsDir, `${year}.js`), fileContent);
}

const years = new Set([
    ...teamMembers.map(m => m.year),
    ...boardOfDirectors.map(m => m.year)
]);

for (const year of years) {
    if (!year) continue;
    const yearMembers = teamMembers.filter(m => m.year === year);
    const yearBOD = boardOfDirectors.filter(m => m.year === year);
    
    let currentId = 1;
    yearMembers.forEach(m => m.id = currentId++);
    yearBOD.forEach(m => m.id = currentId++);

    const fileContent = `export const teamMembers = ${JSON.stringify(yearMembers, null, 2)};\n\nexport const boardOfDirectors = ${JSON.stringify(yearBOD, null, 2)};\n`;
    fs.writeFileSync(path.join(teamDir, `${year}.js`), fileContent);
}

console.log("Data split successfully!");
