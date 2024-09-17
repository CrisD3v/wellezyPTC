import React from 'react';
import PropTypes from 'prop-types';
import Inputs from '../atoms/Inputs';
import Button from '../atoms/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setAddCountAdults, setAddCountKids, setRemoveCountAdults, setRemoveCountKids, resetCounterPassengers } from '../../redux/slices/passengerCounterSlice';

/**
 * Componente que muestra una lista de pasajeros con botones para agregar o quitar adultos y niños.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.items - Array de objetos con información sobre los pasajeros.
 * @returns {JSX.Element} El componente MenuList renderizado.
 */
function MenuList({ items = [] }) {
  const adultsPassenger = useSelector(state => state.counter.adults);
  const kidsPassenger = useSelector(state => state.counter.kids);
  const dispatch = useDispatch();

  // Clases para los botones
  const botonClass = `border border-purple-400 rounded-full w-10 h-10 text-purple-400 text-3xl transition all ease-in-out duration-300`;

  /**
   * Maneja la adición o eliminación de pasajeros.
   *
   * @param {string} passengerType - Tipo de pasajero ('adult' o 'kid').
   * @param {string} operation - Operación a realizar ('add' o 'remove').
   */
  const handlePassenger = (passengerType, operation) => {
    console.log(`Handling ${operation} for ${passengerType}`);

    const actions = {
      adult: {
        add: setAddCountAdults,
        remove: setRemoveCountAdults,
      },
      kid: {
        add: setAddCountKids,
        remove: setRemoveCountKids,
      },
    };

    // Ejecutar la acción si existe
    if (actions[passengerType] && actions[passengerType][operation]) {
      dispatch(actions[passengerType][operation]());
    } else {
      console.error('Action not found for:', passengerType, operation);
    }
  };

  /**
   * Maneja el reinicio de los contadores de pasajeros.
   */
  const handleResetCounters = () => dispatch(resetCounterPassengers());

  return (
    <div className='flex flex-col gap-4'>
      {items.map((item, index) => {
        const passengerType = index === 0 ? 'adult' : 'kid';
        return (
          <div key={index} className="flex justify-between items-center">
            <p>{item.label}</p>
            <div className="flex flex-row gap-4">
              <Button
                label="-"
                disabled={passengerType === 'adult' && adultsPassenger === 1 || passengerType === 'kid' && kidsPassenger === 0}
                customClass={`${botonClass} ${passengerType === 'adult' && adultsPassenger === 1 || passengerType === 'kid' && kidsPassenger === 0 ? 'border-slate-300 text-slate-300' : 'border-purple-400'}`}
                onClick={() => handlePassenger(passengerType, 'remove')}
              />

              <Inputs
                type='text'
                value={String(item.value)}
                customClass='w-10 text-center border border-purple-200'
                readOnly
              />
              <Button
                label='+'
                customClass={botonClass}
                onClick={() => handlePassenger(passengerType, 'add')}
              />
            </div>
          </div>
        );
      })}
      <div className="cursor-pointer" onClick={handleResetCounters}>
        <p className='text-slate-400 font-bold'>REINICIAR</p>
      </div>
    </div>
  );
}

// Definición de PropTypes para el componente MenuList
MenuList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  )
};

export default MenuList;
