const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // Connect using the URI from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.log('MongoDB connection error:', error.message)
    process.exit(1) // stop the server if DB fails
  }
}

module.exports = connectDB