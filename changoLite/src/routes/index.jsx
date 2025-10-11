import React from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {ROUTES} from './paths'
import Home from '../components/Home.jsx'
import Offers from '../components/offers.jsx'
import Products from '../components/product.jsx'
import ContactUs from "../components/contactUs";

function NotFound() {
    return <h2>Página no encontrada</h2>
}

export default function AppRoutes() {
    return useRoutes([
        {path: ROUTES.home, element: <Home/>},
        {path: ROUTES.offers, element: <Offers/>},
        {path: ROUTES.products, element: <Products/>},
        {path: ROUTES.contactUs, element: <ContactUs/>},
        //{path: ROUTES.productsDetails(), element: <ProductsDetails/>},
        {path: '/home', element: <Navigate to={ROUTES.home} replace/>},
        {path: '*', element: <NotFound/>},
    ])
}
