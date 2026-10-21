import React from 'react';

/**
 * JaiShreeShyamTicker component:
 * Prominent, elegant continuous moving-text greeting banner.
 * 
 * Strict specifications:
 * - Contains ONLY "जय श्री श्याम" (no promotional, logistics, contact, or business text).
 * - Slower, dignified continuous horizontal animation (55s seamless loop).
 * - Increased ticker height and text size for prominent presentation.
 * - Pauses on hover for comfortable readability.
 * - Screen readers hear a single accessible greeting; duplicate track nodes are aria-hidden.
 * - Respects prefers-reduced-motion with a clean static centered layout.
 * - Zero horizontal overflow.
 */
export const JaiShreeShyamTicker: React.FC = () => {
  // A clean sequence of the sacred greeting with subtle elegant spacers
  const greetings = Array(8).fill('जय श्री श्याम');

  return (
    <aside
      aria-label="Greeting: जय श्री श्याम"
      className="relative w-full overflow-hidden bg-slate-950 border-b border-amber-500/25 text-amber-300 py-1.5 sm:py-2 select-none"
    >
      {/* Screen reader only announcement (spoken once, not repeatedly looped) */}
      <span className="sr-only">जय श्री श्याम</span>

      {/* Reduced-motion static fallback */}
      <div className="hidden motion-reduce:flex items-center justify-center gap-3 px-4 text-center">
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-amber-300 drop-shadow-xs">
          ✦ जय श्री श्याम ✦
        </span>
      </div>

      {/* Animated continuous loop (hidden when reduced motion is requested) */}
      <div className="motion-reduce:hidden flex w-full overflow-hidden hover:[animation-play-state:paused]" aria-hidden="true">
        <div className="ticker-track flex items-center">
          {/* Track Copy 1 */}
          <div className="flex items-center gap-8 sm:gap-12 px-4 shrink-0">
            {greetings.map((text, idx) => (
              <span
                key={`g1-${idx}`}
                className="inline-flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold tracking-widest text-amber-300 drop-shadow-xs"
              >
                <span>{text}</span>
                <span className="text-amber-500/50 text-xs select-none">✦</span>
              </span>
            ))}
          </div>

          {/* Track Copy 2 (Seamless loop reset) */}
          <div className="flex items-center gap-8 sm:gap-12 px-4 shrink-0" aria-hidden="true">
            {greetings.map((text, idx) => (
              <span
                key={`g2-${idx}`}
                className="inline-flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold tracking-widest text-amber-300 drop-shadow-xs"
              >
                <span>{text}</span>
                <span className="text-amber-500/50 text-xs select-none">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
