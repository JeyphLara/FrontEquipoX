import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chainsaw, createChainsaw, updateChainsaw } from '../../api/chainsawsApi';
import './ChainsawModal.css';

interface ChainsawModalProps {
  isOpen: boolean;
  onClose: () => void;
  chainsawToEdit: Chainsaw | null;
  onSave: (chainsaw: Chainsaw) => void;
}

const ChainsawModal: React.FC<ChainsawModalProps> = ({ isOpen, onClose, chainsawToEdit, onSave }) => {
  const [formData, setFormData] = useState<Chainsaw>({
    id: chainsawToEdit ? chainsawToEdit.id : '',  // Si hay una motosierra a editar, usamos su ID, de lo contrario, dejamos vacío
    name: '',
    description: '',
    quantity: 0,
    type: '',
    planId: ''  // Esto es necesario para el campo planId
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (chainsawToEdit) {
      // Si estamos editando, mostramos los datos existentes
      setFormData(chainsawToEdit);
    } else {
      // Si estamos creando, limpiamos los campos y generamos un nuevo UUID para id y planId
      setFormData({
        id: uuidv4(),  // Generamos un nuevo UUID
        name: '',
        description: '',
        quantity: 0,
        type: '',
        planId: uuidv4(), // Generamos un nuevo UUID para planId
      });
    }
  }, [chainsawToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const { id, ...dataToSend } = formData;

    // Mostrar los datos que se enviarán a la API (útil para depuración)
    console.log('Datos enviados:', dataToSend);

    try {
      let result;
      if (chainsawToEdit) {
        // Si estamos editando, actualizamos la motosierra
        result = await updateChainsaw(id, formData);
      } else {
        // Si estamos creando, creamos una nueva motosierra
        result = await createChainsaw(formData);
      }

      if ('data' in result) {
        onSave(result.data); // Accedemos a los datos de forma segura
      } else {
        onSave(result); // Manejo en caso de que result sea de tipo Chainsaw
      }
      onClose();  // Cerrar el modal solo si la operación fue exitosa

    } catch (err) {
      console.error('Error al crear/actualizar la motosierra:', err);
      setError('Hubo un error al guardar la motosierra. Intenta nuevamente.');
      setTimeout(() => setError(''), 3000);  // Limpiar el mensaje de error después de 3 segundos
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      id: chainsawToEdit ? chainsawToEdit.id : '',  // Mantener el ID si se está editando
      name: '',
      description: '',
      quantity: 0,
      type: '',
      planId: ''  // Limpiar planId al cerrar el modal
    });
    setError('');
    onClose();  // Cierra el modal
  };

  useEffect(() => {
    if (!isOpen) {
      setError('');  // Limpiar el error cuando el modal se cierra
    }
  }, [isOpen]);

  if (!isOpen) return null;  // Si el modal no está abierto, no se renderiza

  return (
    <>
      <div className="modal-overlay" onClick={handleCancel}></div>
      <div className="modal">
        <h2>{chainsawToEdit ? 'Editar Motosierra' : 'Crear Motosierra'}</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Cantidad"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Tipo"
            value={formData.type}
            onChange={handleChange}
            required
          />

          {/* Campo para Plan ID */}
          <input
            type="text"
            name="planId"
            placeholder="Plan ID"
            value={formData.planId}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
      </div>
    </>
  );
};

export default ChainsawModal;
