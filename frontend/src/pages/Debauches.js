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
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Employer = () => {
  const [employer, setEmployer] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0); // Page actuelle
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        // Récupérer le token depuis le localStorage ou une autre source
        const token = localStorage.getItem('access_token'); 

        // Ajouter le token dans l'en-tête Authorization
        const response = await axios.get('http://localhost:8000/api/debauches/', {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout de l'en-tête Authorization
          },
        });

        setEmployer(response.data);
        setFilteredData(response.data); // Initialiser les données filtrées avec toutes les données
      } catch (err) {
        console.error('Erreur lors de la récupération des données', err);
        setError(
          err.response && err.response.status === 403
            ? "Accès interdit. Vous n'êtes pas autorisé à consulter ces données."
            : 'Une erreur est survenue. Veuillez réessayer plus tard.'
        );
      }
    };

    fetchEmployers();
  }, []);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const theme = createTheme(frFR);

  return (
    <Box>
      <div style={{ padding: '20px' }}>
        <ThemeProvider theme={theme}>
          <Paper elevation={3} sx={{ marginBottom: 5, padding: 2 }}>
            <h1 style={{ color: 'orange' }}>Liste des débauches</h1>

            {/* Message d'erreur si accès refusé */}
            {error && (
              <div style={{ color: 'red', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            {/* Champs de recherche */}
            <Box display="flex" gap={2} marginBottom={2} padding={'20px'}>
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
                    <TableCell sx={{ fontWeight: 'bold' }}>
                      Observation
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date de débauches</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Motif</TableCell>
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
                      <TableCell>{item.observation}</TableCell>
                      <TableCell>{item.date_debauche}</TableCell>
                      <TableCell>{item.motif}</TableCell>
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
