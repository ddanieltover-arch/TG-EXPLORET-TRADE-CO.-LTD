# Postgres staging cutover checklist

Use with [`POSTGRES-STAGING.md`](./POSTGRES-STAGING.md). **Do not cut over until Supabase credentials are available** and this checklist is signed off.

## Pre-flight

- [ ] Supabase project created (`tg-exploret-staging` or agreed name)
- [ ] Database password stored in team vault (not git)
- [ ] Pooler URI + direct URI copied
- [ ] Vercel staging project (or preview env) ready
- [ ] `AUTH_SECRET` generated (`openssl rand -base64 32`)
- [ ] Optional: `RESEND_API_KEY`, `CLOUDINARY_*`, `SALES_INBOX_EMAIL`
- [ ] Local `npm run build` green on current main/work branch

## Schema provider switch

Local keeps SQLite. Staging/prod Prisma provider must be PostgreSQL.

Recommended approach:

1. Keep `provider = "sqlite"` in committed schema for local DX **or**
2. Introduce env-driven dual setup (follow frozen architecture preference for Postgres in shared envs)

For first staging cutover:

```bash
# On a staging branch / CI only — do not commit secrets
# 1. Set DATABASE_URL + DIRECT_URL in Vercel / shell
# 2. Temporarily set datasource provider to postgresql (or use a prisma/schema.postgres.prisma workflow)
npx prisma migrate deploy
npx tsx prisma/seed.ts
```

> If migrate history was created against SQLite, prefer `prisma migrate diff` / baseline for Postgres, or `db push` once for empty staging then `migrate resolve`. Document the chosen path in the deploy PR.

## Deploy steps

1. [ ] Set env vars on staging host  
2. [ ] Deploy app  
3. [ ] Run migrations against Postgres  
4. [ ] Seed admin (change password immediately)  
5. [ ] Smoke tests below  

## Smoke tests

- [ ] `/` loads with brand tokens  
- [ ] Submit RFQ → row in Supabase Table Editor  
- [ ] Admin login → `/admin` counts update  
- [ ] Product edit → public leaf updates  
- [ ] Dealer/distributor status save  
- [ ] (If Resend) confirmation email received  
- [ ] (If Cloudinary) upload attaches `publicId`  

## Rollback

1. Point staging deploy back to previous release  
2. Do **not** drop staging DB unless explicitly approved  
3. Local remains on SQLite `file:./dev.db`  

## Sign-off

| Role | Name | Date | OK |
|---|---|---|---|
| TPM | | | |
| Backend | | | |
| DevOps | | | |

**Blocked until:** client/Supabase credentials provided.
