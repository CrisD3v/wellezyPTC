import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de carga que muestra un spinner animado.
 *
 * @returns {JSX.Element} El componente de carga renderizado.
 */
function Loader() {
  return (
    <div className="flex justify-center items-center h-full" data-testid="loader-container">
      <div className="w-16 h-16 border-4 border-purple-500 border-dashed rounded-full animate-spin"  data-testid="loader-spinner"></div>
    </div>
  );
}

// No hay propiedades para validar en este componente
Loader.propTypes = {};

export default Loader;
