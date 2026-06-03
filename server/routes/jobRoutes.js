const express = require('express')
const router  = express.Router()

// ✅ Correct — new folder name with s
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController')
// /api/jobs
router.route('/')
  .get(getJobs)    // GET  /api/jobs
  .post(createJob) // POST /api/jobs

// /api/jobs/:id
router.route('/:id')
  .get(getJobById)  // GET    /api/jobs/:id
  .put(updateJob)   // PUT    /api/jobs/:id
  .delete(deleteJob)// DELETE /api/jobs/:id

module.exports = router