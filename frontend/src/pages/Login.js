import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, IconButton, Grid, Alert } from '@mui/material';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../icons/orange.png'; // Ajustez le chemin si nécessaire

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Réinitialiser les erreurs
    setUsernameError('');
    setPasswordError('');
    setError('');

    // Validation des champs vides
    if (!username) {
      setUsernameError('Le nom d\'utilisateur est requis.');
    }
    if (!password) {
      setPasswordError('Le mot de passe est requis.');
    }
    if (!username || !password) return; // Empêche la suite si un champ est vide

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Nom d\'utilisateur ou mot de passe incorrect.');
      } else {
        setError(err.response?.data?.message || 'Erreur lors de la connexion.');
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
    setError('');
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        marginTop: '10px',
        padding: '50px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose}>
          Connexion réussie
        </Alert>
      </Snackbar>

      {error && (
        <Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose}>
            {error}
          </Alert>
        </Snackbar>
      )}

      <Grid container direction="column" alignItems="center">
        <img src={logo} alt="Logo" style={{ width: '100px' }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Connexion
        </Typography>
        <TextField
          label="Nom d'utilisateur"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!usernameError || !!error}
          helperText={usernameError || (error && 'Nom d\'utilisateur ou mot de passe incorrect.')}
          InputProps={{
            startAdornment: <AccountCircle position="start" />,
          }}
        />
        <TextField
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError || !!error}
          helperText={passwordError || (error && 'Nom d\'utilisateur ou mot de passe incorrect.')}
          InputProps={{
            startAdornment: <Lock position="start" />,
            endAdornment: (
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <Button
          variant="contained"
          style={{
            backgroundColor: 'rgb(255,121,0)',
            color: '#000',
            marginTop: '20px',
            borderRadius: '10px',
          }}
          fullWidth
          onClick={handleLogin}
        >
          Se connecter
        </Button>
        <Typography variant="body2" style={{ marginTop: '20px' }}>
          Vous n'avez pas encore de compte ?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#0F09C8' }}>
            Créez-en un ici
          </Link>
        </Typography>
      </Grid>
    </Container>
  );
};

export default Login;


