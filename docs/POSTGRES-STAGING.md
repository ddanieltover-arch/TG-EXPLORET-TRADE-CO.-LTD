# Postgres staging switch (Supabase)

> Local development uses **SQLite** (`DATABASE_URL="file:./dev.db"`).  
> Frozen architecture requires **PostgreSQL via Supabase** for staging and production.

## Prerequisites

1. Supabase project created for TG EXPORT TRADE  
2. Connection string from **Project Settings → Database** (prefer the pooled URI for serverless)  
3. `AUTH_SECRET` and Resend / Cloudinary secrets ready for the staging environment  

## Switch steps

1. In Supabase, copy the **URI** connection string (or Transaction pooler URI for Vercel).  
2. Set staging env:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true"
# Direct URL optional for migrations if using Prisma migrate with pooler:
# DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
```

3. Change `prisma/schema.prisma` datasource for staging/prod builds:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // directUrl = env("DIRECT_URL")  // if required by Prisma + PgBouncer
}
```

> Keep SQLite only for local developer machines. Do not commit a Postgres `DATABASE_URL` with credentials.

4. Generate client and apply schema:

```bash
npx prisma generate
npx prisma migrate deploy
# or first-time: npx prisma db push
npx tsx prisma/seed.ts
```

5. Deploy the app (Vercel) with the same env vars: `DATABASE_URL`, `AUTH_SECRET`, `RESEND_*`, `CLOUDINARY_*`, `SALES_INBOX`.

6. Smoke-test: RFQ submit → row in DB → Resend (if key set) → admin login → dashboard counts.

## Enum / SQLite note

Prisma enums work on both SQLite (dev) and Postgres (staging). After switching provider, re-run migrate so Postgres receives proper enum types.

## Rollback

Point `DATABASE_URL` back to `file:./dev.db`, restore `provider = "sqlite"`, and run `npx prisma migrate dev` locally. Staging data is not copied automatically.

## Cutover checklist

Operational sign-off list: [`POSTGRES-CUTOVER-CHECKLIST.md`](./POSTGRES-CUTOVER-CHECKLIST.md).
