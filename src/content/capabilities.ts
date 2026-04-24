// src/content/capabilities.ts
import { Brain, Code2, LineChart, Network, PenTool, type LucideIcon } from "lucide-react";

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
    id: "interface-design",
    title: "Interface Design",
    description:
      "UX research, design systems, and design-to-code pipelines. We build component libraries and polished production interfaces with the underlying systems thinking that makes them actually work.",
    icon: PenTool,
    feature: true,
  },
  {
    id: "full-stack-implementation",
    title: "Full-Stack Implementation",
    description:
      "TypeScript front to back. Frontend, backend, infrastructure, and the glue in between: spec to ship, owned end-to-end.",
    icon: Code2,
  },
  {
    id: "data-visualization",
    title: "Data Visualization",
    description:
      "Dashboards and exploration interfaces for complex datasets. Built so non-technical stakeholders can actually use them.",
    icon: LineChart,
  },
  {
    id: "system-integration",
    title: "System Integration",
    description:
      "APIs, message queues, identity bridges, custom protocols. We connect what you have to what you're building.",
    icon: Network,
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description:
      "Embed LLMs into existing workflows. Agents, RAG, and structured extraction integrated with your data and tools.",
    icon: Brain,
  },
];
