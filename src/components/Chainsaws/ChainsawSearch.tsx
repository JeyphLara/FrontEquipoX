// src/components/Chainsaws/ChainsawSearch.tsx
import React, { useState } from 'react';
import { searchChainsaws, Chainsaw } from '../../api/chainsawsApi';
import './Chainsaw.css';

const ChainsawSearch: React.FC = () => {
  const [filters, setFilters] = useState<Partial<Chainsaw>>({
    id: '',
    name: '',
    description: '',
    quantity: 0,
    type: '',
  });
  
  const [results, setResults] = useState<Chainsaw[]>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await searchChainsaws(filters);
      setResults(response.data);
    } catch (error) {
      console.error('Error al buscar motosierras:', error);
      alert('Ocurrió un error al realizar la búsqueda');
    }
  };

  return (
    <div className="chainsaw-container">
      <h2>Buscar Motosierras</h2>
      <form onSubmit={handleSubmit} className="chainsaw-form">
        <input
          name="id"
          placeholder="ID"
          value={filters.id || ''}
          onChange={handleChange}
        />
        <input
          name="name"
          placeholder="Nombre"
          value={filters.name || ''}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Descripción"
          value={filters.description || ''}
          onChange={handleChange}
        />
        <input
          name="quantity"
          type="number"
          placeholder="Cantidad"
          value={filters.quantity || ''}
          onChange={handleChange}
        />
        <input
          name="type"
          placeholder="Tipo"
          value={filters.type || ''}
          onChange={handleChange}
        />
        <button type="submit">Buscar</button>
      </form>

      {results.length > 0 && (
        <div>
          <h3>Resultados de Búsqueda</h3>
          <ul className="chainsaw-list">
            {results.map(cs => (
              <li key={cs.id} className="chainsaw-item">
                <h3>{cs.name}</h3>
                <p>{cs.description}</p>
                <p>Cantidad: {cs.quantity}</p>
                <p>Tipo: {cs.type}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChainsawSearch;
