import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Wrench, AlertTriangle, GitBranch, Code2, UserCog } from 'lucide-react';
import { PROJECTS } from '@/data/content';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '@/animations';
import { cn } from '@/utils/cn';

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className="group relative card-surface overflow-hidden transition-colors duration-300 hover:border-gold-500/25"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold-500/[0.06] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300 transition-all duration-300 group-hover:border-gold-500/50 group-hover:bg-gold-500/15">
          <project.icon className="h-6 w-6" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-silver-500">
              Case {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold text-silver-100 sm:text-xl">{project.title}</h3>
          <p className="mt-1 font-mono text-xs text-gold-400">{project.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-silver-400">{project.overview}</p>
        </div>

        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="mt-1 shrink-0 text-silver-400">
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.06] p-6 pt-5">
              <div className="grid gap-5">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gold-300">
                    <AlertTriangle className="h-4 w-4" /> Technical Challenges
                  </h4>
                  <ul className="mt-2 space-y-1.5 pl-6">
                    {project.challenges.map((c) => (
                      <li key={c} className="list-disc text-sm text-silver-400">{c}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-gold-300">
                    <GitBranch className="h-4 w-4" /> Architecture
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-silver-400">{project.architecture}</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-gold-300">
                      <Code2 className="h-4 w-4" /> Technologies
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-gold-300">
                      <UserCog className="h-4 w-4" /> Engineering Contribution
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-silver-400">{project.contribution}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-pad relative bg-base-950">
      <div className="absolute inset-0 bg-grid-fine opacity-25" />
      <div className="container-yx relative">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
            <span className="gold-line" />
            <span className="eyebrow">Projects & Engineering Experience</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="heading-lg text-gradient-silver">
            BUILT THROUGH <span className="text-gradient-gold">EXPERIENCE.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="body-lg mt-6 max-w-2xl">
            Selected engineering case studies from past work — systems built, challenges solved, and architecture decisions made while developing trading and data platforms.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid gap-5 lg:grid-cols-2"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 flex items-start gap-2 text-xs text-silver-500"
        >
          <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          These are previous engineering experiences and project case studies, not necessarily products owned by YUKTI QUANT. Confidential client information is not disclosed, and previous employers' intellectual property is not implied to be owned.
        </motion.p>
      </div>
    </section>
  );
}
