import { useState } from 'react'
import JobCard from '../components/JobCard'

// Our test data — we replace this with real API data in Step 5
const ALL_JOBS = [
  { id: 1, title: "Senior React Developer",    company: "Google",  location: "Remote",        type: "Full-time", level: "Senior", salary: "$140K – $180K", isNew: true,  tags: ["Remote", "React", "Full Stack"] },
  { id: 2, title: "Frontend Engineer",         company: "Airbnb",  location: "San Francisco", type: "Full-time", level: "Mid",    salary: "$110K – $140K", isNew: false, tags: ["React", "Full Stack"] },
  { id: 3, title: "Full Stack Developer",      company: "Meta",    location: "Menlo Park",    type: "Full-time", level: "Senior", salary: "$160K – $200K", isNew: false, tags: ["Full Stack", "Node.js"] },
  { id: 4, title: "Backend Node.js Engineer",  company: "Stripe",  location: "Remote",        type: "Contract",  level: "Mid",    salary: "$90K – $120K",  isNew: true,  tags: ["Remote", "Node.js", "Backend"] },
  { id: 5, title: "UI/UX Designer",            company: "Netflix", location: "Los Gatos",     type: "Full-time", level: "Senior", salary: "$130K – $165K", isNew: false, tags: ["Design"] },
  { id: 6, title: "DevOps Engineer",           company: "Tesla",   location: "Remote",        type: "Full-time", level: "Entry",  salary: "$95K – $125K",  isNew: true,  tags: ["Remote", "Backend"] },
]

const ALL_TAGS = ["Remote", "React", "Node.js", "Full Stack", "Backend", "Design"]

function Home() {
  // --- STATE ---
  const [search,     setSearch]     = useState('')  // what user types in search box
  const [location,   setLocation]   = useState('')  // what user types in location box
  const [activeTag,  setActiveTag]  = useState('')  // which tag pill is selected

  // --- FILTERING LOGIC ---
  // This runs every time search, location or activeTag changes
  const filteredJobs = ALL_JOBS.filter(job => {

    // Check if job title or company matches the search text
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase())
      || job.company.toLowerCase().includes(search.toLowerCase())

    // Check if job location matches location input
    const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase())

    // Check if job has the active tag (if no tag selected, show all)
    const matchesTag = activeTag === '' || job.tags.includes(activeTag)

    // Job must match ALL three conditions
    return matchesSearch && matchesLocation && matchesTag
  })

  // --- TAG CLICK HANDLER ---
  function handleTagClick(tag) {
    // If clicking the already active tag, deselect it
    // Otherwise select the new tag
    setActiveTag(activeTag === tag ? '' : tag)
  }

  return (
    <div className="bg-[#0e0e0f] min-h-screen">

      {/* ── HERO SECTION ── */}
      <div className="px-10 pt-20 pb-16 max-w-3xl">
        <p className="text-xs tracking-widest text-[#c8f564] uppercase mb-5">
          ▸ {filteredJobs.length} open positions
        </p>

        <h1 className="text-6xl text-[#f0ede8] leading-tight mb-5">
          Find work you'll <br />
          <span className="italic text-[#7a7876]">actually love</span> doing.
        </h1>

        <p className="text-lg text-[#7a7876] mb-9 max-w-md leading-relaxed">
          Connect with top companies building the future.
        </p>

        {/* ── SEARCH BAR ── */}
        <div className="flex gap-3 max-w-xl mb-6">
          <input
            type="text"
            placeholder="Role, skill, or company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 bg-[#161618] border border-white/10 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564] transition-colors"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-36 px-4 py-3 bg-[#161618] border border-white/10 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564] transition-colors"
          />
          <button className="px-5 py-3 bg-[#c8f564] text-[#1a2600] rounded-lg text-sm font-medium hover:bg-[#d4f772] transition-colors">
            Search →
          </button>
        </div>

        {/* ── TAG PILLS ── */}
        <div className="flex gap-2 flex-wrap">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`text-xs px-4 py-2 rounded-full border transition-colors
                ${activeTag === tag
                  ? 'border-[#c8f564] text-[#c8f564] bg-[#c8f564]/10'
                  : 'border-white/10 text-[#7a7876] hover:border-white/20 hover:text-[#f0ede8]'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── JOBS SECTION ── */}
      <div className="px-10 pb-16">
        <div className="flex justify-between items-baseline mb-7">
          <h2 className="text-2xl text-[#f0ede8]">
            Featured openings
            <span className="text-base text-[#7a7876] ml-3">
              ({filteredJobs.length} jobs)
            </span>
          </h2>
          <a href="/jobs" className="text-sm text-[#c8f564]">View all →</a>
        </div>

        {/* ── JOB CARDS or EMPTY STATE ── */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {filteredJobs.map(job => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        ) : (
          // Show this when no jobs match the search
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-[#f0ede8] text-lg mb-2">No jobs found</p>
            <p className="text-[#7a7876] text-sm">Try a different search or clear the filters</p>
            <button
              onClick={() => { setSearch(''); setLocation(''); setActiveTag('') }}
              className="mt-6 px-5 py-2 border border-white/10 text-[#7a7876] rounded-lg text-sm hover:border-white/20 hover:text-[#f0ede8] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default Home