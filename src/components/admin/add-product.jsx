import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from './../../services/products.js'
import './../../styles/admin.css'

export default function AdminAddProduct() {
    const navigate = useNavigate()
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
            await createProduct(form)
            setMessage('✅ Producto agregado correctamente')
            setForm({
                name: '',
                price: '',
                description: '',
                brand: '',
                category: '',
                stock: '',
                urlImage: ''
            })
            setTimeout(() => navigate('/admin/products'), 1200)
        } catch (err) {
            setError('❌ Error al agregar el producto. Intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="admin-container">
            <h1>Agregar Nuevo Producto</h1>

            {error && <p className="error">{error}</p>}
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
                        {loading ? 'Guardando...' : 'Agregar producto'}
                    </button>
                </div>
            </form>
        </section>
    )
}
