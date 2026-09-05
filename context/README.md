# Firman Farel Personal Portfolio CMS (`firmanfarel.site`)

## Overview
Repositori ini memuat *Knowledge Base*, *AI Context Repository*, dan *Single Source of Truth* (SSOT) untuk proyek website **Firman Farel Personal Portfolio CMS** (`firmanfarel.site`). Sistem ini menggabungkan portal publik portofolio modern dengan panel CMS privat terproteksi, dibangun di atas arsitektur full-stack TypeScript (React, Node.js/Express, Supabase, Vercel).

Seluruh spesifikasi sistem, standar rekayasa perangkat lunak, panduan setup lokal, serta alur kerja AI Agent diatur secara terpusat di dalam direktori `context/`.

---

## Goals
1. **Personal Branding & Kredibilitas:** Menampilkan identitas, keahlian, rekam jejak, studi kasus proyek, sertifikasi, dan prestasi profesional secara interaktif dan elegan.
2. **Otonomi Konten Mandiri:** Memberikan kontrol penuh kepada pemilik untuk memperbarui data (CRUD, Draft, Publish, Archive) via panel CMS `/admin` tanpa deploy ulang kode.
3. **Rekayasa Perangkat Lunak Berkualitas Tinggi:** Arsitektur full-stack type-safe TypeScript, clean code, modular, teruji, dan terdokumentasi lengkap.
4. **Performa Superior:** Pemuatan cepat dengan skor Google Lighthouse $\ge 90$ dan Core Web Vitals optimal.
5. **Keamanan Berlapis:** Row Level Security (RLS) PostgreSQL, Supabase Auth, validasi skema input (Zod), rate limiting, dan CORS guard.

---

## Architecture Summary
```text
                         firmanfarel.site
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
                 ▼                             ▼
           PUBLIC WEBSITE                 PRIVATE CMS
        (https://firmanfarel.site)    (https://firmanfarel.site/admin)
                 │                             │
              Visitor                        Owner
                 │                             │
             READ-ONLY                     FULL CRUD
                 │                             │
                 ▼                             ▼
        ┌──────────────────────────────────────────────┐
        │       API LAYER (Express.js / TypeScript)    │
        └──────────────────────┬───────────────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────────┐
        │              SUPABASE PLATFORM               │
        │   [PostgreSQL (RLS)]   [Auth]   [Storage]    │
        └──────────────────────────────────────────────┘
```

---

## Tech Stack
- **Frontend:** React + TypeScript + Vanilla CSS (Bespoke Design Tokens)
- **Backend:** Node.js + Express.js + TypeScript
- **Database & Cloud Services:** Supabase (PostgreSQL, Supabase Auth, Supabase Storage)
- **Deployment:** Vercel (Frontend & Serverless API runtime)
- **Domain & DNS:** Hostinger (`firmanfarel.site`)

---

## Folder Structure
```text
context/
|-- PRD.md                             # Master Product Requirements Document
|-- PROJECT_STATE.md                   # Status sesi kerja, sprint, blocker, dan task aktif
|-- README.md                          # Panduan navigasi repositori context (Dokumen ini)
|
|-- 01-project/                        # Informasi global arsitektur dan sistem
|   |-- overview.md                    # Ringkasan sistem, stakeholder, dan sasaran
|   |-- architecture.md                # Arsitektur detail sistem, data flow, dan keamanan
|   |-- database.md                    # Desain ERD PostgreSQL, tabel, relasi, dan RLS
|   `-- tech-stack.md                  # Spesifikasi pustaka, library, dan runtime
|
|-- 02-development/                    # Standar rekayasa dan pengembangan
|   |-- conventions.md                 # Standar coding, struktur folder, konvensi Git
|   |-- api.md                         # Standar REST API global, request/response, dan error format
|   |-- testing.md                     # Strategi pengujian (Unit, Integration, E2E, UAT)
|   `-- deployment.md                  # Prosedur rilis production ke Vercel dan DNS Hostinger
|
|-- 03-management/                     # Manajemen proyek dan audit trail
|   |-- progress.md                    # Status dan persentase progres per modul
|   |-- backlog.md                     # Daftar task backlog terprioritas
|   |-- decisions.md                   # Architecture Decision Records (ADR)
|   `-- changelog.md                   # Riwayat perubahan sistem dan rilis
|
|-- 04-setup/                          # Panduan setup lingkungan kerja lokal
|   |-- local-development.md           # Langkah menjalankan proyek dari nol di lokal
|   |-- environment-variables.md       # Kamus lengkap environment variable (.env)
|   |-- database-setup.md              # Inisialisasi skema Supabase dan seeder data
|   |-- docker-setup.md                # Panduan Docker container opsional untuk development
|   `-- troubleshooting.md             # Solusi kendala umum saat setup/coding
|
`-- 05-modules/                        # Spesifikasi rinci setiap modul sistem
    |-- auth.md                        # Modul Autentikasi Admin & Security Guard
    |-- dashboard.md                   # Modul Panel Ringkasan Metrik CMS
    |-- profile.md                     # Modul Identitas Personal, Bio, dan Resume PDF
    |-- skills.md                      # Modul Manajemen Keahlian Teknologi
    |-- projects.md                    # Modul Portofolio Proyek & Case Study Mendalam
    |-- experience.md                  # Modul Linimasa Karier & Pengalaman Organisasi
    |-- education.md                   # Modul Riwayat Pendidikan Formal
    |-- certificates.md                # Modul Sertifikasi & Kredensial Kompetensi
    |-- achievements.md                # Modul Penghargaan & Rekognisi Kompetisi
    |-- messages.md                    # Modul Form Kontak Publik & Inbox CMS
    |-- media.md                       # Modul Supabase Media Library Asset Manager
    |-- settings.md                    # Modul Konfigurasi Global & SEO Metadata
    `-- articles.md                    # Modul Blog Teknis & Markdown Reader [Phase 2]
```

---

## Workflow & AI Agent Governance
Setiap pengembang maupun AI Agent wajib mengikuti alur kerja baku:

```text
1. Read PRD.md (Memahami kontrak dan requirement produk)
2. Read PROJECT_STATE.md (Memeriksa task aktif, blocker, dan modul terkini)
3. Read 04-setup/local-development.md (Jika task memerlukan eksekusi di lokal)
4. Read 03-management/decisions.md (Memahami keputusan arsitektural yang sudah dikunci)
5. Read 05-modules/[modul-terkait].md (Mempelajari spesifikasi teknis modul spesifik)
6. Implement Task (Mengembangkan fitur dengan urutan: Database -> API -> UI -> Testing)
7. Update Documentation (Memperbarui PROJECT_STATE.md, progress.md, changelog.md, dan decisions.md)
```
