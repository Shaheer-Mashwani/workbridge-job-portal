import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const navigate  = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'seeker' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      const res = await API.post('/auth/register', form)
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0e0e0f] min-h-screen flex flex-col md:grid md:grid-cols-2">

      {/* Left panel - hidden on mobile */}
      <div className="hidden md:flex bg-[#161618] border-r border-white/8 p-16 flex-col justify-between">
        <div>
          <h2 className="text-3xl text-[#f0ede8] leading-snug max-w-sm">
            Your next <em className="italic text-[#7a7876]">chapter</em> starts with one click.
          </h2>
          <p className="text-sm text-[#7a7876] mt-4">
            Post jobs or find them — WorkBridge works for both sides of the table.
          </p>
        </div>
        <p className="text-xs text-[#7a7876]">© 2026 WorkBridge · Privacy · Terms</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
        <h2 className="text-3xl text-[#f0ede8] mb-2">Create account</h2>
        <p className="text-sm text-[#7a7876] mb-6">Free to join. No credit card required.</p>

        {/* Role toggle */}
        <div className="flex border border-white/8 rounded-lg overflow-hidden mb-6">
          {['seeker', 'employer'].map(r => (
            <button key={r} type="button" onClick={() => setForm({ ...form, role: r })}
              className={`flex-1 py-2 text-sm transition-colors capitalize ${form.role === r ? 'bg-[#c8f564] text-[#1a2600] font-medium' : 'text-[#7a7876] hover:text-[#f0ede8]'}`}>
              {r === 'seeker' ? 'Job Seeker' : 'Employer'}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7a7876] mb-2">First name</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Ali" required
                className="w-full px-4 py-3 bg-[#161618] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564]" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7a7876] mb-2">Last name</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Hassan" required
                className="w-full px-4 py-3 bg-[#161618] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564]" />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#7a7876] mb-2">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required
              className="w-full px-4 py-3 bg-[#161618] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564]" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#7a7876] mb-2">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" required
              className="w-full px-4 py-3 bg-[#161618] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564]" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#c8f564] text-[#1a2600] rounded-lg text-sm font-medium hover:bg-[#d4f772] transition-colors disabled:opacity-50">
            {loading ? 'Creating account...' : 'Create account →'}
          </button>
        </form>

        <p className="text-sm text-[#7a7876] mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-[#c8f564]">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup