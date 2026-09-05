import { useState, useEffect } from 'react';
import { 
  Terminal, 
  Database, 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  FileDown, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Mail,
  Sparkles
} from 'lucide-react';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface HealthData {
  status: string;
  uptime: number;
  timestamp: string;
  environment: string;
  version: string;
  database?: {
    status: string;
    tablesReady: boolean;
    message: string;
    url: string;
  };
}

export function App() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [healthStatus, setHealthStatus] = useState<'loading' | 'connected' | 'disconnected'>('loading');
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const checkBackend = async () => {
      const startTime = performance.now();
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/health`);
        const duration = Math.round(performance.now() - startTime);
        setLatency(duration);

        if (res.ok) {
          const json = await res.json();
          setHealth(json.data);
          setHealthStatus('connected');
        } else {
          setHealthStatus('disconnected');
        }
      } catch {
        setHealthStatus('disconnected');
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(6, 9, 14, 0.75)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px'
        }}>
          {/* Brand */}
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#030712',
              fontWeight: 800,
              fontSize: '1.1rem'
            }}>
              F
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                Firman Farel
              </span>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Software Engineer
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="#overview" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 500 }}>Overview</a>
            <a href="#architecture" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 500 }}>Architecture</a>
            <a href="#status" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.925rem', fontWeight: 500 }}>System Health</a>
          </nav>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="/resume" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
              <FileDown size={16} />
              <span>Resume</span>
            </a>
            <a href="/admin/login" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>
              <span>CMS Portal</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section id="overview" style={{ padding: '90px 0 60px' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '880px' }}>
            {/* Status Pill */}
            <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
              <div className="status-pill">
                <span className="status-dot"></span>
                <span>Available for Engineering Opportunities</span>
              </div>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '24px'
            }}>
              Crafting High-Performance <span className="text-gradient">Web Architectures</span> & Scalable Software.
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '40px',
              maxWidth: '720px',
              margin: '0 auto 40px'
            }}>
              Personal portfolio & private CMS ecosystem of <strong>Firman Farel</strong>. Built with strict full-stack TypeScript, smart client-server workload balancing, and Supabase PostgreSQL with Row Level Security.
            </p>

            {/* Dual CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#status" className="btn btn-primary" style={{ padding: '14px 28px' }}>
                <Sparkles size={18} />
                <span>Verify System Health</span>
              </a>
              <a href="https://github.com/firmanfarel" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '14px 24px' }}>
                <GithubIcon size={18} />
                <span>GitHub Profile</span>
                <ExternalLink size={14} style={{ opacity: 0.6 }} />
              </a>
            </div>
          </div>
        </section>

        {/* System Healthcheck & Live API Card */}
        <section id="status" style={{ padding: '50px 0 80px' }}>
          <div className="container">
            <div className="glass-panel" style={{ padding: '36px', maxWidth: '960px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(0, 242, 254, 0.1)',
                    border: '1px solid rgba(0, 242, 254, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}>
                    <Terminal size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Local Development Stack & API Status</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Real-time communication between React Vite Client & Express.js API</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {healthStatus === 'connected' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} />
                      API Online ({latency}ms)
                    </span>
                  )}
                  {healthStatus === 'loading' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(234, 179, 8, 0.15)', color: '#facc15', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                      Connecting to Backend...
                    </span>
                  )}
                  {healthStatus === 'disconnected' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                      <AlertCircle size={16} />
                      API Standby (Run `npm run dev`)
                    </span>
                  )}
                </div>
              </div>

              {/* Status Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px'
              }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Frontend Client
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    React 18 + Vite (TS)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>
                    Port: 5173 (HMR Active)
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Backend Service
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Node.js + Express (TS)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: health?.status === 'healthy' ? '#34d399' : 'var(--text-muted)', marginTop: '4px' }}>
                    Status: {health?.status || 'Offline'} | Port: 5000
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Cloud Database
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Supabase PostgreSQL
                  </div>
                  <div style={{ fontSize: '0.8rem', color: health?.database?.status === 'connected' ? '#34d399' : '#a78bfa', marginTop: '4px' }}>
                    {health?.database?.status === 'connected' ? `● Connected (${health.database.tablesReady ? 'Tables Ready' : 'Tables Pending'})` : '● RLS Active'}
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Deployment Target
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Vercel + Hostinger DNS
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Domain: firmanfarel.site
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Pillars Section */}
        <section id="architecture" style={{ padding: '40px 0 90px' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                Engineering <span className="text-gradient">Architecture Pillars</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Didesain dengan standar rekayasa perangkat lunak modern untuk menjamin keandalan, keamanan, dan kecepatan.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              <div className="glass-panel" style={{ padding: '30px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(0, 242, 254, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                  marginBottom: '20px'
                }}>
                  <Layers size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Smart Workload Distribution</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Antarmuka interaktif, filtering lokal, dan animasi dijalankan di browser pengguna, sedangkan mutasi data dan otentikasi dijaga secara ramping di server Expressless.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '30px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(121, 40, 202, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#c084fc',
                  marginBottom: '20px'
                }}>
                  <ShieldCheck size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Row Level Security (RLS)</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  PostgreSQL Supabase mengunci mutasi data secara absolut. Hanya pemilik terotentikasi yang dapat mengubah data, menjamin keamanan tingkat basis data tanpa celah.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '30px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#34d399',
                  marginBottom: '20px'
                }}>
                  <Database size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Private CMS Decoupled</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Kelola profil, proyek studi kasus, keahlian, sertifikasi, riwayat pendidikan, dan pesan kontak secara mandiri tanpa perlu menyentuh atau mendeploy ulang source code.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '36px 0',
        backgroundColor: 'rgba(6, 9, 14, 0.8)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              Firman Farel Personal Portfolio CMS
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Designed with bespoke Vanilla CSS & Full-Stack TypeScript. Domain: firmanfarel.site
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="https://github.com/firmanfarel" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} title="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href="https://linkedin.com/in/firmanfarel" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} title="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
            <a href="mailto:contact@firmanfarel.site" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} title="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
