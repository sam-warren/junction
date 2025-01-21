import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="tracking-tigh px-2 text-3xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="block animate-fade-up text-gray-700 opacity-0 dark:text-gray-200">
              Where Modern Systems
            </span>
            <span className="inline-block animate-fade-up-200 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-6xl leading-normal text-transparent opacity-0 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
              Converge
            </span>
          </h1>
          <div className="mt-6 space-y-2 px-4 sm:px-0">
            <p className="animate-fade-up-400 text-lg leading-relaxed text-gray-500 opacity-0 sm:text-xl md:text-2xl dark:text-gray-400">
              Specializing in bridging legacy infrastructure with cutting-edge
              technology.
            </p>
            <p className="animate-fade-up-400 text-lg leading-relaxed text-gray-500 opacity-0 sm:text-xl md:text-2xl dark:text-gray-400">
              We transform your complex technical challenges into efficient,
              modern solutions.
            </p>
          </div>
          <div className="mt-8 flex animate-fade-up-600 flex-col items-center justify-center gap-4 opacity-0 sm:mt-10 sm:flex-row">
            <Link
              to="/contact"
              className="w-full rounded-md bg-blue-600 px-8 py-3 text-center text-base font-medium text-white transition-colors hover:bg-blue-700 sm:w-80 md:px-10 md:py-4 md:text-lg"
            >
              Get In Touch
            </Link>
            <Link
              to="/about"
              className="w-full rounded-md border border-gray-300 bg-white px-8 py-3 text-center text-base font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900 sm:w-80 md:px-10 md:py-4 md:text-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
