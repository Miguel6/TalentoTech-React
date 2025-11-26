import React, {useEffect, useState} from 'react'
import './../../styles/admin.css'

export default function AdminUsers() {
    const [users, setUsers] = useState([])
    const [showPasswords, setShowPasswords] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('users')
        if (stored) {
            setUsers(JSON.parse(stored))
        } else {
            setUsers([])
        }
    }, [])

    return (
        <section className="admin-container">
            <h1>Administración de Usuarios</h1>
            <p>Visualizá los usuarios registrados y sus roles actuales.</p>

            <div className="show-password-container">
                <button
                    className="btn-primary btn"
                    onClick={() => setShowPasswords(!showPasswords)}
                >
                    {showPasswords ? 'Ocultar contraseñas' : 'Mostrar contraseñas'}
                </button>
            </div>

            {users.length === 0 ? (
                <p>No hay usuarios registrados.</p>
            ) : (
                <div className="users-grid">
                    {users.map((u, i) => (
                        <div key={i} className="user-card">
                            <div className="user-avatar">
                                <span>{u.username.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="user-info">
                                <h3>{u.username}</h3>
                                <p>
                                    <b>Contraseña:</b>{' '}
                                    {showPasswords ? (
                                        <span className="password-text">{u.password}</span>
                                    ) : (
                                        <span className="password-hidden">••••••••</span>
                                    )}
                                </p>
                                <p>
                                    <b>Rol:</b>{' '}
                                    <span className={`role-tag ${u.role === 'admin'? 'role-admin': 'role-user'}`}>
                                        {u.role}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
