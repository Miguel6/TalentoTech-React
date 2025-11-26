import React, { createContext, useContext, useState, useEffect } from 'react'
import { getProducts } from '../services/products.js'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true)
                const data = await getProducts()
                setProducts(Array.isArray(data) ? data : [])
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
    }, [])

    const deleteProductLocal = (id) => {
        setProducts(prev => [...prev.filter(p => p.id !== id)])
    }

    const updateProductLocal = (updated) => {
        setProducts(prev => [...prev.map(p => (String(p.id) === String(updated.id) ? updated : p))])
    }

    const addProductLocal = (newProduct) => {
        setProducts(prev => [...prev, newProduct])
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                deleteProductLocal,
                updateProductLocal,
                addProductLocal,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = () => useContext(ProductContext)
