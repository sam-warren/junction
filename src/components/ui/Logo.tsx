import { useEffect, useState } from 'react';

const Logo = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className="h-6 w-auto sm:h-7 md:h-8 lg:h-9"
    >
      <style>
        {`
          .path {
            fill: none;
            stroke: currentColor;
            stroke-width: 10;
            stroke-linecap: round;
          }

          @keyframes drawPath {
            from {
              stroke-dashoffset: 100;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          
          #middle-line {
            stroke-dasharray: 120;
            stroke-dashoffset: 120;
            animation: ${mounted ? 'drawPath 2.5s ease forwards' : 'none'};
            animation-delay: 0.5s;
          }
          
          #top-line, #bottom-line {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: ${mounted ? 'drawPath 2.5s ease forwards' : 'none'};
            animation-delay: 0.5s;
          }
        `}
      </style>
      
      <path id="middle-line" className="path" 
            d="M15,50 L95,50" />
      
      <path id="top-line" className="path"
            d="M15,20 L55,20 L70,50" />
      
      <path id="bottom-line" className="path"
            d="M15,80 L55,80 L70,50" />
    </svg>
  );
};

export default Logo;