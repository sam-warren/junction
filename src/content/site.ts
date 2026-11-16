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
  headline: "We design and build software for government and energy.",
  sub: "Junction Technologies is Sam Warren, a software engineer in Victoria, BC. You work with one person from the first interview to the release.",
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
    description: "User research, design systems and screens ready to build.",
  },
  {
    name: "Full-stack development",
    description:
      "TypeScript and Python, from the frontend to the infrastructure.",
  },
  {
    name: "Dashboards and data",
    description:
      "Charts and tables for complex data that anyone on staff can read.",
  },
  {
    name: "Systems integration",
    description: "APIs, identity and legacy systems connected to new work.",
  },
  {
    name: "AI features",
    description:
      "Language-model agents, retrieval and extraction on your own data.",
  },
  {
    name: "Platform and DevOps",
    description:
      "CI/CD and hosting on Azure, OpenShift, Kubernetes and Vercel.",
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
    `Sam founded Junction Technologies in 2025 after ${yearsOfExperience()} years of work for BC Health, BC Justice, BC Public Safety and Alberta government ministries, across frontend, backend and DevOps.`,
    "Sam has a Software Engineering degree from the University of Victoria and currently leads design and frontend for a Texas energy analytics platform.",
  ],
} as const;

export const CONTACT = {
  title: "Start a project",
  sub: "The first call is free and takes 30 minutes.",
} as const;
