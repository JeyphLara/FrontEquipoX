import React from 'react';
import { ToastContainer } from 'react-toastify';

import CrearRequisicionForm from './components/CrearRequisicionForm';
import DepartureList from './components/departure/departureList';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Partes from './components/Partes/Partes';
import ChainsawList from './components/Chainsaws/ChainsawList';

//pages
import { PlanPage } from './pages/plan/PlanPage';

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
          <li><Link to="/planes">Planes</Link></li>
          <li><Link to="/ChainsawAll">Lista Motosierras</Link></li>
          <li><Link to="/orders">Ordenes de reparto</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h3>Laboratorio - Requisiciones</h3>
        <Routes>
          <Route path="/requisiciones" element={<CrearRequisicionForm />} />
          <Route path="/catalogo-partes" element={<Partes />} />
          <Route path="/planes" element={<PlanPage />} />
          <Route path="/ChainsawAll" element={<ChainsawList />} />
          <Route path="/orders" element={<DepartureList/>} />
        </Routes>
      </div>
      <ToastContainer />
    </div>

  );
}

export default App;