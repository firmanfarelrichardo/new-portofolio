# MODULE: ADMIN DASHBOARD

## Overview
Modul Admin Dashboard berfungsi sebagai pusat kendali (*command center*) bagi pemilik situs setelah berhasil login ke panel CMS. Modul ini menyajikan ringkasan metrik data, notifikasi pesan baru yang belum dibaca, daftar aktivitas pembaruan terakhir, serta tombol aksi cepat (*Quick Actions*).

---

## Objectives
- Menyediakan ikhtisar eksekutif data portofolio dalam satu layar tampilan.
- Memberikan visibilitas instan atas pesan kontak masuk baru (*unread messages*).
- Mempermudah navigasi langsung ke formulir penambahan data proyek, keahlian, atau media.

---

## Stakeholders
### Admin / Owner (Firman Farel)
Pengguna tunggal yang memantau metrik agregat dan mengelola konten portofolio.

---

## Functional Requirements
### FR-DASH-001: Counter Metrik Agregat
Menampilkan kartu ringkasan jumlah:
- Total Proyek (beserta pembagian *Published* vs *Draft*)
- Total Keahlian (Skills)
- Total Sertifikasi
- Total Pengalaman
- Pesan Masuk Belum Dibaca (*Unread Messages Badge*)
### FR-DASH-002: Recent Activity Feed
Menampilkan daftar 5 aktivitas pembaruan konten atau pesan masuk terakhir dengan cap waktu relatif (contoh: *2 jam yang lalu*).
### FR-DASH-003: Quick Action Buttons
Pintasan satu klik untuk: "Tambah Proyek Baru", "Unggah Media", dan "Lihat Inbox Pesan".

---

## Business Rules
### BR-DASH-001: Data Freshness
Angka metrik dihitung secara real-time dari database saat dashboard dibuka atau saat pengguna menyegarkan halaman.

---

## Workflow
```text
Admin Buka /admin/dashboard ──> Frontend Panggil GET /api/dashboard/metrics 
  ──> Express Kumpulkan Count dari Tabel Supabase 
  ──> Render Metrik Cards & Feed ──> Klik Quick Action ──> Masuk Form Terkait
```

---

## Database Design
Modul ini membaca data agregat dari tabel: `projects`, `skills`, `certificates`, `experiences`, dan `messages`.

---

## Backend Design
### Services
`dashboardService.ts`: Menjalankan query count asinkron secara paralel menggunakan `Promise.all()` pada Supabase client:
- `projects.select('*', { count: 'exact', head: true })`
- `messages.select('*', { count: 'exact', head: true }).eq('status', 'unread')`
- dll.

---

## API Endpoints

### Endpoint List
| Method | Path | Purpose | Authorization | Request | Response Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/dashboard/metrics` | Ambil ringkasan metrik agregat | Authenticated | None | 200 |

### Sample JSON Responses
#### Success (200 OK)
```json
{
  "success": true,
  "data": {
    "projects": { "total": 12, "published": 10, "draft": 2 },
    "skills": 24,
    "certificates": 8,
    "experiences": 5,
    "unreadMessages": 3
  },
  "message": "Metrik dashboard berhasil dimuat"
}
```

---

## Frontend Design
### Pages
- `/admin/dashboard`: Halaman utama panel admin CMS.
### Components
- `MetricCard.tsx`: Komponen kartu counter dengan ikon, nilai numerik, dan label deskriptif.
- `QuickActionsBar.tsx`: Baris tombol aksi cepat.
- `RecentActivityList.tsx`: Daftar linimasa aktivitas pembaruan terakhir.

---

## UI / UX Requirements
- Grid responsif: 4 kolom pada desktop, 2 kolom pada tablet, 1 kolom pada mobile.
- Menggunakan animasi counter halus saat angka pertama kali dimuat.
- Skeleton loader ditampilkan selama proses fetch data berlangsung.

---

## Security Rules
- Endpoint `/api/dashboard/metrics` hanya dapat diakses dengan token Bearer admin valid.

---

## Testing Scenarios
### Integration Test
- Memvalidasi respons endpoint metrics mengembalikan format data angka non-negatif.
### UAT
- Menambah 1 proyek baru di CMS -> angka Total Proyek di dashboard bertambah 1.

---

## Dependencies
- Lucide React (ikon kartu)
- Express Auth Middleware

---

## AI Agent Instructions
- Pastikan query count menggunakan opsi `{ head: true }` di Supabase untuk menghemat bandwidth data tanpa mengunduh seluruh baris tabel.
