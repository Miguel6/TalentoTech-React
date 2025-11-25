import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { getProducts, updateProduct } from './../../services/products.js'
import './../../styles/admin.css'

export default function AdminEditProduct() {
    const navigate = useNavigate()
    const { id } = useParams()
    const location = useLocation()
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        brand: '',
        category: '',
        stock: '',
        urlImage: ''
    })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true)
                if (location.state?.product) {
                    setForm(location.state.product)
                } else {
                    const all = await getProducts()
                    const prod = all.find(p => p.id === id)
                    if (prod) setForm(prod)
                    else setError('Producto no encontrado.')
                }
            } catch {
                setError('Error al cargar el producto.')
            } finally {
                setLoading(false)
            }
        }
        loadProduct()
    }, [id, location.state])

    const validateForm = () => {
        if (!form.name.trim()) return 'El nombre es obligatorio.'
        if (Number(form.price) <= 0) return 'El precio debe ser mayor a 0.'
        if (form.description.trim().length < 10) return 'La descripción debe tener al menos 10 caracteres.'
        return ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationError = validateForm()
        if (validationError) return setError(validationError)

        setError('')
        setLoading(true)
        try {
            await updateProduct(id, form)
            setMessage('✅ Producto actualizado correctamente')
            setTimeout(() => navigate('/admin/products'), 1200)
        } catch {
            setError('❌ Error al actualizar el producto. Intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <p>Cargando producto...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <section className="admin-container">
            <h1>Editar Producto</h1>

            {message && <p className="success">{message}</p>}

            <form className="admin-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />

                <input
                    type="number"
                    placeholder="Precio"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                />

                <input
                    type="text"
                    placeholder="Marca"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Categoría"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Stock disponible"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={form.urlImage}
                    onChange={(e) => setForm({ ...form, urlImage: e.target.value })}
                />

                <textarea
                    placeholder="Descripción (mínimo 10 caracteres)"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" className="cancel" onClick={() => navigate('/admin/products')}>
                        ← Volver
                    </button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Guardando...' : 'Actualizar producto'}
                    </button>
                </div>
            </form>
        </section>
    )
}
