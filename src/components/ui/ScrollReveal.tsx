'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds (e.g. for staggered cards)
  duration?: number; // Transition duration in milliseconds (default 550ms)
  distance?: number; // Translation distance in pixels (default 18px)
  direction?: 'up' | 'none';
  variant?: 'fade' | 'scale';
  threshold?: number;
  as?: React.ElementType;
  once?: boolean;
}

const emptySubscribe = () => () => {};

function checkReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

/**
 * ScrollReveal:
 * Performant, reusable scroll-reveal component using native IntersectionObserver.
 * 
 * Guarantees:
 * - Content is 100% visible if JavaScript is disabled or before client hydration (SSR-safe via useSyncExternalStore).
 * - Zero cumulative layout shift (uses GPU-accelerated opacity & transform).
 * - Reveals each element once by default, cleaning up the observer immediately.
 * - Respects prefers-reduced-motion: reduce via external store listener without cascading render warnings.
 * - Above-the-fold content reveals immediately without delay.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 550,
  distance = 18,
  direction = 'up',
  variant = 'fade',
  threshold = 0.1,
  as: Component = 'div',
  once = true,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isIntersected, setIsIntersected] = useState(false);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const prefersReducedMotion = useSyncExternalStore(subscribeReducedMotion, checkReducedMotion, () => false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsIntersected(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, prefersReducedMotion]);

  // SSR / unhydrated fallback: render content naturally so crawlers and non-JS clients see it
  if (!isClient) {
    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  }

  const isVisible = prefersReducedMotion || isIntersected;

  const getTransform = () => {
    if (isVisible) return 'none';
    if (variant === 'scale') {
      return direction === 'up'
        ? `scale(0.98) translateY(${distance}px)`
        : 'scale(0.98)';
    }
    return direction === 'up' ? `translateY(${distance}px)` : 'none';
  };

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: prefersReducedMotion ? '0ms' : `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};
