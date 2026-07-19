const fs = require('fs');
const d = require('../src/data/enriched_laptops.json');

let updated = 0;
for (const l of d) {
  if (l.rating != null && l.rating > 5) {
    // Convert 0-100 scale to 1.0-5.0 scale
    let newRating = (l.rating / 100) * 5;
    // Round to 1 decimal place
    l.rating = Math.max(1, Math.round(newRating * 10) / 10);
    updated++;
  }
}

fs.writeFileSync('./src/data/enriched_laptops.json', JSON.stringify(d, null, 2));
console.log(`Normalized ${updated} laptop ratings from 0-100 to 1-5 stars.`);
