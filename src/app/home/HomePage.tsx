// src/app/home/HomePage.tsx
export default function HomePage() {
  return (
    <>
      {/* Sections added in Phases 5-11 */}
      <section id='hero' className='grid min-h-[80vh] place-items-center'>
        <h1 className='text-[length:var(--text-display-xl)] font-semibold tracking-tight'>
          (Hero — Phase 5)
        </h1>
      </section>
      <section id='capabilities' className='min-h-[60vh]' />
      <section id='how' className='min-h-[60vh]' />
      <section id='work' className='min-h-[60vh]' />
      <section id='stack' className='min-h-[40vh]' />
      <section id='about' className='min-h-[60vh]' />
      <section id='cta' className='min-h-[40vh]' />
    </>
  );
}
