// src/content/tech-stack.ts
//
// Tech logos for the Stack marquee + the Convergence diagram.
import angularIcon from "@/assets/angular.svg";
import azureIcon from "@/assets/azure.svg";
import dockerIcon from "@/assets/docker.svg";
import dotnetIcon from "@/assets/dotnet.svg";
import dynamicsIcon from "@/assets/dynamics.svg";
import figmaIcon from "@/assets/figma.svg";
import gitIcon from "@/assets/git.svg";
import graphqlIcon from "@/assets/graphql.svg";
import kubernetesIcon from "@/assets/kubernetes.svg";
import linearIcon from "@/assets/linear.svg";
import mongoIcon from "@/assets/mongodb.svg";
import muiIcon from "@/assets/mui.svg";
import mysqlIcon from "@/assets/mysql.svg";
import nextjsIcon from "@/assets/nextjs.svg";
import nodeIcon from "@/assets/node.svg";
import notionIcon from "@/assets/notion.svg";
import openshiftIcon from "@/assets/openshift.svg";
import postgresIcon from "@/assets/postgresql.svg";
import pythonIcon from "@/assets/python.svg";
import reactIcon from "@/assets/react.svg";
import reduxIcon from "@/assets/redux.svg";
import shadcnIcon from "@/assets/shadcn.svg";
import supabaseIcon from "@/assets/supabase.svg";
import tailwindIcon from "@/assets/tailwind.svg";
import tanstackIcon from "@/assets/tanstack.svg";
import typescriptIcon from "@/assets/typescript.svg";
import vercelIcon from "@/assets/vercel.svg";
import vueIcon from "@/assets/vue.svg";

export type TechCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "ai"
  | "design"
  | "legacy";

export interface Tech {
  name: string;
  icon: string;
  href?: string;
  category: TechCategory;
  /** True for fully-black logos we want to lean into (e.g. Next.js): the
   *  filter pushes them toward white in dark mode for high pop. Aggressive
   *  curve — use sparingly, and prefer `softLogo` for muted blending. */
  darkLogo?: boolean;
  /** True for high-contrast monochrome logos (mostly white or mostly black)
   *  that should appear as a muted mid-gray in both themes, blending with
   *  the colored logos rather than poking out. */
  softLogo?: boolean;
}

/** Returns the Tailwind class string for the icon's image filter, picking
 *  the appropriate treatment based on the logo's contrast profile. */
export function techFilterClass(opts: {
  darkLogo?: boolean;
  softLogo?: boolean;
}): string {
  if (opts.softLogo) {
    return "[filter:grayscale(1)_invert(0.45)] dark:[filter:grayscale(1)_invert(0.55)]";
  }
  if (opts.darkLogo) {
    return "[filter:grayscale(1)_invert(0.88)] dark:[filter:grayscale(1)_invert(0.95)]";
  }
  return "grayscale dark:invert";
}

export const TECH_STACK: Tech[] = [
  {
    name: "Figma",
    icon: figmaIcon,
    category: "design",
    href: "https://figma.com/",
  },
  {
    name: "Notion",
    icon: notionIcon,
    category: "design",
    href: "https://notion.so/",
    softLogo: true,
  },
  {
    name: "Linear",
    icon: linearIcon,
    category: "design",
    href: "https://linear.app/",
  },
  {
    name: "React",
    icon: reactIcon,
    category: "frontend",
    href: "https://react.dev/",
  },
  {
    name: "Next.js",
    icon: nextjsIcon,
    category: "frontend",
    href: "https://nextjs.org/",
    darkLogo: true,
  },
  {
    name: "Vue.js",
    icon: vueIcon,
    category: "frontend",
    href: "https://vuejs.org/",
  },
  {
    name: "Angular",
    icon: angularIcon,
    category: "legacy",
    href: "https://angular.io/",
  },
  {
    name: "TypeScript",
    icon: typescriptIcon,
    category: "frontend",
    href: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind CSS",
    icon: tailwindIcon,
    category: "frontend",
    href: "https://tailwindcss.com/",
  },
  {
    name: "shadcn/ui",
    icon: shadcnIcon,
    category: "frontend",
    href: "https://ui.shadcn.com/",
    softLogo: true,
  },
  {
    name: "TanStack",
    icon: tanstackIcon,
    category: "frontend",
    href: "https://tanstack.com/",
  },
  {
    name: "Redux",
    icon: reduxIcon,
    category: "frontend",
    href: "https://redux.js.org/",
  },
  {
    name: "Material UI",
    icon: muiIcon,
    category: "frontend",
    href: "https://mui.com/",
  },
  {
    name: "Node.js",
    icon: nodeIcon,
    category: "backend",
    href: "https://nodejs.org/",
  },
  {
    name: ".NET",
    icon: dotnetIcon,
    category: "legacy",
    href: "https://dotnet.microsoft.com/",
  },
  {
    name: "Python",
    icon: pythonIcon,
    category: "backend",
    href: "https://www.python.org/",
  },
  {
    name: "GraphQL",
    icon: graphqlIcon,
    category: "backend",
    href: "https://graphql.org/",
  },
  {
    name: "PostgreSQL",
    icon: postgresIcon,
    category: "database",
    href: "https://www.postgresql.org/",
  },
  {
    name: "Supabase",
    icon: supabaseIcon,
    category: "database",
    href: "https://supabase.com/",
  },
  {
    name: "MySQL",
    icon: mysqlIcon,
    category: "database",
    href: "https://www.mysql.com/",
  },
  {
    name: "MongoDB",
    icon: mongoIcon,
    category: "database",
    href: "https://www.mongodb.com/",
  },
  {
    name: "OpenShift",
    icon: openshiftIcon,
    category: "legacy",
    href: "https://www.openshift.com/",
  },
  {
    name: "Microsoft Dynamics",
    icon: dynamicsIcon,
    category: "legacy",
    href: "https://dynamics.microsoft.com/",
  },
  {
    name: "Azure",
    icon: azureIcon,
    category: "devops",
    href: "https://azure.microsoft.com/",
  },
  {
    name: "Vercel",
    icon: vercelIcon,
    category: "devops",
    href: "https://vercel.com/",
    softLogo: true,
  },
  {
    name: "Docker",
    icon: dockerIcon,
    category: "devops",
    href: "https://www.docker.com/",
  },
  {
    name: "Kubernetes",
    icon: kubernetesIcon,
    category: "devops",
    href: "https://kubernetes.io/",
  },
  {
    name: "Git",
    icon: gitIcon,
    category: "devops",
    href: "https://git-scm.com/",
  },
];

/** Helper: tech logos by category, used by Convergence + StackMarquee. */
export const techByCategory = (cat: TechCategory) =>
  TECH_STACK.filter((t) => t.category === cat);
