import React, { useState } from 'react';
import laboratorioApi from '../api/laboratorioApi';
import './CrearRequisicionForm.css'; 

const CrearRequisicionForm = () => {
  const [chainsawId, setChainsawId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');
  const [requisitionDate, setRequisitionDate] = useState(new Date().toISOString().slice(0, 16));
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = {
        chainsawId: chainsawId.trim(),
        quantity,
        requisitionDate: new Date(requisitionDate).toISOString(),
        observation: observation.trim(),
      };

      const res = await laboratorioApi.post('/performRequisition/create', body);
      console.log('Requisición creada:', res.data);
      setMensaje('Requisición creada correctamente');
    } catch (error) {
      console.error('Error al crear requisición:', error);
      setMensaje('Error al crear requisición');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Crear Requisición</h2>

      <div className="form-group">
        <label>ID de Motosierra:</label>
        <input
          type="text"
          value={chainsawId}
          onChange={(e) => setChainsawId(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Cantidad:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>

      <div className="form-group">
        <label>Fecha de Requisición:</label>
        <input
          type="date"
          value={requisitionDate}
          onChange={(e) => setRequisitionDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Observación:</label>
        <textarea
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
        />
      </div>

      <button className="submit-btn" type="submit">Crear</button>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
};

export default CrearRequisicionForm;
