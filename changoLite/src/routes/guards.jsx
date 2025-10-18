import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {useAuth} from '../context/auth-context.jsx'

export function RequireAuth({children}) {
    const {user} = useAuth()
    const location = useLocation()
    if (!user) {
        return <Navigate to="/login" replace state={{from: location}}/>
    }
    return children
}

export function RequireGuest({children}) {
    const {user} = useAuth()
    if (user) return <Navigate to="/" replace/>
    return children
}

export function RequireRole({role, children}) {
    const {user} = useAuth()
    if (!user) return <Navigate to="/login" replace/>
    if (user.role !== role) return <Navigate to="/forbidden" replace/>
    return children
}
