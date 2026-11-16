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
    title: "Operator platform redesign",
    years: "2026–",
    summary:
      "The interface operators use to bid grid-scale battery storage into US wholesale energy markets. Research with traders and operations staff, the design system and the frontend.",
    tech: ["Figma", "React", "TypeScript", "Python", "Azure"],
  },
  {
    slug: "vantix-alberta",
    client: "Vantix Systems for the Government of Alberta",
    title: "Energy portals",
    years: "2025–26",
    summary: "New government portals for energy management and data.",
    tech: ["React", "TypeScript", "Python", "Azure"],
  },
  {
    slug: "bc-justice-devops",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Justice DevOps",
    years: "2024–25",
    summary:
      "Ran a dozen public apps, including liquor licensing, disaster assistance and victim services.",
    tech: ["Angular", ".NET", "Dynamics", "OpenShift"],
  },
  {
    slug: "road-safety-initiative",
    client: "BC Ministry of Public Safety and Solicitor General",
    title: "Road Safety Initiative",
    years: "2023–24",
    summary:
      "Replaced paper roadside prohibition forms for the RCMP and BC police, connected to the legacy systems behind them.",
    tech: ["React", "Python", "PostgreSQL", "OpenShift"],
  },
  {
    slug: "health-gateway",
    client: "BC Ministry of Health",
    title: "Health Gateway",
    years: "2019–21",
    summary: "Secure online access to health records for BC residents.",
    tech: ["Vue.js", ".NET", "PostgreSQL", "OpenShift"],
  },
  {
    slug: "cedh-io",
    client: "Our product",
    title: "cedh.io",
    years: "2026–",
    summary:
      "Deck analysis for competitive Magic: The Gathering, built on tournament results.",
    tech: ["Next.js", "Supabase", "Redis", "Vercel"],
    link: "https://cedh.io",
  },
];
