import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const ImportFichier = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage({ type: 'error', text: "Veuillez sélectionner un fichier à importer." });
            setOpenSnackbar(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);

        try {
            await axios.post("http://localhost:8000/api/upload_employers/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Ajouter le token
                },
            });
            setLoading(false);
            setMessage({ type: 'success', text: "Importation du fichier réussie !" });
            setOpenSnackbar(true);
        } catch (error) {
            setLoading(false);
            setMessage({ type: 'error', text: "Erreur lors de l'importation du fichier." });
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#FFF3E0',
                padding: 4,
            }}
        >
            <Typography
                variant="h4"
                sx={{ color: '#FF9800', fontWeight: 'bold', marginBottom: 3 }}
            >
                Importer un Fichier CSV
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                    maxWidth: 500,
                    padding: 3,
                    backgroundColor: '#FFFFFF',
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <InsertDriveFileIcon sx={{ fontSize: 60, color: '#FF9800' }} />
                <TextField
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    fullWidth
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        backgroundColor: '#FF9800',
                        color: 'white',
                        '&:hover': { backgroundColor: '#E65100' },
                        width: '100%',
                    }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Importer"}
                </Button>
            </Box>

            {/* Snackbar for success or error messages */}
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
};

export default ImportFichier;
