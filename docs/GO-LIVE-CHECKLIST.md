# LAUNCH-001 — Go-live checklist

> Production launch for `tgeptrade.com`. Complete **after** staging smoke (DEPLOY-002) and interactive QA (QA-003).

## Domain & DNS

- [ ] Confirm registrar access for `tgeptrade.com`  
- [ ] Add Vercel DNS records (A/CNAME as instructed by Vercel)  
- [ ] Wait for TLS certificate issued  
- [ ] `https://tgeptrade.com` loads without cert warnings  
- [ ] WWW redirect policy agreed (www → apex or reverse)  

## Environment (Production)

- [ ] `DATABASE_URL` / `DIRECT_URL` → Supabase **production** project  
- [ ] `AUTH_SECRET` unique (not staging)  
- [ ] `AUTH_URL` + `NEXT_PUBLIC_SITE_URL` = production URL  
- [ ] `RESEND_*` + verified sending domain  
- [ ] `SALES_INBOX_EMAIL=sales@tgeptrade.com`  
- [ ] `CLOUDINARY_*` production cloud  
- [ ] No seed passwords in production env after first login  

## Data hygiene

- [ ] `prisma migrate deploy` on production  
- [ ] Seed **only** if empty; then **immediately** change admin password  
- [ ] Remove draft “Placeholder — confirm with client” certification or keep draft  
- [ ] Confirm published certifications are client-approved  
- [ ] Replace picsum product images with real assets  
- [ ] Confirm no invented prices / MOQ / capacity on public pages  

## Security / SEO

- [ ] Security headers present (see `docs/SECURITY.md`)  
- [ ] CSP Report-Only evaluated (`docs/CSP-HSTS-PLAN.md`)  
- [ ] HSTS enabled only after HTTPS stable  
- [ ] `/admin` remains `noindex`  
- [ ] OG titles correct on Home / Products / RFQ  

## Cutover

- [ ] Soft launch to internal stakeholders  
- [ ] Monitor RFQ + Resend for 48h  
- [ ] Point old site / parking page away only after sign-off  
- [ ] Update client with admin URL + credentials vault location  

## Sign-off

| Role | Name | Date | OK |
|---|---|---|---|
| TPM | | | |
| DevOps | | | |
| Client / Product Owner | | | |

**Do not launch** while DEPLOY-002 (staging) is still blocked without a compensating production-only plan approved by TPM.
