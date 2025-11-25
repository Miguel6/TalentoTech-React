import React from "react";

export const ROUTES = {
    forbidden: '/forbidden',
    home: '/',
    offers: '/offers',
    products: '/products',
    contactUs: '/contact-us',
    productDetail: (id = ':id') => `/products/${id}`,
    login: '/login',
    checkout: '/checkout',
    admin: '/admin',
    adminProducts: 'products',
    adminAddProduct: 'products/new',
    adminEditProduct: (id = ':id') => `products/edit/:id`
};

export const ALL_PUBLIC_ROUTES = [
    ROUTES.home,
    ROUTES.offers,
    ROUTES.products,
    ROUTES.contactUs,
];
