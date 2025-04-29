import React from 'react';

import CrearRequisicionForm from './components/CrearRequisicionForm';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Partes from './components/Partes/Partes';
import ChainsawList from './components/Chainsaws/ChainsawList';

function App() {
  return (
    /*{ <div className="App">
      <div>
        <h1>Laboratorio - Requisiciones</h1>
        <CrearRequisicionForm />
      </div>
    </div> }*/

    <div className="App">
      {/* Barra de navegación */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/requisiciones">Requisiciones</Link></li>
          <li><Link to="/catalogo-partes">Catálogo de Partes</Link></li>
          <li><Link to="/planes-partes">Planes para las Partes</Link></li>
          <li><Link to="/ChainsawAll">Lista Motosierras</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h3>Laboratorio - Requisiciones</h3>
        <Routes>
          <Route path="/requisiciones" element={<CrearRequisicionForm />} />
          <Route path="/catalogo-partes" element={<Partes />} />
          <Route path="/planes-partes" element={<CrearRequisicionForm />} />
          <Route path="/ChainsawAll" element={<ChainsawList />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;