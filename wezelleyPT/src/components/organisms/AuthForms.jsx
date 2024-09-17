import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../molecules/LoginForm';
import SignUpForm from '../molecules/SignUpForm';

/**
 * Componente para mostrar formularios de autenticación.
 * 
 * Este componente permite alternar entre el formulario de inicio de sesión y el formulario de registro mediante pestañas.
 * 
 * @component
 * @example
 * return (
 *   <AuthForms />
 * );
 */
function AuthForms() {
  const [activeTab, setActiveTab] = useState('login'); // Estado para gestionar la pestaña activa
  const activeClass = 'border-r border-purple-400 p-4 text-purple-400 w-[10rem]';
  const defaultClass = 'p-4 border-r w-[10rem]';

  return (
    <div className='flex justify-center items-center flex-col h-[100vh] bg-purple-50 bg-opacity-50'>
      <div className="w-[50%] p-10 flex flex-row gap-10 shadow-lg transition-all ease-in-out duration-300 h-[55.99vh]">
        <div className="flex gap-10 flex-col content-center text-xl font-semibold mb-10">
          <button
            className={`transition ease-in-out duration-300 ${activeTab === 'login' ? activeClass : defaultClass}`}
            onClick={() => setActiveTab('login')}
          >
            Iniciar Sesión
          </button>
          <button
            className={`transition ease-in-out duration-300 ${activeTab === 'register' ? activeClass : defaultClass}`}
            onClick={() => setActiveTab('register')}
          >
            Registrarse
          </button>
        </div>
        <div className="w-full">
          {activeTab === 'login' ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
}

// Definición de PropTypes para el componente AuthForms
AuthForms.propTypes = {};

export default AuthForms;
