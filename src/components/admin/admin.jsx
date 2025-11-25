import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { ROUTES } from "../../routes/paths.js"

export default function Admin() {
    return (
        <section className="admin">
            <h1>Panel Admin</h1>

            <nav className="admin-nav">
                <NavLink
                    to={ROUTES.adminProducts}
                    className={({ isActive }) => `admin-card ${isActive ? 'active' : ''}`}>
                    🛒 Productos
                </NavLink>

                <NavLink
                    to="users"
                    className={({ isActive }) => `admin-card ${isActive ? 'active' : ''}`}>
                    👤 Usuarios
                </NavLink>

                <NavLink
                    to="reports"
                    className={({ isActive }) => `admin-card ${isActive ? 'active' : ''}`}>
                    📊 Reportes
                </NavLink>
            </nav>
        </section>
    )
}
