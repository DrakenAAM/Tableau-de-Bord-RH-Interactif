import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialisation de navigate

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register/', { username, password })
        .then((response) => {
            setMessage(response.data.message);

            // Vérifier si l'inscription est réussie (par exemple via un code ou un message)
            if (response.status === 201 || response.data.success) {
                // Redirection vers /home après inscription réussie
                navigate('/home');
            }
        })
        .catch((error) => {
            setMessage(error.response?.data?.message || 'Une erreur s\'est produite');
        });
    };

    return (
        <div>
            <h2>Créer un compte</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Nom d'utilisateur" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Mot de passe" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">S'inscrire</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
