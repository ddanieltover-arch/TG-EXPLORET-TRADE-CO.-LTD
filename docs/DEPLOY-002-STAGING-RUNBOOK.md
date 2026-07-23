# DEPLOY-002 — Staging provision runbook

> **Status:** Ready to execute when credentials exist.  
> **Current:** **Blocked** — no Supabase / Vercel credentials in this workspace.

## Prerequisites (must be provided by client/DevOps)

1. Supabase project (staging) — database password + pooler URI  
2. Vercel account / team access  
3. Optional: Resend + Cloudinary staging keys  
4. Git remote (if linking Vercel to repo)

## Execution order

1. Complete [`POSTGRES-CUTOVER-CHECKLIST.md`](./POSTGRES-CUTOVER-CHECKLIST.md)  
2. Complete [`VERCEL-STAGING-CHECKLIST.md`](./VERCEL-STAGING-CHECKLIST.md)  
3. Deploy Preview / Staging URL  
4. Run smoke from [`QA-REGRESSION-CHECKLIST.md`](./QA-REGRESSION-CHECKLIST.md) on staging URL  
5. Human interactive pass [`QA-003-INTERACTIVE-SIGNOFF.md`](./QA-003-INTERACTIVE-SIGNOFF.md)  
6. Record staging URL + vault location in `project/PROJECT-DASHBOARD.md`

## Provider note (Prisma)

Local commits keep `provider = "sqlite"`. For staging:

- Prefer a **staging branch** or CI step that builds against Postgres, **or**  
- Document temporary provider flip in the deploy PR (never commit production secrets)

## Unblock criteria

| Item | Owner |
|---|---|
| Supabase connection strings | Client / DevOps |
| Vercel project create permission | Client / DevOps |
| Domain decision for staging subdomain | TPM |

When unblocked, authorize a **DEPLOY-003 execution** pass (same sprint or Sprint 19b) — do not invent credentials.

## Sprint 19 update

Credential request pack: `project/DEPLOY-003-CREDENTIAL-REQUEST.md`  
Perf re-baseline on staging: `project/PERF-004-PROCEDURE.md`  
Launch board: `project/LAUNCH-GATE-BOARD.md`
