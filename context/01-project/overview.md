# Project Overview: Firman Farel Personal Portfolio CMS

## Ringkasan Sistem
**Firman Farel Personal Portfolio CMS** adalah platform web personal modern yang dibangun untuk pemilik website (`firmanfarel.site`) guna merepresentasikan keahlian teknis, rekam jejak profesional, hasil karya rekayasa perangkat lunak (*case studies*), sertifikasi, dan aktivitas akademis secara interaktif. 

Sistem ini memisahkan secara tegas dua ranah interaksi:
1. **Public Website:** Menampilkan portofolio yang dapat diakses oleh publik (*read-only*) dengan performa tinggi, animasi dinamis, aksesibilitas tinggi, dan optimasi SEO.
2. **Private CMS (`/admin`):** Antarmuka pengelolaan konten terproteksi autentikasi Supabase Auth, yang memungkinkan pemilik memperbarui, menambah, menyunting, mempublikasikan, maupun mengarsipkan konten secara langsung tanpa proses *rebuild source code*.

---

## Stakeholders
| Role | Deskripsi & Hak Akses |
| :--- | :--- |
| **Product Owner & Administrator** | Firman Farel. Memegang kontrol absolut atas konfigurasi website, konten profil, proyek, keahlian, pengalaman, sertifikat, berkas resume, dan inbox pesan. |
| **Public Visitors** | Recruiter, HRD perusahaan teknologi, calon klien freelance, sesama developer, dan komunitas software engineering. Mengakses data publik secara gratis dan dapat mengirimkan pesan kontak. |
| **AI Coding Agents & Engineers** | Pengembang dan agen AI yang bertanggung jawab merawat dan mengembangkan codebase sesuai standar dokumentasi SSOT ini. |

---

## Scope Sistem
- **Public Portal:** Halaman Hero/Home, Tentang Saya (About), Showcase Keahlian (Skills), Galeri Proyek & Detail Kasus Mendalam (Projects & Case Studies), Linimasa Pengalaman (Experience Timeline), Riwayat Pendidikan (Education), Kredensial Sertifikat (Certificates), Daftar Prestasi (Achievements), Formulir Kontak Terverifikasi (Contact Form), dan Pengunduhan Berkas Resume (Resume Download).
- **Private CMS:** Halaman Login Terproteksi, Dashboard Metrik Agregat, Manajemen Profil & Upload Avatar, CRUD Keahlian & Kategori, CRUD Proyek & Pengaturan Galeri/Status, CRUD Linimasa Pengalaman, CRUD Pendidikan, CRUD Sertifikat & Prestasi, Inbox Pesan Kontak Masuk, Pengelola Berkas Media Supabase Storage, serta Pengaturan Konfigurasi Umum & SEO.
- **Phase 2 Expansion:** Modul Artikel Teknis / Blog dengan Markdown parser dan syntax highlighting, sistem tags, dan pencarian instan.

---

## Tujuan Proyek
1. **Meningkatkan Kredibilitas Personal Branding:** Menghadirkan kehadiran digital berstandar industri bagi Firman Farel sebagai seorang software engineer profesional.
2. **Menghilangkan Bottleneck Pembaruan Konten:** Memungkinkan penambahan portofolio baru dalam hitungan menit tanpa harus membuka IDE, commit Git, atau menunggu deployment pipeline.
3. **Efisiensi Beban Komputasi:** Menerapkan prinsip *Smart Workload Balancing*—memaksimalkan kapabilitas komputasi modern di browser pengguna untuk antarmuka yang cepat dan interaktif, sekaligus mempertahankan server yang ramping, hemat biaya, dan aman.
4. **Kepatuhan Terhadap Standar Kualitas:** Mencapai skor audit Google Lighthouse $\ge 90$ pada metrik Performance, Accessibility, Best Practices, dan SEO.
