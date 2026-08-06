# QA-001 — Manual regression checklist (Sprint 13)

> Run after `npm run build` and with `npm run dev` (or staging).  
> Seed admin: `sales@tgeptrade.com` / `ChangeMeAdmin123!`

## Public

- [ ] Home loads brand (dark green / gold), header + footer
- [ ] `/products/cooking-oil` and `/products/rice` list published products
- [ ] Product leaf shows gallery, specs, packaging, RFQ CTA
- [ ] `/request-quote` submits → success + row in `/admin/quotes`
- [ ] `/contact` submits → row in `/admin/inquiries`
- [ ] `/dealer-registration` and `/distributor-registration` submit
- [ ] `/about` and `/export-markets` show seeded/DB body
- [ ] `/certifications` shows only **published** certs (draft placeholder hidden)

## Admin (SUPER_ADMIN / ADMIN)

- [ ] Login → `/admin` dashboard counts
- [ ] Quote list → detail → status save
- [ ] Inquiry status save updates row + new-count widget
- [ ] Products: edit name/status, add/remove spec & packaging, attach image URL
- [ ] Certifications: create draft, publish, appears on public page
- [ ] Pages: edit About body → public `/about` updates
- [ ] Dealer/distributor status save

## Auth / roles

- [ ] Unauthenticated `/admin/products` redirects to login
- [ ] Mutations: CMS → ADMIN/SUPER_ADMIN/EDITOR; sales → ADMIN/SUPER_ADMIN/SALES_MANAGER; READ_ONLY blocked

## Build / docs

- [ ] `npm run build` passes
- [ ] Postgres cutover checklist still accurate (`docs/POSTGRES-CUTOVER-CHECKLIST.md`)
- [ ] Security headers present under `next start` (`docs/SECURITY.md`)
- [ ] Vercel staging checklist reviewed (`docs/VERCEL-STAGING-CHECKLIST.md`)

## Sign-off

| Role | Date | Pass |
|---|---|---|
| QA | 2026-07-22 | Partial — see `project/QA-002-DEFECT-LOG.md` |
| TPM | 2026-07-22 | Accept for Sprint 14 |
