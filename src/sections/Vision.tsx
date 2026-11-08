import { motion } from 'framer-motion';
import { Brain, Wrench, Crosshair, Infinity as InfinityIcon } from 'lucide-react';
import { VISION_PRINCIPLES } from '@/data/content';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/animations';

const ICONS = [Brain, Wrench, Crosshair, InfinityIcon];

export function Vision() {
  return (
    <section id="vision" className="section-pad relative overflow-hidden bg-base-950">
      <div className="absolute inset-0 bg-grid-fine opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/[0.05] blur-[150px]" />

      <div className="container-yx relative">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mx-auto max-w-4xl text-center">
          <motion.div variants={fadeUp} className="mb-5 flex items-center justify-center gap-3">
            <span className="gold-line" />
            <span className="eyebrow">Vision & Philosophy</span>
            <span className="gold-line rotate-180" />
          </motion.div>

          <motion.h2 variants={fadeUp} className="heading-lg text-gradient-silver">
            THIS IS MORE THAN A PROJECT.
            <br />
            <span className="text-gradient-gold text-shadow-gold">THIS IS A LEGACY.</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-8 space-y-4">
            <p className="body-lg">
              YUKTI QUANT was born from a simple decision: stop building only for others and start building something of my own.
            </p>
            <p className="body">
              The vision is to create intelligent trading technology through disciplined research, engineering excellence, automation, and continuous innovation. The goal is not to chase temporary success, but to build a sustainable technology venture.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VISION_PRINCIPLES.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={p.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative card-surface overflow-hidden p-6 text-center transition-colors duration-300 hover:border-gold-500/30"
              >
                <span className="absolute left-1/2 top-0 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-all duration-500 group-hover:w-full" />
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300 transition-all duration-300 group-hover:border-gold-500/50 group-hover:bg-gold-500/15">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-silver-100 sm:text-lg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-400">{p.description}</p>
                <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.25em] text-silver-600">
                  0{i + 1}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
