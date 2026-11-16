export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  years: string;
  summary: string;
  tech: string[];
  link?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "jupiter-power",
    client: "Jupiter Power",
    title: "Battery operations platform",
    years: "2026–",
    summary:
      "Redesigning the interface operators use to bid grid-scale battery storage into US wholesale energy markets. Running research with traders and building the frontend.",
    tech: ["Figma", "React", "TypeScript", "Python", "Azure"],
  },
  {
    slug: "vantix-alberta",
    client: "Vantix Systems for the Government of Alberta",
    title: "Energy portals",
    years: "2025–26",
    summary: "Built new government portals for energy management and data.",
    tech: ["React", "TypeScript", "Python", "Azure"],
  },
  {
    slug: "bc-justice-devops",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Justice DevOps",
    years: "2024–25",
    summary:
      "Ran a dozen public apps, including liquor licensing and disaster assistance.",
    tech: ["Angular", ".NET", "Dynamics", "OpenShift"],
  },
  {
    slug: "road-safety-initiative",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Road Safety Initiative",
    years: "2023–24",
    summary:
      "Replaced paper roadside prohibition forms used by the RCMP and BC police, and connected them to the legacy systems.",
    tech: ["React", "Python", "PostgreSQL", "OpenShift"],
  },
  {
    slug: "health-gateway",
    client: "BC Ministry of Health",
    title: "Health Gateway",
    years: "2019–21",
    summary: "Worked on the site BC residents use to see their health records.",
    tech: ["Vue.js", ".NET", "PostgreSQL", "OpenShift"],
  },
  {
    slug: "cedh-io",
    client: "Own product",
    title: "cedh.io",
    years: "2026–",
    summary:
      "cedh.io analyzes competitive Magic: The Gathering decks against tournament results.",
    tech: ["Next.js", "Supabase", "Redis", "Vercel"],
    link: "https://cedh.io",
  },
];
