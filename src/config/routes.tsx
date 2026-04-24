// src/config/routes.tsx
import HomePage from "@/app/home/HomePage";
import ContactPage from "@/app/contact/ContactPage";
import { Home, Mail, type LucideIcon } from "lucide-react";
import type { ReactElement } from "react";

export interface RouteConfig {
  path: string;
  label: string;
  icon: LucideIcon;
  element: ReactElement;
  showInNav: boolean;
}

export const ROUTES: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    icon: Home,
    element: <HomePage />,
    showInNav: false, // navigation uses anchor links to homepage sections
  },
  {
    path: "/contact",
    label: "Contact",
    icon: Mail,
    element: <ContactPage />,
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
