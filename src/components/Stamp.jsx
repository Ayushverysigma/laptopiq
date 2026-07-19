import { TONE_VAR } from "../lib/scoring";

export default function Stamp({ tone, children }) {
  // Map tone to background colors
  let bg = "bg-white";
  let text = "text-[var(--ink)]";
  
  if (tone === "pass") { bg = "bg-[var(--green)]"; text = "text-[var(--ink)]"; }
  else if (tone === "good") { bg = "bg-[var(--blue)]"; text = "text-white"; }
  else if (tone === "fair") { bg = "bg-[var(--yellow)]"; text = "text-[var(--ink)]"; }
  else if (tone === "poor") { bg = "bg-[var(--red)]"; text = "text-white"; }

  return (
    <span className={`inline-block px-4 py-1.5 border-[3px] border-[var(--ink)] shadow-[2px_2px_0_var(--ink)] display tracking-widest uppercase rounded-full ${bg} ${text}`}>
      {children}
    </span>
  );
}
