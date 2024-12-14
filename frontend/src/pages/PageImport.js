import React, { useState } from 'react';
import { Box, Card, CardContent, Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function PageImport() {
    const [openModal, setOpenModal] = useState(null);

    // Fonction pour ouvrir le modal
    const handleOpenModal = (modalType) => {
        setOpenModal(modalType);
    };

    // Fonction pour fermer le modal
    const handleCloseModal = () => {
        setOpenModal(null);
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
                                onClick={() => handleOpenModal('employes')}
                            >
                                Importer
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 2: Importer les données embauchés */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#FFF3E0', boxShadow: 3 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <UploadFileIcon sx={{ fontSize: 60, color: '#FF9800' }} />
                            <Typography
                                variant="h6"
                                sx={{ marginY: 2, color: '#FF5722', fontWeight: 'bold' }}
                            >
                                Importer les données embauchés
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#FF9800', color: 'white', '&:hover': { backgroundColor: '#E65100' } }}
                                onClick={() => handleOpenModal('embauches')}
                            >
                                Importer
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 3: Importer les données débauchés */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ backgroundColor: '#FFF3E0', boxShadow: 3 }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <UploadFileIcon sx={{ fontSize: 60, color: '#FF9800' }} />
                            <Typography
                                variant="h6"
                                sx={{ marginY: 2, color: '#FF5722', fontWeight: 'bold' }}
                            >
                                Importer les données débauchés
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#FF9800', color: 'white', '&:hover': { backgroundColor: '#E65100' } }}
                                onClick={() => handleOpenModal('debauches')}
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
                    {openModal === 'embauches' && 'Importer les données embauchés'}
                    {openModal === 'debauches' && 'Importer les données débauchés'}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Ici, vous pouvez télécharger votre fichier pour {openModal}.
                    </Typography>
                    <input type="file" accept=".csv" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} sx={{ color: '#FF5722' }}>
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#FF9800', color: 'white', '&:hover': { backgroundColor: '#E65100' } }}
                    >
                        Importer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default PageImport;
