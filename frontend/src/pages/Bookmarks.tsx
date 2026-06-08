import { useState, useEffect } from 'react'
import api from '../api/client'
import TweetCard from '../components/TweetCard'

interface BookmarkEntry {
  _id: string
  userId: string
  tweetId: string
}

interface Tweet {
  _id: string
  userId: string
  title: string
  description: string
  image?: string
  createdAt: string
}

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkEntry[]>([])
  const [allTweets, setAllTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [bmRes, tweetsRes] = await Promise.all([
          api.get('/user/book-mark'),
          api.get('/tweet/'),
        ])
        setBookmarks(bmRes.data.data || [])
        setAllTweets(tweetsRes.data.data || [])
      } catch { /* swallow */ }
      setLoading(false)
    }
    load()
  }, [])

  const bookmarkedIds = new Set(bookmarks.map(b => b.tweetId))
  const bookmarkedTweets = allTweets.filter(t => bookmarkedIds.has(t._id))

  const handleRemove = (tweetId: string) => {
    setBookmarks(prev => prev.filter(b => b.tweetId !== tweetId))
  }

  return (
    <div>
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0,
        background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(12px)', zIndex: 10,
      }}>
        <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '20px' }}>Bookmarks</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '2px' }}>
          {bookmarkedTweets.length} saved
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
          <div className="spinner" />
        </div>
      ) : bookmarkedTweets.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p style={{ fontFamily: 'Syne', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No bookmarks yet</p>
          <p style={{ fontSize: '14px' }}>Save tweets to read them later</p>
        </div>
      ) : (
        bookmarkedTweets.map(tweet => (
          <TweetCard
            key={tweet._id}
            tweet={tweet}
            bookmarked={true}
            onBookmarkToggle={(id, val) => !val && handleRemove(id)}
          />
        ))
      )}
    </div>
  )
}
