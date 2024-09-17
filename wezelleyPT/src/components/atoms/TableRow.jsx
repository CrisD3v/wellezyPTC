import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de fila de tabla.
 *
 * @param {React.ReactNode} children - Contenido que se mostrará dentro de la fila de la tabla.
 * @returns {JSX.Element} El componente de fila de tabla renderizado.
 */
function TableRow({ children }) {
  return (
    <tr className="">
      {children}
    </tr>
  );
}

// Definición de PropTypes para el componente TableRow
TableRow.propTypes = {
  children: PropTypes.node.isRequired, // children es requerido y puede ser cualquier tipo de nodo React
};

export default TableRow;
