import React from 'react'
import './../styles/home.css'

export default function Home() {
    return (
        <section className="section-home">
            <h1>Bienvenido a Chango Lite</h1>
            <p>Tu tienda online sencilla, rápida y sin vueltas.</p>

            <div className="main-content">
                <h2>Descubrí nuestras ofertas</h2>
                <a className="btn" href="#ofertas">Ver ofertas</a>
            </div>
        </section>
    )
}
