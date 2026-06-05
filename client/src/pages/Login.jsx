import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate  = useNavigate()
  const { login } = useAuth()

  const [form,    setForm]    = useState({ email: '', password: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      const res = await API.post('/auth/login', form)
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0e0e0f] min-h-screen flex flex-col md:grid md:grid-cols-2">

      {/* Left panel - hidden on small screens */}
      <div className="hidden md:flex bg-[#161618] border-r border-white/8 p-16 flex-col justify-between">
        <div>
          <h2 className="text-3xl text-[#f0ede8] leading-snug max-w-sm mb-6">
            The best time to find your next{' '}
            <em className="italic text-[#7a7876]">great job</em> is right now.
          </h2>
          <p className="text-sm text-[#7a7876]">
            Join 98,000+ professionals who found their dream role through WorkBridge.
          </p>
          <div className="flex gap-3 flex-wrap mt-8">
            {['Google', 'Airbnb', 'Stripe', 'Meta', 'Netflix', 'Tesla'].map(c => (
              <span key={c} className="text-xs px-3 py-2 rounded-full border border-white/8 text-[#7a7876]">{c}</span>
            ))}
          </div>
        </div>
        <p className="text-xs text-[#7a7876]">© 2026 WorkBridge · Privacy · Terms</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
        <h2 className="text-3xl text-[#f0ede8] mb-2">Welcome back</h2>
        <p className="text-sm text-[#7a7876] mb-8">Sign in to your account</p>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#7a7876] mb-2">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required
              className="w-full px-4 py-3 bg-[#161618] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564] transition-colors" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#7a7876] mb-2">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required
              className="w-full px-4 py-3 bg-[#161618] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564] transition-colors" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#c8f564] text-[#1a2600] rounded-lg text-sm font-medium hover:bg-[#d4f772] transition-colors disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>

        <p className="text-sm text-[#7a7876] mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#c8f564]">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}

export default Login