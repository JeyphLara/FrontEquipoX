// src/components/Chainsaws/ChainsawForm.tsx
import React, { useState } from 'react';
import { createChainsaw, Chainsaw } from '../../api/chainsawsApi';
import { useNavigate } from 'react-router-dom';
import './Chainsaw.css';

const ChainsawForm: React.FC = () => {
  const [formData, setFormData] = useState<Chainsaw>({
    id: '',
    name: '',
    description: '',
    quantity: 0,
    type: '',
    planId: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createChainsaw(formData);
      alert('Motosierra creada correctamente');
      navigate('/');
    } catch (error) {
      console.error('Error al crear motosierra:', error);
      alert('Ocurrió un error al crear la motosierra');
    }
  };

  return (
    <div className="chainsaw-container">
      <h2>Crear Nueva Motosierra</h2>
      <form onSubmit={handleSubmit} className="chainsaw-form">
        <input name="id" placeholder="ID" value={formData.id} onChange={handleChange} required />
        <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Cantidad" value={formData.quantity} onChange={handleChange} required />
        <input name="type" placeholder="Tipo" value={formData.type} onChange={handleChange} required />
        <input name="planId" placeholder="Plan ID" value={formData.planId} onChange={handleChange} />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default ChainsawForm;
