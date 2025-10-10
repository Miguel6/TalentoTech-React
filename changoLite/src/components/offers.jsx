import React, { useEffect, useState } from 'react'

export default function Offers() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Ejemplo: más adelante acá traeremos datos de la API
    }, [])

    return (
        <section>
            <h1>Ofertas</h1>
            <p>Acá van a aparecer las promos destacadas.</p>
            {loading && <p>Cargando ofertas…</p>}
        </section>
    )
}
