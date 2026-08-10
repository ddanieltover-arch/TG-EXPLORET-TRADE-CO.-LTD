# Pulse Engineering Memory System (PEMS) — Project Record

**PEMS Version:** 1.0  
**Last Updated:** 2026-08-10  
**Updated By:** Senior Full Stack Engineer (client office address across site + email)

---

## Context Snapshot

| Field | Value |
|---|---|
| Project | TG Export Trade Company Limited — enterprise export website |
| Current version | 0.1.0 (`tg-exploret-web` / package `tg-export-trade-web`) |
| Current sprint / phase | Launch-blocked; motion/UX polish shipped 2026-08-07 |
| Architecture (one line) | Next.js App Router + Prisma CMS + Auth.js admin + Resend + Supabase Storage |
| Tech stack (one line) | Next.js, TypeScript, Tailwind, Prisma (SQLite local / Postgres staging), Auth.js, Resend, Supabase |
| Design system | TG tokens in `globals.css` (navy + gold) + motion tokens / interactive primitives |
| Primary risks | Domain/email cutover to tgeptrade.com; staging credentials; content photos |
| Open decisions | Real product photos; certifications list; export market destinations; rice SKU keep/drop |
| Recent changes | Motion UX enhancement: CSS motion tokens, shared CTA/card classes, ScrollReveal across marketing pages, L3 atmospheres on Home/About/QC/Manufacturing |
| Next priorities | Nav IA cleanup (Company dropdown) recommended — header is dense; staging deploy; client fact-gate; human UI QA |

---

## 1. Project Profile

| Field | Value |
|---|---|
| Name | TG Export Trade Company Limited |
| Description | B2B export website for edible cooking oils and rice with RFQ, partner applications, and admin CMS |
| Goals | Trustworthy commercial site; clear product specs; quote/inquiry capture; admin operations |
| Target users | Importers, distributors, food manufacturers; internal sales/admin |
| Industry / domain | Agri-food commodity export |
| Key features | Product catalogue, RFQ, contact, dealer/distributor registration, admin CMS |
| Phase | Build → Launch (blocked on deploy credentials / QA) |
| Ownership | Client: TG Export Trade Company Limited; delivery: Pulse Software Studio |
| Success metrics | Staging green; forms → inbox; published products accurate |

**Canonical identity**

- Legal name: TG Export Trade Company Limited  
- Website: https://www.tgeptrade.com  
- Sales email: sales@tgeptrade.com  
- Office address: Chomphu, Mueang Lampang District, Lampang 52100, Thailand  
- Constants: `tg-exploret-web/lib/brand.ts`

---

## 2. Technology Profile

| Layer | Choice | Notes |
|---|---|---|
| Language(s) | TypeScript | |
| Web framework | Next.js (App Router) | |
| Backend | Server Actions + Prisma | |
| Database | SQLite local / Supabase Postgres staging-prod | Frozen architecture |
| Auth | Auth.js | Admin only |
| Styling | Tailwind + CSS variables | `--tg-*` tokens |
| Forms | React Hook Form patterns + Zod | Server actions |
| Email | Resend | Optional locally |
| Media | Supabase Storage | ACR-001 |
| Hosting | Vercel (planned) | |

---

## 3. Architecture Profile

| Field | Value |
|---|---|
| Architecture style | Feature-based Next.js modular monolith |
| Folder structure | `app/`, `components/`, `features/`, `services/`, `actions/`, `lib/`, `prisma/` |
| Routing | App Router; products under `/products/{cooking-oil\|rice}/[slug]` |
| Auth model | Credentials admin via Auth.js |
| Key ADRs | ARCHITECTURE-FREEZE.md; ACR-001 Supabase Storage |

---

## 4. Design Profile

| Field | Value |
|---|---|
| Brand / product name | TG Export Trade Company Limited |
| Color tokens | Primary navy / gold secondary (existing TG system) |
| Typography | Source Serif 4 (display) + Manrope (body) |
| Motion | CSS-first; `--tg-ease-*` / `--tg-duration-*`; `ScrollReveal`; `prefers-reduced-motion` in `globals.css` |

---

## 5. Engineering Standards

Follow Pulse Engineering Framework unless noted. Package folder remains `tg-exploret-web` for path stability; npm package name is `tg-export-trade-web`.

---

## 6. Project Decisions

