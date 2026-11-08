import { motion } from 'framer-motion';
import { ArrowRight, User, Cpu, Activity, Crosshair } from 'lucide-react';
import { TradingChart } from '@/components/TradingChart';
import { useMousePosition, usePrefersReducedMotion } from '@/hooks';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations';
import { cn } from '@/utils/cn';

function HudStat({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn('rounded-lg border border-white/10 bg-base-900/60 px-3 py-2 backdrop-blur-sm', className)}>
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-silver-500">{label}</p>
      <p className="mt-0.5 font-mono text-sm text-gold-300">{value}</p>
    </div>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
      animate={{ y: ['0%', '3600%', '0%'] }}
      transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
    />
  );
}

export function Hero() {
  const mouse = useMousePosition();
  const reduced = usePrefersReducedMotion();

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-base-950 pt-16 sm:pt-20">
      {/* backgrounds */}
      <div className="absolute inset-0 bg-grid mask-fade-b" />
      <div className="absolute inset-0 bg-grid-fine opacity-40" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]"
        style={reduced ? undefined : { transform: `translate(calc(-50% + ${mouse.x * 20}px), ${mouse.y * 20}px)` }}
      />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-bull-500/[0.06] blur-[120px]" />

      <ScanLine />

      <div className="container-yx relative z-10 grid items-center gap-10 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-24 lg:pt-24">
        {/* Left: copy */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col">
          <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-bull-400" />
            <span className="eyebrow">Independent Quantitative Technology Venture</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="heading-xl text-gradient-silver">
            ENGINEERING
            <br />
            INTELLIGENCE.
            <br />
            <span className="text-gradient-gold text-shadow-gold">REDEFINING</span>
            <br />
            ALGORITHMIC TRADING.
          </motion.h1>

          <motion.p variants={fadeUp} className="body-lg mt-7 max-w-xl">
            Building intelligent quantitative trading systems through advanced algorithms, automation, data engineering, and precision-driven technology.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl border-l-2 border-gold-500/40 pl-4 text-sm italic leading-relaxed text-silver-400">
            From engineering solutions for others to building my own vision. YUKTI QUANT represents a journey of experience, independent thinking, and technological ambition.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => scrollTo('technology')} className="btn-gold">
              Explore Our Technology
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => scrollTo('founder')} className="btn-ghost">
              <User className="h-4 w-4" />
              Meet the Founder
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <HudStat label="Mode" value="SYSTEMATIC" />
            <HudStat label="Architecture" value="EVENT-DRIVEN" />
            <HudStat label="Status" value="R&D · BUILDING" />
          </motion.div>
        </motion.div>

        {/* Right: chart HUD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative"
          style={reduced ? undefined : { transform: `translate(${mouse.x * -12}px, ${mouse.y * -12}px)` }}
        >
          <div className="relative rounded-2xl border border-white/[0.08] bg-base-900/70 p-3 shadow-2xl backdrop-blur-md sm:p-4">
            {/* HUD corners */}
            <span className="absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-gold-500/60" />
            <span className="absolute -right-px -top-px h-6 w-6 border-r-2 border-t-2 border-gold-500/60" />
            <span className="absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-gold-500/60" />
            <span className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-gold-500/60" />

            {/* header */}
            <div className="mb-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gold-400" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-silver-300">YQ-STRAT-01 / Live Sim</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bull-400" />
                <span className="font-mono text-[10px] text-silver-500">STREAMING</span>
              </div>
            </div>

            <TradingChart candleCount={44} className="rounded-lg border border-white/[0.04] bg-base-950/60" />

            {/* footer metrics */}
            <div className="mt-3 grid grid-cols-3 gap-2 px-1">
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-base-950/50 px-2.5 py-2">
                <Crosshair className="h-3.5 w-3.5 text-gold-400" />
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-wider text-silver-500">Signals</p>
                  <p className="font-mono text-xs text-silver-200">MA + RSI</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-base-950/50 px-2.5 py-2">
                <Cpu className="h-3.5 w-3.5 text-gold-400" />
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-wider text-silver-500">Engine</p>
                  <p className="font-mono text-xs text-silver-200">Backtest</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-base-950/50 px-2.5 py-2">
                <Activity className="h-3.5 w-3.5 text-gold-400" />
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-wider text-silver-500">Window</p>
                  <p className="font-mono text-xs text-silver-200">1m · 48c</p>
                </div>
              </div>
            </div>
          </div>

          {/* floating accent card */}
          <motion.div
            className="absolute -bottom-6 -left-4 hidden rounded-xl border border-gold-500/20 bg-base-900/90 p-3 backdrop-blur-md sm:block"
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-silver-500">Latency target</p>
            <p className="font-mono text-lg text-gold-300">&lt; 50ms</p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollTo('about')}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-silver-500 transition-colors hover:text-gold-300 sm:flex"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-silver-500/40 pt-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-gold-400"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
      </motion.button>
    </section>
  );
}
