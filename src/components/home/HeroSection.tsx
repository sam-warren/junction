import { Link } from "react-router-dom";
import {
  Code2,
  Database,
  Workflow,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import FrostedCard from "../ui/FrostedCard";

const services = [
  {
    icon: <Code2 className="h-8 w-8 text-blue-500" />,
    title: "Custom Development",
    description:
      "Custom tailored software solutions specific to your business needs, complete with beautiful interfaces and powerful functionality.",
  },
  {
    icon: <Database className="h-8 w-8 text-blue-500" />,
    title: "System Integration",
    description:
      "Expert integration of diverse systems and databases, creating unified solutions that enhance operational efficiency.",
  },
  {
    icon: <Workflow className="h-8 w-8 text-blue-500" />,
    title: "Process Automation",
    description:
      "Streamlined workflows to reduce manual tasks with intelligent automation solutions designed for your specific business needs.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
    title: "Security Solutions",
    description:
      "Robust security implementations that protect your systems and data while maintaining compliance with industry standards.",
  },
];

const HeroSection = () => {
  return (
    <section className="relative flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-2 pb-6 pt-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="px-2 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block animate-fade-up text-gray-900 opacity-0 dark:text-gray-100">
              Where Modern Systems
            </span>
            <span className="block animate-fade-up-200 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-5xl leading-normal text-transparent opacity-0 duration-300 sm:mt-0 md:pb-4 md:text-6xl lg:pb-4 lg:text-7xl dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
              Converge
            </span>
          </h1>
          <div className="space-y-2 px-4 pt-2 sm:px-0 sm:pt-6">
            <p className="animate-fade-up-400 text-base leading-relaxed text-gray-600 opacity-0 sm:text-lg md:text-xl dark:text-gray-300">
              Specializing in bridging legacy infrastructure with cutting-edge
              technology.
            </p>
            <p className="animate-fade-up-400 text-base leading-relaxed text-gray-600 opacity-0 sm:text-lg md:text-xl dark:text-gray-300">
              We transform your complex technical challenges into efficient,
              modern solutions.
            </p>
          </div>
          <div className="mt-8 flex animate-fade-up-600 flex-col items-center justify-center gap-3 opacity-0 sm:mt-6 sm:flex-row sm:gap-4 md:mt-8 lg:mt-10">
            <Link
              to="/contact"
              className="group relative w-full overflow-hidden rounded-md bg-blue-600 px-6 py-4 text-sm font-medium text-white sm:w-72 sm:text-base md:px-8 md:py-2 lg:text-lg"
            >
              <span className="relative z-10 flex items-center justify-center">
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-blue-700 transition-all duration-300 ease-out group-hover:translate-x-0"></div>
            </Link>
            <Link
              to="/about"
              className="group relative w-full overflow-hidden rounded-md border border-gray-300 bg-white px-6 py-4 text-sm font-medium text-gray-700 sm:w-72 sm:text-base md:px-8 md:py-2 lg:text-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <span className="relative z-10 flex items-center justify-center">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gray-50 transition-all duration-300 ease-out group-hover:translate-x-0 dark:bg-gray-700"></div>
            </Link>
          </div>
        </div>
        <div className="mt-8 lg:mt-10">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-4">
            {services.map((service, index) => (
              <FrostedCard
                key={index}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                className="group relative animate-fade-up overflow-hidden opacity-0 hover:border-blue-200 hover:bg-blue-50/50 sm:p-5 md:p-6 dark:hover:border-blue-900 dark:hover:bg-blue-900/20"
              >
                <div className="absolute -right-10 -top-10 h-24 w-24 transform rounded-full bg-blue-50 transition-transform duration-300 group-hover:scale-125 dark:bg-blue-900/20"></div>
                <div className="relative flex h-full flex-col items-start">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-left text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>
              </FrostedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
