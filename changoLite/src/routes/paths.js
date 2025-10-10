export const ROUTES = {
    home: '/',
    offers: '/offers',
    products: '/products',
    productsDetails: (id = ':id') => `/products/${id}`,
    login: '/login',
    checkout: '/checkout',
};

export const ALL_PUBLIC_ROUTES = [
    ROUTES.home,
    ROUTES.offers,
    ROUTES.products,
];
