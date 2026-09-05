# Product Requirements Document (PRD)

## Personal Portfolio Website with Private CMS

| Attribute | Detail |
| :--- | :--- |
| **Project Name** | Firman Farel Personal Portfolio CMS |
| **Domain** | `firmanfarel.site` |
| **Platform** | Web (Public Portal & Private CMS) |
| **Status** | Planning & Pre-development |
| **Target Audience** | Recruiters, Tech Interviewers, Potential Clients, Tech Community |
| **Architecture** | Full-Stack TypeScript (Decoupled Client-Server-Cloud BaaS) |
| **Frontend** | React + TypeScript + Vanilla CSS |
| **Backend** | Node.js + Express.js + TypeScript |
| **Database & Services**| Supabase (PostgreSQL, Supabase Auth, Supabase Storage) |
| **Deployment Target** | Vercel (Frontend & Serverless API runtime) |
| **Domain Registrar** | Hostinger |

---

# 1. Project Overview

## 1.1 Project Name
**Firman Farel Personal Portfolio CMS** (`firmanfarel.site`)

## 1.2 Description
**Firman Farel Personal Portfolio CMS** adalah ekosistem web personal terintegrasi yang berfungsi sebagai representasi profesional digital pemilik website (Firman Farel). Sistem ini menyajikan profil, keahlian, rekam jejak pengalaman, karya proyek mendalam (case studies), riwayat pendidikan, sertifikasi kompetensi, pencapaian penghargaan, hingga artikel teknis.

Sistem dirancang dengan arsitektur dua sisi (*two-sided decoupled interface*):
1. **Public Website (Visitor):** Portal publik yang berfokus pada kecepatan muat (*blazing fast*), estetika visual modern, interaktivitas responsif, dan optimasi SEO.
2. **Private CMS (Owner):** Panel administrasi privat yang aman (*role-guarded*) untuk mengelola seluruh konten secara mandiri (CRUD, draft, publish, archive) tanpa perlu menyentuh atau melakukan deploy ulang *source code*.

```text
                        FIRMANFAREL.SITE
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
           PUBLIC WEBSITE               PRIVATE CMS
        (https://firmanfarel.site)    (https://firmanfarel.site/admin)
                 │                           │
              Visitor                      Owner
                 │                           │
             READ-ONLY                  FULL CRUD
                 │                           │
                 ▼                           ▼
        ┌───────────────────────────────────────────┐
        │        API LAYER (Express.js / TS)        │
        └─────────────────────┬─────────────────────┘
                              │
                              ▼
        ┌───────────────────────────────────────────┐
        │             SUPABASE PLATFORM             │
        │  [PostgreSQL (RLS)]  [Auth]  [Storage]    │
        └───────────────────────────────────────────┘
```

## 1.3 Problem Statement
1. **Keterbatasan Portfolio Statis:** Portfolio tradisional berbasis file statis (hardcoded JSON/HTML) membutuhkan proses pengeditan kode, commit git, dan build-deployment setiap kali pemilik ingin menambahkan sertifikat baru, proyek terkini, atau memperbarui ringkasan bio. Hal ini membatasi kelincahan pembaruan profil profesional.
2. **Inefisiensi CMS Konvensional:** Solusi CMS monolitik seperti WordPress atau platform SaaS generik seringkali terlalu berat (*bloated*), rentan celah keamanan plugin pihak ketiga, sulit di-maintain dengan standar rekayasa modern (TypeScript/Clean Architecture), serta membebani resource server secara tidak perlu.
3. **Kebutuhan Showcasing Engineering Depth:** Sebagai software engineer, pemilik membutuhkan portfolio yang tidak hanya menampilkan "daftar karya biasa", melainkan mendemonstrasikan kapabilitas teknis tingkat lanjut: arsitektur sistem yang rapi, *type-safety*, pemisahan *client-server workload* yang cerdas, performa Web Vitals tinggi, serta standar keamanan terverifikasi.

## 1.4 Objectives
- Membangun platform personal portfolio mandiri yang cepat, aman, elegan, dan mudah dikelola melalui CMS privat.
- Mengeliminasi ketergantungan pembaruan konten terhadap proses *code deployment*.
- Mengimplementasikan standar arsitektur modern berbasis TypeScript dari lapisan frontend hingga backend dan database.
- Menyediakan basis dokumentasi *Single Source of Truth* (SSOT) terstruktur yang ramah bagi manusia dan AI Agent sesuai standar repository knowledge base.

---

# 2. Business & Personal Goals

## 2.1 Goals Matrix

