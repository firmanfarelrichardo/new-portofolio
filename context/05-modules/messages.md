# MODULE: CONTACT & MESSAGE INBOX

## Overview
Modul Contact & Message Inbox memfasilitasi komunikasi langsung dari pengunjung publik (recruiter, calon klien) kepada pemilik situs melalui formulir kontak terstruktur yang dilengkapi validasi ketat, proteksi anti-spam (rate limiting & honeypot), serta inbox manajemen pesan terpadu di dalam panel CMS.

---

## Objectives
- Menyediakan formulir kontak yang mudah digunakan dan responsif bagi pengunjung publik.
- Mengamankan sistem dari spam form submissions dan serangan bot otomatis.
- Menyediakan inbox terorganisir di CMS dengan status pesan (*unread*, *read*, *archived*, *deleted*).

---

## Stakeholders
### Public Visitor
Mengisi formulir kontak (nama, email, subjek, pesan) dan menerima konfirmasi visual pengiriman sukses.
### Admin / Owner (Firman Farel)
Membaca pesan masuk, menyaring pesan spam, menandai status telah dibaca, dan mengarsipkan pesan.

---

## Functional Requirements
### FR-CONT-001: Public Contact Form Submission
Formulir kontak pada `/contact` atau footer halaman muka menerima input: Nama Pengirim, Alamat Email, Subjek Pesan, dan Isi Pesan.
### FR-CONT-002: Anti-Spam & Rate Limiting
- **Honeypot Trap:** Field tersembunyi yang tidak terlihat oleh manusia; jika field ini terisi, backend langsung menolak request sebagai bot.
- **IP Rate Limiting:** Dibatasi maksimal 5 pesan per 15 menit per IP address.
### FR-CONT-003: CMS Message Inbox Management
Halaman `/admin/messages` menyajikan daftar pesan masuk dengan indikator status:
- `unread`: Pesan baru belum dibuka (ditandai badge di dashboard).
- `read`: Pesan telah dibaca.
- `archived`: Pesan yang telah ditindaklanjuti dan diarsipkan.
- `deleted`: Pesan yang dihapus (soft-delete).
### FR-CONT-004: Direct Email Reply Shortcut
Tombol pintasan "Balas via Email" yang membuka aplikasi email bawaan pengguna (`mailto:pengirim@domain.com?subject=Re:...`).

---

## Database Design

### Tabel `messages`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, default gen_random_uuid() | ID Pesan |
| `sender_name` | text | not null | Nama pengirim |
| `sender_email`| text | not null | Email pengirim |
| `subject` | text | not null | Subjek pesan |
| `message` | text | not null | Isi pesan |
| `status` | text | default 'unread' | Enum: unread, read, archived, deleted |
| `ip_address` | text | nullable | Catatan alamat IP untuk audit spam |
| `created_at` | timestamptz | not null | Waktu pengiriman |

---

## API Endpoints

| Method | Path | Purpose | Authorization | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/contact` | Kirim pesan dari form publik | Public (Rate Limited) | 201 |
| **GET** | `/api/messages` | Ambil daftar pesan masuk | Authenticated | 200 |
| **PATCH**| `/api/messages/:id/status`| Update status pesan (read/archived)| Authenticated | 200 |
| **DELETE**| `/api/messages/:id` | Hapus pesan permanen | Authenticated | 200 |

### Sample JSON Request (POST /api/contact)
```json
{
  "sender_name": "Sarah Connor",
  "sender_email": "sarah@cybertech.com",
  "subject": "Penawaran Kerjasama Software Engineer",
  "message": "Halo Firman, kami sangat terkesan dengan studi kasus MER Platform Anda dan ingin mendiskusikan peluang kolaborasi posisi Senior Full-Stack Developer.",
  "website_trap": ""
}
```

### Sample JSON Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-messages-000000000001",
    "status": "unread"
  },
  "message": "Pesan Anda telah berhasil terkirim. Terima kasih atas ketertarikan Anda!"
}
```

---

## UI / UX Requirements
- Tampilan form kontak menyediakan animasi loading state pada tombol submit.
- Umpan balik langsung menggunakan toast notification warna hijau saat berhasil dan merah saat gagal.
- Inbox CMS menampilkan badge counter angka unread pesan berwarna kontras.

---

## Validation & Security Rules
- Format email wajib divalidasi regex standar RFC 5322.
- Panjang karakter: Nama (min 2, max 100), Subjek (min 3, max 150), Pesan (min 10, max 2000).
- Teks pesan disanitasi dari tag HTML untuk mencegah eksekusi skrip berbahaya di browser admin.
