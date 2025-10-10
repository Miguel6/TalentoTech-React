import React, {useState} from 'react'

export default function NavBar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="navbar">
            <a className="brand" href="/changoLite/public">Chango Lite</a>
            <button
                className="burger"
                aria-label="Abrir menú"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}>

            </button>

            <nav className={`nav-links ${open ? 'open' : ''}`}>
                <a href="changoLite/src/components/navBar.jsx#home">Inicio</a>
                <a href="changoLite/src/components/navBar.jsx#ofertas">Ofertas</a>
                <a href="changoLite/src/components/navBar.jsx#productos">Productos</a>
                <button className="cart-btn" title="Carrito">🛒</button>
            </nav>
        </header>
    )
}
