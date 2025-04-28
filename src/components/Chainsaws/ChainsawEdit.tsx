// src/components/Chainsaws/ChainsawEdit.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chainsaw, updateChainsaw } from '../../api/chainsawsApi';
import { getAllChainsaws } from '../../api/chainsawsApi'; // Si necesitas los datos completos (opcional)
import './Chainsaw.css';

const ChainsawEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Chainsaw | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí puedes hacer una llamada para obtener la motosierra por su ID
    const fetchChainsaw = async () => {
      try {
        const response = await getAllChainsaws();
        const chainsawToEdit = response.data.find(cs => cs.id === id);
        if (chainsawToEdit) {
          setFormData(chainsawToEdit);
        } else {
          alert('Motosierra no encontrada');
          navigate('/');
        }
      } catch (error) {
        console.error('Error al obtener las motosierras:', error);
        alert('Error al obtener los datos de la motosierra');
      }
    };
    fetchChainsaw();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev!,
        [name]: name === 'quantity' ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        await updateChainsaw(id!, formData);
        alert('Motosierra actualizada correctamente');
        navigate('/');
      } catch (error) {
        console.error('Error al actualizar la motosierra:', error);
        alert('Ocurrió un error al actualizar la motosierra');
      }
    }
  };

  if (!formData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="chainsaw-container">
      <h2>Editar Motosierra</h2>
      <form onSubmit={handleSubmit} className="chainsaw-form">
        <input
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={handleChange}
          disabled
        />
        <input
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Cantidad"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Tipo"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          name="planId"
          placeholder="Plan ID"
          value={formData.planId || ''}
          onChange={handleChange}
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default ChainsawEdit;
