import {BACKEND_CONNECTION} from "../models/constants.js";

export async function getProducts() {
    const res = await fetch(`${BACKEND_CONNECTION.BASE_URL}/products` );

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} - ${text || 'Error al obtener productos'}`);
    }

    return res.json();
}
