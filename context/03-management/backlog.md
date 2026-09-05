# Project Backlog & Task Priority

## Sprint 0: Foundation, Architecture, & Environment Setup
| ID | Priority | Status | Module | Task |
| :--- | :--- | :--- | :--- | :--- |
| **TSK-001** | P0 (Critical) | Done | Docs | Susun PRD lengkap dan Knowledge Base SSOT di folder `context/` |
| **TSK-002** | P0 (Critical) | In Progress | Setup | Buat dokumen setup lokal, kamus env, dan template schema database |
| **TSK-003** | P0 (Critical) | In Progress | Modules | Buat berkas spesifikasi teknis lengkap untuk seluruh modul di `05-modules/` |
| **TSK-004** | P1 (High) | To Do | Project | Inisialisasi workspace frontend (React + Vite + TS) dan backend (Express + TS) |
| **TSK-005** | P1 (High) | To Do | Project | Setup linting (ESLint), formatting (Prettier), dan TypeScript strict configs |

---

## Sprint 1: Database & Security Schema (Phase 1)
| ID | Priority | Status | Module | Task |
| :--- | :--- | :--- | :--- | :--- |
| **TSK-010** | P0 (Critical) | To Do | Database | Buat project di Supabase Cloud dan eksekusi SQL Schema Master |
| **TSK-011** | P0 (Critical) | To Do | Database | Konfigurasi Row Level Security (RLS) policies pada seluruh 12 tabel |
| **TSK-012** | P1 (High) | To Do | Database | Buat bucket Supabase Storage (`portfolio-media`) dengan akses publik terproteksi |
| **TSK-013** | P1 (High) | To Do | Database | Eksekusi seed data awal untuk profil default, kategori skill, dan setting |

---

## Sprint 2: Backend API & Auth Layer (Phase 2)
| ID | Priority | Status | Module | Task |
| :--- | :--- | :--- | :--- | :--- |
| **TSK-020** | P0 (Critical) | To Do | Auth | Buat auth middleware di Express untuk memverifikasi JWT Supabase |
| **TSK-021** | P0 (Critical) | To Do | API | Implementasi Zod schema validator untuk seluruh endpoint payload |
| **TSK-022** | P1 (High) | To Do | API | Buat route, controller, service, dan repository untuk modul Profile & Skills |
| **TSK-023** | P1 (High) | To Do | API | Buat route, controller, service, dan repository untuk modul Projects & Case Study |
| **TSK-024** | P1 (High) | To Do | API | Buat route, controller, service, dan repository untuk Experience & Education |
| **TSK-025** | P1 (High) | To Do | API | Buat route, controller, service, dan repository untuk Certificates & Achievements |
| **TSK-026** | P1 (High) | To Do | API | Buat endpoint submit contact message dengan rate limiter dan sanitasi input |
| **TSK-027** | P2 (Medium) | To Do | API | Buat endpoint upload berkas media ke Supabase Storage via backend |

---

## Sprint 3: Private CMS Development (Phase 3)
| ID | Priority | Status | Module | Task |
| :--- | :--- | :--- | :--- | :--- |
| **TSK-030** | P0 (Critical) | To Do | Auth | Buat halaman login admin (`/admin/login`) dengan integrasi Supabase Auth |
| **TSK-031** | P0 (Critical) | To Do | CMS | Buat React Router Protected Route guard untuk seluruh rute `/admin/*` |
| **TSK-032** | P1 (High) | To Do | Dashboard | Buat layout sidebar CMS dan kartu metrik agregat di Dashboard |
| **TSK-033** | P1 (High) | To Do | Profile | Buat form pengeditan profil, headline, bio, dan pengunggah berkas resume PDF |
| **TSK-034** | P1 (High) | To Do | Skills | Buat antarmuka CRUD skill dan pengelolaan kategori |
| **TSK-035** | P0 (Critical) | To Do | Projects | Buat antarmuka CRUD proyek, editor studi kasus markdown, dan selector galeri |
| **TSK-036** | P1 (High) | To Do | Experience | Buat form CRUD riwayat pengalaman kerja dan organisasi |
| **TSK-037** | P2 (Medium) | To Do | Education | Buat form CRUD riwayat pendidikan |
| **TSK-038** | P1 (High) | To Do | Certificates | Buat form CRUD sertifikasi dan upload foto sertifikat |
| **TSK-039** | P2 (Medium) | To Do | Achievements | Buat form CRUD prestasi dan penghargaan |
| **TSK-040** | P1 (High) | To Do | Messages | Buat tabel inbox pesan kontak masuk dengan status unread, read, dan archive |
| **TSK-041** | P1 (High) | To Do | Media | Buat Media Library viewer untuk menyalin URL aset dan menghapus file |
| **TSK-042** | P2 (Medium) | To Do | Settings | Buat form pengaturan SEO global dan link media sosial |

