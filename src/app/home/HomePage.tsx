// src/app/home/HomePage.tsx
import { Hero } from "./sections/Hero";
import { Capabilities } from "./sections/Capabilities";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <section id="how" className="min-h-[60vh]" />
      <section id="work" className="min-h-[60vh]" />
      <section id="stack" className="min-h-[40vh]" />
      <section id="about" className="min-h-[60vh]" />
      <section id="cta" className="min-h-[40vh]" />
    </>
  );
}
