import { ArrowUp, Mail, Linkedin } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { NAV_ITEMS, BRAND } from '@/data/content';

export function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <footer className="relative border-t border-white/[0.06] bg-base-950">
      <div className="absolute inset-0 bg-grid-fine opacity-20" />
      <div className="container-yx relative py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo size={40} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver-400">
              An independent quantitative trading technology venture. Intelligence. Strategy. Execution.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={`mailto:${BRAND.email}`} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-silver-300 transition-colors hover:border-gold-500/40 hover:text-gold-300" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
              <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-silver-300 transition-colors hover:border-gold-500/40 hover:text-gold-300" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-silver-500">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <button onClick={() => go(n.id)} className="text-sm text-silver-400 transition-colors hover:text-gold-300">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tagline */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-silver-500">Philosophy</p>
            <p className="mt-4 font-display text-lg font-semibold text-gradient-gold">
              Intelligence.
              <br />
              Strategy.
              <br />
              Execution.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-white/[0.06] bg-base-900/50 p-4">
          <p className="text-xs leading-relaxed text-silver-500">
            <span className="font-semibold text-silver-400">Disclaimer:</span> YUKTI QUANT is an independent technology initiative. Website content is for informational and technology demonstration purposes only. It does not constitute investment advice or a recommendation to trade.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-silver-500">
            © {BRAND.year} YUKTI QUANT. All rights reserved.
          </p>
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-silver-300 transition-colors hover:border-gold-500/40 hover:text-gold-300"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
