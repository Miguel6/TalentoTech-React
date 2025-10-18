import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const raw = localStorage.getItem('auth_user')
        if (raw) setUser(JSON.parse(raw))
    }, [])

    const login = (name = 'Demo', role = 'user') => {
        const u = { id: 1, name, role }
        setUser(u)
        localStorage.setItem('auth_user', JSON.stringify(u))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('auth_user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
    return ctx
}
