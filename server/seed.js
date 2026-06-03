require('dotenv').config()
const mongoose  = require('mongoose')
const Job       = require('./models/Job')
const connectDB = require('./config/db')

const jobs = [
  {
    title: 'Senior React Developer',
    company: 'Google',
    location: 'Remote',
    type: 'Full-time',
    level: 'Senior',
    salary: '$140K – $180K',
    description: 'Build high performance React applications used by millions.',
    requirements: ['5+ years React', 'TypeScript', 'GraphQL'],
    tags: ['Remote', 'React', 'Full Stack'],
    isNew: true,
  },
  {
    title: 'Frontend Engineer',
    company: 'Airbnb',
    location: 'San Francisco',
    type: 'Full-time',
    level: 'Mid',
    salary: '$110K – $140K',
    description: 'Join the design systems team and build beautiful UIs.',
    requirements: ['3+ years React', 'CSS', 'Figma'],
    tags: ['React', 'Full Stack'],
    isNew: false,
  },
  {
    title: 'Full Stack Developer',
    company: 'Meta',
    location: 'Menlo Park',
    type: 'Full-time',
    level: 'Senior',
    salary: '$160K – $200K',
    description: 'Work on core infrastructure powering billions of users.',
    requirements: ['React', 'Node.js', 'MongoDB', 'Docker'],
    tags: ['Full Stack', 'Node.js'],
    isNew: false,
  },
  {
    title: 'Backend Node.js Engineer',
    company: 'Stripe',
    location: 'Remote',
    type: 'Contract',
    level: 'Mid',
    salary: '$90K – $120K',
    description: 'Build reliable payment APIs used by millions of businesses.',
    requirements: ['Node.js', 'PostgreSQL', 'REST APIs'],
    tags: ['Remote', 'Node.js', 'Backend'],
    isNew: true,
  },
  {
    title: 'UI/UX Designer',
    company: 'Netflix',
    location: 'Los Gatos',
    type: 'Full-time',
    level: 'Senior',
    salary: '$130K – $165K',
    description: 'Design the future of entertainment for 200M+ subscribers.',
    requirements: ['Figma', 'Prototyping', 'User Research'],
    tags: ['Design'],
    isNew: false,
  },
  {
    title: 'DevOps Engineer',
    company: 'Tesla',
    location: 'Remote',
    type: 'Full-time',
    level: 'Entry',
    salary: '$95K – $125K',
    description: 'Maintain CI/CD pipelines and cloud infrastructure.',
    requirements: ['Docker', 'AWS', 'Linux'],
    tags: ['Remote', 'Backend'],
    isNew: true,
  },
]

const seedDB = async () => {
  await connectDB()
  await Job.deleteMany()
  await Job.insertMany(jobs)
  console.log('✅ Database seeded with jobs!')
  process.exit()
}

seedDB()