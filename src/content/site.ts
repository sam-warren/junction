export const BRAND = {
  full: "Junction Technologies LTD.",
  short: "Junction",
  contactEmail: "sam@junctiontech.ca",
} as const;

export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/junctiontech" },
  { name: "GitHub", href: "https://github.com/sam-warren/junction" },
] as const;

export const NAV = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const HERO = {
  headline:
    "I design and build web software, from user research to production.",
  sub: "Junction Technologies is Sam Warren in Victoria, BC. You hire one engineer who does both the design and the code.",
  primaryCta: "Start a project",
  secondaryCta: "See our work",
} as const;

export interface Service {
  name: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    name: "Interface design",
    description:
      "I interview the people who use the tool, then design the system and screens. I did this last for energy traders at Jupiter Power.",
  },
  {
    name: "Full-stack development",
    description:
      "I write TypeScript and Python from the database to the UI, and I built and run cedh.io alone.",
  },
  {
    name: "Dashboards and data",
    description:
      "I build charts and tables for energy-market and tournament data.",
  },
  {
    name: "Systems integration",
    description:
      "I put new front ends on old systems, as I did for BC's roadside prohibition forms.",
  },
  {
    name: "AI features",
    description:
      "I build language-model features on the data you already have.",
  },
  {
    name: "Platform and DevOps",
    description:
      "I kept a dozen BC government apps running on OpenShift. I also deploy to Azure, Kubernetes and Vercel.",
  },
];

const CAREER_START = new Date(2018, 4, 1);

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

export function yearsSince(start: Date, now: Date = new Date()): number {
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return Math.floor(months / 12);
}

export function yearsOfExperience(now: Date = new Date()): string {
  const years = yearsSince(CAREER_START, now);
  return NUMBER_WORDS[years] ?? String(years);
}

export const ABOUT = {
  body: [
    `I started Junction Technologies in 2025 after ${yearsOfExperience()} years of work for BC Health, BC Justice, BC Public Safety and Alberta government ministries, on both frontend and backend.`,
    "I have a Software Engineering degree from the University of Victoria and lead design and frontend for a Texas energy analytics platform.",
  ],
} as const;

export const CONTACT = {
  title: "Start a project",
  sub: "The first call is free and takes 30 minutes.",
} as const;
