const fs = require('fs');

let content = fs.readFileSync('src/data/teamData.js', 'utf8');

let counter = 1;

// Replace all id: <number>, with a uniquely generated id
content = content.replace(/id:\s*\d+,?/g, '');

// Now we need to inject id: <counter>, at the beginning of each object { ...
content = content.replace(/\{\s*name:/g, () => `{ id: ${counter++}, name:`);
content = content.replace(/\{\s*role:/g, () => `{ id: ${counter++}, role:`); // Some start with role

fs.writeFileSync('src/data/teamData.js', content);
console.log('Fixed IDs!');
