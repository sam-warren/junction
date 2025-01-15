import GitHubIcon from "@/assets/github.svg";
import LinkedInIcon from "@/assets/linkedin.svg";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/sam-warren/junction",
    icon: GitHubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/samwarrendev/",
    icon: LinkedInIcon,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  opacity-50 hover:opacity-100
                  transition-opacity duration-300
                  flex items-center
                "
                aria-label={link.name}
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  className="w-6 h-6 
                    filter 
                    dark:invert 
                    dark:opacity-75
                  "
                />
              </a>
            ))}
          </div>

          {/* Company Info - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-sm text-center text-gray-500 dark:text-gray-400">
            JunctionTech — {currentYear}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