| Goal ID | Kategori | Deskripsi Sasaran |
| :--- | :--- | :--- |
| **G1** | **Personal Branding** | Membangun reputasi profesional yang kredibel, terpercaya, dan menarik bagi recruiter, calon klien, dan kolaborator industri. |
| **G2** | **Content Autonomy** | Memberikan kebebasan penuh kepada owner untuk melakukan publikasi, pengarsipan, dan pembaruan materi secara instan. |
| **G3** | **Engineering Excellence**| Mendemonstrasikan kode berkualitas tinggi: modular, type-safe, teruji, dan terdokumentasi rapi. |
| **G4** | **High Performance** | Mengoptimalkan *distribution of work* (client vs server) agar hemat bandwidth, minim latency, dan hemat kuota serverless. |
| **G5** | **Bulletproof Security** | Mengamankan data CMS dengan autentikasi berlapis, sanitasi input ketat, dan Row Level Security (RLS) di database. |

## 2.2 Key Performance Indicators (KPI)
- **Content Freshness:** Waktu untuk menambahkan item baru (proyek/sertifikat/pengalaman) dari CMS hingga live di publik < 2 menit.
- **Zero Maintenance Downtime:** Pembaruan konten tidak menyebabkan restart server atau deployment pipeline.
- **Form Conversion:** Form kontak publik berfungsi 100% tanpa kendala spam atau data drop.

## 2.3 Success Metrics (Engineering Benchmarks)

| Metric Area | Parameter / Indikator | Target Ambang Batas |
| :--- | :--- | :--- |
| **Lighthouse** | Performance Score | $\ge 90$ |
| **Lighthouse** | Accessibility Score | $\ge 90$ (WCAG 2.2 AA) |
| **Lighthouse** | Best Practices Score | $\ge 90$ |
| **Lighthouse** | SEO Score | $\ge 90$ |
| **Core Web Vitals** | First Contentful Paint (FCP) | $< 1.8\text{ s}$ |
| **Core Web Vitals** | Largest Contentful Paint (LCP) | $< 2.5\text{ s}$ |
| **Core Web Vitals** | Cumulative Layout Shift (CLS) | $< 0.1$ |
| **API Latency** | P95 Response Time (Public Read) | $< 300\text{ ms}$ |
| **Type Safety** | Strict TypeScript Coverage | $100\%$ (No implicit `any`) |

---

# 3. Stakeholders

| Role | Identitas Aktor | Tanggung Jawab & Hak Akses |
| :--- | :--- | :--- |
| **Product Owner & Admin** | Firman Farel | - Memiliki hak akses penuh ke CMS (`/admin`).<br>- Mengelola semua entitas data (Profil, Skill, Proyek, Pengalaman, Pendidikan, Sertifikat, Prestasi, Artikel, Media, Pesan, Pengaturan).<br>- Mengontrol status publikasi (Draft, Published, Archived).<br>- Mengunduh dan meninjau pesan kontak masuk. |
| **Public Visitors** | Recruiter, HRD, Tech Leads, Klien, Kolaborator, Mahasiswa, Komunitas | - Mengakses halaman publik secara *read-only*.<br>- Melihat portofolio karya, detail studi kasus, dan kredensial.<br>- Mengunduh Curriculum Vitae (CV) / Resume.<br>- Mengirim pesan pertanyaan atau penawaran melalui form kontak. |
| **AI Agents & Developers** | AI Coding Assistant, Maintainer | - Menjalankan, menguji, dan mengembangkan kode sesuai PRD.<br>- Wajib mematuhi dokumen arsitektur dan konvensi pada `context/`.<br>- Memperbarui audit trail, backlog, dan changelog di setiap sesi. |

---

# 4. Functional Requirements

Kebutuhan fungsional dipetakan secara terstruktur ke dalam modul-modul spesifik yang bersesuaian dengan struktur dokumentasi pada `context/05-modules/`.

```text
FUNCTIONAL MODULES
├── 01. Authentication & Security (auth.md)
├── 02. Admin Dashboard (dashboard.md)
├── 03. Profile & Personal Identity (profile.md)
├── 04. Skills Management (skills.md)
├── 05. Projects & Case Studies (projects.md)
├── 06. Experience (experience.md)
├── 07. Education (education.md)
├── 08. Certifications (certificates.md)
├── 09. Achievements & Awards (achievements.md)
├── 10. Contact & Message Inbox (messages.md)
├── 11. Media Library (media.md)
├── 12. Settings & Global SEO (settings.md)
└── 13. Articles & Blog [Phase 2] (articles.md)
```

---

## 4.1 Modul 01: Authentication & Security (`auth.md`)
- **Tujuan:** Mengamankan akses panel administrasi agar hanya dapat diakses oleh pemilik sah.
- **Requirement:**
  - `FR-AUTH-001`: Admin login via Supabase Auth menggunakan email dan password terenkripsi.
  - `FR-AUTH-002`: Manajemen sesi aman berbasis JWT/Session token dengan auto-refresh token.
  - `FR-AUTH-003`: Proteksi route CMS (`/admin/*`) pada sisi client (React Router Guard) dan sisi API (Express Auth Middleware).
  - `FR-AUTH-004`: Mekanisme logout dengan invalidasi sesi lokal dan remote.
  - `FR-AUTH-005`: Pembatasan percobaan login salah (*rate-limiting* / brute-force protection).
  - `FR-AUTH-006`: Database dilindungi dengan Row Level Security (RLS) PostgreSQL; visitor hanya memiliki hak `SELECT` pada data berstatus `published`.

