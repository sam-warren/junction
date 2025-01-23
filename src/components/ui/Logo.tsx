import { useEffect, useState } from "react";

const Logo = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="h-6 w-auto sm:h-7 md:h-8 lg:h-9"
    >
      <path
        id="middle-line"
        className={`${mounted ? "animate-draw delay-[1500ms]" : ""}`}
        d="M15,50 L95,50"
        style={{
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 10,
          strokeLinecap: "round",
          strokeDasharray: 120,
          strokeDashoffset: mounted ? 0 : 120,
          transition: "stroke 0.3s ease-in-out",
        }}
      />
      <path
        id="top-line"
        className={`${mounted ? "animate-draw delay-[1500ms]" : ""}`}
        d="M15,20 L55,20 L70,50"
        style={{
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 10,
          strokeLinecap: "round",
          strokeDasharray: 100,
          strokeDashoffset: mounted ? 0 : 100,
          transition: "stroke 0.3s ease-in-out",
        }}
      />
      <path
        id="bottom-line"
        className={`${mounted ? "animate-draw delay-[1500ms]" : ""}`}
        d="M15,80 L55,80 L70,50"
        style={{
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 10,
          strokeLinecap: "round",
          strokeDasharray: 100,
          strokeDashoffset: mounted ? 0 : 100,
          transition: "stroke 0.3s ease-in-out",
        }}
      />
    </svg>
  );
};

export default Logo;
