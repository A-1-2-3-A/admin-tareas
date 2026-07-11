import { useState } from "react";
import './Auth.css';

type RegisterProps = {
    onRegister: () => void;
};

function RegisterForm({ onRegister }: RegisterProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        if (res.ok) {
            alert("Registro exitoso");
            onRegister();
        } else {
            alert("Error en el registro");
        }
    };

    return (
        <form onSubmit={handleRegister} className="auth-form">
            <h2>Crear Cuenta</h2>
            <input placeholder="Nombre" onChange={e => setName(e.target.value)} required />
            <input type="email" placeholder="Correo" onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Registrarse</button>
        </form>
    );
}

export default RegisterForm;