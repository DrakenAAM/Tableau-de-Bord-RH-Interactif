import React, { useState } from 'react';
import { Box, Card, CardContent, Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function PageImport() {
    const [openModal, setOpenModal] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [uploadUrl, setUploadUrl] = useState('');

    // Fonction pour ouvrir le modal
    const handleOpenModal = (modalType, url) => {
        setOpenModal(modalType);
        setUploadUrl(url); // Mettre à jour l'URL de l'importation
    };

    // Fonction pour fermer le modal
    const handleCloseModal = () => {
        setOpenModal(null);
    };

    // Fonction pour gérer le changement de fichier
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Fonction pour gérer l'importation du fichier
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        // Vérification de la présence du token
        if (!token) {
            setMessage({ type: 'error', text: 'Vous devez être connecté pour importer des données.' });
            setOpenSnackbar(true);
            return;
        }

        if (!file) {
            setMessage({ type: 'error', text: "Veuillez sélectionner un fichier à importer." });
            setOpenSnackbar(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);

        try {
            await axios.post(uploadUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`,  // Ajout du token pour l'autorisation
                },
            });
            setLoading(false);
            setMessage({ type: 'success', text: "Importation du fichier réussie !" });
            setOpenSnackbar(true);
            handleCloseModal(); // Fermer le modal après l'importation réussie
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 401) {
                setMessage({ type: 'error', text: "Votre session a expiré. Veuillez vous reconnecter." });
            } else {
                setMessage({ type: 'error', text: "Erreur lors de l'importation du fichier." });
            }
            setOpenSnackbar(true);
        }
    };

    // Fonction pour fermer le snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ backgroundColor: '#FFFAF0', height: '100vh', padding: '40px' }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: '#FF9800', fontWeight: 'bold', marginBottom: '40px' }}
            >
                Veuillez choisir une option pour importer des données
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {/* Card 1: Importer les données employés */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#FFF3E0', boxShadow: 3 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <UploadFileIcon sx={{ fontSize: 60, color: '#FF9800' }} />
                            <Typography
                                variant="h6"
                                sx={{ marginY: 2, color: '#FF5722', fontWeight: 'bold' }}
                            >
                                Importer les données employés
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#FF9800', color: 'white', '&:hover': { backgroundColor: '#E65100' } }}
                                onClick={() => handleOpenModal('employes', 'http://localhost:8000/api/upload_employers/')}
                            >
                                Importer
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 2: Importer les données embauches */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#FFF3E0', boxShadow: 3 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <UploadFileIcon sx={{ fontSize: 60, color: '#FF9800' }} />
                            <Typography
                                variant="h6"
                                sx={{ marginY: 2, color: '#FF5722', fontWeight: 'bold' }}
                            >
                                Importer les données embauches
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#FF9800', color: 'white', '&:hover': { backgroundColor: '#E65100' } }}
                                onClick={() => handleOpenModal('embauches', 'http://localhost:8000/api/upload_embauches/')}
                            >
                                Importer
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3: Importer les données débauches */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#FFF3E0', boxShadow: 3 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <UploadFileIcon sx={{ fontSize: 60, color: '#FF9800' }} />
                            <Typography
                                variant="h6"
                                sx={{ marginY: 2, color: '#FF5722', fontWeight: 'bold' }}
                            >
                                Importer les données débauches
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#FF9800', color: 'white', '&:hover': { backgroundColor: '#E65100' } }}
                                onClick={() => handleOpenModal('debauches', 'http://localhost:8000/api/upload_debauches/')}
                            >
                                Importer
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Modal commun pour afficher les détails d'importation */}
            <Dialog open={Boolean(openModal)} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogTitle>
                    {openModal === 'employes' && 'Importer les données employés'}
                    {openModal === 'embauches' && 'Importer les données embauches'}
                    {openModal === 'debauches' && 'Importer les données débauches'}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Ici, vous pouvez télécharger votre fichier pour {openModal}.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            style={{ marginBottom: '20px' }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                backgroundColor: '#FF9800',
                                color: 'white',
                                '&:hover': { backgroundColor: '#E65100' },
                            }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Importer"}
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} sx={{ color: '#FF5722' }}>
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar pour afficher les messages de succès ou d'erreur */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={message.type}
                    sx={{ width: '100%' }}
                >
                    {message.text}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default PageImport;
