import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '../molecules/MenuList';
import { useSelector } from 'react-redux';
import SearchSelect from '../molecules/SearchSelect';
import UserOptions from '../molecules/UserOptions';

/**
 * Componente que representa un menú desplegable con opciones.
 * 
 * Dependiendo del tipo (`type`), muestra una lista de opciones de pasajeros o un formulario de búsqueda.
 * 
 * @component
 * @param {string} type - Tipo de menú desplegable. Puede ser `'passenger'` o `'search'`.
 * @param {boolean} open - Controla si el menú desplegable está visible o oculto.
 * @param {string} customClass - clases personalizables.
 * @example
 * return (
 *   <MenuDropDown type='passenger' open={true} />
 * );
 */
function MenuDropDown({ type, open , customClass}) {
  const adultsPassenger = useSelector(state => state.counter.adults);
  const kidsPassenger = useSelector(state => state.counter.kids);
  const items = [
    { label: 'Adultos', value: adultsPassenger },
    { label: 'Niños', value: kidsPassenger },
  ];

  const typeDropDown = {
    passenger: 'lg:right-[20rem] lg:top-[6.5rem] xl:right-[15%]',
    search: 'lg:right-[20rem] lg:top-[6.5rem] xl:right-[46%]',
    user: 'lg:right-[10rem] lg:top-[3.8rem] xl:right-[12%] w-[15rem] p-1',
  };

  return (
    <div className={`border shadow-lg w-96 h-34 rounded-xl p-7 bg-white z-50 absolute top-[10vh] ${typeDropDown[type]} ${open ? 'block' : 'hidden'} ${customClass}`}>
      {type === 'passenger' ? <MenuList items={items} /> : type === 'search' ? <SearchSelect /> : <UserOptions/>}
    </div>
  );
}

// Definición de PropTypes para el componente MenuDropDown
MenuDropDown.propTypes = {
  type: PropTypes.oneOf(['passenger', 'search','user']).isRequired,
  open: PropTypes.bool.isRequired,
  customClass: PropTypes.string
};

export default MenuDropDown;
