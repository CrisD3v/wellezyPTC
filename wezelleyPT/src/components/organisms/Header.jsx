import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../molecules/searchForm';

/**
 * Componente que representa la cabecera de la página.
 * 
 * Este componente incluye un formulario de búsqueda y se utiliza como una cabecera simple.
 * 
 * @component
 * @example
 * return (
 *   <Header />
 * );
 */
function Header() {
  return (
    <div className='w-full h-14 mt-5 flex flex-row justify-center items-center'>
        <SearchForm />
    </div>
  );
}

// Definición de PropTypes para el componente Header
Header.propTypes = {};

export default Header;
