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
    adminProducts: '/admin/products',
    adminAddProduct: '/admin/products/new',
    adminEditProduct: (id = ':id') => `/admin/products/edit/:id`,
    adminUsers: '/admin/users',
    adminReports: '/admin/reports',
};

export const ALL_PUBLIC_ROUTES = [
    ROUTES.home,
    ROUTES.offers,
    ROUTES.products,
    ROUTES.contactUs,
];
