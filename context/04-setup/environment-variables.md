# Environment Variables Dictionary

Dokumen ini memuat seluruh variabel lingkungan yang dibutuhkan oleh sistem. **Dilarang memasukkan kredensial rahasia asli ke dalam repositori Git.**

---

## 1. Frontend Environment Variables (`client/.env`)

| Variable Name | Required | Default / Contoh | Deskripsi |
| :--- | :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Ya | `http://localhost:5000/api` | Base URL endpoint API Express backend lokal |
| `VITE_SUPABASE_URL` | Ya | `https://xyzcompany.supabase.co` | URL proyek Supabase untuk autentikasi client |
| `VITE_SUPABASE_ANON_KEY` | Ya | `eyJhbGciOiJIUzI1NiIsIn...` | Kunci anonim publik Supabase (aman untuk browser) |
| `VITE_SITE_URL` | Tidak | `http://localhost:5173` | URL origin frontend aktif |

---

## 2. Backend Environment Variables (`server/.env`)

| Variable Name | Required | Secret | Default / Contoh | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `PORT` | Tidak | Tidak | `5000` | Port listening server Express di lokal |
| `NODE_ENV` | Ya | Tidak | `development` | Mode runtime (`development` / `production`) |
| `SUPABASE_URL` | Ya | Tidak | `https://xyzcompany.supabase.co` | URL instance proyek Supabase |
| `SUPABASE_ANON_KEY` | Ya | Tidak | `eyJhbGciOiJIUzI1NiIsIn...` | Supabase Anon Key untuk query role anonim |
| `SUPABASE_SERVICE_ROLE_KEY`| Ya | **YA (Sangat Rahasia)** | `eyJhbGciOiJIUzI1NiIsIn...` | Kunci bypass RLS hanya untuk mutasi data backend terpercaya |
| `CLIENT_ORIGIN` | Ya | Tidak | `http://localhost:5173` | Origin yang diizinkan oleh middleware CORS |
| `RATE_LIMIT_WINDOW_MINS`| Tidak | Tidak | `15` | Jendela waktu rate limit dalam satuan menit |
| `RATE_LIMIT_MAX_REQUESTS`| Tidak | Tidak | `100` | Maksimal request per IP dalam satu jendela waktu |

---

## 3. Vercel Production Environment Variables

Saat aplikasi di-deploy ke Vercel, variabel berikut wajib diisi pada dashboard Vercel Project Settings:
- `SUPABASE_URL`: URL instance Supabase Cloud Anda.
- `SUPABASE_ANON_KEY`: Anon Key publik.
- `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key privat.
- `CLIENT_ORIGIN`: `https://firmanfarel.site`
- `NODE_ENV`: `production`

---

## Aturan Keamanan Variabel Lingkungan
1. Seluruh variabel yang memiliki prefix `VITE_` akan diekspos ke dalam bundle JavaScript publik browser. **Jangan pernah memberi prefix `VITE_` pada `SERVICE_ROLE_KEY` atau database password.**
2. Berkas `.env`, `.env.local`, `.env.production` wajib tercatat di dalam `.gitignore`.
3. Gunakan berkas `.env.example` sebagai template publik tanpa nilai rahasia.
