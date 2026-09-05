# MODULE: SKILLS MANAGEMENT

## Overview
Modul Skills Management mengatur pengelompokan dan penayangan keahlian teknis, bahasa pemrograman, framework, basis data, dan kakas (*tools*) yang dikuasai oleh pemilik situs.

---

## Objectives
- Memamerkan kompetensi teknis secara terorganisir per kategori logis.
- Menyediakan fleksibilitas bagi pemilik di CMS untuk menambah teknologi baru dan mengubah urutan tampilan.

---

## Stakeholders
### Public Visitor
Meninjau daftar keahlian, ikon teknologi, dan tingkat kemahiran.
### Admin / Owner (Firman Farel)
Melakukan operasi CRUD pada kategori keahlian dan item keahlian.

---

## Functional Requirements
### FR-SKIL-001: Public Skills Display by Category
Public portal menampilkan keahlian yang dikelompokkan berdasarkan kategori (contoh: *Programming Languages, Frontend, Backend, Database, Cloud & DevOps, Tools*).
### FR-SKIL-002: Skill Item Details
Setiap item keahlian menampilkan nama teknologi, ikon resmi (SVG/URL), tag tingkat kemahiran (*Beginner, Intermediate, Advanced*), dan penanda *is_featured* untuk disorot di homepage.
### FR-SKIL-003: CMS Skills & Category CRUD
Panel CMS di `/admin/skills` menyediakan form CRUD untuk menambah kategori baru dan item skill, serta pengaturan urutan tampilan (*display order*).

---

## Database Design

### 1. Tabel `skill_categories`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Kategori |
| `name` | text | not null | Nama kategori |
| `slug` | text | not null, unique | Slug kategori |
| `display_order` | int | default 0 | Urutan sorting |
| `created_at` | timestamptz | not null | Timestamp |

### 2. Tabel `skills`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Skill |
| `category_id` | uuid | FK skill_categories(id) | Relasi ke kategori |
| `name` | text | not null | Nama teknologi (contoh: TypeScript) |
| `icon_url` | text | nullable | URL ikon aset |
| `proficiency_level` | text | default 'Intermediate' | Kemahiran |
| `display_order` | int | default 0 | Urutan sorting |
| `is_featured` | boolean | default false | Disorot di homepage |
| `created_at` | timestamptz | not null | Timestamp |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/skills` | Ambil seluruh skill beserta kategorinya | Public | 200 |
| **POST** | `/api/skills` | Tambah item skill baru | Authenticated | 201 |
| **PUT** | `/api/skills/:id` | Update data skill | Authenticated | 200 |
| **DELETE**| `/api/skills/:id` | Hapus item skill | Authenticated | 200 |
| **POST** | `/api/skills/categories` | Tambah kategori skill baru | Authenticated | 201 |

### Sample JSON Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "category": "Frontend",
      "slug": "frontend",
      "skills": [
        {
          "id": "uuid-1",
          "name": "React",
          "proficiency_level": "Advanced",
          "icon_url": "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/icons/react.svg",
          "is_featured": true
        },
        {
          "id": "uuid-2",
          "name": "TypeScript",
          "proficiency_level": "Advanced",
          "icon_url": "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/icons/typescript.svg",
          "is_featured": true
        }
      ]
    }
  ],
  "message": "Daftar keahlian berhasil dimuat"
}
```

---

## UI / UX Requirements
- Tampilan grid responsif dengan efek hover mikro pada kartu skill.
- Ikon teknologi dimuat secara proporsional (ukuran 24x24 atau 32x32 piksel).
- Mendukung mode gelap (*dark aesthetic*) dengan kontras visual tajam.
