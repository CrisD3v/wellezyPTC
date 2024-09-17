import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de botón personalizable.
 *
 * @param {string} label - El texto que se mostrará en el botón.
 * @param {string} [customClass] - Clases CSS opcionales para aplicar al botón.
 * @param {object} [props] - Cualquier otra propiedad que se pase al elemento del botón.
 * @returns {JSX.Element} El componente de botón renderizado.
 */
function Button({ label, customClass = null, ...props }) {
    const customs = customClass || 'border p-4 bg-purple-400 text-white rounded-full font-bold';
    return (
        <button className={customs} {...props}>
            {label}
        </button>
    );
}

// Definición de PropTypes para el componente Button
Button.propTypes = {
    label: PropTypes.string.isRequired, // label es requerido y debe ser una cadena de texto
    customClass: PropTypes.string, // customClass es opcional y debe ser una cadena de texto
};

export default Button;
