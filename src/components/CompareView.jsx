import { X, Scale, Trophy } from "lucide-react";
import Stamp from "./Stamp";
import { inr } from "../lib/format";

const ROWS = [
  ["PRICE", (l) => inr(l.price)], ["CPU", (l) => l.processor], ["GPU", (l) => l.gpu],
  ["RAM", (l) => l.ram + "GB"], ["DISK", (l) => l.storage + "GB"], ["DISPLAY", (l) => l.display],
  ["BATTERY", (l) => l.battery + "h"], ["WEIGHT", (l) => l.weight + "kg"], ["OFFICE", (l) => l.office],
  ["WARRANTY", (l) => l.warranty], ["SMART SCORE", (l) => Math.round((l.meters.performance + l.meters.value) / 2) + "/100"],
];

export default function CompareView({ ids, laptops, onRemove, onClose }) {
  const items = laptops.filter((l) => ids.includes(l.id));
  if (!items.length) return null;

  const winnerId = items.reduce((best, l) => {
    const s = (l.meters.performance + l.meters.value) / 2;
    const bs = (best.meters.performance + best.meters.value) / 2;
    return s > bs ? l : best;
  }, items[0]).id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(21,21,28,0.85)]" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl p-6 bg-[var(--paper)] border-[3px] border-[var(--ink)] shadow-[12px_12px_0_var(--ink)] rounded-2xl relative overflow-hidden" style={{ maxHeight: "85vh", overflow: "auto", WebkitOverflowScrolling: "touch" }}>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="display text-4xl flex items-center gap-3 text-[var(--ink)] uppercase">
            <Scale size={28} strokeWidth={3} className="text-[var(--blue)]" /> 
            Compare Laptops
          </h2>
          <button onClick={onClose} className="p-2 rounded-full border-[3px] border-[var(--ink)] bg-white text-[var(--ink)] hover:bg-[var(--red)] hover:text-white transition-colors shadow-[2px_2px_0_var(--ink)] hoverable">
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="overflow-x-auto bg-white border-[3px] border-[var(--ink)] rounded-xl shadow-[4px_4px_0_var(--ink)]">
          <table className="w-full text-sm mono font-bold text-[var(--ink)]" style={{ minWidth: 600 }}>
            <thead>
              <tr className="bg-[var(--paper-2)] border-b-[3px] border-[var(--ink)]">
                <th className="text-left p-4 w-32 border-r-[3px] border-[var(--ink)] text-[var(--ink-soft)] uppercase tracking-wider">&nbsp;</th>
                {items.map((l) => (
                  <th key={l.id} className="text-left p-4 border-r-[3px] border-[var(--ink)] last:border-0 align-top">
                    <div className="flex flex-col gap-2">
                      <span className="display text-xl uppercase tracking-wide leading-none">{l.name}</span>
                      {l.id === winnerId && (
                        <div className="inline-flex">
                          <Stamp tone="pass"><Trophy size={14} className="inline -mt-1 mr-1" strokeWidth={3} />Winner</Stamp>
                        </div>
                      )}
                      <button onClick={() => onRemove(l.id)} className="text-xs uppercase tracking-widest text-[var(--red)] hover:underline mt-2 self-start">
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, fn]) => (
                <tr key={label} className="border-b-[3px] border-[var(--ink)] last:border-0 hover:bg-[var(--yellow)] transition-colors">
                  <td className="p-4 border-r-[3px] border-[var(--ink)] text-[var(--ink-soft)] tracking-wider uppercase">{label}</td>
                  {items.map((l) => (
                    <td key={l.id} className="p-4 border-r-[3px] border-[var(--ink)] last:border-0">
                      {fn(l)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
