import React from 'react'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import Footer from './components/footer';
import {Route, Routes} from "react-router-dom";
import Offers from "./components/offers.jsx";
import AppRoutes from "./routes/index.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function App() {
    return (
        <>

            <NavBar />
            <main className="container">
                <AppRoutes />
            </main>
            <Footer />
        </>
    )
}
