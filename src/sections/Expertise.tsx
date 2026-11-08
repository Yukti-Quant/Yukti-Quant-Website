import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/content';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/animations';

export function Expertise() {
  return (
    <section id="expertise" className="section-pad relative bg-base-950">
      <div className="absolute inset-0 bg-grid-fine opacity-20" />
      <div className="container-yx relative">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
            <span className="gold-line" />
            <span className="eyebrow">Technical Expertise</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="heading-lg max-w-3xl text-gradient-silver">
            A FULL-STACK ENGINEERING TOOLKIT FOR
            <span className="text-gradient-gold"> QUANTITATIVE TRADING.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="body-lg mt-6 max-w-2xl">
            Deep, hands-on experience across the layers that a real algorithmic trading platform runs on — from low-latency backend services to data pipelines, execution, and intelligent systems.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILL_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative card-surface overflow-hidden p-6 transition-colors duration-300 hover:border-gold-500/30"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gold-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300 transition-all duration-300 group-hover:border-gold-500/50 group-hover:bg-gold-500/15">
                  <cat.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-semibold leading-tight text-silver-100 sm:text-lg">
                  {cat.title}
                </h3>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="chip transition-colors duration-200 group-hover:border-gold-500/20"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
