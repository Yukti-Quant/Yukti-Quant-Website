import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ABOUT_PILLARS } from '@/data/content';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/animations';

export function About() {
  return (
    <section id="about" className="section-pad relative bg-base-950">
      <div className="absolute inset-0 bg-grid-fine opacity-30 mask-fade-b" />
      <div className="container-yx relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
              <span className="gold-line" />
              <span className="eyebrow">About YUKTI QUANT</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="heading-lg text-gradient-silver">
              BUILT ON EXPERIENCE.
              <br />
              <span className="text-gradient-gold">DRIVEN BY VISION.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-8 space-y-5">
              <p className="body-lg">
                YUKTI QUANT is an independent quantitative trading technology initiative focused on engineering systematic, data-driven, and automated trading solutions.
              </p>
              <p className="body">
                Built upon years of software engineering experience and practical exposure to algorithmic trading systems, the vision is to create robust trading infrastructure that combines strategy research, quantitative analysis, automation, execution, and risk management.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 rounded-xl border border-gold-500/15 bg-gold-500/[0.03] p-4">
              <p className="text-xs leading-relaxed text-silver-400">
                YUKTI QUANT is an independent technology initiative. It is not a registered financial institution, investment adviser, or SEBI-registered entity. Content here is for informational and technology demonstration purposes only.
              </p>
            </motion.div>
          </div>

          <motion.ul variants={staggerContainer} className="grid gap-3 sm:grid-cols-2">
            {ABOUT_PILLARS.map((p) => (
              <motion.li
                key={p}
                variants={staggerItem}
                className="group card-surface flex items-center gap-3 p-4 transition-all duration-300 hover:border-gold-500/30 hover:bg-gold-500/[0.03]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 text-gold-300 transition-colors group-hover:bg-gold-500/20">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-silver-200">{p}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
