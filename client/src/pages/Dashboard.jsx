import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

// ── CHILD COMPONENT DECLARED FIRST TO PREVENT INITIALIZATION ERRORS ──
function MetricCard({ value, label, delta, up }) {
  return (
    <div className="bg-[#161618] border border-white/8 rounded-2xl p-5">
      <p className="text-3xl text-[#f0ede8] mb-1">{value}</p>
      <p className="text-xs text-[#7a7876] mb-3">{label}</p>
      <p className={`text-xs ${up ? 'text-green-400' : 'text-[#7a7876]'}`}>{delta}</p>
    </div>
  )
}

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const [jobs, setJobs]  = useState([])
  const [active, setActive] = useState('dashboard')

  // Redirect if not logged in & safe data fetching
  useEffect(() => {
    let isMounted = true // Track mount status to prevent crashes on fast navigation

    if (!user) {
      navigate('/login')
      return
    }

    // Employers see their posted jobs
    if (user.role === 'employer') {
      API.get('/jobs')
        .then(res => {
          if (isMounted) {
            // Defensive check for payload layout structures
            setJobs(res.data.data || res.data || [])
          }
        })
        .catch((err) => console.error("Dashboard fetch error:", err))
    }

    return () => {
      isMounted = false // Clean up step
    }
  }, [user, navigate])

  if (!user) return null

  const navItems = [
    { id: 'dashboard',    icon: '◈', label: 'Dashboard'    },
    { id: 'applications', icon: '✦', label: 'Applications' },
    { id: 'saved',        icon: '◇', label: 'Saved jobs'   },
    { id: 'profile',      icon: '○', label: 'Profile'      },
    { id: 'settings',     icon: '△', label: 'Settings'     },
  ]

  // Sample applications for job seeker view
  const applications = [
    { title: 'Senior React Developer', company: 'Google', date: 'May 14, 2026', status: 'Interview' },
    { title: 'Frontend Engineer',      company: 'Airbnb', date: 'May 12, 2026', status: 'In review' },
    { title: 'Full Stack Developer',   company: 'Meta',   date: 'May 10, 2026', status: 'Offer'     },
    { title: 'Backend Engineer',       company: 'Stripe', date: 'May 8, 2026',  status: 'Rejected'  },
  ]

  const statusStyle = {
    'Interview': 'bg-blue-500/10  text-blue-400  border border-blue-500/20',
    'In review': 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    'Offer':     'bg-[#c8f564]/10 text-[#c8f564] border border-[#c8f564]/20',
    'Rejected':  'bg-red-500/10  text-red-400   border border-red-500/20',
  }

  return (
    <div className="bg-[#0e0e0f] min-h-screen flex text-[#f0ede8]">

      {/* ── SIDEBAR ── */}
      <div className="w-56 bg-[#161618] border-r border-white/8">
        <div className="p-5 border-b border-white/8">
          <p className="text-sm font-medium text-[#f0ede8]">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-[#7a7876] capitalize">{user.role}</p>
        </div>
        <nav className="py-3">
          {navItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 px-5 py-3 text-sm cursor-pointer transition-all border-l-2
                ${active === item.id
                  ? 'text-[#c8f564] border-[#c8f564] bg-[#c8f564]/5'
                  : 'text-[#7a7876] border-transparent hover:text-[#f0ede8] hover:bg-white/3'}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
          <div
            onClick={() => { logout(); navigate('/') }}
            className="flex items-center gap-3 px-5 py-3 text-sm cursor-pointer text-[#7a7876] border-l-2 border-transparent hover:text-red-400 transition-colors mt-4"
          >
            <span>⊗</span> Logout
          </div>
        </nav>
      </div>

      {/* ── MAIN ── */}
      <div className="flex-1 p-9">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-[#f0ede8] mb-1">
            Good morning, {user.firstName} 👋
          </h1>
          <p className="text-sm text-[#7a7876]">
            {user.role === 'employer'
              ? 'Manage your job postings and applicants.'
              : 'Track your applications and find new opportunities.'}
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {user.role === 'seeker' ? (
            <>
              <MetricCard value="12" label="Applications sent"    delta="↑ 4 this week" up />
              <MetricCard value="3"  label="Interviews scheduled" delta="↑ 2 new"        up />
              <MetricCard value="1"  label="Offers received"      delta="↑ New!"         up />
              <MetricCard value="28" label="Saved jobs"           delta="→ No change"       />
            </>
          ) : (
            <>
              <MetricCard value={jobs.length} label="Active postings"  delta="↑ 2 this week" up />
              <MetricCard value="48"          label="Total applicants" delta="↑ 12 new"       up />
              <MetricCard value="6"           label="Interviews set"   delta="↑ 3 new"        up />
              <MetricCard value="2"           label="Positions filled" delta="This month"        />
            </>
          )}
        </div>

        {/* Applications Table — seeker only */}
        {user.role === 'seeker' && (
          <div className="bg-[#161618] border border-white/8 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/8">
              <h2 className="text-base font-medium text-[#f0ede8]">Recent applications</h2>
              <button className="text-xs px-3 py-2 border border-white/8 text-[#7a7876] rounded-lg hover:border-white/20 hover:text-[#f0ede8] transition-colors">
                View all
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  {['Job title', 'Company', 'Applied', 'Status', ''].map(h => (
                    <th key={h} className="text-left text-xs uppercase tracking-widest text-[#7a7876] px-6 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applications.map((app, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 text-sm text-[#f0ede8]">{app.title}</td>
                    <td className="px-6 py-4 text-sm text-[#7a7876]">{app.company}</td>
                    <td className="px-6 py-4 text-sm text-[#7a7876]">{app.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${statusStyle[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to="/jobs" className="text-xs text-[#c8f564]">View →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Posted Jobs Table — employer only */}
        {user.role === 'employer' && (
          <div className="bg-[#161618] border border-white/8 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/8">
              <h2 className="text-base font-medium text-[#f0ede8]">Your job postings</h2>
              <Link to="/post-job" className="text-xs px-3 py-2 bg-[#c8f564] text-[#1a2600] rounded-lg font-medium hover:bg-[#d4f772] transition-colors">
                + Post new job
              </Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8">
                  {['Title', 'Type', 'Level', 'Posted', ''].map(h => (
                    <th key={h} className="text-left text-xs uppercase tracking-widest text-[#7a7876] px-6 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(jobs || []).slice(0, 5).map((job) => (
                  <tr key={job._id || job.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 text-sm text-[#f0ede8]">{job.title}</td>
                    <td className="px-6 py-4 text-sm text-[#7a7876]">{job.type}</td>
                    <td className="px-6 py-4 text-sm text-[#7a7876]">{job.level}</td>
                    <td className="px-6 py-4 text-sm text-[#7a7876]">
                      {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/jobs/${job._id || job.id}`} className="text-xs text-[#c8f564]">View →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard