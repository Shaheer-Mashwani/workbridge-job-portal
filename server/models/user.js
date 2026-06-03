const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,      // no two users with same email
      lowercase: true,   // always store as lowercase
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['seeker', 'employer'],
      default: 'seeker',
    },
  },
  { timestamps: true }
)

// 🟢 THE FIX: Removed 'next' completely from the function signature
userSchema.pre('save', async function () {
  // Only hash if password was changed. Just write a clean return statement!
  if (!this.isModified('password')) {
    return;
  }
  
  // Hash password safely
  this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model('User', userSchema)