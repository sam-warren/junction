const INPUTS = [
  "Research",
  "Design",
  "Frontend",
  "Backend",
  "Data",
  "Platform",
];
const TOP = 36;
const STEP = 52;
const MERGE_X = 400;
const MERGE_Y = TOP + (STEP * (INPUTS.length - 1)) / 2;

export function JunctionLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 340"
      className={className}
      overflow="visible"
      role="img"
      aria-label="Research, design, frontend, backend, data and platform work joining into one line"
    >
      {INPUTS.map((label, i) => {
        const y = TOP + i * STEP;
        return (
          <g key={label}>
            <path
              d={`M0,${y} H180 C290,${y} 290,${MERGE_Y} ${MERGE_X},${MERGE_Y}`}
              fill="none"
              stroke="var(--hairline-strong)"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <circle cx={0} cy={y} r={4} fill="var(--hairline-strong)" />
            <text
              x={12}
              y={y - 10}
              fill="var(--fg-subtle)"
              fontFamily="var(--font-mono)"
              fontSize={16}
            >
              {label}
            </text>
          </g>
        );
      })}
      <path
        d={`M${MERGE_X},${MERGE_Y} H1400`}
        stroke="var(--brand-line)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <circle
        cx={MERGE_X}
        cy={MERGE_Y}
        r={10}
        fill="var(--canvas)"
        stroke="var(--brand-line)"
        strokeWidth={4}
      />
    </svg>
  );
}
