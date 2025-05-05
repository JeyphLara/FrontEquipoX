import React, { useEffect, useState } from 'react';
import oxios from '../../api/ordenns';
import './Orden.css';


// Se define una interfaz
interface Orden {
  id: string;
  departure_date: string;
}
// Se define un componente funcional llamado 'Orden'
const Orden = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [todasLasOrdenes, setTodasLasOrdenes] = useState<Orden[]>([]);
  const [nuevaFecha, setNuevaFecha] = useState<string>('');
  const [ordenEditar, setOrdenEditar] = useState<Orden | null>(null);
  const [filtroFecha, setFiltroFecha] = useState<string>('');
  const [fechaActual, setFechaActual] = useState<string>(() => new Date().toLocaleDateString());

  useEffect(() => {
    fetchOrdenes();
  }, []);
// Función asíncrona para obtener las órdenes desde el servido
  const fetchOrdenes = async () => {
    try {
      const res = await oxios.get('/orders/all');
      setOrdenes(res.data);  // Se actualiza el estado 'ordenes' con los datos obtenidos
      setTodasLasOrdenes(res.data); // guardar todas las órdenes para reiniciar el filtro
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
      alert('No se pudo conectar al servidor.');
    }
  };
  // Manejador para el cambio en el input del formulario (cuando el usuario escribe o selecciona una fecha)
  const handleFormularioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevaFecha(e.target.value);
  };
// Manejador para el envío del formulario (cuando el usuario hace submit)
  const handleFormularioSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

 // Validación: si no se ha ingresado una fecha, se muestra una alerta y se detiene el envío
    if (!nuevaFecha) {
      alert('Por favor, selecciona una fecha de salida.');
      return;
    }
    
    // Se convierte la fecha ingresada (nuevaFecha) en un objeto Date y luego se formatea en ISO 8601
    const fechaISO = new Date(nuevaFecha).toISOString();

    // Se valida que la fecha sea válida utilizando Date.parse (devuelve no es una fecha válida)
    if (isNaN(Date.parse(fechaISO))) {
      alert('La fecha de salida no es válida.');
      return;
    }
    
 //editar orden 
    try {
      if (ordenEditar) {
        await oxios.put('/orders/edit', { ...ordenEditar, departure_date: fechaISO });
        alert('Orden actualizada exitosamente.');
        setOrdenEditar(null);
      } else {
        const ordenParaEnviar = { departure_date: fechaISO };
        await oxios.post('/orders/create', ordenParaEnviar);
        alert('Orden creada exitosamente.');
      }

      setNuevaFecha('');
      await fetchOrdenes();
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      alert('No se pudo guardar la orden.');
    }
  };

  const handleEditar = (orden: Orden) => {
    setOrdenEditar(orden);
    setNuevaFecha(orden.departure_date.slice(0, 16));
  };

  const handleFiltroFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroFecha(e.target.value);
  };

  const handleBuscarPorFecha = () => {
    if (!filtroFecha) {
      alert('Selecciona una fecha para filtrar.');
      return;
    }

    const resultados = todasLasOrdenes.filter((orden) => {
      const ordenFecha = new Date(orden.departure_date).toISOString().slice(0, 10);
      return ordenFecha === filtroFecha;
    });

    setOrdenes(resultados);
  };

  const handleResetFiltro = () => {
    setFiltroFecha('');
    setOrdenes(todasLasOrdenes);
  };

  return (
    
    <div className="orden-salida-container">
      <div className="fecha-wrapper">
        <p className="fecha-actual">
          <span className="letra-e">Fecha:</span> <strong>{fechaActual}</strong>
        </p>
      </div>
      <h2>Órdenes de Salida</h2>
      <div className="filtro-fecha">
        <label>Filtro por fecha:</label>
        <div className="fila-controles">
        <input
          type="date"
          value={filtroFecha}
          onChange={handleFiltroFechaChange}
          
        />
        <button onClick={handleBuscarPorFecha}>Filtrar</button>
        <button onClick={handleResetFiltro}>Reset</button>
      </div>
      </div>


      <form onSubmit={handleFormularioSubmit} className="formulario-orden">
        <div>
          <label>Fecha de salida:</label>
          <input
            type="datetime-local"
            name="departure_date"
            value={nuevaFecha}
            onChange={handleFormularioChange}
            required
          />
        </div>
        <button type="submit" className="btn-crear-orden">
          {ordenEditar ? 'Actualizar Orden' : 'Crear Orden'}
        </button>
      </form>

      

      <div className="tabla-todas-ordenes">
        <h3>Órdenes existentes</h3>
        <table className="orden-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha de salida</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden, index) => (
              <tr key={index}>
                <td>{orden.id}</td>
                <td>{new Date(orden.departure_date).toLocaleString()}</td>
                <td><button onClick={() => handleEditar(orden)}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orden;
