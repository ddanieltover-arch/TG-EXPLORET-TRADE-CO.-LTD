# QA-003 — Interactive form & admin sign-off

> Human QA after Sprint 14 smoke.  
> Seed: `sales@tgeptrade.com` / `ChangeMeAdmin123!`  
> Prefer `npm run build && npm run start -- -p 3014` (avoid port conflicts).

## Public forms

| # | Step | Pass |
|---|---|---|
| 1 | RFQ: fill required fields, submit → success UI | |
| 2 | Admin → Quotes: new row with reference `TGQ-…` | |
| 3 | Contact form → Inquiries row | |
| 4 | Dealer registration → Dealers list | |
| 5 | Distributor registration → Distributors list | |
| 6 | Honeypot: if filled, submission rejected / no row | |

## Admin CMS

| # | Step | Pass |
|---|---|---|
| 7 | Login → Dashboard counts update after forms | |
| 8 | Quote detail → change status → Save | |
| 9 | Inquiry status → Save | |
| 10 | Product edit: change short description → public leaf updates | |
| 11 | Attach product image by URL | |
| 12 | Pages: edit About body → `/about` shows change | |
| 13 | Certification: create **draft** (not on public) | |
| 14 | Certification: publish → appears on `/certifications` | |
| 15 | Partner app status → Save | |

## Roles (optional if second user seeded)

| # | Step | Pass |
|---|---|---|
| 16 | READ_ONLY cannot save product / quote status | |
| 17 | EDITOR can save product; cannot save quote (if tested) | |
| 18 | SALES_MANAGER can save quote; cannot save product (if tested) | |

## Sign-off

| Role | Name | Date | Verdict |
|---|---|---|---|
| QA | | | Pass / Fail |
| TPM | | | Accept / Rework |

**Defects:** append to `project/QA-002-DEFECT-LOG.md` or new `QA-003` log.
