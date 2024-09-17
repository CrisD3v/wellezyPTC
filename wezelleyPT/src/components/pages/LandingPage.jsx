import React from 'react';
import PropTypes from 'prop-types';
import AuthForms from '../organisms/AuthForms';

/**
 * Componente de la página de inicio que muestra el formulario de autenticación.
 * 
 * @component
 * @example
 * return (
 *   <LandingPage />
 * );
 */
function LandingPage() {
  return (
    <div>
      <AuthForms />
    </div>
  );
}

export default LandingPage;
