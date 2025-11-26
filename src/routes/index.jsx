import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { ROUTES } from './paths'
import Home from '../components/home.jsx'
import Offers from '../components/offers.jsx'
import Products from '../components/product.jsx'
import ContactUs from '../components/contactUs.jsx'
import ProductsDetail from '../components/product-detail.jsx'
import Login from '../components/login.jsx'
import Admin from '../components/admin/admin.jsx'
import Forbidden from '../components/forbidden.jsx'


import { RequireAuth, RequireGuest, RequireRole } from './guards.jsx'
import AdminProducts from "../components/admin/products";
import AdminAddProduct from "../components/admin/add-product";
import AdminEditProduct from "../components/admin/edit-product.jsx";
import AdminReports from "../components/admin/admin-reports";
import AdminUsers from "../components/admin/admin-users.jsx";

function NotFound() { return <h2>Página no encontrada</h2> }

export default function AppRoutes() {
    return useRoutes([
        { path: ROUTES.home,       element: <Home /> },
        { path: ROUTES.offers,     element: <Offers /> },
        { path: ROUTES.products,   element: <Products /> },
        { path: ROUTES.contactUs,  element: <ContactUs /> },
        { path: ROUTES.productDetail(), element: <ProductsDetail /> },

        {
            path: ROUTES.login,
            element: (
                <RequireGuest>
                    <Login />
                </RequireGuest>
            )
        },

        {
            path: ROUTES.admin,
            element: (
                <RequireRole role="admin">
                    <Admin />
                </RequireRole>
            )
        },
        {
            path: ROUTES.adminProducts,
            element: (
                <RequireRole role="admin">
                    <AdminProducts />
                </RequireRole>
            )
        },
        {
            path: ROUTES.adminAddProduct,
            element: (
                <RequireRole role="admin">
                    <AdminAddProduct />
                </RequireRole>
            )
        },
        {
            path: ROUTES.adminEditProduct(),
            element: (
                <RequireRole role="admin">
                    <AdminEditProduct />
                </RequireRole>
            )
        },
        {
            path: ROUTES.adminUsers,
            element: (
                <RequireRole role="admin">
                    <AdminUsers />
                </RequireRole>
            )
        },
        {
            path: ROUTES.adminReports,
            element: (
                <RequireRole role="admin">
                    <AdminReports />
                </RequireRole>
            )
        },

        { path: ROUTES.forbidden, element: <Forbidden /> },
        { path: '/home', element: <Navigate to={ROUTES.home} replace /> },
        { path: '*', element: <NotFound /> },
    ])
}
