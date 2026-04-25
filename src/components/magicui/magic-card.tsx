import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

interface MagicCardBaseProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

interface MagicCardGradientProps extends MagicCardBaseProps {
  mode?: "gradient";

  gradientColor?: string;
  gradientOpacity?: number;

  /**
   * Pixels beyond the card's edge where the glow begins to fade in.
   * When > 0, the card listens for cursor motion globally and the glow
   * intensity is driven by rect-edge distance (uniform along edges,
   * falling off perpendicularly). 0 keeps the original hover-only behavior.
   */
  proximityRadius?: number;

  glowFrom?: never;
  glowTo?: never;
  glowAngle?: never;
  glowSize?: never;
  glowBlur?: never;
  glowOpacity?: never;
}

interface MagicCardOrbProps extends MagicCardBaseProps {
  mode: "orb";

  glowFrom?: string;
  glowTo?: string;
  glowAngle?: number;
  glowSize?: number;
  glowBlur?: number;
  glowOpacity?: number;

  gradientColor?: never;
  gradientOpacity?: never;
}

type MagicCardProps = MagicCardGradientProps | MagicCardOrbProps;
type ResetReason = "enter" | "leave" | "global" | "init";

function isOrbMode(props: MagicCardProps): props is MagicCardOrbProps {
  return props.mode === "orb";
}

export function MagicCard(props: MagicCardProps) {
  const {
    children,
    className,
    gradientSize = 200,
    gradientColor = "var(--brand-soft)",
    gradientOpacity = 0.8,
    gradientFrom = "#9E7AFF",
    gradientTo = "#FE8BBB",
    mode = "gradient",
  } = props;

  const glowFrom = isOrbMode(props) ? (props.glowFrom ?? "#ee4f27") : "#ee4f27";
  const glowTo = isOrbMode(props) ? (props.glowTo ?? "#6b21ef") : "#6b21ef";
  const glowAngle = isOrbMode(props) ? (props.glowAngle ?? 90) : 90;
  const glowSize = isOrbMode(props) ? (props.glowSize ?? 420) : 420;
  const glowBlur = isOrbMode(props) ? (props.glowBlur ?? 60) : 60;
  const glowOpacity = isOrbMode(props) ? (props.glowOpacity ?? 0.9) : 0.9;
  const proximityRadius = !isOrbMode(props) ? (props.proximityRadius ?? 0) : 0;
  const isProximity = mode === "gradient" && proximityRadius > 0;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDarkTheme = useMemo(() => {
    if (!mounted) return true;
    return document.documentElement.classList.contains("dark");
  }, [mounted]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  // Driven by rect-edge distance in proximity mode; static at gradientOpacity otherwise.
  const proximityOpacity = useMotionValue(isProximity ? 0 : gradientOpacity);

  const orbX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.6 });
  const orbVisible = useSpring(0, { stiffness: 300, damping: 35 });

  const modeRef = useRef(mode);
  const glowOpacityRef = useRef(glowOpacity);
  const gradientSizeRef = useRef(gradientSize);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    glowOpacityRef.current = glowOpacity;
  }, [glowOpacity]);

  useEffect(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);

  const reset = useCallback(
    (reason: ResetReason = "leave") => {
      const currentMode = modeRef.current;

      if (currentMode === "orb") {
        if (reason === "enter") orbVisible.set(glowOpacityRef.current);
        else orbVisible.set(0);
        return;
      }

      // In proximity mode, only "global" / "init" should fully reset —
      // local enter/leave is handled by the global mousemove handler.
      if (isProximity && reason !== "global" && reason !== "init") return;

      const off = -gradientSizeRef.current;
      mouseX.set(off);
      mouseY.set(off);
      if (isProximity) proximityOpacity.set(0);
    },
    [mouseX, mouseY, orbVisible, proximityOpacity, isProximity],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    reset("init");
  }, [reset]);

  useEffect(() => {
    const handleGlobalPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) reset("global");
    };
    const handleBlur = () => reset("global");
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset("global");
    };

    window.addEventListener("pointerout", handleGlobalPointerOut);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reset]);

  // Proximity tracking: drive the glow from the cursor's distance to the
  // card's edges, even when the cursor is outside the card.
  useEffect(() => {
    if (!isProximity) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Card-local cursor position (can be negative or > size — CSS handles it).
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);

      // Rect-edge distance: 0 inside, perpendicular distance outside.
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const dist = Math.hypot(dx, dy);

      const t = Math.max(0, 1 - dist / proximityRadius);
      // Ease-out (quadratic): feels brighter near the card, gentler at the edge.
      const eased = 1 - (1 - t) * (1 - t);
      proximityOpacity.set(eased * gradientOpacity);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [
    isProximity,
    proximityRadius,
    gradientOpacity,
    mouseX,
    mouseY,
    proximityOpacity,
  ]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "group relative isolate overflow-hidden rounded-[inherit] border border-transparent",
        className,
      )}
      onPointerMove={isProximity ? undefined : handlePointerMove}
      onPointerLeave={isProximity ? undefined : () => reset("leave")}
      onPointerEnter={isProximity ? undefined : () => reset("enter")}
      style={{
        background: useMotionTemplate`
          linear-gradient(var(--color-background) 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            var(--color-border) 100%
          ) border-box
        `,
      }}
    >
      <div className="bg-background absolute inset-px z-20 rounded-[inherit]" />

      {mode === "gradient" && (
        <motion.div
          suppressHydrationWarning
          className={cn(
            "pointer-events-none absolute inset-px z-30 rounded-[inherit]",
            // In hover mode, keep the original CSS-class fade so behavior is unchanged.
            // In proximity mode, opacity is driven by the motion value below — no class fade.
            !isProximity &&
              "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          )}
          style={{
            background: useMotionTemplate`
              radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                ${gradientColor},
                transparent 100%
              )
            `,
            opacity: isProximity ? proximityOpacity : gradientOpacity,
          }}
        />
      )}

      {mode === "orb" && (
        <motion.div
          suppressHydrationWarning
          aria-hidden="true"
          className="pointer-events-none absolute z-30"
          style={{
            width: glowSize,
            height: glowSize,
            x: orbX,
            y: orbY,
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: 9999,
            filter: `blur(${glowBlur}px)`,
            opacity: orbVisible,
            background: `linear-gradient(${glowAngle}deg, ${glowFrom}, ${glowTo})`,

            mixBlendMode: isDarkTheme ? "screen" : "multiply",
            willChange: "transform, opacity",
          }}
        />
      )}
      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}
