import React, { useState, useMemo } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import './../styles/product-detail.css'
import { useCart } from '../context/cart-context.jsx'

const currency = (n) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)

export default function ProductDetailPage() {
    const { state } = useLocation()
    const { addItem } = useCart()
    const product = state?.product
    if (!product) return <Navigate to="/products" replace />

    const { name, description, price, urlImage, category, stock, brand, rating, reviews } = product

    const [quantity, setQuantity] = useState(1)
    const increment = () => setQuantity(q => Math.min(q + 1, stock))
    const decrement = () => setQuantity(q => Math.max(1, q - 1))
    const onInput = (e) => {
        const val = Number(e.target.value)
        if (Number.isFinite(val)) setQuantity(Math.min(Math.max(1, val), stock))
    }
    const total = useMemo(() => price * quantity, [price, quantity])

    const canAdd = stock > 0 && quantity >= 1

    return (
        <section className="product-detail-card">
            <div className="product-detail-grid">
                <div className="detail-media">
                    <img src={urlImage} alt={name} />
                </div>

                <div className="detail-info">
                    <h1>{name}</h1>
                    <p className="subtitle">{brand} · {category}</p>
                    {description && <p className="desc">{description}</p>}

                    {(rating != null || reviews != null) && (
                        <p className="rating">⭐ {rating} ({reviews} reseñas)</p>
                    )}

                    <div className="price-block">
                        <div className="price-row">
                            <span>Precio unitario</span>
                            <strong>{currency(price)}</strong>
                        </div>

                        <div className="qty-row">
                            <span>Cantidad</span>
                            <div className="qty-control">
                                <button
                                    className="qty-btn"
                                    onClick={decrement}
                                    disabled={quantity <= 1}
                                    aria-label="Disminuir cantidad"
                                >−</button>

                                <input
                                    className="qty-input"
                                    type="number"
                                    min={1}
                                    max={stock}
                                    value={quantity}
                                    onChange={onInput}
                                />

                                <button
                                    className="qty-btn"
                                    onClick={increment}
                                    disabled={quantity >= stock}
                                    aria-label="Aumentar cantidad"
                                >+</button>
                            </div>
                            <small className="stock-hint">Stock disponible: {stock}</small>
                        </div>

                        <div className="price-row total">
                            <span>Total</span>
                            <strong>{currency(total)}</strong>
                        </div>
                    </div>



                    <button className="btn" disabled={!canAdd}
                            onClick={(e) => { e.stopPropagation(); addItem(product, quantity); }}
                    >
                        {canAdd ? `Agregar ${quantity} al carrito` : 'Sin stock'}
                    </button>
                </div>
            </div>
        </section>
    )
}
