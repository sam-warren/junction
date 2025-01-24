import { SOCIAL_LINKS } from "@/config/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 hidden border-t border-gray-200 bg-white/80 py-3 backdrop-blur-md md:block dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center opacity-50 transition-opacity duration-300 hover:opacity-100"
                aria-label={link.name}
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  className="h-6 w-6 filter dark:opacity-75 dark:invert"
                />
              </a>
            ))}
          </div>
          {/* Company Info - Centered */}
          <div className="absolute left-1/2 -translate-x-1/2 transform text-center text-sm text-gray-500 dark:text-gray-400">
            JunctionTech Inc. — {currentYear}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
