import React, { useEffect,useState } from 'react'
import axios from 'axios'

const Employer = () => {
    const [employer, setEmployer] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/debauches/')
        .then(response => setEmployer(response.data))
        .catch(error => console.error("Erreur lors de la recuperation des données", error))
    }, []);

    return (
        <div>
            <h2>Liste des Debauches</h2>
            <table>
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Trigramme</th>
                        <th>Sexe</th>
                        <th>Date d'embauche</th>
                        <th>Contrat</th>
                        <th>Date de naissance</th>
                        <th>Age</th>
                        <th>Direction</th>
                        <th>Classification</th>
                        <th>Metier</th>
                        <th>Villes</th>
                        <th>Entités</th>
                        <th>Date de debauche</th>
                        <th>Motifs</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employer.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th>{item.matricule}</th>
                                    <td>{item.trigramme}</td>
                                    <td>{item.sexe}</td>
                                    <td>{item.embauche}</td>
                                    <td>{item.contrat}</td>
                                    <td>{item.naissance}</td>
                                    <td>{item.age}</td>
                                    <td>{item.direction}</td>
                                    <td>{item.classification}</td>
                                    <td>{item.metier}</td>
                                    <td>{item.ville}</td>
                                    <td>{item.entite}</td>
                                    <td>{item.date_debauche}</td>
                                    <td>{item.motif}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Employer;
