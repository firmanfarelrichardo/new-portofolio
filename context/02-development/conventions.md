# Development Conventions & Standards

## Naming Conventions

### 1. File & Direktori
- **Komponen React:** `PascalCase.tsx`, contoh: `Navbar.tsx`, `ProjectCard.tsx`, `SkillBadge.tsx`.
- **Halaman Rute:** `kebab-case.tsx` atau direktori `[feature]/index.tsx`, contoh: `project-detail.tsx`.
- **Utilitas & Hooks:** `camelCase.ts`, contoh: `useAuth.ts`, `formatDate.ts`, `apiClient.ts`.
- **Direktori:** `kebab-case`, contoh: `src/features/projects/`, `src/components/ui/`.
- **Database Tables & Columns:** `snake_case`, contoh: `display_order`, `is_featured`, `project_technologies`.

### 2. Kode TypeScript / JavaScript
- **Variables & Functions:** `camelCase`, contoh: `fetchProjectBySlug`, `isSubmitting`.
- **Interfaces & Types:** `PascalCase`, contoh: `ProjectItem`, `UserSession`, `ApiResponse<T>`.
- **Constants:** `UPPER_SNAKE_CASE`, contoh: `MAX_FILE_SIZE_BYTES`, `API_RATE_LIMIT`.
- **Enums:** `PascalCase` dengan nilai string, contoh:
  ```typescript
  enum ContentStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived',
  }
  ```

---

## Folder Structure Guidelines

### Frontend (`client/` atau `src/`)
```text
src/
├── assets/                  # Asset gambar statis, logo, dan SVG
├── components/              # Komponen antarmuka global reusable
│   ├── layout/              # Header, Footer, AdminSidebar, Container
│   └── ui/                  # Button, Input, Modal, Badge, Toast, Spinner
├── features/                # Domain-driven feature modules
│   ├── auth/                # Login form, auth hooks, session context
│   ├── dashboard/           # Metrik cards, recent activity feed
│   ├── projects/            # ProjectCard, ProjectGrid, ProjectDetail, ProjectForm
│   ├── skills/              # SkillCategoryGrid, SkillItem, SkillForm
│   ├── experience/          # ExperienceTimeline, ExperienceItem
│   ├── contact/             # ContactForm, MessageList
│   └── media/               # MediaUploader, MediaGalleryModal
├── hooks/                   # Custom global React hooks
├── services/                # API client functions (REST call wrappers)
├── types/                   # Definisi interface TypeScript global
├── utils/                   # Fungsi pembantu (date formatter, validator)
├── styles/                  # File CSS tokens dan stylesheets terpisah
├── routes/                  # Konfigurasi React Router & route guards
├── App.tsx                  # Root component
└── main.tsx                 # Entrypoint Vite
```

### Backend (`server/` atau `api/`)
```text
server/
├── config/                  # Konfigurasi env, supabase client, cors
├── controllers/             # HTTP controller handlers
├── middleware/              # Auth guard, rate limiter, error handler, validator
├── repositories/            # Database query layer (Supabase SDK calls)
├── routes/                  # Express route definitions (/api/...)
├── services/                # Pure business logic layer
├── types/                   # Interface request/response Express
├── utils/                   # Helper functions (logger, response formatter)
├── validators/              # Zod validation schemas
├── app.ts                   # Express application setup
└── index.ts                 # Server entrypoint / Vercel serverless export
```

---

## Coding Standards & Principles

1. **Strict Type Safety:**
   - Dilarang keras menggunakan tipe `any` tanpa alasan darurat. Gunakan `unknown` jika tipe belum pasti, lalu lakukan type narrowing.
   - Aktifkan `strict: true` pada `tsconfig.json`.
2. **KISS & DRY:**
   - Jangan membuat abstraksi sebelum ada kebutuhan pengulangan nyata (minimal 3x duplikasi kode).
   - Buat fungsi kecil dan modular dengan tanggung jawab tunggal (*Single Responsibility Principle*).
3. **Pemisahan Logika & UI:**
   - Komponen React hanya bertugas menampilkan data dan menangani event pengguna. Logika manipulasi data kompleks dipindahkan ke custom hook atau utility function.
   - Controller Express hanya membaca input HTTP dan memanggil Service; tidak melakukan query database langsung.
4. **Resilient Error Handling:**
   - Seluruh asynchronous operation wajib dibungkus dalam blok `try...catch` atau didukung *error boundary*.
   - Respons error backend wajib konsisten mengikuti format standar `api.md`.

---

## Git Standards & Workflow

### Branching Model
- `main`: Branch produksi yang selalu siap rilis dan terhubung ke Vercel production deployment.
- `dev` / `feature/[nama-fitur]`: Branch pengembangan aktif.

### Commit Messages (Conventional Commits)
Format commit wajib menggunakan standar conventional commit:
- `feat: [deskripsi]` (Fitur baru)
- `fix: [deskripsi]` (Perbaikan bug)
- `docs: [deskripsi]` (Pembaruan dokumentasi)
- `style: [deskripsi]` (Perubahan format kode, CSS, tanpa mengubah logika)
- `refactor: [deskripsi]` (Refactoring kode tanpa mengubah fungsionalitas)
- `perf: [deskripsi]` (Peningkatan performa)
- `chore: [deskripsi]` (Pembaruan dependencies, konfigurasi build)

Contoh:
```text
feat(projects): add case study detail page with image lightbox
fix(contact): sanitize input string to prevent script injection
docs(prd): update functional requirements for media upload
```

---

## Documentation Standards
- Setiap modul baru yang dibuat wajib memiliki berkas spesifikasi di `context/05-modules/`.
- Perubahan arsitektur sistem yang berdampak luas wajib dicatat sebagai entri baru pada `context/03-management/decisions.md`.
- Status harian dan persentase penyelesaian task wajib dicatat di `context/03-management/progress.md`.
