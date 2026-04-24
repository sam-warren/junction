// src/content/site.ts
import githubIcon from "@/assets/github.svg";
import linkedinIcon from "@/assets/linkedin.svg";

export const BRAND = {
  full: "Junction Technologies LTD.",
  short: "Junction",
  legalSuffix: "LTD.",
  domain: "junctiontech.ca",
  contactEmail: "sam@junctiontech.ca",
  founded: 2024,
  founder: {
    name: "Sam Warren",
    title: "Founder & Principal Engineer",
    location: "Victoria, BC",
  },
} as const;

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/sam-warren/junction",
    icon: githubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/junctiontech",
    icon: linkedinIcon,
  },
] as const;

export const COPY = {
  hero: {
    eyebrow: "",
    headlinePrefix: "We Build",
    headlineWords: [
      "Interfaces",
      "Dashboards",
      "Platforms",
      "Products",
      "Tools",
    ],
    sub: "An independent software consultancy. We design and build interfaces, from UX research through production code.",
    primaryCta: "Start a project",
    secondaryCta: "See our work",
  },
  cta: {
    headline: "Let's build something.",
    sub: "A 30-minute consultation to discuss scope, timeline, and fit.",
    primary: "Start a project",
    secondaryLabel: "or email",
  },
  about: {
    eyebrow: "About",
    title: "Junction",
    company:
      "Junction Technologies LTD. is an independent software consultancy specializing in interface design and full-stack implementation. We work with governments, energy operators, and engineering teams who need polished, reliable tooling.",
    founderBio:
      "Sam Warren is a senior full-stack engineer with seven years shipping software in Canada's public and energy sectors. UVic Software Engineering grad. Currently leading UX/UI and frontend for an energy analytics platform; prior work spans BC Justice, BC Health, BC Public Safety, and multiple Alberta government ministries across frontend, backend, and DevOps.",
    facts: [
      { label: "Based in", value: "Victoria, BC" },
      { label: "Founded", value: "2024" },
      {
        label: "Practice",
        value: "Interface design + full-stack implementation",
      },
    ] as const,
  },
  work: {
    eyebrow: "Selected work",
    title: "Where we've shipped.",
  },
  capabilities: {
    eyebrow: "What we do",
    title: "Capabilities",
  },
  convergence: {
    eyebrow: "How we build",
    title: "Where design meets implementation.",
    sub: "Our clients arrive with systems they cannot replace overnight. We migrate incrementally: UI, runtime, and platform each move at their own pace. Shared contracts bridge old and new, and the interfaces we ship hide the transition from end users.",
  },
  approach: {
    eyebrow: "Approach",
    title: "How work moves.",
    sub: "Research to production through four phases. Each reviewed, each demoable, each shipped.",
  },
  stack: {
    eyebrow: "Stack",
  },
} as const;
