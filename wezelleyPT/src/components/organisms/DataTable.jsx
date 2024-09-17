import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '../atoms/Table';
import TableBody from '../molecules/TableBody';
import TableHead from '../molecules/TableHead';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../atoms/loader';
import Button from '../atoms/Button';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { setAirlines } from '../../redux/slices/dataSlice';

/**
 * Componente para mostrar una tabla de datos de vuelos con paginación.
 * 
 * Este componente maneja la visualización de una tabla con datos de vuelos, incluye paginación y filtrado. 
 * Muestra un cargador mientras los datos están en proceso de carga.
 * 
 * @component
 * @example
 * return (
 *   <DataTable />
 * );
 */
function DataTable() {
  const dispatch = useDispatch();
  const loadData = useSelector((state) => state.datas.loadingData);
  const response = useSelector((state) => state.datas.flights);
  const flightsData = response?.data?.Seg1 || [];

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Número de elementos por página

  // Obtener todos los segmentos
  const allSegments = flightsData.flatMap(seg => seg.segments);

  // Extraer los `companyName` de cada segmento y eliminar duplicados
  const companyNames = Array.from(
    new Set(
      allSegments.map(seg => seg.companyName).filter(Boolean)
    )
  );

  // Despacha los nombres de las aerolíneas
  dispatch(setAirlines(companyNames));

  const totalPages = Math.ceil(allSegments.length / itemsPerPage);

  // Obtener los filtros del estado de Redux
  const selectedAirline = useSelector((state) => state.filters.selectedAirline);
  const departureTime = useSelector((state) => state.filters.departureTime);
  const arrivalDate = useSelector((state) => state.filters.arrivalDate);
  const arrivalTime = useSelector((state) => state.filters.arrivalTime);

  const buttonClass = 'bg-purple-400 p-4 rounded-md text-white font-bold';

  // Función para cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loadData === 2) {
    return <Loader />;
  }

  if (loadData === 1) {
    return (
      <div className="">
        <Table>
          <TableHead />
          <TableBody
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            allSegments={allSegments}
            selectedAirline={selectedAirline}
            departureTime={departureTime}
            arrivalDate={arrivalDate}
            arrivalTime={arrivalTime}
          />
        </Table>
        <div className="flex justify-center items-center gap-10 mt-4">
          <Button
            label={<MdNavigateBefore />}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            customClass={buttonClass}
          />
          <span className='font-semibold text-base uppercase'>
            {currentPage + 1} - {totalPages}
          </span>
          <Button
            label={<MdNavigateNext />}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            customClass={buttonClass}
          />
        </div>
      </div>
    );
  }

  return null;
}

// Definición de PropTypes para el componente DataTable
DataTable.propTypes = {};

export default DataTable;
