import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {useProducts} from '../../context/product-context.jsx'
import './../../styles/admin.css'
import {Bounce, toast} from "react-toastify";

export default function AdminEditProduct() {
    const navigate = useNavigate()
    const {id} = useParams()
    const location = useLocation()
    const {products, deleteProductLocal, updateProductLocal, lastUpdate} = useProducts()

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
    const [error, setError] = useState('')

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true)
                if (location.state?.product) {
                    setForm(location.state.product)
                } else {
                    const prod = products.find(p => p.id === id)
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

    const showSuccess = (message) => {
        toast.success(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    const showError = (message) => {
        toast.error(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    const validateForm = () => {
        const newErrors = {}
        if (!form.name){
            newErrors.name = 'El nombre es obligatorio.'
        }
        if (form.price <= 0){
            newErrors.price = 'El precio debe ser mayor a 0.'
        }
        if (!form.description || form.description.length < 10){
            newErrors.description = 'La descripción debe tener al menos 10 caracteres.'
        }

        return newErrors
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
            updateProductLocal({...form, id})
            showSuccess('Producto actualizado exitosamente');
            setTimeout(() => navigate('/admin/products'), 1200)
        } catch {
            showError('Ocurrio un error al actualizar el producto')
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <p>Cargando producto...</p>
    if (error && !message) return <p className="error">{error}</p>

    return (
        <section className="admin-container">
            <h1>Editar Producto</h1>
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
                        {loading ? 'Guardando...' : 'Actualizar producto'}
                    </button>
                </div>
            </form>
        </section>
    )
}
