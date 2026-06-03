import { createContext, useContext, useState, useEffect } from 'react'

// Create the context
const AuthContext = createContext()

// Provider wraps the whole app and shares auth state
export function AuthProvider({ children }) {
  // Safe parsing fallback for localStorage initialization
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch (error) {
      console.error("Failed to parse auth user from localStorage:", error)
      return null
    }
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null
  })

  // Synchronize authentication actions safely
  const login = (userData, tokenData) => {
    if (!userData || !tokenData) {
      console.error("Login rejected: Missing user payload or authorization token string.")
      return
    }
    
    setUser(userData)
    setToken(tokenData)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', tokenData)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // Optional but highly recommended: Listen to storage changes across browser tabs
  useEffect(() => {
    const syncLogout = (e) => {
      if (e.key === 'token' && !e.newValue) {
        logout()
      }
    }
    window.addEventListener('storage', syncLogout)
    return () => window.removeEventListener('storage', syncLogout)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ... top of your file with AuthProvider setup

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be invoked strictly inside an <AuthProvider> component tree wrapper.')
  }
  
  return context
}