# MODULE: SETTINGS & GLOBAL SEO

## Overview
Modul Settings & Global SEO mengelola konfigurasi situs secara menyeluruh, mencakup judul situs default, deskripsi meta, kata kunci (*keywords*), gambar Open Graph (*OG Image*), status mode pemeliharaan (*maintenance mode*), dan konfigurasi kontak global.

---

## Objectives
- Menyediakan antarmuka terpusat bagi pemilik situs untuk mengubah metadata SEO global tanpa menyentuh source code.
- Mengoptimalkan keterindeksan website di mesin pencari (Google) dan tampilan kartu pratinjau media sosial (OpenGraph / Twitter Card).

---

## Stakeholders
### Public Visitor & Web Crawlers
Membaca meta tags di header HTML, favicon, dan OpenGraph saat tautan dibagikan di WhatsApp, LinkedIn, atau Twitter/X.
### Admin / Owner (Firman Farel)
Menyunting konfigurasi umum dan meta tags melalui CMS.

---

## Functional Requirements
### FR-SET-001: Global SEO Configuration
Pengaturan judul website default, deskripsi website default, kata kunci (*keywords array*), dan URL gambar Open Graph yang akan disuntikkan secara dinamis ke `<head>` HTML di sisi client/server.
### FR-SET-002: Maintenance Mode Toggle
CMS menyediakan saklar (*toggle switch*) untuk mengaktifkan halaman *Under Maintenance* sementara jika situs sedang mengalami pembaruan sistem besar.
### FR-SET-003: CMS Settings Form
Halaman `/admin/settings` menyediakan formulir terpadu untuk menyunting seluruh parameter pengaturan ini.

---

## Database Design

### Tabel `settings`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Pengaturan (Singleton) |
| `site_title` | text | not null | Judul default website |
| `site_description`| text | nullable | Deskripsi default SEO |
| `og_image_url` | text | nullable | URL gambar Open Graph (1200x630) |
| `keywords` | text[] | default '{}' | Daftar kata kunci meta |
| `maintenance_mode`| boolean | default false | Flag mode pemeliharaan |
| `updated_at` | timestamptz | not null | Waktu pembaruan |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/settings` | Ambil konfigurasi publik & metadata SEO | Public | 200 |
| **PUT** | `/api/settings` | Update konfigurasi global & SEO | Authenticated | 200 |

### Sample JSON Response (200 OK)
```json
{
  "success": true,
  "data": {
    "site_title": "Firman Farel — Software Engineer & Full-Stack Developer",
    "site_description": "Portofolio profesional Firman Farel, menampilkan studi kasus rekayasa perangkat lunak modern, arsitektur scalable, dan rekam jejak teknis.",
    "og_image_url": "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/og-preview.png",
    "keywords": ["software engineer", "full stack developer", "react", "typescript", "node.js", "firman farel", "portfolio"],
    "maintenance_mode": false
  },
  "message": "Pengaturan situs berhasil dimuat"
}
```

---

## UI / UX Requirements
- Form pengaturan dilengkapi pratinjau langsung (*Live Preview Card*) bagaimana tampilan link website ketika dibagikan di Google Search dan media sosial.
- Tombol simpan perubahan memberikan notifikasi toast konfirmasi.
