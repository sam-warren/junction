import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
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
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 lg:px-6 py-2 text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 lg:px-6 py-2 text-sm font-medium"
              >
                About
              </a>
              <a
                href="#portfolio"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 lg:px-6 py-2 text-sm font-medium"
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 lg:px-6 py-2 text-sm font-medium"
              >
                Contact
              </a>
              <div className="ml-4 lg:ml-6">
                <ThemeToggle />
              </div>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-4 p-1.5 sm:p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Home
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                About
              </a>
              <a
                href="#portfolio"
                className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;