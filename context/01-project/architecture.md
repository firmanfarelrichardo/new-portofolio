# High Level Architecture & Data Flow

## High Level Architecture
Arsitektur sistem dibangun dengan pola *decoupled full-stack TypeScript* yang mengintegrasikan antarmuka client (React SPA), lapisan API serverless (Node.js/Express), dan platform Backend-as-a-Service (Supabase) yang di-deploy di infrastruktur Vercel.

```text
                                  USER BROWSER
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
                 [Public Visitor]                [Site Owner]
                         │                             │
                         ▼                             ▼
                  PUBLIC WEBSITE                  PRIVATE CMS
             (https://firmanfarel.site)    (https://firmanfarel.site/admin)
                         │                             │
                         │ (React 18+ / TS)            │ (React 18+ / TS)
                         │ Client Routing              │ Auth Guards & State
                         │                             │
                         └──────────────┬──────────────┘
                                        │
                                        ▼ HTTPS JSON
                         ┌─────────────────────────────┐
                         │   VERCEL SERVERLESS EDGE    │
                         │    Node.js + Express API    │
                         │                             │
                         │  • Rate Limiting & Helmet   │
                         │  • CORS Policy Validation   │
                         │  • Zod Schema Validation    │
                         │  • Auth Token Verification  │
                         └──────────────┬──────────────┘
                                        │ Supabase Client SDK
                                        ▼ (Service Role / User JWT)
                         ┌─────────────────────────────┐
                         │      SUPABASE PLATFORM      │
                         │                             │
                         │  ┌───────────────────────┐  │
                         │  │ PostgreSQL 15+ (RLS)  │  │
                         │  └───────────────────────┘  │
                         │  ┌───────────────────────┐  │
                         │  │ Supabase Auth (JWT)   │  │
                         │  └───────────────────────┘  │
                         │  ┌───────────────────────┐  │
                         │  │ Supabase Storage      │  │
                         │  │ (Avatars, Projects)   │  │
                         │  └───────────────────────┘  │
                         └─────────────────────────────┘
```

---

## Components & Modules
Sistem terbagi ke dalam 3 tier utama:

### 1. Client Tier (Frontend SPA)
- **Framework:** React + TypeScript (di-bundle via Vite).
- **Public Bundle:** Menggunakan layout modern dengan *Vanilla CSS* berdesain premium, micro-animation responsif, dan layout fluid.
- **Admin Bundle:** Terisolasi di bawah rute `/admin` dengan mekanisme *Code Splitting* (`React.lazy()`) agar pengguna publik tidak mengunduh skrip panel CMS.
- **Client Cache & State:** Menggunakan state cache lokal untuk menghindari re-fetch data publik yang tidak perlu saat navigasi rute.

### 2. Application Tier (Backend Express.js API)
- **Runtime:** Node.js serverless functions di Vercel.
- **Arsitektur Kode:** *Separation of Concerns* berlapis:
  ```text
  Request ──> Express Route ──> Middleware (Auth/RateLimit/CORS) 
          ──> Zod Validator ──> Controller 
          ──> Service (Business Logic) ──> Repository (Supabase Client) 
          ──> Response Formatter
  ```
- **Tanggung Jawab:** Enforcing validasi data, mitigasi serangan (rate limit, sanitasi input), enkapsulasi operasi privat, serta pengiriman pesan kontak.

### 3. Data & Cloud Tier (Supabase)
- **Database Engine:** PostgreSQL dengan aktivasi *Row Level Security* (RLS) pada seluruh tabel.
- **Authentication Service:** Supabase Auth untuk manajemen sesi JWT admin, refresh token, dan enkripsi kredensial.
- **Object Storage Service:** Supabase Storage bucket untuk menampung gambar galeri proyek, berkas resume PDF, dan logo keahlian.

---

## Data Flow

### A. Public Read Flow (Contoh: Menampilkan Daftar Proyek)
1. Pengunjung mengakses `https://firmanfarel.site/projects`.
2. Komponen React melakukan query ke endpoint `GET /api/projects`.
3. Express controller memanggil service proyek, yang mengeksekusi query Supabase dengan filter `status = 'published'`.
4. Database PostgreSQL memvalidasi RLS policy untuk role `anon`, memastikan hanya data terpublikasi yang dikembalikan.
5. JSON terstruktur dikirim ke browser dengan caching header HTTP.
6. Browser me-render kartu proyek dan menangani filter interaktif secara lokal.

### B. Admin Mutation Flow (Contoh: Menambah Proyek Baru)
1. Admin mengisi formulir di `/admin/projects/new` dan mengunggah thumbnail.
2. Gambar diunggah ke Supabase Storage, mengembalikan URL publik aset.
3. Form mengirim `POST /api/projects` dengan menyertakan Bearer Token JWT pada Authorization Header.
4. Express middleware memverifikasi keabsahan JWT melalui Supabase Auth SDK.
5. Validator Zod memeriksa kelengkapan data (judul, deskripsi, slug, array teknologi).
6. Service mengeksekusi mutasi `INSERT` ke PostgreSQL Supabase.
7. Respons sukses dikembalikan; CMS menyegarkan cache data lokal.

### C. Public Contact Submission Flow
1. Pengunjung mengisi form kontak di `/contact`.
2. Browser melakukan pre-validasi (format email, panjang pesan) dan memeriksa bot honeypot.
3. Form mengirim `POST /api/contact`.
4. Express rate-limiter memastikan IP pengirim tidak melebihi batas (maksimal 5 request per 15 menit).
5. Data disanitasi dan disimpan ke tabel `messages` dengan status `unread`.
6. Respons sukses ditampilkan secara visual kepada pengunjung; pesan siap ditinjau di CMS.

---

## Infrastructure & Hosting
- **Frontend & API Hosting:** Vercel Global Edge Network.
- **Database, Auth & Storage:** Supabase Cloud Managed PostgreSQL Platform.
- **Domain & DNS:** Hostinger DNS terintegrasi ke nameserver/CNAME Vercel dengan proteksi SSL/TLS otomatis (*Let's Encrypt*).

---

## Security Layer
- **Zero Trust di Level Database:** RLS PostgreSQL memblokir seluruh operasi mutasi (INSERT, UPDATE, DELETE) dari pengunjung tidak terautentikasi, meskipun endpoint API mengalami kegagalan validasi.
- **HTTP Security Headers:** Menggunakan library `helmet` pada Express (X-Content-Type-Options, Strict-Transport-Security, X-Frame-Options: DENY).
- **CORS Restricted:** Origin dibatasi secara ketat hanya pada domain resmi `https://firmanfarel.site` (dan `localhost:5173` saat development).
- **Sanitasi Data:** Sanitasi HTML/String pada input form kontak dan artikel guna mencegah injeksi SQL dan Cross-Site Scripting (XSS).
