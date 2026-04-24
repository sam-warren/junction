// src/app/home/HomePage.tsx
import { Hero } from "./sections/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Sections below added in Phases 6-11 */}
      <section id="capabilities" className="min-h-[60vh]" />
      <section id="how" className="min-h-[60vh]" />
      <section id="work" className="min-h-[60vh]" />
      <section id="stack" className="min-h-[40vh]" />
      <section id="about" className="min-h-[60vh]" />
      <section id="cta" className="min-h-[40vh]" />
    </>
  );
}
