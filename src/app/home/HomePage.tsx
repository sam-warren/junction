// src/app/home/HomePage.tsx
import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";
import { Convergence } from "./sections/Convergence";
import { Work } from "./sections/Work";
import { StackMarquee } from "./sections/StackMarquee";
import { About } from "./sections/About";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Convergence />
      <Work />
      <StackMarquee />
      <About />
      <section id="cta" className="min-h-[40vh]" />
    </>
  );
}
