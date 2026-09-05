# Master Database Schema & ERD

## Database Overview
Database menggunakan **PostgreSQL 15+** yang dikelola melalui platform **Supabase**. Seluruh tabel menerapkan konvensi penamaan seragam (*snake_case* jamak/tunggal standar SQL) dengan *primary key* berbasis UUID v4 (`gen_random_uuid()`) dan audit timestamp otomatis (`created_at`, `updated_at`).

Setiap tabel **wajib mengaktifkan Row Level Security (RLS)** untuk melindungi data dari akses ilegal di tingkat basis data.

---

## Entity Relationship Diagram (ERD)

```text
┌─────────────────────────┐
│        profiles         │
├─────────────────────────┤
│ id (PK, FK auth.users)  │
│ name                    │
│ headline                │
│ bio_short               │
│ bio_full                │
│ avatar_url              │
│ location                │
│ email                   │
│ resume_url              │
│ available_for_hire      │
│ social_links (JSONB)    │
│ updated_at              │
└─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│    skill_categories     │ 1     N │         skills          │
├─────────────────────────┤─────────├─────────────────────────┤
│ id (PK)                 │         │ id (PK)                 │
│ name                    │         │ category_id (FK)        │
│ slug                    │         │ name                    │
│ display_order           │         │ icon_url / icon_svg     │
│ created_at              │         │ proficiency_level       │
└─────────────────────────┘         │ display_order           │
                                    │ is_featured             │
                                    │ created_at              │
                                    └─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│        projects         │ 1     N │   project_technologies  │
├─────────────────────────┤─────────├─────────────────────────┤
│ id (PK)                 │         │ id (PK)                 │
│ title                   │         │ project_id (FK)         │
│ slug (Unique)           │         │ name                    │
│ summary                 │         │ icon_url                │
│ description_md          │         └─────────────────────────┘
│ thumbnail_url           │
│ gallery_urls (TEXT[])   │
│ problem_statement       │
│ solution                │
│ features (TEXT[])       │
│ challenges              │
│ outcome                 │
│ demo_url                │
│ repo_url                │
│ status (enum)           │
│ is_featured             │
│ completed_at            │
│ created_at              │
│ updated_at              │
└─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│       experiences       │         │        education        │
├─────────────────────────┤         ├─────────────────────────┤
│ id (PK)                 │         │ id (PK)                 │
│ position                │         │ institution             │
│ company / organization  │         │ degree                  │
│ type (enum: work/org)   │         │ field_of_study          │
│ location                │         │ start_date              │
│ start_date              │         │ end_date                │
│ end_date                │         │ is_current              │
│ is_current              │         │ gpa / grade             │
│ description             │         │ description             │
│ achievements (TEXT[])   │         │ display_order           │
│ technologies (TEXT[])   │         │ created_at              │
│ display_order           │         └─────────────────────────┘
│ created_at              │
└─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│      certificates       │         │      achievements       │
├─────────────────────────┤         ├─────────────────────────┤
│ id (PK)                 │         │ id (PK)                 │
│ title                   │         │ title                   │
│ issuer                  │         │ organizer               │
│ issue_date              │         │ event_date              │
│ expiration_date         │         │ category (enum)         │
│ credential_id           │         │ description             │
│ credential_url          │         │ image_url               │
│ image_url               │         │ certificate_url         │
│ display_order           │         │ display_order           │
│ created_at              │         │ created_at              │
└─────────────────────────┘         └─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│        messages         │         │          media          │
├─────────────────────────┤         ├─────────────────────────┤
│ id (PK)                 │         │ id (PK)                 │
│ sender_name             │         │ filename                │
│ sender_email            │         │ original_name           │
│ subject                 │         │ mime_type               │
│ message                 │         │ size_bytes              │
│ status (enum)           │         │ public_url              │
│ ip_address              │         │ storage_path            │
│ created_at              │         │ category                │
└─────────────────────────┘         │ created_at              │
                                    └─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│        settings         │         │     articles (Ph 2)     │
├─────────────────────────┤         ├─────────────────────────┤
│ id (PK)                 │         │ id (PK)                 │
│ site_title              │         │ title                   │
│ site_description        │         │ slug (Unique)           │
│ og_image_url            │         │ excerpt                 │
│ keywords (TEXT[])       │         │ content_md              │
│ maintenance_mode        │         │ cover_image_url         │
│ updated_at              │         │ status (enum)           │
└─────────────────────────┘         │ reading_time_mins       │
                                    │ published_at            │
                                    │ created_at              │
                                    └─────────────────────────┘
```

---

## Naming Conventions
1. **Tabel:** Huruf kecil bentuk jamak (*plural snake_case*), contoh: `projects`, `experiences`, `certificates`. Tabel tunggal hanya untuk entitas singleton seperti `profiles` dan `settings`.
2. **Kolom:** Huruf kecil bentuk kata deskriptif (*snake_case*), contoh: `is_featured`, `demo_url`, `display_order`.
3. **Primary Key:** Selalu bernilai `id uuid default gen_random_uuid() primary key`.
4. **Foreign Key:** Nama tabel tunggal diikuti `_id`, contoh: `category_id`, `project_id`.
5. **Timestamp:** `created_at` dan `updated_at` bertipe `timestamptz default timezone('utc'::text, now())`.
6. **Boolean:** Awalan kata tanya afirmatif seperti `is_current`, `is_featured`, `maintenance_mode`.

---

## Row Level Security (RLS) Strategy

Setiap tabel diaktifkan RLS dengan pola kebijakan baku:
- **Public (Anonim):**
  - Hanya dapat melakukan `SELECT` pada data konten publik (`projects`, `skills`, `experiences`, `education`, `certificates`, `achievements`, `settings`, `profiles`) yang berstatus `published`.
  - Dapat melakukan `INSERT` pada tabel `messages` (Form Kontak) dengan pengawasan rate-limiting di backend.
- **Admin (Authenticated):**
  - Memiliki akses penuh `ALL` (SELECT, INSERT, UPDATE, DELETE) pada seluruh tabel jika `auth.role() = 'authenticated'`.

---

## Migration & Seeding Strategy
1. Skema awal didefinisikan secara deklaratif di `context/04-setup/database-setup.md`.
2. Eksekusi skema dilakukan melalui Supabase SQL Editor atau Supabase CLI (`supabase db push`).
3. Seed data disediakan untuk mengisi profil default Firman Farel, kategori skill awal, dan entri konfigurasi website.
