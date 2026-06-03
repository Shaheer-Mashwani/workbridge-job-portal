// Import the routing tools from react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import our pages (we'll build these one by one)
import Home       from './pages/Home'
import Jobs       from './pages/Jobs'
import JobDetail  from './pages/JobDetail'
import Login      from './pages/Login'
import Signup     from './pages/Signup'
import Dashboard  from './pages/Dashboard'
import PostJob from './pages/PostJob'

// Import the Navbar component
import Navbar from './components/Navbar'

function App() {
  return (
    // BrowserRouter enables routing for the whole app
    <BrowserRouter>

      {/* Navbar shows on every page */}
      <Navbar />

      {/* Routes decides which page to show based on the URL */}
      <Routes>
        <Route path="/"          element={<Home />}      />
        <Route path="/jobs"      element={<Jobs />}      />
        <Route path="/jobs/:id"  element={<JobDetail />} />
        <Route path="/login"     element={<Login />}     />
        <Route path="/signup"    element={<Signup />}    />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App