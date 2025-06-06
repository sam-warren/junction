import AboutSection from "@/components/about/AboutSection";
import ContactForm from "@/components/contact/ContactForm";
import HeroSection from "@/components/home/HeroSection";
import PackagesSection from "@/components/packages/PackagesSection";
import { Home, Info, LucideIcon, Mail, Package } from "lucide-react";
import { ReactElement } from "react";

interface RouteConfig {
  path: string;
  label: string;
  icon: LucideIcon;
  element: ReactElement;
}

export const ROUTES: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    icon: Home,
    element: <HeroSection />,
  },
  {
    path: "/about",
    label: "About",
    icon: Info,
    element: <AboutSection />,
  },
  {
    path: "/packages",
    label: "Packages",
    icon: Package,
    element: <PackagesSection />,
  },
  {
    path: "/contact",
    label: "Contact",
    icon: Mail,
    element: <ContactForm />,
  },
];
