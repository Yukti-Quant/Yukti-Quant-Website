import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Briefcase, GraduationCap, Cpu } from 'lucide-react';
import { FOUNDER_STATS, BRAND } from '@/data/content';
import { useCountUp } from '@/hooks';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations';

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const current = useCountUp(value, inView);
  return (
    <div ref={ref} className="card-surface p-5 text-center">
      <p className="font-display text-4xl font-bold text-gold-400 sm:text-5xl">
        {Math.floor(current)}
        <span className="text-gold-500">{suffix}</span>
      </p>
      <p className="mt-2 text-xs uppercase tracking-wider text-silver-400 sm:text-sm">{label}</p>
    </div>
  );
}

const FOCUS_AREAS = [
  { icon: Code2, label: 'Backend & Distributed Systems' },
  { icon: Briefcase, label: 'Algo Trading & Automation' },
  { icon: Cpu, label: 'Data Pipelines & Quantitative Tech' },
  { icon: GraduationCap, label: 'Continuous Research & Improvement' },
];

export function Founder() {
  return (
    <section id="founder" className="section-pad relative overflow-hidden bg-base-900">
      <div className="pointer-events-none absolute -right-20 top-1/3 h-[400px] w-[400px] rounded-full bg-gold-500/[0.06] blur-[120px]" />
      <div className="container-yx relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
            <span className="gold-line" />
            <span className="eyebrow">The Founder</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="heading-lg max-w-3xl text-gradient-silver">
            THE ENGINEER BEHIND THE <span className="text-gradient-gold">VISION.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-base-800 to-base-950 p-8">
              <div className="bg-grid-fine absolute inset-0 opacity-20" />
              {/* Monogram avatar */}
              <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-gold-500/30 bg-base-950">
                <span className="font-display text-4xl font-bold text-gradient-gold">NC</span>
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-bull-400 ring-2 ring-base-900" />
              </div>

              <h3 className="relative mt-6 font-display text-2xl font-bold text-silver-100">{BRAND.founder}</h3>
              <p className="relative mt-1 font-mono text-xs uppercase tracking-[0.18em] text-gold-400">
                Founder · Software Engineer · Algo Trading Systems Architect
              </p>

              <div className="relative mt-6 grid grid-cols-2 gap-3">
                {FOUNDER_STATS.map((s) => (
                  <StatCounter key={s.label} {...s} />
                ))}
              </div>

              <div className="relative mt-6 space-y-2.5">
                {FOCUS_AREAS.map((f) => (
                  <div key={f.label} className="flex items-center gap-3 text-sm text-silver-300">
                    <f.icon className="h-4 w-4 text-gold-400" />
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Narrative */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col justify-center"
          >
            <div className="space-y-5">
              <motion.p variants={fadeUp} className="body-lg">
                I am a software engineer with 5+ years of experience in backend development, distributed systems, automation, and cloud technologies.
              </motion.p>
              <motion.p variants={fadeUp} className="body">
                Over the years, I have worked on multiple software engineering and algorithmic trading projects, developing backend services, trading automation, strategy execution systems, data processing pipelines, and scalable technology solutions.
              </motion.p>
              <motion.p variants={fadeUp} className="body">
                My technical journey has involved building systems for different businesses, solving engineering challenges, and gaining practical experience in financial technology.
              </motion.p>
              <motion.p variants={fadeUp} className="border-l-2 border-gold-500/40 pl-5 text-base italic leading-relaxed text-silver-200 sm:text-lg">
                YUKTI QUANT is my next chapter — an independent venture where I can apply my engineering knowledge, trading system experience, and vision to build technology of my own.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
