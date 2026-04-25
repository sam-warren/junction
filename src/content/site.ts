// src/content/site.ts
import githubIcon from "@/assets/github.svg";
import linkedinIcon from "@/assets/linkedin.svg";

export const BRAND = {
  full: "Junction Technologies LTD.",
  short: "Junction",
  legalSuffix: "LTD.",
  domain: "junction-technologies.com",
  contactEmail: "sam@junctiontech.ca",
  founded: 2025,
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
      "Junction Technologies LTD. is an independent software consultancy specializing in interface design and full-stack implementation. We work with public and private sector entities who need polished, reliable tooling.",
    founderBio:
      "Sam Warren is a senior full-stack engineer with seven years shipping software across the public and private sectors in North America. A University of Victoria Software Engineering graduate, he currently leads UX/UI and frontend for a Texas-based energy analytics platform; prior work spans BC Justice, BC Health, BC Public Safety, and multiple Alberta government ministries across frontend, backend, and DevOps.",
    facts: [
      { label: "Based in", value: "Victoria, BC" },
      { label: "Founded", value: "2025" },
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
    sub: "Discovery to deployment as one continuous flow. Research informs the design. The design informs the build. The same hands ship every layer. No handoff loss between phases.",
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
