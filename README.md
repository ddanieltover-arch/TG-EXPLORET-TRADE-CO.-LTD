# TG Exploret Web — Developer Guide

## Architecture conformance

Implementation follows frozen Skill Phase 2 (`project/ARCHITECTURE-FREEZE.md`) and Skill Phase 3 design tokens.

**Local exception:** Prisma uses **SQLite** (`file:./dev.db`) so the RFQ vertical slice runs without Supabase credentials. Staging/production must use **PostgreSQL / Supabase** — see [`docs/POSTGRES-STAGING.md`](./docs/POSTGRES-STAGING.md).

## Setup

```bash
cd tg-exploret-web
cp .env.example .env
npm install
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
```

Open:

- http://localhost:3000 — Home
- http://localhost:3000/request-quote — RFQ form
- http://localhost:3000/products/sugar/icumsa-45-white-refined — product leaf + gallery
- http://localhost:3000/dealer-registration · `/distributor-registration`
- http://localhost:3000/admin/login — Auth.js admin login
- http://localhost:3000/admin — dashboard widgets
- http://localhost:3000/admin/products — product CMS (specs / packaging / images)
- http://localhost:3000/admin/certifications · `/admin/pages`
- http://localhost:3000/admin/quotes · `/admin/quotes/[id]` · `/admin/inquiries` · `/admin/dealers` · `/admin/distributors`

Default seed admin (change immediately in shared envs):

- Email: `sales@tgetradecoltd.com`
- Password: `ChangeMeAdmin123!` (or `SEED_ADMIN_PASSWORD`)
- Role: `SUPER_ADMIN` (write mutations require ADMIN or SUPER_ADMIN)

Production site: `https://www.tgetradecoltd.com`

## Staging Postgres

See [`docs/POSTGRES-STAGING.md`](./docs/POSTGRES-STAGING.md) and [`docs/POSTGRES-CUTOVER-CHECKLIST.md`](./docs/POSTGRES-CUTOVER-CHECKLIST.md). Cutover is blocked until Supabase credentials are provided.

Staging env template: [`env.staging.example`](./env.staging.example)  
Credential request: `../project/DEPLOY-003-CREDENTIAL-REQUEST.md`


## Deploy / security

- Vercel staging: [`docs/VERCEL-STAGING-CHECKLIST.md`](./docs/VERCEL-STAGING-CHECKLIST.md)  
- Staging runbook (blocked on credentials): [`docs/DEPLOY-002-STAGING-RUNBOOK.md`](./docs/DEPLOY-002-STAGING-RUNBOOK.md)  
- Go-live: [`docs/GO-LIVE-CHECKLIST.md`](./docs/GO-LIVE-CHECKLIST.md)  
- Security: [`docs/SECURITY.md`](./docs/SECURITY.md) · CSP/HSTS: [`docs/CSP-HSTS-PLAN.md`](./docs/CSP-HSTS-PLAN.md)  

## QA

Manual regression: [`docs/QA-REGRESSION-CHECKLIST.md`](./docs/QA-REGRESSION-CHECKLIST.md).  
Interactive sign-off: [`docs/QA-003-INTERACTIVE-SIGNOFF.md`](./docs/QA-003-INTERACTIVE-SIGNOFF.md).  
Operator runbook: [`docs/OPERATOR-RUNBOOK.md`](./docs/OPERATOR-RUNBOOK.md).  
Latest smoke log: `../project/QA-002-DEFECT-LOG.md`.

Set `NEXT_PUBLIC_SITE_URL` for correct Open Graph absolute URLs.

## Optional integrations

| Env | Effect |
|---|---|
| `RESEND_API_KEY` | Buyer confirmation + sales alert on quote/inquiry |
| `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Admin product image upload to Supabase Storage |
| `SALES_INBOX_EMAIL` | Sales alert recipient (default `sales@tgetradecoltd.com`) |

Without Resend/Supabase Storage keys, forms and local/URL images still work (email logs; seed SVGs for demo).

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Prisma migrate |
| `npm run db:seed` | Seed categories/products/images/admin |

## Quality notes

- No invented certifications or prices in UI  
- Honeypot on RFQ / contact / partner forms  
- Skip link + focus-visible styles present  