## 4.2 Modul 02: Admin Dashboard (`dashboard.md`)
- **Tujuan:** Menyediakan ringkasan eksekutif status data website bagi pemilik saat login.
- **Requirement:**
  - `FR-DASH-001`: Menampilkan kartu metrik ringkasan jumlah: Total Proyek, Total Skill, Total Pengalaman, Total Sertifikat, Pesan Belum Dibaca (*Unread Messages*), dan Konten Draft.
  - `FR-DASH-002`: Menampilkan daftar aktivitas terkini (*Recent Updates*).
  - `FR-DASH-003`: Menyediakan pintasan aksi cepat (*Quick Actions*) untuk menambah proyek baru, mengunggah media, atau melihat pesan masuk.

## 4.3 Modul 03: Profile & Personal Identity (`profile.md`)
- **Tujuan:** Menampilkan identitas, biografi, headline profesional, dan berkas resume pemilik.
- **Requirement:**
  - `FR-PROF-001`: Public website menampilkan nama lengkap, foto profil, headline profesional, bio ringkas, bio lengkap, domisili, dan tautan sosial (GitHub, LinkedIn, Instagram, Email).
  - `FR-PROF-002`: CMS mengizinkan pengubahan data profil, penggantian foto profil, dan pembaruan bio.
  - `FR-PROF-003`: Fitur **Download Resume / CV**: Public visitor dapat mengunduh berkas PDF resume terbaru; Owner dapat mengunggah berkas PDF resume baru via CMS.

## 4.4 Modul 04: Skills Management (`skills.md`)
- **Tujuan:** Mengkategorisasikan dan memamerkan penguasaan teknologi serta tools secara terstruktur.
- **Requirement:**
  - `FR-SKIL-001`: Public website menampilkan skill yang dikelompokkan berdasarkan kategori (contoh: *Programming Languages, Frontend, Backend, Database, Cloud & DevOps, Tools*).
  - `FR-SKIL-002`: Setiap item skill memuat nama, ikon/logo teknologi, tingkat kemahiran (*proficiency level/tag*), dan deskripsi singkat opsional.
  - `FR-SKIL-003`: CMS menyediakan CRUD data skill, pengelolaan kategori skill, serta pengaturan urutan tampilan (*display order/sorting*).

## 4.5 Modul 05: Projects & Case Studies (`projects.md`) — *Core Feature*
- **Tujuan:** Menyajikan portofolio hasil karya dan studi kasus rekayasa perangkat lunak secara mendalam.
- **Requirement:**
  - `FR-PROJ-001`: Halaman daftar proyek publik dengan kartu proyek (thumbnail, judul, ringkasan, badge teknologi, status, tahun pengerjaan, dan link aksi).
  - `FR-PROJ-002`: Filtering dan pencarian proyek di sisi client (berdasarkan kategori, teknologi, atau featured).
  - `FR-PROJ-003`: Halaman detail proyek mendalam berbasis slug ramah SEO (`/projects/:slug`), memuat:
    - Judul, tagline, banner, galeri tangkapan layar (*image carousel/lightbox*).
    - Latar belakang masalah (*Problem Statement*), solusi yang dibangun (*Solution*).
    - Fitur-fitur utama (*Key Features*), tantangan teknis (*Technical Challenges*), dan hasil/dampak (*Impact/Outcome*).
    - Arsitektur sistem dan daftar teknologi/tools lengkap.
    - Tombol aksi eksternal: Tautan Live Demo, Repository GitHub, Dokumen API / Case Study.
  - `FR-PROJ-004`: CMS mendukung pembuatan dan pengeditan proyek dengan status alur kerja: `Draft`, `Published`, `Archived`.
  - `FR-PROJ-005`: CMS mendukung penandaan *Featured Project* untuk disorot pada halaman utama (Homepage).

## 4.6 Modul 06: Experience (`experience.md`)
- **Tujuan:** Mendokumentasikan rekam jejak karier, magang, organisasi, kepanitiaan, riset, dan proyek lepas.
- **Requirement:**
  - `FR-EXPR-001`: Public website menampilkan riwayat pengalaman dalam bentuk *interactive timeline*.
  - `FR-EXPR-002`: Data pengalaman memuat posisi/peran, nama organisasi/perusahaan, tipe pengalaman (pekerjaan, magang, organisasi, freelance), lokasi, rentang waktu (bulan/tahun mulai hingga selesai atau *currently active*), deskripsi kontribusi, daftar teknologi yang digunakan, serta pencapaian utama.
  - `FR-EXPR-003`: CMS mendukung manajemen penuh (tambah, ubah, hapus, urutkan) rekam jejak pengalaman.

