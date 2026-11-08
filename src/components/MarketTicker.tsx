import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { advanceTicker, buildTicker, type TickerSymbol } from '@/data/market';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/utils/cn';

function TickerItem({ t }: { t: TickerSymbol }) {
  const up = t.change >= 0;
  return (
    <div className="flex items-center gap-2 px-6 py-2 font-mono text-xs whitespace-nowrap">
      <span className="font-semibold text-silver-100">{t.symbol}</span>
      <span className="text-silver-300">{t.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      <span className={cn(up ? 'text-bull-400' : 'text-bear-400')}>
        {up ? '▲' : '▼'} {Math.abs(t.changePct).toFixed(2)}%
      </span>
    </div>
  );
}

export function MarketTicker() {
  const reduced = usePrefersReducedMotion();
  const [ticker, setTicker] = useState<TickerSymbol[]>(() => buildTicker());

  useEffect(() => {
    const id = setInterval(() => setTicker((t) => advanceTicker(t)), 2500);
    return () => clearInterval(id);
  }, []);

  const loop = [...ticker, ...ticker];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-base-900/80">
      <div className="mask-fade-x flex">
        <motion.div
          className="flex shrink-0"
          animate={reduced ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
        >
          {loop.map((t, i) => (
            <TickerItem key={i} t={t} />
          ))}
        </motion.div>
      </div>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gold-500/30 bg-base-950/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-gold-300">
        Demo feed
      </span>
    </div>
  );
}
