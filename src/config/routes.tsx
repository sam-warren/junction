import AboutSection from "@/components/about/AboutSection";
import ContactForm from "@/components/contact/ContactForm";
import HeroSection from "@/components/home/HeroSection";
import PackagesSection from "@/components/packages/PackagesSection";
import BlogList from "@/components/blog/BlogList";
import BlogPost from "@/components/blog/BlogPost";
import { Home, Info, LucideIcon, Mail, Package, BookOpen } from "lucide-react";
import { ReactElement } from "react";

interface RouteConfig {
  path: string;
  label: string;
  icon: LucideIcon;
  element: ReactElement;
  showInNav?: boolean;
}

export const ROUTES: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    icon: Home,
    element: <HeroSection />,
    showInNav: true,
  },
  {
    path: "/about",
    label: "About",
    icon: Info,
    element: <AboutSection />,
    showInNav: true,
  },
  {
    path: "/packages",
    label: "Packages",
    icon: Package,
    element: <PackagesSection />,
    showInNav: true,
  },
  {
    path: "/blog",
    label: "Blog",
    icon: BookOpen,
    element: <BlogList />,
    showInNav: true,
  },
  {
    path: "/blog/:slug",
    label: "Blog",
    icon: BookOpen,
    element: <BlogPost />,
    showInNav: false,
  },
  {
    path: "/contact",
    label: "Contact",
    icon: Mail,
    element: <ContactForm />,
    showInNav: true,
  },
];
