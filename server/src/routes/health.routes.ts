import { Router, Request, Response } from 'express';
import { ENV } from '../config/env.js';
import { supabasePublic } from '../config/supabase.js';

const router = Router();

router.get('/health', async (_req: Request, res: Response) => {
  let dbStatus = 'disconnected';
  let tablesReady = false;
  let dbMessage = 'Belum terhubung';

  if (ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY) {
    try {
      // Cek apakah tabel settings atau profiles sudah dibuat di Supabase
      const { error } = await supabasePublic
        .from('settings')
        .select('*', { count: 'exact', head: true });

      if (!error) {
        dbStatus = 'connected';
        tablesReady = true;
        dbMessage = 'Terkoneksi & tabel telah siap';
      } else if (error.code === '42P01') {
        // 42P01 adalah kode error PostgreSQL untuk undefined_table (tabel belum dibuat)
        dbStatus = 'connected';
        tablesReady = false;
        dbMessage = 'Terkoneksi ke Supabase, namun skrip SQL tabel belum dijalankan di SQL Editor';
      } else {
        dbStatus = 'connected';
        tablesReady = false;
        dbMessage = `Terkoneksi: ${error.message}`;
      }
    } catch (err: unknown) {
      dbStatus = 'error';
      dbMessage = err instanceof Error ? err.message : 'Gagal menghubungi Supabase';
    }
  }

  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: ENV.NODE_ENV,
      version: '1.0.0',
      database: {
        status: dbStatus,
        tablesReady,
        message: dbMessage,
        url: ENV.SUPABASE_URL,
      },
    },
    message: 'Server API Express berjalan normal',
  });
});

export default router;

