# Docker Setup & Local Containerization (Opsional)

## Status Penggunaan Docker
Penggunaan Docker pada repositori ini bersifat **opsional**. Untuk pengembangan lokal standar, pengembang dapat langsung menjalankan runtime Node.js native (`npm run dev`).

Namun, jika pengembang atau AI Agent ingin menjalankan backend API dalam container terisolasi atau melakukan pengujian deployment produksi berbasis container (misal di VPS mandiri atau Dokploy), berkas konfigurasi berikut disediakan sebagai referensi resmi.

---

## Configuration Files
- `Dockerfile` (Multi-stage build Node.js runtime)
- `docker-compose.yml` (Local multi-container stack)

---

## Definisi `docker-compose.yml`

```yaml
version: '3.8'

services:
  api:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: portfolio-api
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
      - PORT=5000
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - CLIENT_ORIGIN=http://localhost:5173
    volumes:
      - ./server:/app
      - /app/node_modules

  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: portfolio-client
    restart: unless-stopped
    ports:
      - "5173:5173"
    environment:
      - VITE_API_BASE_URL=http://localhost:5000/api
      - VITE_SUPABASE_URL=${SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    volumes:
      - ./client:/app
      - /app/node_modules
```

---

## Perintah Operasional Docker

### Menjalankan Stack
```bash
docker compose up -d --build
```

### Melihat Log
```bash
docker compose logs -f
```

### Menghentikan Container
```bash
docker compose down
```

### Menghapus Bersih Volume Lokal
```bash
docker compose down -v
```
