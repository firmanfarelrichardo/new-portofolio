import { Request, Response, NextFunction } from 'express';
import { supabasePublic } from '../config/supabase.js';
import { User } from '@supabase/supabase-js';

// Extend Express Request interface to include authenticated user
export interface AuthenticatedRequest extends Request {
  user?: User;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Akses ditolak. Token otentikasi tidak ditemukan.',
      },
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data, error } = await supabasePublic.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Sesi Anda tidak valid atau telah kedaluwarsa. Silakan login kembali.',
          details: error?.message,
        },
      });
      return;
    }

    req.user = data.user;
    next();
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_AUTH_ERROR',
        message: 'Gagal memverifikasi otentikasi server.',
        details: err instanceof Error ? err.message : null,
      },
    });
  }
}
