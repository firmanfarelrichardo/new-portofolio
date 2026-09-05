# Local Development Setup Guide

## Prerequisites
Pastikan lingkungan pengembangan lokal telah terinstal:
- **Node.js:** Versi 20 LTS atau 22 LTS
- **Package Manager:** `npm` (v10+) atau `pnpm`
- **Git:** Versi 2.40+
- **Database / Cloud:** Akun Supabase (untuk project cloud gratis) atau Supabase CLI jika ingin menjalankan stack database di lokal.
- **Web Browser:** Google Chrome / Firefox Developer Edition untuk debugging & inspect.

---

## 1. Clone & Workspace Setup

```bash
# Clone repository
git clone https://github.com/firmanfarel/new-portofolio.git
cd new-portofolio
```

Struktur direktori proyek terdiri atas dua folder utama:
- `client/`: Aplikasi frontend React + Vite + TypeScript.
- `server/`: Aplikasi backend API Express.js + TypeScript.

---

## 2. Install Dependencies

Jalankan instalasi dependensi untuk frontend dan backend:

```bash
# Install root / workspace dependencies
npm install

# Atau masuk ke masing-masing direktori jika belum menggunakan monorepo workspace:
cd client && npm install
cd ../server && npm install
cd ..
```

---

## 3. Environment Configuration

Salin berkas template environment ke berkas `.env` aktif:

```bash
# Untuk frontend
cp client/.env.example client/.env

# Untuk backend
cp server/.env.example server/.env
```

Buka masing-masing berkas `.env` dan masukkan kredensial Supabase Anda (lihat panduan lengkap di `04-setup/environment-variables.md`).

---

## 4. Database Setup & Migrations

Ikuti panduan pada `04-setup/database-setup.md` untuk menjalankan skrip SQL inisialisasi tabel, Row Level Security (RLS) policies, dan seed data awal pada dashboard Supabase Anda.

---

## 5. Menjalankan Aplikasi di Lokal

Jalankan kedua service (client & server) secara bersamaan:

```bash
# Dari root workspace (menggunakan concurrently / npm script)
npm run dev

# Atau jalankan pada dua tab terminal terpisah:
# Terminal 1 (Backend API di port 5000):
cd server && npm run dev

# Terminal 2 (Frontend Vite di port 5173):
cd client && npm run dev
```

Aplikasi akan aktif dan dapat diakses melalui browser:
- **Public Website:** `http://localhost:5173`
- **CMS Admin Login:** `http://localhost:5173/admin/login`
- **Backend API Healthcheck:** `http://localhost:5000/api/health`

---

## 6. Verification Checklist
Setelah aplikasi berjalan, pastikan:
- [ ] Halaman depan (Hero, Projects, Skills) memuat data tanpa error console di browser.
- [ ] Endpoint `http://localhost:5000/api/health` mengembalikan `{ "success": true, "status": "healthy" }`.
- [ ] Halaman `/admin/login` dapat dibuka dan form validasi berfungsi saat tombol submit diklik.
- [ ] Tidak ada warning CORS pada DevTools Network tab.
