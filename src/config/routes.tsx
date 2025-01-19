import AboutSection from "@/components/about/AboutSection";
import ContactForm from "@/components/contact/ContactForm";
import HeroSection from "@/components/home/HeroSection";
import { Home, Info, LucideIcon, Mail } from "lucide-react";
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
    path: "/contact",
    label: "Contact",
    icon: Mail,
    element: <ContactForm />,
  },
];
