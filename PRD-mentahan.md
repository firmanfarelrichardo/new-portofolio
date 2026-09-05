Siap. Kita jadikan ini sebagai **dokumen PRD utama** untuk project `firmanfarel.site`. Saya akan membuatnya cukup detail sehingga nantinya bisa menjadi acuan **UI/UX → database → API → frontend → CMS → testing → deployment**, tetapi tetap menjaga scope agar tidak berubah menjadi WordPress mini. 😄

# Product Requirements Document (PRD)

## Personal Portfolio Website with Private CMS

**Project:** Firman Farel Personal Portfolio CMS
**Domain:** `firmanfarel.site`
**Platform:** Web
**Status:** Planning / Pre-development
**Target:** Personal branding & professional portfolio
**Architecture:** Full JavaScript/TypeScript
**Frontend:** React + TypeScript
**Backend:** Node.js + Express.js + TypeScript
**Database & Backend Services:** Supabase
**Deployment:** Vercel
**Domain Provider:** Hostinger

---

# 1. Product Overview

## 1.1 Deskripsi Produk

**Personal Portfolio CMS** adalah sebuah website portfolio personal yang digunakan untuk menampilkan identitas, kemampuan, pengalaman, pendidikan, project, sertifikat, pencapaian, dan informasi profesional pemilik website.

Website dilengkapi dengan **Private Content Management System (CMS)** yang hanya dapat diakses oleh pemilik untuk mengelola seluruh konten portfolio tanpa harus melakukan perubahan secara langsung pada source code.

Sistem terdiri dari dua bagian utama:

```text
                    FIRMANFAREL.SITE
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
       PUBLIC WEBSITE              PRIVATE CMS
             │                           │
         Visitor                       Owner
             │                           │
          READ ONLY                MANAGE CONTENT
                                         │
                                         ▼
                                    SUPABASE
```

---

# 2. Product Vision

> **Membangun personal portfolio yang cepat, modern, profesional, informatif, dan mudah dikelola melalui CMS privat sehingga seluruh perkembangan profesional pemilik dapat diperbarui secara mandiri tanpa mengubah source code website.**

Portfolio bukan hanya menjadi "website biodata", tetapi menjadi **representasi digital perkembangan profesional**.

---

# 3. Product Goals

## 3.1 Primary Goals

### G1 — Personal Branding

Menyediakan media profesional untuk memperkenalkan:

* identitas
* pendidikan
* keahlian
* pengalaman
* project
* sertifikasi
* pencapaian
* aktivitas profesional
* tulisan/artikel

### G2 — Content Management

Memungkinkan owner mengelola konten melalui CMS.

Owner dapat:

* Create
* Read
* Update
* Delete
* Publish
* Archive

tanpa mengubah source code.

### G3 — Performance

Website harus:

* cepat dimuat
* responsive
* hemat resource server
* meminimalkan request
* memanfaatkan browser/client untuk pekerjaan yang aman dilakukan di sisi client
* mengoptimalkan asset delivery

### G4 — Maintainability

Codebase harus:

* Type-safe
* modular
* mudah dipahami
* mudah dikembangkan
* memiliki separation of concerns
* memiliki struktur yang konsisten

### G5 — Security

CMS harus memiliki perlindungan terhadap:

* unauthorized access
* brute-force login
* injection
* XSS
* CSRF sesuai arsitektur autentikasi
* insecure file upload
* unauthorized data modification

---

# 4. Non-Goals

Hal berikut **tidak menjadi tujuan project**:

### ❌ Multi-user CMS

Tidak ada:

```text
User A
User B
User C
```

### ❌ Portfolio Builder

Pengguna tidak dapat membuat template/layout sendiri.

### ❌ SaaS

Website bukan layanan pembuatan portfolio untuk publik.

### ❌ Website Marketplace

Tidak ada:

* template marketplace
* theme marketplace
* plugin marketplace

### ❌ Public Registration

Visitor tidak dapat membuat akun.

### ❌ Social Network

Tidak ada:

* follow
* like
* comment
* messaging antar-user

### ❌ Full Website Builder

CMS tidak menyediakan:

```text
Drag & Drop Page Builder
HTML Editor
CSS Editor
Layout Builder
```

---

# 5. Target Users

Hanya ada dua aktor.

## 5.1 Visitor

Pengunjung website.

### Karakteristik

Kemungkinan berasal dari:

* recruiter
* interviewer
* dosen
* teman/kolaborator
* developer
* komunitas teknologi
* calon client
* orang yang menemukan portfolio melalui Google

### Tujuan

Mencari informasi mengenai:

> "Siapa Firman Farel dan apa yang sudah dia kerjakan?"

---

# 6. Admin / Owner

Owner adalah satu-satunya pengguna CMS.

### Tujuan

Mengelola seluruh informasi portfolio.

```text
OWNER
 │
 ├── Profile
 ├── Skills
 ├── Projects
 ├── Experience
 ├── Education
 ├── Certificates
 ├── Achievements
 ├── Articles
 ├── Media
 ├── Messages
 └── Settings
```

---

# 7. Product Structure

Sistem terdiri dari:

```text
┌────────────────────────────────────────────┐
│              FIRMANFAREL.SITE              │
├──────────────────────┬─────────────────────┤
│                      │                     │
│   PUBLIC WEBSITE     │      PRIVATE CMS    │
│                      │                     │
│ Home                 │ Login              │
│ About                │ Dashboard          │
│ Skills               │ Profile            │
│ Projects             │ Projects            │
│ Experience           │ Skills             │
│ Education            │ Experience          │
│ Certificates         │ Education           │
│ Achievements         │ Certificates        │
│ Articles             │ Achievements        │
│ Contact              │ Articles            │
│                      │ Media               │
│                      │ Messages            │
│                      │ Settings             │
└──────────────────────┴─────────────────────┘
```

---

# 8. Public Website Requirements

## 8.1 Home

Home menjadi halaman utama personal branding.

### Konten

* Profile photo
* Name
* Professional headline
* Short introduction
* CTA
* Featured projects
* Selected skills
* Recent experience
* Recent articles
* Social links

Contoh struktur:

```text
Hero
 ↓
Introduction
 ↓
Featured Projects
 ↓
Skills
 ↓
Experience
 ↓
Latest Articles
 ↓
Contact CTA
 ↓
Footer
```

---

# 9. About

Menampilkan informasi lebih lengkap mengenai owner.

### Data

* biography
* interests
* career focus
* education summary
* professional goals
* profile image

---

# 10. Skills

Menampilkan kemampuan berdasarkan kategori.

Contoh:

```text
Programming
├── JavaScript
├── TypeScript
├── Python
└── PHP

Frontend
├── React
├── Tailwind CSS
└── HTML/CSS

Backend
├── Node.js
├── Express.js
└── Laravel

Database
├── PostgreSQL
├── MySQL
└── MongoDB

Tools
├── Git
├── Docker
├── VS Code
└── Postman
```

### Setiap skill

Minimal memiliki:

* name
* category
* icon
* description
* proficiency/level
* display order
* status

---

# 11. Projects

**Projects merupakan core feature.**

### Project Card

Menampilkan:

* thumbnail
* title
* short description
* technologies
* status
* year
* link

### Project Detail

Memiliki:

* title
* slug
* thumbnail
* gallery
* overview
* problem
* solution
* features
* architecture
* technologies
* role
* challenges
* outcome
* GitHub
* live demo
* documentation

Tidak semua field harus ditampilkan jika kosong.

---

# 12. Experience

Dapat digunakan untuk:

* organisasi
* internship
* freelance
* competition
* KKN
* research
* project experience
* kepanitiaan

Data:

```text
Position
Organization
Description
Location
Start Date
End Date
Current
Technologies
Achievements
```

---

# 13. Education

Data:

* institution
* degree
* field
* start date
* end date
* current
* description
* achievements

---

# 14. Certificates

Data:

* certificate name
* issuer
* issue date
* expiration date
* credential ID
* credential URL
* certificate image
* description

---

# 15. Achievements

Ini dipisahkan dari certificate karena keduanya berbeda.

Contoh:

```text
Competition
Award
Publication
Scholarship
Achievement
Recognition
```

Data:

* title
* issuer
* date
* description
* image
* URL
* category

---

# 16. Articles / Blog

**Optional tetapi direkomendasikan.**

Artikel dapat digunakan untuk membangun:

> technical credibility

Contoh:

* React
* TypeScript
* AI
* Data Science
* Software Engineering
* Database
* DevOps
* pengalaman project

### Article

