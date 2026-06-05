import { useState, useEffect } from 'react'
import JobCard from '../components/JobCard'
import API from '../api/axios'

// FilterPanel defined OUTSIDE Jobs component
function FilterPanel({ search, setSearch, location, setLocation, type, setType, level, setLevel, setShowFilters }) {
  return (
    <div className="p-6">
      <p className="text-xs uppercase tracking-widest text-[#7a7876] mb-6">Filters</p>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-[#7a7876] mb-3">Search</p>
        <input type="text" placeholder="Title or company..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-2 bg-[#1e1e21] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564]" />
      </div>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-[#7a7876] mb-3">Location</p>
        <input type="text" placeholder="City or remote..." value={location} onChange={e => setLocation(e.target.value)}
          className="w-full px-3 py-2 bg-[#1e1e21] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564]" />
      </div>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-[#7a7876] mb-3">Job Type</p>
        {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => (
          <div key={t} onClick={() => setType(type === t ? '' : t)}
            className={`flex justify-between items-center py-2 cursor-pointer text-sm transition-colors ${type === t ? 'text-[#c8f564]' : 'text-[#7a7876] hover:text-[#f0ede8]'}`}>
            <span>{t}</span>
            {type === t && <span className="text-xs">✓</span>}
          </div>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-[#7a7876] mb-3">Experience</p>
        {['Entry', 'Mid', 'Senior', 'Lead'].map(l => (
          <div key={l} onClick={() => setLevel(level === l ? '' : l)}
            className={`flex justify-between items-center py-2 cursor-pointer text-sm transition-colors ${level === l ? 'text-[#c8f564]' : 'text-[#7a7876] hover:text-[#f0ede8]'}`}>
            <span>{l}</span>
            {level === l && <span className="text-xs">✓</span>}
          </div>
        ))}
      </div>

      <button onClick={() => { setSearch(''); setLocation(''); setType(''); setLevel(''); setShowFilters(false) }}
        className="w-full py-2 bg-[#1e1e21] hover:bg-white/5 border border-white/8 text-xs rounded-lg transition-colors text-[#7a7876] hover:text-[#f0ede8]">
        Clear Filters
      </button>
    </div>
  )
}

function Jobs() {
  const [jobs,        setJobs]        = useState([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState('')
  const [search,      setSearch]      = useState('')
  const [location,    setLocation]    = useState('')
  const [type,        setType]        = useState('')
  const [level,       setLevel]       = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const [debouncedSearch,   setDebouncedSearch]   = useState('')
  const [debouncedLocation, setDebouncedLocation] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedLocation(location), 500)
    return () => clearTimeout(timer)
  }, [location])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        setError('')
        const params = new URLSearchParams()
        if (debouncedSearch)   params.append('search',   debouncedSearch)
        if (debouncedLocation) params.append('location', debouncedLocation)
        if (type)              params.append('type',     type)
        if (level)             params.append('level',    level)
        const res = await API.get(`/jobs?${params.toString()}`)
        setJobs(res.data.data || res.data || [])
      } catch (err) {
        console.error(err)
        setError('Failed to load jobs. Make sure your server is running.')
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [debouncedSearch, debouncedLocation, type, level])

  const filterProps = { search, setSearch, location, setLocation, type, setType, level, setLevel, setShowFilters }

  return (
    <div className="bg-[#0e0e0f] min-h-screen text-[#f0ede8]">

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden px-5 pt-4">
        <button onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-[#161618] border border-white/10 rounded-lg text-sm text-[#7a7876]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h2" />
          </svg>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="md:hidden bg-[#161618] border-b border-white/8 mx-5 mt-3 rounded-xl">
          <FilterPanel {...filterProps} />
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-60 min-w-[240px] bg-[#161618] border-r border-white/8 min-h-screen">
          <FilterPanel {...filterProps} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5 sm:p-10">
          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">{error}</div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#c8f564] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (jobs || []).length === 0 ? (
            <div className="text-center py-20 text-[#7a7876]">No jobs found matching your criteria.</div>
          ) : (
            <div className="grid gap-4">
              {(jobs || []).map(job => (
                <JobCard key={job._id || job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Jobs