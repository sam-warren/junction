import GridBackground from '../ui/GridBackground';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden flex items-center justify-center">
      <GridBackground />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Where Modern Systems</span>
            <span className="block text-blue-600 dark:text-blue-400">Converge</span>
          </h1>
          
          <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg sm:text-xl md:text-2xl leading-relaxed">
            Connecting legacy infrastructure with cutting-edge technology.
            We build the bridges that power your digital transformation.
          </p>
          
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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