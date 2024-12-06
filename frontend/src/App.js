import React from 'react';
import Sidenav from './pages/Sidenav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute';
import ImportFicEmployer from './pages/ImportDataEmployer';
import ImportFicEmbauche from './pages/ImportDataEmbauche';
import ImportFicDebauche from './pages/ImportDataDebauche';


function App() {
  return (
    <>
    <BrowserRouter>
      <div className="App">
      <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/ImportEmployer' element={<ImportFicEmployer/>}/>
       <Route path='/ImportEmbauche' element={<ImportFicEmbauche/>}/>
       <Route path='/ImportDebauche' element={<ImportFicDebauche/>}/>
       <Route path='/home' 
        element={
          <ProtectedRoute>
            <Sidenav/>
          </ProtectedRoute>
        }
        />
      </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App