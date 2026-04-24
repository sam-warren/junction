// src/config/routes.tsx
import { lazy, type ComponentType } from "react";
import { Home, Mail, type LucideIcon } from "lucide-react";
import HomePage from "@/app/home/HomePage";

// HomePage is eager-imported because it's the primary route. Lazy-loading it
// would force a Suspense fallback on every first visit and cause an
// about-to-footer layout shift when the real content replaces the fallback.
// ContactPage is secondary; lazy-loading it saves the ContactPage chunk
// from being in the initial bundle without hurting the `/` experience.
const ContactPage = lazy(() => import("@/app/contact/ContactPage"));

export interface RouteConfig {
  path: string;
  label: string;
  icon: LucideIcon;
  component: ComponentType;
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

export const HOMEPAGE_SECTIONS = [
  { id: "capabilities", label: "Capabilities" },
  { id: "how", label: "How" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
] as const;
