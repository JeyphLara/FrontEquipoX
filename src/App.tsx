import React from 'react';

import CrearRequisicionForm from './components/CrearRequisicionForm';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Partes from './components/Partes/Partes';
import ChainsawList from './components/Chainsaws/ChainsawList';
import ChainsawForm from './components/Chainsaws/ChainsawForm';
import ChainsawEdit from './components/Chainsaws/ChainsawEdit';
import ChainsawSearch from './components/Chainsaws/ChainsawSearch';

const App: React.FC = () => {
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
          <li><Link to="/all">Lista Motosierras</Link></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Laboratorio - Requisiciones</h1>
        <Routes>
          <Route path="/requisiciones" element={<CrearRequisicionForm />} />
          <Route path="/catalogo-partes" element={<Partes />} />
          <Route path="/planes-partes" element={<CrearRequisicionForm />} />
          
          <Route path="/all" element={<ChainsawList />} />
          <Route path="/create" element={<ChainsawForm />} />
          <Route path="/edit/:id" element={<ChainsawEdit />} />
          <Route path="/search" element={<ChainsawSearch />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;

