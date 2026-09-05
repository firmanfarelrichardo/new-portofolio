# Troubleshooting Guide & Solusi Kendala Umum

Dokumen ini memuat daftar kendala teknis yang kerap terjadi saat proses setup lokal, pengembangan, atau deployment beserta solusi definitifnya.

---

## 1. Masalah CORS (Cross-Origin Resource Sharing)

### Gejala:
Browser menampilkan pesan error di console:
`Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:5173' has been blocked by CORS policy.`

### Penyebab:
Variabel lingkungan `CLIENT_ORIGIN` pada backend `server/.env` tidak sesuai dengan URL frontend lokal Anda.

### Solusi:
1. Buka berkas `server/.env`.
2. Pastikan variabel diatur secara tepat:
   ```env
   CLIENT_ORIGIN=http://localhost:5173
   ```
3. Restart server Express backend.

---

## 2. Supabase Error: `new row violates row-level security policy`

### Gejala:
Operasi `INSERT` atau `UPDATE` dari form CMS gagal dengan error PostgreSQL code `42501`.

### Penyebab:
- Pengguna belum login atau token JWT Supabase tidak disertakan pada header HTTP (`Authorization: Bearer <TOKEN>`).
- Atau RLS policy untuk role `authenticated` belum diaktifkan pada tabel target di Supabase SQL Editor.

### Solusi:
1. Pastikan user telah login melalui `/admin/login`.
2. Periksa apakah request header memuat token Bearer yang valid.
3. Jalankan kembali script RLS policy pada `04-setup/database-setup.md` di SQL Editor Supabase.

---

## 3. Form Kontak Publik Gagal Terkirim (`429 Too Many Requests`)

### Gejala:
Pengunjung melihat pesan kesalahan bahwa form tidak dapat terkirim sementara waktu.

### Penyebab:
Rate limiter pada endpoint `POST /api/contact` mendeteksi lebih dari batas request yang diizinkan dalam rentang 15 menit dari IP yang sama.

### Solusi:
- Tunggu interval jendela rate-limiting berakhir (15 menit).
- Untuk keperluan testing lokal, tingkatkan nilai `RATE_LIMIT_MAX_REQUESTS` pada `server/.env`.

---

## 4. Port Sudah Digunakan (`EADDRINUSE: address already in use :::5000`)

### Gejala:
Server Express gagal menyala dengan kode error `EADDRINUSE`.

### Solusi:
Matikan proses lama yang masih mengikat port 5000:
- **Windows (PowerShell):**
  ```powershell
  Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force
  ```
- Atau ganti port di `server/.env` menjadi `PORT=5001`.

---

## 5. File Gambar Gagal Di-Upload ke Supabase Storage

### Gejala:
Upload gambar di CMS mengembalikan respons `403 Forbidden` atau `Bucket not found`.

### Solusi:
1. Pastikan nama bucket di Supabase Storage dibuat persis dengan nama `portfolio-media`.
2. Pastikan bucket diatur sebagai **Public Bucket** agar gambar dapat di-load oleh browser pengunjung tanpa URL presigned yang kedaluwarsa.
3. Periksa ukuran berkas (maksimal 5 MB) dan tipe file (hanya PNG, JPG, JPEG, WEBP, SVG, PDF).
