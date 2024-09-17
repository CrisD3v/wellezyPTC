import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente de selección con opciones desplegables.
 *
 * @param {string} type - El tipo de estilo para el select ('rounded' o 'normal').
 * @param {Array<{ value: string, label: string }>} options - Opciones a mostrar en el select.
 * @param {string} selectedOPT - Texto de la opción seleccionada por defecto.
 * @returns {JSX.Element} El componente de selección renderizado.
 */
function Select({ type, options, selectedOPT }) {
    const types = {
        rounded: 'relative block h-12 w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2.5 text-xs font-medium text-gray-900 focus:outline-none',
        normal: 'relative block h-12 w-full appearance-none border border-gray-300 bg-white px-4 py-2.5 text-xs font-medium text-gray-900 focus:outline-none'
    };

    return (
        <div className="relative mb-7 w-full">
            <select className={`${types[type]}`}>
                <option className={`${types[type]}`} selected disabled defaultValue={'0'}>
                    {selectedOPT}
                </option>
                {options.map((option, index) => (
                    <option className={`${types[type]}`} key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <svg className="absolute right-4 top-1/2 z-50 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
}

// Definición de PropTypes para el componente Select
Select.propTypes = {
    type: PropTypes.oneOf(['rounded', 'normal']).isRequired, // type es requerido y debe ser uno de los valores especificados
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired, // value es requerido y debe ser una cadena de texto
            label: PropTypes.string.isRequired // label es requerido y debe ser una cadena de texto
        })
    ).isRequired, // options es requerido y debe ser un array de objetos con value y label
    selectedOPT: PropTypes.string // selectedOPT es opcional y debe ser una cadena de texto
};

export default Select;
