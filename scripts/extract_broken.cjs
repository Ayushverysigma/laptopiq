const fs = require('fs');
const d = require('../src/data/enriched_laptops.json');

const broken = d.filter(x => !x.pros || !x.cons);
console.log(`Found ${broken.length} broken laptops.`);

const output = broken.map(x => ({
  id: x.id,
  brand: x.brand,
  name: x.name,
  cpu: x.processor,
  gpu: x.gpu,
  ram: x.ram,
  disk: x.storage,
  display: x.display,
  battery: x.battery,
  weight: x.weight,
  price: x.price || 50000
}));

fs.writeFileSync('C:\\Users\\Zayyan\\.gemini\\antigravity\\brain\\207632d2-ccc9-4973-beae-6fb209021d14\\broken_laptops.json', JSON.stringify(output, null, 2));
