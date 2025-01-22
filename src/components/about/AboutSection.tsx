import { Code2, Database, GitBranch, Server } from "lucide-react";
import React from "react";

import {
  AngularIcon,
  AzureIcon,
  BootstrapIcon,
  DjangoIcon,
  DockerIcon,
  DotnetIcon,
  DynamicsIcon,
  GitIcon,
  GraphQLIcon,
  KubernetesIcon,
  MongoDBIcon,
  MUIIcon,
  MySQLIcon,
  NodeIcon,
  OpenshiftIcon,
  PostgreSQLIcon,
  PythonIcon,
  ReactIcon,
  RedisIcon,
  ReduxIcon,
  TailwindIcon,
  TypeScriptIcon,
  VueIcon,
} from "@/assets";
import CollapsibleSection from "../ui/CollapsibleSection";
import TechnologyChip from "../ui/TechnologyChip";

interface Technology {
  name: string;
  icon: string;
}

interface TechnologyCategory {
  category: string;
  icon: React.ReactNode;
  items: Technology[];
}

interface ExperienceHighlight {
  role: string;
  project: string;
  client?: string;
  description: string;
  technologies: TechnologyChip[];
}

const AboutSection: React.FC = () => {
  const technologies: TechnologyCategory[] = [
    {
      category: "Frontend",
      icon: <Code2 className="h-8 w-8 text-blue-500" />,
      items: [
        { name: "React", icon: ReactIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
        { name: "Tailwind CSS", icon: TailwindIcon },
        { name: "Angular", icon: AngularIcon },
        { name: "Vue.js", icon: VueIcon },
      ],
    },
    {
      category: "Backend",
      icon: <Server className="h-8 w-8 text-blue-500" />,
      items: [
        { name: "Microsoft .NET", icon: DotnetIcon },
        { name: "Django ORM", icon: DjangoIcon },
        { name: "Node.js", icon: NodeIcon },
        { name: "GraphQL", icon: GraphQLIcon },
      ],
    },
    {
      category: "Databases",
      icon: <Database className="h-8 w-8 text-blue-500" />,
      items: [
        { name: "PostgreSQL", icon: PostgreSQLIcon },
        { name: "MySQL", icon: MySQLIcon },
        { name: "Redis", icon: RedisIcon },
        { name: "MongoDB", icon: MongoDBIcon },
      ],
    },
    {
      category: "DevOps & Tools",
      icon: <GitBranch className="h-8 w-8 text-blue-500" />,
      items: [
        { name: "RedHat OpenShift", icon: OpenshiftIcon },
        { name: "Microsoft Dynamics", icon: DynamicsIcon },
        { name: "Microsoft Azure", icon: AzureIcon },
        { name: "Docker", icon: DockerIcon },
        { name: "Kubernetes", icon: KubernetesIcon },
      ],
    },
  ];

  const experienceHighlights: ExperienceHighlight[] = [
    {
      role: "Full Stack Developer",
      project: "Justice and Public Sector DevOps",
      client: "BC Ministry of Public Safety and Solicitor General",
      description:
        "Application management and development for over a dozen critical public-facing applications including liquor licensing, disaster assistance, and victim services tools.",
      technologies: [
        { icon: AngularIcon, label: "Angular", href: "https://angular.io/" },
        {
          icon: BootstrapIcon,
          label: "Bootstrap",
          href: "https://getbootstrap.com/",
        },
        {
          icon: TypeScriptIcon,
          label: "TypeScript",
          href: "https://www.typescriptlang.org/",
        },
        {
          icon: DotnetIcon,
          label: ".NET",
          href: "https://dotnet.microsoft.com/",
        },
        {
          icon: DynamicsIcon,
          label: "Dynamics",
          href: "https://dynamics.microsoft.com/",
        },
        {
          icon: OpenshiftIcon,
          label: "OpenShift",
          href: "https://www.openshift.com/",
        },
        { icon: DockerIcon, label: "Docker", href: "https://www.docker.com/" },
        {
          icon: KubernetesIcon,
          label: "Kubernetes",
          href: "https://kubernetes.io/",
        },
        { icon: GitIcon, label: "Git", href: "https://git-scm.com/" },
      ],
    },
    {
      role: "Full Stack Developer",
      project: "Road Safety Initiative",
      client: "BC Ministry of Public Safety and Solicitor General",
      description:
        "Digitized paper forms for RCMP and BC police departments, streamlining roadside prohibitions and integrating seamlessly with external services and legacy systems.",
      technologies: [
        { icon: ReactIcon, label: "React", href: "https://react.dev/" },
        { icon: ReduxIcon, label: "Redux", href: "https://redux.js.org/" },
        { icon: MUIIcon, label: "MUI", href: "https://mui.com/" },
        {
          icon: TypeScriptIcon,
          label: "TypeScript",
          href: "https://www.typescriptlang.org/",
        },
        { icon: PythonIcon, label: "Python", href: "https://www.python.org/" },
        {
          icon: PostgreSQLIcon,
          label: "PostgreSQL",
          href: "https://www.postgresql.org/",
        },
        {
          icon: OpenshiftIcon,
          label: "OpenShift",
          href: "https://www.openshift.com/",
        },
        { icon: DockerIcon, label: "Docker", href: "https://www.docker.com/" },
        {
          icon: KubernetesIcon,
          label: "Kubernetes",
          href: "https://kubernetes.io/",
        },
        { icon: GitIcon, label: "Git", href: "https://git-scm.com/" },
      ],
    },
    {
      role: "Full Stack Developer",
      project: "Health Gateway",
      client: "BC Ministry of Health",
      description:
        "Developed cross-sector health information platform empowering BC residents to access and manage their health information securely.",
      technologies: [
        { icon: VueIcon, label: "Vue.js", href: "https://vuejs.org/" },
        { icon: MUIIcon, label: "MUI", href: "https://mui.com/" },
        {
          icon: TypeScriptIcon,
          label: "TypeScript",
          href: "https://www.typescriptlang.org/",
        },
        {
          icon: DotnetIcon,
          label: ".NET",
          href: "https://dotnet.microsoft.com/",
        },
        {
          icon: PostgreSQLIcon,
          label: "PostgreSQL",
          href: "https://www.postgresql.org/",
        },
        {
          icon: OpenshiftIcon,
          label: "OpenShift",
          href: "https://www.openshift.com/",
        },
        { icon: DockerIcon, label: "Docker", href: "https://www.docker.com/" },
        {
          icon: KubernetesIcon,
          label: "Kubernetes",
          href: "https://kubernetes.io/",
        },
        { icon: GitIcon, label: "Git", href: "https://git-scm.com/" },
      ],
    },
  ];

  return (
    <div className="relative">
      <section className="relative mx-auto w-full max-w-7xl p-3 sm:p-4 sm:px-6 lg:px-8 lg:pt-40">
        {/* Introduction and Proficiency Grid Row */}
        <div className="mb-8 flex flex-col lg:mb-20 lg:flex-row lg:gap-16 xl:gap-24">
          {/* Left Column - Text Content */}
          <div className="mb-8 lg:mb-0 lg:w-1/2">
            <h2 className="mb-2 animate-fade-up text-3xl font-bold text-gray-900 dark:text-white">
              About JunctionTech
            </h2>
            <p className="mb-8 animate-fade-up text-lg text-gray-600 dark:text-gray-300">
              JunctionTech is an independent software consultancy specializing
              in modernizing legacy systems with emerging technologies.
              JunctionTech delivers enterprise solutions that transform complex
              technical challenges into practical, efficient, and beautiful
              systems.
            </p>

            <div className="divider my-6 h-px w-full bg-gray-200 lg:hidden dark:bg-gray-800"></div>

            <h2 className="mb-2 animate-fade-up-200 text-3xl font-bold text-gray-900 opacity-0 dark:text-white">
              <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
                Meet
              </span>{" "}
              Sam Warren
            </h2>
            <div className="relative animate-fade-up-200 opacity-0">
              <div className="space-y-3 sm:space-y-4">
                <p className="mt-0 text-base text-gray-600 sm:text-lg dark:text-gray-300">
                  Founder of JunctionTech and a Software Engineering graduate
                  from the University of Victoria, Sam is a Senior Full Stack
                  Developer with six years of experience crafting resilient,
                  scalable enterprise applications.
                </p>
                <p className="text-base text-gray-600 sm:text-lg dark:text-gray-300">
                  Sam specializes in modern JavaScript frameworks, robust API
                  development, and cloud-native architecture. Working directly
                  with clients, Sam brings a personal commitment to delivering
                  high-quality software solutions that exceed expectations and
                  solve real business challenges.
                </p>
              </div>
            </div>
          </div>

          <div className="divider mb-6 h-px w-full bg-gray-200 lg:hidden dark:bg-gray-800"></div>

          {/* Right Column - Technical Expertise Grid */}
          <div className="lg:w-1/2">
            <div className="lg:hidden">
              <CollapsibleSection title="Specializations">
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  {technologies.map((tech, index) => (
                    <div
                      key={tech.category}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                      className="animate-fade-up rounded-lg border border-gray-200 bg-white/20 p-6 opacity-0 backdrop-blur-[5px] dark:border-gray-800 dark:bg-gray-900/20"
                    >
                      <div className="flex flex-col">
                        <div className="mb-4 flex items-center">
                          {tech.icon}
                          <h4 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                            {tech.category}
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {tech.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center gap-2"
                            >
                              <img
                                src={item.icon}
                                alt={item.name}
                                className="h-5 w-5"
                              />
                              <span className="text-gray-600 dark:text-gray-300">
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
            <div className="hidden lg:block">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                Specializations
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {technologies.map((tech, index) => (
                  <div
                    key={tech.category}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                    className="animate-fade-up rounded-lg border border-gray-200 bg-white/20 p-6 opacity-0 backdrop-blur-[5px] dark:border-gray-800 dark:bg-gray-900/20"
                  >
                    <div className="flex flex-col">
                      <div className="mb-4 flex items-center">
                        {tech.icon}
                        <h4 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                          {tech.category}
                        </h4>
                      </div>
                      <div className="space-y-3">
                        {tech.items.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2"
                          >
                            <img
                              src={item.icon}
                              alt={item.name}
                              className="h-5 w-5"
                            />
                            <span className="text-gray-600 dark:text-gray-300">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="divider my-6 h-px w-full bg-gray-200 lg:hidden dark:bg-gray-800"></div>

        <div>
          <div className="lg:hidden">
            <CollapsibleSection title="Experience Highlights">
              <div className="mt-4 space-y-4 sm:space-y-6 md:mb-16">
                {experienceHighlights.map((exp, index) => (
                  <div
                    key={exp.project}
                    style={{
                      animationDelay: `${0.5 + index * 0.1}s`,
                    }}
                    className="animate-fade-up rounded-lg border border-gray-200 bg-white/20 p-6 opacity-0 backdrop-blur-[5px] dark:border-gray-800 dark:bg-gray-900/20"
                  >
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <h4 className="mb-2 text-gray-900 dark:text-white">
                      {exp.client}
                    </h4>
                    <h4 className="mb-2 inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-lg font-medium text-transparent dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
                      {exp.project}
                    </h4>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <TechnologyChip
                          key={tech.label}
                          icon={tech.icon}
                          label={tech.label}
                          href={tech.href}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
          <div className="hidden pb-16 lg:block">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Experience Highlights
            </h2>
            <div className="space-y-6">
              {experienceHighlights.map((exp, index) => (
                <div
                  key={exp.project}
                  style={{
                    animationDelay: `${0.5 + index * 0.1}s`,
                  }}
                  className="animate-fade-up rounded-lg border border-gray-200 bg-white/20 p-6 opacity-0 backdrop-blur-[5px] dark:border-gray-800 dark:bg-gray-900/20"
                >
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <h4 className="mb-2 text-gray-900 dark:text-white">
                    {exp.client}
                  </h4>
                  <h4 className="mb-2 inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-lg font-medium text-transparent dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
                    {exp.project}
                  </h4>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <TechnologyChip
                        key={tech.label}
                        icon={tech.icon}
                        label={tech.label}
                        href={tech.href}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
