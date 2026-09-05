# MODULE: ACHIEVEMENTS & AWARDS

## Overview
Modul Achievements mengelola rekam jejak prestasi kompetisi, kejuaraan hackathon, beasiswa, publikasi riset ilmiah, dan rekognisi kehormatan khusus yang diraih pemilik situs secara terpisah dari sertifikasi pelatihan reguler.

---

## Objectives
- Menyorot pencapaian berprestasi tinggi guna memperkuat daya saing dan kredibilitas profesional.
- Memisahkan prestasi berbasis kompetisi/rekognisi dari sertifikat kursus biasa.
- Mengelola data dan dokumentasi foto penghargaan secara mandiri via CMS.

---

## Stakeholders
### Public Visitor
Meninjau daftar penghargaan, melihat foto penerimaan penghargaan, dan membaca tautan berita/publikasi terkait.
### Admin / Owner (Firman Farel)
Melakukan operasi CRUD pada data pencapaian dan mengunggah dokumentasi visual.

---

## Functional Requirements
### FR-ACHV-001: Honors & Awards Showcase
Halaman publik menyajikan kartu pencapaian berprestasi yang mencakup nama penghargaan (misal: *Juara 1 Hackathon Nasional*), penyelenggara, tanggal event, kategori (*Competition, Award, Scholarship, Publication*), deskripsi pencapaian, dokumentasi foto, dan tautan berita/sertifikat eksternal.
### FR-ACHV-002: CMS Achievements CRUD
Panel CMS menyediakan formulir untuk menginputkan data prestasi baru beserta kategori dan bukti foto.

---

## Database Design

### Tabel `achievements`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Prestasi |
| `title` | text | not null | Judul Prestasi / Penghargaan |
| `organizer` | text | not null | Lembaga Penyelenggara |
| `event_date` | date | not null | Tanggal Perolehan |
| `category` | text | default 'competition' | Enum: competition, award, publication, scholarship, recognition |
| `description` | text | nullable | Deskripsi kompetisi dan kontribusi |
| `image_url` | text | nullable | Foto dokumentasi saat menerima penghargaan |
| `certificate_url`| text | nullable | Tautan bukti sertifikat / publikasi |
| `display_order` | int | default 0 | Urutan sorting |
| `created_at` | timestamptz | not null | Timestamp |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/achievements` | Ambil seluruh daftar prestasi | Public | 200 |
| **POST** | `/api/achievements` | Tambah data prestasi baru | Authenticated | 201 |
| **PUT** | `/api/achievements/:id` | Update data prestasi | Authenticated | 200 |
| **DELETE**| `/api/achievements/:id` | Hapus data prestasi | Authenticated | 200 |

### Sample JSON Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "f6a1b2c3-0000-0000-0000-000000000006",
      "title": "1st Place Winner – National Hackathon 2025",
      "organizer": "Kementerian Komunikasi & Informatika",
      "event_date": "2025-08-20",
      "category": "competition",
      "description": "Mengembangkan solusi AI analitik rekam medis untuk fasilitas kesehatan daerah terpencil dengan performa offline-first.",
      "image_url": "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/awards/hackathon-winner.webp",
      "certificate_url": "https://news.example.com/firman-farel-hackathon-champion"
    }
  ],
  "message": "Daftar prestasi berhasil dimuat"
}
```

---

## UI / UX Requirements
- Menampilkan badge kategori berkilau (*subtle gradient badge*) untuk membedakan hackathon, beasiswa, dan publikasi.
- Desain kartu interaktif dengan tipografi yang menonjolkan nama penghargaan dan institusi penyelenggara.
