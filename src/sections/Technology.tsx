import { motion } from 'framer-motion';
import { ARCHITECTURE_NODES } from '@/data/content';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/animations';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/utils/cn';

function FlowLine({ index, reduced }: { index: number; reduced: boolean }) {
  return (
    <div className="relative hidden h-px flex-1 self-center bg-white/[0.08] lg:block">
      <motion.div
        className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
        animate={reduced ? undefined : { x: ['-64px', '100%'] }}
        transition={{
          duration: 2.2,
          ease: 'linear',
          repeat: Infinity,
          delay: index * 0.25,
        }}
      />
    </div>
  );
}

function NodeCard({ node, index }: { node: (typeof ARCHITECTURE_NODES)[number]; index: number }) {
  return (
    <motion.div
      variants={staggerItem}
      className="group relative flex w-full max-w-xs flex-col items-center text-center lg:max-w-none"
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-500/25 bg-base-850 transition-all duration-300 group-hover:border-gold-500/60 group-hover:glow-gold">
        <node.icon className="h-7 w-7 text-gold-300" />
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-base-900 font-mono text-[10px] text-gold-400">
          {String(index + 1).padStart(2, '0')}
        </span>
        {/* pulse ring */}
        <span className="absolute inset-0 rounded-2xl border border-gold-500/0 transition-all duration-500 group-hover:scale-125 group-hover:border-gold-500/30" />
      </div>

      <h3 className="mt-4 font-display text-sm font-semibold text-silver-100 sm:text-base">{node.label}</h3>
      <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-silver-400">{node.description}</p>
    </motion.div>
  );
}

export function Technology() {
  const reduced = usePrefersReducedMotion();
  const half = Math.ceil(ARCHITECTURE_NODES.length / 2);
  const row1 = ARCHITECTURE_NODES.slice(0, half);
  const row2 = ARCHITECTURE_NODES.slice(half);

  return (
    <section id="technology" className="section-pad relative overflow-hidden bg-base-900">
      <div className="absolute inset-0 bg-grid opacity-30 mask-fade-b" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/[0.04] blur-[140px]" />

      <div className="container-yx relative">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
            <span className="gold-line" />
            <span className="eyebrow">Technology & System Architecture</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="heading-lg max-w-3xl text-gradient-silver">
            ENGINEERED FOR PRECISION.
            <br />
            <span className="text-gradient-gold">ARCHITECTED FOR SCALE.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="body-lg mt-6 max-w-2xl">
            A proposed end-to-end quantitative trading platform architecture — the system YUKTI QUANT is building toward. Each layer is designed for real-time processing, event-driven coordination, and controlled execution.
          </motion.p>
        </motion.div>

        {/* Architecture flow */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 flex flex-col gap-10 lg:gap-6"
        >
          {/* Row 1 */}
          <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-center">
            {row1.map((node, i) => (
              <div key={node.id} className="contents">
                <NodeCard node={node} index={i} />
                {i < row1.length - 1 && <FlowLine index={i} reduced={reduced} />}
              </div>
            ))}
          </div>

          {/* Connector down */}
          <div className="hidden justify-end lg:flex">
            <div className="relative h-10 w-px bg-white/[0.08]">
              <motion.div
                className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-gold-400"
                animate={reduced ? undefined : { y: [0, 40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Row 2 (reverse flow direction) */}
          <div className="flex flex-col items-stretch gap-6 lg:flex-row-reverse lg:items-center">
            {row2.map((node, i) => (
              <div key={node.id} className="contents">
                <NodeCard node={node} index={half + i} />
                {i < row2.length - 1 && <FlowLine index={half + i} reduced={reduced} />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* attribute chips */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 flex flex-wrap gap-2.5"
        >
          {['Real-time processing', 'Event-driven systems', 'Parallel execution', 'Scalable backend', 'Reliable data pipelines', 'Controlled execution', 'Observability & monitoring'].map((a) => (
            <span key={a} className={cn('chip')}>{a}</span>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-6 text-xs text-silver-500"
        >
          This is the proposed platform architecture. It distinguishes the target system from capabilities already implemented in production today.
        </motion.p>
      </div>
    </section>
  );
}
