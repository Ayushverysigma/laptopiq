import enrichedLaptops from './enriched_laptops.json';

export const LAPTOPS = enrichedLaptops.map(l => {
  const p = (l.processor || "").toLowerCase();
  const g = (l.gpu || "").toLowerCase();
  
  let perfBase = Math.min(100, (l.ram / 32) * 100);
  if (p.includes("i9") || p.includes("ryzen 9") || p.includes("m3 max") || p.includes("m4") || p.includes("ultra 9")) perfBase = Math.max(perfBase, 95);
  else if (p.includes("i7") || p.includes("ryzen 7") || p.includes("core ultra 7") || p.includes("m2 pro") || p.includes("m3 pro") || p.includes("snapdragon")) perfBase = Math.max(perfBase, 80);
  else if (p.includes("i5") || p.includes("ryzen 5") || p.includes("core ultra 5") || p.includes("m2") || p.includes("m3") || p.includes("m1")) perfBase = Math.max(perfBase, 65);
  else perfBase = Math.max(perfBase, 40);

  const battery = Math.min(100, Math.round((l.battery / 15) * 100));

  let gaming = 20;
  if (g.includes("rtx 4090") || g.includes("rtx 4080")) gaming = 100;
  else if (g.includes("rtx 4070") || g.includes("rtx 3080")) gaming = 90;
  else if (g.includes("rtx 4060") || g.includes("rtx 3070")) gaming = 75;
  else if (g.includes("rtx 4050") || g.includes("rtx 3060") || g.includes("rtx 3050") || g.includes("rtx 2050") || g.includes("rx 6500") || g.includes("rx 7600")) gaming = 60;
  else if (p.includes("m3 max") || p.includes("m2 max") || p.includes("m3 pro") || p.includes("m2 pro")) gaming = 55;
  else if (g.includes("arc") || g.includes("radeon 680m") || g.includes("radeon 780m")) gaming = 40;

  const coding = Math.min(100, Math.round(perfBase + (l.ram >= 16 ? 15 : 0)));
  const editing = Math.min(100, Math.round((perfBase + gaming) / 2) + (l.ram >= 16 ? 10 : 0) + (l.displayType === "OLED" || l.displayType === "Mini-LED" ? 15 : 0));
  const portability = Math.max(0, Math.min(100, Math.round(100 - ((l.weight - 1.0) / 1.5) * 80)));
  const value = Math.max(40, Math.min(100, Math.round((perfBase + gaming + battery + portability) / 4) + (l.price < 50000 ? 15 : l.price < 80000 ? 5 : -10)));

  return {
    ...l,
    meters: {
      performance: Math.round(perfBase),
      battery, gaming, coding, editing, portability, value
    }
  };
});
