# Junction Technologies LTD.

Marketing site for Junction Technologies LTD. — an independent software consultancy bridging legacy systems with modern technology.

## Stack

- React 19 + TypeScript 5.7 + Vite 7
- Tailwind CSS 4 (CSS-first config in `src/globals.css`)
- Magic UI components (vendored under `src/components/magicui/`)
- `motion` v12 for animations
- React Router DOM v7
- Vercel for hosting + Resend for the contact form

## Architecture

```
src/
  app/                    page-level orchestration
    home/HomePage.tsx     composes 7 homepage sections
    home/sections/        Hero, Capabilities, Convergence, Work,
                          StackMarquee, About, CTA
    contact/              ContactPage + ContactForm
  components/
    layout/               Header (scroll-aware), Footer (in-flow), Layout
    magicui/              vendored Magic UI primitives
    ui/                   our reusable primitives (BrandMark, Button, ...)
  content/                typed copy modules — edit these to change content
  hooks/                  small one-purpose hooks
  lib/                    utils.ts (cn helper), motion.ts (motion presets)
  config/                 routes
```

## Development

```bash
bun install
bun run dev       # dev server at http://localhost:5173
bun run build     # production build
bun run typecheck
bun run lint
bun run test      # smoke tests
```

## Editing content

All copy is in `src/content/`:

- `site.ts` — brand, contact info, hero/CTA/about copy
- `capabilities.ts` — the "What we do" cards
- `case-studies.ts` — the Work section (add new entries here)
- `tech-stack.ts` — logos shown in the Stack marquee + Convergence diagram

## Deployment

Configured for Vercel. The `vercel.json` SPA rewrites and `/api/contact` Resend handler in `api/contact.mjs` deploy as-is.

Required env vars (set in Vercel dashboard):
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_EMAIL`

## License

MIT — see `LICENSE`.
