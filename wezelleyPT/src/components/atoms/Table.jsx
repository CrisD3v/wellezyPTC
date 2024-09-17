import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de tabla que actúa como contenedor para otros elementos de tabla.
 *
 * @param {React.ReactNode} children - Elementos hijos que se mostrarán dentro de la tabla.
 * @returns {JSX.Element} El componente de tabla renderizado.
 */
function Table({ children }) {
  return (
    <table className='items-center bg-transparent w-full border-collapse'>
      {children}
    </table>
  );
}

// Definición de PropTypes para el componente Table
Table.propTypes = {
  children: PropTypes.node.isRequired, // children es requerido y puede ser cualquier tipo de nodo React
};

export default Table;
