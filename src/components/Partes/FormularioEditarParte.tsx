import React, { useState } from 'react';
import axios from '../../api/axiosInstance';

interface Parte {
    id: string;
    name: string;
    description: string;
    quantity: number;
}


interface FormularioEditarParteProps {
    parte: Parte;
    onSuccess: () => void;
}

const FormularioEditarParte: React.FC<FormularioEditarParteProps> = ({ parte, onSuccess }) => {
    const [nombre, setNombre] = useState(parte.name);
    const [descripcion, setDescripcion] = useState(parte.description);
    const [cantidad, setCantidad] = useState(parte.quantity);
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.put(`/api/v1/parts/edit`, {
                id: parte.id,
                name: nombre,
                description: descripcion,
                quantity: cantidad,
            });

            setMensaje('Parte editada correctamente');
            onSuccess();
        } catch (error) {
            setMensaje('Error al editar la parte' + error);
            console.error(error);
        }
    };

    const estilos = {
        input: {
            margin: '0 0 2%',
        },
        container: {
            maxWidth: '500px',
            margin: '50px auto',
            backgroundColor: '#1e1e2f',
            padding: '30px',
            borderRadius: '10px',
            color: '#fff'
        },
        submitBtn: {
            padding: '12px',
            backgroundColor: '#00bcd4',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginRight: '10px',
        },
        cancelBtn: {
            padding: '12px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Editar Parte</h2>
                <form onSubmit={handleSubmit} style={estilos.container}>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" style={estilos.input} />
                    <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" style={estilos.input} />
                    <input type="number" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} placeholder="Cantidad" style={estilos.input} />
                    <div className="modal-buttons">
                        <button type="submit" style={estilos.submitBtn}>Guardar Cambios</button>
                        {/* <button type="button" onClick={onClose} style={estilos.cancelBtn}>Cancelar</button> */}
                    </div>
                </form>
                {mensaje && <p style={{ color: mensaje.includes('Error') ? 'red' : 'green', marginTop: '10px' }}>{mensaje}</p>}
            </div>
        </div>
    );
};

export default FormularioEditarParte;
