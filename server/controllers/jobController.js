const Job = require('../models/Job')

// ── GET all jobs ──────────────────────────────
// GET /api/jobs
const getJobs = async (req, res) => {
  try {
    // Get search and filter values from URL query
    // e.g. /api/jobs?search=react&location=remote
    const { search, location, type, level } = req.query

    // Build a filter object dynamically
    let filter = {}

    if (search) {
      // Search in both title and company fields
      filter.$or = [
        { title:   { $regex: search, $options: 'i' } }, // i = case insensitive
        { company: { $regex: search, $options: 'i' } },
      ]
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' }
    }

    if (type)  filter.type  = type
    if (level) filter.level = level

    // Find jobs matching the filter, newest first
    const jobs = await Job.find(filter).sort({ createdAt: -1 })

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ── GET single job ────────────────────────────
// GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }

    res.json({ success: true, data: job })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// ── CREATE job ────────────────────────────────
// POST /api/jobs
const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body)
    res.status(201).json({ success: true, data: job })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// ── UPDATE job ────────────────────────────────
// PUT /api/jobs/:id
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // return updated doc
    )

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }

    res.json({ success: true, data: job })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

// ── DELETE job ────────────────────────────────
// DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id)

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }

    res.json({ success: true, message: 'Job deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob }