# Tech Stack & Tooling Specifications

## Frontend Ecosystem
- **Library Inti:** React 18+
- **Bahasa:** TypeScript 5+ (`strict: true`)
- **Build Tool & Bundler:** Vite 5+ (Fast HMR & Optimized Production Build)
- **Styling Strategy:** Vanilla CSS dengan sistem Custom Design Tokens (CSS Variables) untuk tipografi, palet warna elegan, spasi fluid, dan micro-animations tanpa ketergantungan utility class yang membengkak.
- **Routing:** React Router v6+ dengan *code-splitting* dinamis (`React.lazy()`).
- **Icons:** Lucide React (Tree-shakable SVG icon library).
- **HTTP Client:** Fetch API native atau Axios dengan interceptor token auth.
- **Form & Validation:** React Hook Form + Zod resolver.
- **Animation:** CSS Transitions & Keyframes murni untuk performa 60 FPS di perangkat mobile.

---

## Backend & API Ecosystem
- **Runtime:** Node.js v20+ / v22+ LTS
- **Framework:** Express.js 4+ (TypeScript)
- **Validation Engine:** Zod (Runtime schema validation & static type inference)
- **Security Middleware:**
  - `helmet`: Konfigurasi security HTTP headers standar OWASP.
  - `cors`: Pembatasan origin request domain.
  - `express-rate-limit`: Proteksi terhadap spam dan serangan brute-force.
- **Supabase Integration:** `@supabase/supabase-js` (Official client library).

---

## Database & Cloud Services (Supabase)
- **Database Engine:** PostgreSQL 15+
- **Authentication:** Supabase Auth (JWT, secure session cookies/tokens, auto-refresh).
- **Storage:** Supabase Storage (S3-compatible bucket) untuk menampung gambar dan berkas PDF.
- **Security:** PostgreSQL Row Level Security (RLS) policies.

---

## Infrastructure & Deployment
- **Frontend & API Hosting:** Vercel (Edge Network & Serverless Function runtime).
- **Custom Domain:** Hostinger Registrar (`firmanfarel.site`).
- **DNS & SSL:** Hostinger DNS terintegrasi ke Vercel dengan SSL/TLS Let's Encrypt otomatis.
- **Version Control:** Git & GitHub dengan alur CI/CD otomatis saat push ke branch `prod`.

---

## Tooling & Quality Assurance
- **Linter:** ESLint dengan konfigurasi `typescript-eslint` dan `eslint-plugin-react-hooks`.
- **Formatter:** Prettier.
- **Testing:**
  - Unit & Integration Test: Vitest / Jest.
  - API Testing: Supertest.
  - E2E Testing: Playwright (opsional).
- **Auditing Tool:** Google Lighthouse CLI & PageSpeed Insights.
