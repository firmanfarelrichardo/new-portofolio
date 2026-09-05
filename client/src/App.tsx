import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './features/auth/AuthContext';
import { ProtectedRoute } from './features/auth/ProtectedRoute';
import { LoginPage } from './features/auth/LoginPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { ProfileEditorPage } from './features/profile/ProfileEditorPage';
import { HomePage } from './features/public/HomePage';
import { Construction } from 'lucide-react';

function ModulePlaceholder({ title }: { title: string }) {
  return (
    <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', maxWidth: '600px', margin: '40px auto' }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'rgba(0, 242, 254, 0.1)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-cyan)',
        marginBottom: '20px'
      }}>
        <Construction size={28} />
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Modul {title}</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
        Modul ini sedang disiapkan pada siklus Sprint berikutnya. Struktur basis data Supabase untuk modul ini telah aktif.
      </p>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage />} />

          {/* Admin Auth Route */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Admin CMS Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Navigate to="/admin/dashboard" replace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <DashboardPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ProfileEditorPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/skills"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ModulePlaceholder title="Skills Management" />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/projects/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ModulePlaceholder title="Projects & Case Studies" />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/experience"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ModulePlaceholder title="Experience Timeline" />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/certificates"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ModulePlaceholder title="Certifications & Credentials" />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ModulePlaceholder title="Contact Messages Inbox" />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ModulePlaceholder title="Global Settings & SEO" />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);
}

export default App;
