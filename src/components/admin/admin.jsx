import React from 'react'
import {NavLink} from 'react-router-dom'
import {ROUTES} from "../../routes/paths.js"
import {FaBoxOpen, FaChartBar, FaUserShield} from "react-icons/fa"

export default function Admin() {
    return (
        <section className="admin">
            <h1>Panel de Administración</h1>

            <nav className="admin-nav">
                <NavLink
                    to={ROUTES.adminProducts}
                    className={({isActive}) => `admin-card ${isActive ? 'active' : ''}`}>
                    <FaBoxOpen/>
                    Productos
                </NavLink>

                <NavLink
                    to={ROUTES.adminUsers}
                    className={({isActive}) => `admin-card ${isActive ? 'active' : ''}`}>
                    <FaUserShield/>
                    Usuarios
                </NavLink>

                <NavLink
                    to={ROUTES.adminReports}
                    className={({isActive}) => `admin-card ${isActive ? 'active' : ''}`}>
                    <FaChartBar/>
                    Reportes
                </NavLink>
            </nav>
        </section>
    )
}
