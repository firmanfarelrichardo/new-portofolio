# MODULE: PROFILE & PERSONAL IDENTITY

## Overview
Modul Profile mengelola identitas profesional pemilik situs, mencakup nama lengkap, headline, ringkasan bio, bio lengkap, foto avatar profil, lokasi domisili, tautan akun media sosial, status ketersediaan kerja, serta pengelolaan berkas Curriculum Vitae (CV) / Resume PDF.

---

## Objectives
- Menyajikan personal branding Firman Farel secara profesional di halaman muka publik.
- Memungkinkan pengunjung mengunduh berkas resume PDF terbaru.
- Memberikan antarmuka bagi pemilik di CMS untuk memperbarui data biografi dan berkas CV secara instan.

---

## Stakeholders
### Public Visitor
Melihat profil, membaca biografi, menyalin tautan sosial, dan mengunduh berkas resume.
### Admin / Owner (Firman Farel)
Menyunting teks profil, mengganti avatar, memperbarui tautan sosial, dan mengunggah berkas CV baru.

---

## Functional Requirements
### FR-PROF-001: Public Profile Presentation
Halaman publik menampilkan nama, headline profesional, bio ringkas (hero), bio naratif (about section), avatar beresolusi tinggi, status ketersediaan kerja (*Available for Hire badge*), dan icon link sosial (GitHub, LinkedIn, Instagram, Email).
### FR-PROF-002: Resume PDF Download
Tombol "Download Resume" di navbar publik dan hero section mengunduh berkas PDF resume aktif yang tersimpan di Supabase Storage.
### FR-PROF-003: CMS Profile Management
Halaman `/admin/profile` menyediakan formulir pengubahan data profil, penggantian foto profil, dan upload berkas PDF resume baru.

---

## Database Design
Tabel `profiles` menampung satu baris data (singleton) untuk akun pemilik:

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, FK auth.users | ID akun pemilik |
| `name` | text | not null | Nama lengkap |
| `headline` | text | nullable | Headline profesional |
| `bio_short` | text | nullable | Bio singkat 1-2 kalimat untuk hero |
| `bio_full` | text | nullable | Bio naratif lengkap untuk halaman about |
| `avatar_url` | text | nullable | URL publik foto profil di Supabase Storage |
| `location` | text | default 'Indonesia'| Domisili |
| `email` | text | nullable | Email kontak publik |
| `resume_url` | text | nullable | URL publik file PDF resume |
| `available_for_hire`| boolean | default true | Status ketersediaan kerja |
| `social_links` | jsonb | default '{}' | JSON link sosial (github, linkedin, instagram) |
| `updated_at` | timestamptz | not null | Waktu pembaruan terakhir |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/profile` | Ambil data profil publik | Public | 200 |
| **PUT** | `/api/profile` | Update data profil dan tautan resume | Authenticated | 200 |

### Sample JSON Response (200 OK)
```json
{
  "success": true,
  "data": {
    "name": "Firman Farel",
    "headline": "Software Engineer & Full-Stack Developer",
    "bio_short": "Membangun sistem web modern, cepat, dan scalable dengan standar rekayasa perangkat lunak tinggi.",
    "avatar_url": "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/avatar.webp",
    "location": "Jakarta, Indonesia",
    "email": "contact@firmanfarel.site",
    "resume_url": "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/resume-firman.pdf",
    "available_for_hire": true,
    "social_links": {
      "github": "https://github.com/firmanfarel",
      "linkedin": "https://linkedin.com/in/firmanfarel",
      "instagram": "https://instagram.com/firmanfarel"
    }
  },
  "message": "Profil berhasil dimuat"
}
```

---

## Validation & Security Rules
- Pengunggahan resume hanya menerima tipe MIME `application/pdf` dengan batas ukuran maksimal 5 MB.
- URL tautan sosial harus diawali dengan format HTTPS yang valid.
- Endpoint `PUT /api/profile` dilindungi oleh auth middleware.

---

## Testing Scenarios
- Public GET profil mengembalikan seluruh field publik tanpa mengekspos data internal.
- Tombol download resume mengarahkan langsung ke file PDF yang valid.
