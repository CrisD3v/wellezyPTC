import React from 'react';
import PropTypes from 'prop-types';
import MenuTemplate from '../templates/MenuTemplate';
import DataTable from '../organisms/DataTable';

/**
 * Componente de la página de inicio que utiliza `MenuTemplate` y muestra `DataTable`.
 * 
 * @component
 * @example
 * return (
 *   <HomePage />
 * );
 */
function HomePage() {
  return (
    <MenuTemplate>
      <DataTable />
    </MenuTemplate>
  );
}

export default HomePage;
