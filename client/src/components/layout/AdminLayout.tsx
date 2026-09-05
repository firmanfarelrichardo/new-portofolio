import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import {
  LayoutDashboard,
  User,
  Code2,
  FolderGit2,
  History,
  Award,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ size?: number }>;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Profile & Bio', path: '/admin/profile', icon: User },
  { name: 'Skills & Tech', path: '/admin/skills', icon: Code2 },
  { name: 'Projects & Case Studies', path: '/admin/projects', icon: FolderGit2 },
  { name: 'Experience Timeline', path: '/admin/experience', icon: History },
  { name: 'Certifications', path: '/admin/certificates', icon: Award },
  { name: 'Contact Inbox', path: '/admin/messages', icon: Mail },
  { name: 'Global Settings', path: '/admin/settings', icon: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--bg-base)' }}>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 100,
          display: 'none', // Shown on mobile via media query or inline check
          padding: '12px',
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          border: 'none',
          color: '#030712',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside style={{
        width: '280px',
        backgroundColor: 'var(--bg-sidebar)',
        backdropFilter: 'blur(16px)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 40,
        flexShrink: 0,
        transition: 'background-color var(--transition-normal)'
      }}>
        {/* Brand Header */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--btn-primary-text)',
            fontWeight: 800,
            fontSize: '1.2rem',
            boxShadow: '0 4px 12px rgba(0, 242, 254, 0.3)'
          }}>
            F
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              Firman Farel
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              Private CMS
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--gradient-primary)' : 'transparent',
                  transition: 'all 150ms ease'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: '#f87171'
                  }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{
          padding: '16px 14px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Live site link */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              background: 'var(--bg-input)'
            }}
          >
            <span>Buka Website Publik</span>
            <ExternalLink size={14} />
          </Link>

          {/* User info & Logout */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-input)'
          }}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Logged in as</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || 'farelpasaribu04@gmail.com'}
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 150ms'
              }}
              title="Logout Sesi"
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        {/* Top Header Bar */}
        <header style={{
          height: '64px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-header)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          transition: 'background-color var(--transition-normal)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Admin Panel</span>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Content Management</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Supabase Status Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--pill-bg)',
              border: '1px solid var(--pill-border)',
              fontSize: '0.75rem',
              color: 'var(--pill-text)',
              fontWeight: 600
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)' }}></span>
              <span>Supabase RLS Active</span>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main style={{ flex: 1, padding: '32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
