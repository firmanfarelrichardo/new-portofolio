# MODULE: EXPERIENCE & CAREER TIMELINE

## Overview
Modul Experience mengelola linimasa rekam jejak profesional, pekerjaan purnawaktu/paruh waktu, magang (*internship*), pengalaman kepengurusan organisasi, kepanitiaan, riset akademis, dan keterlibatan kompetisi.

---

## Objectives
- Menyajikan perjalanan karier dan kontribusi organisasi pemilik situs dalam format linimasa kronologis yang mudah dipindai recruiter.
- Mendokumentasikan tanggung jawab, dampak kerja, dan tumpukan teknologi yang digunakan pada setiap posisi.

---

## Stakeholders
### Public Visitor
Membaca linimasa riwayat pekerjaan, melihat durasi masa kerja, dan meninjau pencapaian di setiap peran.
### Admin / Owner (Firman Farel)
Melakukan operasi CRUD pada entri pengalaman, menyusun daftar poin pencapaian (*bullet achievements*), dan mengatur urutan tampilan.

---

## Functional Requirements
### FR-EXPR-001: Interactive Timeline Display
Halaman publik menampilkan linimasa vertikal dengan penanda titik waktu (*timeline dot*), nama posisi/jabatan, nama perusahaan/organisasi, lokasi, tipe pengalaman (badge: *Work, Internship, Organization, Freelance*), serta rentang waktu (bulan/tahun mulai hingga selesai atau badge aktif *Present*).
### FR-EXPR-002: Achievement Bullets & Tech Tags
Setiap entri memuat daftar poin pencapaian terukur (*measurable impact*) dan tag teknologi yang diaplikasikan.
### FR-EXPR-003: CMS Experience CRUD
Panel CMS menyediakan form untuk mencatat entri riwayat baru, mengedit durasi, dan mengurutkan posisi.

---

## Database Design

### Tabel `experiences`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Pengalaman |
| `position` | text | not null | Jabatan / Peran |
| `organization` | text | not null | Nama Perusahaan / Organisasi |
| `type` | text | not null, default 'work' | Enum: work, internship, organization, freelance, competition |
| `location` | text | nullable | Kota / Negara / Remote |
| `start_date` | date | not null | Tanggal mulai |
| `end_date` | date | nullable | Tanggal selesai (null jika masih aktif) |
| `is_current` | boolean | default false | Flag peran aktif saat ini |
| `description` | text | nullable | Deskripsi ringkas tanggung jawab |
| `achievements` | text[] | default '{}' | Array poin-poin pencapaian |
| `technologies` | text[] | default '{}' | Array nama teknologi yang digunakan |
| `display_order`| int | default 0 | Urutan sorting |
| `created_at` | timestamptz | not null | Timestamp |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/experiences` | Ambil seluruh data pengalaman (urutkan start_date desc) | Public | 200 |
| **POST** | `/api/experiences` | Tambah entri pengalaman baru | Authenticated | 201 |
| **PUT** | `/api/experiences/:id` | Update data pengalaman | Authenticated | 200 |
| **DELETE**| `/api/experiences/:id` | Hapus entri pengalaman | Authenticated | 200 |

### Sample JSON Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "c3d4e5f6-0000-0000-0000-000000000003",
      "position": "Lead Software Engineer",
      "organization": "Tech Innovation Lab",
      "type": "work",
      "location": "Jakarta, Indonesia (Hybrid)",
      "start_date": "2024-03-01",
      "end_date": null,
      "is_current": true,
      "description": "Memimpin arsitektur dan pengembangan aplikasi web skala penuh menggunakan React dan Node.js.",
      "achievements": [
        "Meningkatkan kecepatan loading halaman sebesar 35% melalui strategi code splitting dan WebP asset delivery.",
        "Mengembangkan REST API mikro dengan latensi P95 < 200ms."
      ],
      "technologies": ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"]
    }
  ],
  "message": "Daftar pengalaman berhasil dimuat"
}
```

---

## UI / UX Requirements
- Desain linimasa vertikal dengan garis pemandu halus dan penanda titik aktif bercahaya (*glowing indicator*) untuk peran yang sedang berlangsung (`is_current = true`).
- Poin pencapaian menggunakan ikon bullet yang elegan dan mudah dibaca.
