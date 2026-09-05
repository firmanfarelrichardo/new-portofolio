import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { useAuth } from '../auth/AuthContext';
import {
  User,
  Sparkles,
  Mail,
  MapPin,
  Upload,
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Globe,
  Briefcase,
  Eye,
} from 'lucide-react';

interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  email?: string;
}

interface ProfileData {
  id?: string;
  name: string;
  headline: string;
  bio_short: string;
  bio_full: string;
  avatar_url: string;
  location: string;
  email: string;
  resume_url: string;
  available_for_hire: boolean;
  social_links: SocialLinks;
}

const defaultProfile: ProfileData = {
  name: '',
  headline: '',
  bio_short: '',
  bio_full: '',
  avatar_url: '',
  location: 'Jakarta, Indonesia',
  email: '',
  resume_url: '',
  available_for_hire: true,
  social_links: {
    github: '',
    linkedin: '',
    instagram: '',
    twitter: '',
    website: '',
  },
};

export function ProfileEditorPage() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load Profile on mount
  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        // Coba ambil dari backend API Express
        const res = await fetch('/api/profile');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setProfile({
              ...defaultProfile,
              ...json.data,
              social_links: {
                ...defaultProfile.social_links,
                ...(json.data.social_links || {}),
              },
            });
            setIsLoading(false);
            return;
          }
        }

        // Fallback langsung ke Supabase client
        const { data, error } = await supabase.from('profiles').select('*').limit(1).maybeSingle();
        if (error) throw error;

        if (data) {
          setProfile({
            ...defaultProfile,
            ...data,
            social_links: {
              ...defaultProfile.social_links,
              ...(data.social_links || {}),
            },
          });
        }
      } catch (err: unknown) {
        console.error('Error loading profile:', err);
        setErrorMsg('Gagal memuat profil pemilik. Silakan muat ulang halaman.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  // Handle Save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const token = session?.access_token;
      if (!token) {
        throw new Error('Sesi otentikasi tidak ditemukan. Silakan login kembali.');
      }

      // Kirim pembaruan ke Express API
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Gagal menyimpan perubahan data profil.');
      }

      setProfile((prev) => ({ ...prev, ...json.data }));
      setSuccessMsg('Profil berhasil diperbarui dan disinkronkan ke seluruh sistem!');
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: unknown) {
      console.error('Error saving profile:', err);
      setErrorMsg(err instanceof Error ? err.message : 'Terjadi kegagalan saat menyimpan data.');
    } finally {
      setIsSaving(false);
    }
  };

  // Upload Avatar to Supabase Storage
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Format berkas foto profil wajib berupa gambar (JPG, PNG, atau WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ukuran foto profil tidak boleh melebihi 5 MB.');
      return;
    }

    setIsUploadingAvatar(true);
    setErrorMsg(null);

    try {
      const ext = file.name.split('.').pop() || 'webp';
      const fileName = `avatar-${Date.now()}.${ext}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      setProfile((prev) => ({ ...prev, avatar_url: publicUrlData.publicUrl }));
      setSuccessMsg('Foto profil berhasil diunggah! Klik tombol "Simpan Perubahan" untuk menerapkan.');
    } catch (err: unknown) {
      console.error('Avatar upload error:', err);
      setErrorMsg('Gagal mengunggah foto profil ke Supabase Storage.');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Upload Resume PDF to Supabase Storage
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setErrorMsg('Format berkas Curriculum Vitae (CV) wajib bertipe dokumen PDF.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Ukuran file PDF tidak boleh melebihi 10 MB.');
      return;
    }

    setIsUploadingResume(true);
    setErrorMsg(null);

    try {
      const fileName = `resume-firman-${Date.now()}.pdf`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      setProfile((prev) => ({ ...prev, resume_url: publicUrlData.publicUrl }));
      setSuccessMsg('Berkas resume PDF berhasil diunggah! Jangan lupa klik "Simpan Perubahan".');
    } catch (err: unknown) {
      console.error('Resume upload error:', err);
      setErrorMsg('Gagal mengunggah berkas PDF resume.');
    } finally {
      setIsUploadingResume(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Loader2 size={36} className="animate-spin" style={{ color: 'var(--accent-cyan)', margin: '0 auto 16px' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Memuat data profil pemilik...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              display: 'inline-flex',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(0, 242, 254, 0.1)',
              color: 'var(--accent-cyan)',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Module 01
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Personal Identity</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Profile & Identitas Diri
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Kelola data biografi, personal branding, foto avatar, berkas resume PDF, dan tautan jejaring sosial.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.9rem', padding: '10px 18px' }}
          >
            <Eye size={16} />
            <span>Lihat Tampilan Publik</span>
          </a>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-primary"
            style={{ fontSize: '0.9rem', padding: '10px 22px' }}
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="toast-success" style={{ marginBottom: '24px' }}>
          <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="toast-error" style={{ marginBottom: '24px' }}>
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Content Layout (2 Columns on Desktop) */}
      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
        
        {/* Left Column: Visual Media & Availability */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Avatar & Identity Card */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={18} style={{ color: 'var(--accent-cyan)' }} />
              <span>Foto Profil & Avatar</span>
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: profile.avatar_url ? `url(${profile.avatar_url}) center/cover` : 'var(--bg-surface)',
                border: '2px solid var(--border-card)',
                boxShadow: 'var(--shadow-cyan-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                {!profile.avatar_url && (
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    {profile.name ? profile.name.charAt(0) : 'F'}
                  </span>
                )}
              </div>

              <div style={{ flex: 1, minWidth: '180px' }}>
                <label className="btn btn-secondary" style={{ display: 'inline-flex', cursor: 'pointer', fontSize: '0.875rem', padding: '8px 16px', marginBottom: '8px' }}>
                  {isUploadingAvatar ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Mengunggah...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      <span>Ganti Foto Avatar</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploadingAvatar}
                    style={{ display: 'none' }}
                  />
                </label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Format JPG, PNG, atau WebP. Maksimal 5 MB. Tersimpan di Supabase Storage.
                </p>
              </div>
            </div>

            {/* Custom Avatar URL input (optional) */}
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label">
                <span>Atau Masukkan URL Avatar Langsung</span>
              </label>
              <input
                type="url"
                className="form-input"
                value={profile.avatar_url || ''}
                onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                placeholder="https://.../avatar.webp"
              />
            </div>
          </div>

          {/* Availability & Work Status Card */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Briefcase size={18} style={{ color: 'var(--accent-emerald)' }} />
              <span>Ketersediaan Pekerjaan</span>
            </h3>

            <div
              className="switch-container"
              onClick={() => setProfile({ ...profile, available_for_hire: !profile.available_for_hire })}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>
                  Available for Hire / Terbuka untuk Tawaran Kerja
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Menampilkan badge pulsing hijau "Available for new opportunities" di hero publik.
                </div>
              </div>

              <div className={`switch-track ${profile.available_for_hire ? 'active' : ''}`}>
                <div className="switch-thumb" />
              </div>
            </div>
          </div>

          {/* Resume PDF Management Card */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={18} style={{ color: 'var(--accent-violet)' }} />
              <span>Curriculum Vitae (CV) & Resume PDF</span>
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
              Berkas PDF ini akan diunduh oleh recruiter saat menekan tombol "Download Resume" di header atau hero homepage.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
              <label className="btn btn-secondary" style={{ cursor: 'pointer', fontSize: '0.875rem', padding: '10px 18px' }}>
                {isUploadingResume ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Mengunggah PDF...</span>
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    <span>Unggah Berkas PDF Baru</span>
                  </>
                )}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  disabled={isUploadingResume}
                  style={{ display: 'none' }}
                />
              </label>

              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.875rem', padding: '10px 16px', color: 'var(--accent-cyan)' }}
                >
                  <ExternalLink size={16} />
                  <span>Pratinjau PDF Aktif</span>
                </a>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>URL Berkas Resume</span>
              </label>
              <input
                type="url"
                className="form-input"
                value={profile.resume_url || ''}
                onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
                placeholder="https://.../portfolio-media/resumes/resume.pdf"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Text Information & Social Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Main Identity Information Card */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={18} style={{ color: 'var(--accent-cyan)' }} />
              <span>Informasi Utama</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Name */}
              <div className="form-group">
                <label className="form-label">
                  <span>Nama Lengkap <span style={{ color: 'var(--accent-cyan)' }}>*</span></span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Firman Farel"
                  required
                />
              </div>

              {/* Headline */}
              <div className="form-group">
                <label className="form-label">
                  <span>Headline Profesional <span style={{ color: 'var(--accent-cyan)' }}>*</span></span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={profile.headline || ''}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  placeholder="Software Engineer & Full-Stack Developer"
                  required
                />
              </div>

              {/* Location & Email (Grid 2 cols) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">
                    <span>Domisili / Lokasi</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-input"
                      value={profile.location || ''}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      placeholder="Jakarta, Indonesia"
                    />
                    <MapPin size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>Email Publik</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      className="form-input"
                      value={profile.email || ''}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="contact@firmanfarel.site"
                    />
                    <Mail size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>
              </div>

              {/* Short Bio (Hero section) */}
              <div className="form-group">
                <label className="form-label">
                  <span>Bio Singkat (Hero Section)</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Maks 500 karakter</span>
                </label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={profile.bio_short || ''}
                  onChange={(e) => setProfile({ ...profile, bio_short: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat fokus keahlian Anda untuk ditampilkan pada bagian paling atas website..."
                />
              </div>

              {/* Full Narrative Bio (About section) */}
              <div className="form-group">
                <label className="form-label">
                  <span>Biografi Naratif Lengkap (Bagian "About Me")</span>
                </label>
                <textarea
                  className="form-textarea"
                  rows={6}
                  value={profile.bio_full || ''}
                  onChange={(e) => setProfile({ ...profile, bio_full: e.target.value })}
                  placeholder="Ceritakan latar belakang ketertarikan rekayasa perangkat lunak, filosofi coding, keahlian arsitektur, dan pencapaian Anda..."
                />
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={18} style={{ color: 'var(--accent-blue)' }} />
              <span>Tautan Jejaring Sosial & Komunitas</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* GitHub */}
              <div className="form-group">
                <label className="form-label">
                  <span>GitHub Profile URL</span>
                </label>
                <input
                  type="url"
                  className="form-input"
                  value={profile.social_links.github || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      social_links: { ...profile.social_links, github: e.target.value },
                    })
                  }
                  placeholder="https://github.com/firmanfarel"
                />
              </div>

              {/* LinkedIn */}
              <div className="form-group">
                <label className="form-label">
                  <span>LinkedIn Profile URL</span>
                </label>
                <input
                  type="url"
                  className="form-input"
                  value={profile.social_links.linkedin || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      social_links: { ...profile.social_links, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/in/firmanfarel"
                />
              </div>

              {/* Instagram */}
              <div className="form-group">
                <label className="form-label">
                  <span>Instagram Profile URL</span>
                </label>
                <input
                  type="url"
                  className="form-input"
                  value={profile.social_links.instagram || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      social_links: { ...profile.social_links, instagram: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/firmanfarel"
                />
              </div>

              {/* Website / Blog */}
              <div className="form-group">
                <label className="form-label">
                  <span>Personal Website / Blog Eksternal</span>
                </label>
                <input
                  type="url"
                  className="form-input"
                  value={profile.social_links.website || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      social_links: { ...profile.social_links, website: e.target.value },
                    })
                  }
                  placeholder="https://firmanfarel.site"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileEditorPage;
