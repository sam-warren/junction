// src/config/routes.tsx
import { lazy, type LazyExoticComponent, type ComponentType } from "react";
import { Home, Mail, type LucideIcon } from "lucide-react";

const HomePage = lazy(() => import("@/app/home/HomePage"));
const ContactPage = lazy(() => import("@/app/contact/ContactPage"));

export interface RouteConfig {
  path: string;
  label: string;
  icon: LucideIcon;
  component: LazyExoticComponent<ComponentType>;
  showInNav: boolean;
}

export const ROUTES: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    icon: Home,
    component: HomePage,
    showInNav: false,
  },
  {
    path: "/contact",
    label: "Contact",
    icon: Mail,
    component: ContactPage,
    showInNav: true,
  },
];

/** Section anchors used by the Header for scrollspy + nav. */
export const HOMEPAGE_SECTIONS = [
  { id: "capabilities", label: "Capabilities" },
  { id: "how", label: "How" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
] as const;
