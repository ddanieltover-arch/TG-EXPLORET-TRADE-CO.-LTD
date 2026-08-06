# DEPLOY-001 — Vercel staging checklist

> Architecture freeze: **Vercel** host + **Supabase Postgres** (staging/prod). Local remains SQLite.

## Create project

- [ ] Vercel account / team for TG EXPORT TRADE  
- [ ] New project linked to git repo (or CLI deploy)  
- [ ] Framework preset: Next.js  
- [ ] Root directory: `tg-exploret-web` (if monorepo)  
- [ ] Build command: `npm run build`  
- [ ] Install command: `npm install`  
- [ ] Node.js 20.x  

## Environment variables (Preview / Staging)

| Name | Required | Notes |
|---|---|---|
| `DATABASE_URL` | Yes (staging) | Supabase pooler URI — see Postgres cutover docs |
| `DIRECT_URL` | If using pooler + migrate | Direct Postgres URI |
| `AUTH_SECRET` | Yes | `openssl rand -base64 32` |
| `AUTH_URL` / `NEXT_PUBLIC_SITE_URL` | Yes | Staging URL e.g. `https://….vercel.app` |
| `SEED_ADMIN_EMAIL` | Optional | Only for one-time seed job |
| `SEED_ADMIN_PASSWORD` | Optional | Change immediately after seed |
| `RESEND_API_KEY` | Optional | Email |
| `RESEND_FROM_EMAIL` | Optional | Verified domain preferred |
| `SALES_INBOX_EMAIL` | Optional | Default sales inbox |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (uploads) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (uploads) | Server-only; never expose client-side |
| `SUPABASE_STORAGE_BUCKET` | Optional | Default `product-images` |

**Never** commit production secrets. Use Vercel Environment UI.

## Database

- [ ] Follow `POSTGRES-STAGING.md` + `POSTGRES-CUTOVER-CHECKLIST.md`  
- [ ] Provider switch to PostgreSQL for staging build (document in PR)  
- [ ] `prisma migrate deploy` against staging  
- [ ] Seed once; rotate admin password  

## Post-deploy smoke

- [ ] `/` loads  
- [ ] RFQ submit persists  
- [ ] Admin login works  
- [ ] Security headers present (browser DevTools → Network)  
- [ ] `/admin` is not indexed (robots noindex)  

## Custom domain (later)

- [ ] `tgeptrade.com` DNS at registrar  
- [ ] Vercel domain + TLS  
- [ ] Update `NEXT_PUBLIC_SITE_URL` / `AUTH_URL`  

## Sign-off

| Role | Date | OK |
|---|---|---|
| DevOps | | |
| TPM | | |

**Blocked until:** Supabase + Vercel credentials available.
