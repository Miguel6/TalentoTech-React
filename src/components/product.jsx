import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard.jsx'
import { getProducts } from "../services/products.js"
import './../styles/product.css'

export default function Product() {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(33)
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
        setCurrentPage(1)
    }, [search, items])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (loading) return <p>Cargando productos…</p>
    if (error) return <p style={{ color: 'crimson' }}>Ups: {error}</p>

    return (
        <section className="products-container">
            <h1>Productos</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar productos por nombre, categoría o marca..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {currentItems.length === 0 ? (
                <p>No hay productos para mostrar.</p>
            ) : (
                <div className="products-grid">
                    {currentItems.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            )}

            {totalPages > 1 && (
                <div className="pagination">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </section>
    )
}
