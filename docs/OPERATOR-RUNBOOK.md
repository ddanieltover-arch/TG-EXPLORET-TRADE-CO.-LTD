# DOCS-001 — Admin operator runbook

How to run day-to-day content and sales workflows for TG Export Trade.

## Login

1. Open `/admin/login`  
2. Use the seeded or vaulted admin account (change password after first shared use)  
3. You land on `/admin` (dashboard)

**Roles**

| Role | Can do |
|---|---|
| SUPER_ADMIN / ADMIN | Everything |
| EDITOR | Products, certifications, marketing pages |
| SALES_MANAGER | Quotes, inquiries, dealer/distributor status |
| READ_ONLY | View only (mutations blocked) |

## Quotes

1. `/admin/quotes` — list  
2. Click reference code → detail  
3. Update status → Save  
4. Statuses: NEW → IN_PROGRESS → AWAITING_INFO / QUOTED → CLOSED (or SPAM / ARCHIVED)

## Inquiries

1. `/admin/inquiries`  
2. Change status → Save  
3. New count on dashboard drops when status leaves NEW

## Products

1. `/admin/products` — create or Open  
2. Edit core fields (name, slug, status, description)  
3. Add/remove specifications and packaging  
4. Images: attach URL always; Supabase Storage upload if `NEXT_PUBLIC_SUPABASE_URL` + service role set  
5. Set **Published** only when content is client-approved  
6. Public path: `/products/{cooking-oil|rice}/{slug}`

## Certifications

1. `/admin/certifications`  
2. Keep unconfirmed items as **DRAFT**  
3. Publish only after business confirmation  
4. Public: `/certifications` shows published only

## Marketing pages

1. `/admin/pages`  
2. Edit About / Export markets body  
3. Save with **PUBLISHED** to update `/about` and `/export-markets`

## Partners

1. `/admin/dealers` or `/admin/distributors`  
2. Review application → update status → Save

## Email

- With `RESEND_API_KEY`: buyer confirmation + sales alert on quote/inquiry  
- Without key: data still saves; check server logs for `[email] skipped`

## Do not

- Invent certificates, prices, MOQ, or capacity  
- Publish placeholder images as final assets  
- Share seed passwords outside a vault  

## Related docs

- QA interactive: `QA-003-INTERACTIVE-SIGNOFF.md`  
- Staging: `DEPLOY-002-STAGING-RUNBOOK.md`  
- Go-live: `GO-LIVE-CHECKLIST.md`
