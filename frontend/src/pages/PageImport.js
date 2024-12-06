import React from 'react';
import { Box, Card, CardContent, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function PageImport() {
    const navigate = useNavigate();

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
                                onClick={() => navigate('/ImportEmployer')}
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
                                onClick={() => navigate('/ImportEmbauche')}
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
                                onClick={() => navigate('/ImportDebauche')}
                            >
                                Importer
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default PageImport;

