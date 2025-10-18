import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context.jsx'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleLoginUser = () => { login('Usuario Demo', 'user'); navigate(from, { replace: true }) }
    const handleLoginAdmin = () => { login('Admin Demo', 'admin'); navigate(from, { replace: true }) }

    return (
        <section>
            <h1>Login</h1>
            <p>Entraste aquí porque la ruta que querías requiere sesión.</p>
            <div style={{ display:'flex', gap:8 }}>
                <button className="btn" onClick={handleLoginUser}>Entrar como Usuario</button>
                <button className="btn" onClick={handleLoginAdmin}>Entrar como Admin</button>
            </div>
        </section>
    )
}
