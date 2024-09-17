import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

/**
 * Componente de ruta privada que redirige a una página de inicio de sesión
 * si no existe el token de autenticación.
 * 
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ComponentType} props.component - El componente a renderizar si el usuario está autenticado.
 * @example
 * return <PrivateRoute component={HomePage} />;
 * @returns {JSX.Element} El componente especificado o una redirección a la página de inicio.
 */
function PrivateRoute({ component: Component }) {
  // Hook para obtener cookies
  const [cookies] = useCookies(['authToken']);

  // Verifica si existe la cookie 'authToken'
  if (!cookies.authToken) {
    return <Navigate to="/" />; // Redirige a la página de inicio si no hay token
  }

  // Renderiza el componente especificado si el token está presente
  return <Component />;
}

// Definición de PropTypes para el componente PrivateRoute
PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired, // El componente debe ser un tipo de elemento React y es obligatorio
};

export default PrivateRoute;
