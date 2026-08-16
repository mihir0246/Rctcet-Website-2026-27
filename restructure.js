import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');

function renameSyncCaseSafe(oldPath, newPath) {
    if (oldPath === newPath) return;
    if (oldPath.toLowerCase() === newPath.toLowerCase()) {
        const tmpPath = oldPath + '_tmp';
        fs.renameSync(oldPath, tmpPath);
        fs.renameSync(tmpPath, newPath);
    } else {
        fs.mkdirSync(path.dirname(newPath), { recursive: true });
        fs.renameSync(oldPath, newPath);
    }
}

// 1. Rename files in pages
const pagesDir = path.join(srcDir, 'pages');
if (fs.existsSync(pagesDir)) {
    const pagesMap = {
        'projects.jsx': 'Projects.jsx',
        'about.jsx': 'About.jsx',
        'contactus.jsx': 'ContactUs.jsx',
        'meetTheTeam.jsx': 'MeetTheTeam.jsx',
        'home.jsx': 'Home.jsx'
    };
    for (const [oldName, newName] of Object.entries(pagesMap)) {
        const oldP = path.join(pagesDir, oldName);
        const newP = path.join(pagesDir, newName);
        if (fs.existsSync(oldP)) renameSyncCaseSafe(oldP, newP);
    }
}

// 2. Components directory moves
const componentsDir = path.join(srcDir, 'Components');
const newComponentsDir = path.join(srcDir, 'components');
if (fs.existsSync(componentsDir)) {
    renameSyncCaseSafe(componentsDir, newComponentsDir);
}

// 3. Move/Rename inside components
const moves = [
    ['aboutpage/about.jsx', 'AboutPage/About.jsx'],
    ['aboutpage/objective.jsx', 'AboutPage/Objective.jsx'],
    ['aboutpage/AvenuesofService.jsx', 'AboutPage/AvenuesofService.jsx'],
    ['getInvolved', 'GetInvolved'],
    ['withBackend/EventsDrive.jsx', 'Events/EventsDrive.jsx'],
    ['withBackend/FeedBack.jsx', 'Feedback/FeedBack.jsx'],
    ['withBackend/SaaFineTable.jsx', 'Admin/SaaFineTable.jsx'],
    ['Chatbot.jsx', 'Chatbot/Chatbot.jsx']
];

for (const [oldRel, newRel] of moves) {
    const oldP = path.join(newComponentsDir, oldRel);
    const newP = path.join(newComponentsDir, newRel);
    if (fs.existsSync(oldP)) renameSyncCaseSafe(oldP, newP);
}

// Cleanup empty withBackend
const withBackendDir = path.join(newComponentsDir, 'withBackend');
if (fs.existsSync(withBackendDir)) {
    try { fs.rmdirSync(withBackendDir); } catch(e){}
}
const aboutpageDir = path.join(newComponentsDir, 'aboutpage');
if (fs.existsSync(aboutpageDir)) {
    try { fs.rmdirSync(aboutpageDir); } catch(e){}
}

// 4. Update imports across all .jsx files
function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Replacements
            content = content.replace(/Components\//g, 'components/');
            content = content.replace(/pages\/projects/g, 'pages/Projects');
            content = content.replace(/pages\/about/g, 'pages/About');
            content = content.replace(/pages\/contactus/g, 'pages/ContactUs');
            content = content.replace(/pages\/meetTheTeam/g, 'pages/MeetTheTeam');
            content = content.replace(/pages\/home/g, 'pages/Home');
            
            content = content.replace(/aboutpage\/about/g, 'AboutPage/About');
            content = content.replace(/aboutpage\/objective/g, 'AboutPage/Objective');
            content = content.replace(/aboutpage\/AvenuesofService/g, 'AboutPage/AvenuesofService');
            content = content.replace(/getInvolved\//g, 'GetInvolved/');
            
            content = content.replace(/withBackend\/EventsDrive/g, 'Events/EventsDrive');
            content = content.replace(/withBackend\/FeedBack/g, 'Feedback/FeedBack');
            content = content.replace(/withBackend\/SaaFineTable/g, 'Admin/SaaFineTable');
            
            // App.jsx specific: import Chatbot from './Components/Chatbot' -> './components/Chatbot/Chatbot'
            content = content.replace(/components\/Chatbot['"]/g, 'components/Chatbot/Chatbot"');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

replaceInFiles(srcDir);
console.log("Restructuring complete!");
