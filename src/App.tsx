import React from 'react';

import CrearRequisicionForm from './components/CrearRequisicionForm';
import DepartureList from './components/departure/departureList';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Partes from './components/Partes/Partes';

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
          <li><Link to="/orders">Ordenes de reparto</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Laboratorio - Requisiciones</h1>
        <Routes>
          <Route path="/requisiciones" element={<CrearRequisicionForm />} />
          <Route path="/catalogo-partes" element={<Partes />} />
          <Route path="/planes-partes" element={<CrearRequisicionForm />} />
          <Route path="/orders" element={<DepartureList/>} />
        </Routes>
      </div>
    </div>

  );
}

export default App;

