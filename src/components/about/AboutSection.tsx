import profileImage from "@/assets/profile.jpg";
import { Code2, Server, Database, GitBranch } from "lucide-react";

import {
  ReactIcon,
  AngularIcon,
  VueIcon,
  TailwindIcon,
  ViteIcon,
  TypeScriptIcon,
  NodeIcon,
  PythonIcon,
  DjangoIcon,
  GraphQLIcon,
  PostgreSQLIcon,
  MongoDBIcon,
  DockerIcon,
  KubernetesIcon,
  AzureIcon,
  OpenshiftIcon,
  BootstrapIcon,
  MUIIcon,
  ReduxIcon,
  GitIcon,
  DotnetIcon,
  DynamicsIcon,
  MySQLIcon,
  RedisIcon,
} from "@/assets";
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
        { name: "Vite", icon: ViteIcon },
        { name: "Angular", icon: AngularIcon },
        { name: "Vue.js", icon: VueIcon },
      ],
    },
    {
      category: "Backend",
      icon: <Server className="h-8 w-8 text-blue-500" />,
      items: [
        { name: "Microsoft .NET", icon: DotnetIcon },
        { name: "Node.js", icon: NodeIcon },
        { name: "GraphQL", icon: GraphQLIcon },
      ],
    },
    {
      category: "Databases",
      icon: <Database className="h-8 w-8 text-blue-500" />,
      items: [
        { name: "PostgreSQL", icon: PostgreSQLIcon },
        { name: "Django ORM", icon: DjangoIcon },
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
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      <section className="relative mx-auto w-full max-w-7xl p-4 sm:px-6 lg:px-8 lg:pt-40">
        {/* Introduction and Proficiency Grid Row */}
        <div className="mb-20 flex flex-col lg:flex-row lg:gap-16 xl:gap-24">
          {/* Left Column - Text Content */}
          <div className="mb-12 lg:mb-0 lg:w-1/2">
            <h2 className="mb-2 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
              About{" "}
              <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
                JunctionTech
              </span>
            </h2>
            <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
              Specializing in bridging legacy systems with modern technology,
              JunctionTech delivers innovative solutions for enterprise digital
              transformation. We bring technical excellence and practical
              solutions to complex challenges.
            </p>

            <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
                Meet
              </span>{" "}
              Sam Warren
            </h2>
            <div className="relative">
              <div className="float-left mb-2 mr-6 w-32 pt-1">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <img
                    src={profileImage}
                    alt="Sam Warren"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-0 text-lg text-gray-600 dark:text-gray-300">
                Sam is a Senior Full Stack Developer with six years of
                experience crafting resilient, scalable enterprise web and
                mobile applications. Sam specializes in modern JavaScript
                frameworks, robust API development, cloud-native architecture
                and enterprise-scale solutions. Sam has a proven track record of
                delivering high quality software solutions that meet business
                needs and exceed stakeholder expectations.
              </p>
            </div>
          </div>

          {/* Right Column - Technical Expertise Grid */}
          <div className="lg:w-1/2">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Specializations
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {technologies.map((tech) => (
                <div
                  key={tech.category}
                  className="rounded-lg border border-gray-200 bg-white/50 p-6 backdrop-blur dark:border-gray-800 dark:bg-gray-900/50"
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

        {/* Experience Highlights Row */}
        <div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Experience Highlights
          </h2>
          <div className="mb-24 space-y-6">
            {experienceHighlights.map((exp) => (
              <div
                key={exp.project}
                className="rounded-lg border border-gray-200 bg-white/50 p-6 backdrop-blur dark:border-gray-800 dark:bg-gray-900/50"
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
      </section>
    </div>
  );
};

export default AboutSection;
