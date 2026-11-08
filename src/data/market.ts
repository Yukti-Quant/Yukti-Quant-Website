// Deterministic-ish demo market data generation. Purely illustrative.
// NOT real market data. No trading API is connected.

export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type TickerSymbol = {
  symbol: string;
  price: number;
  change: number;
  changePct: number;
};

const SEED_PRICES: Record<string, number> = {
  'NIFTY 50': 22180.45,
  'BANKNIFTY': 47320.1,
  'SENSEX': 73105.6,
  'RELIANCE': 2945.2,
  'TCS': 3870.55,
  'INFY': 1862.3,
  'HDFCBANK': 1683.9,
  'GOLDBEES': 61.42,
  'BTC/USD': 64250.0,
  'ETH/USD': 3420.5,
};

const SYMBOLS = Object.keys(SEED_PRICES);

/** Generate a deterministic walk of candles for the hero / showcase charts. */
export function generateCandles(count = 60, startPrice = 100, volatility = 0.012): Candle[] {
  const candles: Candle[] = [];
  let price = startPrice;
  // LCG for reproducibility within a session
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const now = Date.now();
  for (let i = count - 1; i >= 0; i--) {
    const open = price;
    const drift = (rand() - 0.48) * volatility * price;
    const close = Math.max(1, open + drift);
    const wickUp = rand() * volatility * price * 0.6;
    const wickDn = rand() * volatility * price * 0.6;
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDn;
    candles.push({
      time: now - i * 60000,
      open,
      high,
      low,
      close,
      volume: Math.floor(rand() * 5000) + 800,
    });
    price = close;
  }
  return candles;
}

/** Compute a simple moving average over closes. */
export function sma(candles: Candle[], period: number): (number | null)[] {
  const out: (number | null)[] = [];
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      out.push(null);
      continue;
    }
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) sum += candles[j].close;
    out.push(sum / period);
  }
  return out;
}

/** Compute RSI (Wilder) over closes. */
export function rsi(candles: Candle[], period = 14): (number | null)[] {
  const out: (number | null)[] = [];
  let avgGain = 0;
  let avgLoss = 0;
  for (let i = 0; i < candles.length; i++) {
    if (i === 0) {
      out.push(null);
      continue;
    }
    const diff = candles[i].close - candles[i - 1].close;
    const gain = Math.max(0, diff);
    const loss = Math.max(0, -diff);
    if (i <= period) {
      avgGain += gain;
      avgLoss += loss;
      if (i === period) {
        avgGain /= period;
        avgLoss /= period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        out.push(100 - 100 / (1 + rs));
      } else {
        out.push(null);
      }
    } else {
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      out.push(100 - 100 / (1 + rs));
    }
  }
  return out;
}

/** Generate signal markers (BUY/SELL) at swing extremes — illustrative only. */
export function generateSignals(candles: Candle[]): { index: number; type: 'BUY' | 'SELL' }[] {
  const signals: { index: number; type: 'BUY' | 'SELL' }[] = [];
  const window = 3;
  for (let i = window; i < candles.length - window; i++) {
    const slice = candles.slice(i - window, i + window + 1);
    const isLow = candles[i].low === Math.min(...slice.map((c) => c.low));
    const isHigh = candles[i].high === Math.max(...slice.map((c) => c.high));
    if (isLow) signals.push({ index: i, type: 'BUY' });
    else if (isHigh) signals.push({ index: i, type: 'SELL' });
  }
  return signals;
}

/** Build the ticker list, advanced by one randomized tick per call. */
export function buildTicker(): TickerSymbol[] {
  return SYMBOLS.map((s) => {
    const base = SEED_PRICES[s];
    const change = (Math.random() - 0.5) * base * 0.01;
    return {
      symbol: s,
      price: base + change,
      change,
      changePct: (change / base) * 100,
    };
  });
}

export function advanceTicker(ticker: TickerSymbol[]): TickerSymbol[] {
  return ticker.map((t) => {
    const drift = (Math.random() - 0.5) * t.price * 0.0015;
    const newPrice = t.price + drift;
    const base = SEED_PRICES[t.symbol] ?? t.price;
    const change = newPrice - base;
    return {
      ...t,
      price: newPrice,
      change,
      changePct: (change / base) * 100,
    };
  });
}

export const DEMO_PORTFOLIO = [
  { name: 'Index Strategies', value: 38, color: '#c39a3a' },
  { name: 'Momentum', value: 24, color: '#10b981' },
  { name: 'Mean Reversion', value: 18, color: '#e0c171' },
  { name: 'Arbitrage', value: 12, color: '#7b879e' },
  { name: 'Cash / Reserve', value: 8, color: '#1b2438' },
];

export const DEMO_RISK_REWARD = [
  { scenario: 'Target', value: 100 },
  { scenario: 'Stop', value: -45 },
];
