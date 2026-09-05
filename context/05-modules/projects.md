# MODULE: PROJECTS & CASE STUDIES (CORE FEATURE)

## Overview
Modul Projects & Case Studies merupakan fitur inti (*core feature*) dari portofolio personal Firman Farel. Modul ini menyajikan katalog proyek perangkat lunak dan studi kasus rekayasa mendalam mencakup latar belakang masalah, arsitektur solusi, tantangan teknis, galeri antarmuka, dan tautan demo/repositori langsung.

---

## Objectives
- Mendemonstrasikan kapabilitas rekayasa perangkat lunak pemilik melalui studi kasus komprehensif.
- Memberikan pengalaman eksplorasi interaktif bagi pengunjung (filter kategori, pencarian, galeri gambar).
- Mengelola siklus hidup proyek (Draft, Published, Archived) dari panel CMS.

---

## Stakeholders
### Public Visitor
Melihat daftar kartu proyek, melakukan pencarian/filter teknologi, dan membaca studi kasus lengkap di `/projects/:slug`.
### Admin / Owner (Firman Farel)
Melakukan operasi CRUD pada proyek, mengunggah galeri gambar, menyusun deskripsi studi kasus dalam format Markdown, dan mengatur status publikasi.

---

## Functional Requirements
### FR-PROJ-001: Project Catalog Presentation
Halaman `/projects` menampilkan grid kartu proyek publik mencakup gambar thumbnail, judul, ringkasan 2 kalimat, badge daftar teknologi, tahun pengerjaan, dan tombol aksi (Demo & Detail).
### FR-PROJ-002: Client-Side Filter & Search
Pengunjung dapat memfilter proyek berdasarkan kategori/teknologi dan mencari berdasarkan judul secara instan di browser.
### FR-PROJ-003: Deep-Dive Case Study Page (`/projects/:slug`)
Halaman detail berbasis slug ramah SEO menyajikan:
- Banner utama & Carousel/Lightbox Galeri Tangkapan Layar.
- *Problem Statement* (Latar Belakang Permasalahan).
- *Solution & Architecture* (Desain Solusi & Arsitektur Sistem).
- *Key Features* (Fitur-fitur Utama).
- *Technical Challenges & Learnings* (Tantangan Rekayasa & Solusinya).
- *Outcome & Impact* (Hasil, Metrik, atau Dampak Proyek).
- Tautan Live Demo, Repository GitHub, dan Dokumentasi API.
### FR-PROJ-004: CMS Project Workflow (Draft / Published / Archived)
Halaman `/admin/projects` mendukung penyuntingan status:
- `draft`: Proyek sedang dikerjakan; tidak tampak pada katalog publik.
- `published`: Proyek aktif dan tampil di halaman publik.
- `archived`: Proyek diarsipkan; URL langsung dapat diakses hanya jika diizinkan, tetapi disembunyikan dari katalog utama.
### FR-PROJ-005: Featured Project Flagging
CMS mengizinkan penandaan *is_featured* untuk menampilkan maksimal 3–4 proyek terbaik di homepage utama.

---

## Database Design

### Tabel `projects`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Proyek |
| `title` | text | not null | Judul proyek |
| `slug` | text | not null, unique | Slug ramah SEO |
| `summary` | text | not null | Ringkasan singkat |
| `description_md` | text | nullable | Deskripsi naratif Markdown |
| `thumbnail_url` | text | nullable | URL thumbnail utama |
| `gallery_urls` | text[] | default '{}' | Array URL galeri gambar |
| `problem_statement` | text | nullable | Pernyataan masalah |
| `solution` | text | nullable | Solusi rekayasa |
| `features` | text[] | default '{}' | Daftar fitur utama |
| `challenges` | text | nullable | Tantangan teknis |
| `outcome` | text | nullable | Hasil / dampak |
| `technologies` | text[] | default '{}' | Array nama teknologi yang dipakai |
| `demo_url` | text | nullable | URL live demo |
| `repo_url` | text | nullable | URL repositori kode |
| `status` | text | default 'published' | Enum: 'draft', 'published', 'archived' |
| `is_featured` | boolean | default false | Flag sorot di homepage |
| `completed_at` | date | nullable | Tanggal selesai proyek |
| `created_at` | timestamptz | not null | Waktu dibuat |
| `updated_at` | timestamptz | not null | Waktu diupdate |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/projects` | Ambil daftar proyek (filter: status=published untuk publik) | Public | 200 |
| **GET** | `/api/projects/:slug` | Ambil detail studi kasus proyek berdasarkan slug | Public | 200 / 404 |
| **POST** | `/api/projects` | Buat proyek baru | Authenticated | 201 |
| **PUT** | `/api/projects/:id` | Update data proyek | Authenticated | 200 |
| **DELETE**| `/api/projects/:id` | Hapus proyek | Authenticated | 200 |

### Sample JSON Response (GET /api/projects/:slug)
```json
{
  "success": true,
  "data": {
    "id": "b2c3d4e5-0000-0000-0000-000000000002",
    "title": "Medical Electronic Record (MER) Platform",
    "slug": "mer-platform",
    "summary": "Platform rekam medis berbasis cloud untuk otomatisasi pencatatan data pasien di fasilitas kesehatan primer.",
    "problem_statement": "Klinik primer menghadapi lambatnya pencarian riwayat medis fisik dan tingginya risiko salah diagnosa akibat inkonsistensi berkas kertas.",
    "solution": "Membangun sistem rekam medis elektronik terpusat dengan enkripsi data saat istirahat dan antarmuka input cepat berbasis keyboard-first.",
    "features": [
      "Pencarian rekam medis pasien instan < 100ms",
      "Validasi resep obat otomatis untuk mencegah interaksi berbahaya",
      "Audit trail lengkap untuk setiap perubahan riwayat klinis"
    ],
    "challenges": "Mengoptimalkan latensi query basis data pada jutaan baris riwayat kunjungan dengan indexing komposit PostgreSQL.",
    "outcome": "Memangkas waktu tunggu pasien sebesar 40% dan mengeliminasi kehilangan berkas fisik secara total.",
    "technologies": ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Supabase"],
    "thumbnail_url": "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/mer-thumb.webp",
    "gallery_urls": [
      "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/mer-1.webp",
      "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/mer-2.webp"
    ],
    "demo_url": "https://mer.firmanfarel.site",
    "repo_url": "https://github.com/firmanfarel/mer-platform",
    "status": "published",
    "is_featured": true,
    "completed_at": "2025-10-15"
  },
  "message": "Detail proyek berhasil dimuat"
}
```

---

## UI / UX Requirements
- Kartu proyek memiliki transisi elevasi saat kursor melayang (*hover translateY & shadow effect*).
- Galeri tangkapan layar mendukung tampilan lightbox modal saat gambar diklik.
- Teks studi kasus diformat dengan tipografi yang nyaman dibaca (line-height 1.6, ukuran font minimal 16px).

---

## Validation & Security Rules
- Slug wajib unik, hanya berisi huruf kecil alfanumerik dan tanda hubung (`^[a-z0-9-]+$`).
- Proyek berstatus `draft` wajib ditolak oleh query publik via RLS PostgreSQL (`status = 'published'`).
- Deskripsi markdown disanitasi sebelum di-render guna menangkal injeksi XSS.
