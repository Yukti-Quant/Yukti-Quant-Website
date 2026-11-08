import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { generateCandles, generateSignals, sma, type Candle } from '@/data/market';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/utils/cn';

type Props = {
  candleCount?: number;
  className?: string;
  showSignals?: boolean;
  startPrice?: number;
  volatility?: number;
  intervalMs?: number;
};

/**
 * Animated candlestick chart built with pure SVG (no chart lib in the hero —
 * keeps the hero lightweight and lets us animate every candle). Demo data only.
 */
export function TradingChart({
  candleCount = 48,
  className,
  showSignals = true,
  startPrice = 100,
  volatility = 0.014,
  intervalMs = 1800,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [candles, setCandles] = useState<Candle[]>(() =>
    generateCandles(candleCount, startPrice, volatility)
  );

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setCandles((prev) => {
        const last = prev[prev.length - 1];
        const drift = (Math.random() - 0.48) * volatility * last.close;
        const open = last.close;
        const close = Math.max(1, open + drift);
        const high = Math.max(open, close) + Math.random() * volatility * open * 0.5;
        const low = Math.min(open, close) - Math.random() * volatility * open * 0.5;
        const next: Candle = {
          time: Date.now(),
          open,
          high,
          low,
          close,
          volume: Math.floor(Math.random() * 5000) + 800,
        };
        return [...prev.slice(1), next];
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduced, intervalMs, volatility]);

  const signals = useMemo(() => generateSignals(candles), [candles]);
  const ma20 = useMemo(() => sma(candles, Math.min(20, Math.floor(candleCount / 2))), [candles, candleCount]);

  const W = 760;
  const H = 360;
  const padX = 12;
  const padTop = 16;
  const padBottom = 28;
  const innerH = H - padTop - padBottom;
  const slot = (W - padX * 2) / candles.length;
  const candleW = slot * 0.56;

  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const range = max - min || 1;
  const pad = range * 0.08;
  const yMax = max + pad;
  const yMin = min - pad;
  const yRange = yMax - yMin;

  const x = (i: number) => padX + slot * i + slot / 2;
  const y = (price: number) => padTop + ((yMax - price) / yRange) * innerH;

  const maPath = ma20
    .map((v, i) => (v == null ? null : `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`))
    .filter(Boolean)
    .join(' ');

  const lastClose = candles[candles.length - 1].close;
  const firstClose = candles[0].close;
  const overallUp = lastClose >= firstClose;

  return (
    <div className={cn('relative w-full', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" role="img" aria-label="Animated candlestick chart — illustrative demo data">
        <defs>
          <linearGradient id="chart-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c39a3a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c39a3a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* horizontal gridlines */}
        {[0.25, 0.5, 0.75].map((p) => (
          <line
            key={p}
            x1={padX}
            x2={W - padX}
            y1={padTop + innerH * p}
            y2={padTop + innerH * p}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}

        {/* MA line area fill */}
        <path d={`${maPath} L ${x(candles.length - 1)} ${H - padBottom} L ${x(0)} ${H - padBottom} Z`} fill="url(#chart-fade)" />

        {/* MA line */}
        <motion.path
          d={maPath}
          fill="none"
          stroke="#c39a3a"
          strokeWidth="1.5"
          strokeOpacity="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* candles */}
        {candles.map((c, i) => {
          const up = c.close >= c.open;
          const cx = x(i);
          const bodyTop = y(Math.max(c.open, c.close));
          const bodyH = Math.max(2, Math.abs(y(c.open) - y(c.close)));
          return (
            <g key={i}>
              <line
                x1={cx}
                x2={cx}
                y1={y(c.high)}
                y2={y(c.low)}
                stroke={up ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)'}
                strokeWidth="1"
              />
              <rect
                x={cx - candleW / 2}
                y={bodyTop}
                width={candleW}
                height={bodyH}
                rx="1"
                fill={up ? '#10b981' : '#ef4444'}
                opacity={0.92}
              />
            </g>
          );
        })}

        {/* signal markers */}
        {showSignals &&
          signals.map((s, i) => {
            const cx = x(s.index);
            const c = candles[s.index];
            const isBuy = s.type === 'BUY';
            const cy = isBuy ? y(c.low) + 14 : y(c.high) - 14;
            return (
              <g key={`sig-${i}`}>
                <circle
                  cx={cx}
                  cy={isBuy ? y(c.low) : y(c.high)}
                  r="3"
                  fill={isBuy ? '#10b981' : '#ef4444'}
                  opacity="0.9"
                />
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fill={isBuy ? '#34d399' : '#f87171'}
                  opacity="0.85"
                >
                  {s.type}
                </text>
              </g>
            );
          })}

        {/* live price line */}
        <line
          x1={padX}
          x2={W - padX}
          y1={y(lastClose)}
          y2={y(lastClose)}
          stroke="#c39a3a"
          strokeWidth="1"
          strokeDasharray="4 4"
          strokeOpacity="0.5"
        />
      </svg>

      <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-2 rounded-md border border-white/10 bg-base-950/70 px-2.5 py-1 backdrop-blur-sm">
        <TrendingUp className={cn('h-3.5 w-3.5', overallUp ? 'text-bull-400' : 'text-bear-400')} />
        <span className="font-mono text-xs text-silver-300">
          {lastClose.toFixed(2)}{' '}
          <span className={overallUp ? 'text-bull-400' : 'text-bear-400'}>
            {overallUp ? '+' : ''}
            {(((lastClose - firstClose) / firstClose) * 100).toFixed(2)}%
          </span>
        </span>
      </div>

      <p className="absolute bottom-1 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-silver-500">
        Demo data · illustrative
      </p>
    </div>
  );
}
