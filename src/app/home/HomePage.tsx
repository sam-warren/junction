// src/app/home/HomePage.tsx
import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";
import { Convergence } from "./sections/Convergence";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Convergence />
      <section id="work" className="min-h-[60vh]" />
      <section id="stack" className="min-h-[40vh]" />
      <section id="about" className="min-h-[60vh]" />
      <section id="cta" className="min-h-[40vh]" />
    </>
  );
}
