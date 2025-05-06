import React, { useState, useEffect } from 'react';
import { departure, getDepartureOrders } from '../../api/departureApi';
import DepartureModal from './departureModal';
import './departure.css';

const DepartureList: React.FC = () => {
    const [departures, setdepartures] = useState<departure[]>([]);
    const [filtereddepartures, setFiltereddepartures] = useState<departure[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departureToEdit, setdepartureToEdit] = useState<departure | null>(null);

    useEffect(() => {
        const fetchdepartures = async () => {
            try {
                const response = await getDepartureOrders();
                setdepartures(response.data);
                setFiltereddepartures(response.data);
            } catch (error) {
                console.error('Error al obtener motosierras:', error);
            }
        };
        fetchdepartures();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            setFiltereddepartures(
                departures.filter((departure) =>
                    departure.id.includes(searchTerm)
                )
            );
        } else {
            setFiltereddepartures(departures);
        }
    }, [searchTerm, departures]);

    const handleEdit = (departure: departure) => {
        setdepartureToEdit(departure);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setdepartureToEdit(null);
        setIsModalOpen(false);
    };

    const handleSave = (departure: departure) => {
        if (departureToEdit) {
            // Si se está editando, actualiza el elemento en ambas listas
            setdepartures((prevdepartures) =>
                prevdepartures.map((item) => item.id === departure.id ? { ...item, ...departure } : item)
            );
            setFiltereddepartures((prevFiltereddepartures) =>
                prevFiltereddepartures.map((item) => item.id === departure.id ? { ...item, ...departure } : item)
            );
        } else {
            // Si se está creando, agrega el nuevo elemento a ambas listas
            setdepartures((prevdepartures) => [...prevdepartures, departure]);
            setFiltereddepartures((prevFiltereddepartures) => [...prevFiltereddepartures, departure]);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="departure-list-container">
            <h2>Listado de ordenes de reparto</h2>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            <button onClick={() => { setdepartureToEdit(null); setIsModalOpen(true); }}>Crear orden de reparto</button>

            <table className="departure-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filtereddepartures.length > 0 ? (
                        filtereddepartures.map((departure) => (
                            <tr key={departure.id}>
                                <td>{departure.id}</td>
                                <td>{departure.departure_date}</td>
                                <td>
                                    <button className='butonEdit' onClick={() => handleEdit(departure)}>Editar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DepartureModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                orderToEdit={departureToEdit}
                onSave={handleSave} // Pasamos el callback para actualizar la lista
            />
        </div>
    );
};

export default DepartureList;
