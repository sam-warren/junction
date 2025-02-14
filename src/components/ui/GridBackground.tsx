import { useMemo, useEffect, useState, useCallback, useRef, memo } from "react";
import debounce from "lodash/debounce";

const JunctionLogo = memo(({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className={className}
  >
    <g>
      <path
        d="M15,50 L95,50"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M15,20 L55,20 L70,50"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M15,80 L55,80 L70,50"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </g>
  </svg>
));

const GridBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const BASE_SPEED = 50;

  // Calculate number of logos based on viewport width
  const getLogoCount = useCallback((width: number) => {
    // Base number of logos for mobile
    const BASE_LOGOS = 8;
    // Additional logos per 500px of width
    const LOGOS_PER_500PX = 2;

    return Math.floor(BASE_LOGOS + (width / 500) * LOGOS_PER_500PX);
  }, []);

  const logos = useMemo(() => {
    const TOTAL_LOGOS = getLogoCount(containerWidth);
    const TOTAL_DELAY_SPREAD = 50;
    return Array.from({ length: TOTAL_LOGOS }, (_, i) => ({
      id: i,
      initialY: Math.random() * 100,
      delay: (TOTAL_DELAY_SPREAD / TOTAL_LOGOS) * i + Math.random() * 0.5,
      size: 20 + Math.random() * 15,
      opacity: 0.1 + Math.random() * 0.1,
    }));
  }, [containerWidth, getLogoCount]);

  const getDuration = useCallback((width: number) => width / BASE_SPEED, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = debounce(() => {
      if (!containerRef.current) return;
      setContainerWidth(window.innerWidth);
    }, 100);

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);
    updateWidth();

    return () => {
      updateWidth.cancel();
      resizeObserver.disconnect();
    };
  }, []);

  const duration = getDuration(containerWidth);

  return (
    <div ref={containerRef} className="pointer-events-none h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-gray-900/50 dark:to-gray-900" />
      <div className="absolute inset-0">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="absolute left-0 animate-float"
            style={
              {
                top: `${logo.initialY}%`,
                width: `${logo.size}px`,
                height: `${logo.size}px`,
                opacity: 0,
                "--duration": `${duration}s`,
                "--delay": `${logo.delay}s`,
                "--opacity": logo.opacity,
              } as React.CSSProperties
            }
          >
            <JunctionLogo className="h-full w-full text-blue-600 dark:text-blue-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(GridBackground);
