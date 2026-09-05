import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'compact';
}

export function ThemeToggle({ className = '', variant = 'button' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`theme-toggle-btn ${className}`}
        aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
        title={isDark ? 'Mode Terang' : 'Mode Gelap'}
        style={{
          background: 'none',
          border: 'none',
          padding: '6px',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          borderRadius: 'var(--radius-md)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all var(--transition-fast)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--text-primary)';
          e.currentTarget.style.background = 'var(--bg-input)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary)';
          e.currentTarget.style.background = 'none';
        }}
      >
        {isDark ? (
          <Sun size={18} style={{ color: '#fbbf24', transition: 'transform 200ms ease' }} />
        ) : (
          <Moon size={18} style={{ color: '#6366f1', transition: 'transform 200ms ease' }} />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-input)',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
        e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 242, 254, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {isDark ? (
        <Sun size={19} style={{ color: '#fbbf24', transition: 'transform 250ms ease' }} />
      ) : (
        <Moon size={19} style={{ color: '#6366f1', transition: 'transform 250ms ease' }} />
      )}
    </button>
  );
}

export default ThemeToggle;
