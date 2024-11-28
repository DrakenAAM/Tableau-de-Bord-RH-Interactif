import React, { useState } from 'react';
import axios from 'axios';

const ImportFichier = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {   
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(file);
        formData.append('file', file);
        console.log(formData);

        try{
            const response = await axios.post("http://localhost:8000/api/upload_employers/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Importation du fichier est un succées", response.data);
        } catch (error){
            console.error("Erreur d'importation du fichier", error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type='file' accept='.csv' onChange={handleFileChange}/>
            <button type="submit">Importer</button>
        </form>
    );
};

export default ImportFichier;