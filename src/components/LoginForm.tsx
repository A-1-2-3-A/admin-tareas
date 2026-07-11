import { useState } from "react";
import './Auth.css';

type LoginProps = {
    onLogin: (token: string) => void;
    onViewRegister: () => void;
};

function LoginForm({ onLogin, onViewRegister }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            onLogin(data.token);
        } else {
            alert(data.message || "Error al iniciar sesión");
        }
    };

    return (
        <form onSubmit={handleLogin} className="auth-form">
            <h2>Iniciar Sesión</h2>
            <input type="email" placeholder="Correo" onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Entrar</button>
            <p onClick={onViewRegister} className="toggle-link">¿No tienes cuenta? Regístrate aquí</p>
        </form>
    );
}

export default LoginForm