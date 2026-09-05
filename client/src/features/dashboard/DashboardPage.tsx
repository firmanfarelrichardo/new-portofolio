import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import {
  FolderGit2,
  Code2,
  Award,
  History,
  Mail,
  PlusCircle,
  Database,
  ArrowUpRight
} from 'lucide-react';

interface MetricCount {
  projects: number;
  skills: number;
  certificates: number;
  experiences: number;
  unreadMessages: number;
}

export function DashboardPage() {
  const [counts, setCounts] = useState<MetricCount>({
    projects: 0,
    skills: 0,
    certificates: 0,
    experiences: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [
          { count: projCount },
          { count: skillCount },
          { count: certCount },
          { count: expCount },
          { count: msgCount }
        ] = await Promise.all([
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('skills').select('*', { count: 'exact', head: true }),
          supabase.from('certificates').select('*', { count: 'exact', head: true }),
          supabase.from('experiences').select('*', { count: 'exact', head: true }),
          supabase.from('messages').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
        ]);

        setCounts({
          projects: projCount || 0,
          skills: skillCount || 0,
          certificates: certCount || 0,
          experiences: expCount || 0,
          unreadMessages: msgCount || 0,
        });
      } catch (err) {
        console.error('Gagal mengambil count data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const METRIC_CARDS = [
    {
      title: 'Total Proyek',
      count: counts.projects,
      desc: 'Katalog karya & case study',
      icon: FolderGit2,
      color: 'var(--accent-cyan)',
      link: '/admin/projects',
    },
    {
      title: 'Keahlian / Tech',
      count: counts.skills,
      desc: 'Teknologi terkategori',
      icon: Code2,
      color: '#c084fc',
      link: '/admin/skills',
    },
    {
      title: 'Sertifikasi',
      count: counts.certificates,
      desc: 'Lisensi & kredensial',
      icon: Award,
      color: '#38bdf8',
      link: '/admin/certificates',
    },
    {
      title: 'Pengalaman',
      count: counts.experiences,
      desc: 'Linimasa karier & organisasi',
      icon: History,
      color: '#fbbf24',
      link: '/admin/experience',
    },
    {
      title: 'Pesan Masuk (Unread)',
      count: counts.unreadMessages,
      desc: 'Inquiry dari form kontak',
      icon: Mail,
      color: counts.unreadMessages > 0 ? '#f87171' : '#34d399',
      link: '/admin/messages',
      badge: counts.unreadMessages > 0 ? 'Perlu Ditinjau' : 'Semua Bersih',
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '36px'
      }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Dashboard Overview
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Selamat datang kembali di panel administrasi <strong>firmanfarel.site</strong>.
          </p>
        </div>

        {/* Quick Action Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/admin/projects/new" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '9px 18px' }}>
            <PlusCircle size={16} />
            <span>Tambah Proyek</span>
          </Link>
          <Link to="/admin/messages" className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '9px 16px' }}>
            <Mail size={16} />
            <span>Buka Inbox</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {METRIC_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              style={{ textDecoration: 'none' }}
            >
              <div className="glass-panel" style={{
                padding: '24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color
                  }}>
                    <Icon size={20} />
                  </div>

                  <ArrowUpRight size={16} color="var(--text-muted)" />
                </div>

                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {loading ? '...' : card.count}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {card.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {card.desc}
                  </div>
                </div>

                {card.badge && (
                  <div style={{ marginTop: '12px' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: counts.unreadMessages > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: counts.unreadMessages > 0 ? '#f87171' : '#34d399'
                    }}>
                      {card.badge}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Cloud & Infrastructure Card */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(0, 242, 254, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <Database size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Status Ekosistem Cloud Terhubung</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Supabase Managed PostgreSQL & Storage Bucket
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Supabase Project</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
              wvqwrnyounacpdzxtjih.supabase.co
            </div>
            <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px' }}>● Endpoint Active</div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Storage Bucket</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              portfolio-media
            </div>
            <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px' }}>● Public Access Ready</div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Row Level Security (RLS)</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Enforced on 11 Tables
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>● Zero-Trust Data Isolation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
