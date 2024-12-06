import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImportHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/history/')
            .then(response => setHistory(response.data))
            .catch(error => console.error('Erreur lors de la récupération de l\'historique', error));
    }, []);

    return (
        <div>
            <h1>Historique des Importations</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nom du fichier</th>
                        <th>Importé par</th>
                        <th>Date d'importation</th>
                        <th>Succès</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={index}>
                            <td>{item.file_name}</td>
                            <td>{item.imported_by}</td>
                            <td>{item.import_date}</td>
                            <td>{item.success ? 'Oui' : 'Non'}</td>
                            <td>{item.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ImportHistory;
