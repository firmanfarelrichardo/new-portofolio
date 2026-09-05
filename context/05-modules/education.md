# MODULE: EDUCATION & ACADEMIC BACKGROUND

## Overview
Modul Education menyajikan riwayat pendidikan formal, gelar akademik, bidang studi, predikat kelulusan (IPK/honors), aktivitas keorganisasian kampus, dan proyek akhir pemilik situs.

---

## Objectives
- Memberikan bukti latar belakang akademik yang solid dan relevan dengan bidang rekayasa perangkat lunak.
- Menyediakan sarana di panel CMS untuk memperbarui riwayat pendidikan dan publikasi akademis.

---

## Stakeholders
### Public Visitor
Meninjau kualifikasi pendidikan, institusi tempat belajar, dan prestasi akademik.
### Admin / Owner (Firman Farel)
Melakukan operasi CRUD pada data riwayat pendidikan.

---

## Functional Requirements
### FR-EDUC-001: Academic Timeline Presentation
Halaman publik menampilkan kartu riwayat pendidikan yang mencakup nama institusi/universitas, jenjang dan gelar (*degree*, contoh: *Sarjana Komputer / B.Comp.Sci.*), bidang studi (*field of study*), rentang tahun, predikat kehormatan (IPK jika dicantumkan), serta ringkasan aktivitas akademik penting.
### FR-EDUC-002: CMS Education CRUD
Panel CMS menyediakan antarmuka untuk menambah, menyunting, dan menghapus riwayat pendidikan.

---

## Database Design

### Tabel `education`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Pendidikan |
| `institution` | text | not null | Nama Perguruan Tinggi / Sekolah |
| `degree` | text | not null | Jenjang & Gelar (misal: S1 Ilmu Komputer)|
| `field_of_study`| text | not null | Jurusan / Konsentrasi |
| `start_date` | date | not null | Tanggal mulai studi |
| `end_date` | date | nullable | Tanggal kelulusan (null jika masih kuliah)|
| `is_current` | boolean | default false | Flag masih menempuh studi |
| `grade` | text | nullable | IPK / Predikat (contoh: 3.85 / 4.00) |
| `description` | text | nullable | Deskripsi tesis/skripsi, riset, atau fokus studi |
| `display_order` | int | default 0 | Urutan sorting |
| `created_at` | timestamptz | not null | Timestamp |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/education` | Ambil riwayat pendidikan | Public | 200 |
| **POST** | `/api/education` | Tambah entri pendidikan | Authenticated | 201 |
| **PUT** | `/api/education/:id` | Update data pendidikan | Authenticated | 200 |
| **DELETE**| `/api/education/:id` | Hapus entri pendidikan | Authenticated | 200 |

### Sample JSON Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "d4e5f6a1-0000-0000-0000-000000000004",
      "institution": "Universitas Negeri / Swasta Terkemuka",
      "degree": "Sarjana Komputer (S.Kom)",
      "field_of_study": "Teknik Informatika / Software Engineering",
      "start_date": "2021-08-01",
      "end_date": "2025-07-30",
      "is_current": false,
      "grade": "GPA 3.88 / 4.00 (Cum Laude)",
      "description": "Fokus riset pada arsitektur sistem terdistribusi, machine learning, dan web performance optimization."
    }
  ],
  "message": "Riwayat pendidikan berhasil dimuat"
}
```

---

## UI / UX Requirements
- Tampilan kartu bersih dengan logo institusi opsional dan penanda rentang tahun yang jelas.
- Menyediakan badge khusus untuk predikat kelulusan (*Honors / Cum Laude*).