```text
Title
Slug
Excerpt
Content
Thumbnail
Category
Tags
Author
Status
Published Date
SEO Title
SEO Description
```

---

# 17. Contact

Public visitor dapat mengirim pesan.

Form:

```text
Name
Email
Subject
Message
```

Flow:

```text
Visitor
   ↓
Contact Form
   ↓
Validation
   ↓
Backend/API
   ↓
Supabase
   ↓
CMS Messages
```

CMS:

```text
Messages
├── Unread
├── Read
├── Archived
└── Deleted
```

**Batasan:** sistem tidak menjadi platform komunikasi. Tidak ada live chat.

---

# 18. Resume / CV

CMS dapat mengelola satu atau beberapa versi CV.

Contoh:

```text
Resume
├── CV General
├── CV Software Engineer
└── CV Data/AI
```

Namun public website cukup menyediakan:

> Download Resume

Sedangkan file disimpan di storage.

---

# 19. CMS Requirements

## 19.1 Login

Halaman:

```text
/admin/login
```

Fitur:

* email/username sesuai auth provider
* password
* remember session
* logout
* session expiration

Authentication sebaiknya menggunakan **Supabase Auth**, sehingga kita tidak perlu membangun sistem password hashing dan authentication dari nol.

---

# 20. Dashboard

Dashboard memberikan ringkasan:

```text
┌─────────────────────────────────────┐
│ Dashboard                           │
├─────────┬─────────┬─────────┬───────┤
│Projects │ Skills  │ Articles│ Certs │
│   12    │   24    │    8    │  10   │
└─────────┴─────────┴─────────┴───────┘
```

Kemudian:

* recent projects
* recent articles
* unread messages
* draft content
* quick actions

Dashboard **tidak perlu analytics kompleks pada MVP**.

---

# 21. CMS Content Management

Semua modul menggunakan pola:

```text
List
 ↓
View
 ↓
Create
 ↓
Edit
 ↓
Delete
 ↓
Publish / Archive
```

Modul:

* Profile
* Skills
* Projects
* Experience
* Education
* Certificates
* Achievements
* Articles
* Resume
* Messages

---

# 22. Draft & Publishing

Konten tertentu memiliki status:

```text
DRAFT
  │
  ▼
PUBLISHED
  │
  ▼
ARCHIVED
```

### Draft

Tidak tampil di public website.

### Published

Tampil di public website.

### Archived

Tidak tampil tetapi tidak langsung dihapus.

---

# 23. Media Management

Media Library digunakan untuk mengelola:

* profile images
* project images
* certificate images
* article thumbnails
* resume
* other assets

Contoh:

```text
Media Library

[All] [Images] [Documents]

┌────┐ ┌────┐ ┌────┐
│IMG │ │IMG │ │IMG │
└────┘ └────┘ └────┘
```

Storage menggunakan **Supabase Storage**.

---

# 24. Website Settings

CMS menyediakan pengaturan global.

### General

* website title
* description
* owner name
* email
* location

### Social

* GitHub
* LinkedIn
* Instagram
* YouTube
* X
* other platforms

### SEO

* default title
* default description
* OG image
* favicon

### Appearance

Untuk MVP, **design utama tetap dikontrol source code**.

CMS hanya mengatur konten/configuration yang memang diperlukan.

---

# 25. Technical Architecture

Stack yang kamu pilih:

```text
                CLIENT
                  │
                  ▼
              React + TS
                  │
           React Router
                  │
        ┌─────────┴─────────┐
        │                   │
      Public               CMS
        │                   │
        └─────────┬─────────┘
                  │
               API Layer
                  │
                  ▼
          Node.js + Express
                  │
                  ▼
              Supabase
        ┌─────────┼─────────┐
        │         │         │
     Database    Auth     Storage
   PostgreSQL
```

---

# 26. Frontend Architecture

Frontend menggunakan:

**React + TypeScript**

Struktur konseptual:

```text
src/
├── components/
├── layouts/
├── pages/
│   ├── public/
│   └── admin/
├── features/
│   ├── projects/
│   ├── skills/
│   ├── experience/
│   └── articles/
├── hooks/
├── services/
├── lib/
├── types/
├── utils/
├── routes/
└── assets/
```

Kita akan menggunakan **feature-based architecture** pada bagian yang kompleks agar tidak menjadi folder `components/` berisi 300 file. 😄

