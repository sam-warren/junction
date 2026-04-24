// src/content/site.ts
import githubIcon from '@/assets/github.svg';
import linkedinIcon from '@/assets/linkedin.svg';

export const BRAND = {
  full: 'Junction Technologies LTD.',
  short: 'Junction',
  legalSuffix: 'LTD.',
  // Resolved 2026-04-23 (HANDOFF.md): domain stays junctiontech.ca,
  // contact moves to brand-domain inbox.
  domain: 'junctiontech.ca',
  contactEmail: 'sam@junctiontech.ca',
  founded: 2024,
  founder: {
    name: 'Sam Warren',
    title: 'Founder & Principal Engineer',
    location: 'Victoria, BC',
  },
} as const;

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/sam-warren/junction',
    icon: githubIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/junctiontech',
    icon: linkedinIcon,
  },
] as const;

export const COPY = {
  hero: {
    eyebrow: 'Junction Technologies',
    // PLACEHOLDER (DESIGN.md Risk #7) — confirm during user review or in Phase 5.
    headline: 'Modernize without rewriting.',
    sub: 'Junction is an independent software consultancy that bridges legacy systems with modern technology — without forcing a rebuild.',
    primaryCta: 'Start a project',
    secondaryCta: 'See our work',
  },
  cta: {
    headline: "Let's build something.",
    sub: "Free 30-minute consult. No deck, no pitch — just a conversation about what you're building.",
    primary: 'Start a project',
    secondaryLabel: 'or email',
  },
  about: {
    eyebrow: 'About',
    title: 'Junction',
    company:
      'Junction Technologies LTD. is an independent software consultancy. We design and build integrations and applications that connect legacy systems with modern stacks — for governments, enterprises, and the engineering teams that maintain them.',
    founderBio:
      'Sam Warren is a senior full-stack engineer with seven years building public-sector software in Canada. UVic Software Engineering grad. Has shipped to BC Justice, BC Health, and BC Public Safety in roles spanning frontend, backend, and DevOps.',
    facts: [
      { label: 'Based in', value: 'Victoria, BC' },
      { label: 'Founded', value: '2024' },
      { label: 'Specialty', value: 'Legacy ↔ modern integration' },
    ] as const,
  },
  work: {
    eyebrow: 'Selected work',
    title: "Where we've shipped.",
  },
  capabilities: {
    eyebrow: 'What we do',
    title: 'Capabilities',
  },
  convergence: {
    eyebrow: 'How we connect systems',
    title: 'Where modern systems converge.',
  },
  stack: {
    eyebrow: 'Stack',
  },
} as const;
