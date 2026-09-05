# System Changelog

## 2026-09-05 18:15 WIB

### Added
- Membuat dokumen master PRD (`context/PRD.md`) berdasarkan kebutuhan produk dan analisis mendalam.
- Menginisialisasi repositori Knowledge Base dan AI Context Repository (`context/`).
- Menambahkan dokumen arsitektur global: `01-project/overview.md`, `01-project/architecture.md`, `01-project/database.md`, dan `01-project/tech-stack.md`.
- Menambahkan standar pengembangan: `02-development/conventions.md`, `02-development/api.md`, `02-development/testing.md`, dan `02-development/deployment.md`.
- Menambahkan dokumen manajemen proyek: `03-management/progress.md`, `03-management/backlog.md`, `03-management/decisions.md` (ADR D001–D005), dan `03-management/changelog.md`.
- Menetapkan aturan tata kelola AI Agent (*AI Agent Governance*) dan siklus Definition of Done (DoD).

### Security
- Menetapkan kebijakan Row Level Security (RLS) pada seluruh tabel database PostgreSQL di Supabase.
- Menetapkan standar otentikasi JWT Bearer token dan pembatasan rate limiting pada formulir kontak publik.
