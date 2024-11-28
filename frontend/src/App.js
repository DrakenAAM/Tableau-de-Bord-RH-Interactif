import React from 'react';
import Sidenav from './pages/Sidenav';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Import from './pages/ImportDataEmployer';

function App() {
  return (
    <>
    <Sidenav />
    <BrowserRouter>
      <div className="App">
      <Routes>
        <Route path="importer/" element={<Import />} />
      </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App