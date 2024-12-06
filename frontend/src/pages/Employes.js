import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  TablePagination,
} from '@mui/material';
import { frFR } from '@mui/material/locale'; // Pour traduire en français
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Thème personnalisé

const Employer = () => {
  const [employer, setEmployer] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0); // Page actuelle
  const [rowsPerPage, setRowsPerPage] = useState(5); // Nombre de lignes par page

  // Récupérer les données du backend
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/employers/')
      .then((response) => {
        setEmployer(response.data);
        setFilteredData(response.data); // Initialiser les données filtrées avec toutes les données
      })
      .catch((error) =>
        console.error('Erreur lors de la récupération des données', error)
      );
  }, []);

  // Fonction pour gérer la recherche en temps réel (toutes les colonnes)
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = employer.filter((item) =>
      Object.values(item).some(
        (val) => val && val.toString().toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
    setPage(0); // Réinitialiser à la première page après un filtrage
  };

  // Gérer le changement de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Gérer le changement du nombre de lignes par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Réinitialiser à la première page
  };

  // Déterminer les données à afficher sur la page actuelle
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Créer un thème personnalisé pour la pagination en français
  const theme = createTheme(frFR);

  return (
    <Box>
      <div style={{ padding: '20px' }}>
    <ThemeProvider theme={theme}>
      
          <Paper elevation={3} sx={{ marginBottom: 5, padding: 2 }}>
            <h1 style={{ color: 'orange' }}>Liste des employés</h1>

            {/* Champs de recherche */}
            <Box display="flex" gap={2} marginBottom={2}>
              <TextField
                label="Recherche multicritères"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
                sx={{
                  input: { color: 'orange' },
                  label: { color: 'orange' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'orange' },
                    '&:hover fieldset': { borderColor: 'orange' },
                    '&.Mui-focused fieldset': { borderColor: 'orange' },
                  },
                }}
              />
            </Box>

            {/* Tableau */}
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 800, overflowY: 'auto', overflowX: 'auto' }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Matricule</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Trigramme</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Sexe</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      Date d'embauche
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Contrat</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      Date de naissance
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Direction</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      Classification
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Métier</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Villes</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Entités</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((item, index) => (
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Lignes par page :"
            />
          </Paper>
        
      
    </ThemeProvider>
    </div>
    </Box>
  );
};

export default Employer;
