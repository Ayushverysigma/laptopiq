import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { QUIZ_FLOW } from "../data/quizConfig";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz({ onComplete, onExit }) {
  const [history, setHistory] = useState(["start"]);
  const [answers, setAnswers] = useState({});

  const currentNodeKey = history[history.length - 1];
  const q = QUIZ_FLOW[currentNodeKey];

  const select = (opt) => {
    if (q.multi) {
      const cur = answers[q.id] || [];
      const next = cur.includes(opt)
        ? cur.filter((o) => o !== opt)
        : [...cur, opt];
      setAnswers({ ...answers, [q.id]: next });
    } else {
      setAnswers({ ...answers, [q.id]: opt });
    }
  };

  const canNext = q.multi ? true : !!answers[q.id];

  const next = () => {
    const nextNodeKey = q.next(answers);
    if (!nextNodeKey) {
      onComplete(answers);
    } else {
      setHistory([...history, nextNodeKey]);
    }
  };

  const prev = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  const slideVariants = {
    initial: { opacity: 0, x: 60, scale: 0.95 },
    enter: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: -60,
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="max-w-4xl mx-auto relative z-10 min-h-[75vh] flex flex-col justify-center py-10">
      <div className="absolute top-0 left-0 w-full flex items-center justify-between mb-12">
        <button
          onClick={onExit}
          className="text-sm font-bold mono uppercase tracking-widest flex items-center gap-2 text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors duration-300"
        >
          <ArrowLeft size={16} strokeWidth={3} /> Back to Home
        </button>
        <span className="font-mono font-bold text-xs tracking-[0.2em] uppercase text-[var(--ink)] bg-[var(--yellow)] px-4 py-2 rounded-full border-[3px] border-[var(--ink)] shadow-[2px_2px_0_var(--ink)]">
          Step {history.length}
        </span>
      </div>

      <div className="w-full relative mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNodeKey}
            variants={slideVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-full"
          >
            <h2 className="display text-5xl sm:text-6xl mb-12 leading-none text-[var(--ink)] uppercase">
              {q.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {(typeof q.options === "function"
                ? q.options(answers)
                : q.options
              ).map((opt, i) => {
                const active = q.multi
                  ? (answers[q.id] || []).includes(opt)
                  : answers[q.id] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => select(opt)}
                    className={`h-full w-full relative text-left transition-all duration-300 transform p-6 border-[3px] border-[var(--ink)] font-bold mono text-base sm:text-lg hoverable shadow-[4px_4px_0_var(--ink)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--ink)] ${active ? "bg-[var(--blue)] text-white" : "bg-white text-[var(--ink)] hover:bg-[var(--yellow)]"}`}
                  >
                    <span className="flex items-center justify-between gap-2 relative z-10 whitespace-normal break-words h-full">
                      <span>{opt}</span>
                      <span
                        className={`rounded-full p-1 border-2 border-[var(--ink)] shrink-0 transition-opacity duration-200 ${active ? "opacity-100 text-[var(--yellow)] bg-[var(--ink)]" : "opacity-0 pointer-events-none"}`}
                      >
                        <Check size={18} strokeWidth={4} />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-auto pt-8 border-t-[3px] border-[var(--ink)]">
        <button
          disabled={history.length === 1}
          onClick={prev}
          className="btn-brutal bg-white hoverable disabled:opacity-50 disabled:shadow-[5px_5px_0_var(--ink)] disabled:translate-x-0 disabled:translate-y-0 disabled:hover:bg-white flex items-center gap-2"
        >
          <ChevronLeft size={20} strokeWidth={3} /> Previous
        </button>
        <button
          disabled={!canNext}
          onClick={next}
          className="btn-brutal btn-brutal-primary hoverable disabled:opacity-50 disabled:shadow-[5px_5px_0_var(--ink)] disabled:translate-x-0 disabled:translate-y-0 disabled:hover:bg-[var(--red)] flex items-center gap-2"
        >
          {q.next(answers) === null ? "Generate Matches" : "Continue"}{" "}
          <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
