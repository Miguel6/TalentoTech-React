import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '../routes/paths'
import {APP} from './../models/constants.js';

export default function NavBar(){
    const [open, setOpen] = useState(false)

    return (
        <header className="navbar">
            <Link className="brand" to={ROUTES.home} onClick={() => setOpen(false)}>
                <i className="fa-solid fa-shop"></i> <span className="brand-title">{APP.NAME}</span>
            </Link>

            <button className="burger" onClick={() => setOpen(v => !v)}>☰</button>

            <nav className={`nav-links ${open ? 'open' : ''}`}>
                <NavLink to={ROUTES.home} onClick={() => setOpen(false)}>Inicio</NavLink>
                <NavLink to={ROUTES.offers} onClick={() => setOpen(false)}>Ofertas</NavLink>
                <NavLink to={ROUTES.products} onClick={() => setOpen(false)}>Productos</NavLink>
                <NavLink to={ROUTES.contactUs} onClick={() => setOpen(false)}>Contacto</NavLink>
                <button className="btn cart-btn" title="Carrito">
                    <i className="fa-solid fa-cart-shopping"></i>
                </button>
            </nav>
        </header>
    )
}
