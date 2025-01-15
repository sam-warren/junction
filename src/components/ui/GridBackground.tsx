import { useMemo } from 'react';

interface JunctionLogoProps {
  className?: string;
}

const JunctionLogo: React.FC<JunctionLogoProps> = ({ className }) => (
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
);

interface LogoConfig {
  id: number;
  initialY: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const GridBackground: React.FC = () => {
  const logos = useMemo<LogoConfig[]>(() => {
    const TOTAL_LOGOS = 15;
    const BASE_DURATION = 30;
    const DURATION_VARIANCE = 2;
    const TOTAL_DELAY_SPREAD = BASE_DURATION / 2;
    
    return Array.from({ length: TOTAL_LOGOS }, (_, i) => {
      const baseDelay = (TOTAL_DELAY_SPREAD / TOTAL_LOGOS) * i;
      const delay = baseDelay + (Math.random() * 0.5);
      
      return {
        id: i,
        initialY: Math.random() * 100,
        delay,
        duration: BASE_DURATION + (Math.random() * DURATION_VARIANCE),
        size: 20 + Math.random() * 15,
        opacity: 0.1 + Math.random() * 0.1,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-gray-900/50 dark:to-gray-900" />
      
      <style>
        {logos.map((logo) => `
          @keyframes float-${logo.id} {
            0% { 
              transform: translateX(15vw);
              opacity: 0;
            }
            4% {
              transform: translateX(20vw);
              opacity: var(--opacity);
            }
            85% { 
              transform: translateX(80vw);
              opacity: var(--opacity);
            }
            89% { 
              transform: translateX(85vw);
              opacity: 0;
            }
            100% { 
              transform: translateX(100vw);
              opacity: 0;
            }
          }
        `).join('\n')}
      </style>
      
      <div className="absolute inset-0">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="absolute left-0"
            style={{
              top: `${logo.initialY}%`,
              width: `${logo.size}px`,
              height: `${logo.size}px`,
              opacity: 0,
              animation: `float-${logo.id} ${logo.duration}s linear infinite ${logo.delay}s`,
              '--opacity': logo.opacity,
              transform: 'translateX(-100%)'
            } as React.CSSProperties}
          >
            <JunctionLogo className="w-full h-full text-blue-500 dark:text-blue-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridBackground;