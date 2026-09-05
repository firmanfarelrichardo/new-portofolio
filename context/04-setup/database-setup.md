# Database Initialization & Setup Guide

Panduan inisialisasi skema PostgreSQL dan Row Level Security (RLS) policies pada platform Supabase.

---

## 1. Persiapan Proyek Supabase
1. Buka [Supabase Dashboard](https://app.supabase.com) dan buat proyek baru (*New Project*).
2. Simpan Database Password di tempat aman.
3. Catat `Project URL`, `anon public key`, dan `service_role key` dari menu **Settings -> API**.

---

## 2. Master Schema SQL Script
Buka menu **SQL Editor** pada dashboard Supabase, buat query baru, dan salin seluruh blok SQL berikut:

```sql
-- Aktifkan ekstensi UUID
create extension if not exists "uuid-ossp";

-- 1. TABEL PROFILES
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  headline text,
  bio_short text,
  bio_full text,
  avatar_url text,
  location text default 'Indonesia',
  email text,
  resume_url text,
  available_for_hire boolean default true,
  social_links jsonb default '{"github":"","linkedin":"","instagram":"","email":""}'::jsonb,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. TABEL SKILL CATEGORIES
create table if not exists skill_categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  display_order int default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 3. TABEL SKILLS
create table if not exists skills (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references skill_categories(id) on delete set null,
  name text not null,
  icon_url text,
  proficiency_level text default 'Intermediate',
  display_order int default 0,
  is_featured boolean default false,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 4. TABEL PROJECTS
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  summary text not null,
  description_md text,
  thumbnail_url text,
  gallery_urls text[] default '{}',
  problem_statement text,
  solution text,
  features text[] default '{}',
  challenges text,
  outcome text,
  technologies text[] default '{}',
  demo_url text,
  repo_url text,
  status text default 'published' check (status in ('draft', 'published', 'archived')),
  is_featured boolean default false,
  completed_at date,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 5. TABEL EXPERIENCES
create table if not exists experiences (
  id uuid default gen_random_uuid() primary key,
  position text not null,
  organization text not null,
  type text default 'work' check (type in ('work', 'internship', 'organization', 'freelance', 'competition')),
  location text,
  start_date date not null,
  end_date date,
  is_current boolean default false,
  description text,
  achievements text[] default '{}',
  technologies text[] default '{}',
  display_order int default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 6. TABEL EDUCATION
create table if not exists education (
  id uuid default gen_random_uuid() primary key,
  institution text not null,
  degree text not null,
  field_of_study text not null,
  start_date date not null,
  end_date date,
  is_current boolean default false,
  grade text,
  description text,
  display_order int default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 7. TABEL CERTIFICATES
create table if not exists certificates (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  issuer text not null,
  issue_date date not null,
  expiration_date date,
  credential_id text,
  credential_url text,
  image_url text,
  display_order int default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 8. TABEL ACHIEVEMENTS
create table if not exists achievements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  organizer text not null,
  event_date date not null,
  category text default 'competition' check (category in ('competition', 'award', 'publication', 'scholarship', 'recognition')),
  description text,
  image_url text,
  certificate_url text,
  display_order int default 0,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 9. TABEL MESSAGES
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  sender_name text not null,
  sender_email text not null,
  subject text not null,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read', 'archived', 'deleted')),
  ip_address text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 10. TABEL MEDIA
create table if not exists media (
  id uuid default gen_random_uuid() primary key,
  filename text not null,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null,
  public_url text not null,
  storage_path text not null,
  category text default 'general',
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 11. TABEL SETTINGS
create table if not exists settings (
  id uuid default gen_random_uuid() primary key,
  site_title text not null default 'Firman Farel — Software Engineer Portfolio',
  site_description text default 'Personal portfolio and engineering showcase of Firman Farel.',
  og_image_url text,
  keywords text[] default '{"software engineer", "developer", "portfolio", "react", "typescript"}',
  maintenance_mode boolean default false,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Aktifkan RLS pada seluruh tabel
alter table profiles enable row level security;
alter table skill_categories enable row level security;
alter table skills enable row level security;
alter table projects enable row level security;
alter table experiences enable row level security;
alter table education enable row level security;
alter table certificates enable row level security;
alter table achievements enable row level security;
alter table messages enable row level security;
alter table media enable row level security;
alter table settings enable row level security;

-- Public READ Access (Data Published)
create policy "Allow public read on profiles" on profiles for select using (true);
create policy "Allow public read on skill_categories" on skill_categories for select using (true);
create policy "Allow public read on skills" on skills for select using (true);
create policy "Allow public read on projects" on projects for select using (status = 'published');
create policy "Allow public read on experiences" on experiences for select using (true);
create policy "Allow public read on education" on education for select using (true);
create policy "Allow public read on certificates" on certificates for select using (true);
create policy "Allow public read on achievements" on achievements for select using (true);
create policy "Allow public read on settings" on settings for select using (true);

-- Public INSERT Access on Messages (Contact Form)
create policy "Allow public insert on messages" on messages for insert with check (true);

-- Authenticated (Owner) Full Access (ALL)
create policy "Allow authenticated all on profiles" on profiles for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on skill_categories" on skill_categories for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on skills" on skills for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on projects" on projects for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on experiences" on experiences for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on education" on education for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on certificates" on certificates for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on achievements" on achievements for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on messages" on messages for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on media" on media for all using (auth.role() = 'authenticated');
create policy "Allow authenticated all on settings" on settings for all using (auth.role() = 'authenticated');
```

---

## 3. Setup Supabase Storage Bucket
1. Pada dashboard Supabase, buka menu **Storage**.
2. Klik **New Bucket**, beri nama `portfolio-media`.
3. Aktifkan opsi **Public Bucket** agar gambar dapat diakses langsung oleh browser pengunjung.
4. Tambahkan Policy: Izinkan `SELECT` untuk `anon` (publik) dan izinkan `INSERT/DELETE/UPDATE` hanya untuk role `authenticated`.

---

## 4. Initial Seed Data SQL Script (Opsional tapi Sangat Direkomendasikan)
Jalankan query berikut di SQL Editor setelah skema tabel dibuat untuk mengisi data awal profil default, pengaturan, dan kategori keahlian:

```sql
-- 1. SEED SETTINGS (Singleton)
insert into settings (site_title, site_description, keywords, maintenance_mode)
values (
  'Firman Farel — Software Engineer & Full-Stack Developer',
  'Personal portfolio and engineering showcase of Firman Farel. Specialized in modern web architectures and full-stack development.',
  array['Software Engineer', 'Full-Stack Developer', 'React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL'],
  false
)
on conflict do nothing;

-- 2. SEED SKILL CATEGORIES
insert into skill_categories (id, name, slug, display_order) values
  ('c0000000-0000-0000-0000-000000000001', 'Frontend', 'frontend', 1),
  ('c0000000-0000-0000-0000-000000000002', 'Backend & API', 'backend', 2),
  ('c0000000-0000-0000-0000-000000000003', 'Database & Cloud', 'database-cloud', 3),
  ('c0000000-0000-0000-0000-000000000004', 'Tools & DevOps', 'tools-devops', 4)
on conflict do nothing;

-- 3. SEED DEFAULT SKILLS
insert into skills (category_id, name, proficiency_level, display_order, is_featured) values
  ('c0000000-0000-0000-0000-000000000001', 'React', 'Advanced', 1, true),
  ('c0000000-0000-0000-0000-000000000001', 'TypeScript', 'Advanced', 2, true),
  ('c0000000-0000-0000-0000-000000000001', 'Vanilla CSS', 'Advanced', 3, true),
  ('c0000000-0000-0000-0000-000000000002', 'Node.js', 'Advanced', 1, true),
  ('c0000000-0000-0000-0000-000000000002', 'Express.js', 'Advanced', 2, true),
  ('c0000000-0000-0000-0000-000000000003', 'PostgreSQL', 'Intermediate', 1, true),
  ('c0000000-0000-0000-0000-000000000003', 'Supabase BaaS', 'Advanced', 2, true),
  ('c0000000-0000-0000-0000-000000000004', 'Docker', 'Intermediate', 1, false),
  ('c0000000-0000-0000-0000-000000000004', 'Git & GitHub', 'Advanced', 2, true)
on conflict do nothing;
```


