import { cn } from '@/utils/cn';

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  size?: number;
};

export function LogoMark({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <img
      src="/Yukti-Quant.jpeg"
      width={size}
      height={size}
      alt="YUKTI QUANT logo"
      className={cn('shrink-0 rounded-full object-cover', className)}
    />
  );
}

export function Logo({ className, showWordmark = true, size = 36 }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-[0.18em] text-silver-100 sm:text-lg">
            YUKTI<span className="text-gold-400"> QUANT</span>
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-silver-500">
            Intelligence · Strategy · Execution
          </span>
        </div>
      )}
    </div>
  );
}
