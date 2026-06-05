import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="bg-[#0e0e0f] border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center justify-between px-5 sm:px-10 h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-[#f0ede8] text-lg font-medium no-underline">
          <div className="w-7 h-7 bg-[#c8f564] rounded-md flex items-center justify-center text-[#1a2600] text-xs font-bold">W</div>
          WorkBridge
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-7">
          <Link to="/jobs" className="text-sm text-[#7a7876] hover:text-[#f0ede8] transition-colors no-underline">Find Jobs</Link>
          <Link to="/jobs" className="text-sm text-[#7a7876] hover:text-[#f0ede8] transition-colors no-underline">Companies</Link>
          {user?.role === 'employer' && (
            <Link to="/post-job" className="text-sm text-[#7a7876] hover:text-[#f0ede8] transition-colors no-underline">Post a Job</Link>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-[#7a7876] hover:text-[#f0ede8] transition-colors no-underline">
                👋 {user.firstName}
              </Link>
              <button onClick={handleLogout} className="px-4 py-2 rounded-lg border border-white/10 text-[#7a7876] text-sm hover:border-white/20 hover:text-[#f0ede8] transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"  className="px-4 py-2 rounded-lg border border-white/10 text-[#f0ede8] text-sm hover:border-white/20 transition-colors no-underline">Sign in</Link>
              <Link to="/signup" className="px-4 py-2 rounded-lg bg-[#c8f564] text-[#1a2600] text-sm font-medium hover:bg-[#d4f772] transition-colors no-underline">Get started</Link>
            </>
          )}
        </div>

        {/* Hamburger Button (mobile only) */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#f0ede8] focus:outline-none">
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#161618] border-t border-white/10 px-5 py-4 flex flex-col gap-4">
          <Link to="/jobs"      onClick={() => setMenuOpen(false)} className="text-sm text-[#7a7876] hover:text-[#f0ede8] no-underline">Find Jobs</Link>
          <Link to="/jobs"      onClick={() => setMenuOpen(false)} className="text-sm text-[#7a7876] hover:text-[#f0ede8] no-underline">Companies</Link>
          {user?.role === 'employer' && (
            <Link to="/post-job" onClick={() => setMenuOpen(false)} className="text-sm text-[#7a7876] hover:text-[#f0ede8] no-underline">Post a Job</Link>
          )}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm text-[#7a7876] no-underline">👋 {user.firstName}</Link>
                <button onClick={handleLogout} className="px-4 py-2 rounded-lg border border-white/10 text-[#7a7876] text-sm text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login"  onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg border border-white/10 text-[#f0ede8] text-sm text-center no-underline">Sign in</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-lg bg-[#c8f564] text-[#1a2600] text-sm font-medium text-center no-underline">Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar