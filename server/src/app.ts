import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ENV } from './config/env.js';
import healthRoutes from './routes/health.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app: Application = express();

// 1. Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 2. CORS Policy
app.use(
  cors({
    origin: (origin, callback) => {
      // Izinkan request tanpa origin (seperti Postman, Curl) atau dari client origin yang disetujui
      if (!origin || origin === ENV.CLIENT_ORIGIN || origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} tidak diizinkan oleh kebijakan CORS.`));
      }
    },
    credentials: true,
  })
);

// 3. Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MINS * 60 * 1000,
  max: ENV.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Terlalu banyak request dari IP ini. Silakan coba beberapa saat lagi.',
    },
  },
});
app.use('/api/', globalLimiter);

// 5. Routes
app.use('/api', healthRoutes);

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    name: 'Firman Farel Portfolio API',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// 6. 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'Endpoint yang diminta tidak ditemukan.',
    },
  });
});

// 7. Global Error Handler
app.use(errorHandler);

export default app;
