import React from 'react'
import { useNavigate } from 'react-router-dom'
import './../styles/product.css'
import './../styles/product-card.css'
import { useCart } from '../context/cart-context.jsx'

export default function ProductCard({ product }) {
    const navigate = useNavigate()
    const { addItem } = useCart()
    const { id, name, description, price, urlImage, category, stock, brand, rating, reviews } = product

    return (
        <div
            className="product-card"
            onClick={() => navigate(`/products/${id}`, { state: { product } })}
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
            <button
                className="btn"
                disabled={stock <= 0}
                onClick={(e) => { e.stopPropagation(); addItem(product, 1); }}
            >
                {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
            </button>
        </div>
    )
}
