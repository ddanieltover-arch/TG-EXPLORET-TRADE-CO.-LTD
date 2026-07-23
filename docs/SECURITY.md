# Security notes (Sprint 14)

## Implemented

| Control | Where |
|---|---|
| Auth.js session on `/admin/*` | `middleware.ts` + `auth.ts` |
| Role gates on mutations | `lib/adminAuth.ts` — CMS vs sales scopes |
| Honeypot on public forms | Quote / contact / partner Zod schemas |
| Security response headers | `next.config.ts` (`X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`) |
| Admin `robots: noindex` | Admin page metadata |
| Secrets via env | `.env.example` — never commit real keys |

## Rate limiting (staging / production)

Not enforced in-app yet (local SQLite / single-node friendly). Recommended for staging:

1. **Vercel Firewall / WAF** rules on `/request-quote`, `/contact`, `/dealer-registration`, `/distributor-registration`, `/api/auth/*`  
2. Optional **Upstash Redis** sliding window in server actions (follow-up sprint)  
3. Keep honeypot + server-side Zod validation as first line  

Document chosen provider in the deploy PR before public launch.

## Headers still deferred

- Full **Content-Security-Policy** — draft + rollout in [`CSP-HSTS-PLAN.md`](./CSP-HSTS-PLAN.md) (start Report-Only)
- **HSTS** — enable only behind HTTPS on custom domain (same plan)

## Incident notes

- Rotate `AUTH_SECRET` and admin password on any shared environment  
- Resend / Cloudinary keys: least privilege, revoke if leaked  
