import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {deleteProduct, getProducts} from '../services/products.js'
import ProductCard from './productCard.jsx'
import './../styles/product.css'
import './../styles/admin.css'
import {FaPlus} from "react-icons/fa6";

export default function ProductList({showAdminControls = false}) {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(33)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [modalDelete, setModalDelete] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const data = await getProducts()
                const valid = Array.isArray(data) ? data : []
                setItems(valid)
                setFilteredItems(valid)
            } catch (e) {
                setError(e.message || 'Error al cargar productos')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    useEffect(() => {
        const lower = search.toLowerCase()
        const filtered = items.filter(p =>
            p.name.toLowerCase().includes(lower) ||
            p.category.toLowerCase().includes(lower) ||
            p.brand.toLowerCase().includes(lower)
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
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    const handleDelete = async () => {
        if (!modalDelete) return
        try {
            await deleteProduct(modalDelete.id)
            setItems(items.filter(p => p.id !== modalDelete.id))
            setModalDelete(null)
        } catch {
            alert('No se pudo eliminar el producto.')
        }
    }

    const handleEdit = (product) => {
        navigate(`/admin/products/edit/${product.id}`, {state: {product}})
    }

    if (loading) return <p>Cargando productos…</p>
    if (error) return <p style={{color: 'crimson'}}>Ups: {error}</p>

    return (
        <section className={showAdminControls ? 'admin-container' : 'products-container'}>
            <h1>{showAdminControls ? 'Gestión de Productos' : 'Productos'}</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar productos por nombre, categoría o marca..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {showAdminControls && (
                    <button onClick={() => navigate('/admin/products/new')} className="btn-primary">
                        <FaPlus/> Agregar producto
                    </button>
                )}
            </div>


            {currentItems.length === 0 ? (
                <p>No hay productos para mostrar.</p>
            ) : (
                <div className="products-grid">
                    {currentItems.map(p => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            isAdmin={showAdminControls}
                            onEdit={handleEdit}
                            onDelete={setModalDelete}
                        />
                    ))}
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

            {showAdminControls && modalDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>¿Seguro que quieres eliminar <b>{modalDelete.name}</b>?</p>
                        <div className="modal-actions">
                            <button onClick={handleDelete} className="confirm">Sí, eliminar</button>
                            <button onClick={() => setModalDelete(null)} className="cancel">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
