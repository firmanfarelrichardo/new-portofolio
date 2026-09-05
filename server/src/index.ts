import app from './app.js';
import { ENV } from './config/env.js';

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`
  🚀 [Portfolio API] Server berhasil dijalankan!
  📡 Endpoint: http://localhost:${PORT}
  🩺 Healthcheck: http://localhost:${PORT}/api/health
  🌍 Mode: ${ENV.NODE_ENV}
  `);
});
