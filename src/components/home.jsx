import React from 'react'
import './../styles/home.css'
import './../styles/buttons.css'
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../routes/paths.js";
import {APP} from './../models/constants.js';
import {Helmet} from "react-helmet";

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Aura Animal 🐾 | Tienda de Mascotas</title>
                <meta name="description" content="Aura Animal: tu pet shop favorito con productos de calidad para tus mascotas." />
                <meta name="keywords" content="petshop, perros, gatos, mascotas, alimentos, juguetes, cuidado animal" />
                <meta name="author" content="Aura Animal" />
                <meta property="og:title" content="Aura Animal - Pet Shop Online" />
                <meta property="og:description" content="Productos para perros, gatos y más. Compra online y recibí en casa." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://aura-animal.vercel.app" />
                <meta property="og:image" content="https://aura-animal.vercel.app/logo.png" />
            </Helmet>
            <section className="section-home">

                <h1>Bienvenido a {APP.NAME}</h1>
                <p>Tu tienda online sencilla, rápida y sin vueltas.</p>

                <div className="main-content">
                    <h2>Descubrí nuestras ofertas</h2>
                    <button className="btn" onClick={() => navigate(ROUTES.offers)}>Ver ofertas</button>

                </div>
            </section>
        </>

    )
}
