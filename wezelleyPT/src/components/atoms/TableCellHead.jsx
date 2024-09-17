import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de celda de encabezado de tabla.
 *
 * @param {React.ReactNode} children - Contenido que se mostrará dentro de la celda de encabezado.
 * @returns {JSX.Element} El componente de celda de encabezado de tabla renderizado.
 */
function TableCellHead({ children }) {
  return (
    <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
      {children}
    </th>
  );
}

// Definición de PropTypes para el componente TableCellHead
TableCellHead.propTypes = {
  children: PropTypes.node.isRequired, // children es requerido y puede ser cualquier tipo de nodo React
};

export default TableCellHead;
