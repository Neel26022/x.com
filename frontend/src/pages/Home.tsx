import { useState, useEffect, useCallback } from 'react'
import api from '../api/client'
import TweetCard from '../components/TweetCard'
import ComposeTweet from '../components/ComposeTweet'

interface Tweet {
  _id: string
  userId: string
  title: string
  description: string
  image?: string
  createdAt: string
}

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTweets = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get('/tweet/')
      setTweets(res.data.data || [])
    } catch {
      setError('Failed to load tweets')
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchTweets() }, [fetchTweets])

  const handleDelete = (id: string) => setTweets(prev => prev.filter(t => t._id !== id))

  return (
    <div>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0,
        background: 'rgba(5,5,5,0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 10,
      }}>
        <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '20px' }}>Home</h1>
      </div>

      <ComposeTweet onCreated={fetchTweets} />

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
          <div className="spinner" />
        </div>
      ) : error ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>{error}</div>
      ) : tweets.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p style={{ fontFamily: 'Syne', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No tweets yet</p>
          <p style={{ fontSize: '14px' }}>Be the first to post something!</p>
        </div>
      ) : (
        tweets.map(tweet => (
          <TweetCard key={tweet._id} tweet={tweet} onDelete={handleDelete} />
        ))
      )}
    </div>
  )
}
