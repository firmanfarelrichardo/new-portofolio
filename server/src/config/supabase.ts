import { createClient } from '@supabase/supabase-js';
import { ENV } from './env.js';

if (!ENV.SUPABASE_URL || !ENV.SUPABASE_ANON_KEY) {
  console.warn(
    '⚠️ [Supabase] SUPABASE_URL atau SUPABASE_ANON_KEY belum diisi di berkas .env. Fitur cloud database akan menunggu kredensial aktif.'
  );
}

// Client untuk operasi dengan hak akses anonim (RLS publik)
export const supabasePublic = createClient(
  ENV.SUPABASE_URL || 'https://placeholder.supabase.co',
  ENV.SUPABASE_ANON_KEY || 'placeholder-anon-key'
);

// Client dengan hak service_role untuk operasi backend khusus
export const supabaseAdmin = createClient(
  ENV.SUPABASE_URL || 'https://placeholder.supabase.co',
  ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
