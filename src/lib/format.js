export const inr = (num) => {
  if (num === null || num === undefined) return "₹--";
  return "₹" + Number(num).toLocaleString("en-IN");
};

export const ordinal = (n) => {
  if (n == null) return "";
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