## 4.7 Modul 07: Education (`education.md`)
- **Tujuan:** Menyajikan riwayat pendidikan formal dan akademik pemilik.
- **Requirement:**
  - `FR-EDUC-001`: Public website menampilkan riwayat institusi pendidikan, jenjang/gelar (*degree*), bidang studi (*field of study*), periode belajar, deskripsi akademik, IPK/predikat (opsional), serta aktivitas/organisasi kampus.
  - `FR-EDUC-002`: CMS menyediakan antarmuka untuk mencatat dan memperbarui riwayat pendidikan.

## 4.8 Modul 08: Certifications (`certificates.md`)
- **Tujuan:** Memvalidasi kredensial profesional, lisensi, dan sertifikasi keahlian.
- **Requirement:**
  - `FR-CERT-001`: Public website menampilkan kartu sertifikat dengan nama sertifikat, lembaga penerbit (*issuer*), tanggal terbit, tanggal kedaluwarsa (jika ada), ID kredensial, tautan verifikasi online (*credential URL*), dan foto sertifikat.
  - `FR-CERT-002`: CMS menyediakan formulir upload sertifikat (gambar/PDF) dan pencatatan nomor registrasi kredensial.

## 4.9 Modul 09: Achievements & Awards (`achievements.md`)
- **Tujuan:** Menampilkan penghargaan kompetisi, beasiswa, publikasi karya, dan rekognisi khusus secara terpisah dari sertifikat pelatihan.
- **Requirement:**
  - `FR-ACHV-001`: Public website menampilkan daftar pencapaian berprestasi mencakup judul penghargaan, penyelenggara/pemberi penghargaan, tanggal/tahun, deskripsi kompetisi/prestasi, dokumentasi foto, dan URL publikasi/berita terkait.
  - `FR-ACHV-002`: CMS menyediakan fitur input dan kurasi data prestasi.

## 4.10 Modul 10: Contact & Message Inbox (`messages.md`)
- **Tujuan:** Menghubungkan pengunjung situs dengan pemilik secara langsung melalui pesan terstruktur.
- **Requirement:**
  - `FR-CONT-001`: Public website menyediakan formulir kontak dengan field: Nama Pengirim, Alamat Email, Subjek Pesan, dan Isi Pesan.
  - `FR-CONT-002`: Validasi input ketat di client dan server (format email valid, batas panjang karakter, anti-bot / honeypot / rate limit per IP).
  - `FR-CONT-003`: Pesan tersimpan ke database Supabase dan memicu status `unread`.
  - `FR-CONT-004`: Panel CMS menyediakan manajemen pesan masuk: daftar pesan, filter status (`unread`, `read`, `archived`, `deleted`), dan penandaan pesan telah ditindaklanjuti.
  - *Batasan:* Sistem **bukan** live chat / instant messenger. Komunikasi dua arah lanjutan dilakukan via email reguler.

## 4.11 Modul 11: Media Library (`media.md`)
- **Tujuan:** Mengelola asset gambar, dokumen, dan berkas portofolio secara terpusat pada Supabase Storage.
- **Requirement:**
  - `FR-MED-001`: CMS menyediakan Media Library untuk mengunggah, meninjau, mencari, menyalin URL publik, dan menghapus berkas.
  - `FR-MED-002`: Validasi tipe MIME (hanya menerima file gambar yang diizinkan: PNG, JPG, JPEG, WEBP, SVG, dan dokumen PDF untuk resume).
  - `FR-MED-003`: Batas ukuran unggahan (*file size limit*) maksimal 5 MB per berkas.
  - `FR-MED-004`: Berkas disimpan pada Supabase Storage Bucket publik terproteksi.

## 4.12 Modul 12: Settings & Global SEO (`settings.md`)
- **Tujuan:** Mengatur konfigurasi global website dan metadata optimasi mesin pencari.
- **Requirement:**
  - `FR-SET-001`: Pengaturan umum: Judul website, tagline, email kontak utama, lokasi default, status ketersediaan kerja (*Available for Hire status badge*).
  - `FR-SET-002`: Pengaturan media sosial: URL tautan profil GitHub, LinkedIn, Instagram, X/Twitter, YouTube, dll.
  - `FR-SET-003`: Pengaturan SEO & Meta: Judul SEO default, deskripsi meta default, kata kunci (*keywords*), gambar Open Graph (*OG Image*), dan favicon.

## 4.13 Modul 13: Articles & Technical Blog (`articles.md`) — *Phase 2*
- **Tujuan:** Membangun otoritas dan kredibilitas teknis melalui artikel ulasan rekayasa perangkat lunak.
- **Requirement (Fase 2):**
  - `FR-ART-001`: Dukungan penulisan artikel dengan format Markdown / Rich Text.
  - `FR-ART-002`: Pengelompokan artikel berdasarkan kategori dan tags teknis.
  - `FR-ART-003`: Pengaturan status publikasi: `Draft` dan `Published`.
  - `FR-ART-004`: Halaman detail artikel publik dengan slug URL bersih, estimasi waktu baca (*reading time*), dan syntax highlighting untuk cuplikan kode.

