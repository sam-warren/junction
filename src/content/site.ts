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
    "Product design and full-stack engineering from one senior developer.",
  sub: "Junction Technologies is Sam Warren, in Victoria, BC. I do the user research, the design and the code myself.",
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
      "Interviews with the people who use the tool, then a design system and screens. Most recently for energy traders at Jupiter Power.",
  },
  {
    name: "Full-stack development",
    description:
      "TypeScript and Python from database to UI. I built and run cedh.io on my own.",
  },
  {
    name: "Dashboards and data",
    description:
      "Charts and tables for energy-market, government and tournament data.",
  },
  {
    name: "Systems integration",
    description:
      "New front ends on old systems, like BC's roadside prohibition forms.",
  },
  {
    name: "AI features",
    description:
      "Language-model tools that read and act on your own data: agents, search and extraction.",
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
    `I started Junction Technologies in 2025 after ${yearsOfExperience()} years of work for BC Health, BC Justice, BC Public Safety and Alberta government ministries, across frontend, backend and DevOps.`,
    "I have a Software Engineering degree from the University of Victoria and currently lead design and frontend for a Texas energy analytics platform.",
  ],
} as const;

export const CONTACT = {
  title: "Start a project",
  sub: "The first call is free and takes 30 minutes.",
} as const;
