const d = require('../src/data/enriched_laptops.json');

let flagged = [];

for (const l of d) {
  let issues = [];
  
  if (!l.pros || l.pros.length === 0) issues.push('Missing pros');
  if (!l.cons || l.cons.length === 0) issues.push('Missing cons');
  if (!l.who) issues.push('Missing who');
  if (!l.notWho) issues.push('Missing notWho');
  if (l.rating == null || l.rating < 1 || l.rating > 5) issues.push(`Invalid rating: ${l.rating}`);
  if (l.reviews == null || l.reviews < 0) issues.push(`Invalid reviews: ${l.reviews}`);
  
  if (l.battery == null || l.battery > 30 || l.battery < 1) issues.push(`Invalid battery: ${l.battery}`);
  if (l.weight == null || l.weight > 6 || l.weight < 0.5) issues.push(`Invalid weight: ${l.weight}`);
  if (l.price == null || l.price < 10000 || l.price > 1000000) issues.push(`Invalid price: ${l.price}`);
  
  if (issues.length > 0) {
    flagged.push({ id: l.id, name: l.name, issues });
  }
}

console.log(`Audit complete. Found ${flagged.length} flagged laptops.`);
if (flagged.length > 0) {
  const fs = require('fs');
  fs.writeFileSync('C:/Users/Zayyan/.gemini/antigravity/brain/207632d2-ccc9-4973-beae-6fb209021d14/flagged_laptops.json', JSON.stringify(flagged, null, 2));
  console.log('Flagged laptops written to file.');
}
