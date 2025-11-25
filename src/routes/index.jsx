import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { ROUTES } from './paths'
import Home from '../components/Home.jsx'
import Offers from '../components/offers.jsx'
import Products from '../components/product.jsx'
import ContactUs from '../components/contactUs.jsx'
import ProductsDetail from '../components/productDetail.jsx'
import Login from '../components/login.jsx'
import Admin from '../components/admin/admin.jsx'
import Forbidden from '../components/forbidden.jsx'


import { RequireAuth, RequireGuest, RequireRole } from './guards.jsx'
import AdminProducts from "../components/admin/products";
import AdminAddProduct from "../components/admin/add-product";
import AdminEditProduct from "../components/admin/edit-product.jsx";

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
            ),
            children: [
                { path: 'products', element: <AdminProducts /> },
                { path: 'products/new', element: <AdminAddProduct /> },
                { path: 'products/edit/:id', element: <AdminEditProduct /> },
            ]
        },

        { path: '/forbidden', element: <Forbidden /> },
        { path: '/home', element: <Navigate to={ROUTES.home} replace /> },
        { path: '*', element: <NotFound /> },
    ])
}
