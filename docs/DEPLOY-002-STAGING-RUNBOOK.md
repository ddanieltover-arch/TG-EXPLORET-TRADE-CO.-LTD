# DEPLOY-002 — Staging provision runbook

> **Status:** Partially unblocked (secrets present locally) · **Live provision: BLOCKED**  
> **2026-08-05:** `.env.staging` exists, but `prisma db push` fails with Supabase  
> `tenant/user … not found`. Vercel CLI / team access still missing.  
> See `project/SPRINT-20a-STAGING-QA.md`.

## Prerequisites (must be provided by client/DevOps)

1. Supabase project (staging) — **active** project + pooler + **direct** DB URIs  
2. Vercel account / team access  
3. Optional: Resend (verify **tgeptrade.com**) + Storage keys  
4. Git remote (if linking Vercel to repo)

## Execution order

1. Refresh Supabase URIs if tenant error persists — see Sprint 20a log  
2. Complete [`POSTGRES-CUTOVER-CHECKLIST.md`](./POSTGRES-CUTOVER-CHECKLIST.md)  
3. Complete [`VERCEL-STAGING-CHECKLIST.md`](./VERCEL-STAGING-CHECKLIST.md)  
4. Deploy Preview / Staging URL  
5. Run smoke from [`QA-REGRESSION-CHECKLIST.md`](./QA-REGRESSION-CHECKLIST.md) on staging URL  
6. Human interactive pass [`QA-003-INTERACTIVE-SIGNOFF.md`](./QA-003-INTERACTIVE-SIGNOFF.md)  
7. Record staging URL + vault location in `project/PROJECT-DASHBOARD.md`

## Provider note (Prisma)

Local commits keep `provider = "sqlite"`. For staging:

- Prefer a **staging branch** or CI step that builds against Postgres, **or**  
- Document temporary provider flip in the deploy PR (never commit production secrets)

## Unblock criteria

| Item | Owner | Status 2026-08-05 |
|---|---|---|
| Supabase connection strings | Client / DevOps | Present but **invalid / paused** — refresh |
| Vercel project create permission | Client / DevOps | Missing |
| Domain decision for staging subdomain | TPM | Open |

When unblocked, authorize a **DEPLOY-003 execution** pass — do not invent credentials.

## Sprint 19 / 20a references

Credential request pack: `project/DEPLOY-003-CREDENTIAL-REQUEST.md`  
Perf re-baseline on staging: `project/PERF-004-PROCEDURE.md`  
Launch board: `project/LAUNCH-GATE-BOARD.md`  
Latest attempt: `project/SPRINT-20a-STAGING-QA.md`