---

# 27. Backend Architecture

Node.js + Express.js + TypeScript.

Konsep:

```text
backend/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middleware/
├── validators/
├── types/
├── utils/
└── config/
```

Flow:

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Validation
   ↓
Controller
   ↓
Service
   ↓
Repository / Supabase
   ↓
Response
```

Tujuannya memisahkan:

**HTTP logic ≠ business logic ≠ database logic.**

---

# 28. Database

Database menggunakan **PostgreSQL melalui Supabase**.

Entitas awal:

```text
profiles
skills
skill_categories
projects
project_technologies
experiences
education
certificates
achievements
articles
article_categories
tags
article_tags
media
messages
resumes
settings
```

Namun ERD final **belum kita tetapkan pada tahap PRD**.

Kita akan merancangnya setelah requirement selesai.

---

# 29. Authentication & Authorization

Supabase Auth:

```text
Owner
 ↓
Supabase Auth
 ↓
Authenticated Session
 ↓
Admin Route
 ↓
CMS
```

Database harus menggunakan **Row Level Security (RLS)** sebagai lapisan pertahanan tambahan.

Prinsip:

> Jangan hanya mengandalkan frontend untuk menentukan siapa yang boleh mengakses data.

---

# 30. Performance Strategy

Ini salah satu requirement penting dari project kamu.

Targetnya:

> **Server melakukan pekerjaan yang memang harus dilakukan server, sedangkan pekerjaan yang aman dan efisien dilakukan client dipindahkan ke browser.**

Tetapi kita perlu menghindari interpretasi ekstrem seperti:

> "Semua pekerjaan diberikan kepada user."

Tidak semua pekerjaan cocok dilakukan client.

---

## 30.1 Client-side

Browser menangani:

* rendering UI
* animations
* filtering
* sorting dataset kecil
* UI state
* form state
* interaction
* sebagian validasi
* lazy loading component
* image lazy loading

---

## 30.2 Server-side

Server menangani:

* authentication verification
* authorization
* database access
* sensitive operations
* validation
* contact submission
* CMS mutations
* security checks
* secret/API key operations

---

# 31. Performance Principles

### Principle 1 — Minimize JavaScript

Jangan membuat seluruh website menjadi JavaScript-heavy tanpa alasan.

### Principle 2 — Code Splitting

CMS tidak perlu ikut di-load ketika visitor membuka homepage.

```text
Visitor
 ↓
Public Bundle
```

sedangkan:

```text
/admin
 ↓
Admin Bundle
```

### Principle 3 — Lazy Loading

Component berat hanya dimuat ketika diperlukan.

### Principle 4 — Image Optimization

* WebP/AVIF jika memungkinkan
* responsive image
* lazy loading
* thumbnail
* compression

### Principle 5 — Caching

Data portfolio yang jarang berubah dapat di-cache.

### Principle 6 — Minimize API Calls

Jangan:

```text
Home
 ↓
20 API requests
```

kalau bisa:

```text
Home
 ↓
1 optimized request
```

atau data tertentu diambil secara terpisah hanya ketika diperlukan.

---

# 32. Vercel Deployment Architecture

Rencana deployment:

```text
                   firmanfarel.site
                          │
                       Vercel
                          │
              ┌───────────┴───────────┐
              │                       │
           Frontend              Backend/API
           React                 Express
              │                       │
              └───────────┬───────────┘
                          │
                       Supabase
              ┌───────────┼───────────┐
              │           │           │
          PostgreSQL     Auth       Storage
