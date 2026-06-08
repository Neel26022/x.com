import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function SignIn() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/user/signin', {
        username: form.username,
        password: form.password,
      })
      setUser({ id: res.data.user.id, username: res.data.user.username })
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Sign in failed')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--bg)',
    }}>
      {/* Left branding */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        padding: '48px',
      }}>
        <div style={{
          width: '80px', height: '80px',
          background: 'var(--accent)',
          borderRadius: '20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '24px',
        }}>
          <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '48px', color: '#000' }}>X</span>
        </div>
        <h1 style={{
          fontFamily: 'Syne', fontWeight: 800,
          fontSize: '48px', lineHeight: 1.1,
          maxWidth: '320px', textAlign: 'center',
        }}>
          What's happening in the world
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '16px', textAlign: 'center', maxWidth: '280px', lineHeight: 1.6 }}>
          Join the conversation. Share your thoughts. Connect with the world.
        </p>
      </div>

      {/* Right form */}
      <div style={{
        width: '480px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '48px',
      }}>
        <div style={{ width: '100%', maxWidth: '340px' }}>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '28px', marginBottom: '8px' }}>
            Sign in
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>
            Welcome back. Enter your credentials.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-dim)' }}>
                Username
              </label>
              <input
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                placeholder="your_username"
                required
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: '10px', color: 'var(--text)', fontSize: '15px',
                  outline: 'none', transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-dim)' }}>
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: '10px', color: 'var(--text)', fontSize: '15px',
                  outline: 'none', transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>

            {error && (
              <p style={{
                background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.3)',
                color: 'var(--danger)', padding: '10px 14px', borderRadius: '8px', fontSize: '13px',
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '13px', borderRadius: '10px',
                background: loading ? 'var(--surface2)' : 'var(--accent)',
                color: loading ? 'var(--text-muted)' : '#000',
                fontFamily: 'Syne', fontWeight: 700, fontSize: '15px',
                transition: 'all 0.15s', marginTop: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              {loading ? <div className="spinner" style={{ width: '18px', height: '18px' }} /> : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
