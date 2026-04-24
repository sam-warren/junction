// src/content/case-studies.ts
export interface CaseStudyMetric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  year: string;
  outcome: string;
  description?: string;
  tech: string[];
  cover?: string;
  link?: string;
  kind?: "client" | "product";
  metrics?: CaseStudyMetric[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "jupiter-power",
    client: "Jupiter Power",
    title: "Operator platform redesign",
    year: "2026-Present",
    outcome:
      "Redesigning the operator interface that bids grid-scale battery storage into US wholesale energy markets.",
    description:
      "UX research with traders and operations staff, design system extension, and frontend implementation across the product surface. Working directly with the engineering and trading teams to ship the next generation of the platform.",
    tech: ["Figma", "React", "Python", "Azure", "TypeScript"],
    kind: "client",
  },
  {
    slug: "vantix-alberta",
    client: "Vantix Systems / Gov. of Alberta",
    title: "Government energy portals",
    year: "2025-2026",
    outcome:
      "Net-new government portals for energy management and data organization.",
    tech: [
      "React",
      "Python",
      "Azure",
      "TypeScript",
      "TanStack",
      "shadcn",
      "Tailwind",
      "Recharts",
    ],
    kind: "client",
  },
  {
    slug: "bc-justice-devops",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Justice DevOps",
    year: "2024-2025",
    outcome:
      "Application management for a dozen public-facing apps including liquor licensing, disaster assistance, and victim services.",
    tech: [
      "Angular",
      "TypeScript",
      ".NET",
      "Dynamics",
      "OpenShift",
      "Docker",
      "Kubernetes",
    ],
    kind: "client",
  },
  {
    slug: "road-safety-initiative",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Road Safety Initiative",
    year: "2023-2024",
    outcome:
      "Digitized paper forms for RCMP and BC police, streamlining roadside prohibitions with legacy integration.",
    tech: ["React", "Redux", "TypeScript", "Python", "PostgreSQL", "OpenShift"],
    kind: "client",
  },
  {
    slug: "health-gateway",
    client: "BC Ministry of Health",
    title: "Health Gateway",
    year: "2019-2021",
    outcome:
      "Cross-sector health information platform giving BC residents secure access to their health records.",
    tech: ["Vue.js", "TypeScript", ".NET", "PostgreSQL", "OpenShift"],
    kind: "client",
  },
  {
    slug: "cedh-io",
    client: "cedh.io",
    title: "Competitive EDH deck analysis",
    year: "2026-Present",
    outcome:
      "Full-stack Magic: The Gathering analytics product. Proprietary aggregation of tournament APIs recommends cards for Competitive EDH decks.",
    tech: [
      "Next.js",
      "Vercel",
      "Supabase",
      "Redis",
      "TypeScript",
      "shadcn",
      "Tailwind",
      "TanStack",
      "Recharts",
    ],
    kind: "product",
    metrics: [
      { label: "Active users", value: 1500, suffix: "+" },
      { label: "MRR", value: 250, prefix: "$" },
    ],
    link: "https://cedh.io",
  },
];
