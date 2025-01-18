import { useState, useEffect } from "react";
import { Menu, X, Home, Info, Briefcase, Mail } from "lucide-react";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import { SOCIAL_LINKS } from "@/config/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuItems = [
    { href: "#", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: Info },
    { href: "#portfolio", label: "Portfolio", icon: Briefcase },
    { href: "#contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      <header className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-16 lg:h-20">
            <div className="flex items-center space-x-3">
              <div className="text-gray-900 dark:text-white">
                <Logo />
              </div>
              <span className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap">
                JunctionTech
              </span>
            </div>
            <div className="flex items-center">
              <nav className="hidden md:flex items-center">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 lg:px-6 py-2 text-sm font-medium"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="ml-4 lg:ml-6">
                  <ThemeToggle />
                </div>
              </nav>
              <div className="md:hidden flex items-center gap-4">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-40 flex justify-end transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Semi-transparent Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`relative w-72 bg-white dark:bg-gray-900 h-full overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="text-gray-900 dark:text-white w-8 h-8">
                <Logo />
              </div>
              <span className="text-gray-900 dark:text-white text-lg font-bold">
                JunctionTech
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Theme
              </span>
              <ThemeToggle />
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-2 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Social Links and Footer */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center space-x-4">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-50 hover:opacity-100 transition-opacity duration-300 text-gray-900 dark:text-white"
                      aria-label={link.name}
                    >
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
              <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                JunctionTech — {currentYear}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
