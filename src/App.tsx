import React from 'react';

import CrearRequisicionForm from './components/CrearRequisicionForm';
import DepartureList from './components/departure/departureList';
import ChainsawList from './components/Chainsaws/ChainsawList';
import {PlanPage} from './pages/plan/PlanPage';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Partes from './components/Partes/Partes';
import Orden from './components/OrdSalidad/Orden';

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
          <li><Link to="Orden-salida">Ordenas de Salida</Link></li>
          <li><Link to="/planes">Planes</Link></li>
          <li><Link to="/ChainsawAll">Lista Motosierras</Link></li>
          <li><Link to="/orders">Ordenes de reparto</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Laboratorio - Requisiciones</h1>
        <Routes>
          <Route path="/requisiciones" element={<CrearRequisicionForm />} />
          <Route path="/catalogo-partes" element={<Partes />} />
          <Route path="/Orden-salida" element={<Orden/>} />
         

          <Route path="/planes" element={<PlanPage />} />
          <Route path="/ChainsawAll" element={<ChainsawList />} />
          <Route path="/orders" element={<DepartureList/>} />
        </Routes>
      </div>
    </div>

  );
}

export default App;

