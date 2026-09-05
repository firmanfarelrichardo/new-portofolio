import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/auth/me - Mendapatkan profil pengguna admin terautentikasi
router.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.user?.id,
      email: req.user?.email,
      role: req.user?.role,
      lastSignInAt: req.user?.last_sign_in_at,
    },
    message: 'Data sesi admin terverifikasi',
  });
});

export default router;
