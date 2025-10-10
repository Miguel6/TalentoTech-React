import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function ProductDetail({product}) {
    const navigate = useNavigate()
    const {id, name, description, price, urlImage, category, stock, brand, rating, reviews} = product

    return (<article
            className="card"
            style={{cursor: 'pointer'}}
            onClick={() => navigate(`/products/${id}`)}
        >
            <img src={urlImage} alt={name}/>
            <div className="card-body">
                <h3>{name}</h3>
                <p className="desc">{description}</p>
                <p className="price">${price}</p>
                <small className="meta">
                    {brand} · {category} · ⭐ {rating} ({reviews})
                </small>
                <button
                    className="btn"
                    disabled={stock <= 0}
                    onClick={(e) => {
                        e.stopPropagation(); /* addToCart(product) */
                    }}
                >
                    {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                </button>
            </div>
        </article>)
}
