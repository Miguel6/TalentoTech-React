import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard.jsx'
import { getProducts } from "../services/products.js"
import './../styles/product.css'

export default function Product() {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getProducts()
                const validData = Array.isArray(data) ? data : []
                setItems(validData)
                setFilteredItems(validData)
            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message || 'Error al cargar productos')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    useEffect(() => {
        const lowerSearch = search.toLowerCase()
        const filtered = items.filter(p =>
            p.name.toLowerCase().includes(lowerSearch) ||
            p.category.toLowerCase().includes(lowerSearch) ||
            p.brand.toLowerCase().includes(lowerSearch)
        )
        setFilteredItems(filtered)
    }, [search, items])

    if (loading) return <p>Cargando productos…</p>
    if (error) return <p style={{ color: 'crimson' }}>Ups: {error}</p>

    return (
        <section className="products-container">
            <h1>Productos</h1>

            {/* 🔍 Barra de búsqueda */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar productos por nombre, categoría o marca..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredItems.length === 0 ? (
                <p>No hay productos para mostrar.</p>
            ) : (
                <div className="products-grid">
                    {filteredItems.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            )}
        </section>
    )
}
