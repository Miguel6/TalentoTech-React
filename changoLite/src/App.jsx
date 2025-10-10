import React from 'react'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import Footer from './components/footer';

export default function App() {
    return (
        <>
            <NavBar/>
            <main className="container">
                <Home/>
            </main>
            <Footer/>
        </>
    )
}
