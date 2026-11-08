import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ResponsiveContainer, ComposedChart, BarChart, Bar, Line, XAxis, YAxis,
  Tooltip, ReferenceLine, Cell, PieChart, Pie, CartesianGrid, Area, AreaChart,
} from 'recharts';
import { Activity, Target, PieChart as PieIcon, Layers } from 'lucide-react';
import {
  generateCandles, generateSignals, rsi as calcRsi, sma, DEMO_PORTFOLIO, DEMO_RISK_REWARD,
} from '@/data/market';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations';

const CHART_LABEL_PROPS = { fill: '#7b879e', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' };

function Panel({
  icon: Icon, label, children, className,
}: { icon: React.ElementType; label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`card-surface flex flex-col p-5 ${className ?? ''}`}>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-gold-400" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-silver-400">{label}</span>
      </div>
      {children}
    </div>
  );
}

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const candles = useMemo(() => generateCandles(50, 120, 0.015), []);
  const signals = useMemo(() => generateSignals(candles), [candles]);
  const rsiSeries = useMemo(() => calcRsi(candles, 14), [candles]);
  const maSeries = useMemo(() => sma(candles, 20), [candles]);

  const candleData = candles.map((c, i) => ({
    i,
    open: c.open,
    high: c.high,
    low: c.low,
    close: c.close,
    volume: c.volume,
    ma: maSeries[i],
    range: [c.low, c.high] as [number, number],
  }));

  const rsiData = rsiSeries.map((v, i) => ({ i, rsi: v })).filter((d) => d.rsi != null);

  const riskData = DEMO_RISK_REWARD;
  const rrRatio = Math.abs(DEMO_RISK_REWARD[0].value / DEMO_RISK_REWARD[1].value).toFixed(2);

  return (
    <section id="showcase" className="section-pad relative overflow-hidden bg-base-900">
      <div className="absolute inset-0 bg-grid opacity-25 mask-fade-b" />
      <div className="container-yx relative" ref={ref}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
            <span className="gold-line" />
            <span className="eyebrow">Quantitative Technology Showcase</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="heading-lg max-w-3xl text-gradient-silver">
            THE KIND OF TECHNOLOGY
            <span className="text-gradient-gold"> YUKTI QUANT AIMS TO BUILD.</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-gold-300">
              DEMO DATA · Illustrative
            </span>
            <p className="max-w-xl text-sm text-silver-400">
              All charts use clearly labelled illustrative or historical sample data. No live market prices, actual trading results, or guaranteed returns are represented.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-10 grid gap-5 lg:grid-cols-3"
        >
          {/* Candlestick + MA + signals — large */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <Panel icon={Activity} label="Candlestick · MA(20) · Signals">
              <div className="h-64 w-full sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={candleData} margin={{ top: 8, right: 8, left: -28, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="i" tick={false} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={CHART_LABEL_PROPS} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#0a0e17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                      labelStyle={{ color: '#7b879e' }}
                      formatter={(v) => [Number(v).toFixed(2), '']}
                    />
                    {/* high-low range bar */}
                    <Bar dataKey="range" barSize={4} fill="rgba(255,255,255,0.12)" isAnimationActive={false} />
                    {/* open/close body via custom */}
                    <Line dataKey="close" stroke="#c39a3a" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                    <Line dataKey="ma" stroke="#e0c171" strokeWidth={1} strokeDasharray="3 3" dot={false} isAnimationActive={false} />
                    {signals.map((s) => (
                      <ReferenceLine
                        key={`sig-${s.index}`}
                        x={s.index}
                        stroke={s.type === 'BUY' ? '#10b981' : '#ef4444'}
                        strokeOpacity={0.4}
                        strokeDasharray="2 2"
                      />
                    ))}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-wider text-silver-500">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gold-400" />Close</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gold-200" />MA(20)</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-bull-500" />BUY signal</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-bear-500" />SELL signal</span>
              </div>
            </Panel>
          </motion.div>

          {/* RSI */}
          <motion.div variants={fadeUp}>
            <Panel icon={Activity} label="RSI(14) · Momentum">
              <div className="h-64 w-full sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rsiData} margin={{ top: 8, right: 8, left: -28, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rsi-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c39a3a" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#c39a3a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="i" tick={false} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                    <YAxis domain={[0, 100]} ticks={[0, 30, 50, 70, 100]} tick={CHART_LABEL_PROPS} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#0a0e17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                      formatter={(v) => [Number(v).toFixed(2), 'RSI']}
                    />
                    <ReferenceLine y={70} stroke="#ef4444" strokeOpacity={0.3} strokeDasharray="3 3" />
                    <ReferenceLine y={30} stroke="#10b981" strokeOpacity={0.3} strokeDasharray="3 3" />
                    <Area dataKey="rsi" stroke="#c39a3a" strokeWidth={1.5} fill="url(#rsi-fill)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex gap-4 font-mono text-[10px] uppercase tracking-wider text-silver-500">
                <span className="text-bear-400">70 Overbought</span>
                <span className="text-bull-400">30 Oversold</span>
              </div>
            </Panel>
          </motion.div>

          {/* Portfolio allocation */}
          <motion.div variants={fadeUp}>
            <Panel icon={PieIcon} label="Portfolio Allocation · Simulated">
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <div className="h-44 w-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={DEMO_PORTFOLIO}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={42}
                        outerRadius={68}
                        paddingAngle={2}
                        stroke="none"
                      >
                        {DEMO_PORTFOLIO.map((d) => (
                          <Cell key={d.name} fill={d.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: '#0a0e17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                        formatter={(v) => [`${v}%`, 'Allocation']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="flex-1 space-y-1.5">
                  {DEMO_PORTFOLIO.map((d) => (
                    <li key={d.name} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-silver-300">
                        <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
                        {d.name}
                      </span>
                      <span className="font-mono text-silver-400">{d.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>
          </motion.div>

          {/* Risk / Reward */}
          <motion.div variants={fadeUp}>
            <Panel icon={Target} label="Risk / Reward · Per Trade">
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskData} layout="vertical" margin={{ top: 4, right: 12, left: 8, bottom: 4 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" horizontal={false} />
                    <XAxis type="number" tick={CHART_LABEL_PROPS} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="scenario" tick={CHART_LABEL_PROPS} axisLine={false} tickLine={false} width={48} />
                    <ReferenceLine x={0} stroke="rgba(255,255,255,0.15)" />
                    <Tooltip
                      contentStyle={{ background: '#0a0e17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                      formatter={(v) => [`${v}`, 'R multiple']}
                    />
                    <Bar dataKey="value" radius={[4, 4, 4, 4]} isAnimationActive={false}>
                      {riskData.map((d) => (
                        <Cell key={d.scenario} fill={d.value >= 0 ? '#10b981' : '#ef4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg border border-white/[0.06] bg-base-950/50 px-3 py-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-silver-500">R:R Ratio</span>
                <span className="font-mono text-lg text-gold-300">1 : {rrRatio}</span>
              </div>
            </Panel>
          </motion.div>

          {/* Execution timeline */}
          <motion.div variants={fadeUp}>
            <Panel icon={Layers} label="Simulated Order Execution Timeline" className="h-full">
              <div className="flex flex-col gap-3 py-2">
                {[
                  { t: '00:00.0', e: 'Signal generated', c: 'text-silver-300', b: 'border-white/10' },
                  { t: '00:00.4', e: 'Risk check passed', c: 'text-bull-400', b: 'border-bull-500/30' },
                  { t: '00:00.9', e: 'Order dispatched', c: 'text-gold-300', b: 'border-gold-500/30' },
                  { t: '00:01.7', e: 'Fill confirmed', c: 'text-bull-400', b: 'border-bull-500/30' },
                  { t: '00:02.1', e: 'Position recorded', c: 'text-silver-300', b: 'border-white/10' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-14 font-mono text-[10px] text-silver-500">{step.t}</span>
                    <span className={`h-2 w-2 rounded-full border ${step.b} ${step.c.replace('text', 'bg')}`} />
                    <span className={`text-sm ${step.c}`}>{step.e}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
