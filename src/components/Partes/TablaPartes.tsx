import React from 'react';
import './PartesStyle.css';
interface Parte {
    id: string;
    name: string;
    description: string;
    quantity: number;
}

interface TablaPartesProps {
    partes: Parte[];
    onEditar: (parte: Parte) => void;
}

const TablaPartes: React.FC<TablaPartesProps> = ({ partes, onEditar }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className='tabla-partes'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {partes.length === 0 ? (
                        <tr>
                            <td colSpan={4}>No hay partes disponibles.</td>
                        </tr>
                    ) : (
                        partes.map((parte) => (
                            <tr key={parte.id} id={parte.id}>

                                <td>{parte.name}</td>
                                <td>{parte.description}</td>
                                <td>{parte.quantity}</td>
                                <td>
                                    <button onClick={() => onEditar(parte)}>Editar</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablaPartes;
