import { SOCIAL_LINKS } from "@/config/constants";
import { ROUTES } from "@/config/routes";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";

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

  return (
    <>
      <header className="fixed top-0 z-55 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-16 lg:h-20">
            <Link
              to="/"
              className="flex items-center space-x-3 transition-opacity"
            >
              <div className="text-gray-900 dark:text-white">
                <Logo />
              </div>
              <span className="whitespace-nowrap text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl dark:text-white">
                JunctionTech
              </span>
            </Link>

            <div className="flex items-center">
              <nav className="hidden items-center md:flex">
                {ROUTES.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={({ isActive }) =>
                      `text-md px-4 py-2 font-medium text-gray-600 hover:text-gray-900 lg:px-6 dark:text-gray-300 dark:hover:text-white ${
                        isActive ? "text-primary-600 dark:text-primary-400" : ""
                      } `
                    }
                  >
                    {route.label}
                  </NavLink>
                ))}
                <div className="ml-4 lg:ml-6">
                  <ThemeToggle />
                </div>
              </nav>
              <div className="flex items-center gap-4 md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative h-6 w-6 p-1.5 text-gray-500 hover:text-gray-700 sm:p-2 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Toggle menu"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Menu
                      size={24}
                      className={`transition-all duration-300 ${
                        isMenuOpen
                          ? "rotate-45 scale-0 opacity-0"
                          : "rotate-0 scale-100 opacity-100"
                      }`}
                    />
                    <X
                      size={24}
                      className={`absolute transition-all duration-300 ${
                        isMenuOpen
                          ? "rotate-0 scale-100 opacity-100"
                          : "-rotate-45 scale-0 opacity-0"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-in Menu */}
      <div
        className={`fixed bottom-0 left-0 right-0 top-[4rem] z-40 flex justify-end transition-all duration-300 ease-in-out sm:top-[4rem] md:hidden lg:top-[5rem] ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`relative h-full w-72 transform overflow-y-auto bg-white/90 backdrop-blur-lg transition-transform duration-300 ease-in-out dark:bg-gray-900/90 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Theme
              </span>
              <ThemeToggle />
            </div>
          </div>

          <nav className="px-2 py-4">
            {ROUTES.map((route) => {
              const Icon = route.icon;
              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white ${
                      isActive
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                        : ""
                    } `
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={20} className="mr-3" />
                  {route.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center space-x-4">
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
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                JunctionTech Inc. — {currentYear}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
