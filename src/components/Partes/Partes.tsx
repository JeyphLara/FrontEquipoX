import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance'; // 👈 Usamos tu instancia configurada
import TablaPartes from './TablaPartes';
import FiltrosPartes from './FiltrosPartes';
import FormularioCrearParte from './FormularioCrearParte';
import FormularioEditarParte from './FormularioEditarParte';
import Modal from './Modal';
import { FaPlus } from 'react-icons/fa';


interface Parte {
    id: string;
    name: string;
    description: string;
    quantity: number;
}

const Partes = () => {
    const [partes, setPartes] = useState<any[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [plan, setPlan] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [parteEditar, setParteEditar] = useState<any>(null);
    const [parteSeleccionada, setParteSeleccionada] = useState<Parte | null>(null);
    const [mostrarEditar, setMostrarEditar] = useState(false);

    const obtenerPartes = async () => {
        try {
            let url = '/api/v1/parts/all';
            if (isSearch && busqueda) {
                url = `/api/v1/parts/search?query=${busqueda}`;
            }
            if (plan) {
                url = `/api/v1/parts/all_by_plan?plan=${plan}`;
            }

            const response = await axios.get(url);
            setPartes(response.data);
        } catch (error) {
            console.error('Error al obtener partes:', error);
        }
    };



    useEffect(() => {
        obtenerPartes();
    }, [busqueda, plan, isSearch]);

    const manejarCrearParte = () => {
        setMostrarCrear(true);
        setParteEditar(null);
    };



    const manejarEditarParte = (parte: any) => {
        setParteEditar(parte);
        setMostrarCrear(false);
    };

    const refrescarLista = () => {
        // setParteEditar(false);
        obtenerPartes();
    };

    const estilos = {
        btnCreate: {
            backgroundColor: '#1e1e2f',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        }
    }

    return (
        <div>
            <h2>Gestión de Partes</h2>

            {/* <FiltrosPartes
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setIsSearch={setIsSearch}
            /> */}

            <button onClick={manejarCrearParte} style={estilos.btnCreate}>Crear Nueva Parte</button>

            <TablaPartes partes={partes} onEditar={manejarEditarParte} />

            <Modal isOpen={mostrarCrear} onClose={() => setMostrarCrear(false)}>
                <FormularioCrearParte onCrear={refrescarLista} />
            </Modal>

            <Modal isOpen={parteEditar} onClose={() => setParteEditar(false)}>
                <FormularioEditarParte
                    parte={parteEditar}
                    onSuccess={refrescarLista}
                />
            </Modal>
        </div>
    );
};

export default Partes;
