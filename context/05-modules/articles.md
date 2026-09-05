# MODULE: ARTICLES & TECHNICAL BLOG (PHASE 2)

## Overview
Modul Articles & Technical Blog direncanakan untuk Fase 2 pasca-MVP. Modul ini memungkinkan pemilik situs mempublikasikan tulisan teknis mendalam, ulasan arsitektur perangkat lunak, tutorial kode, dan dokumentasi riset guna membangun otoritas dan kredibilitas teknis (*technical credibility*).

---

## Objectives
- Membangun otoritas teknis dan personal branding sebagai thought leader di bidang software engineering.
- Menyediakan artikel publik dengan format Markdown, syntax highlighting cuplikan kode, dan estimasi waktu baca (*reading time*).
- Mengelola artikel teknis melalui editor Markdown di panel CMS.

---

## Stakeholders
### Public Visitor
Membaca artikel teknis, menyalin cuplikan kode, memfilter artikel berdasarkan tags/kategori, dan membagikan tulisan ke media sosial.
### Admin / Owner (Firman Farel)
Menulis draf artikel, menyunting konten Markdown, mengatur gambar sampul, mengelola tags, dan mempublikasikan tulisan.

---

## Functional Requirements
### FR-ART-001: Technical Blog Catalog & Reader
Halaman `/articles` menampilkan daftar artikel dengan thumbnail, judul, tanggal publikasi, kategori, tags, dan waktu baca. Halaman `/articles/:slug` menampilkan konten penuh dengan styling tipografi artikel yang nyaman dan syntax highlighting.
### FR-ART-002: Markdown Content Rendering
Mendukung elemen standar Markdown (headings, lists, blockquotes, tables, inline code, dan syntax highlighted code blocks).
### FR-ART-003: CMS Markdown Editor & Workflow
Panel CMS di `/admin/articles` menyediakan editor Markdown dengan pratinjau live (*split preview*) dan status publikasi (`Draft` vs `Published`).

---

## Database Design

### Tabel `articles`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Artikel |
| `title` | text | not null | Judul artikel |
| `slug` | text | not null, unique | Slug ramah SEO |
| `excerpt` | text | not null | Ringkasan isi 2-3 kalimat |
| `content_md` | text | not null | Isi artikel format Markdown |
| `cover_image_url`| text | nullable | Gambar banner artikel |
| `category` | text | default 'Engineering' | Kategori utama |
| `tags` | text[] | default '{}' | Array label tag teknis |
| `reading_time_mins`| int | default 5 | Estimasi menit membaca |
| `status` | text | default 'draft' | Enum: draft, published, archived |
| `published_at` | timestamptz | nullable | Tanggal rilis publik |
| `created_at` | timestamptz | not null | Waktu dibuat |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/articles` | Ambil daftar artikel published | Public | 200 |
| **GET** | `/api/articles/:slug` | Ambil detail isi artikel | Public | 200 / 404 |
| **POST** | `/api/articles` | Buat draft artikel baru | Authenticated | 201 |
| **PUT** | `/api/articles/:id` | Update artikel | Authenticated | 200 |
| **DELETE**| `/api/articles/:id` | Hapus artikel | Authenticated | 200 |

---

## UI / UX Requirements
- Rendering kode menggunakan tema gelap (*dark theme syntax highlighting*) dengan tombol "Copy Code" di sudut kanan atas blok kode.
- Tipografi menggunakan jenis font sans-serif dengan spasi baris 1.7x untuk kenyamanan membaca artikel panjang.
