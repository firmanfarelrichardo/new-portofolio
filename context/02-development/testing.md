# Testing & Quality Assurance Strategy

## Unit Testing
Pengujian unit difokuskan pada pengujian fungsi murni, utility helper, dan skema validasi Zod tanpa ketergantungan jaringan eksternal.
- **Framework:** Vitest
- **Cakupan Pengujian:**
  - Date & number formatters (`formatDate`, `formatFileSize`).
  - Slug generator & text normalizer (`generateSlug`).
  - Zod validation schemas (memvalidasi skenario payload valid, field kosong, dan format salah).
  - State reducers & custom React hooks isolasi.

---

## Integration Testing
Pengujian integrasi memverifikasi interaksi antara lapisan Express Controller, Service, dan Repository / Mock Supabase Client.
- **Tools:** Vitest + Supertest
- **Cakupan Pengujian:**
  - **Auth Guard Middleware:** Memverifikasi penolakan request tanpa Bearer token (401), token kedaluwarsa (401), dan penerimaan token valid (200).
  - **CRUD Proyek:** Memvalidasi alur pembuatan proyek, respons error validasi skema, dan filter status `draft` vs `published`.
  - **Contact Form Submission:** Memverifikasi bahwa payload form kontak yang valid berhasil disimpan dan memicu pembatasan saat rate limiter terlampaui.

---

## E2E Testing (End-to-End)
Pengujian alur pengguna nyata di lingkungan browser.
- **Tool:** Playwright (opsional / rilis rilis besar)
- **User Flows yang Diuji:**
  1. **Visitor Journey:** Membuka Homepage -> Scroll ke Proyek -> Buka detail studi kasus -> Filter kategori -> Kirim pesan lewat form kontak.
  2. **Admin Journey:** Membuka `/admin/login` -> Input kredensial admin -> Masuk Dashboard -> Menambah satu proyek baru dengan status `Draft` -> Memverifikasi bahwa proyek tidak muncul di publik -> Mengubah status menjadi `Published` -> Memverifikasi proyek muncul di halaman publik.

---

## User Acceptance Testing (UAT) Checklist
Fitur dinyatakan lulus UAT apabila:
- [ ] Responsivitas di layar Smartphone (375px), Tablet (768px), dan Desktop (1440px) tidak mengalami *horizontal scroll* (*overflow-x: hidden*).
- [ ] Navigasi keyboard (Tab, Enter, Escape) dapat menjangkau seluruh tombol, link, dan form input dengan *focus ring* yang jelas.
- [ ] Gambar ter-load secara mulus tanpa *content shift* (Cumulative Layout Shift < 0.1).
- [ ] Form kontak memunculkan feedback visual langsung (*Toast / Alert*) saat pengiriman sukses atau gagal.
- [ ] Pengunduhan berkas resume menghasilkan file PDF yang sesuai dan dapat dibuka.

---

## Regression Testing
Setiap kali ada penambahan fitur atau perbaikan bug pada backend/frontend:
1. Jalankan `npm run lint` untuk memastikan tidak ada pelanggaran konvensi kode.
2. Jalankan `npm run type-check` (`tsc --noEmit`) untuk memastikan tidak ada kesalahan tipe data.
3. Jalankan `npm test` untuk memvalidasi seluruh unit & integration test tetap hijau (*passed*).
