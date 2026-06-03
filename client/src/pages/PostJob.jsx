import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

const ALL_TAGS = ['React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Redux', 'REST API', 'Next.js']

function PostJob() {
  const { token }   = useAuth() // Extract token or user to ensure auth state exists
  const navigate   = useNavigate()

  const [form, setForm] = useState({
    title: '', company: '', location: '', type: 'Full-time',
    level: 'Mid', salary: '', description: '', requirements: '', tags: [],
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleTag = (tag) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')

      // Defensive fix: Convert requirements string safely, checking if it exists first
      const rawRequirements = form.requirements || ''
      const payload = {
        ...form,
        requirements: rawRequirements.split('\n').filter(r => r.trim() !== ''),
      }

      // Add Authorization Headers dynamically if needed by your backend guard
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      
      await API.post('/jobs', payload, config)
      navigate('/dashboard')
    } catch (err) {
      console.error("Job post tracking error:", err)
      setError(err.response?.data?.message || 'Failed to post job. Please ensure you are logged in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0e0e0f] min-h-screen text-[#f0ede8]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl text-[#f0ede8] mb-2">Post a job</h1>
        <p className="text-sm text-[#7a7876] mb-10">Reach thousands of qualified candidates.</p>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Basic info card */}
          <div className="bg-[#161618] border border-white/8 rounded-2xl p-6">
            <h2 className="text-base font-medium text-[#f0ede8] mb-5 pb-4 border-b border-white/8">Basic information</h2>
            <div className="space-y-4">
              <FormInput label="Job title"    name="title"    value={form.title}    onChange={handleChange} placeholder="e.g. Senior React Developer" required />
              <FormInput label="Company name" name="company"  value={form.company}  onChange={handleChange} placeholder="Your company name" required />
              <FormInput label="Location"     name="location" value={form.location} onChange={handleChange} placeholder="City, Country or Remote" required />
              <div className="grid grid-cols-2 gap-4">
                <FormSelect label="Job type" name="type" value={form.type} onChange={handleChange}
                  options={['Full-time', 'Part-time', 'Contract', 'Internship']} />
                <FormSelect label="Experience level" name="level" value={form.level} onChange={handleChange}
                  options={['Entry', 'Mid', 'Senior', 'Lead']} />
              </div>
              <FormInput label="Salary range" name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. $80K – $120K" required />
            </div>
          </div>

          {/* Description card */}
          <div className="bg-[#161618] border border-white/8 rounded-2xl p-6">
            <h2 className="text-base font-medium text-[#f0ede8] mb-5 pb-4 border-b border-white/8">Job description</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7a7876] mb-2">About the role</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the role and responsibilities..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-[#1e1e21] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564] resize-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7a7876] mb-2">Requirements (one per line)</label>
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder={"5+ years React experience\nTypeScript proficiency\nREST API knowledge"}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1e1e21] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564] resize-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Skills card */}
          <div className="bg-[#161618] border border-white/8 rounded-2xl p-6">
            <h2 className="text-base font-medium text-[#f0ede8] mb-2 pb-4 border-b border-white/8">Skills & tags</h2>
            <p className="text-xs text-[#7a7876] mb-4">Select relevant skills</p>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-sm px-4 py-2 rounded-full border transition-colors
                    ${form.tags.includes(tag)
                      ? 'border-[#c8f564] text-[#c8f564] bg-[#c8f564]/10'
                      : 'border-white/8 text-[#7a7876] hover:border-white/20 hover:text-[#f0ede8]'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex gap-3 justify-end pb-10">
            <button type="button" onClick={() => navigate('/dashboard')}
              className="px-5 py-3 border border-white/8 text-[#7a7876] rounded-lg text-sm hover:border-white/20 hover:text-[#f0ede8] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-5 py-3 bg-[#c8f564] text-[#1a2600] rounded-lg text-sm font-medium hover:bg-[#d4f772] transition-colors disabled:opacity-50">
              {loading ? 'Publishing...' : 'Publish job →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Reusable input component
function FormInput({ label, name, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-[#7a7876] mb-2">{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
        className="w-full px-4 py-3 bg-[#1e1e21] border border-white/8 rounded-lg text-[#f0ede8] text-sm placeholder-[#7a7876] focus:outline-none focus:border-[#c8f564] transition-colors" />
    </div>
  )
}

// Reusable select component with critical dark drop-down fix
function FormSelect({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-[#7a7876] mb-2">{label}</label>
      <select 
        name={name} 
        value={value} 
        onChange={onChange}
        className="w-full px-4 py-3 bg-[#1e1e21] border border-white/8 rounded-lg text-[#f0ede8] text-sm focus:outline-none focus:border-[#c8f564] transition-colors appearance-none"
      >
        {options.map(o => (
          <option key={o} value={o} className="bg-[#161618] text-[#f0ede8]">
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PostJob