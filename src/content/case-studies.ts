// src/content/case-studies.ts
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
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "bc-justice-devops",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Justice and Public Sector DevOps",
    year: "2018–2024",
    outcome:
      "Application management for a dozen public-facing apps including liquor licensing, disaster assistance, and victim services.",
    tech: ["Angular", "TypeScript", ".NET", "Dynamics", "OpenShift", "Docker", "Kubernetes"],
  },
  {
    slug: "road-safety-initiative",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Road Safety Initiative",
    year: "2020–2022",
    outcome:
      "Digitized paper forms for RCMP and BC police, streamlining roadside prohibitions with seamless legacy integration.",
    tech: ["React", "Redux", "TypeScript", "Python", "PostgreSQL", "OpenShift"],
  },
  {
    slug: "health-gateway",
    client: "BC Ministry of Health",
    title: "Health Gateway",
    year: "2019–2021",
    outcome:
      "Cross-sector health information platform giving BC residents secure access to their health records.",
    tech: ["Vue.js", "TypeScript", ".NET", "PostgreSQL", "OpenShift"],
  },
  // PLACEHOLDER (DESIGN.md Risk #3): add new case studies here. Empty-state
  // logic in Work.tsx renders "More case studies coming soon" if length < 3.
];
