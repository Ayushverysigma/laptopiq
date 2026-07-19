import { BUDGET_RANGES, USE_TO_TAG } from "../data/quizConfig";

export function scoreLaptop(l, a) {
  let score = 0;
  const misses = [];

  // 1. Budget Constraint
  const [lo, hi] = BUDGET_RANGES[a.budget] || [0, 200000];
  const isNoBudget = a.budget === "No Budget Limit";

  if (isNoBudget) {
    if (l.price < 100000) {
      misses.push(
        `Not a premium high-end tier (₹${l.price.toLocaleString("en-IN")})`,
      );
      score -= 15;
    } else if (l.price >= 150000) {
      score += 35;
    } else {
      score += 15;
    }
  } else {
    const buffer = hi * 0.1; // 10% flexible buffer
    if (l.price > hi + buffer) {
      const overage = l.price - hi;
      misses.push(`Over budget by ₹${overage.toLocaleString("en-IN")}`);
      // No points
    } else if (l.price > hi) {
      const overage = l.price - hi;
      misses.push(
        `Slightly over budget by ₹${overage.toLocaleString("en-IN")}`,
      );
      score += 15; // penalty but still acceptable
    } else if (l.price < lo) {
      score += 15;
    } else {
      score += 25;
    }
  }

  // 2. OS Constraint
  if (a.os && a.os !== "Doesn't Matter") {
    const l_os = (l.os || "").toLowerCase();
    if (a.os === "macOS" && !(l_os === "mac" || l_os === "macos")) {
      misses.push(`Requires macOS (This is ${l.os})`);
      score -= 40;
    } else if (a.os === "Windows" && l_os !== "windows") {
      misses.push(`Requires Windows (This is ${l.os})`);
      score -= 40;
    } else {
      score += 5;
    }
  } else {
    score += 5;
  }

  // 3. Brand Constraint
  if (a.brand && a.brand !== "Doesn't Matter" && a.brand !== "Any") {
    if (l.brand !== a.brand) {
      misses.push(`Not an ${a.brand} laptop`);
    } else {
      score += 5;
    }
  } else {
    score += 5;
  }

  // 4. GPU Constraint
  if (a.gpuPref === "Yes, absolutely (Heavy gaming/CAD)") {
    const gpuLower = l.gpu.toLowerCase();
    const hasDedicated =
      gpuLower.includes("rtx") ||
      gpuLower.includes("rx") ||
      gpuLower.includes("dedicated") ||
      gpuLower.includes("apple");
    if (!hasDedicated) {
      misses.push("Lacks a dedicated/high-end GPU");
    } else {
      score += 15;
    }
  } else if (a.gpuPref === "No, I prioritize battery life") {
    const hasIntegrated =
      l.gpu.toLowerCase().includes("integrated") ||
      l.gpu.toLowerCase().includes("iris") ||
      l.gpu.toLowerCase().includes("adreno");
    score += hasIntegrated ? 15 : 5;
  } else {
    score += 10;
  }

  // 5. Display Preference
  if (a.displayPref === "Critical (Need OLED/100% sRGB)") {
    if (l.displayType !== "OLED") {
      misses.push("Display is not OLED");
    } else {
      score += 10;
    }
  } else {
    score += 8;
  }

  // 6. Workload / Uses
  const uses = a.uses && a.uses.length ? a.uses : ["Daily Tasks"];
  const tagVals = uses.map((u) => l.tags[USE_TO_TAG[u]] || 50);
  score += (tagVals.reduce((s, v) => s + v, 0) / tagVals.length) * 0.25;

  const heavyWorkloads = [
    "Gaming",
    "Video Editing",
    "3D Rendering",
    "AI/ML",
    "CAD (3D Modeling)",
    "Graphic Design",
  ];
  const hasHeavy = uses.some((u) => heavyWorkloads.includes(u));
  if (hasHeavy && l.ram < 16) {
    misses.push(`Needs at least 16GB RAM for heavy tasks (has ${l.ram}GB)`);
    score -= 15;
  }

  // 7. Portability
  if (a.portability === "Very (Ultra-light)") {
    if (l.weight > 1.8) {
      misses.push(`Too heavy (${l.weight}kg)`);
    } else {
      score += l.weight <= 1.4 ? 10 : 5;
    }
  } else if (a.portability === "Moderate (Standard)") {
    score += l.weight <= 1.9 ? 10 : 5;
  } else {
    score += 8;
  }

  // 8. Battery
  if (a.battery === "All-day (10+ hours)") {
    if (l.battery < 8) {
      misses.push(`Short battery life (${l.battery}h)`);
    } else {
      score += l.battery >= 12 ? 10 : 7;
    }
  } else if (a.battery === "Standard (5-8 hours)") {
    score += l.battery >= 5 ? 10 : 5;
  } else {
    score += 8;
  }

  // 9. Age / Generation Bonus
  const year = getYearFromProcessor(l.processor, l.name);
  if (year >= 2024) {
    score += 5; // Slight bonus for newest models
  } else if (year === 2023) {
    score -= 10;
    misses.push(`Older model (${year} architecture)`);
  } else if (year <= 2022) {
    score -= 20;
    misses.push(`Outdated model (${year} architecture)`);
  }

  return {
    score: Math.max(1, Math.min(100, Math.round(score))),
    misses,
  };
}

export function getYearFromProcessor(processor = "", name = "") {
  const p = (processor + " " + name).toLowerCase();

  if (
    p.includes("14th gen") ||
    p.includes("core ultra") ||
    p.includes("ryzen 8") ||
    p.includes("ryzen ai") ||
    p.includes("m3 ") ||
    p.includes("m4 ") ||
    p.includes("snapdragon x")
  )
    return 2024;
  if (
    p.includes("13th gen") ||
    p.includes("ryzen 7") ||
    p.includes("m2 pro") ||
    p.includes("m2 max")
  )
    return 2023;
  if (p.includes("12th gen") || p.includes("ryzen 6") || p.includes("m2 "))
    return 2022;
  if (
    p.includes("11th gen") ||
    p.includes("10th gen") ||
    p.includes("ryzen 5") ||
    p.includes("ryzen 4") ||
    p.includes("ryzen 3") ||
    p.includes("m1 ")
  )
    return 2020;

  return 2022; // default guess if unidentifiable
}

export function matchLabel(score) {
  if (score === null) return { label: "Unranked", tone: "low" };
  if (score >= 93) return { label: "Perfect Match", tone: "pass" };
  if (score >= 88) return { label: "Excellent Match", tone: "good" };
  if (score >= 80) return { label: "Good Match", tone: "fair" };
  return { label: "Fair Match", tone: "low" };
}

export const TONE_VAR = {
  pass: "var(--green)",
  good: "var(--blue)",
  fair: "var(--yellow)",
  low: "var(--red)",
};
