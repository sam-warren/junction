// src/app/home/HomePage.tsx
import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";
import { Convergence } from "./sections/Convergence";
import { Work } from "./sections/Work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Convergence />
      <Work />
      <section id="stack" className="min-h-[40vh]" />
      <section id="about" className="min-h-[60vh]" />
      <section id="cta" className="min-h-[40vh]" />
    </>
  );
}