```

Namun ada satu **technical consideration penting**:

Express.js secara tradisional berjalan sebagai **long-running Node server**, sedangkan Vercel lebih berorientasi pada serverless/function-based deployment.

Karena itu, pada fase technical architecture nanti kita harus menentukan apakah:

1. Express dijalankan sebagai Vercel-compatible API/functions, atau
2. backend Express ditempatkan pada service lain.

Karena kamu menetapkan Vercel sebagai deployment target, **kita tidak akan mengasumsikan deployment Express begitu saja sebelum diuji terhadap arsitektur Vercel yang kita pilih.**

---

# 33. Domain

Domain:

> `firmanfarel.site`

Domain dibeli melalui Hostinger.

Target:

```text
https://firmanfarel.site
```

CMS dapat menggunakan:

```text
https://firmanfarel.site/admin
```

Saya lebih menyarankan **subpath `/admin` terlebih dahulu** daripada:

```text
admin.firmanfarel.site
```

karena lebih sederhana.

---

# 34. SEO

SEO merupakan bagian penting karena portfolio harus dapat ditemukan melalui search engine.

Requirement:

* semantic HTML
* metadata
* title
* description
* Open Graph
* Twitter/X card
* canonical URL
* sitemap
* robots.txt
* structured data
* clean URL
* slug
* responsive
* performance

Contoh:

```text
firmanfarel.site/projects/mer-system
```

bukan:

```text
firmanfarel.site/project?id=123
```

---

# 35. Accessibility

Minimal:

* keyboard navigation
* semantic HTML
* proper heading hierarchy
* alt text
* sufficient contrast
* focus state
* accessible form
* ARIA hanya jika diperlukan

Target minimal:

> WCAG 2.2 AA principles

---

# 36. Security Requirements

### Authentication

* Supabase Auth
* secure session
* logout
* protected routes

### Authorization

* RLS
* server-side authorization
* admin-only mutations

### Input

* validation
* sanitization
* type checking

### API

* rate limiting
* CORS
* security headers
* request validation

### File Upload

Validasi:

* MIME type
* extension
* size
* filename
* storage path

Tidak menerima sembarang file.

---

# 37. Scope MVP

Agar project tidak melebar, MVP kita tetapkan:

## Public

```text
Home
About
Skills
Projects
Project Detail
Experience
Education
Certificates
Achievements
Contact
Resume
```

## CMS

```text
Login
Dashboard
Profile
Skills
Projects
Experience
Education
Certificates
Achievements
Messages
Media
Settings
Resume
```

## Technical

```text
Authentication
Authorization
Database
Storage
API
Validation
Responsive UI
SEO basic
Security basic
Performance optimization
Deployment
```

---

# 38. Phase 2

Setelah MVP stabil:

```text
Blog
Tags
Categories
Advanced SEO
Analytics
Search
Advanced Media Management
Activity Log
```

---

# 39. Phase 3

Optional:

```text
Advanced Analytics
Audit Trail
Automated Backup
Performance Monitoring
API Documentation
PWA
Offline support
Advanced caching
```

---

# 40. Explicit Scope Boundaries

Ini **harus kita pegang selama development**.

### Tidak dibuat:

❌ Multi-user
❌ Public registration
❌ SaaS
❌ Multi-tenant
❌ Subscription
❌ Payment
❌ Portfolio marketplace
❌ Theme marketplace
❌ Website builder
❌ Drag-and-drop page builder
❌ Public comments
❌ Social network
❌ Live chat
❌ Complex RBAC
❌ Mobile application

---

# 41. Success Metrics

Project dianggap berhasil apabila:

### Functional

* Owner dapat login.
* Owner dapat mengelola seluruh konten.
* Konten CMS tampil pada public website.
* Draft tidak tampil kepada visitor.
* Published content tampil.
* Visitor dapat mengirim contact message.

### Performance

Target awal:

| Metric                   | Target |
| ------------------------ | -----: |
| Lighthouse Performance   |   ≥ 90 |
| Accessibility            |   ≥ 90 |
| Best Practices           |   ≥ 90 |
| SEO                      |   ≥ 90 |
| First Contentful Paint   | < 1.8s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift  |  < 0.1 |

Angka tersebut merupakan **target engineering**, bukan jaminan absolut karena performa aktual dipengaruhi jaringan, device, asset, dan konfigurasi deployment.

---

# 42. Definition of Done

Sebuah fitur dianggap selesai apabila:

```text
Requirement
    ↓
UI
    ↓
API
    ↓
Database
    ↓
Validation
    ↓
Security
    ↓
Error Handling
    ↓
Loading State
    ↓
Empty State
    ↓
Responsive
    ↓
Testing
    ↓
