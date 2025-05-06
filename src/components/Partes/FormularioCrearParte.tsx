import React, { useState } from 'react';
import axios from '../../api/axiosInstance';

interface FormularioCrearParteProps {
    onCrear: (nuevaParte: NuevaParte) => void;
}

interface NuevaParte {
    name: string;
    description: string;
    quantity: number;
}

const FormularioCrearParte: React.FC<FormularioCrearParteProps> = ({ onCrear }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState<number>(0);
    const [mensaje, setMensaje] = useState('');

    const manejarSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const nuevaParte: NuevaParte = {
                name: nombre,
                description: descripcion,
                quantity: cantidad,
            };

            const respuesta = await axios.post('/api/v1/parts/create', nuevaParte)
            if (respuesta.status === 200 || respuesta.status === 201) {
                onCrear(nuevaParte);

                // Limpiar formulario después de crear
                setNombre('');
                setDescripcion('');
                setCantidad(0);
                setMensaje('Parte creada con éxito!');
            } else {
                setMensaje('Error al crear la parte. Intente nuevamente.');
            }
        } catch (error) {
            console.error('Error al crear parte:', error);
            setMensaje('Error al crear la parte. ' + error);
            return;
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
        }
    }

    return (
        <form onSubmit={manejarSubmit} style={estilos.container}>
            <h3>Crear Nueva Parte</h3>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={estilos.input}
            />
            <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
                style={estilos.input}
            />
            <input
                type="number"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                required
                min="0"
                style={estilos.input}
            />
            <button type="submit" style={estilos.submitBtn}>Crear Parte</button>

            {mensaje && <p style={{ color: mensaje.includes('Error') ? 'red' : 'green', marginTop: '10px' }}>{mensaje}</p>}
        </form>
    );
};

export default FormularioCrearParte;
