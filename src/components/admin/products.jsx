import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {deleteProduct, getProducts} from './../../services/products.js'
import './../../styles/admin.css'
import ProductCard from "../productCard.jsx";

export default function AdminProducts() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [modalDelete, setModalDelete] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const data = await getProducts()
                setItems(Array.isArray(data) ? data : [])
            } catch (e) {
                setError(e.message || 'Error al cargar productos')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

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
        <section className="admin-container">
            <h1>Gestión de Productos</h1>

            <div style={{textAlign: 'right', marginBottom: '10px'}}>
                <button onClick={() => navigate('/admin/products/new')} className="btn-primary">
                    ➕ Agregar producto
                </button>
            </div>

            {items.length === 0 ? (
                <p>No hay productos cargados.</p>
            ) : (
                <div className="products-grid">
                    {items.map(p => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            isAdmin={true}
                            onEdit={handleEdit}
                            onDelete={setModalDelete}
                        />
                    ))}
                </div>
            )}

            {modalDelete && (
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