| Date | Decision | Reasoning | Alternatives | Impact |
|---|---|---|---|---|
| 2026-08-05 | Rebrand to TG Export Trade Company Limited; domain tgeptrade.com; email sales@tgeptrade.com | Client identity update | Keep Exploret naming | All public copy, SEO, env defaults |
| 2026-08-05 | Replace Sugar category with Edible Cooking Oil (9 SKUs); keep Rice as reference | Client product scope | Keep sugar | Routes `/products/cooking-oil/*`; seed cleanup removes sugar |
| 2026-08-10 | Publish client office address (Lampang) in brand constants, footer, contact, legal, email footers, Organization JSON-LD | Client-confirmed address; previously omitted to avoid inventing facts | Keep country-only | Trust/legal completeness; Maps link on contact/footer |

---

## 7. Known Constraints

- Do not invent certifications as published  
- Spot prices not published on site  
- Staging/prod blocked on remaining credentials historically  

---

## 8. Active Work

| Item | Status |
|---|---|
| Identity + product catalogue rebrand | Done |
| Reference site content harvest → original Batch 1 | Done — see `deliverables/content-harvest/` |
| About page redesign from UFI / Mahanakorn / Global Win / FREEM About refs | Done — rice + refined cooking oil only; no sugar/fertilizer/etc. |
| Contact page redesign from FREEM / Global Win / Mahanakorn / UFI Contact refs | Done — email + RFQ + client-confirmed Lampang office address; rice + oil focus |
| Office address published (footer, contact, legal, email, JSON-LD) | Done — 2026-08-10 client-confirmed |
| Privacy policy redesign from Global Win / FREEM / Mahanakorn Privacy refs | Done — B2B enquiry model (not retail checkout); counsel review still required |
| Sustainability page from FREEM / Mahanakorn Sustainability refs | Done — rice + refined oil only; no unverified cert/SDG badges; nav + sitemap wired |
| Quality Control page from FREEM / Mahanakorn / UFI Quality refs | Done — rice + oil checks only (no sugar/fertilizer); cert claims deferred to `/certifications` |
| Ordering Procedure page from FREEM / Mahanakorn / UFI Ordering refs | Done — 6-step rice + oil export path; TT/LC as typical not absolute; nav + sitemap wired |
| Manufacturing Process page from UFI Manufacturing ref | Done — dual pathways (rice milling + oil RBD); no sugar process copy |
| Motion & UX enhancement (skill pass) | Done — Level 2 marketing + shared chrome; Level 3 Home/About/QC/Manufacturing; no new animation libs |
| Legal drafts + sitemap/robots | Done — `/privacy` `/terms` `/cookies`; counsel review still required |
| TAT/WP skill-slice template pass | Done — gap map in `docs/template-skill-slice-gap-map.md` |
| Modern brand template skill | Done — `tg-export-trade-modern-brand-templates/` |
| Client fact gate (certs, MOQ, markets, photos) | Open — `03-client-fact-gate.md` |
| Staging deploy | Blocked / pending |
| Human UI QA | Pending |

---

## 9. Reusable Assets

- `lib/brand.ts` — company identity + category slugs + WhatsApp href helper  
- `components/organisms/FloatingActions.tsx` — site-wide WhatsApp + back-to-top  
- `components/sections/*` — homepage section primitives + StickyQuoteCTA + ScrollReveal  
- `app/globals.css` — design + motion tokens; `.tg-btn-*`, `.tg-card-interactive`, `.tg-surface-premium*`  
- Product hub/leaf pattern under `app/products/*`  
- Seed catalogue for oils + Thai Jasmine Hom Mali rice  

---

## 10. Risk Register

| Risk | Severity | Mitigation |
|---|---|---|
| Old sugar URLs / bookmarks | Medium | Remove sugar routes; reseed; optional redirects later |
| Email domain not verified in Resend | Medium | Verify tgeptrade.com in Resend before go-live |
| Placeholder oil/rice images | Low | Replace with client photos via admin CMS |

---

## 11. Improvement Backlog

- Expand rice SKUs if client supplies full reference catalogue beyond Hom Mali  
- 301 redirects from `/products/sugar/*` if production ever indexed old paths  
- Rename codebase folder to `tg-export-trade-web` when convenient  

---

## 12. Collaboration Notes

- Content harvest (2026-08-05): structure from 5 peers; zero competitor wording in seed/UI — see `deliverables/content-harvest/`
- Rice catalogue seeded broadly from reference *SKU names*; client must approve keep/drop (FG-12)
- Edible cooking oils: 9 SKUs (high oleic sunflower through RBDW sunflower) with Application/Storage specs
- Certifications remain unpublished until client confirms documents 
