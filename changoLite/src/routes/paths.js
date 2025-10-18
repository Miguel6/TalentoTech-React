export const ROUTES = {
    home: '/',
    offers: '/offers',
    products: '/products',
    contactUs: '/contact-us',
    productDetail: (id = ':id') => `/products/${id}`,
    login: '/login',
    checkout: '/checkout',
    admin: '/admin',
};

export const ALL_PUBLIC_ROUTES = [
    ROUTES.home,
    ROUTES.offers,
    ROUTES.products,
    ROUTES.contactUs,
];
