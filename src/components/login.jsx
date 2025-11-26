import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/auth-context.jsx'
import './../styles/admin.css'
import './../styles/login.css'
import { toast, Bounce } from 'react-toastify'
import {USER_CONFIG} from "../models/constants.js";

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const { login } = useAuth()

    const [form, setForm] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState({})
    const [users, setUsers] = useState([])

    useEffect(() => {
        const stored = localStorage.getItem(USER_CONFIG.LOCAL_STORAGE_NAME)
        if (stored) {
            setUsers(JSON.parse(stored))
        } else {
            const defaultUsers = [
                { username: 'admin', password: 'admin123', role: 'admin' },
                { username: 'usuario', password: 'user123', role: 'user' },
            ]
            localStorage.setItem(USER_CONFIG.LOCAL_STORAGE_NAME, JSON.stringify(defaultUsers))
            setUsers(defaultUsers)
        }
    }, [])

    const validateForm = () => {
        const newErrors = {}
        if (!form.username.trim()) newErrors.username = 'El usuario es obligatorio.'
        if (!form.password.trim()) newErrors.password = 'La contraseña es obligatoria.'
        return newErrors
    }

    const showToast = (msg, type = 'success') => {
        const fn = type === 'success' ? toast.success : toast.error
        fn(msg, {
            position: 'bottom-center',
            autoClose: 4000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            transition: Bounce,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validations = validateForm()
        if (Object.keys(validations).length > 0) {
            setErrors(validations)
            return
        }
        setErrors({})

        const storedUsers = JSON.parse(localStorage.getItem('users')) || []
        const userFound = storedUsers.find(
            (u) =>
                u.username === form.username.trim() &&
                u.password === form.password.trim()
        )

        if (!userFound) {
            showToast('Usuario o contraseña incorrectos.', 'error')
            return
        }

        login(userFound.username, userFound.role)
        showToast('Inicio de sesión exitoso')
        navigate(from, { replace: true })
    }

    return (
        <section className="login-container">
            <h1>Iniciar Sesión</h1>
            <p>Ingresá con tus credenciales o usá los usuarios demo para probar.</p>

            <form className="edit-product-form" onSubmit={handleSubmit}>
                <div className={`form-group ${errors.username ? 'has-error' : ''}`}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                    {errors.username && <p className="input-error">{errors.username}</p>}
                </div>

                <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    {errors.password && <p className="input-error">{errors.password}</p>}
                </div>

                <button type="submit" className="btn btn-light" style={{ width: '100%' }}>
                    Iniciar sesión
                </button>
            </form>

            <div className="recovery-register-user">
                <p>
                    ¿Olvidaste tu contraseña?{' '}
                    <Link to="/forgot-password" className="link">Recuperar</Link>
                </p>
                <p>
                    ¿No tenés cuenta?{' '}
                    <Link to="/register" className="link">Registrate</Link>
                </p>
            </div>
        </section>
    )
}
