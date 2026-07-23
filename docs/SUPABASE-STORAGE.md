# Supabase Storage — product images (ACR-001)

Replaces Cloudinary. Admin uploads go to a **public** Storage bucket; URLs are stored on `ProductImage`.

## Create bucket (Supabase Dashboard)

1. Storage → New bucket  
2. Name: `product-images` (or set `SUPABASE_STORAGE_BUCKET`)  
3. **Public bucket:** ON (published product photos are public)  
4. Optional policies: allow public `SELECT`; restrict `INSERT`/`UPDATE`/`DELETE` to service role only (service role bypasses RLS)

## Env vars

```env
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_STORAGE_BUCKET="product-images"
```

- Use the **service role** key only on the server (never `NEXT_PUBLIC_`).  
- Anon key is **not** enough for admin uploads in this app.

## App behaviour

- Without these vars: admin can still **Attach by URL**; upload button shows setup hint.  
- With vars: `/admin/products/[id]` → Upload to Supabase Storage.  
- `ProductImage.publicId` = object path inside the bucket (e.g. `products/….jpg`).

## Local / seed

Seed still uses `/media/products/*.svg` placeholders until real files are uploaded.
