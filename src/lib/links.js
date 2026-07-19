import { LAPTOPS } from "../data/laptops";

/* Real, always-valid retailer search links (not a fabricated single SKU page —
   these resolve to live current listings, so they stay correct even as exact
   stock-keeping units go in and out of stock or get repriced). */
export function retailerLinks(l) {
  const q = encodeURIComponent(`${l.brand} ${l.name} ${l.ram}GB ${l.storage}GB`);
  return {
    amazon: `https://www.amazon.in/s?k=${q}`,
    flipkart: `https://www.flipkart.com/search?q=${q}`,
  };
}

/* Finds a laptop that costs a bit more but genuinely scores higher, and
   summarises what you'd actually gain for the extra spend. */
export function budgetTip(l) {
  const candidates = LAPTOPS.filter((o) => {
    return o.id !== l.id && 
           o.price > l.price && 
           o.price - l.price <= 8000 &&
           o.battery >= l.battery - 1.5 &&
           o.weight <= l.weight + 0.3 &&
           o.meters.value > l.meters.value;
  });
  if (!candidates.length) return null;

  const better = candidates.sort((a, b) => b.meters.value - a.meters.value)[0];

  const diff = better.price - l.price;
  const perks = [];
  if (better.ram > l.ram) perks.push(`${better.ram}GB RAM`);
  if (better.gpu !== l.gpu && !better.gpu.includes("Integrated")) {
    const cleanGpu = better.gpu.replace(/\s*\([^)]*\)/g, '').trim();
    perks.push(`a ${cleanGpu}`);
  }
  if (better.displayType !== l.displayType) perks.push(`an ${better.displayType} display`);
  if (better.battery > l.battery) perks.push(`a ${better.battery}h battery`);
  if (!perks.length && better.processor !== l.processor) perks.push(`a faster ${better.processor.split(" ").slice(0, 3).join(" ")} processor`);
  if (!perks.length) perks.push(`a strictly better overall value score`);

  return { diff, better, perks };
}
