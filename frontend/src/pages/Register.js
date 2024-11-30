import axios from 'axios';
import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register/', { username, password })
        .then((response) => {
            setMessage(response.data.message);
        })
        .catch((error) => {
            setMessage(error.response.data.message || 'Une erreur s\'est produit');
        });
    }
    return (
        <div>
            <h2>Créer un compte</h2>
            <form onSubmit={handleRegister}>
                <input type='text' placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'>S'inscrire</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register
