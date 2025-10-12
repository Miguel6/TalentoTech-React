import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {ROUTES} from '../routes/paths'
import {APP} from './../models/constants.js'
import CartPopover from './cart-popover.jsx'
import {useCart} from '../context/cart-context.jsx'

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const {count} = useCart()

    const closeAll = () => {
        setMenuOpen(false);
        setCartOpen(false)
    }

    return (
        <header className="navbar">
            <Link className="brand" to={ROUTES.home} onClick={closeAll}>
                <i className="fa-solid fa-shop"></i> <span className="brand-title">{APP.NAME}</span>
            </Link>

            <button
                className="burger"
                type="button"
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(v => !v)}
            >
                ☰
            </button>

            <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <NavLink to={ROUTES.home} onClick={closeAll}>Inicio</NavLink>
                <NavLink to={ROUTES.offers} onClick={closeAll}>Ofertas</NavLink>
                <NavLink to={ROUTES.products} onClick={closeAll}>Productos</NavLink>
                <NavLink to={ROUTES.contactUs} onClick={closeAll}>Contacto</NavLink>

                <div className="cart-popover-anchor">
                    <button
                        type="button"
                        className="btn cart-btn"
                        title="Carrito"
                        aria-haspopup="dialog"
                        aria-expanded={cartOpen}
                        onClick={() => setCartOpen(v => !v)}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                        {count > 0 && <span className="cart-badge">{count}</span>}
                    </button>

                    <CartPopover open={cartOpen} onClose={() => setCartOpen(false)}/>
                </div>
            </nav>
        </header>
    )
}
