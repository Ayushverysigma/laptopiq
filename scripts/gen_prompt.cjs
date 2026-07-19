const d = require('C:/Users/Zayyan/.gemini/antigravity/brain/207632d2-ccc9-4973-beae-6fb209021d14/broken_laptops.json');
const out = d.map(x => `${x.id} | ${x.brand} ${x.name} | ${x.cpu} | ${x.gpu} | ${x.ram}GB | ${x.battery}H | ${x.weight}KG | ${x.price}`);
const fs = require('fs');
fs.writeFileSync('C:/Users/Zayyan/.gemini/antigravity/brain/207632d2-ccc9-4973-beae-6fb209021d14/compact_broken.txt', out.join('\n'));
