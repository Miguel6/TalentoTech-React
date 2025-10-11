import React from 'react'
import './../styles/home.css'
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../routes/paths.js";
import {APP} from './../models/constants.js';

export default function Home() {
    const navigate = useNavigate();

    return (
        <section className="section-home">
            <h1>Bienvenido a {APP.NAME}</h1>
            <p>Tu tienda online sencilla, rápida y sin vueltas.</p>

            <div className="main-content">
                <h2>Descubrí nuestras ofertas</h2>
                <button className="btn" onClick={() => navigate(ROUTES.offers)}>Ver ofertas</button>

            </div>
        </section>
    )
}
