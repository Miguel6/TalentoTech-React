import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useProducts} from '../../context/product-context.jsx'
import './../../styles/admin.css'
import {Bounce, toast} from 'react-toastify'

export default function AdminAddProduct() {
    const navigate = useNavigate()
    const {addProductLocal} = useProducts()

    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        brand: '',
        category: '',
        stock: '',
        urlImage: ''
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const validateForm = () => {
        const newErrors = {}
        if (!form.name) newErrors.name = 'El nombre es obligatorio.'
        if (form.price <= 0) newErrors.price = 'El precio debe ser mayor a 0.'
        if (!form.description || form.description.length < 10)
            newErrors.description = 'La descripción debe tener al menos 10 caracteres.'
        return newErrors
    }

    const showToast = (message, type = 'success') => {
        const fn = type === 'error' ? toast.error : toast.success
        fn(message, {
            position: 'bottom-center',
            autoClose: 4000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            transition: Bounce,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validations = validateForm()
        if (Object.keys(validations).length > 0) {
            setErrors(validations)
            return
        }

        setErrors({})
        setLoading(true)
        try {
            const newProduct = {
                ...form,
                id: Date.now(),
            }
            addProductLocal(newProduct)
            showToast('Producto agregado correctamente')
            setTimeout(() => navigate('/admin/products'), 1500)
        } catch {
            showToast('Error al agregar el producto', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="admin-container">
            <h1>Agregar Nuevo Producto</h1>

            <form className="edit-product-form" onSubmit={handleSubmit}>
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    {errors.name && <p className="input-error">{errors.name}</p>}
                </div>

                <div className={`form-group ${errors.price ? 'has-error' : ''}`}>
                    <input
                        type="number"
                        placeholder="Precio"
                        value={form.price}
                        onChange={(e) => setForm({...form, price: e.target.value})}
                    />
                    {errors.price && <p className="input-error">{errors.price}</p>}
                </div>

                <input
                    type="text"
                    placeholder="Marca"
                    value={form.brand}
                    onChange={(e) => setForm({...form, brand: e.target.value})}
                />

                <input
                    type="text"
                    placeholder="Categoría"
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                />

                <input
                    type="number"
                    placeholder="Stock disponible"
                    value={form.stock}
                    onChange={(e) => setForm({...form, stock: e.target.value})}
                />

                <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={form.urlImage}
                    onChange={(e) => setForm({...form, urlImage: e.target.value})}
                />

                <div className={`form-group ${errors.description ? 'has-error' : ''}`}>
          <textarea
              placeholder="Descripción (mínimo 10 caracteres)"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
          />
                    {errors.description && <p className="input-error">{errors.description}</p>}
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() => navigate('/admin/products')}
                    >
                        ← Volver
                    </button>
                    <button type="submit" className="btn btn-light" disabled={loading}>
                        {loading ? 'Guardando...' : 'Agregar producto'}
                    </button>
                </div>
            </form>
        </section>
    )
}
