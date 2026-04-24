// src/components/magicui/marquee.tsx
//
// JS-driven marquee. The earlier CSS implementation transitioned
// animation-duration on hover, which caused the browser to re-snap the
// animation phase on every frame and produced visible jitter. This
// version uses a motion-value for the scroll offset advanced each frame
// by a spring-smoothed speed multiplier, so frame-to-frame position is
// always continuous and hover deceleration looks clean.
import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> {
  children: ReactNode;
  className?: string;
  /** Scroll reverse direction (L-to-R for horizontal). */
  reverse?: boolean;
  /** Decelerate on hover via spring. */
  pauseOnHover?: boolean;
  /** Use a slower spring so the stop is clearly visible. */
  smoothStop?: boolean;
  /** Scroll vertically instead of horizontally. */
  vertical?: boolean;
  /** Number of copies of the content to render for seamless looping. */
  repeat?: number;
  /** Pixels per second. */
  speed?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  smoothStop = false,
  children,
  vertical = false,
  repeat = 4,
  speed = 40,
  ...props
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const offset = useMotionValue(0);
  const speedTarget = useMotionValue(1);

  // Smooth-stop: softer spring, visible deceleration.
  // Default: stiffer spring, near-instant but still continuous (avoids
  // the animation-duration reset that plagued the CSS version).
  const speedCurrent = useSpring(
    speedTarget,
    smoothStop
      ? { stiffness: 45, damping: 20, mass: 1 }
      : { stiffness: 500, damping: 40, mass: 0.5 },
  );

  // Extent of one copy of children (width for horizontal, height for
  // vertical), INCLUDING the inter-copy gap. Used for seamless wrap.
  const contentExtent = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCopy = track.firstElementChild as HTMLElement | null;
    if (!firstCopy) return;

    const measure = () => {
      const rect = firstCopy.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      contentExtent.current = (vertical ? rect.height : rect.width) + gap;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(firstCopy);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [vertical]);

  // Honor prefers-reduced-motion by parking the marquee.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      speedTarget.set(mq.matches ? 0 : 1);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [speedTarget]);

  useAnimationFrame((_t, delta) => {
    const mult = speedCurrent.get();
    const extent = contentExtent.current;
    if (extent <= 0) return;
    const dir = reverse ? 1 : -1;
    const dx = speed * (delta / 1000) * mult * dir;
    let next = offset.get() + dx;
    // Normalize offset to (-extent, 0]. This keeps the track's leftmost
    // copy always sitting off-screen to the left so copies 2+ continuously
    // cover the viewport regardless of direction. (An earlier version wrapped
    // reverse-direction in [0, extent], which left empty space on the left
    // of the viewport for most of each cycle.)
    if (next <= -extent) next += extent;
    else if (next > 0) next -= extent;
    offset.set(next);
  });

  const transformStyle = vertical ? { y: offset } : { x: offset };

  return (
    <div
      ref={rootRef}
      onMouseEnter={pauseOnHover ? () => speedTarget.set(0) : undefined}
      onMouseLeave={pauseOnHover ? () => speedTarget.set(1) : undefined}
      className={cn("relative overflow-hidden p-2 [--gap:1rem]", className)}
      {...props}
    >
      <motion.div
        ref={trackRef}
        style={transformStyle}
        className={cn(
          "flex gap-[var(--gap)]",
          vertical ? "h-max flex-col" : "w-max flex-row",
        )}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0}
            className={cn(
              "flex shrink-0 gap-[var(--gap)]",
              vertical ? "flex-col" : "flex-row",
            )}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
