import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';

/**
 * Componente de entrada de datos personalizable.
 *
 * @param {string} type - El tipo de input (text, number, checkbox, date, password, email).
 * @param {string} [customClass] - Clases CSS opcionales para aplicar al input.
 * @param {string} [containerClass] - Clases CSS opcionales para aplicar al contenedor del input.
 * @param {string} [label] - Texto de la etiqueta del input.
 * @param {string} [labelPosition] - Posición de la etiqueta ('T' para arriba, 'L' para izquierda, 'R' para derecha, 'B' para abajo).
 * @param {string} [id] - Identificador del input.
 * @param {string} [errorMessage] - Mensaje de error a mostrar debajo del input.
 * @param {object} [props] - Cualquier otra propiedad que se pase al elemento del input.
 * @returns {JSX.Element} El componente de entrada de datos renderizado.
 */
function Inputs({
  type,
  customClass = '',
  containerClass = '',
  label = '',
  labelPosition = 'L',
  id = '',
  errorMessage = '',
  ...props // Para aceptar propiedades adicionales
}) {
  // Clases y configuraciones según el tipo de input
  const inputClasses = {
    text: customClass,
    number: 'number-class', // Clase por defecto para 'number' si se desea especificar
    checkbox: "mr-2 h-5 w-5 appearance-none rounded-md border border-gray-300 checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')] checked:bg-center checked:bg-no-repeat hover:border-indigo-500 hover:bg-indigo-100",
    date: customClass,
    time: customClass,
    password: customClass,
    email: customClass,
    hidden: ''
  };

  return (
    <div className={`flex ${labelPosition === 'L' ? 'flex-row' : labelPosition === 'R' ? 'flex-row items-center' : 'flex-col'} ${containerClass}`}>
      {label && (labelPosition === 'T' || labelPosition === 'L') && (
        <Label label={label} />
      )}

      <input
        id={id}
        type={type}
        className={`${inputClasses[type] || ''} ${errorMessage ? 'border-red-500' : ''}`}
        {...props} // Pasar propiedades adicionales aquí
      />

      {label && (labelPosition === 'R' || labelPosition === 'B') && (
        <Label label={label} />
      )}

      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

// Validación de propiedades
Inputs.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'checkbox', 'date', 'password', 'email', 'time','hidden']).isRequired, // type es requerido y debe ser uno de los valores especificados
  customClass: PropTypes.string, // customClass es opcional y debe ser una cadena de texto
  containerClass: PropTypes.string, // containerClass es opcional y debe ser una cadena de texto
  label: PropTypes.string, // label es opcional y debe ser una cadena de texto
  labelPosition: PropTypes.oneOf(['T', 'L', 'R', 'B']), // labelPosition es opcional y debe ser uno de los valores especificados
  errorMessage: PropTypes.string, // errorMessage es opcional y debe ser una cadena de texto
};

export default Inputs;
