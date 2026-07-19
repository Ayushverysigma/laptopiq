import { Search, Scale, Heart, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Header({
  query,
  setQuery,
  compareCount,
  onOpenCompare,
  wishlistCount,
  onOpenWishlist,
  onLogoClick,
}) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 bg-[var(--paper)]/90 backdrop-blur-md border-b-[3px] border-[var(--ink)]"
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Brutalist Logo */}
        <button
          onClick={onLogoClick}
          className="hoverable flex items-center gap-3 group outline-none"
        >
          <div className="flex flex-col items-start leading-none">
            <span className="display text-4xl sm:text-5xl tracking-widest text-[var(--ink)] t3d-ink group-hover:-translate-y-1 transition-transform duration-300">
              LAPTOP
            </span>
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-[var(--red)] border-[3px] border-[var(--ink)] rounded-xl flex items-center justify-center transform -rotate-6 group-hover:rotate-12 transition-all duration-300 shadow-[4px_4px_0_var(--ink)] group-hover:shadow-[6px_6px_0_var(--ink)] group-hover:-translate-y-1 z-10 relative">
              <span className="text-[var(--paper)] font-bold display text-3xl tracking-widest mt-1">
                IQ
              </span>
            </div>
            <div className="absolute inset-0 bg-[var(--yellow)] border-[3px] border-[var(--ink)] rounded-xl transform rotate-6 transition-transform duration-300 group-hover:-rotate-3"></div>
          </div>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCompare}
            className="hoverable flex items-center gap-2 px-4 py-2.5 rounded-full border-[3px] border-[var(--ink)] bg-white text-[var(--ink)] hover:bg-[var(--yellow)] transition-all duration-300 shadow-[3px_3px_0_var(--ink)] hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--ink)]"
            aria-label="Compare"
          >
            <Scale size={20} strokeWidth={2.5} />
            <span className="mono font-bold text-sm hidden md:block tracking-wider uppercase">
              Compare
            </span>
            {compareCount > 0 && (
              <span className="w-6 h-6 rounded-full bg-[var(--blue)] border-[2px] border-[var(--ink)] text-white font-bold mono text-[10px] flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenWishlist}
            className="hoverable flex items-center gap-2 px-4 py-2.5 rounded-full border-[3px] border-[var(--ink)] bg-white text-[var(--ink)] hover:bg-[var(--red)] hover:text-white transition-all duration-300 shadow-[3px_3px_0_var(--ink)] hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--ink)]"
          >
            <Heart
              size={20}
              strokeWidth={2.5}
              fill={wishlistCount > 0 ? "currentColor" : "none"}
            />
            <span className="mono font-bold text-sm hidden md:block tracking-wider uppercase">
              Wishlist
            </span>
            {wishlistCount > 0 && (
              <span className="w-6 h-6 rounded-full bg-[var(--red)] border-[2px] border-[var(--ink)] text-white font-bold mono text-[10px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <a
            href="https://github.com/Ayushverysigma/laptopiq"
            target="_blank"
            rel="noopener noreferrer"
            className="hoverable flex items-center gap-2 px-4 py-2.5 rounded-full border-[3px] border-[var(--ink)] bg-[var(--ink)] text-white hover:bg-[var(--yellow)] hover:text-[var(--ink)] transition-all duration-300 shadow-[3px_3px_0_var(--ink)] hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--ink)] hidden lg:flex"
          >
            <Github size={20} strokeWidth={2.5} />
            <span className="mono font-bold text-sm tracking-wider uppercase">
              GitHub
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
