  import React from 'react';
  import PropTypes from 'prop-types';

  /**
   * Componente de etiqueta para campos de formulario.
   *
   * @param {string} label - El texto que se mostrará en la etiqueta.
   * @returns {JSX.Element} El componente de etiqueta renderizado.
   */
  function Label({ label }) {
    return (
      <label htmlFor="Offer" className="mb-1 text-sm font-medium leading-6 text-gray-600">
        {label}
      </label>
    );
  }

  // Definición de PropTypes para el componente Label
  Label.propTypes = {
    label: PropTypes.string.isRequired, // label es requerido y debe ser una cadena de texto
  };

  export default Label;
