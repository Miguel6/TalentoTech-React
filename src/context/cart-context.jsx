import React, {createContext, useContext, useEffect, useMemo, useReducer} from 'react'
import {CART_CONFIG} from './../models/constants.js';

const CartContext = createContext(null)

function loadInitial() {
    try {
        const raw = localStorage.getItem(CART_CONFIG.LOCAL_STORAGE_NAME)
        return raw ? JSON.parse(raw) : {items: []}
    } catch {
        return {items: []}
    }
}

function save(state) {
    localStorage.setItem(CART_CONFIG.LOCAL_STORAGE_NAME, JSON.stringify(state))
}

function cartReducer(state, action) {
    switch (action.type) {
        case CART_CONFIG.ADD_ITEM: {
            const {product, qty} = action.payload
            const id = String(product.id)
            const existing = state.items.find(i => i.id === id)
            const nextQty = existing ? Math.min(existing.qty + qty, product.stock) : Math.min(qty, product.stock)
            const items = existing
                ? state.items.map(i => (i.id === id ? {...i, qty: nextQty} : i))
                : [...state.items, {
                    id,
                    name: product.name,
                    price: Number(product.price || 0),
                    urlImage: product.urlImage,
                    stock: Number(product.stock || 0),
                    brand: product.brand,
                    category: product.category,
                    qty: Math.max(1, Math.min(qty, product.stock))
                }]
            const next = {...state, items}
            save(next);
            return next;
        }
        case CART_CONFIG.UPDATE_QUANTITY: {
            const {id, qty, stock} = action.payload
            const clamped = Math.max(1, Math.min(qty, stock))
            const items = state.items.map(i => i.id === String(id) ? {...i, qty: clamped} : i)
            const next = {...state, items}
            save(next);
            return next
        }
        case CART_CONFIG.REMOVE_ITEM: {
            const items = state.items.filter(i => i.id !== String(action.payload.id))
            const next = {...state, items}
            save(next);
            return next
        }
        case CART_CONFIG.CLEAR: {
            const next = {items: []}
            save(next);
            return next
        }
        default:
            return state
    }
}

export function CartProvider({children}) {
    const [state, dispatch] = useReducer(cartReducer, undefined, loadInitial)

    useEffect(() => {
        save(state)
    }, [state])

    const count = useMemo(() => state.items.reduce((a, i) => a + i.qty, 0), [state.items])
    const total = useMemo(() => state.items.reduce((a, i) => a + i.qty * i.price, 0), [state.items])

    const api = {
        items: state.items,
        count,
        total,
        addItem: (product, qty = 1) => dispatch({type: CART_CONFIG.ADD_ITEM, payload: {product, qty}}),
        updateQty: (id, qty, stock) => dispatch({type: CART_CONFIG.UPDATE_QUANTITY, payload: {id, qty, stock}}),
        removeItem: (id) => dispatch({type: CART_CONFIG.REMOVE_ITEM, payload: {id}}),
        clear: () => dispatch({type: CART_CONFIG.CLEAR})
    }

    return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
    return ctx
}
