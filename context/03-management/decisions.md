# Architecture Decision Records (ADR)

## D001: Decoupled Public Website & Private CMS pada Satu Domain via Subpath `/admin`

- **Date:** 2026-09-05
- **Status:** Accepted
- **Context:**
  Website portfolio membutuhkan dua antarmuka berbeda: antarmuka publik yang dioptimasi untuk kecepatan muat dan SEO, serta antarmuka CMS privat yang memerlukan autentikasi ketat. Ada pilihan untuk menggunakan subdomain terpisah (contoh: `admin.firmanfarel.site`) atau menggunakan subpath terpadu (`firmanfarel.site/admin`).
- **Decision:**
  Menggunakan subpath terpadu `/admin` di bawah domain utama `firmanfarel.site` dengan *route-based code splitting* (`React.lazy()`).
- **Alternatives:**
  Membuat repositori atau subdomain terpisah (`admin.firmanfarel.site`). Alternatif ini ditolak untuk fase MVP karena menambah kerumitan konfigurasi DNS multi-domain, issue CORS cross-subdomain, dan konfigurasi SSL terpisah.
- **Impact:**
  Struktur rute lebih sederhana, single domain SSL sertifikat, dan visitor publik tidak terkena dampak penalti ukuran bundle JavaScript panel CMS berkat code splitting.

---

## D002: Pemanfaatan Supabase sebagai Backend-as-a-Service (PostgreSQL, Auth, Storage)

- **Date:** 2026-09-05
- **Status:** Accepted
- **Context:**
  Aplikasi memerlukan penyimpanan data relasional yang handal, sistem autentikasi aman untuk pemilik situs, dan penyimpanan objek untuk gambar portofolio/resume PDF. Membangun server autentikasi (hashing bcrypt, refresh token rotation) dan hosting database PostgreSQL mandiri memerlukan beban pemeliharaan infrastruktur yang tinggi.
- **Decision:**
  Menggunakan platform cloud terkelola Supabase (Free Tier / Managed) untuk PostgreSQL, Supabase Auth, dan Supabase Storage.
- **Alternatives:**
  Self-hosted PostgreSQL & MinIO storage di VPS mandiri, atau SQLite lokal. Ditolak karena menambah overhead backup manual dan potensi single point of failure pada VPS.
- **Impact:**
  Menghemat waktu pengembangan secara signifikan; keamanan terjamin dengan enkripsi standar industri; data terlindungi oleh fitur native PostgreSQL Row Level Security (RLS).

---

## D003: Vanilla CSS dengan Custom Design Tokens untuk Sistem Desain

- **Date:** 2026-09-05
- **Status:** Accepted
- **Context:**
  Proyek membutuhkan tampilan visual yang memukau, elegan, bespoke, dan performa tinggi tanpa class bloatware yang berlebihan. Penggunaan framework CSS eksternal seperti Tailwind CSS seringkali memicu dependensi tooling tambahan atau menghasilkan tampilan yang seragam (*generic*).
- **Decision:**
  Menggunakan Vanilla CSS terstruktur dengan Design Tokens berbasis CSS Variables (`:root`) untuk tipografi, palet warna elegan, spasi responsif, dan efek micro-animations.
- **Alternatives:**
  Tailwind CSS v3/v4 atau CSS-in-JS (Styled Components). Ditolak kecuali jika diminta secara eksplisit, demi memastikan kontrol penuh atas performa render dan fleksibilitas estetika bespoke.
- **Impact:**
  Ukuran bundle CSS sangat kecil, rendering browser instan tanpa runtime overhead, dan kemudahan kustomisasi tema visual.

---

## D004: Lapisan Express.js API Berjalan sebagai Vercel Serverless Functions

- **Date:** 2026-09-05
- **Status:** Accepted
- **Context:**
  Meskipun Supabase Client dapat diakses langsung dari browser, operasi sensitif tertentu (sanitasi pesan kontak, proteksi rate-limiting per IP, enkapsulasi mutasi data CMS, dan penambahan custom business logic) lebih aman dan bersih jika melalui lapisan API tersentralisasi.
- **Decision:**
  Membangun backend Express.js dengan TypeScript yang di-deploy ke Vercel Serverless Functions di bawah endpoint `/api/*`.
- **Alternatives:**
  Memanggil Supabase Client murni dari frontend (BaaS Direct Access) atau menjalankan server Express long-running di VM/VPS. Pendekatan BaaS murni memiliki kelemahan dalam menyembunyikan logika bisnis dan menerapkan IP rate limiting untuk formulir publik. Pendekatan VPS long-running memerlukan biaya server bulanan tersendiri.
- **Impact:**
  Keamanan maksimal, zero hosting cost untuk server backend, otomatis auto-scale mengikuti traffic Vercel.

---

## D005: Feature-Based Modular Architecture pada Frontend

- **Date:** 2026-09-05
- **Status:** Accepted
- **Context:**
  Dalam aplikasi React skala menengah, penataan folder yang hanya mengandalkan satu direktori `components/` akan cepat berantakan ketika jumlah komponen melampaui puluhan file.
- **Decision:**
  Menerapkan *Feature-Based Folder Architecture* di mana setiap domain fungsional (`projects`, `skills`, `experience`, `contact`) memiliki foldernya sendiri yang menampung komponen, hooks, dan tipe data khususnya.
- **Alternatives:**
  Layered architecture murni (`components/`, `views/`, `containers/`). Ditolak karena menyulitkan penemuan kode terkait saat mengembangkan atau memodifikasi satu fitur spesifik.
- **Impact:**
  Maintainability tinggi, modularitas terjamin, onboarding AI Agent dan pengembang lain menjadi jauh lebih terarah dan cepat.
