import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-12% 0px" } as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  const animation = reduced
    ? {}
    : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: VIEWPORT,
        transition: { duration: 1.1, delay, ease: EASE },
      };

  return (
    <MotionTag className={className} {...animation}>
      {children}
    </MotionTag>
  );
}

/** Slow image reveal behind a rising mask, with a gentle scale settle. */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const mask = reduced
    ? {}
    : {
        initial: { clipPath: "inset(100% 0% 0% 0%)" },
        whileInView: { clipPath: "inset(0% 0% 0% 0%)" },
        viewport: VIEWPORT,
        transition: { duration: 1.4, delay, ease: EASE },
      };
  const scale = reduced
    ? {}
    : {
        initial: { scale: 1.12 },
        whileInView: { scale: 1 },
        viewport: VIEWPORT,
        transition: { duration: 1.8, delay, ease: EASE },
      };

  return (
    <motion.div className={cn("overflow-hidden", className)} {...mask}>
      <motion.div {...scale}>{children}</motion.div>
    </motion.div>
  );
}

/** Line-by-line text reveal for editorial headlines. */
export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const lines = text.split("\n");

  return (
    <span className={className}>
      {lines.map((line, index) => {
        const animation = reduced
          ? {}
          : {
              initial: { y: "110%" },
              whileInView: { y: "0%" },
              viewport: VIEWPORT,
              transition: {
                duration: 1.2,
                delay: delay + index * 0.12,
                ease: EASE,
              },
            };
        return (
          <span key={line + index} className="block overflow-hidden py-[0.05em]">
            <motion.span className="inline-block" {...animation}>
              {line}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/** Counts up when scrolled into view. */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduced]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/** Subtle magnetic pull toward the cursor. */
export function Magnetic({
  children,
  strength = 8,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setOffset({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * strength * 2,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * strength * 2,
        });
      }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: "spring", stiffness: 150, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.span>
  );
}
