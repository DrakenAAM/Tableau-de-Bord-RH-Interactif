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
  TablePagination,
} from '@mui/material';
import { frFR } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ImportHistory = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('access_token');

        const response = await axios.get('http://localhost:8000/api/history/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFilteredData(response.data);
      } catch (err) {
        setError(
          err.response
            ? err.response.data.error
            : 'Erreur lors de la récupération des données'
        );
      }
    };

    fetchHistory();
  }, []);

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
      <ThemeProvider theme={theme}>
        <Paper elevation={3} sx={{ margin: 5, padding: 2 }}>
          <h1 style={{ color: 'orange' }}>Historique des Importations</h1>

          {error && <div style={{ color: 'red' }}>{error}</div>}
          <TableContainer component={Paper} sx={{ maxHeight: 800 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nom du fichier</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Type d'importation</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Utilisateur</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date d'importation</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Succès</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.file_name}</TableCell>
                    <TableCell>{item.import_type}</TableCell>
                    <TableCell>{item.imported_by}</TableCell>
                    <TableCell>{item.import_date}</TableCell>
                    <TableCell
                      sx={{
                        color: item.success ? 'green' : 'red',
                        fontWeight: 'bold',
                        border: item.success
                          ? '1px solid green'
                          : '1px solid red',
                        textAlign: 'center',
                        padding: '8px',
                        borderRadius: '4px',
                        backgroundColor: item.success
                          ? 'rgba(0, 128, 0, 0.1)' // Vert clair pour succès
                          : 'rgba(255, 0, 0, 0.1)', // Rouge clair pour échec
                      }}
                    >
                      {item.success ? 'Oui' : 'Non'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
    </Box>
  );
};

export default ImportHistory;
