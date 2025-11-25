import React from 'react'
import { useNavigate } from 'react-router-dom'
import './../styles/product.css'
import './../styles/product-card.css'
import { useCart } from '../context/cart-context.jsx'

export default function ProductCard({ product, isAdmin = false, onEdit, onDelete }) {
    const navigate = useNavigate()
    const { addItem } = useCart()

    const { id, name, description, price, urlImage, category, stock, brand } = product

    const handleClick = () => {
        navigate(`/products/${id}`, { state: { product } })
    }

    return (
        <div
            className="product-card"
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="media">
                <img src={urlImage} alt={name} />
            </div>

            <div className="card-body">
                <h3>{name}</h3>
                <p className="price">${price}</p>
                <small className="meta">
                    {brand} · {category}
                </small>
            </div>

            {!isAdmin && (
                <button
                    className="btn"
                    disabled={stock <= 0}
                    onClick={(e) => {
                        e.stopPropagation()
                        addItem(product, 1)
                    }}
                >
                    {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                </button>
            )}

            {isAdmin && (
                <div className="admin-actions">
                    <button
                        className="btn-edit"
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit && onEdit(product)
                        }}
                    >
                        ✏️ Editar
                    </button>

                    <button
                        className="btn-delete"
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete && onDelete(product)
                        }}
                    >
                        🗑️ Eliminar
                    </button>
                </div>
            )}
        </div>
    )
}
