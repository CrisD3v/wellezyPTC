import PropTypes from 'prop-types';
import { useState } from 'react';
import TableCellHead from '../atoms/TableCellHead';
import TableCell from '../atoms/TableCell';
import Table from '../atoms/Table';
import TableRow from '../atoms/TableRow';

/**
 * Componente Accordion para mostrar una lista de elementos con detalles expandibles.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} props.data - Un array de objetos que contiene la información de los vuelos.
 * @param {string} props.data[].locationName - Nombre de la ubicación del vuelo.
 * @param {string} props.data[].dateOfDeparture - Fecha de salida del vuelo.
 * @param {string} props.data[].timeOfDeparture - Hora de salida del vuelo.
 * @param {Array} props.data[].itineraries - Lista de itinerarios relacionados con el vuelo.
 * @param {string} props.data[].itineraries[].arrival_date - Fecha de llegada del itinerario.
 * @param {string} props.data[].itineraries[].destination - Destino del itinerario.
 * @param {string} props.data[].itineraries[].origin - Origen del itinerario.
 * @returns {JSX.Element} El componente Accordion.
 */
const Accordion = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    /**
     * Alterna la sección del acordeón según el índice.
     * @param {number} index - El índice de la sección a alternar.
     */
    const toggleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            {data.map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex justify-between items-center p-4 text-left text-gray-700 font-medium focus:outline-none"
                    >
                        <span>Vuelo: {item.locationName}</span>
                        <svg
                            className={`w-6 h-6 transition-transform duration-200 ${activeIndex === index ? 'transform rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {activeIndex === index && (
                        <div className="p-4 text-gray-600">
                            <div className="flex justify-center flex-col items-center gap-5">
                                <h2 className='font-bold text-2xl text-center mb-4 uppercase'>DATOS</h2>
                                <table className='items-center bg-transparent w-96 border-collapse'>
                                    <thead>
                                        <tr>
                                            <th>Fecha de salida</th>
                                            <th>Hora de salida</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='w-96'>
                                            <td className='align-middle text-base whitespace-nowrap p-4 text-center text-blueGray-700'>{item.dateOfDeparture}</td>
                                            <td className='align-middle text-base whitespace-nowrap p-4 text-center text-blueGray-700'>{item.timeOfDeparture}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-center flex-col items-center gap-5 mt-5">
                                <h2 className='font-bold text-2xl text-center mb-4 uppercase'>Itinerario</h2>
                                <table className='items-center bg-transparent w-96 border-collapse'>
                                    <thead>
                                        <tr>
                                            <th>Fecha de llegada</th>
                                            <th>Destino</th>
                                            <th>Origen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.itineraries.map((el, i) => (
                                            <tr className='w-96' key={i}>
                                                <td className='align-middle text-base whitespace-nowrap p-4 text-center text-blueGray-700'>{el.arrival_date}</td>
                                                <td className='align-middle text-base whitespace-nowrap p-4 text-center text-blueGray-700'>{el.destination}</td>
                                                <td className='align-middle text-base whitespace-nowrap p-4 text-center text-blueGray-700'>{el.origin}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Definir PropTypes para la comprobación de tipos
Accordion.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            locationName: PropTypes.string.isRequired,
            dateOfDeparture: PropTypes.string.isRequired,
            timeOfDeparture: PropTypes.string.isRequired,
            itineraries: PropTypes.arrayOf(
                PropTypes.shape({
                    arrival_date: PropTypes.string.isRequired,
                    destination: PropTypes.string.isRequired,
                    origin: PropTypes.string.isRequired
                })
            ).isRequired
        })
    ).isRequired
};

export default Accordion;
