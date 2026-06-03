const express    = require('express')
const cors       = require('cors')
require('dotenv').config()

// Change this:
const connectDB   = require('../config/db')
const jobRoutes   = require('../routes/jobRoutes')
const authRoutes  = require('../routes/authRoutes')
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

// --- ADD THIS BLOCK FOR LOCAL DEVELOPMENT ---
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}

// CRITICAL FOR VERCEL: Export the app instance
module.exports = app