import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Offers() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
    }, [])

    return (
        <section>
            <Helmet>
                <title>Ofertas | Aura Animal 🐾</title>
                <meta
                    name="description"
                    content="Descubrí las mejores ofertas y promociones en productos para tus mascotas. Alimentos, juguetes y accesorios a precios imperdibles."
                />
                <meta
                    name="keywords"
                    content="ofertas mascotas, descuentos petshop, promociones perros, gatos, pet shop online"
                />
                <meta property="og:title" content="Ofertas - Aura Animal" />
                <meta
                    property="og:description"
                    content="Aprovechá las ofertas destacadas de Aura Animal en productos para mascotas."
                />
                <meta property="og:type" content="website" />
            </Helmet>

            <h1>Ofertas</h1>
            <p>Acá van a aparecer las promos destacadas.</p>
            {loading && <p>Cargando ofertas…</p>}
        </section>
    )
}
