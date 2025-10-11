import React from 'react'
import { useNavigate } from 'react-router-dom'
import './../styles/product.css'

export default function ProductCard({ product }) {
    const navigate = useNavigate()
    const { id, name, description, price, urlImage, category, stock, brand, rating, reviews } = product

    return (
        <div
            className="product-card"
            onClick={() => navigate(`/products/${id}`)}
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
                <button
                    className="btn"
                    disabled={stock <= 0}
                    onClick={(e) => { e.stopPropagation(); /* addToCart(product) */ }}
                >
                    {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                </button>
            </div>
        </div>
    )
}