---

## Sprint 4: Public Website Development (Phase 4)
| ID | Priority | Status | Module | Task |
| :--- | :--- | :--- | :--- | :--- |
| **TSK-050** | P0 (Critical) | To Do | Public | Buat desain sistem Vanilla CSS (Design Tokens, variables, tipografi, palet warna) |
| **TSK-051** | P0 (Critical) | To Do | Public | Buat Halaman Utama (Hero section, bio ringkas, featured projects, CTA kontak) |
| **TSK-052** | P1 (High) | To Do | Public | Buat Halaman About mendalam dengan biografi dan fokus karier |
| **TSK-053** | P0 (Critical) | To Do | Projects | Buat Halaman Galeri Proyek dengan filtering kategori dan search instant |
| **TSK-054** | P0 (Critical) | To Do | Projects | Buat Halaman Detail Studi Kasus (`/projects/:slug`) dengan galeri gambar |
| **TSK-055** | P1 (High) | To Do | Skills | Buat Halaman/Section Skills interaktif dengan ikon dan proficiency |
| **TSK-056** | P1 (High) | To Do | Experience | Buat Linimasa Pengalaman interaktif kronologis |
| **TSK-057** | P2 (Medium) | To Do | Education | Buat Section Riwayat Pendidikan |
| **TSK-058** | P1 (High) | To Do | Certificates | Buat Grid Kredensial Sertifikat dengan link verifikasi eksternal |
| **TSK-059** | P2 (Medium) | To Do | Achievements | Buat Showcase Prestasi & Penghargaan |
| **TSK-060** | P0 (Critical) | To Do | Contact | Buat Formulir Kontak publik dengan validasi instan, toast, dan submit API |
| **TSK-061** | P1 (High) | To Do | Public | Pasang tombol download resume PDF yang terhubung ke Supabase Storage |
| **TSK-062** | P1 (High) | To Do | Public | Optimasi navigasi responsif (Hamburger menu mobile & desktop bar) |

---

## Sprint 5: Quality, Performance, & SEO Audit (Phase 5)
| ID | Priority | Status | Module | Task |
| :--- | :--- | :--- | :--- | :--- |
| **TSK-070** | P0 (Critical) | To Do | SEO | Implementasikan dynamic meta tags, OpenGraph, Twitter card, sitemap, robots |
| **TSK-071** | P1 (High) | To Do | SEO | Buat structured data JSON-LD (Person, WebSite, CreativeWork) |
| **TSK-072** | P0 (Critical) | To Do | Perf | Optimasi aset gambar (WebP format, width/height explicit, native lazy loading) |
| **TSK-073** | P0 (Critical) | To Do | Perf | Audit Google Lighthouse: Pastikan skor $\ge 90$ untuk seluruh indikator |
| **TSK-074** | P1 (High) | To Do | A11y | Uji navigasi keyboard WCAG 2.2 AA dan kontras warna teks |

---

## Sprint 6: Production Deployment & Go-Live (Phase 6)
| ID | Priority | Status | Module | Task |
| :--- | :--- | :--- | :--- | :--- |
| **TSK-080** | P0 (Critical) | To Do | Deploy | Konfigurasi `vercel.json` untuk routing SPA dan serverless Express API |
| **TSK-081** | P0 (Critical) | To Do | Deploy | Injeksi environment variables di dashboard Vercel production |
| **TSK-082** | P0 (Critical) | To Do | DNS | Konfigurasi DNS Hostinger untuk domain `firmanfarel.site` ke Vercel |
| **TSK-083** | P0 (Critical) | To Do | Deploy | Verifikasi penerbitan sertifikat SSL/TLS dan jalankan smoke testing pada live URL |
