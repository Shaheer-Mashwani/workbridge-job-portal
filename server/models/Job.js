const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      default: 'Full-time',
    },
    level: {
      type: String,
      enum: ['Entry', 'Mid', 'Senior', 'Lead'],
      default: 'Mid',
    },
    salary: {
      type: String,
      required: [true, 'Salary is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    requirements: {
      type: [String], // array of strings
      default: [],
    },
    tags: {
      type: [String], // array like ['Remote', 'React']
      default: [],
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId, // links to a User
      ref: 'User',
    },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt
  }
)

module.exports = mongoose.model('Job', jobSchema)