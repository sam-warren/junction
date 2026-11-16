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
      "Interviews with the people who use the tool, then the design system and screens. Most recent: energy traders at Jupiter Power.",
  },
  {
    name: "Full-stack development",
    description:
      "TypeScript and Python from the database to the UI. Built and runs cedh.io solo.",
  },
  {
    name: "Dashboards and data",
    description: "Charts and tables for energy-market and tournament data.",
  },
  {
    name: "Systems integration",
    description:
      "New front ends on old systems, such as BC's roadside prohibition forms.",
  },
  {
    name: "AI features",
    description: "Language-model features built on the data you already have.",
  },
  {
    name: "Platform and DevOps",
    description:
      "Kept a dozen BC government apps running on OpenShift. Also ships to Azure, Kubernetes and Vercel.",
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
    `Started Junction Technologies in 2025 after ${yearsOfExperience()} years of work for BC Health, BC Justice, BC Public Safety and Alberta government ministries, on both frontend and backend.`,
    "Software Engineering degree from the University of Victoria. Now leading design and frontend for a Texas energy analytics platform.",
  ],
} as const;

export const CONTACT = {
  title: "Start a project",
  sub: "The first call is free and takes 30 minutes.",
} as const;
