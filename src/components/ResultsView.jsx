import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import LaptopCard from "./LaptopCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultsView({
  isWishlist, answers, filtered, query, setQuery, wishlist, toggleWish, compareIds, canCompare, toggleCompare, onOpenLaptop, goToQuiz,
}) {
  const [visibleCount, setVisibleCount] = useState(12);
  const CHUNK_SIZE = 12;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + CHUNK_SIZE);
  };

  const visibleLaptops = filtered.slice(0, visibleCount);

  return (
    <main className="max-w-7xl mx-auto px-5 py-16 relative z-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="display text-5xl sm:text-6xl text-[var(--ink)] mb-2 uppercase tracking-wide t3d-ink">
            {isWishlist ? "Your Wishlist" : (answers ? "Your Top Matches" : "Complete Catalog")}
          </h2>
          <p className="mono font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            {isWishlist ? "Laptops you've saved for later" : (answers ? `Ranked for ${answers.studentType || "you"}` : "Take the quiz for a personalized ranking")}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
          {!answers && (
            <button onClick={goToQuiz} className="btn-brutal btn-brutal-primary whitespace-nowrap px-6 py-3 hoverable">
              Take the quiz
            </button>
          )}
          <div className="relative w-full sm:w-80 group">
            <Search size={18} strokeWidth={3} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-soft)] group-focus-within:text-[var(--blue)] transition-colors z-10" />
            <input 
              value={query} 
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(12); // Reset pagination on search
              }} 
              placeholder="SEARCH PROCESSORS..." 
              className="w-full bg-white border-[3px] border-[var(--ink)] rounded-full py-3 pl-12 pr-4 text-sm font-bold text-[var(--ink)] placeholder-[var(--ink-soft)] focus:outline-none focus:shadow-[4px_4px_0_var(--ink)] transition-all duration-300 mono uppercase" 
            />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {visibleLaptops.map(({ l, score, misses }, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              layout
            >
              <LaptopCard
                l={l} rank={answers ? i : null} score={score} misses={misses} wished={wishlist.includes(l.id)} onWish={toggleWish}
                compared={compareIds.includes(l.id)} canCompare={canCompare} onCompare={toggleCompare}
                onOpen={onOpenLaptop}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 border-[3px] border-[var(--ink)] bg-[var(--paper-2)] shadow-[8px_8px_0_var(--ink)] rounded-2xl mt-8">
          <Search size={48} strokeWidth={2.5} className="mx-auto text-[var(--ink-soft)] mb-6" />
          <p className="display text-4xl text-[var(--ink)] uppercase mb-2">
            {isWishlist && !query ? "Your wishlist is empty" : `No laptops match "${query}"`}
          </p>
          <p className="mono font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            {isWishlist && !query ? "Save laptops to compare them later." : "Try searching for a different processor or brand."}
          </p>
        </div>
      )}

      {visibleCount < filtered.length && (
        <div className="mt-16 text-center">
          <p className="text-[var(--ink-soft)] font-mono font-bold mb-6 tracking-widest uppercase text-sm">
            Showing {visibleLaptops.length} of {filtered.length} laptops
          </p>
          <button 
            onClick={handleLoadMore} 
            className="btn-brutal bg-white hoverable mx-auto flex items-center gap-2"
          >
            Load More Laptops <ChevronDown size={20} strokeWidth={3} />
          </button>
        </div>
      )}
    </main>
  );
}
