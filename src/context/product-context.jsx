import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../services/products.js";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getProducts();
                setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || "Error al cargar productos");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const deleteProductLocal = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const updateProductLocal = (updatedProduct) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
    };

    const addProductLocal = (newProduct) => {
        const fakeId = Date.now().toString();
        setProducts((prev) => [...prev, { ...newProduct, id: fakeId }]);
    };

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
    );
}
