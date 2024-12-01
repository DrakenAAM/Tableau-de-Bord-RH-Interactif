import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [totals, setTotals] = useState({
    total_employes: 0,
    total_embauches: 0,
    total_debauches: 0,
  });

  const [sexeData, setSexeData] = useState({
    homme: 50, // Valeurs par défaut pour test
    femme: 50,
  });

  const pieData = {
    labels: ['Hommes', 'Femmes'],
    datasets: [
      {
        data: [sexeData.homme, sexeData.femme],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  useEffect(() => {
    // Appel de l'API pour récupérer les totaux
    fetch('http://127.0.0.1:8000/api/effectifs/')
      .then((response) => response.json())
      .then((data) => setTotals(data))
      .catch((error) => console.error('Erreur lors de la récupération des totaux:', error));

    // Appel de l'API pour la répartition des sexes
    fetch('http://127.0.0.1:8000/api/repartition/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Données de répartition:', data);
        setSexeData(data);
      })
      .catch((error) => console.error('Erreur lors de la récupération des données:', error));
  }, []);

  return (
    <>
      <Box>
        <div style={{ padding: '20px' }}>
          <h1 style={{ color: 'orange', textAlign: 'center' }}>Dashboard</h1>
          
          {/* Cards des totaux */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <Paper
              elevation={3}
              style={{
                backgroundColor: '#FFCCCB',
                color: '#333',
                textAlign: 'center',
                padding: '20px',
                flex: '1',
                margin: '10px',
              }}
            >
              <h2>Employés</h2>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totals.total_employes}</p>
            </Paper>
            <Paper
              elevation={3}
              style={{
                backgroundColor: '#D4EDDA',
                color: '#333',
                textAlign: 'center',
                padding: '20px',
                flex: '1',
                margin: '10px',
              }}
            >
              <h2>Embauches</h2>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totals.total_embauches}</p>
            </Paper>
            <Paper
              elevation={3}
              style={{
                backgroundColor: '#FFF3CD',
                color: '#333',
                textAlign: 'center',
                padding: '20px',
                flex: '1',
                margin: '10px',
              }}
            >
              <h2>Débauches</h2>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totals.total_debauches}</p>
            </Paper>
          </div>

          {/* Card pour le graphique */}
          <Paper
            elevation={3}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              marginTop: '20px',
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: 'orange' }}>Répartition entre Hommes et Femmes</h2>
            <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
              <Pie data={pieData} />
            </div>
          </Paper>
        </div>
      </Box>
    </>
  );
}

export default Dashboard;
