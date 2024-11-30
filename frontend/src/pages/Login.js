import axios from 'axios';
import React, { useState } from 'react'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/login/', { username, password })
        .then((response) => {
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            setMessage('Connexion réussie');
        })
        .catch((error) => {
            setMessage("Nom d'utilisateur ou mot de passe incorrect");
        });
    }

    return (
        <div>
            <h2>Se connecter</h2>
            <form onSubmit={handleLogin}>
                <input type='text' placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Se connecter</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Login
