import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { ThemeToggle } from '../../components/common/ThemeToggle';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect ke dashboard jika sudah terautentikasi
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg('Email dan password wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrorMsg('Kombinasi email atau password salah. Silakan periksa kembali.');
        } else {
          setErrorMsg(error.message);
        }
      } else {
        navigate(from, { replace: true });
      }
    } catch {
      setErrorMsg('Terjadi kegagalan komunikasi ke server otentikasi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative'
    }}>
      {/* Back to Public Link & Theme Toggle */}
      <div style={{ position: 'absolute', top: '28px', left: '28px' }}>
        <Link to="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
          transition: 'color 150ms'
        }}>
          <ArrowLeft size={16} />
          <span>Kembali ke Website Publik</span>
        </Link>
      </div>

      <div style={{ position: 'absolute', top: '28px', right: '28px' }}>
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '40px 36px',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'var(--gradient-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--btn-primary-text)',
            fontWeight: 800,
            fontSize: '1.4rem',
            marginBottom: '16px',
            boxShadow: '0 8px 20px rgba(0, 242, 254, 0.3)'
          }}>
            F
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Private CMS Portal
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Masuk dengan akun owner untuk mengelola portofolio
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email Field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Alamat Email
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={18} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farelpasaribu04@gmail.com"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 44px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  transition: 'border-color 150ms'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 44px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  transition: 'border-color 150ms'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '13px',
              fontSize: '1rem',
              marginTop: '8px',
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Memproses Verifikasi...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                <span>Masuk ke Dashboard</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer Info */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Secured by Supabase Auth & PostgreSQL Row Level Security
        </p>
      </div>
    </div>
  );
}
