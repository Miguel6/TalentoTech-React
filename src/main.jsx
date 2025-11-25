import './index.css'
import App from './App.jsx'
import './styles/global.css'
import './styles/tokens.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {CartProvider} from './context/cart-context.jsx'
import {AuthProvider} from './context/auth-context.jsx'
import {ProductProvider} from "./context/product-context.jsx";
import {Bounce, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ProductProvider>
                    <CartProvider>
                        <App/>
                    </CartProvider>
                </ProductProvider>
            </AuthProvider>
            <ToastContainer
                position="bottom-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
                transition={Bounce}
            />
        </BrowserRouter>
    </React.StrictMode>
)
