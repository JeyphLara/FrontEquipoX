import React, { useState, useEffect } from 'react';
import laboratorioApi from '../api/laboratorioApi';
import Modal from './Modal';
import './CrearRequisicionForm.css';

interface Chainsaw {
  id: string;
  name: string;
  description: string;
  quantity: number;
  type: string;
}

const CrearRequisicionForm = () => {
  const [chainsawId, setChainsawId] = useState('');
  const [chainsaws, setChainsaws] = useState<Chainsaw[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');
  const [requisitionDate, setRequisitionDate] = useState(new Date().toISOString().slice(0, 10));
  const [mensaje] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchChainsaws = async () => {
      try {
        const response = await fetch('http://ec2-18-117-154-8.us-east-2.compute.amazonaws.com:60001/api/v1/chainsaws/all');
        const data: Chainsaw[] = await response.json();
        setChainsaws(data);
      } catch (error) {
        console.error('Error al obtener las motosierras:', error);
      }
    };

    fetchChainsaws();
  }, []);

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
      setModalMessage('Requisición creada correctamente');
    } catch (error) {
      console.error('Error al crear requisición:', error);
      setModalMessage('Error al crear requisición');
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Crear Requisición</h2>

      <div className="form-group">
        <label>Motosierra:</label>
        <select value={chainsawId} onChange={(e) => setChainsawId(e.target.value)} required>
          <option value="">Seleccione una motosierra</option>
          {chainsaws.map((cs) => (
            <option key={cs.id} value={cs.id}>{cs.name}</option>
          ))}
        </select>
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
      {isModalOpen && (
        <Modal message={modalMessage} onClose={() => setIsModalOpen(false)} />
      )}

    </form>
  );
};

export default CrearRequisicionForm;
