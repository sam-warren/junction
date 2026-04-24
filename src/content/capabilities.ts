// src/content/capabilities.ts
import { Brain, Cloud, Code2, Network, RefreshCw, type LucideIcon } from "lucide-react";

export interface CapabilityCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** True for the 2-col-spanning feature card on desktop. */
  feature?: boolean;
}

export const CAPABILITIES: CapabilityCard[] = [
  {
    id: "system-integration",
    title: "System Integration",
    description:
      "Connect legacy systems to modern stacks without rebuilding from scratch. Junction designs the integration layer that lets your existing tools talk to new ones — REST, GraphQL, message queues, identity bridges, custom protocols.",
    icon: Network,
    feature: true,
  },
  {
    id: "custom-software",
    title: "Custom Software",
    description:
      "Bespoke web and internal tools, from spec to ship. End-to-end ownership of design, implementation, and delivery.",
    icon: Code2,
  },
  {
    id: "modernization",
    title: "Modernization",
    description:
      "Refactor and migrate aging codebases incrementally. Modernize the parts that matter without rewriting the parts that don't.",
    icon: RefreshCw,
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description:
      "Infrastructure, CI/CD, observability. We deploy on AWS, Azure, GCP, Vercel, and on-prem OpenShift.",
    icon: Cloud,
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description:
      "Embed LLMs into existing workflows. We build production AI features — agents, RAG, structured extraction — that integrate with your data and tools.",
    icon: Brain,
  },
];