Deployment
```

Jadi fitur **belum dianggap selesai hanya karena tombolnya sudah bisa diklik**.

---

# 43. Development Principles

Kita gunakan prinsip:

### KISS

> Keep It Simple, Stupid.

Jangan membuat sistem kompleks tanpa alasan.

### DRY

Hindari duplikasi logic.

### Separation of Concerns

Pisahkan:

```text
UI
Business Logic
API
Database
```

### Type Safety

Gunakan TypeScript secara konsisten.

Hindari:

```typescript
any
```

sebisa mungkin.

### Security by Design

Security bukan fitur tambahan di akhir.

### Performance by Design

Performance diperhitungkan sejak awal.

---

# 44. Final Product Architecture

Gambaran besarnya:

```text
                         USER
                          │
                          ▼
                  firmanfarel.site
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
       PUBLIC WEBSITE             /admin
              │                       │
           Visitor                   Owner
              │                       │
              ▼                       ▼
           React                  React CMS
              │                       │
              └──────────┬────────────┘
                         │
                    API / Services
                         │
                    Node.js/Express
                         │
                    Supabase
              ┌──────────┼──────────┐
              │          │          │
          PostgreSQL    Auth      Storage
```

---

# 45. Prioritas Development

Saya sarankan kita **jangan mengerjakan semua fitur sekaligus**.

Urutannya:

### Phase 0 — Foundation

```text
Project setup
TypeScript
React
Express
Supabase
Environment
Git
Architecture
Linting
Formatting
```

### Phase 1 — Database

```text
Schema
Relationships
Indexes
RLS
Storage
```

### Phase 2 — Backend

```text
Express
Routes
Controllers
Services
Validation
Error handling
Authentication
```

### Phase 3 — CMS

```text
Login
Dashboard
CRUD
Media
Publishing
Settings
```

### Phase 4 — Public Website

```text
Home
About
Projects
Skills
Experience
Education
Certificates
Contact
```

### Phase 5 — Quality

```text
SEO
Accessibility
Performance
Security
Testing
```

### Phase 6 — Deployment

```text
Vercel
Supabase
Hostinger DNS
firmanfarel.site
HTTPS
Production environment
```

---

# 46. Keputusan Arsitektur yang Kita Tetapkan

Untuk sementara, saya akan mengunci requirement berikut:

| Area                | Keputusan              |
| ------------------- | ---------------------- |
| Product             | Personal Portfolio CMS |
| Owner               | 1 orang                |
| CMS                 | Private                |
| Multi-user          | ❌                      |
| Frontend            | React                  |
| Language            | TypeScript             |
| Backend             | Node.js                |
| Framework           | Express.js             |
| Database            | PostgreSQL             |
| Database Platform   | Supabase               |
| Auth                | Supabase Auth          |
| Storage             | Supabase Storage       |
| Deployment target   | Vercel                 |
| Domain              | `firmanfarel.site`     |
| Domain registrar    | Hostinger              |
| Public registration | ❌                      |
| Portfolio builder   | ❌                      |
| Blog                | Phase 2                |
| Analytics           | Phase 2                |
| SEO                 | ✅                      |
| Security            | ✅                      |
| Performance         | High priority          |
| Responsive          | ✅                      |
| Accessibility       | ✅                      |

---

## 🧠 Catatan paling penting sebelum coding

Ada **3 hal yang menurut saya perlu kita pertahankan sebagai prinsip utama project ini**.

### 1. Jangan over-engineer

Kita tidak perlu membuat:

> "CMS enterprise."

Kita membuat:

> **CMS personal yang engineering-nya profesional.**

---

### 2. "Beban ke user" bukan berarti server dibuat bodoh

Strategi yang benar adalah:

```text
                 REQUEST
                    │
          ┌─────────┴─────────┐
          │                   │
       SERVER               CLIENT
          │                   │
     Sensitive            UI rendering
     Database             Animation
     Auth                 Filtering
     Mutation             Interaction
     Security             Local state
```

Kita **memindahkan pekerjaan yang memang cocok ke browser**, bukan sekadar memindahkan semua pekerjaan ke user.

---

### 3. Kita jangan langsung coding

PRD ini baru **kontrak produk**.

Langkah berikutnya seharusnya:

**PRD → System Requirements → Sitemap → User Flow → Feature Specification → Database/ERD → Architecture → Tech Stack Detail → UI/UX → Coding.**

Dan khusus stack yang kamu pilih, kita nanti perlu membuat keputusan teknis yang cukup penting mengenai **React + Express + Vercel**, terutama bagaimana API Express kita deploy secara optimal di lingkungan Vercel tanpa mengorbankan performa. Ini lebih baik kita selesaikan pada tahap **System Architecture**, bukan ditebak saat sudah masuk coding.
