import React from 'react';
import Sidenav from './pages/Sidenav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute';


function App() {
  return (
    <>
    <BrowserRouter>
      <div className="App">
      <Routes>
       <Route path='/register' element={<Register/>}/>
       <Route path='/' element={<Login/>}/>
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