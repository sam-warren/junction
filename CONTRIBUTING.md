# Contributing to junction

This site uses typed TypeScript modules for content. To update copy, edit
the relevant file under `src/content/` — no component code changes needed.

## Common edits

| Want to change... | Edit... |
|---|---|
| Hero headline / sub copy | `src/content/site.ts` (`COPY.hero`) |
| CTA copy | `src/content/site.ts` (`COPY.cta`) |
| About company / founder bio / facts | `src/content/site.ts` (`COPY.about`) |
| Capability cards (titles, descriptions) | `src/content/capabilities.ts` |
| Add a new case study | append to `CASE_STUDIES` in `src/content/case-studies.ts` |
| Add a new tech logo | append to `TECH_STACK` in `src/content/tech-stack.ts` |
| Brand name / contact email | `src/content/site.ts` (`BRAND`) |
| Social links | `src/content/site.ts` (`SOCIAL_LINKS`) |
| OG / SEO meta | `index.html` |
| Page title | `index.html` `<title>` |

After editing, run `bun run typecheck` to confirm no type errors, then `bun run dev` to verify visually.

## Adding a new homepage section

1. Create `src/app/home/sections/<Name>.tsx`
2. Import and render in `src/app/home/HomePage.tsx` in the desired position
3. If anchored in nav, add to `HOMEPAGE_SECTIONS` in `src/config/routes.tsx`

## Running the project

```bash
bun install       # once
bun run dev       # dev server at http://localhost:5173
bun run build     # production build
bun run typecheck # project-wide TS check (tsc -b)
bun run lint      # eslint
bun run test      # vitest smoke tests
```

## Style guidelines

- Use existing color tokens from `src/globals.css` (`--text-primary`, `--color-brand-700`, etc.) — don't hardcode hex values
- Use `BlurFade` from Magic UI for entrance animations
- Buttons should use the `Button` component from `src/components/ui/button.tsx`
- Always wrap interactive elements with at least `min-h-10 min-w-10` for hit area
- See `DESIGN.md` (project root) for the full design spec
