import { matchLabel, TONE_VAR } from "../lib/scoring";
import { Star, HelpCircle } from "lucide-react";

export default function ScoreDial({ score, size = 64, isTopPick = false }) {
  if (score === null) {
    if (isTopPick) {
      return (
        <div
          className="relative shrink-0 flex items-center justify-center rounded-full bg-[var(--yellow)] border-[3px] border-[var(--ink)] shadow-[2px_2px_0_var(--ink)]"
          style={{ width: size, height: size }}
        >
          <Star
            size={size * 0.4}
            className="text-[var(--ink)]"
            strokeWidth={3}
            fill="currentColor"
          />
        </div>
      );
    }
    return (
      <div
        className="relative shrink-0 flex items-center justify-center rounded-full bg-white border-[3px] border-[var(--ink)] shadow-[2px_2px_0_var(--ink)]"
        style={{ width: size, height: size }}
      >
        <HelpCircle
          size={size * 0.4}
          className="text-[var(--ink-soft)]"
          strokeWidth={2.5}
        />
      </div>
    );
  }

  const r = 40;
  const c = 2 * Math.PI * r;
  const tone = matchLabel(score).tone;

  return (
    <div
      className="relative shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="-rotate-90"
      >
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={TONE_VAR[tone]}
          strokeWidth="10"
          strokeLinecap="square"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center font-bold text-[var(--ink)] display"
        style={{ fontSize: size * 0.4, marginTop: "2px" }}
      >
        <span>{score}</span>
      </div>
    </div>
  );
}
