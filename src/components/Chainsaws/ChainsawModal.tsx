import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Chainsaw,
  createChainsaw,
  updateChainsaw,
  Plan,
  getAllPlans,
} from "../../api/chainsawsApi";
import "./ChainsawModal.css";

interface ChainsawModalProps {
  isOpen: boolean;
  onClose: () => void;
  chainsawToEdit: Chainsaw | null;
  onSave: (chainsaw: Chainsaw) => void;
}

const ChainsawModal: React.FC<ChainsawModalProps> = ({
  isOpen,
  onClose,
  chainsawToEdit,
  onSave,
}) => {
  const [formData, setFormData] = useState<Chainsaw>({
    id: "",
    name: "",
    description: "",
    quantity: 0,
    type: "",
    planId: "", // Plan vacío por defecto
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planError, setPlanError] = useState<string>(""); // Mensaje de error si no se cargan los planes

  useEffect(() => {
    if (chainsawToEdit) {
      setFormData(chainsawToEdit);
    } else {
      setFormData({
        id: uuidv4(),
        name: "",
        description: "",
        quantity: 0,
        type: "",
        planId: "", // Plan vacío para nueva motosierra
      });
    }
  }, [chainsawToEdit, isOpen]);

  useEffect(() => {
    if (isOpen) {
      getAllPlans()
        .then((response) => setPlans(response.data))
        .catch((err) => {
          console.error("Error al cargar planes:", err);
          setPlanError("Hubo un error al cargar los planes disponibles.");
        });
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const { id, ...dataToSend } = formData;

    console.log("Datos enviados:", dataToSend);

    try {
      let result;
      if (chainsawToEdit) {
        result = await updateChainsaw(id, formData);
      } else {
        result = await createChainsaw(formData);
      }

      if ("data" in result) {
        onSave(result.data);
      } else {
        onSave(result);
      }
      onClose();
    } catch (err) {
      console.error("Error al crear/actualizar la motosierra:", err);
      setError("Hubo un error al guardar la motosierra. Intenta nuevamente.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      id: chainsawToEdit ? chainsawToEdit.id : "",
      name: "",
      description: "",
      quantity: 0,
      type: "",
      planId: chainsawToEdit ? chainsawToEdit.planId : "", // Mantener el plan seleccionado si se edita
    });
    setError("");
    setPlanError(""); // Reseteamos el error de carga de planes
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setError("");
      setPlanError(""); // Reseteamos el error al cerrar el modal
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={handleCancel}></div>
      <div className="modal">
        <h2>{chainsawToEdit ? "Editar Motosierra" : "Crear Motosierra"}</h2>
        {error && <div className="error">{error}</div>}
        {planError && <div className="error">{planError}</div>}{" "}
        {/* Mostrar error de carga de planes */}
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

          <select
            className="select-plan"
            name="planId"
            value={formData.planId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un Plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
};

export default ChainsawModal;
