import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Admin() {
    return (
        <section style={{ padding: '20px' }}>
            <h1>Panel Admin</h1>
            <nav style={{ marginBottom: '20px' }}>
                <Link to="/admin/products">🛒 Productos</Link>
            </nav>
            <Outlet />
        </section>
    )
}
