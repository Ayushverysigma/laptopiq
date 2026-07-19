export const BUDGETS = ["Under ₹30,000", "₹30k–40k", "₹40k–50k", "₹50k–60k", "₹60k–80k", "₹80k+", "No Budget Limit"];

export const BUDGET_RANGES = {
  "Under ₹30,000": [0, 30000], "₹30k–40k": [30000, 40000], "₹40k–50k": [40000, 50000],
  "₹50k–60k": [50000, 60000], "₹60k–80k": [60000, 80000], "₹80k+": [80000, 200000],
  "No Budget Limit": [100000, 1000000],
};

export const STUDENT_TYPES = ["Engineering", "Arts & Design", "Business & Commerce", "Medical & Sciences", "High School", "Other"];

// Branch-specific workload options
export const USES_ENGINEERING = ["Coding", "AI/ML", "CAD (3D Modeling)", "Gaming", "Daily Tasks"];
export const USES_ARTS = ["Graphic Design", "Video Editing", "3D Rendering", "Digital Art", "Daily Tasks"];
export const USES_BUSINESS = ["Excel/Data Crunching", "Presentations", "Notes & Research", "Daily Tasks"];
export const USES_MEDICAL = ["Research", "Notes", "Light Daily Tasks"];

export const USE_TO_TAG = {
  "Coding": "coding", "Gaming": "gaming", "Video Editing": "editing", "Graphic Design": "editing",
  "AI/ML": "aiml", "CAD (3D Modeling)": "cad", "3D Rendering": "cad", "Excel/Data Crunching": "daily",
  "Presentations": "daily", "Notes & Research": "daily", "Digital Art": "editing", "Research": "daily",
  "Notes": "daily", "Light Daily Tasks": "daily", "Daily Tasks": "daily"
};

export const BRANDS = ["Lenovo", "ASUS", "HP", "Dell", "Acer", "Apple", "MSI", "Samsung", "Doesn't Matter"];

// We define a graph-like structure. 
// Instead of an array, we define a tree where each step points to the next ID.
export const QUIZ_FLOW = {
  start: {
    id: "budget",
    title: "What's your budget?",
    multi: false,
    options: BUDGETS,
    next: () => "studentType"
  },
  studentType: {
    id: "studentType",
    title: "What is your field of study?",
    multi: false,
    options: STUDENT_TYPES,
    next: (ans) => {
      const type = ans["studentType"];
      if (type === "Engineering") return "uses_engineering";
      if (type === "Arts & Design") return "uses_arts";
      if (type === "Business & Commerce") return "uses_business";
      return "uses_general";
    }
  },
  // --- WORKLOAD BRANCHES ---
  uses_engineering: {
    id: "uses",
    title: "What engineering workloads will you run?",
    multi: true,
    options: USES_ENGINEERING,
    next: () => "gpuPref"
  },
  uses_arts: {
    id: "uses",
    title: "What creative workloads will you handle?",
    multi: true,
    options: USES_ARTS,
    next: () => "displayPref"
  },
  uses_business: {
    id: "uses",
    title: "What are your primary tasks?",
    multi: true,
    options: USES_BUSINESS,
    next: () => "portability"
  },
  uses_general: {
    id: "uses",
    title: "What will you mainly use it for?",
    multi: true,
    options: ["Notes", "Web Browsing", "Watching Movies", "Light Gaming"],
    next: () => "portability"
  },

  // --- SECONDARY PREFERENCES ---
  gpuPref: {
    id: "gpuPref",
    title: "Do you need a dedicated Graphics Card?",
    multi: false,
    options: ["Yes, absolutely (Heavy gaming/CAD)", "No, I prioritize battery life", "Not sure"],
    next: () => "os"
  },
  displayPref: {
    id: "displayPref",
    title: "How important is display color accuracy?",
    multi: false,
    options: ["Critical (Need OLED/100% sRGB)", "Nice to have", "Doesn't Matter"],
    next: () => "os"
  },
  portability: {
    id: "portability",
    title: "How important is a lightweight design?",
    multi: false,
    options: ["Very (Ultra-light)", "Moderate (Standard)", "Not at all (Desktop replacement)"],
    next: () => "battery"
  },
  battery: {
    id: "battery",
    title: "How much battery life do you need?",
    multi: false,
    options: ["All-day (10+ hours)", "Standard (5-8 hours)", "Mostly plugged in"],
    next: () => "os"
  },

  // --- FINAL PREFERENCES ---
  os: {
    id: "os",
    title: "Preferred Operating System?",
    multi: false,
    options: ["Windows", "macOS", "Doesn't Matter"],
    next: () => "brand"
  },
  brand: {
    id: "brand",
    title: "Any brand preference?",
    multi: false,
    options: BRANDS,
    next: () => null // End of quiz
  }
};
