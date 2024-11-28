import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DataGrid} from '@mui/x-data-grid';
import { Box } from '@mui/material';


const EmployerList = () => {
    const [employers, setEmployers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredEmployers, setFilteredEmployers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/employers/')
        .then((response) => {
            setEmployers(response.data);
            setFilteredEmployers(response.data);
        })
        .catch((error) => console.error("Erreur lors de la récuperation des données", error));
    }, []);

    const columns = [
        {field: 'matricule', headerName: 'Matricule', width: 120},
        {field: 'trigramme', headerName: 'Trigramme', width: 100},
        {field: 'sexe', headerName: 'Sexe', width: 100},
        {field: 'embauche', headerName: 'Date d\'embauche', width: 150},
        {field: 'contrat', headerName: 'Contrat', width: 130},
        {field: 'naissance', headerName: 'Date de naissance', width: 150},
        {field: 'age', headerName: 'Age', width: 80},
        {field: 'direction', headerName: 'Direction', width: 130},
        {field: 'classification', headerName: 'Classification', width: 80},
        {field: 'metier', headerName: 'Métier', width: 150},
        {field: 'ville', headerName: 'Ville', width: 100},
        {field: 'entite', headerName: 'Entité', width: 80},
    ];

    const handleSearch = (event) => {
        const value = event.targer.value;
        setSearchText(value);

        const filtered = employers.filter((employer) =>
            employer.matricule.toLowerCase().includes(value.toLowerCase()) ||
            employer.trigramme.toLowerCase().includes(value.toLowerCase()) ||
            employer.direction.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredEmployers(filtered);
    };

    return(
        <container>
            <h2 style={{ textAlign: 'center'}}>Liste des employers</h2>
        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid 
            rows={filteredEmployers}
            columns={columns}
            getRowId={(row) => row.matricule}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            />
        </Box>
        </container>
    );

};

export default EmployerList;