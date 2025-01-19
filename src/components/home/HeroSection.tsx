import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="tracking-tigh px-2 text-3xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="animate-fade-up block text-gray-700 opacity-0 dark:text-gray-200">
              Where Modern Systems
            </span>
            <span className="animate-fade-up-200 block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-6xl leading-tight text-transparent opacity-0 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
              Converge
            </span>
          </h1>
          <div className="mt-6 space-y-2 px-4 sm:px-0">
            <p className="animate-fade-up-400 text-lg leading-relaxed text-gray-500 opacity-0 sm:text-xl md:text-2xl dark:text-gray-400">
              Connecting legacy infrastructure with cutting-edge technology.
            </p>
            <p className="animate-fade-up-400 text-lg leading-relaxed text-gray-500 opacity-0 sm:text-xl md:text-2xl dark:text-gray-400">
              We build the bridges that power your digital transformation.
            </p>
          </div>
          <div className="animate-fade-up-600 mt-8 flex flex-col items-center justify-center gap-4 opacity-0 sm:mt-10 sm:flex-row">
            <Link
              to="/contact"
              className="w-full rounded-md bg-blue-600 px-8 py-3 text-center text-base font-medium text-white transition-colors hover:bg-blue-700 sm:w-80 md:px-10 md:py-4 md:text-lg"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
