const User   = require('../models/User')
const jwt    = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// 🟢 Added 'next' parameter consistently, or you can rely purely on res.status
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already registered' })
    }
    const user = await User.create({ firstName, lastName, email, password, role })
    res.status(201).json({
      success: true,
      token: createToken(user._id),
      user: {
        id:        user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        role:      user.role,
      },
    })
  } catch (error) {
    // If you have global error middleware, use: next(error);
    // Otherwise, this standard response works perfectly:
    res.status(400).json({ success: false, message: error.message })
  }
}

// 🟢 Added 'next' here so the signatures match your routes expectations exactly
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }
    res.json({
      success: true,
      token: createToken(user._id),
      user: {
        id:        user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        role:      user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const getMe = async (req, res) => {
  res.json({ success: true, user: req.user })
}

module.exports = { register, login, getMe }