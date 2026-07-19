import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "./hooks/useLocalStorage";

import Header from "./components/Header";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import ResultsView from "./components/ResultsView";
import DetailModal from "./components/DetailModal";
import CompareView from "./components/CompareView";
import LaptopCard from "./components/LaptopCard";
import StaticPage from "./components/StaticPage";

import { LAPTOPS } from "./data/laptops";
import { scoreLaptop } from "./lib/scoring";
import { useToast } from "./hooks/useToast";

export default function App() {
  const [dark, setDark] = useState(false);
  const [view, setView] = useState("home"); // "home" | "quiz" | "results"
  const [answers, setAnswers] = useLocalStorage("lapiq-answers", null);
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useLocalStorage("lapiq-wishlist", []);
  const [compareIds, setCompareIds] = useState([]);
  const [openLaptop, setOpenLaptop] = useState(null);
  const [showCompare, setShowCompare] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    const moveCursor = (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };

    const handleMouseOver = (e) => {
      const isHoverable = e.target.closest("button, a, .hoverable, .btn-brutal, .meteor-card, .card-brutal");
      if (isHoverable) {
        ring.classList.add("hovering");
      } else {
        ring.classList.remove("hovering");
      }
    };

    const WORDS = ["THWACK!", "BAM!", "ZAP!", "GOTCHA!", "SNAP!"];
    const handleMouseClick = (e) => {
      const burst = document.createElement("div");
      burst.className = "burst";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      const word = WORDS[Math.floor(Math.random() * WORDS.length)];
      const col = Math.random() < 0.5 ? "var(--red)" : "var(--blue)";
      burst.innerHTML = `<svg viewBox="0 0 100 100"><polygon points="50,2 58,30 88,12 70,38 98,46 70,56 86,84 56,68 50,98 42,68 14,86 30,56 2,48 30,40 12,12 42,30" fill="${col}" stroke="var(--ink)" stroke-width="1.5" opacity="0.6"/></svg><b style="opacity: 0.8;">${word}</b>`;
      document.body.appendChild(burst);

      burst.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      burst.style.transform = "translate(-50%, -50%) scale(0) rotate(-20deg)";
      
      void burst.offsetWidth; // Force reflow

      burst.style.transform = "translate(-50%, -50%) scale(1) rotate(6deg)";

      setTimeout(() => {
        burst.style.transition = "opacity 0.3s, transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045)";
        burst.style.transform = "translate(-50%, -50%) scale(0)";
        burst.style.opacity = "0";
        setTimeout(() => burst.remove(), 300);
      }, 550);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseClick);
    };
  }, []);

  const scored = useMemo(() => {
    if (!answers) return LAPTOPS.map((l) => ({ l, score: null, misses: [] }));
    return LAPTOPS.map((l) => {
      const result = scoreLaptop(l, answers);
      return { l, score: result.score, misses: result.misses };
    }).sort((a, b) => b.score - a.score);
  }, [answers]);

  let filtered = scored.filter(({ l, score }) => {
    if (answers && score < 75) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return l.name.toLowerCase().includes(q) || l.processor.toLowerCase().includes(q) || l.brand.toLowerCase().includes(q) || l.gpu.toLowerCase().includes(q);
  });

  if (answers && !query.trim()) {
    filtered = filtered.slice(0, 6);
  }

  const toggleWish = (id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
    toast.show(wishlist.includes(id) ? "Removed from wishlist" : "Saved to wishlist");
  };

  const toggleCompare = (id) => {
    setCompareIds((c) => {
      if (c.includes(id)) return c.filter((x) => x !== id);
      if (c.length >= 4) { toast.show("You can compare up to 4 laptops"); return c; }
      return [...c, id];
    });
  };

  // Removed AI insight generation logic

  const openScoreFor = (l) => scored.find((s) => s.l.id === l.id)?.score ?? null;

  return (
    <div className="app-root min-h-screen relative overflow-hidden">
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <div className="relative z-10 flex flex-col min-h-screen">

      <Header
        query={query} setQuery={setQuery}
        compareCount={compareIds.length} onOpenCompare={() => setShowCompare(true)}
        wishlistCount={wishlist.length} onOpenWishlist={() => setView("wishlist")}
        dark={dark} setDark={setDark}
        onLogoClick={() => setView("home")}
      />

      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0, y:-20}} transition={{duration:0.3}}>
            <Home
              scored={scored} wishlist={wishlist} toggleWish={toggleWish}
              compareIds={compareIds} canCompare={compareIds.length < 4} toggleCompare={toggleCompare}
              onOpenLaptop={setOpenLaptop}
              goToQuiz={() => setView("quiz")} goToResults={() => setView("results")}
            />
          </motion.div>
        )}

        {view === "quiz" && (
          <motion.div key="quiz" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:1.05}} transition={{duration:0.4}} className="max-w-6xl mx-auto px-5 py-14">
            <Quiz onExit={() => setView("home")} onComplete={(a) => { setAnswers(a); setView("results"); }} />
          </motion.div>
        )}

        {view === "results" && (
          <motion.div key="results" initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0}} transition={{duration:0.5}}>
            <ResultsView
              answers={answers} filtered={filtered} query={query} setQuery={setQuery}
              wishlist={wishlist} toggleWish={toggleWish}
              compareIds={compareIds} canCompare={compareIds.length < 4} toggleCompare={toggleCompare}
              onOpenLaptop={setOpenLaptop}
              goToQuiz={() => setView("quiz")}
            />
          </motion.div>
        )}
        
        {view === "wishlist" && (
          <motion.div key="wishlist" initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0}} transition={{duration:0.5}}>
            <ResultsView
              isWishlist={true}
              answers={answers} filtered={filtered.filter(s => wishlist.includes(s.l.id))} query={query} setQuery={setQuery}
              wishlist={wishlist} toggleWish={toggleWish}
              compareIds={compareIds} canCompare={compareIds.length < 4} toggleCompare={toggleCompare}
              onOpenLaptop={setOpenLaptop}
              goToQuiz={() => setView("quiz")}
            />
          </motion.div>
        )}
        {(view === "guide" || view === "faqs" || view === "privacy") && (
          <motion.div key={view} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <StaticPage pageType={view} />
          </motion.div>
        )}
      </AnimatePresence>

      {toast.msg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 text-sm px-4 py-2 mono" style={{ background: "var(--ink)", color: "var(--paper)" }}>
          {toast.msg}
        </div>
      )}

      <DetailModal
        l={openLaptop} score={openLaptop ? openScoreFor(openLaptop) : 0}
        onClose={() => setOpenLaptop(null)}
      />
      {showCompare && <CompareView ids={compareIds} laptops={LAPTOPS} onRemove={toggleCompare} onClose={() => setShowCompare(false)} />}

      <footer style={{ borderTop: "3px solid var(--ink)", background: "var(--paper-2)" }}>
        <div className="max-w-6xl mx-auto px-5 py-8 text-xs font-semibold uppercase flex flex-wrap gap-x-6 gap-y-2 mono text-gray-600">
          <span className="text-black">© 2026 LaptopIQ</span>
          <span onClick={() => { setView("guide"); window.scrollTo(0,0); }} className="hover:text-black cursor-pointer hoverable">Buying Guide</span>
          <span onClick={() => { setView("faqs"); window.scrollTo(0,0); }} className="hover:text-black cursor-pointer hoverable">FAQs</span>
          <span onClick={() => { setView("privacy"); window.scrollTo(0,0); }} className="hover:text-black cursor-pointer hoverable">Privacy Policy</span>
        </div>
      </footer>
      </div>
    </div>
  );
}
