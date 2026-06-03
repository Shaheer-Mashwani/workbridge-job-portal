const express    = require('express')
const cors       = require('cors')
require('dotenv').config()

// This tells index.js to step back up one folder level and find the server directory
const connectDB   = require('../config/db')
const jobRoutes   = require('../routes/jobRoutes')
const authRoutes  = require('../routes/authRoutes')

const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/jobs',  jobRoutes)
app.use('/api/auth',  authRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'WorkBridge API is running!' })
})

// REMOVED app.listen() because Vercel handles the port assignment dynamically.

// CRITICAL FOR VERCEL: Export the app instance
module.exports = app