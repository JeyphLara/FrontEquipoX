import React, { useState, useEffect } from 'react';
import { Chainsaw, getAllChainsaws } from '../../api/chainsawsApi';
import ChainsawModal from './ChainsawModal';
import './Chainsaw.css';

const ChainsawList: React.FC = () => {
  const [chainsaws, setChainsaws] = useState<Chainsaw[]>([]);
  const [filteredChainsaws, setFilteredChainsaws] = useState<Chainsaw[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chainsawToEdit, setChainsawToEdit] = useState<Chainsaw | null>(null);

  useEffect(() => {
    const fetchChainsaws = async () => {
      try {
        const response = await getAllChainsaws();
        setChainsaws(response.data);
        setFilteredChainsaws(response.data);
      } catch (error) {
        console.error('Error al obtener motosierras:', error);
      }
    };
    fetchChainsaws();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredChainsaws(
        chainsaws.filter((chainsaw) =>
          chainsaw.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chainsaw.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chainsaw.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredChainsaws(chainsaws);
    }
  }, [searchTerm, chainsaws]);

  const handleEdit = (chainsaw: Chainsaw) => {
    setChainsawToEdit(chainsaw);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setChainsawToEdit(null);
    setIsModalOpen(false);
  };

  const handleSave = (chainsaw: Chainsaw) => {
    if (chainsawToEdit) {
      // Si se está editando, actualiza el elemento en ambas listas
      setChainsaws((prevChainsaws) =>
        prevChainsaws.map((item) => item.id === chainsaw.id ? { ...item, ...chainsaw } : item)
      );
      setFilteredChainsaws((prevFilteredChainsaws) =>
        prevFilteredChainsaws.map((item) => item.id === chainsaw.id ? { ...item, ...chainsaw } : item)
      );
    } else {
      // Si se está creando, agrega el nuevo elemento a ambas listas
      setChainsaws((prevChainsaws) => [...prevChainsaws, chainsaw]);
      setFilteredChainsaws((prevFilteredChainsaws) => [...prevFilteredChainsaws, chainsaw]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="chainsaw-list-container">
      <h2>Listado de Motosierras</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <button onClick={() => { setChainsawToEdit(null); setIsModalOpen(true); }}>Crear Nueva Motosierra</button>

      <table className="chainsaw-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredChainsaws.length > 0 ? (
            filteredChainsaws.map((chainsaw) => (
              <tr key={chainsaw.id}>
                <td>{chainsaw.id}</td>
                <td>{chainsaw.name}</td>
                <td>{chainsaw.description}</td>
                <td>{chainsaw.quantity}</td>
                <td>{chainsaw.type}</td>
                <td>
                  <button className='butonEdit' onClick={() => handleEdit(chainsaw)}>Editar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No se encontraron resultados</td>
            </tr>
          )}
        </tbody>
      </table>

      <ChainsawModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        chainsawToEdit={chainsawToEdit}
        onSave={handleSave} // Pasamos el callback para actualizar la lista
      />
    </div>
  );
};

export default ChainsawList;
