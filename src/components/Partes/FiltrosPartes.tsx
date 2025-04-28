import React from 'react';

interface FiltrosPartesProps {
    busqueda: string;
    setBusqueda: (valor: string) => void;
    setIsSearch: (valor: boolean) => void;
}

const FiltrosPartes: React.FC<FiltrosPartesProps> = ({ busqueda, setBusqueda, setIsSearch }) => {
    const manejarCambioBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value);
        setIsSearch(true);
    };

    const limpiarFiltros = () => {
        setBusqueda('');
        setIsSearch(false);
    };

    return (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
                type="text"
                placeholder="Buscar por nombre o descripción"
                value={busqueda}
                onChange={manejarCambioBusqueda}
                style={{ padding: '5px', flex: '1' }}
            />
            <button onClick={limpiarFiltros}>Limpiar</button>
        </div>
    );
};

export default FiltrosPartes;
