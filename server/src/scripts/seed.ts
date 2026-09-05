import { supabaseAdmin } from '../config/supabase.js';
import { ENV } from '../config/env.js';

async function seed() {
  console.log('🌱 [Seed] Memulai inisialisasi basis data Supabase...');

  if (!ENV.SUPABASE_URL || !ENV.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ [Seed] SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi.');
    process.exit(1);
  }

  try {
    // 1. Storage Bucket: portfolio-media
    console.log('📦 [Seed] 1. Memeriksa Supabase Storage Bucket (portfolio-media)...');
    const { data: buckets, error: bucketListError } = await supabaseAdmin.storage.listBuckets();
    if (bucketListError) {
      console.warn('⚠️ Gagal memeriksa buckets:', bucketListError.message);
    } else {
      const exists = buckets?.some((b) => b.name === 'portfolio-media');
      if (!exists) {
        const { error: createBucketError } = await supabaseAdmin.storage.createBucket('portfolio-media', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf'],
        });
        if (createBucketError) {
          console.warn('⚠️ Gagal membuat bucket portfolio-media:', createBucketError.message);
        } else {
          console.log('✅ Bucket "portfolio-media" berhasil dibuat (Public).');
        }
      } else {
        console.log('ℹ️ Bucket "portfolio-media" sudah ada.');
      }
    }

    // 2. Akun Admin di Supabase Auth
    console.log('👤 [Seed] 2. Memeriksa Akun Admin...');
    const adminEmail = 'farelpasaribu04@gmail.com';
    const adminPassword = 'farel041005';

    let adminUserId: string | null = null;
    const { data: usersData, error: listUsersError } = await supabaseAdmin.auth.admin.listUsers();
    if (listUsersError) {
      throw new Error(`Gagal memuat list users: ${listUsersError.message}`);
    }

    const existingAdmin = usersData.users.find((u) => u.email === adminEmail);
    if (existingAdmin) {
      console.log(`ℹ️ Akun Admin (${adminEmail}) telah terdaftar dengan ID: ${existingAdmin.id}`);
      adminUserId = existingAdmin.id;
    } else {
      console.log(`🚀 Mendaftarkan akun admin default: ${adminEmail}...`);
      const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: {
          name: 'Firman Farel',
          role: 'admin',
        },
      });

      if (createUserError || !newUser.user) {
        throw new Error(`Gagal membuat user admin: ${createUserError?.message}`);
      }

      adminUserId = newUser.user.id;
      console.log(`✅ Akun admin berhasil dibuat dengan ID: ${adminUserId}`);
    }

    // 3. Profiles
    console.log('📄 [Seed] 3. Menyiapkan entri data Profiles...');
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', adminUserId)
      .maybeSingle();

    if (!existingProfile) {
      const { error: profileError } = await supabaseAdmin.from('profiles').insert({
        id: adminUserId,
        name: 'Firman Farel',
        headline: 'Software Engineer & Full-Stack Developer',
        bio_short:
          'Membangun aplikasi web performa tinggi, scalable, dan modern dengan fokus pada arsitektur bersih dan pengalaman pengguna premium.',
        bio_full:
          'Halo! Saya Firman Farel, seorang Software Engineer yang berfokus pada pengembangan aplikasi web modern dengan stack React, TypeScript, Node.js, Express, dan PostgreSQL/Supabase. Memiliki dedikasi tinggi terhadap clean code, performance optimization, dan arsitektur sistem yang handal.',
        avatar_url: '',
        location: 'Jakarta, Indonesia',
        email: 'contact@firmanfarel.site',
        resume_url: '',
        available_for_hire: true,
        social_links: {
          github: 'https://github.com/firmanfarel',
          linkedin: 'https://linkedin.com/in/firmanfarel',
          instagram: 'https://instagram.com/firmanfarel',
          email: 'contact@firmanfarel.site',
        },
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        console.warn('⚠️ Gagal mengisi profil awal:', profileError.message);
      } else {
        console.log('✅ Profil awal Firman Farel berhasil dibuat.');
      }
    } else {
      console.log('ℹ️ Data profil sudah tersedia.');
    }

    // 4. Settings
    console.log('⚙️ [Seed] 4. Menyiapkan konfigurasi Global Settings...');
    const { data: existingSettings } = await supabaseAdmin
      .from('settings')
      .select('id')
      .limit(1);

    if (!existingSettings || existingSettings.length === 0) {
      const { error: settingsError } = await supabaseAdmin.from('settings').insert({
        site_title: 'Firman Farel — Software Engineer & Full-Stack Developer',
        site_description:
          'Personal portfolio and engineering showcase of Firman Farel. Specialized in modern web architectures, React, TypeScript, and Node.js.',
        keywords: [
          'Software Engineer',
          'Full-Stack Developer',
          'React',
          'TypeScript',
          'Node.js',
          'Supabase',
          'PostgreSQL',
        ],
        maintenance_mode: false,
        updated_at: new Date().toISOString(),
      });

      if (settingsError) {
        console.warn('⚠️ Gagal mengisi settings:', settingsError.message);
      } else {
        console.log('✅ Konfigurasi settings berhasil diinisialisasi.');
      }
    } else {
      console.log('ℹ️ Konfigurasi settings sudah ada.');
    }

    // 5. Skill Categories
    console.log('🏷️ [Seed] 5. Menyiapkan Skill Categories...');
    const categories = [
      {
        id: 'c0000000-0000-0000-0000-000000000001',
        name: 'Frontend',
        slug: 'frontend',
        display_order: 1,
      },
      {
        id: 'c0000000-0000-0000-0000-000000000002',
        name: 'Backend & API',
        slug: 'backend',
        display_order: 2,
      },
      {
        id: 'c0000000-0000-0000-0000-000000000003',
        name: 'Database & Cloud',
        slug: 'database-cloud',
        display_order: 3,
      },
      {
        id: 'c0000000-0000-0000-0000-000000000004',
        name: 'Tools & DevOps',
        slug: 'tools-devops',
        display_order: 4,
      },
    ];

    for (const cat of categories) {
      await supabaseAdmin.from('skill_categories').upsert(cat, { onConflict: 'id' });
    }
    console.log('✅ 4 Kategori Skill berhasil disiapkan.');

    // 6. Skills
    console.log('⚡ [Seed] 6. Menyiapkan Data Default Skills...');
    const defaultSkills = [
      {
        category_id: 'c0000000-0000-0000-0000-000000000001',
        name: 'React 19',
        proficiency_level: 'Advanced',
        display_order: 1,
        is_featured: true,
      },
      {
        category_id: 'c0000000-0000-0000-0000-000000000001',
        name: 'TypeScript',
        proficiency_level: 'Advanced',
        display_order: 2,
        is_featured: true,
      },
      {
        category_id: 'c0000000-0000-0000-0000-000000000001',
        name: 'Vanilla CSS & Responsive Design',
        proficiency_level: 'Advanced',
        display_order: 3,
        is_featured: true,
      },
      {
        category_id: 'c0000000-0000-0000-0000-000000000002',
        name: 'Node.js',
        proficiency_level: 'Advanced',
        display_order: 1,
        is_featured: true,
      },
      {
        category_id: 'c0000000-0000-0000-0000-000000000002',
        name: 'Express.js',
        proficiency_level: 'Advanced',
        display_order: 2,
        is_featured: true,
      },
      {
        category_id: 'c0000000-0000-0000-0000-000000000003',
        name: 'PostgreSQL',
        proficiency_level: 'Intermediate',
        display_order: 1,
        is_featured: true,
      },
      {
        category_id: 'c0000000-0000-0000-0000-000000000003',
        name: 'Supabase BaaS & RLS',
        proficiency_level: 'Advanced',
        display_order: 2,
        is_featured: true,
      },
      {
        category_id: 'c0000000-0000-0000-0000-000000000004',
        name: 'Docker',
        proficiency_level: 'Intermediate',
        display_order: 1,
        is_featured: false,
      },
      {
        category_id: 'c0000000-0000-0000-0000-000000000004',
        name: 'Git & GitHub Workflow',
        proficiency_level: 'Advanced',
        display_order: 2,
        is_featured: true,
      },
    ];

    const { data: existingSkills } = await supabaseAdmin.from('skills').select('id').limit(1);
    if (!existingSkills || existingSkills.length === 0) {
      for (const skill of defaultSkills) {
        await supabaseAdmin.from('skills').insert(skill);
      }
      console.log(`✅ ${defaultSkills.length} keahlian default berhasil disimpan.`);
    } else {
      console.log('ℹ️ Data skills sudah tersedia.');
    }

    console.log('\n🎉 [Seed Selesai] Seluruh data awal basis data dan storage berhasil disiapkan!');
    console.log('🔑 Kredensial Login Admin:');
    console.log(`   - Email: ${adminEmail}`);
    console.log(`   - Password: ${adminPassword}`);
  } catch (error) {
    console.error('❌ [Seed Error]:', error);
    process.exit(1);
  }
}

seed();
