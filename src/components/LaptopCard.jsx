import {
  Heart,
  Scale,
  Cpu,
  MonitorSmartphone,
  Battery,
  Weight,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import ScoreDial from "./ScoreDial";
import { matchLabel } from "../lib/scoring";
import { inr, ordinal } from "../lib/format";
import { retailerLinks } from "../lib/links";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function LaptopCard({
  l,
  rank,
  score,
  misses,
  wished,
  onWish,
  compared,
  onCompare,
  canCompare,
  onOpen,
  insight,
  customStamp,
  isTopPick,
}) {
  const m = matchLabel(score);
  const label = customStamp || m.label;
  const tone = customStamp ? "good" : m.tone;
  const showTopBadge = score !== null || isTopPick;
  const discount = Math.round(((l.mrp - l.price) / l.mrp) * 100);
  const links = retailerLinks(l);

  // Determine badge colors based on tone
  let badgeClass = "bg-[var(--blue)] text-white";
  if (tone === "pass") badgeClass = "bg-[var(--green)] text-[var(--ink)]";
  else if (tone === "fair") badgeClass = "bg-[var(--yellow)] text-[var(--ink)]";
  else if (tone === "poor") badgeClass = "bg-[var(--red)] text-white";

  return (
    <div
      onClick={() => onOpen(l)}
      className="card-brutal p-6 flex flex-col h-full cursor-pointer hoverable bg-white group"
    >
      {/* Top Banner Ribbon */}
      {showTopBadge && (
        <div
          className={`absolute top-[-3px] right-6 border-x-[3px] border-b-[3px] border-[var(--ink)] px-4 py-1.5 rounded-b-xl display tracking-widest uppercase z-10 shadow-[2px_2px_0_var(--ink)] ${badgeClass}`}
        >
          {label}
        </div>
      )}

      {rank != null && (
        <div className="absolute top-[-3px] left-6 border-x-[3px] border-b-[3px] border-[var(--ink)] px-3 py-1.5 rounded-b-xl display tracking-widest uppercase z-10 bg-[var(--yellow)] text-[var(--ink)] shadow-[2px_2px_0_var(--ink)]">
          #{rank + 1}
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mt-8 mb-4">
        <div>
          <h3 className="display text-3xl leading-none mb-2 text-[var(--ink)] group-hover:text-[var(--red)] transition-colors uppercase tracking-wide">
            {l.name}
          </h3>
          <p className="mono text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            {l.brand} · {l.os}
          </p>
        </div>
        {showTopBadge && (
          <div className="shrink-0 bg-[var(--paper-2)] border-[3px] border-[var(--ink)] rounded-2xl p-1 shadow-[2px_2px_0_var(--ink)] group-hover:rotate-6 transition-transform">
            <ScoreDial score={score} size={54} isTopPick={isTopPick} />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-3 mono font-bold mb-6 pb-4 border-b-[3px] border-[var(--ink)]">
        <span className="text-3xl text-[var(--ink)]">{inr(l.price)}</span>
        <span className="text-sm line-through text-[var(--ink-soft)]">
          {inr(l.mrp)}
        </span>
        {discount > 0 && (
          <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--red)] text-white border-2 border-[var(--ink)]">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Specs Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="mono text-[9px] tracking-widest uppercase font-bold border-2 border-[var(--ink)] rounded-full px-3 py-1 bg-[var(--paper-2)] text-[var(--ink)] flex items-center gap-1">
          <Cpu size={12} /> {l.processor}
        </span>
        <span className="mono text-[9px] tracking-widest uppercase font-bold border-2 border-[var(--ink)] rounded-full px-3 py-1 bg-[var(--paper-2)] text-[var(--ink)] flex items-center gap-1">
          <MonitorSmartphone size={12} /> {l.display}
        </span>
        <span className="mono text-[9px] tracking-widest uppercase font-bold border-2 border-[var(--ink)] rounded-full px-3 py-1 bg-[var(--paper-2)] text-[var(--ink)] flex items-center gap-1">
          <Battery size={12} /> {l.battery}H
        </span>
        <span className="mono text-[9px] tracking-widest uppercase font-bold border-2 border-[var(--ink)] rounded-full px-3 py-1 bg-[var(--paper-2)] text-[var(--ink)] flex items-center gap-1">
          <Weight size={12} /> {l.weight}KG
        </span>
      </div>

      {score !== null && misses && misses.length > 0 && (
        <div className="text-xs leading-relaxed p-3 mb-6 font-bold mono border-[3px] border-[var(--ink)] bg-[#FFF0E5] text-orange-700 shadow-[3px_3px_0_var(--ink)]">
          <span className="display text-lg mb-1 block">⚠️ Trade-offs:</span>
          <ul className="list-square pl-4 space-y-1">
            {misses.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWish(l.id);
          }}
          aria-label="Save to wishlist"
          className={`hoverable flex-1 py-3 border-[3px] border-[var(--ink)] font-bold display text-xl tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[3px_3px_0_var(--ink)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_var(--ink)] ${wished ? "bg-[var(--red)] text-white" : "bg-white text-[var(--ink)] hover:bg-[var(--red)] hover:text-white"}`}
        >
          <Heart
            size={20}
            strokeWidth={2.5}
            fill={wished ? "currentColor" : "none"}
          />{" "}
          {wished ? "Saved" : "Save"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCompare(l.id);
          }}
          disabled={!compared && !canCompare}
          aria-label="Compare"
          className={`hoverable flex-1 py-3 border-[3px] border-[var(--ink)] font-bold display text-xl tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[3px_3px_0_var(--ink)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_var(--ink)] disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_var(--ink)] ${compared ? "bg-[var(--blue)] text-white" : "bg-white text-[var(--ink)] hover:bg-[var(--yellow)]"}`}
        >
          <Scale size={20} strokeWidth={2.5} /> Compare
        </button>
      </div>
    </div>
  );
}
