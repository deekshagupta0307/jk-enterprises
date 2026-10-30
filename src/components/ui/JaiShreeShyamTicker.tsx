import React from 'react';

/**
 * JaiShreeShyamTicker component:
 * Sleek, dignified continuous moving-text greeting banner.
 * 
 * Specifications:
 * - Contains ONLY "जय श्री श्याम" (pure sacred invocation).
 * - Slower, dignified continuous horizontal animation (55s seamless loop).
 * - Refined compact height and elegant typography.
 * - Pauses on hover for comfortable readability.
 * - Screen readers hear a single accessible greeting; duplicate track nodes are aria-hidden.
 * - Respects prefers-reduced-motion with a clean static centered layout.
 * - Zero horizontal overflow.
 */
export const JaiShreeShyamTicker: React.FC = () => {
  const greetings = Array(8).fill('जय श्री श्याम');

  return (
    <aside
      aria-label="Greeting: जय श्री श्याम"
      className="relative w-full overflow-hidden bg-slate-950 border-b border-amber-500/20 text-amber-300 py-1 select-none"
    >
      {/* Screen reader only announcement */}
      <span className="sr-only">जय श्री श्याम</span>

      {/* Reduced-motion static fallback */}
      <div className="hidden motion-reduce:flex items-center justify-center gap-3 px-4 text-center">
        <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-amber-300/90 drop-shadow-xs">
          ✦ जय श्री श्याम ✦
        </span>
      </div>

      {/* Animated continuous loop */}
      <div className="motion-reduce:hidden flex w-full overflow-hidden hover:[animation-play-state:paused]" aria-hidden="true">
        <div className="ticker-track flex items-center">
          {/* Track Copy 1 */}
          <div className="flex items-center gap-8 sm:gap-12 px-4 shrink-0">
            {greetings.map((text, idx) => (
              <span
                key={`g1-${idx}`}
                className="inline-flex items-center gap-6 sm:gap-8 text-[11px] sm:text-xs font-semibold tracking-widest text-amber-300/90 drop-shadow-xs"
              >
                <span>{text}</span>
                <span className="text-amber-500/40 text-[10px] select-none">✦</span>
              </span>
            ))}
          </div>

          {/* Track Copy 2 (Seamless loop reset) */}
          <div className="flex items-center gap-8 sm:gap-12 px-4 shrink-0" aria-hidden="true">
            {greetings.map((text, idx) => (
              <span
                key={`g2-${idx}`}
                className="inline-flex items-center gap-6 sm:gap-8 text-[11px] sm:text-xs font-semibold tracking-widest text-amber-300/90 drop-shadow-xs"
              >
                <span>{text}</span>
                <span className="text-amber-500/40 text-[10px] select-none">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
