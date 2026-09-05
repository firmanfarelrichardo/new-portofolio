# MODULE: MEDIA LIBRARY & ASSET MANAGEMENT

## Overview
Modul Media Library mengelola pengunggahan, penyimpanan, pengkatalogan, dan distribusi berkas gambar portofolio, logo keahlian, tangkapan layar proyek, serta berkas PDF resume secara terpusat pada Supabase Storage.

---

## Objectives
- Menyediakan pengelola aset gambar terpusat untuk panel CMS.
- Menjamin validasi berkas yang ketat (tipe MIME dan batas ukuran file).
- Mempermudah penyalinan URL publik aset untuk digunakan pada formulir proyek, keahlian, atau profil.

---

## Stakeholders
### Public Visitor
Mengunduh aset media (gambar WebP/PNG, dokumen PDF) via CDN Supabase Storage.
### Admin / Owner (Firman Farel)
Mengunggah gambar baru, meninjau galeri media, mencari berkas berdasarkan nama, menyalin URL, dan menghapus berkas usang.

---

## Functional Requirements
### FR-MED-001: Asset Upload & Validation
Panel CMS menyediakan komponen *drag-and-drop file uploader*. Backend memvalidasi tipe file dan ukuran sebelum berkas diunggah ke Supabase Storage bucket `portfolio-media`.
### FR-MED-002: Media Library Browser
Halaman `/admin/media` menampilkan galeri visual seluruh berkas yang pernah diunggah dengan informasi nama berkas, ukuran (KB/MB), dimensi gambar, tanggal unggah, dan tombol aksi: "Salin URL" dan "Hapus Berkas".
### FR-MED-003: Public URL Generation
Aset yang diunggah secara otomatis menghasilkan URL publik yang permanen dan dapat langsung diakses oleh browser pengunjung.

---

## Database Design

### Tabel `media`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Media |
| `filename` | text | not null | Nama file unik tersimpan |
| `original_name`| text | not null | Nama file asli saat diunggah |
| `mime_type` | text | not null | Tipe MIME (misal: image/webp) |
| `size_bytes` | bigint | not null | Ukuran file dalam bytes |
| `public_url` | text | not null | URL CDN Supabase publik |
| `storage_path` | text | not null | Path lokasi file di Supabase bucket |
| `category` | text | default 'general' | Enum: avatar, project, certificate, resume, general |
| `created_at` | timestamptz | not null | Waktu upload |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/media/upload` | Upload satu berkas ke Supabase Storage | Authenticated | 201 |
| **GET** | `/api/media` | Ambil daftar galeri media | Authenticated | 200 |
| **DELETE**| `/api/media/:id` | Hapus file dari database dan Storage | Authenticated | 200 |

### Sample JSON Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "m1e2d3i4-0000-0000-0000-000000000001",
    "filename": "1735000000-project-dashboard.webp",
    "original_name": "project-dashboard.webp",
    "mime_type": "image/webp",
    "size_bytes": 145200,
    "public_url": "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/projects/1735000000-project-dashboard.webp",
    "storage_path": "projects/1735000000-project-dashboard.webp",
    "category": "project"
  },
  "message": "Berkas berhasil diunggah ke storage"
}
```

---

## Validation & Security Rules
- **Whitelist Tipe MIME:** Hanya menerima `image/png`, `image/jpeg`, `image/jpg`, `image/webp`, `image/svg+xml`, dan `application/pdf`.
- **Batas Ukuran:** Maksimal 5 MB (5.242.880 bytes) per berkas.
- Nama berkas di-sanitasi dan ditambahkan timestamp unik untuk mencegah penimpaan (*overwrite*) berkas yang memiliki nama sama.
