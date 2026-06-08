import { useState, useRef } from 'react'
import { Image, Send, X } from 'lucide-react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'

interface Props {
  onCreated: () => void
}

export default function ComposeTweet({ onCreated }: Props) {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required')
      return
    }
    setLoading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('userId', user!.id)
      fd.append('title', title)
      fd.append('description', description)
      if (file) fd.append('image', file)
      await api.post('/tweet/create-tweeet', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setTitle('')
      setDescription('')
      setFile(null)
      setPreview(null)
      onCreated()
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to post tweet')
    }
    setLoading(false)
  }

  return (
    <div style={{
      padding: '20px 24px',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#000', fontWeight: 700, fontFamily: 'Syne', fontSize: '14px',
          flexShrink: 0,
        }}>
          {user?.username?.[0]?.toUpperCase()}
        </div>

        <div style={{ flex: 1 }}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            maxLength={80}
            style={{
              width: '100%', background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text)', fontSize: '15px', fontFamily: 'Syne', fontWeight: 600,
              marginBottom: '8px',
            }}
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What's happening?"
            rows={3}
            style={{
              width: '100%', background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text)', fontSize: '15px', resize: 'none',
              lineHeight: 1.5,
            }}
          />

          {preview && (
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '12px' }}>
              <img src={preview} alt="" style={{ borderRadius: '8px', maxHeight: '160px', maxWidth: '100%' }} />
              <button
                onClick={() => { setPreview(null); setFile(null) }}
                style={{
                  position: 'absolute', top: '6px', right: '6px',
                  background: 'rgba(0,0,0,0.7)', borderRadius: '50%',
                  width: '24px', height: '24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <X size={12} />
              </button>
            </div>
          )}

          {error && (
            <p style={{ color: 'var(--danger)', fontSize: '13px', marginBottom: '8px' }}>{error}</p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
              <button
                onClick={() => fileRef.current?.click()}
                style={{ color: 'var(--accent)', padding: '6px', borderRadius: '8px', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dim)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Image size={18} />
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !title.trim() || !description.trim()}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: loading || !title.trim() || !description.trim() ? 'var(--surface2)' : 'var(--accent)',
                color: loading || !title.trim() || !description.trim() ? 'var(--text-muted)' : '#000',
                padding: '8px 20px', borderRadius: '100px',
                fontFamily: 'Syne', fontWeight: 700, fontSize: '14px',
                transition: 'all 0.15s',
              }}
            >
              {loading ? <div className="spinner" style={{ width: '16px', height: '16px' }} /> : <><Send size={14} /> Post</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
