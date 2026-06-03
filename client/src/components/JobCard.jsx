import { Link } from 'react-router-dom'

function JobCard({ id, title, company, location, type, level, salary, isNew }) {
  return (
    <div className={`bg-[#161618] border rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-colors
      ${isNew ? 'border-[#c8f564]/30' : 'border-white/8 hover:border-white/20'}`}>

      {/* Top row */}
      <div className="flex justify-between items-start">
        <div className="w-11 h-11 rounded-xl bg-[#1a2f1a] border border-white/10 flex items-center justify-center text-[#7ccc7c] font-semibold text-base">
          {company[0]}
        </div>
        {isNew && (
          <span className="text-xs px-3 py-1 rounded-full bg-[#c8f564]/10 text-[#c8f564] border border-[#c8f564]/25">
            New
          </span>
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className="text-base font-medium text-[#f0ede8] mb-1">{title}</h3>
        <p className="text-sm text-[#7a7876]">{company} · {location}</p>
      </div>

      {/* Pills */}
      <div className="flex gap-2">
        <span className="text-xs px-3 py-1 rounded-full bg-[#1e1e21] text-[#7a7876] border border-white/8">{type}</span>
        <span className="text-xs px-3 py-1 rounded-full bg-[#1e1e21] text-[#7a7876] border border-white/8">{level}</span>
      </div>

      {/* Bottom */}
      <div className="flex justify-between items-center pt-3 border-t border-white/6">
        <span className="text-base font-medium text-[#f0ede8]">{salary}</span>
        <Link to={`/jobs/${id}`} className="text-xs text-[#c8f564] font-medium no-underline">
          View →
        </Link>
      </div>

    </div>
  )
}

export default JobCard