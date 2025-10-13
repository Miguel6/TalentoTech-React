import React, { useEffect, useRef } from 'react'
import { useCart } from '../context/cart-context.jsx'
import '../styles/cart-popover.css'

const currency = n => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)

export default function CartPopover({ open, onClose }) {
    const ref = useRef(null)
    const { items, total, updateQty, removeItem, clear } = useCart()

    useEffect(() => {
        if (!open) return
        const onDocClick = (e) => {
            if (!ref.current) return
            if (!ref.current.contains(e.target)) onClose?.()
        }
        const onEsc = (e) => e.key === 'Escape' && onClose?.()
        document.addEventListener('mousedown', onDocClick)
        document.addEventListener('keydown', onEsc)
        return () => {
            document.removeEventListener('mousedown', onDocClick)
            document.removeEventListener('keydown', onEsc)
        }
    }, [open, onClose])

    if (!open) return null

    return (
        <div className="cart-popover" ref={ref} role="dialog" aria-label="Carrito" aria-modal="false">
            <div className="arrow" aria-hidden />
            <header className="cart-popover-header">
                <h3>Tu carrito</h3>
                {items.length > 0 && (
                    <button className="link" onClick={clear}>Limpiar</button>
                )}
            </header>

            {items.length === 0 ? (
                <div className="cart-popover__empty">
                    <p>Tu carrito está vacío</p>
                </div>
            ) : (
                <>
                    <div className="cart-popover__list">
                        {items.map(it => (
                            <div key={it.id} className="cart-item">
                                <img src={it.urlImage} alt={it.name} />
                                <div>
                                    <div className="cart-item__info">
                                        <strong className="name">{it.name}</strong>
                                        <div className="qty-line">
                                            <div className="qty">
                                                <button
                                                    onClick={() => updateQty(it.id, it.qty - 1, it.stock)}
                                                    disabled={it.qty <= 1}
                                                    aria-label="Disminuir cantidad"
                                                >−</button>
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={it.stock}
                                                    value={it.qty}
                                                    onChange={(e) => updateQty(it.id, Number(e.target.value), it.stock)}
                                                    onWheel={(e) => e.target.blur()}
                                                />
                                                <button
                                                    onClick={() => updateQty(it.id, it.qty + 1, it.stock)}
                                                    disabled={it.qty >= it.stock}
                                                    aria-label="Aumentar cantidad"
                                                >+</button>
                                            </div>
                                            <button className="link-danger" onClick={() => removeItem(it.id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cart-item__prices">
                                        <div className="unit">P.U.:{currency(it.price)}</div>
                                        <div className="line">{currency(it.price * it.qty)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <footer className="cart-popover-footer">
                        <div className="actions">
                            <a className="btn" onClick={onClose}>Pagar</a>
                        </div>

                        <div className="total-row">
                            <span>Total</span>
                            <strong>{currency(total)}</strong>
                        </div>
                    </footer>
                </>
            )}
        </div>
    )
}