---

# 5. Non-Functional Requirements (NFR)

## 5.1 Security
- **Autentikasi Aman:** Menggunakan Supabase Auth dengan penanganan token JWT yang aman. Tidak menyimpan plain text password di database.
- **Row Level Security (RLS):** Seluruh tabel PostgreSQL wajib mengaktifkan RLS:
  - Role `anon` (visitor publik): Hanya diizinkan operasi `SELECT` pada baris data dengan kolom `status = 'published'`, dan operasi `INSERT` pada tabel `messages` (dengan validasi).
  - Role `authenticated` (admin pemilik): Memiliki hak penuh `ALL` (SELECT, INSERT, UPDATE, DELETE).
- **Sanitasi & Validasi Input:** Validasi skema ketat menggunakan pustaka validasi (seperti Zod) di lapisan backend Express sebelum data menyentuh database. Menolak string dengan script berbahaya untuk mitigasi Cross-Site Scripting (XSS).
- **Proteksi API:**
  - Rate Limiting pada endpoint publik (terutama `/api/contact` dan `/api/auth/login`) untuk mencegah DoS dan spam.
  - Cross-Origin Resource Sharing (CORS) dikonfigurasi secara terbatas hanya untuk origin domain `firmanfarel.site` dan localhost saat development.
  - Implementasi HTTP Security Headers (Helmet, Content-Security-Policy, X-Content-Type-Options, Strict-Transport-Security).

## 5.2 Performance & Workload Distribution
Proyek ini mengadopsi filosofi **Smart Workload Balancing**:

```text
               DISTRIBUSI PEKERJAAN ARSITEKTURAL
  ┌─────────────────────────────────────────────────────────────┐
  │ CLIENT (Browser)            │ SERVER & CLOUD (Node/Supabase)│
  ├─────────────────────────────┼───────────────────────────────┤
  │ • Rendering antarmuka (DOM) │ • Verifikasi autentikasi & JWT│
  │ • Animasi & interaktivitas  │ • Eksekusi mutasi data (CUD)  │
  │ • Filtering & local sorting │ • Enforcing Row Level Security│
  │ • Manajemen form & UI state │ • Sanitasi input & validasi   │
  │ • Validasi instan di form   │ • Rate limiting & CORS policy │
  │ • Lazy loading aset/gambar  │ • Pengamanan kredensial/secret│
  └─────────────────────────────────────────────────────────────┘
```

- **Bundle Splitting:** Memisahkan bundle kode publik dan bundle kode CMS melalui *route-based dynamic imports* (`React.lazy()` / `Suspense`). Pengunjung halaman utama tidak pernah mendownload kode modul CMS admin.
- **Asset Delivery:** Seluruh gambar dikompresi ke format WebP/AVIF modern dan menerapkan atribut native `loading="lazy"` serta dimensi `width` dan `height` eksplisit untuk mencegah layout shift.
- **Efisiensi Request:** Menggunakan caching data di sisi client (misalnya React Query / SWR atau state cache terstruktur) untuk menghindari request berulang saat navigasi halaman.

## 5.3 Scalability & Maintainability
- **TypeScript End-to-End:** Seluruh codebase frontend dan backend menggunakan konfigurasi `strict: true`.
- **Modular Code Organization:**
  - Frontend menggunakan pola *feature-based architecture* di bawah `src/features/`.
  - Backend menggunakan pola *Separation of Concerns*: `Routes -> Middleware -> Controllers -> Services -> Repositories / Supabase Client`.
- **Clean Code Principles:** Mematuhi prinsip KISS (*Keep It Simple, Stupid*), DRY (*Don't Repeat Yourself*), dan YAGNI (*You Aren't Gonna Need It*).

