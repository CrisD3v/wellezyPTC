import React, { useState, useCallback } from 'react';
import Inputs from '../atoms/Inputs';
import { useSearchAirportsMutation } from '../../redux/services/ApiServices';
import { useDispatch } from 'react-redux';
import { setIata, setCity } from '../../redux/slices/cityIataSlice';
import { getCache, setCache } from '../../app/cache/IndexedDB'; // Importar funciones de caché

/**
 * Componente de búsqueda y selección de aeropuertos.
 *
 * @returns {JSX.Element} El componente SearchSelect renderizado.
 */
function SearchSelect() {
    const dispatch = useDispatch();
    const [departureCity, setDepartureCity] = useState('');
    const [departureAirportData, setDepartureAirportData] = useState([]);
    const [searchAirports] = useSearchAirportsMutation();

    /**
     * Función para buscar aeropuertos.
     * Usa caché para evitar llamadas repetidas a la API.
     *
     * @param {string} city - Ciudad para buscar aeropuertos.
     */
    const handleSearchAirports = useCallback(async (city) => {
        if (city.length > 2) { // Realiza la búsqueda solo si la ciudad tiene más de 2 caracteres
            const cacheKey = `airports-${city}`;

            try {
                // Verificar caché
                const cachedData = await getCache(cacheKey);
                if (cachedData) {
                    setDepartureAirportData(cachedData);
                } else {
                    // Obtener datos de la API
                    const response = await searchAirports(city).unwrap();
                    setDepartureAirportData(response);
                    await setCache(cacheKey, response); // Guardar en caché
                }
            } catch (error) {
                console.error("Error al obtener el aeropuerto:", error);
            }
        } else {
            setDepartureAirportData([]); // Limpia los resultados si la búsqueda es demasiado corta
        }
    }, [searchAirports]);

    /**
     * Maneja el cambio en el campo de entrada.
     *
     * @param {Object} e - Evento de cambio en el campo de entrada.
     */
    const handleChange = (e) => {
        const value = e.target.value;
        setDepartureCity(value);
        handleSearchAirports(value);
    };

    /**
     * Maneja la selección de una ciudad y su código IATA.
     *
     * @param {string} city - Ciudad seleccionada.
     * @param {string} iata - Código IATA del aeropuerto.
     */
    const handleCityIata = (city, iata) => {
        dispatch(setCity(city));
        dispatch(setIata(iata));
    };

    return (
        <div>
            <Inputs
                type="text"
                placeholder="Ingresa una ciudad..."
                customClass="peer rounded-lg p-4 border w-full cursor-pointer relative z-10 bg-transparent outline-none focus:cursor-text focus:border-purple-400 transition ease-in-out duration-300"
                value={departureCity}
                onChange={handleChange}
            />
            <div className="mt-5">
                <ul>
                    {departureAirportData.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleCityIata(item.city, item.iata)}
                            className="h-10 p-4 flex items-center font-semibold text-xl hover:bg-purple-300 hover:text-white transition-all ease-in-out duration-300 mb-2 cursor-pointer rounded-lg"
                        >
                            <p>{item.city} ({item.iata})</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchSelect;
