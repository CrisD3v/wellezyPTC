import React from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes para la validación de las props
import { FaUser } from 'react-icons/fa';

/**
 * Componente de usuario que muestra un ícono dentro de un círculo.
 *
 * Este componente es personalizable a través de las props que se pueden pasar 
 * al componente, utilizando el operador spread (`{...props}`).
 *
 * @component
 * @param {object} props - Las propiedades que se pasan al componente. 
 * Se pueden añadir clases adicionales, eventos de clic, etc.
 */
function User({ ...props }) {
    return (
        // Contenedor principal con clases de estilo y propagación de props adicionales
        <div
            className='rounded-full border h-10 w-10 flex items-center justify-center bg-purple-400 shadow-lg cursor-pointer'
            data-testid="user-icon"
            {...props}
        >
            {/* Ícono de usuario usando react-icons */}
            <FaUser className='h-5 w-5 text-white' />
        </div>
    );
}

// Definición de los tipos de las props usando PropTypes
User.propTypes = {
    // Acepta cualquier prop adicional pasada al componente
    // Ejemplo: eventos (onClick), estilos (className), etc.
    // No se especifica un tipo fijo, ya que el componente utiliza spread (`{...props}`) para recibir múltiples props.
    props: PropTypes.object,
};

export default User;
