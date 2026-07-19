const fs = require('fs');

const d = require('../src/data/enriched_laptops.json');
const b1 = require('./batch1.json');
const b2 = require('./batch2.json');
const b3 = require('./batch3.json');
const b4 = require('./batch4.json');

const merged = { ...b1, ...b2, ...b3, ...b4 };

let updatedCount = 0;
for (let i = 0; i < d.length; i++) {
  if (merged[d[i].id]) {
    d[i] = { ...d[i], ...merged[d[i].id] };
    updatedCount++;
  }
}

fs.writeFileSync('./src/data/enriched_laptops.json', JSON.stringify(d, null, 2));
console.log(`Successfully merged ${updatedCount} hand-written laptop entries.`);
