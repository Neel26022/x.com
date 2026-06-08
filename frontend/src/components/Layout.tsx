import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Home, Bookmark, User, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {/* Sidebar */}
      <nav style={{
        width: '240px',
        flexShrink: 0,
        padding: '24px 16px',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          marginBottom: '16px',
        }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'var(--accent)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#000', fontFamily: 'Syne', fontWeight: 800, fontSize: '18px' }}>X</span>
          </div>
          <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px' }}>xtweet</span>
        </div>

        {/* Nav links */}
        {[
          { to: '/', icon: Home, label: 'Home', end: true },
          { to: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
          { to: '/profile', icon: User, label: 'Profile' },
        ].map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius)',
              background: isActive ? 'var(--accent-dim)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text-dim)',
              fontFamily: 'Syne',
              fontWeight: 600,
              fontSize: '15px',
              transition: 'all 0.15s',
            })}
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}

        <div style={{ flex: 1 }} />

        {/* User info */}
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius)',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          marginBottom: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#000', fontWeight: 700, fontSize: '13px', fontFamily: 'Syne',
            }}>
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <span style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: '14px' }}>@{user?.username}</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: 'var(--text-muted)', fontSize: '13px',
              transition: 'color 0.15s',
              width: '100%',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--danger)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, borderRight: '1px solid var(--border)', minHeight: '100vh' }}>
        <Outlet />
      </main>

      {/* Right panel */}
      <aside style={{
        width: '300px',
        flexShrink: 0,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius)',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}>
          <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>
            What's happening
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.5 }}>
            Share your thoughts with the world. Create a tweet to get started.
          </p>
        </div>
      </aside>
    </div>
  )
}
