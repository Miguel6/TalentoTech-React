import React, {useEffect, useState} from 'react'
import ProductDetail from '../components/productDetail.jsx'
import {getProducts} from "../services/products.js";

export default function Product() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null)
                const data = await getProducts()
                setItems(Array.isArray(data) ? data : [])
            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message || 'Error al cargar productos')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return <p>Cargando productos…</p>
    if (error) return <p style={{color: 'crimson'}}>Ups: {error}</p>

    return (
        <section>
            <h1>Productos</h1>
            {items.length === 0 ? (
                <p>No hay productos para mostrar.</p>
            ) : (
                <div className="grid">
                    {items.map(p => <ProductDetail key={p.id} product={p}/>)}
                </div>
            )}
        </section>
    )
}
