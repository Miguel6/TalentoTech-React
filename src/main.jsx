import './index.css'
import App from './App.jsx'
import './styles/global.css'
import './styles/tokens.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {CartProvider} from './context/cart-context.jsx'
import {AuthProvider} from './context/auth-context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <App/>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)
