const fs = require('fs');

const content = fs.readFileSync('src/data/teamData.js', 'utf8');

// evaluate the file to get the arrays
// we can just match all id: \d+
const ids = [...content.matchAll(/id:\s*(\d+)/g)].map(m => parseInt(m[1]));
const uniqueIds = new Set(ids);
console.log(`Total ids: ${ids.length}, Unique ids: ${uniqueIds.size}`);

const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);
console.log(`Duplicate IDs: ${[...new Set(duplicates)].join(', ')}`);
