import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'

function JobDetail() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const [job, setJob]            = useState(null)
  const [loading, setLoading]    = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`)
        // Double check your backend structure! If your backend sends the job directly, use res.data
        setJob(res.data.data || res.data) 
      } catch (err) {
        console.error("Error fetching job details:", err)
        navigate('/jobs') 
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id, navigate]) // Added navigate to dependency array to satisfy ESLint rules

  if (loading) return (
    <div className="bg-[#0e0e0f] min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#c8f564] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  // If job data failed to load or came back empty, stop rendering to prevent crashes
  if (!job || !job.title) return null

  return (
    <div className="bg-[#0e0e0f] min-h-screen">
      <div className="grid grid-cols-[1fr_320px] min-h-screen">

        {/* ── MAIN CONTENT ── */}
        <div className="p-10 border-r border-white/8">

          {/* Back button */}
          <button
            onClick={() => navigate('/jobs')}
            className="text-sm text-[#7a7876] hover:text-[#f0ede8] mb-8 flex items-center gap-2 transition-colors"
          >
            ← Back to listings
          </button>

          {/* Company row */}
          <div className="flex items-center gap-4 mb-6">
            {/* Added optional chaining and fallback for safety */}
            <div className="w-14 h-14 rounded-xl bg-[#1a2f1a] border border-white/10 flex items-center justify-center text-[#7ccc7c] text-xl font-semibold">
              {job.company ? job.company[0] : '?'}
            </div>
            <div>
              <p className="text-base font-medium text-[#f0ede8]">{job.company || 'Unknown Company'}</p>
              <p className="text-sm text-[#7a7876]">{job.location}</p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl text-[#f0ede8] mb-5 leading-tight">{job.title}</h1>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap mb-8">
            {job.isNew && (
              <span className="text-xs px-3 py-1 rounded-full bg-[#c8f564]/10 text-[#c8f564] border border-[#c8f564]/25">New</span>
            )}
            <span className="text-xs px-3 py-1 rounded-full bg-[#1e1e21] text-[#7a7876] border border-white/8">{job.type}</span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#1e1e21] text-[#7a7876] border border-white/8">{job.level}</span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#1e1e21] text-[#7a7876] border border-white/8">{job.location}</span>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg text-[#f0ede8] mb-4 pb-3 border-b border-white/8">About the role</h2>
            <p className="text-sm text-[#7a7876] leading-relaxed">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-lg text-[#f0ede8] mb-4 pb-3 border-b border-white/8">Requirements</h2>
            <ul className="list-disc list-inside space-y-2">
              {/* Added fallback array to prevent .map() from running on undefined */}
              {(job.requirements || []).map((req, i) => (
                <li key={i} className="text-sm text-[#7a7876]">{req}</li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-lg text-[#f0ede8] mb-4 pb-3 border-b border-white/8">Skills</h2>
            <div className="flex gap-2 flex-wrap">
              {/* Added fallback array to prevent .map() from running on undefined */}
              {(job.tags || []).map((tag, i) => (
                <span key={i} className="text-xs px-3 py-2 rounded-full bg-[#1e1e21] text-[#f0ede8] border border-white/8">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── SIDEBAR ── */}
        <div className="p-8 bg-[#161618]">
          <div className="bg-[#1e1e21] border border-white/8 rounded-2xl p-6 mb-6">
            <p className="text-3xl text-[#f0ede8] mb-1">{job.salary || 'Competitive'}</p>
            <p className="text-xs text-[#7a7876] mb-6">per year · USD</p>
            <Link
              to="/signup"
              className="block w-full text-center py-3 bg-[#c8f564] text-[#1a2600] rounded-lg text-sm font-medium hover:bg-[#d4f772] transition-colors mb-3"
            >
              Apply now
            </Link>
            <button className="w-full py-3 border border-white/8 text-[#f0ede8] rounded-lg text-sm hover:border-white/20 transition-colors">
              Save job
            </button>
          </div>

          {/* Meta info */}
          <ul className="space-y-0">
            {[
              ['Job type',    job.type],
              ['Location',    job.location],
              ['Experience',  job.level],
              ['Posted',      job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recent'],
            ].map(([label, value]) => (
              <li key={label} className="flex justify-between py-3 border-b border-white/8 text-sm">
                <span className="text-[#7a7876]">{label}</span>
                <span className="text-[#f0ede8]">{value}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default JobDetail