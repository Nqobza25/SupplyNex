import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (email, password) => {
    try {
      // TODO: Implement actual authentication
      setUser({ id: '1', email, name: 'Test User' })
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      setUser(null)
      return true
    } catch (error) {
      console.error('Logout error:', error)
      return false
    }
  }

  const signup = async (email, password, name) => {
    try {
      // TODO: Implement actual signup
      setUser({ id: '1', email, name })
      return true
    } catch (error) {
      console.error('Signup error:', error)
      return false
    }
  }

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // TODO: Implement session check
        setLoading(false)
      } catch (error) {
        console.error('Auth check error:', error)
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const value = {
    user,
    loading,
    login,
    logout,
    signup,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
