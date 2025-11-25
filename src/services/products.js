import {BACKEND_CONNECTION} from "../models/constants.js";

export const getProducts = async () => {
    const res = await fetch(`${BACKEND_CONNECTION.BASE_URL}/products`);

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} - ${text || 'Error al obtener productos'}`);
    }

    return res.json();
}

export const createProduct = async (product) => {
    const res = await fetch(`${BACKEND_CONNECTION.BASE_URL}/products`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product),
    })
    return await res.json()
}

export const updateProduct = async (id, product) => {
    const res = await fetch(`${BACKEND_CONNECTION.BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product),
    })
    return await res.json()
}

export const deleteProduct = async (id) => {
    await fetch(`${BACKEND_CONNECTION.BASE_URL}/products/${id}`, {method: "DELETE"})
}
