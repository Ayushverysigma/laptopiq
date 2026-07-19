import {
  X,
  Check,
  Info,
  Laptop,
  ExternalLink,
  Star,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import Stamp from "./Stamp";
import ScoreDial from "./ScoreDial";
import RadarMeter from "./RadarMeter";
import { matchLabel } from "../lib/scoring";
import { inr } from "../lib/format";
import { retailerLinks, budgetTip } from "../lib/links";
import { motion, AnimatePresence } from "framer-motion";

export default function DetailModal({ l, score, onClose }) {
  if (!l) return null;
  const links = retailerLinks(l);
  const tip = budgetTip(l);
  const meterRows = [
    ["Performance", l.meters.performance],
    ["Battery", l.meters.battery],
    ["Coding", l.meters.coding],
    ["Gaming", l.meters.gaming],
    ["Editing", l.meters.editing],
    ["Portability", l.meters.portability],
    ["Value", l.meters.value],
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[rgba(21,21,28,0.85)]"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full sm:max-w-3xl p-6 sm:p-8 bg-[var(--paper)] border-[3px] border-[var(--ink)] shadow-[12px_12px_0_var(--ink)] rounded-t-3xl sm:rounded-3xl relative overflow-hidden"
          style={{
            maxHeight: "90vh",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-white border-[3px] border-[var(--ink)] shadow-[3px_3px_0_var(--ink)]">
                <Laptop
                  size={28}
                  className="text-[var(--ink)]"
                  strokeWidth={2.5}
                />
              </div>
              <div>
                <h2 className="display text-4xl text-[var(--ink)] uppercase leading-none mb-1">
                  {l.name}
                </h2>
                <p className="mono font-bold text-sm text-[var(--ink-soft)] uppercase tracking-wider">
                  {l.brand} · {l.os}
                </p>
                <div className="flex items-center gap-1.5 mt-2 font-mono text-xs text-[var(--ink-soft)] font-bold uppercase">
                  <Star
                    size={14}
                    fill="var(--yellow)"
                    stroke="var(--ink)"
                    strokeWidth={2}
                  />
                  <span className="text-[var(--ink)] text-sm">
                    {l.rating || "NEW"}
                  </span>{" "}
                  · {l.reviews ? l.reviews.toLocaleString("en-IN") : "0"}{" "}
                  RATINGS
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border-[3px] border-[var(--ink)] bg-white text-[var(--ink)] hover:bg-[var(--red)] hover:text-white transition-colors shadow-[2px_2px_0_var(--ink)] hoverable"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          {score !== null && (
            <div className="flex items-center gap-6 mb-6 p-5 rounded-2xl bg-white border-[3px] border-[var(--ink)] shadow-[4px_4px_0_var(--ink)]">
              <ScoreDial score={score} size={80} />
              <div>
                <Stamp tone={matchLabel(score).tone}>
                  {matchLabel(score).label}
                </Stamp>
                <p className="text-xs mt-3 text-[var(--ink-soft)] font-bold mono uppercase tracking-wider">
                  Based on your quiz answers
                </p>
              </div>
            </div>
          )}

          {/* Removed AI insight section */}

          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="display text-2xl text-[var(--blue)] uppercase mb-4">
                Specs
              </h4>
              <ul className="text-sm space-y-3 font-mono text-[var(--ink)] font-bold">
                <li className="flex gap-2">
                  <span className="text-[var(--ink-soft)] w-[80px]">CPU</span>{" "}
                  {l.processor}
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--ink-soft)] w-[80px]">GPU</span>{" "}
                  {l.gpu}
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--ink-soft)] w-[80px]">RAM</span>{" "}
                  {l.ram}GB
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--ink-soft)] w-[80px]">DISK</span>{" "}
                  {l.storage}GB SSD
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--ink-soft)] w-[80px]">
                    DISPLAY
                  </span>{" "}
                  {l.display}
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--ink-soft)] w-[80px]">
                    BATTERY
                  </span>{" "}
                  {l.battery}H
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--ink-soft)] w-[80px]">
                    WEIGHT
                  </span>{" "}
                  {l.weight}KG
                </li>
                <li className="flex items-center gap-2 mt-4 pt-4 border-t-[3px] border-[var(--ink)] text-[var(--green)]">
                  <ShieldCheck size={18} strokeWidth={2.5} /> {l.warranty}{" "}
                  WARRANTY INCLUDED
                </li>
              </ul>
            </div>
            <div>
              <h4 className="display text-2xl text-[var(--blue)] uppercase mb-4">
                Performance
              </h4>
              <div className="mb-6">
                <RadarMeter meters={l.meters} />
              </div>
              <div className="space-y-3">
                {meterRows.map(([label, val]) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 text-[10px] font-bold mono uppercase tracking-wider"
                  >
                    <span className="w-24 shrink-0 text-[var(--ink)]">
                      {label}
                    </span>
                    <div className="flex-1 h-3 border-[2px] border-[var(--ink)] bg-white overflow-hidden rounded-full">
                      <div
                        className="h-full bg-[var(--blue)]"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-[var(--ink)]">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-[var(--green)]/20 border-[3px] border-[var(--ink)] shadow-[4px_4px_0_var(--ink)]">
              <h4
                className="display text-2xl text-[var(--green)] uppercase mb-3 text-shadow-sm"
                style={{ textShadow: "1px 1px 0 var(--ink)" }}
              >
                Pros
              </h4>
              <ul className="text-sm space-y-3 font-bold mono text-[var(--ink)]">
                {(l.pros || []).map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <Check
                      size={18}
                      strokeWidth={3}
                      className="shrink-0 text-[var(--green)]"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--red)]/10 border-[3px] border-[var(--ink)] shadow-[4px_4px_0_var(--ink)]">
              <h4
                className="display text-2xl text-[var(--red)] uppercase mb-3 text-shadow-sm"
                style={{ textShadow: "1px 1px 0 var(--ink)" }}
              >
                Cons
              </h4>
              <ul className="text-sm space-y-3 font-bold mono text-[var(--ink)]">
                {(l.cons || []).map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <X
                      size={18}
                      strokeWidth={3}
                      className="shrink-0 text-[var(--red)]"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-6 mb-8 text-sm font-bold mono rounded-2xl bg-white border-[3px] border-[var(--ink)] shadow-[4px_4px_0_var(--ink)]">
            <p className="mb-3 text-[var(--ink)]">
              <span className="text-[var(--blue)]">WHO SHOULD BUY:</span>{" "}
              {l.who}
            </p>
            <p className="text-[var(--ink)]">
              <span className="text-[var(--red)]">WHO SHOULDN'T:</span>{" "}
              {l.notWho}
            </p>
          </div>

          {tip && (
            <div className="p-6 mb-8 text-sm flex gap-4 rounded-2xl border-[3px] border-[var(--ink)] bg-[var(--paper-2)] shadow-[4px_4px_0_var(--ink)]">
              <div className="w-10 h-10 rounded-full border-[3px] border-[var(--ink)] bg-[var(--yellow)] flex items-center justify-center shrink-0">
                <TrendingUp
                  size={20}
                  strokeWidth={2.5}
                  className="text-[var(--ink)]"
                />
              </div>
              <p className="text-[var(--ink)] font-bold mono">
                <span className="text-[var(--blue)]">
                  SPEND {inr(tip.diff)} MORE
                </span>{" "}
                and step up to the{" "}
                <span className="text-[var(--red)]">
                  {tip.better.brand}{" "}
                  {tip.better.name.split("(")[0].split("-")[0].trim()}
                </span>{" "}
                for{" "}
                {tip.perks.length > 1
                  ? tip.perks.slice(0, -1).join(", ") +
                    " and " +
                    tip.perks[tip.perks.length - 1]
                  : tip.perks[0]}
                .
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <a
              href={links.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal btn-brutal-primary flex-1 hoverable"
            >
              Buy on Amazon <ExternalLink size={20} strokeWidth={2.5} />
            </a>
            <a
              href={links.flipkart}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal bg-[var(--blue)] text-white hover:bg-[var(--blue)] flex-1 hoverable hover:-translate-y-0.5"
              style={{ boxShadow: "5px 5px 0 var(--ink)" }}
            >
              Buy on Flipkart <ExternalLink size={20} strokeWidth={2.5} />
            </a>
          </div>

          <p className="text-[10px] mt-6 font-bold mono uppercase tracking-wider flex items-center justify-center gap-2 text-[var(--ink-soft)]">
            <Info size={14} strokeWidth={2.5} /> Pricing and availability are
            determined by the retailer.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
