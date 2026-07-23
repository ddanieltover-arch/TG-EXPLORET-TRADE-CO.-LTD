# SEC-002 — CSP draft & HSTS plan

> Status: **Documented for staging/prod** — do not enable a strict CSP in production until smoke-tested on Preview.

## Current headers (already live)

See `next.config.ts` and `docs/SECURITY.md`:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Content-Security-Policy (draft)

Recommended starting CSP for TG Exploret (Next.js App Router + Cloudinary + Resend-hosted assets if any):

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://*.supabase.co;

  font-src 'self' data:;
  connect-src 'self' https://api.resend.com https://*.supabase.co;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

### Notes

| Directive | Why |
|---|---|
| `script-src … 'unsafe-inline' 'unsafe-eval'` | Temporary for Next.js / React hydration; tighten with nonces in a follow-up |
| `img-src … supabase` | Product galleries (Supabase Storage) |
| `connect-src … supabase` | Future Postgres client / auth edge cases |
| `frame-ancestors 'none'` | Aligns with `X-Frame-Options: DENY` |

### Rollout steps

1. Add CSP as `Content-Security-Policy-Report-Only` on Vercel Preview  
2. Collect violations for 3–5 days  
3. Switch to enforcing CSP when clean  
4. Replace `'unsafe-inline'` / `'unsafe-eval'` with nonce-based policy when ready  

## HSTS plan

Enable **only** after custom domain TLS is confirmed on Vercel:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

| Step | Gate |
|---|---|
| 1. Staging HTTPS works | Vercel cert issued |
| 2. Production custom domain (`tgetradecoltd.com`) HTTPS | DNS + Vercel |
| 3. Add HSTS header in `next.config.ts` (or Vercel) | After 24h stable HTTPS |
| 4. Optional HSTS preload submission | After client approves |

**Do not** set HSTS on `*.vercel.app` alone if the marketing domain may still serve HTTP elsewhere.

## Owner

Security Engineer + DevOps — execute during DEPLOY-002 / LAUNCH-001.
