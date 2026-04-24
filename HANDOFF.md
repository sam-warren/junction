# HANDOFF — Junction Technologies Redesign v2

| | |
|---|---|
| **Created** | 2026-04-23 |
| **Purpose** | Carry the redesign across machines without losing context. |
| **Source-of-truth docs** | `DESIGN.md` (the *what + why*) and `docs/superpowers/plans/2026-04-23-junction-redesign-implementation.md` (the *how*). |
| **Linear** | https://linear.app/junction-technologies/project/junction-b0ec29dfcc32 — milestone `Redesign v2`, issues `JUN-173` → `JUN-187`. |

---

## Decisions locked in

| Decision | Resolved value | Where it lives |
|---|---|---|
| Domain | `junctiontech.ca` | `src/content/site.ts` → `BRAND.domain` (Phase 2) |
| Contact email | `sam@junctiontech.ca` *(replaces the old `samwarren4@gmail.com`)* | `src/content/site.ts` → `BRAND.contactEmail` (Phase 2) |
| `GridBackground` floating-logo | **Delete.** No easter-egg variant. The Convergence section's central `BrandMark variant="loop"` provides any continuity-of-motion needed. | Phase 2 demolition |
| Brand accent | `#2642A9` (sampled from `og-image.png`) anchored as `--brand-700` in a 50→950 scale | `DESIGN.md` §4.1 |
| Architecture | Single long-scroll `/` + dedicated `/contact`, dark-first, Geist + Magic UI | `DESIGN.md` §5, §6 |
| Stack bumps | React 19, Tailwind 4, Vite 7, TypeScript 5.7, motion v12 | `DESIGN.md` §9 |

## Decisions still open (low-stakes, can finalize during execution)

| Decision | Default if not changed | Resolution timing |
|---|---|---|
| **Hero headline** | `"Modernize without rewriting."` | Decide during Phase 5 or by editing `COPY.hero.headline` in `src/content/site.ts` later. Three alternates in `DESIGN.md` §6.1.1. |
| **Case study additions** | Keep the 3 BC government ports (Justice DevOps, Road Safety, Health Gateway). Empty-state card renders if `CASE_STUDIES.length < 3`. | Add new entries to `src/content/case-studies.ts` whenever — typed schema, no component changes needed. |

Neither blocks execution. Both can be decided in flight.

---

## Pre-flight on the OLD machine

Push the redesign branch so the new machine can pull it:

```bash
git push -u origin site-changes
```

This branch holds three commits:
- `b6505bb docs: add DESIGN.md for Junction Technologies LTD. website redesign`
- `5c63c20 docs(plan): implementation plan for Junction redesign`
- (the next commit will include this HANDOFF.md + the resolved-decision edits)

After pushing, you can `git status` to confirm clean.

---

## Setup on the NEW machine

```bash
# 1. Clone (or update existing checkout)
git clone https://github.com/sam-warren/junction.git
cd junction
git checkout site-changes
git pull

# 2. Confirm the source-of-truth docs are present
ls DESIGN.md HANDOFF.md docs/superpowers/plans/

# 3. Bun (if not installed)
curl -fsSL https://bun.sh/install | bash

# 4. Install deps (this installs the OLD package.json — Phase 0 rewrites it)
bun install

# 5. Recreate .env (gitignored, must come from your password manager / Vercel)
cat > .env <<'EOF'
RESEND_API_KEY=…
RESEND_FROM_EMAIL=…
CONTACT_EMAIL=sam@junctiontech.ca
EOF

# 6. Smoke-test the existing (pre-redesign) site
bun run dev
# Open http://localhost:5173 — should render the current JunctionTech site.
# Once verified, stop the dev server. Phase 0 will branch from main and start the rewrite.
```

### Claude Code + plugins on the new machine

| Component | Action |
|---|---|
| Claude Code CLI | Install via your normal mechanism. |
| Anthropic auth | Sign in. |
| Linear MCP | Re-authenticate via the OAuth flow on first use. Tokens are per-machine; nothing transfers. |
| Superpowers plugin | Required — provides `subagent-driven-development`, `executing-plans`, `make-interfaces-feel-better`, `frontend-design`. |
| Vercel MCP plugin | Optional but useful for Phase 14 deploy preview verification. |

---

## Kickoff prompt for the new Claude session

Open Claude Code in the repo on the new machine and paste this verbatim:

