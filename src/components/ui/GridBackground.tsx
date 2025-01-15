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
  fadeInPoint: number;
  fadeOutPoint: number;
}

const GridBackground: React.FC = () => {
  const logos = useMemo<LogoConfig[]>(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const fadeInPoint = 5 + Math.random() * 10;
      const fadeOutPoint = 85 + Math.random() * 10;
      
      return {
        id: i,
        initialY: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 20 + Math.random() * 15,
        size: 20 + Math.random() * 15,
        opacity: 0.1 + Math.random() * 0.1,
        fadeInPoint,
        fadeOutPoint,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-gray-900/50 dark:to-gray-900" />
      
      <style>
        {logos.map((logo) => `
          @keyframes float-${logo.id} {
            0%, 3% { 
              transform: translateX(-100%);
              opacity: 0;
            }
            ${logo.fadeInPoint}% { 
              transform: translateX(${logo.fadeInPoint}vw);
              opacity: 0;
            }
            ${logo.fadeInPoint + 2}% { 
              transform: translateX(${logo.fadeInPoint + 2}vw);
              opacity: var(--opacity);
            }
            ${logo.fadeOutPoint}% { 
              transform: translateX(${logo.fadeOutPoint}vw);
              opacity: var(--opacity);
            }
            ${logo.fadeOutPoint + 2}% { 
              transform: translateX(${logo.fadeOutPoint + 2}vw);
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