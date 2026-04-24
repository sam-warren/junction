// src/app/home/HomePage.tsx
import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";
import { Convergence } from "./sections/Convergence";
import { Work } from "./sections/Work";
import { StackMarquee } from "./sections/StackMarquee";
import { About } from "./sections/About";
import { CTA } from "./sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Convergence />
      <Work />
      <StackMarquee />
      <About />
      <CTA />
    </>
  );
}
