import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CountUp from 'react-countup';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
ChartJS.register(ChartDataLabels);

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

  const [directionData, setDirectionData] = useState({
    labels: [],
    hommes: [],
    femmes: [],
  });

  // Données pour le graphique circulaire
  const pieData = {
    labels: ['Hommes', 'Femmes'],
    datasets: [
      {
        data: [sexeData.homme, sexeData.femme],
        backgroundColor: ['rgb(75,180,230)', 'rgb(255,180,230)'],
        hoverBackgroundColor: ['rgb(75,180,230)', 'rgb(255,180,230)'],
      },
    ],
  };

  const barDirectionData = {
    labels: directionData.labels,
    datasets: [
      {
        label: 'Hommes',
        data: directionData.hommes,
        backgroundColor: 'rgb(75,180,230)',
      },
      {
        label: 'Femmes',
        data: directionData.femmes,
        backgroundColor: 'rgb(255,180,230)',
      },
    ],
  };

  // Données pour le graphique en barres
  const barData = {
    labels: ['Entrées', 'Sorties'],
    datasets: [
      {
        label: 'Comparaison Entrées/Sorties',
        data: [totals.total_embauches, totals.total_debauches],
        backgroundColor: ['rgb(80,190,135)', 'rgb(145,100,205)'],
      },
    ],
  };
  const options = {
    responsive: true,
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
      datalabels: {
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: 'black',
        font: {
          weight: 'bold',
          size: 14,
        },
        align: 'center',
        anchor: 'center',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };
  

  useEffect(() => {

    const token = localStorage.getItem('token'); // Récupérer le token depuis localStorage

    if (!token) {
        console.error('Token non trouvé. Veuillez vous connecter.');
        return;
    }
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

    // Appel de l'API pour la répartition par direction
    fetch('http://localhost:8000/api/par_direction/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.direction);
        const hommes = data.map((item) => item.hommes);
        const femmes = data.map((item) => item.femmes);

        setDirectionData({ labels, hommes, femmes });
      })
      .catch((error) => console.error('Erreur lors de la récupération des données par direction:', error));
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
              <h2> <GroupsIcon/> Total des employés actuel</h2>
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
              
              <h2> <BadgeIcon/> Embauchés</h2>
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
              <h2>Débauchés</h2>
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
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
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
              <h2 style={{ color: 'orange' }}>Répartition Hommes/Femmes par Direction</h2>
              <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
                <Bar data={barDirectionData} options={options}/>
              </div>
            </Paper>
          </div>
        </div>
      </Box>
    </>
  );
}

export default Dashboard;
