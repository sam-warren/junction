// src/content/tech-stack.ts
//
// Tech logos for the Stack marquee + the Convergence diagram.
import angularIcon from "@/assets/angular.svg";
import azureIcon from "@/assets/azure.svg";
import dockerIcon from "@/assets/docker.svg";
import dotnetIcon from "@/assets/dotnet.svg";
import dynamicsIcon from "@/assets/dynamics.svg";
import gitIcon from "@/assets/git.svg";
import graphqlIcon from "@/assets/graphql.svg";
import kubernetesIcon from "@/assets/kubernetes.svg";
import mongoIcon from "@/assets/mongodb.svg";
import muiIcon from "@/assets/mui.svg";
import mysqlIcon from "@/assets/mysql.svg";
import nextjsIcon from "@/assets/nextjs.svg";
import nodeIcon from "@/assets/node.svg";
import openshiftIcon from "@/assets/openshift.svg";
import postgresIcon from "@/assets/postgresql.svg";
import pythonIcon from "@/assets/python.svg";
import reactIcon from "@/assets/react.svg";
import reduxIcon from "@/assets/redux.svg";
import supabaseIcon from "@/assets/supabase.svg";
import tailwindIcon from "@/assets/tailwind.svg";
import tanstackIcon from "@/assets/tanstack.svg";
import typescriptIcon from "@/assets/typescript.svg";
import vueIcon from "@/assets/vue.svg";

export type TechCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "ai"
  | "legacy";

export interface Tech {
  name: string;
  icon: string;
  href?: string;
  category: TechCategory;
  /** True for black-on-transparent SVGs that need gray treatment so they
   *  stay visible in both light and dark themes. */
  darkLogo?: boolean;
}

export const TECH_STACK: Tech[] = [
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
