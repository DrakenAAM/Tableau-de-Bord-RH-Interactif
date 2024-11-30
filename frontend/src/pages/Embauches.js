import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, IconButton, Box, Typography, Modal, Button, TextField,
Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';

const Employer = () => {
    const [employer, setEmployer] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/embauches/')
        .then(response => setEmployer(response.data))
        .catch(error => console.error("Erreur lors de la recuperation des données", error))
    }, []);

    return (
        <Paper elevation={3}
        sx={{marginBottom: 5}}>
            <h2>Liste des Embauches</h2>
            <TableContainer component={Paper} sx={{ maxHeight: 800, overflowY: 'auto', overflowX: 'auto' }}>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Matricule</TableCell>
                        <TableCell>Trigramme</TableCell>
                        <TableCell>Sexe</TableCell>
                        <TableCell>Date d'embauche</TableCell>
                        <TableCell>Contrat</TableCell>
                        <TableCell>Date de naissance</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Direction</TableCell>
                        <TableCell>Classification</TableCell>
                        <TableCell>Metier</TableCell>
                        <TableCell>Villes</TableCell>
                        <TableCell>Entités</TableCell>
                        <TableCell>Observation</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        employer.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{item.matricule}</TableCell>
                                    <TableCell>{item.trigramme}</TableCell>
                                    <TableCell>{item.sexe}</TableCell>
                                    <TableCell>{item.embauche}</TableCell>
                                    <TableCell>{item.contrat}</TableCell>
                                    <TableCell>{item.naissance}</TableCell>
                                    <TableCell>{item.age}</TableCell>
                                    <TableCell>{item.direction}</TableCell>
                                    <TableCell>{item.classification}</TableCell>
                                    <TableCell>{item.metier}</TableCell>
                                    <TableCell>{item.ville}</TableCell>
                                    <TableCell>{item.entite}</TableCell>
                                    <TableCell>{item.observation}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Employer;
