import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, CornerDownRight } from 'lucide-react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'

interface Comment {
  _id: string
  userId: string
  message: string
  createdAt: string
}

interface Reply {
  _id: string
  userId: string
  text: string
  createdAt: string
}

interface Tweet {
  _id: string
  userId: string
  title: string
  description: string
  image?: string
  createdAt: string
}

export default function TweetDetail() {
  const { tweetId } = useParams<{ tweetId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [tweet, setTweet] = useState<Tweet | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [replies, setReplies] = useState<Record<string, Reply[]>>({})
  const [newComment, setNewComment] = useState('')
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [showReplyBox, setShowReplyBox] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [tweetsRes, commentsRes] = await Promise.all([
          api.get('/tweet/'),
          api.get(`/tweet/${tweetId}/comment`),
        ])
        const found = tweetsRes.data.data?.find((t: Tweet) => t._id === tweetId)
        setTweet(found || null)
        setComments(commentsRes.data.data || [])
      } catch { /* swallow */ }
      setLoading(false)
    }
    load()
  }, [tweetId])

  const postComment = async () => {
    if (!newComment.trim()) return
    try {
      const res = await api.post(`/tweet/${tweetId}/comment`, { message: newComment })
      setComments(prev => [...prev, res.data.data])
      setNewComment('')
    } catch { /* swallow */ }
  }

  const loadReplies = async (commentId: string) => {
    try {
      const res = await api.get(`/tweet/${tweetId}/replay`)
      setReplies(prev => ({ ...prev, [commentId]: res.data.data || [] }))
    } catch { /* swallow */ }
  }

  const postReply = async (commentId: string) => {
    const text = replyText[commentId]
    if (!text?.trim()) return
    try {
      await api.post(`/tweet/${tweetId}/${commentId}/replay`, { text })
      setReplyText(prev => ({ ...prev, [commentId]: '' }))
      loadReplies(commentId)
    } catch { /* swallow */ }
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
      <div className="spinner" />
    </div>
  )

  if (!tweet) return (
    <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
      Tweet not found
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '16px',
        position: 'sticky', top: 0,
        background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(12px)', zIndex: 10,
      }}>
        <button onClick={() => navigate(-1)} style={{ color: 'var(--text)', padding: '6px', borderRadius: '8px', transition: 'background 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '20px' }}>Post</h1>
      </div>

      {/* Tweet */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: `hsl(${tweet.userId.charCodeAt(0) * 7 % 360}, 60%, 50%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontFamily: 'Syne', flexShrink: 0,
          }}>
            {tweet.userId?.[0]?.toUpperCase()}
          </div>
          <div>
            <div style={{ fontFamily: 'Syne', fontWeight: 700 }}>{tweet.title}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
              {new Date(tweet.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <p style={{ fontSize: '16px', lineHeight: 1.7, marginBottom: '12px' }}>{tweet.description}</p>
        {tweet.image && (
          <img src={tweet.image} alt="" style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
        )}
      </div>

      {/* Comment box */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', gap: '12px',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#000', fontFamily: 'Syne', fontWeight: 700, fontSize: '13px', flexShrink: 0,
        }}>
          {user?.username?.[0]?.toUpperCase()}
        </div>
        <div style={{ flex: 1, display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Post your reply"
            rows={2}
            style={{
              flex: 1, background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '10px 14px',
              color: 'var(--text)', fontSize: '14px', resize: 'none', outline: 'none',
            }}
          />
          <button
            onClick={postComment}
            disabled={!newComment.trim()}
            style={{
              background: newComment.trim() ? 'var(--accent)' : 'var(--surface2)',
              color: newComment.trim() ? '#000' : 'var(--text-muted)',
              padding: '10px', borderRadius: '10px', transition: 'all 0.15s',
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Comments */}
      <div>
        {comments.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
            No comments yet. Be the first!
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment._id} style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: `hsl(${comment.userId.charCodeAt(0) * 11 % 360}, 55%, 50%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: 'Syne', fontWeight: 700, fontSize: '13px', flexShrink: 0,
                }}>
                  {comment.userId?.[0]?.toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{comment.message}</p>

                  {/* Reply actions */}
                  <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                    <button
                      onClick={() => {
                        setShowReplyBox(prev => ({ ...prev, [comment._id]: !prev[comment._id] }))
                        if (!replies[comment._id]) loadReplies(comment._id)
                      }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        color: 'var(--text-muted)', fontSize: '12px', transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <CornerDownRight size={13} /> Reply
                    </button>
                  </div>

                  {/* Reply box */}
                  {showReplyBox[comment._id] && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <input
                        value={replyText[comment._id] || ''}
                        onChange={e => setReplyText(prev => ({ ...prev, [comment._id]: e.target.value }))}
                        placeholder="Write a reply…"
                        style={{
                          flex: 1, background: 'var(--surface)', border: '1px solid var(--border)',
                          borderRadius: '8px', padding: '8px 12px',
                          color: 'var(--text)', fontSize: '13px', outline: 'none',
                        }}
                        onKeyDown={e => e.key === 'Enter' && postReply(comment._id)}
                      />
                      <button
                        onClick={() => postReply(comment._id)}
                        style={{ background: 'var(--accent)', color: '#000', padding: '8px 12px', borderRadius: '8px' }}
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  )}

                  {/* Replies */}
                  {replies[comment._id]?.map(reply => (
                    <div key={reply._id} style={{
                      marginTop: '10px', paddingLeft: '16px',
                      borderLeft: '2px solid var(--border)',
                    }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '2px' }}>
                        {new Date(reply.createdAt).toLocaleString()}
                      </div>
                      <p style={{ fontSize: '13px', lineHeight: 1.5 }}>{reply.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
