import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableRow from '../atoms/TableRow';
import TableCell from '../atoms/TableCell';
import Button from '../atoms/Button';
import { useReservesMutation, useUserDataQuery } from '../../redux/services/ApiServices';

/**
 * Componente que renderiza el cuerpo de una tabla de vuelos.
 * 
 * Este componente filtra y muestra los segmentos de vuelo basados en los filtros proporcionados.
 * 
 * @component
 * @example
 * const segments = [
 *   {
      "dateOfDeparture": "2024-02-09",
      "timeOfDeparture": "08:00",
      "dateOfArrival": "2024-02-09",
      "timeOfArrival": "10:00",
      "marketingCarrier": "AV",
      "flightOrtrainNumber": "AV123",
      "locationId": {
        "departureCity": "MDE",
        "arrivalCity": "BOG"
      }
    },
 * ];
 * return (
 *   <TableBody
 *     currentPage={0}
 *     itemsPerPage={10}
 *     allSegments={segments}
 *     selectedAirline="BA"
 *     departureTime="08:30"
 *     arrivalDate="2024-09-16"
 *     arrivalTime="10:00"
 *   />
 * );
 */
function TableBody({
  currentPage,
  itemsPerPage,
  allSegments,
  selectedAirline,
  departureTime,
  arrivalDate,
  arrivalTime
}) {
  // Filtrar los segmentos según los filtros seleccionados
  const filteredSegments = allSegments.filter((segment) => {
    const matchesAirline = !selectedAirline || segment.companyName === selectedAirline;
    const matchesDepartureTime = !departureTime || segment.productDateTime?.timeOfDeparture === departureTime;
    const matchesArrivalDate = !arrivalDate || segment.productDateTime?.dateOfArrival === arrivalDate;
    const matchesArrivalTime = !arrivalTime || segment.productDateTime?.timeOfArrival === arrivalTime;

    return matchesAirline && matchesDepartureTime && matchesArrivalDate && matchesArrivalTime;
  });

  // Obtener los segmentos filtrados para la página actual
  const currentSegments = filteredSegments.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Estado para manejar el estado de carga y error
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Llamada al hook para obtener datos del usuario
  const { data:dataUser, isLoading, isError, error } = useUserDataQuery();

  // Hook para la mutación de reservas
  const [reservesUser] = useReservesMutation();

  // Función para reservar un vuelo
  const handleSubmit = async (e, dataPosition) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');

    const bodyRequest = {
      locationName: currentSegments[dataPosition].location[1]?.locationName,
      dateOfDeparture: currentSegments[dataPosition].productDateTime?.dateOfDeparture,
      timeOfDeparture: currentSegments[dataPosition].productDateTime?.timeOfDeparture,
      itineraries: [
        {
          origin: currentSegments[dataPosition].location[0]?.locationId,
          destination: currentSegments[dataPosition].location[1]?.locationId,
          departure_date: currentSegments[dataPosition].productDateTime?.dateOfDeparture,
          arrival_date: currentSegments[dataPosition].productDateTime?.dateOfArrival
        }
      ]
    }


    try {
      const response = await reservesUser({ body: bodyRequest, id_user:dataUser.id});
      console.log('Reserva exitosa:', response);
    } catch (error) {
      console.error('Error reservando el vuelo:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <tbody>
      {currentSegments.length > 0 ? (
        currentSegments.map((el, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex flex-col gap-2">
                <img
                  src={`https://pics.avs.io/60/60/${el.companyId?.marketingCarrier}.png`}
                  className='bg-cover object-cover w-[80%]'
                  alt={`${el.companyId?.marketingCarrier} logo`}
                />
              </div>
            </TableCell>
            <TableCell>{el.productDateTime?.dateOfDeparture}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-2">
                <p>{el.productDateTime?.timeOfDeparture}</p>
                <p className='font-bold text-xl text-slate-300'>{el.location[0]?.locationId}</p>
              </div>
            </TableCell>
            <TableCell>{el.productDateTime?.dateOfArrival}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-2">
                <p>{el.productDateTime?.timeOfArrival}</p>
                <p className='font-bold text-xl text-slate-300'>{el.location[1]?.locationId}</p>
              </div>
            </TableCell>
            <TableCell><p className='text-xl font-bold text-slate-300'>{el.flightOrtrainNumber}</p></TableCell>
            <TableCell>
              <form onSubmit={(e) => handleSubmit(e, index)}>
                <Button label={'Reservar'} customClass={'p-4 bg-orange-400 text-white font-bold rounded-xl'} />
              </form>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan="7">No flights available</TableCell>
        </TableRow>
      )}
    </tbody>
  );
}

// Definición de PropTypes para el componente TableBody
TableBody.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  allSegments: PropTypes.arrayOf(PropTypes.shape({
    companyId: PropTypes.shape({
      marketingCarrier: PropTypes.string
    }),
    productDateTime: PropTypes.shape({
      timeOfDeparture: PropTypes.string,
      dateOfDeparture: PropTypes.string,
      timeOfArrival: PropTypes.string,
      dateOfArrival: PropTypes.string
    }),
    location: PropTypes.arrayOf(PropTypes.shape({
      locationId: PropTypes.string
    })),
    flightOrtrainNumber: PropTypes.string
  })).isRequired,
  selectedAirline: PropTypes.string,
  departureTime: PropTypes.string,
  arrivalDate: PropTypes.string,
  arrivalTime: PropTypes.string
};

export default TableBody;
