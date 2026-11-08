import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { NAV_ITEMS, BRAND } from '@/data/content';
import { useActiveSection } from '@/hooks';
import { cn } from '@/utils/cn';

const sectionIds = NAV_ITEMS.map((n) => n.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/[0.06] bg-base-950/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <nav className="container-yx flex h-16 items-center justify-between sm:h-20">
          <button onClick={() => go('home')} aria-label="YUKTI QUANT — home" className="transition-opacity hover:opacity-80">
            <Logo size={36} />
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                    active === item.id ? 'text-gold-300' : 'text-silver-300 hover:text-silver-100'
                  )}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-gold-500/10 ring-1 ring-gold-500/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <button onClick={() => go('vision')} className="btn-gold">
              Explore the Vision
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-silver-100 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-base-950/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col border-l border-white/10 bg-base-900 px-6 pb-8 pt-24"
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      onClick={() => go(item.id)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-medium transition-colors',
                        active === item.id ? 'bg-gold-500/10 text-gold-300' : 'text-silver-200 hover:bg-white/5'
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-silver-500">0{i + 1}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <button onClick={() => go('vision')} className="btn-gold w-full">
                  Explore the Vision
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-silver-500">
                  {BRAND.tagline}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
