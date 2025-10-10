import React from 'react'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import Footer from './components/footer';
import {Route, Routes} from "react-router-dom";
import Offers from "./components/offers.jsx";

export default function App() {
    return (
        <>
            <NavBar/>
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/ofertas" element={<Offers/>}/>
                </Routes>
                <Home/>

            </main>
            <Footer/>
        </>
    )
}
