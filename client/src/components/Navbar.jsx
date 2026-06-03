import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="flex items-center justify-between px-10 h-16 bg-[#0e0e0f] border-b border-white/10 sticky top-0 z-50">

      <Link to="/" className="flex items-center gap-3 text-[#f0ede8] text-lg font-medium no-underline">
        <div className="w-7 h-7 bg-[#c8f564] rounded-md flex items-center justify-center text-[#1a2600] text-xs font-bold">W</div>
        WorkBridge
      </Link>

      <div className="flex gap-7">
        <Link to="/jobs"   className="text-sm text-[#7a7876] hover:text-[#f0ede8] transition-colors no-underline">Find Jobs</Link>
        <Link to="/jobs"   className="text-sm text-[#7a7876] hover:text-[#f0ede8] transition-colors no-underline">Companies</Link>
        {user?.role === 'employer' && (
          <Link to="/post-job" className="text-sm text-[#7a7876] hover:text-[#f0ede8] transition-colors no-underline">Post a Job</Link>
        )}
      </div>

      <div className="flex gap-3 items-center">
        {user ? (
          // Logged in — show name + logout
          <>
            <Link to="/dashboard" className="text-sm text-[#7a7876] hover:text-[#f0ede8] transition-colors no-underline">
              👋 {user.firstName}
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-white/10 text-[#7a7876] text-sm hover:border-white/20 hover:text-[#f0ede8] transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          // Not logged in — show sign in + get started
          <>
            <Link to="/login"  className="px-4 py-2 rounded-lg border border-white/10 text-[#f0ede8] text-sm hover:border-white/20 transition-colors no-underline">Sign in</Link>
            <Link to="/signup" className="px-4 py-2 rounded-lg bg-[#c8f564] text-[#1a2600] text-sm font-medium hover:bg-[#d4f772] transition-colors no-underline">Get started</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar