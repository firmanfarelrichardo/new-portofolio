# Production Deployment & Infrastructure Guide

## Deployment Architecture
Aplikasi di-deploy menggunakan platform **Vercel** dengan arsitektur hibrida:
- Frontend (React SPA) didistribusikan secara global melalui **Vercel Edge Network / CDN**.
- Backend Express.js diadaptasi sebagai **Vercel Serverless Functions** (di bawah rute `/api/*`) yang melakukan komunikasi terenkripsi (HTTPS) ke layanan cloud terkelola **Supabase**.
- Domain kustom `firmanfarel.site` dikelola melalui **Hostinger DNS**.

```text
                  Hostinger DNS (firmanfarel.site)
                                 │
                                 ▼
                     Vercel Global Edge Network
                   ┌─────────────┴─────────────┐
                   │                           │
                   ▼                           ▼
            Static Frontend               API Serverless
              (React SPA)              (Express.js Runtime)
                                               │
                                               ▼
                                      Supabase Cloud BaaS
                                  (PostgreSQL + Auth + Storage)
```

---

## Build Configuration (`vercel.json`)
Konfigurasi Vercel dirancang untuk mengarahkan request frontend ke bundle React dan rute `/api` ke serverless Express:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ]
}
```

---

## Environment Configuration
Sebelum deployment rilis ke production, pastikan seluruh variabel lingkungan berikut telah diinjeksi pada panel pengaturan Vercel (**Project Settings -> Environment Variables**):

| Variable Name | Environment | Keterangan |
| :--- | :--- | :--- |
| `NODE_ENV` | Production | Diset ke `production` |
| `SUPABASE_URL` | Production | URL endpoint project Supabase Cloud |
| `SUPABASE_ANON_KEY` | Production | Kunci publik aman untuk client-side fetch |
| `SUPABASE_SERVICE_ROLE_KEY`| Production (Secret) | Kunci privat hanya untuk backend Express serverless |
| `CLIENT_ORIGIN` | Production | Diset ke `https://firmanfarel.site` |
| `RATE_LIMIT_MAX` | Production | Batas request rate limiter (contoh: `100`) |

---

## Custom Domain & DNS Setup (Hostinger)
1. Masuk ke panel kontrol Hostinger -> **DNS / Name Servers**.
2. Tambahkan / sesuaikan record DNS berikut yang diarahkan ke Vercel:
   - **A Record:** `@` -> `76.76.21.21` (IP Anycast Vercel)
   - **CNAME Record:** `www` -> `cname.vercel-dns.com`
3. Pada dashboard Vercel, buka menu **Settings -> Domains**, lalu masukkan domain `firmanfarel.site` dan `www.firmanfarel.site`.
4. Tunggu proses propagasi DNS (biasanya 5–30 menit). Vercel akan secara otomatis menerbitkan sertifikat SSL/TLS gratis melalui Let's Encrypt.

---

## CI/CD Pipeline
- Setiap *pull request* ke branch `main` akan memicu **Vercel Preview Deployment** untuk memvalidasi build dan smoke test.
- Setiap *push* atau *merge* ke branch `main` secara otomatis memicu proses build production dan rilis instan (*Zero Downtime Deployment*).

---

## Backup Strategy & Disaster Recovery
- **Database Backup:** Supabase Cloud mengaktifkan automated daily backup dengan retensi berkala.
- **Asset Storage:** Berkas gambar dan PDF di Supabase Storage bucket tersimpan secara redundan di multi-region AWS S3 infrastructure.
- **Source Code Recovery:** Seluruh history kode tersimpan aman di repositori privat GitHub.
