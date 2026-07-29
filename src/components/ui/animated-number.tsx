"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  duration?: number;
  delay?: number;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
  prefix?: string;
  suffix?: string;
  from?: number;
  easing?: "linear" | "easeOut" | "easeInOut" | "spring";
  once?: boolean;
}

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function spring(t: number): number {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

const easingFns = {
  linear: (t: number) => t,
  easeOut: easeOutQuad,
  easeInOut: easeInOutCubic,
  spring,
};

function AnimatedNumber({
  value,
  duration = 1000,
  delay = 0,
  formatOptions,
  locale = "en-US",
  prefix = "",
  suffix = "",
  from = 0,
  easing = "easeOut",
  once = true,
  className,
  ...props
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = React.useState(from);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setHasAnimated(true);

          const startTime = performance.now() + delay;
          const startValue = from;
          const easeFn = easingFns[easing];

          const animate = (now: number) => {
            if (now < startTime) {
              rafRef.current = requestAnimationFrame(animate);
              return;
            }

            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeFn(progress);
            const current = startValue + (value - startValue) * easedProgress;

            setDisplayValue(current);

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(animate);
            }
          };

          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, delay, from, easing, once, hasAnimated]);

  const formatted = React.useMemo(() => {
    if (formatOptions) {
      return new Intl.NumberFormat(locale, formatOptions).format(displayValue);
    }
    return Number.isInteger(value)
      ? Math.round(displayValue).toLocaleString(locale)
      : displayValue.toLocaleString(locale, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
  }, [displayValue, formatOptions, locale, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export { AnimatedNumber };
