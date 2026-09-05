import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { supabasePublic, supabaseAdmin } from '../config/supabase.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.middleware.js';

const router = Router();

// Zod Schema untuk validasi update profile
const updateProfileSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100, 'Nama maksimal 100 karakter'),
  headline: z.string().max(200, 'Headline maksimal 200 karakter').nullable().optional(),
  bio_short: z.string().max(500, 'Bio singkat maksimal 500 karakter').nullable().optional(),
  bio_full: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  location: z.string().max(100).nullable().optional(),
  email: z.string().email('Format email tidak valid').or(z.literal('')).nullable().optional(),
  resume_url: z.string().nullable().optional(),
  available_for_hire: z.boolean().optional(),
  social_links: z
    .object({
      github: z.string().optional(),
      linkedin: z.string().optional(),
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      website: z.string().optional(),
      email: z.string().optional(),
    })
    .optional(),
});

/**
 * @route   GET /api/profile
 * @desc    Mengambil profil publik pemilik situs (singleton)
 * @access  Public
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const { data: profile, error } = await supabasePublic
      .from('profiles')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Gagal mengambil data profil dari basis data.',
          details: error.message,
        },
      });
      return;
    }

    if (!profile) {
      res.status(404).json({
        success: false,
        error: {
          code: 'PROFILE_NOT_FOUND',
          message: 'Data profil belum dikonfigurasi.',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile,
      message: 'Profil berhasil dimuat',
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Terjadi kesalahan pada server saat memuat profil.',
        details: err instanceof Error ? err.message : null,
      },
    });
  }
});

/**
 * @route   PUT /api/profile
 * @desc    Memperbarui profil pemilik situs
 * @access  Authenticated (Admin Only)
 */
router.put('/', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const parseResult = updateProfileSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validasi form profil gagal.',
          details: parseResult.error.flatten().fieldErrors,
        },
      });
      return;
    }

    const payload = parseResult.data;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'ID pengguna tidak valid.',
        },
      });
      return;
    }

    // Perbarui profil menggunakan supabaseAdmin untuk keandalan singleton
    const { data: updatedProfile, error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({
        ...payload,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      res.status(500).json({
        success: false,
        error: {
          code: 'UPDATE_FAILED',
          message: 'Gagal memperbarui data profil.',
          details: updateError.message,
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedProfile,
      message: 'Profil berhasil diperbarui',
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Terjadi kesalahan internal saat memperbarui profil.',
        details: err instanceof Error ? err.message : null,
      },
    });
  }
});

export default router;
