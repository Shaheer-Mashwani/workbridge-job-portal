const express    = require('express')
const cors       = require('cors')
require('dotenv').config()

// Double check these paths! Make sure they point correctly to your folders.
const connectDB   = require('../server/config/db')
const jobRoutes   = require('../server/routes/jobRoutes')
const authRoutes  = require('../server/routes/authRoutes')

connectDB()

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