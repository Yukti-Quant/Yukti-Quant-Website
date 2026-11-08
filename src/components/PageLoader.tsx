import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoMark } from '@/components/Logo';
import { usePrefersReducedMotion } from '@/hooks';

export function PageLoader() {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduced ? 200 : 1500);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="bg-grid-fine absolute inset-0 opacity-30" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            <LogoMark size={64} className="animate-glow" />

            <motion.div
              className="mt-6 h-px w-40 overflow-hidden bg-white/10"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-silver-500"
            >
              Initializing systems
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
