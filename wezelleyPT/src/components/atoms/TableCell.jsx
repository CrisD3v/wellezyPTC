import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de celda de tabla.
 *
 * @param {React.ReactNode} children - Contenido que se mostrará dentro de la celda.
 * @returns {JSX.Element} El componente de celda de tabla renderizado.
 */
function TableCell({ children }) {
  return (
    <td className="border-t-0 border-b px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-blueGray-700">
      {children}
    </td>
  );
}

// Definición de PropTypes para el componente TableCell
TableCell.propTypes = {
  children: PropTypes.node.isRequired, // children es requerido y puede ser cualquier tipo de nodo React
};

export default TableCell;
