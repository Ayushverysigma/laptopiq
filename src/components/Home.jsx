import { ChevronRight } from "lucide-react";
import Stamp from "./Stamp";
import ScoreDial from "./ScoreDial";
import RadarMeter from "./RadarMeter";
import LaptopCard from "./LaptopCard";
import { ordinal } from "../lib/format";
import { LAPTOPS } from "../data/laptops";
import { motion } from "framer-motion";
import { getYearFromProcessor } from "../lib/scoring";
import DotGrid from "./DotGrid";

const FEATURES = [
  ["Scored, not sorted", "Every laptop gets a 0–100 compatibility score against your budget, course and use case — not just filtered by price."],
  ["Built on real trade-offs", "Battery vs weight vs GPU. We show you what you give up at every price point, not just what you gain."],
  ["Live Enriched Data", "Powered by live data scrapes and intelligent spec analysis to find exactly what you need."],
];

export default function Home({ scored, wishlist, toggleWish, compareIds, canCompare, toggleCompare, onOpenLaptop, goToQuiz, goToResults }) {
  const hasAnswers = scored[0]?.score !== null;
  
  // Filter out any laptops older than 2024 for the front page
  const modernLaptops = LAPTOPS.filter(l => getYearFromProcessor(l.processor, l.name) >= 2024);

  const displayLaptops = hasAnswers 
    ? scored.slice(0, 3) 
    : [
        modernLaptops.find(l => l.name.includes("MacBook Air M3") || l.name.includes("MacBook Air M2")) || modernLaptops.find(l => l.name.includes("MacBook Air")) || LAPTOPS.find(l => l.name.includes("MacBook")),
        modernLaptops.find(l => l.name.includes("ROG Zephyrus G14")) || modernLaptops.find(l => l.name.includes("Zephyrus")) || LAPTOPS[1],
        modernLaptops.find(l => l.name.includes("Legion")) || modernLaptops.find(l => l.name.includes("Omen")) || LAPTOPS[2]
      ].filter(Boolean).map(l => ({ l, score: null, misses: [] })).slice(0, 3);

  const engineeringExample = modernLaptops.find(l => 
    l.gpu.toLowerCase().includes("rtx") && 
    l.ram >= 16 && 
    (l.processor.toLowerCase().includes("i9") || l.processor.toLowerCase().includes("ryzen 9") || l.processor.toLowerCase().includes("i7") || l.processor.toLowerCase().includes("core ultra"))
  ) || modernLaptops.find(l => l.gpu.toLowerCase().includes("rtx")) || LAPTOPS[0];

  const heroExample = hasAnswers ? scored[0].l : engineeringExample;
  const heroScore = hasAnswers ? scored[0].score : 95;
  const heroStamp = hasAnswers ? "Your Top Match" : "95% Match: Engineering";

  return (
    <main className="relative min-h-screen overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-[90vh] pointer-events-auto -z-10">
        <DotGrid
          dotSize={10}
          gap={45}
          baseColor="#4A4A58"
          activeColor="#E0202F"
          proximity={250}
          shockRadius={450}
          shockStrength={12}
          resistance={600}
          returnDuration={2}
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-16 items-center z-10">
          
          <div className="space-y-10">
            <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.6, ease: "easeOut"}}>
              <div className="mono text-[var(--blue)] font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-[var(--red)] block"></span>
                The Intelligent Recommendation Engine
              </div>
              
              <h1 className="display text-6xl sm:text-8xl leading-[0.9] mb-8" style={{ transformStyle: "preserve-3d" }}>
                <span className="block" style={{ transformStyle: "preserve-3d" }}><span className="inline-block t3d-ink hover:-rotate-2 transition-transform">FIND YOUR</span></span>
                <span className="block" style={{ transformStyle: "preserve-3d" }}><span className="inline-block t3d-red hover:rotate-1 transition-transform">IDEAL LAPTOP</span></span>
                <span className="block" style={{ transformStyle: "preserve-3d" }}><span className="inline-block t3d-blue hover:-rotate-1 transition-transform">IN SECONDS.</span></span>
              </h1>
              
              <p className="text-xl text-[var(--ink-soft)] max-w-lg font-medium">
                No more spec dumps. Tell us your <b className="text-[var(--ink)]">college major</b>, <b className="text-[var(--ink)]">budget</b>, and exactly what you do. 
                We score every model out of 100 to find your perfect match.
              </p>
            </motion.div>

            <motion.div 
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.4, duration: 0.5}}
              className="flex flex-col sm:flex-row gap-5"
            >
              <button onClick={goToQuiz} className="btn-brutal btn-brutal-primary hoverable">
                <span className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[var(--ink)] animate-pulse"></span>
                Find My Laptop
              </button>
              <button onClick={goToResults} className="btn-brutal hoverable">
                Explore Catalog ↓
              </button>
            </motion.div>
          </div>

          {/* Floating Hero Card */}
          <motion.div 
            initial={{opacity:0, scale:0.8, rotate: -3}} 
            animate={{opacity:1, scale:1, rotate: 2}} 
            transition={{duration:0.8, type: "spring", bounce: 0.5}}
            className="perspective-1000"
          >
            <div className="card-brutal p-8 bg-white rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="absolute top-0 right-8 px-4 py-1.5 bg-[var(--blue)] border-b-3 border-x-3 border-[var(--ink)] rounded-b-xl text-white display tracking-wider">
                {heroStamp}
              </div>
              <h3 className="display text-4xl mb-2 mt-4 text-[var(--ink)] uppercase">{heroExample?.name || "Premium Laptop"}</h3>
              <p className="mono text-xs font-bold mb-8 text-[var(--ink-soft)] uppercase tracking-wider">
                {heroExample?.processor} · {heroExample?.ram}GB RAM · {heroExample?.gpu}
              </p>

              <div className="flex items-center gap-6 mb-6 p-5 rounded-2xl border-[3px] border-[var(--ink)] bg-[var(--paper-2)] shadow-[4px_4px_0_var(--ink)]">
                <ScoreDial score={heroScore} size={80} isTopPick={true} />
                <div className="text-sm space-y-2 font-bold text-[var(--ink)] mono">
                  <div>BUDGET FIT — <b className="text-[var(--green)]">PERFECT</b></div>
                  <div>USE CASE — <b>CAD, AI/ML</b></div>
                  <div>BATTERY — <b>{heroExample?.battery || "10"}H</b></div>
                </div>
              </div>
              <div className="opacity-90">
                <RadarMeter meters={heroExample?.meters} />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* DOUBLE MARQUEE */}
      <div className="marquee m-fwd">
        <div className="marquee-track">
          <span>Smart Recommendations</span><span className="hl">★</span><span>Performance Scores</span><span className="hl">★</span><span>Budget Fit</span><span className="hl">★</span><span>Battery Testing</span><span className="hl">★</span>
          <span>Smart Recommendations</span><span className="hl">★</span><span>Performance Scores</span><span className="hl">★</span><span>Budget Fit</span><span className="hl">★</span><span>Battery Testing</span><span className="hl">★</span>
        </div>
      </div>
      <div className="marquee m-rev m2">
        <div className="marquee-track">
          <span>Code</span><span>·</span><span>Design</span><span>·</span><span>Game</span><span>·</span><span>Study</span><span>·</span><span>Create</span><span>·</span><span>Code</span><span>·</span><span>Design</span><span>·</span><span>Game</span><span>·</span><span>Study</span><span>·</span><span>Create</span><span>·</span>
          <span>Code</span><span>·</span><span>Design</span><span>·</span><span>Game</span><span>·</span><span>Study</span><span>·</span><span>Create</span><span>·</span><span>Code</span><span>·</span><span>Design</span><span>·</span><span>Game</span><span>·</span><span>Study</span><span>·</span><span>Create</span><span>·</span>
        </div>
      </div>

      {/* FEATURES */}
      <section className="relative max-w-6xl mx-auto px-5 py-24 z-10">
        <div className="mono text-[var(--blue)] font-bold tracking-[0.2em] uppercase mb-12 flex items-center gap-3">
          <span className="w-8 h-1 bg-[var(--red)] block"></span>
          01 — How It Works
        </div>
        <div className="display text-6xl sm:text-7xl mb-16 uppercase t3d-ink">
          Simple Process, <span className="t3d-red">Serious</span> Results
        </div>
        
        <div className="grid sm:grid-cols-3 gap-8 mb-32">
          {FEATURES.map(([title, desc], i) => (
            <motion.div 
              key={i} 
              initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: i*0.1}} 
              className="card-brutal p-8 bg-white flex flex-col items-start hover:bg-[var(--yellow)] group"
            >
              <div className="display text-6xl text-[var(--paper)] mb-4" style={{ WebkitTextStroke: "2px var(--ink)", textShadow: "4px 4px 0 var(--red)" }}>
                0{i + 1}
              </div>
              <h3 className="display text-3xl mb-3 text-[var(--ink)] uppercase tracking-wide">{title}</h3>
              <p className="text-base text-[var(--ink-soft)] font-medium group-hover:text-[var(--ink)] transition-colors">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* POPULAR */}
        <div className="mono text-[var(--blue)] font-bold tracking-[0.2em] uppercase mb-12 flex items-center gap-3">
          <span className="w-8 h-1 bg-[var(--red)] block"></span>
          02 — Top Tier
        </div>
        <div className="flex items-center justify-between mb-16">
          <h2 className="display text-6xl sm:text-7xl uppercase t3d-ink">
            Popular <span className="t3d-blue">Right Now</span>
          </h2>
          <button onClick={goToResults} className="btn-brutal text-sm py-2 px-4 hoverable">
            See all <ChevronRight size={18} strokeWidth={3} />
          </button>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayLaptops.map(({ l, score, misses }, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <LaptopCard
                l={l} rank={hasAnswers ? i : null} score={score} misses={misses} wished={wishlist.includes(l.id)} onWish={toggleWish}
                compared={compareIds.includes(l.id)} canCompare={canCompare} onCompare={toggleCompare}
                onOpen={onOpenLaptop} insight={null}
                customStamp={!hasAnswers ? "Top Pick" : null}
                isTopPick={!hasAnswers}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
