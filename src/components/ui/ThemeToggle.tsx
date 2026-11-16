"use client";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("light") ? "dark" : "light";
    root.classList.toggle("light", next === "light");
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.theme = next;
    } catch (error) {
      void error;
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="text-fg-muted [@media(hover:hover)]:hover:text-fg inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-150"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
      </svg>
    </button>
  );
}
