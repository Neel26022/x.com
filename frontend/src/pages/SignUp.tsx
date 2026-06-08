import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/client'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/user/signup', {
        name: form.name,
        username: form.username,
        password: form.password,
      })
      navigate('/signin')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Sign up failed')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
      padding: '24px',
    }}>
      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '40px',
      }}>
        <div style={{
          width: '48px', height: '48px', background: 'var(--accent)', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
        }}>
          <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '28px', color: '#000' }}>X</span>
        </div>

        <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '28px', marginBottom: '8px' }}>
          Create account
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>
          Join xtweet today
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { key: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
            { key: 'username', label: 'Username', placeholder: 'john_doe', type: 'text' },
            { key: 'password', label: 'Password', placeholder: '••••••••', type: 'password' },
          ].map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-dim)' }}>
                {label}
              </label>
              <input
                type={type}
                value={(form as any)[key]}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                placeholder={placeholder}
                required
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: '10px', color: 'var(--text)', fontSize: '15px',
                  outline: 'none', transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
          ))}

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
            {loading ? <div className="spinner" style={{ width: '18px', height: '18px' }} /> : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link to="/signin" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
