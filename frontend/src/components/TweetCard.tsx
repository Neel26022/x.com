import { useState } from 'react'
import { MessageCircle, Bookmark, BookmarkCheck, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'

interface Tweet {
  _id: string
  userId: string
  title: string
  description: string
  image?: string
  createdAt: string
  views?: number
}

interface Props {
  tweet: Tweet
  onDelete?: (id: string) => void
  bookmarked?: boolean
  onBookmarkToggle?: (id: string, val: boolean) => void
}

export default function TweetCard({ tweet, onDelete, bookmarked = false, onBookmarkToggle }: Props) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isBookmarked, setIsBookmarked] = useState(bookmarked)
  const [bookmarking, setBookmarking] = useState(false)

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setBookmarking(true)
    try {
      if (isBookmarked) {
        await api.delete(`/user/${tweet._id}/book-mark`)
        setIsBookmarked(false)
        onBookmarkToggle?.(tweet._id, false)
      } else {
        await api.post(`/user/${tweet._id}/book-mark`)
        setIsBookmarked(true)
        onBookmarkToggle?.(tweet._id, true)
      }
    } catch { /* swallow */ }
    setBookmarking(false)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await api.delete('/tweet/tweet-delete', { data: { tweetId: tweet._id } })
      onDelete?.(tweet._id)
    } catch { /* swallow */ }
  }

  const isOwn = user?.id === tweet.userId

  return (
    <article
      onClick={() => navigate(`/tweet/${tweet._id}`)}
      style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'background 0.15s',
        animation: 'fadeUp 0.3s ease forwards',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: `hsl(${tweet.userId.charCodeAt(0) * 7 % 360}, 60%, 50%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontFamily: 'Syne', fontSize: '14px',
          flexShrink: 0,
        }}>
          {tweet.userId?.[0]?.toUpperCase() ?? '?'}
        </div>
        <div>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '14px' }}>{tweet.title}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            {new Date(tweet.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Body */}
      <p style={{
        fontSize: '15px', lineHeight: 1.6,
        color: 'var(--text)', marginBottom: '12px',
      }}>
        {tweet.description}
      </p>

      {/* Image */}
      {tweet.image && (
        <div style={{ marginBottom: '12px', borderRadius: '10px', overflow: 'hidden' }}>
          <img
            src={tweet.image}
            alt=""
            style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button
          onClick={e => { e.stopPropagation(); navigate(`/tweet/${tweet._id}`) }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: 'var(--text-muted)', fontSize: '13px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <MessageCircle size={15} />
          Comment
        </button>

        <button
          onClick={handleBookmark}
          disabled={bookmarking}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: isBookmarked ? 'var(--accent)' : 'var(--text-muted)',
            fontSize: '13px', transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = isBookmarked ? 'var(--accent)' : 'var(--text-muted)')}
        >
          {isBookmarked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
          {isBookmarked ? 'Saved' : 'Save'}
        </button>

        {isOwn && (
          <button
            onClick={handleDelete}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: 'var(--text-muted)', fontSize: '13px',
              transition: 'color 0.15s', marginLeft: 'auto',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--danger)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </article>
  )
}
