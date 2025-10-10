import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '../routes/paths'

export default function NavBar(){
    const [open, setOpen] = useState(false)

    return (
        <header className="navbar">
            <Link className="brand" to={ROUTES.home} onClick={() => setOpen(false)}>
                Chango Lite
            </Link>

            <button className="burger" onClick={() => setOpen(v => !v)}>☰</button>

            <nav className={`nav-links ${open ? 'open' : ''}`}>
                <NavLink to={ROUTES.home} onClick={() => setOpen(false)}>Inicio</NavLink>
                <NavLink to={ROUTES.offers} onClick={() => setOpen(false)}>Ofertas</NavLink>
                <NavLink to={ROUTES.products} onClick={() => setOpen(false)}>Productos</NavLink>
                <button className="cart-btn" title="Carrito">🛒</button>
            </nav>
        </header>
    )
}
