import GridBackground from "../ui/GridBackground";

const HeroSection = () => {
  return (
    <div className="relative min-h-[100svh] bg-white dark:bg-gray-900 overflow-hidden flex items-center justify-center">
      <GridBackground />
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in-up {
            opacity: 0;
            animation: fadeInUp 0.8s ease-out forwards;
          }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-600 { animation-delay: 0.6s; }
        `}
      </style>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 sm:mt-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl px-2">
            <span className="block fade-in-up">Where Modern Systems</span>
            <span className="block text-blue-600 dark:text-blue-400 fade-in-up delay-200">
              Converge
            </span>
          </h1>
          <div className="mt-6 space-y-2 px-4 sm:px-0">
            <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl md:text-2xl leading-relaxed fade-in-up delay-400">
              Connecting legacy infrastructure with cutting-edge technology.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl md:text-2xl leading-relaxed fade-in-up delay-400">
              We build the bridges that power your digital transformation.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 fade-in-up delay-600 px-4 sm:px-0">
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
