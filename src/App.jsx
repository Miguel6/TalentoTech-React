import React from 'react'
import NavBar from './components/NavBar.jsx'
import Footer from './components/footer';
import AppRoutes from "./routes/index.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function App() {
    return (
        <>
            <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
            />
            <NavBar />
            <main className="container">
                <AppRoutes />
            </main>
            <Footer />
        </>
    )
}