> I'm continuing the Junction Technologies LTD. website redesign on this machine. The full spec and implementation plan are committed to this repo on the `site-changes` branch:
>
> - **Spec (what + why):** `DESIGN.md` (project root)
> - **Plan (how):** `docs/superpowers/plans/2026-04-23-junction-redesign-implementation.md`
> - **Handoff context:** `HANDOFF.md` (project root) — read this first
>
> Linear board: https://linear.app/junction-technologies/project/junction-b0ec29dfcc32 — milestone `Redesign v2`, issues `JUN-173` → `JUN-187` (one per phase, all Todo).
>
> Resolved decisions (already baked into spec/plan; do not re-prompt me):
> - Domain: `junctiontech.ca`
> - Contact email: `sam@junctiontech.ca`
> - `GridBackground` floating-logo: delete (no easter egg)
>
> Soft-deferred decisions (defaults are fine; flag if you want my input):
> - Hero headline: `"Modernize without rewriting."` is the default
> - Case studies: keep the 3 BC government ports for now
>
> Please execute the plan task-by-task using the `superpowers:subagent-driven-development` skill. Read `HANDOFF.md` and `DESIGN.md` first, then the plan, then start Phase 0 (creates the `redesign/v2` branch off `main`).
>
> As each phase progresses:
> - Mark its Linear issue (`JUN-173` then `JUN-174` then…) as `In Progress` when you start it
> - Mark it `Done` when the phase commit lands
> - The plan has explicit commit messages — use them verbatim
>
> Cadence: pause for my review at three checkpoints — after Phase 1 (visual system), after Phase 7 (the signature Convergence diagram), and after Phase 11 (full homepage assembled). Show me a dev-server walkthrough or screenshots at each checkpoint before continuing.
>
> Open one PR `redesign/v2` → `main` at the end of Phase 14 for review/merge.

Adjust the cadence checkpoints to your preference.

---

## What does NOT need to transfer

- Conversation history from the brainstorming session — every load-bearing decision is in `DESIGN.md` §3 (Decisions log) and `HANDOFF.md` (this file).
- `node_modules` / `bun.lock` — regenerated by `bun install`.
- The agent task-list state from any prior Claude session.
- The `.remember/logs/` directory (gitignored hook noise).
- The `website-updates` branch (behind by 5; safe to ignore for the redesign).

---

## Quick reference: the 14 implementation phases

| Phase | Linear | Hours | Focus |
|---|---|---|---|
| 0 | [JUN-173](https://linear.app/junction-technologies/issue/JUN-173) | 1-2 | Branch + dependency overhaul |
| 1 | [JUN-174](https://linear.app/junction-technologies/issue/JUN-174) | 3-4 | Visual system (tokens, Magic UI) |
| 2 | [JUN-175](https://linear.app/junction-technologies/issue/JUN-175) | 1-2 | Demolition + branding sweep |
| 3 | [JUN-176](https://linear.app/junction-technologies/issue/JUN-176) | 2-3 | Layout reset (in-flow + scroll-aware) |
| 4 | [JUN-177](https://linear.app/junction-technologies/issue/JUN-177) | 1 | Content modules |
| 5 | [JUN-178](https://linear.app/junction-technologies/issue/JUN-178) | 1-2 | Hero |
| 6 | [JUN-179](https://linear.app/junction-technologies/issue/JUN-179) | 1-2 | Capabilities |
| 7 | [JUN-180](https://linear.app/junction-technologies/issue/JUN-180) | 3-4 | **Convergence diagram (signature)** |
| 8 | [JUN-181](https://linear.app/junction-technologies/issue/JUN-181) | 2 | Work |
| 9 | [JUN-182](https://linear.app/junction-technologies/issue/JUN-182) | 1 | Stack marquee |
| 10 | [JUN-183](https://linear.app/junction-technologies/issue/JUN-183) | 1 | About |
| 11 | [JUN-184](https://linear.app/junction-technologies/issue/JUN-184) | 1 | CTA + final assembly |
| 12 | [JUN-185](https://linear.app/junction-technologies/issue/JUN-185) | 1-2 | `/contact` page |
| 13 | [JUN-186](https://linear.app/junction-technologies/issue/JUN-186) | 2-3 | Polish pass (make-interfaces-feel-better) |
| 14 | [JUN-187](https://linear.app/junction-technologies/issue/JUN-187) | 2 | Tests + docs + deploy preview |

**Total:** 22-30 focused hours.

---

*This file is safe to delete after the redesign ships.*
