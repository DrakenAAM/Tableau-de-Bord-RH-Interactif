import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CountUp from 'react-countup';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const [totals, setTotals] = useState({
    total_employes: 0,
    total_embauches: 0,
    total_debauches: 0,
  });

  const [sexeData, setSexeData] = useState({
    homme: 50,
    femme: 50,
  });

  // Données pour le graphique circulaire
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

  // Données pour le graphique en barres
  const barData = {
    labels: ['Embauches', 'Débauches'],
    datasets: [
      {
        label: 'Comparaison Embauche/Débauche',
        data: [totals.total_embauches, totals.total_debauches],
        backgroundColor: ['#36A2EB', '#FF6384'],
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
      .then((data) => setSexeData(data))
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
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                <CountUp start={0} end={totals.total_employes} duration={1.5} />
              </p>
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
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                <CountUp start={0} end={totals.total_embauches} duration={1.5} />
              </p>
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
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                <CountUp start={0} end={totals.total_debauches} duration={1.5} />
              </p>
            </Paper>
          </div>

          {/* Graphiques côte à côte */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
            {/* Graphique circulaire (Répartition) */}
            <Paper
              elevation={3}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                flex: '1',
                margin: '10px',
                textAlign: 'center',
              }}
            >
              <h2 style={{ color: 'orange' }}>Répartition Hommes/Femmes</h2>
              <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
                <Pie
                  data={pieData}
                  options={{
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => {
                            const total = sexeData.homme + sexeData.femme;
                            const value = tooltipItem.raw;
                            const percentage = ((value / total) * 100).toFixed(2);
                            return `${tooltipItem.label}: ${percentage}%`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </Paper>

            {/* Graphique en barres (Comparaison) */}
            <Paper
              elevation={3}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                flex: '1',
                margin: '10px',
                textAlign: 'center',
              }}
            >
              <h2 style={{ color: 'orange' }}>Comparaison Embauche/Débauche</h2>
              <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
                <Bar data={barData} />
              </div>
            </Paper>
          </div>
        </div>
      </Box>
    </>
  );
}

export default Dashboard;
