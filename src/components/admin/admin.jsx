import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { ROUTES } from "../../routes/paths.js"
import { FaBoxOpen, FaUserShield, FaChartBar } from "react-icons/fa"

export default function Admin() {
    return (
        <section className="admin">
            <h1>Panel de Administración</h1>

            <nav className="admin-nav">
                <NavLink
                    to={ROUTES.adminProducts}
                    className={({ isActive }) => `admin-card ${isActive ? 'active' : ''}`}>
                    <FaBoxOpen size={28} style={{ marginBottom: '8px' }} />
                    Productos
                </NavLink>

                <NavLink
                    to="users"
                    className={({ isActive }) => `admin-card ${isActive ? 'active' : ''}`}>
                    <FaUserShield size={28} style={{ marginBottom: '8px' }} />
                    Usuarios
                </NavLink>

                <NavLink
                    to="reports"
                    className={({ isActive }) => `admin-card ${isActive ? 'active' : ''}`}>
                    <FaChartBar size={28} style={{ marginBottom: '8px' }} />
                    Reportes
                </NavLink>
            </nav>
        </section>
    )
}