## 5.4 SEO & Accessibility
- **SEO Standar Industri:**
  - Semantic HTML5 menyeluruh (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`).
  - Hierarki heading konsisten (tepat satu `<h1>` per halaman rute).
  - Clean URL berbasis slug representatif (contoh: `firmanfarel.site/projects/ecommerce-dashboard` bukan `?id=12`).
  - Dynamic Meta Tags (Title, Description, Canonical URL, Open Graph, Twitter Cards).
  - Ketersediaan file statis: `sitemap.xml` dan `robots.txt`.
  - Rich Snippet JSON-LD structured data untuk entitas `Person`, `WebSite`, dan `CreativeWork`.
- **Aksesibilitas (WCAG 2.2 AA):**
  - Navigasi keyboard penuh (termasuk *focus-visible indicators* dan skip-to-content links).
  - Kontras warna teks terhadap latar belakang minimal $4.5:1$ untuk teks reguler.
  - Setiap elemen gambar wajib memiliki atribut `alt` deskriptif.
  - Form input memiliki `<label>` yang terasosiasi secara tepat melalui `htmlFor`.

## 5.5 Availability & Deployment
- Frontend dan Backend API di-host di platform **Vercel** dengan arsitektur serverless function yang handal dan CDN global.
- Database PostgreSQL, Autentikasi, dan Storage dikelola oleh infrastruktur terkelola **Supabase** dengan uptime SLA $99.9\%$.
- Domain kustom `firmanfarel.site` dikonfigurasi melalui DNS Management **Hostinger** yang diarahkan ke nameserver/CNAME Vercel dengan sertifikat SSL/TLS otomatis (*Let's Encrypt*).

---

# 6. Scope Boundaries (Scope Matrix)

Untuk memastikan proyek selesai secara tepat waktu tanpa *scope creep*, batas-batas sistem dikunci secara tegas sebagai berikut:

## 6.1 In Scope (Phase 1 — MVP)

```text
┌────────────────────────────────────────────────────────┐
│                   IN SCOPE (MVP)                       │
├──────────────────────────┬─────────────────────────────┤
│ Public Website           │ Private CMS (/admin)        │
├──────────────────────────┼─────────────────────────────┤
│ • Hero / Landing Page    │ • Supabase Auth Login       │
│ • About Page             │ • Analytics Dashboard       │
│ • Skills Showcase        │ • Profile & Bio Editor      │
│ • Projects & Case Study  │ • Skills CRUD & Ordering    │
│ • Experience Timeline    │ • Projects CRUD & Workflows │
│ • Education History      │ • Experience CRUD           │
│ • Certificates Showcase  │ • Education CRUD            │
│ • Achievements Showcase  │ • Certificates CRUD         │
│ • Contact Form Submission│ • Achievements CRUD         │
│ • Resume PDF Download    │ • Message Inbox Management  │
│ • Responsive Mobile Nav  │ • Supabase Media Manager    │
│ • Basic SEO & Meta Tags  │ • Settings & Social Manager │
└──────────────────────────┴─────────────────────────────┘
```

## 6.2 Phase 2 Scope (Post-MVP)
- Modul Artikel / Technical Blog komprehensif (`articles.md`).
- Kategori dan Tags dinamis untuk artikel.
- Pencarian konten global (*Client-side full-text search*).
- Audit Trail & Activity Logging di CMS.
- Integrasi analitik performa pengunjung (privacy-friendly analytics).

## 6.3 Explicit Out of Scope (Apa yang TIDAK Dibuat)

> [!CAUTION]
> Batasan berikut adalah **harga mati** arsitektural. Pengembang dan AI Agent dilarang menambahkan kompleksitas di luar daftar ini tanpa persetujuan eksplisit dari Product Owner.

- ❌ **Multi-user / Multi-tenant CMS:** Sistem hanya memiliki 1 akun administrator (Owner). Tidak ada registrasi user publik atau sistem role hierarkis bertingkat.
- ❌ **SaaS / Portfolio Builder:** Website bukan platform penyedia jasa pembuatan portfolio untuk orang lain.
- ❌ **Drag-and-Drop Page Builder:** Desain dan layout dikontrol murni melalui source code React/CSS; CMS hanya mengelola payload data.
- ❌ **Social Network / Interaktivitas Publik:** Tidak ada fitur komentar publik, upvote/like, sistem pertemanan, atau follow.
- ❌ **Live Chat & Messaging Platform:** Form kontak hanya mengirimkan pesan ke inbox internal dan bukan platform chatting real-time.
- ❌ **Payment Gateway & E-Commerce:** Tidak ada sistem transaksi finansial, keranjang belanja, atau subscription.
- ❌ **Native Mobile Applications:** Aplikasi dikembangkan murni berbasis Web responsif untuk Desktop, Tablet, dan Smartphone.

---

# 7. Acceptance Criteria & Definition of Done

## 7.1 Global Definition of Done (DoD)
Suatu fitur atau modul baru dianggap **SELESAI (DONE)** apabila dan hanya apabila memenuhi seluruh rangkaian siklus pengembangan berikut:

```text
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Requirement │ ──> │   Database   │ ──> │  Backend API │ ──> │ UI Component │
│ Specification│     │ Schema & RLS │     │  & Endpoint  │     │   & Design   │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                       │
┌──────────────┐     ┌──────────────┐     ┌──────────────┐             │
│ Deployment & │ <── │ Verification │ <── │ Integration  │ <───────────┘
│ Documentation│     │  & Testing   │     │ & Error State│
└──────────────┘     └──────────────┘     └──────────────┘
```

1. **Schema & Migration:** Tabel PostgreSQL terdefinisi dengan tipe data tepat, foreign keys, constraints, indexes, dan RLS policies.
2. **Backend Logic & Validation:** Endpoint REST Express dibuat dengan schema validator (Zod) dan error handler konsisten.
3. **Frontend Integration:** Komponen React terintegrasi dengan penanganan lengkap untuk 4 kondisi: *Loading state, Error state, Empty state*, dan *Success state*.
4. **Responsive Layout:** Tampilan telah diverifikasi berfungsi optimal pada resolusi Mobile ($\le 640\text{px}$), Tablet ($768\text{px}$), dan Desktop ($\ge 1024\text{px}$).
5. **Type Safety:** Lulus pengecekan `tsc --noEmit` tanpa ada error tipe data atau penggunaan `any` sembarangan.
6. **Documentation Sync:** File dokumentasi terkait pada `context/05-modules/` dan `context/03-management/progress.md` telah diperbarui.

## 7.2 Module Acceptance Criteria Checklist

| Modul | Kriteria Keberterimaan (Acceptance Criteria) |
| :--- | :--- |
| **Auth** | Owner dapat login menggunakan email/password valid; token tersimpan aman; upaya login salah menampilkan pesan peringatan; route `/admin/*` tidak dapat diakses tanpa token valid. |
| **Dashboard**| Menampilkan angka agregat yang akurat sesuai database; kartu counter bereaksi terhadap penambahan data baru; loading skeleton tampil halus saat fetch. |
| **Profile** | Data profil live di halaman utama; link sosial berfungsi; form CMS berhasil mengupdate bio dan upload avatar baru; tombol download resume mengunduh berkas PDF aktif. |
| **Skills** | Kategori skill terkelompok rapi; ikon teknologi muncul dengan proporsional; CRUD CMS sukses mengubah susunan atau item skill secara real-time. |
| **Projects** | Daftar proyek publik dapat difilter; mengklik kartu proyek membuka halaman detail dengan slug yang benar; galeri gambar dapat dibuka; link demo dan source code aktif; proyek berstatus `Draft` terbukti tidak terlihat oleh publik. |
| **Experience**| Timeline pengalaman tersusun runtut kronologis mundur; badge status aktif/selesai akurat; CMS dapat mengedit poin-poin pencapaian. |
| **Education** | Menampilkan riwayat studi lengkap dengan gelar dan institusi; CMS mendukung penambahan riwayat akademik baru. |
| **Certificates**| Gambar sertifikat tampil tajam; nomor kredensial dan tombol verifikasi eksternal membuka tab baru secara benar. |
| **Achievements**| Penghargaan terpisah dari sertifikasi; deskripsi kompetensi tertera jelas; CMS dapat menambah pencapaian baru. |
| **Contact** | Form memvalidasi input kosong dan email salah; submit sukses memunculkan notifikasi visual; pesan langsung muncul di CMS inbox; rate limiter mencegah pengiriman beruntun dalam waktu singkat. |
| **Media** | Admin dapat mengunggah gambar/PDF; file non-gambar/non-PDF ditolak; URL berkas dapat disalin dan langsung dipakai di editor modul lain. |
| **Settings** | Perubahan title/meta tag di CMS langsung tercermin pada halaman publik setelah cache disegarkan. |

---

# 8. Alignment with Knowledge Base Structure

PRD ini merupakan dokumen acuan utama (**Tier-1 Priority**) yang menjadi pondasi bagi seluruh dokumen teknis di dalam folder `context/`:

```text
context/
│
├── PRD.md                             <-- Dokumen Ini (Master Contract & Requirement)
├── PROJECT_STATE.md                   <-- Status sesi kerja aktif, blocker, dan current task
├── README.md                          <-- Ringkasan panduan navigasi project context
│
├── 01-project/
│   ├── overview.md                    <-- Ringkasan bisnis, stakeholder, dan objektif
│   ├── architecture.md                <-- Desain arsitektur detail (Client-Server-Supabase-Vercel)
│   ├── database.md                    <-- Master Database Schema, ERD, konvensi penamaan
│   └── tech-stack.md                  <-- Spesifikasi pustaka, library, dan runtime versi
│
├── 02-development/
│   ├── conventions.md                 <-- Standar coding, struktur folder, konvensi Git
│   ├── api.md                         <-- Standar REST API global, request/response, format error
│   ├── testing.md                     <-- Strategi pengujian (Unit, Integration, E2E, UAT)
│   └── deployment.md                  <-- Panduan rilis production ke Vercel dan setup DNS Hostinger
│
├── 03-management/
│   ├── progress.md                    <-- Persentase progres modul & status task harian
│   ├── backlog.md                     <-- Daftar task backlog terprioritas
│   ├── decisions.md                   <-- Architecture Decision Records (ADR)
│   └── changelog.md                   <-- Riwayat perubahan sistem dan rilis
│
├── 04-setup/
│   ├── local-development.md           <-- Panduan langkah demi langkah menjalankan project di lokal
│   ├── environment-variables.md       <-- Kamus seluruh environment variable (.env)
│   ├── database-setup.md              <-- Panduan inisialisasi database Supabase & migrasi awal
│   ├── docker-setup.md                <-- Konfigurasi Docker container opsional untuk development
│   └── troubleshooting.md             <-- Solusi atas kendala umum saat setup/coding
│
└── 05-modules/
    ├── auth.md                        <-- Detail spesifikasi teknis Modul Autentikasi & Guard
    ├── dashboard.md                   <-- Detail spesifikasi teknis Modul CMS Dashboard
    ├── profile.md                     <-- Detail spesifikasi teknis Modul Profil & Resume
    ├── skills.md                      <-- Detail spesifikasi teknis Modul Manajemen Skill
    ├── projects.md                    <-- Detail spesifikasi teknis Modul Proyek & Case Study
    ├── experience.md                  <-- Detail spesifikasi teknis Modul Rekam Jejak Pengalaman
    ├── education.md                   <-- Detail spesifikasi teknis Modul Riwayat Pendidikan
    ├── certificates.md                <-- Detail spesifikasi teknis Modul Sertifikasi & Kredensial
    ├── achievements.md                <-- Detail spesifikasi teknis Modul Prestasi & Penghargaan
    ├── messages.md                    <-- Detail spesifikasi teknis Modul Form Kontak & Inbox
    ├── media.md                       <-- Detail spesifikasi teknis Modul Supabase Media Library
    ├── settings.md                    <-- Detail spesifikasi teknis Modul Konfigurasi & SEO
    └── articles.md                    <-- Detail spesifikasi teknis Modul Blog / Artikel [Phase 2]
```

---

# 9. Implementation Roadmap & Development Phases

Pengembangan dijalankan secara bertahap dan teratur dengan pendekatan sekuensial:

```text
Phase 0           Phase 1          Phase 2          Phase 3          Phase 4          Phase 5          Phase 6
Foundation  ───>  Database   ───>  Backend    ───>  Private    ───>  Public     ───>  Quality    ───>  Production
Setup             & RLS            API Layer        CMS Build        Portal           & Polishing      Deployment
```

- **Phase 0 — Foundation & Environment Setup:**
  Inisialisasi repository, konfigurasi workspace TypeScript, setup tooling (ESLint, Prettier), konfigurasi environment variable lokal, dan pembuatan struktur folder proyek.
- **Phase 1 — Database & Security Schema:**
  Pembuatan project Supabase, pembuatan tabel PostgreSQL, konfigurasi relasi, indexes, enum status, dan penulisan policy Row Level Security (RLS) lengkap.
- **Phase 2 — Backend API Development:**
  Pembangunan server Express.js, routing, middleware auth, skema validasi Zod, controller, service layer, dan integrasi Supabase SDK.
- **Phase 3 — Private CMS Implementation:**
  Pembangunan halaman login admin, routing guard, layout dashboard CMS, formulir manajemen CRUD untuk setiap modul, antarmuka media library, dan inbox pesan.
- **Phase 4 — Public Website Implementation:**
  Pembangunan antarmuka pengunjung publik: Homepage, Hero, About, Skills grid, Projects showcase & case study detail, Experience timeline, Education, Certificates, Achievements, Resume viewer/download, dan formulir kontak.
- **Phase 5 — Quality Assurance & Optimization:**
  Audit Lighthouse (Performance, Accessibility, Best Practices, SEO), optimasi core web vitals, implementasi meta tag dynamic, responsivitas layar, dan penanganan boundary error.
- **Phase 6 — Production Deployment:**
  Penyambungan repositori Git ke Vercel, konfigurasi build script, injeksi environment production, konfigurasi custom domain `firmanfarel.site` pada Hostinger DNS, verifikasi SSL, dan smoke testing pada production URL.

---

# 10. Core Architectural Decisions Summary

| Aspek Teknis | Keputusan Arsitektural | Justifikasi Rekayasa |
| :--- | :--- | :--- |
| **Product Type** | Personal Portfolio with Private CMS | Kebutuhan personal branding mandiri tanpa ketergantungan rebuild kode. |
| **CMS Architecture** | Subpath `/admin` (SPA Decoupled Route) | Menghindari kompleksitas multi-domain/CORS antar-subdomain di awal rilis. |
| **Frontend Framework** | React (Vite) + TypeScript | Ekosistem komponen yang kaya, fleksibilitas styling maksimal, dan performa tinggi. |
| **Backend Runtime** | Node.js + Express.js (TypeScript) | Standar industri clean backend dengan pemisahan tegas HTTP, business logic, & database. |
| **Database & Services**| Supabase (Postgres + Auth + Storage) | Mengeliminasi beban maintenance server database sendiri; RLS menjamin keamanan data. |
| **Deployment Target** | Vercel Serverless | Integrasi seamless dengan ekosistem frontend React, CDN global cepat, dan konfigurasi mudah. |
| **Domain Registrar** | Hostinger (`firmanfarel.site`) | Kepemilikan domain kustom untuk kredibilitas personal branding profesional. |
| **Design System** | Custom Vanilla CSS (Design Tokens) | Kontrol performa penuh, bebas bloatware class utility, estetika bespoke premium. |
