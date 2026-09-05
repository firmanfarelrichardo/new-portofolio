# Global REST API Standards

## Authentication Standard
1. **Bearer Token Authentication:** Seluruh endpoint terproteksi (`/api/admin/*` atau mutasi CMS) membutuhkan header HTTP:
   ```http
   Authorization: Bearer <SUPABASE_JWT_ACCESS_TOKEN>
   ```
2. **Middleware Verification:** Express middleware membaca Bearer token dan memverifikasi integritasnya via `supabase.auth.getUser(token)`.
3. Jika token tidak ada atau tidak valid, server mengembalikan status HTTP `401 Unauthorized`.

---

## Global Response Formats

### 1. Success Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Operasi berhasil dieksekusi",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45
  }
}
```
*Catatan: Kolom `meta` bersifat opsional dan disertakan saat mengembalikan daftar data terpaginasi.*

### 2. Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Payload yang dikirimkan tidak valid",
    "details": [
      {
        "field": "email",
        "message": "Format alamat email tidak valid"
      }
    ]
  }
}
```

---

## Global Endpoint List

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Healthcheck server API | Public | 200 |
| **GET** | `/api/profile` | Ambil data profil publik & resume link | Public | 200 |
| **PUT** | `/api/profile` | Update data profil & bio | Authenticated | 200 |
| **GET** | `/api/skills` | Ambil daftar skill terkategori | Public | 200 |
| **POST**| `/api/skills` | Tambah skill baru | Authenticated | 201 |
| **PUT** | `/api/skills/:id` | Edit skill | Authenticated | 200 |
| **DELETE**| `/api/skills/:id` | Hapus skill | Authenticated | 200 |
| **GET** | `/api/projects` | Ambil daftar proyek publik | Public | 200 |
| **GET** | `/api/projects/:slug` | Ambil detail studi kasus proyek | Public | 200 / 404 |
| **POST**| `/api/projects` | Buat proyek baru | Authenticated | 201 |
| **PUT** | `/api/projects/:id` | Edit data proyek | Authenticated | 200 |
| **DELETE**| `/api/projects/:id` | Hapus data proyek | Authenticated | 200 |
| **GET** | `/api/experiences` | Ambil linimasa pengalaman | Public | 200 |
| **POST**| `/api/experiences` | Tambah riwayat pengalaman | Authenticated | 201 |
| **PUT** | `/api/experiences/:id`| Edit riwayat pengalaman | Authenticated | 200 |
| **DELETE**| `/api/experiences/:id`| Hapus pengalaman | Authenticated | 200 |
| **GET** | `/api/education` | Ambil riwayat pendidikan | Public | 200 |
| **POST**| `/api/education` | Tambah riwayat pendidikan | Authenticated | 201 |
| **GET** | `/api/certificates` | Ambil daftar sertifikat | Public | 200 |
| **POST**| `/api/certificates` | Tambah sertifikat baru | Authenticated | 201 |
| **GET** | `/api/achievements` | Ambil daftar penghargaan | Public | 200 |
| **POST**| `/api/achievements` | Tambah penghargaan baru | Authenticated | 201 |
| **POST**| `/api/contact` | Kirim pesan dari form publik | Public (Rate Limited) | 201 |
| **GET** | `/api/messages` | Ambil inbox pesan kontak | Authenticated | 200 |
| **PATCH**| `/api/messages/:id/status`| Update status pesan (read/archived)| Authenticated | 200 |
| **POST**| `/api/media/upload` | Upload aset ke Supabase Storage | Authenticated | 201 |
| **GET** | `/api/media` | Ambil galeri media yang diunggah | Authenticated | 200 |
| **GET** | `/api/dashboard/metrics` | Ambil agregat metrik counter CMS | Authenticated | 200 |
| **GET** | `/api/settings` | Ambil konfigurasi global & SEO | Public | 200 |
| **PUT** | `/api/settings` | Update konfigurasi global & SEO | Authenticated | 200 |

---

## Sample JSON Responses

### 1. Success Response (Single Item: Detail Proyek)
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-0000-0000-0000-000000000001",
    "title": "Medical Electronic Record System",
    "slug": "mer-system",
    "summary": "Platform rekam medis elektronik terintegrasi berbasis microservices.",
    "thumbnail_url": "https://xyz.supabase.co/storage/v1/object/public/projects/mer-thumb.webp",
    "technologies": ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    "status": "published",
    "is_featured": true,
    "demo_url": "https://mer.example.com",
    "repo_url": "https://github.com/firmanfarel/mer-system",
    "completed_at": "2025-11-20"
  },
  "message": "Detail proyek berhasil diambil"
}
```

### 2. Empty State Response
```json
{
  "success": true,
  "data": [],
  "message": "Belum ada data yang tersedia",
  "meta": {
    "total": 0
  }
}
```

### 3. Validation Error Response (400 Bad Request)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data input tidak memenuhi validasi",
    "details": [
      {
        "field": "title",
        "message": "Judul proyek wajib diisi minimal 5 karakter"
      },
      {
        "field": "slug",
        "message": "Format slug hanya boleh berupa huruf kecil, angka, dan strip (-)"
      }
    ]
  }
}
```

### 4. Authorization Error Response (401 Unauthorized)
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Sesi Anda tidak valid atau telah kedaluwarsa. Silakan login kembali."
  }
}
```

### 5. System Error Response (500 Internal Server Error)
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Terjadi kesalahan internal pada server. Silakan coba beberapa saat lagi."
  }
}
```

---

## Validation & Pagination Standard
- **Skema Validasi:** Seluruh request payload wajib divalidasi menggunakan skema Zod sebelum diproses di controller.
- **Query Parameter Paginasi:**
  - `page`: nomor halaman (default: `1`).
  - `limit`: jumlah data per halaman (default: `10`, maksimal: `50`).
  - `status`: filter status (`published`, `draft`, `archived`).
  - `category`: filter berdasarkan kategori atau tag.
