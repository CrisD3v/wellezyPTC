import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Inputs from '../atoms/Inputs';
import { useSelector, useDispatch } from 'react-redux';
import { setArrivalDate, setArrivalTime, setDepartureTime, setSelectedAirline } from '../../redux/slices/filterSlice';

/**
 * Componente de grupo de filtros para seleccionar aerolíneas, hora de salida, fecha y hora de llegada.
 *
 * @returns {JSX.Element} El componente de grupo de filtros renderizado.
 */
function FilterGroup() {
  const airlines = useSelector(state => state.datas.airlines);
  const selectedAirline = useSelector(state => state.filters.selectedAirline);
  const departureTime = useSelector(state => state.filters.departureTime);
  const arrivalDate = useSelector(state => state.filters.arrivalDate);
  const arrivalTime = useSelector(state => state.filters.arrivalTime);
  const dispatch = useDispatch();

  // Estado local para manejar los checkboxes
  const [checkedAirlines, setCheckedAirlines] = useState([]);

  useEffect(() => {
    // Sincroniza el estado local con el estado de Redux
    setCheckedAirlines(selectedAirline ? [selectedAirline] : []);
  }, [selectedAirline]);

  const handleAirlineChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    const updatedAirlines = checked
      ? [...checkedAirlines, value]
      : checkedAirlines.filter(airline => airline !== value);

    setCheckedAirlines(updatedAirlines);
    dispatch(setSelectedAirline(updatedAirlines.length > 0 ? updatedAirlines[0] : ''));
  };

  const handleDepartureTimeChange = (event) => {
    dispatch(setDepartureTime(event.target.value));
  };

  const handleArrivalDateChange = (event) => {
    dispatch(setArrivalDate(event.target.value));
  };

  const handleArrivalTimeChange = (event) => {
    dispatch(setArrivalTime(event.target.value));
  };

  const handleResetFilters = () => {
    dispatch(setSelectedAirline(''));
    dispatch(setDepartureTime(''));
    dispatch(setArrivalDate(''));
    dispatch(setArrivalTime(''));
    setCheckedAirlines([]); // Limpiar el estado local de los checkboxes
  };

  return (
    <div className='box mt-7 p-6 w-full '>
      <div className="mb-7 flex w-full items-center justify-between border-b border-gray-200 pb-3">
        <p className="text-base font-medium leading-7 text-black">FILTROS</p>
        <p className="cursor-pointer text-xs font-medium text-gray-500 transition-all duration-500 hover:text-indigo-600" onClick={handleResetFilters}>RESET</p>
      </div>
      <p className="mb-3 text-sm font-medium leading-6 text-black">Aerolínea</p>
      <div className="box flex flex-row gap-4 mb-4 flex-wrap">
        {airlines.map((airline, index) => (
          <Inputs
            key={index}
            type="checkbox"
            label={airline}
            value={airline}
            labelPosition="R"
            containerClass='uppercase'
            checked={checkedAirlines.includes(airline)}
            onChange={handleAirlineChange}
          />
        ))}
      </div>
      <p className="mb-3 text-sm font-medium leading-6 text-black">Hora de salida</p>
      <div className="box flex flex-col gap-2 mb-4">
        <Inputs type='time' customClass='border p-2 rounded-md' value={departureTime} onChange={handleDepartureTimeChange} />
      </div>

      <p className="mb-3 text-sm font-medium leading-6 text-black">Fecha de llegada</p>
      <div className="box flex flex-col gap-2 mb-4">
        <Inputs type='date' customClass='border p-2 rounded-md' value={arrivalDate} onChange={handleArrivalDateChange} />
      </div>

      <p className="mb-3 text-sm font-medium leading-6 text-black">Hora de llegada</p>
      <div className="box flex flex-col gap-2">
        <Inputs type='time' customClass='border p-2 rounded-md' value={arrivalTime} onChange={handleArrivalTimeChange} />
      </div>
    </div>
  );
}

// Definición de PropTypes para el componente FilterGroup
FilterGroup.propTypes = {
  // No hay propiedades específicas definidas para este componente, ya que usa Redux para el estado
};

export default FilterGroup;
