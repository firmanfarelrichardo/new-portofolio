# MODULE: AUTHENTICATION & SECURITY

## Overview
Modul Autentikasi dan Keamanan mengelola proses autentikasi pemilik website (Admin/Author) ke panel Content Management System (CMS), verifikasi token JWT pada lapisan backend Express, serta penegakan kebijakan Row Level Security (RLS) pada basis data Supabase PostgreSQL.

---

## Objectives
- Menyediakan gerbang login yang aman dan terisolasi khusus untuk pemilik situs.
- Melindungi seluruh rute `/admin/*` di frontend agar tidak dapat diakses tanpa sesi valid.
- Memvalidasi token autentikasi di API layer dan menolak request ilegal.
- Mencegah registrasi akun baru oleh pihak luar (*single-owner isolation*).

---

## Stakeholders
### Public Visitor
Tidak memiliki akses ke modul ini; tidak ada fitur registrasi publik.
### Admin / Owner (Firman Farel)
Satu-satunya pengguna yang berhak melakukan login, memperbarui password, dan mengelola sesi.

---

## Functional Requirements
### FR-AUTH-001: Admin Login via Supabase Auth
Sistem menyediakan form login di `/admin/login` dengan input email dan password yang terhubung ke `supabase.auth.signInWithPassword()`.
### FR-AUTH-002: Token & Session Management
Sistem menyimpan JWT session di local storage / secure cookie dan memperbarui token secara otomatis sebelum masa aktif berakhir (*auto-refresh*).
### FR-AUTH-003: Frontend Route Protection
React Router guard memeriksa status autentikasi; pengguna yang belum login diarahkan secara paksa (*redirect*) ke `/admin/login`.
### FR-AUTH-004: Backend Auth Middleware
Middleware Express membaca header `Authorization: Bearer <TOKEN>`, memverifikasi keabsahannya ke Supabase, dan menyematkan objek user ke `req.user`.
### FR-AUTH-005: Logout Sesi
Sistem menyediakan tombol logout di CMS yang memanggil `supabase.auth.signOut()` dan menghapus token lokal.

---

## Business Rules
### BR-AUTH-001: Single-Tenant Isolation
Sistem hanya mengizinkan 1 akun admin aktif. Registrasi publik pada dashboard Supabase Cloud wajib dimatikan (*Disable Signups*).
### BR-AUTH-002: Brute-Force Throttling
Percobaan login salah dibatasi maksimal 5 kali dalam 15 menit per IP address.

---

## Workflow
### Login Flow
```text
Admin Input Email & Password ──> Form Client Validation 
  ──> Supabase Auth Verification ──> Session Token Diterbitkan 
  ──> Simpan di Client State ──> Redirect ke /admin/dashboard
```

### Route Guard Flow
```text
Navigasi ke /admin/* ──> Check Local Session 
  ├── Valid ──> Tampilkan Halaman CMS
  └── Invalid/Expired ──> Redirect ke /admin/login
```

---

## Database Design
Modul ini memanfaatkan skema internal Supabase (`auth.users`), dengan relasi `id` ke tabel `profiles` lokal.

---

## Backend Design
### Middleware
`authMiddleware.ts`: Membaca header Bearer token, memanggil `supabase.auth.getUser(token)`, menolak request tanpa token dengan status 401.
### Policies
PostgreSQL Row Level Security memeriksa `auth.role() = 'authenticated'` untuk seluruh operasi mutasi data.

---

## API Endpoints

### Endpoint List
| Method | Path | Purpose | Authorization | Request | Response Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/verify` | Verifikasi integritas token sesi | Bearer Token | Header Auth | 200 / 401 |
| **POST** | `/api/auth/logout` | Konfirmasi logout sesi | Bearer Token | Header Auth | 200 |

### Sample JSON Responses
#### Success (200 OK)
```json
{
  "success": true,
  "data": {
    "userId": "uuid-owner",
    "email": "firman@example.com",
    "role": "authenticated"
  },
  "message": "Sesi terverifikasi"
}
```
#### Authorization Error (401 Unauthorized)
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token sesi tidak valid atau telah kedaluwarsa"
  }
}
```

---

## Frontend Design
### Pages
- `/admin/login`: Halaman form login minimalis dan elegan.
### Components
- `LoginForm.tsx`: Komponen formulir email dan password dengan indikator loading.
- `ProtectedRoute.tsx`: Wrapper komponen rute admin.
### State Management
- `AuthContext.tsx`: Mengelola status `user`, `session`, `isLoading`, serta fungsi `login` dan `logout`.

---

## UI / UX Requirements
- Desain form login bersih (*centered card*), bebas distorsi pada mobile.
- Tombol submit menampilkan animasi spinner saat proses autentikasi berlangsung.
- Menampilkan pesan alert merah yang jelas saat password salah.

---

## Validation Rules
- Email wajib berformat email valid dan tidak boleh kosong.
- Password wajib minimal 8 karakter.

---

## Security Rules
- Dilarang menyimpan password dalam bentuk plain text di client state.
- Tidak mengekspos `SUPABASE_SERVICE_ROLE_KEY` pada frontend.

---

## Testing Scenarios
### Unit Test
- Memvalidasi schema Zod form login.
### Integration Test
- Menguji middleware `authMiddleware` saat menerima header valid vs tanpa header.
### UAT
- Admin memasukkan password benar -> berhasil masuk dashboard.
- Admin memasukkan password salah -> muncul pesan peringatan.

---

## Dependencies
- `@supabase/supabase-js`
- React Router v6

---

## AI Agent Instructions
- **Backend Agent:** Pastikan middleware tidak membocorkan stack trace error autentikasi ke client.
- **Frontend Agent:** Pastikan token tidak disimpan pada cookie unencrypted yang rentan XSS.

---

## Known Issues
- Tidak ada.

---

## Future Improvements
- Integrasi Two-Factor Authentication (2FA / TOTP) via Supabase Auth.
