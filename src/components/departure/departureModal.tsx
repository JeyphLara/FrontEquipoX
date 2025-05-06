import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    departure,
    createOrder,
    updateOrder,
} from "../../api/departureApi";
import "./departureModal.css";

interface DepartureModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderToEdit: departure | null;
    onSave: (order: departure) => void;
}

const DepartureModal: React.FC<DepartureModalProps> = ({
    isOpen,
    onClose,
    orderToEdit,
    onSave,
}) => {
    const [formData, setFormData] = useState<departure>({
        id: "",
        departure_date: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>("");
    const [planError, setPlanError] = useState<string>(""); // Mensaje de error si no se cargan los planes
    const [currentDateTime, setCurrentDateTime] = useState("");

    useEffect(() => {
        const now = new Date();
        const formatted = getLocalDateTime(); // "YYYY-MM-DDTHH:MM"
        setCurrentDateTime(formatted);
        if (orderToEdit) {
            setFormData(orderToEdit);
        } else {
            setFormData({
                id: uuidv4(),
                departure_date: formatted,
            });
        }
    }, [orderToEdit, isOpen]);
    function getLocalDateTime() {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localTime = new Date(now.getTime() - offset * 60000);
        return localTime.toISOString().slice(0, 16);
    }

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
            if (orderToEdit) {
                result = await updateOrder(id, formData);
            } else {
                result = await createOrder(formData);
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
            id: orderToEdit ? orderToEdit.id : "",
            departure_date: "",
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
                <h2>{orderToEdit ? "Editar orden de reparto" : "Crear orden de reparto"}</h2>
                {error && <div className="error">{error}</div>}
                {planError && <div className="error">{planError}</div>}{" "}
                {/* Mostrar error de carga de planes */}
                <form onSubmit={handleSubmit}>
                    {orderToEdit && (
                        <input
                            type="text"
                            name="id"
                            placeholder="id"
                            value={formData.id}
                            onChange={handleChange}
                            readOnly // opcional, si no quieres que se edite
                        />
                    )}

                    <input
                        type="datetime-local"
                        name="departure_date"
                        placeholder="Fecha"
                        value={formData.departure_date}
                        onChange={handleChange}
                        required
                    />

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

export default DepartureModal;
