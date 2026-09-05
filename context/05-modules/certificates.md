# MODULE: CERTIFICATIONS & CREDENTIALS

## Overview
Modul Certifications mengelola kredensial profesional, lisensi industri, dan sertifikat pelatihan keahlian teknis yang diperoleh pemilik situs, lengkap dengan nomor lisensi resmi, tanggal validitas, dan tautan verifikasi online.

---

## Objectives
- Memvalidasi kompetensi teknis pemilik situs melalui bukti sertifikasi kredibel.
- Menyediakan akses langsung bagi pengunjung untuk memverifikasi keaslian sertifikat pada situs penerbit (*issuer*).
- Mempermudah pengunggahan dokumen sertifikat (gambar/PDF) ke Supabase Storage via CMS.

---

## Stakeholders
### Public Visitor
Melihat sertifikat, memperbesar gambar sertifikat, dan mengklik tautan verifikasi online.
### Admin / Owner (Firman Farel)
Melakukan operasi CRUD pada sertifikat dan mengunggah pindaian berkas sertifikat.

---

## Functional Requirements
### FR-CERT-001: Certificate Grid Showcase
Halaman publik menampilkan kartu sertifikat mencakup judul sertifikasi, lembaga penerbit (*issuer*, misal: *AWS, Google Cloud, Dicoding, HackerRank*), tanggal terbit, tanggal kedaluwarsa (atau badge *No Expiration*), nomor registrasi kredensial, dan tombol verifikasi eksternal (*Credential URL*).
### FR-CERT-002: Certificate Image Modal
Pengunjung dapat mengklik pratinjau gambar sertifikat untuk memperbesar tampilan dalam modal lightbox.
### FR-CERT-003: CMS Certificate CRUD
Panel CMS menyediakan form input data sertifikat dan komponen upload gambar ke Supabase Storage.

---

## Database Design

### Tabel `certificates`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Sertifikat |
| `title` | text | not null | Nama Sertifikat |
| `issuer` | text | not null | Lembaga Penerbit |
| `issue_date` | date | not null | Tanggal Terbit |
| `expiration_date`| date | nullable | Tanggal Kedaluwarsa (null jika seumur hidup)|
| `credential_id` | text | nullable | Nomor / Kode Kredensial |
| `credential_url`| text | nullable | Tautan verifikasi online resmi |
| `image_url` | text | nullable | URL gambar sertifikat di Supabase Storage |
| `display_order` | int | default 0 | Urutan sorting |
| `created_at` | timestamptz | not null | Timestamp |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/certificates` | Ambil seluruh daftar sertifikat | Public | 200 |
| **POST** | `/api/certificates` | Tambah sertifikat baru | Authenticated | 201 |
| **PUT** | `/api/certificates/:id` | Update data sertifikat | Authenticated | 200 |
| **DELETE**| `/api/certificates/:id` | Hapus sertifikat | Authenticated | 200 |

### Sample JSON Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": "e5f6a1b2-0000-0000-0000-000000000005",
      "title": "AWS Certified Solutions Architect – Associate",
      "issuer": "Amazon Web Services",
      "issue_date": "2024-06-15",
      "expiration_date": "2027-06-15",
      "credential_id": "AWS-PSA-987654",
      "credential_url": "https://aws.amazon.com/verification/AWS-PSA-987654",
      "image_url": "https://xyz.supabase.co/storage/v1/object/public/portfolio-media/certs/aws-saa.webp"
    }
  ],
  "message": "Daftar sertifikat berhasil dimuat"
}
```

---

## UI / UX Requirements
- Kartu sertifikat memiliki rasio aspek gambar proporsional dengan efek zoom saat kursor melayang.
- Tombol verifikasi kredensial membuka tautan eksternal pada tab baru (`target="_blank" rel="noopener noreferrer"`).
