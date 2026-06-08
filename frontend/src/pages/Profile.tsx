import { useState, useEffect } from 'react'
import api from '../api/client'
import TweetCard from '../components/TweetCard'
import { useAuth } from '../context/AuthContext'

interface Tweet {
  _id: string
  userId: string
  title: string
  description: string
  image?: string
  createdAt: string
}

export default function Profile() {
  const { user } = useAuth()
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        // fetch all tweets and filter by userId
        const res = await api.get('/tweet/')
        const own = (res.data.data || []).filter((t: Tweet) => t.userId === user?.id)
        setTweets(own)
      } catch { /* swallow */ }
      setLoading(false)
    }
    load()
  }, [user])

  const handleDelete = (id: string) => setTweets(prev => prev.filter(t => t._id !== id))

  return (
    <div>
      {/* Cover */}
      <div style={{
        height: '120px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a1a 50%, #1a1a1a 100%)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', bottom: '-40px', left: '24px',
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'var(--accent)',
          border: '4px solid var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#000', fontFamily: 'Syne', fontWeight: 800, fontSize: '28px',
        }}>
          {user?.username?.[0]?.toUpperCase()}
        </div>
      </div>

      <div style={{ padding: '52px 24px 20px', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '22px' }}>@{user?.username}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
          {tweets.length} tweet{tweets.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
        <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '16px' }}>Your Tweets</h3>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
          <div className="spinner" />
        </div>
      ) : tweets.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p style={{ fontFamily: 'Syne', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>No tweets yet</p>
          <p style={{ fontSize: '14px' }}>Head to Home to post your first tweet</p>
        </div>
      ) : (
        tweets.map(tweet => (
          <TweetCard key={tweet._id} tweet={tweet} onDelete={handleDelete} />
        ))
      )}
    </div>
  )
}
