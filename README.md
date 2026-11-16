# Junction Technologies LTD.

Marketing site for Junction Technologies, live at junction-technologies.com.

## Stack

- Next.js 16 (App Router, static home page) + React 19 + TypeScript
- Tailwind CSS 4 (tokens in `src/app/globals.css`)
- Geist via the `geist` package
- Vercel hosting, Resend for the contact form (`src/app/api/contact/route.ts`)

## Development

```bash
bun install
bun run dev        # http://127.0.0.1:3000
bun run build
bun run typecheck
bun run lint
bun run test
```

## Editing content

All copy lives in `src/content/`: `site.ts` (hero, services, about, contact) and `case-studies.ts` (the Work list).

## Deployment

Required env vars in Vercel: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL`.

## License

MIT, see `LICENSE`.
