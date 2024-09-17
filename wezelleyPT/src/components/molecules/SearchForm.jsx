import React, { useState } from 'react';
import Inputs from '../atoms/Inputs';
import Button from '../atoms/Button';
import Label from '../atoms/Label';
import MenuDropDown from '../organisms/MenuDropDown';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDropDownMenu, setOpenDropDownSearch, setOpenUserMenu } from '../../redux/slices/menuSlice';
import { useSearchFlightsMutation } from '../../redux/services/ApiServices';
import { setFlights, setLoadData } from '../../redux/slices/dataSlice';
import { getCache, setCache } from '../../app/cache/IndexedDB'; // Importar funciones de caché
import User from '../atoms/User';

/**
 * Componente de formulario para buscar vuelos.
 *
 * @returns {JSX.Element} El componente SearchForm renderizado.
 */
function SearchForm() {
    const dispatch = useDispatch();
    const handleOpenMenu = () => dispatch(setOpenDropDownMenu());
    const handleOpenSearch = () => dispatch(setOpenDropDownSearch());
    const handleOpenUserMenu = () => dispatch(setOpenUserMenu());
    const isOpenDropDownSearch = useSelector(state => state.menu.dropdownSearch);
    const isOpenDropDownUser = useSelector(state => state.menu.userMenu);
    const totalPassengers = useSelector((state) => state.counter.adults + state.counter.kids);
    const adults = useSelector((state) => state.counter.adults);
    const city = useSelector((state) => state.cityIata.city);
    const iata = useSelector((state) => state.cityIata.iata);

    const [departureDate, setDepartureDate] = useState('');
    const [errors, setErrors] = useState({}); // Estado para manejar los errores

    // Hooks para la mutación
    const [searchFlights, { data: flightData, error: flightError, isLoading: flightLoading }] = useSearchFlightsMutation();

    /**
     * Valida los campos del formulario.
     *
     * @returns {boolean} Verdadero si el formulario es válido, falso en caso contrario.
     */
    const validateForm = () => {
        const newErrors = {};
        if (!iata) {
            newErrors.iata = true; // Solo marcar como error
        }
        if (!departureDate) {
            newErrors.departureDate = true; // Solo marcar como error
        } else {
            // Validar que la fecha sea futura
            const selectedDate = new Date(departureDate);
            const currentDate = new Date();
            if (selectedDate <= currentDate) {
                newErrors.departureDate = true; // Solo marcar como error
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Maneja el envío del formulario.
     *
     * @param {Object} e - Evento del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar el formulario
        if (!validateForm()) {
            return;
        }

        const cacheKey = JSON.stringify({
            searchs: 2,
            qtyPassengers: totalPassengers,
            adult: adults,
            itinerary: [
                {
                    departureCity: iata.toLowerCase(),
                    arrivalCity: 'lhr',
                    hour: `${departureDate}T00:00:00+0000`,
                },
            ],
        });

        try {
            dispatch(setLoadData(2));

            // Verificar caché
            const cachedData = await getCache(cacheKey);
            if (cachedData) {
                dispatch(setFlights(cachedData));
                dispatch(setLoadData(1));
                return;
            }

            // Ejecutar la mutación para buscar vuelos
            const response = await searchFlights({
                searchs: 2,
                qtyPassengers: totalPassengers,
                adult: adults,
                itinerary: [
                    {
                        departureCity: iata.toLowerCase(),
                        arrivalCity: 'lhr',
                        hour: `${departureDate}T00:00:00+0000`,
                    },
                ],
            }).unwrap();

            // Guardar en caché
            await setCache(cacheKey, response);
            dispatch(setFlights(response));
            dispatch(setLoadData(1));
        } catch (error) {
            console.error('Error al buscar vuelos:', error);
        }
    };

    // Actualizar estado y eliminar errores al cambiar la fecha
    const handleDepartureDateChange = (e) => {
        setDepartureDate(e.target.value);
        if (errors.departureDate) {
            setErrors((prevErrors) => ({ ...prevErrors, departureDate: null }));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <div className="flex flex-row gap-4 p-2 shadow-lg border rounded-full justify-center content-center items-center">
                        <div className="relative w-[100%] mx-auto transition ease-in-out duration-300 cursor-pointer" onClick={handleOpenSearch}>
                            <FaSearch className='text-purple-400 absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-purple-300 peer-focus:stroke-purple-500 transition ease-in-out duration-300' />
                            <div className="flex flex-col pl-12 border-r">
                                <Label label={'Destino'} />
                                <p className={`text-md ${errors.iata ? 'text-red-500' : 'text-slate-400'}`}>
                                    {city && iata ? `${city} (${iata})` : '¿A dónde quieres ir?'}
                                </p>
                            </div>
                        </div>
                        <Inputs
                            label={'Salida'}
                            labelPosition='T'
                            type="date"
                            containerClass={'pl-4 pr-4 border-r'}
                            customClass={`border-0 cursor-pointer relative z-10 w-max bg-transparent outline-none focus:cursor-text focus:border-purple-300 transition ease-in-out duration-300 ${errors.departureDate ? 'text-red-500' : ''}`}
                            value={departureDate}
                            onChange={handleDepartureDateChange}
                        />
                        <div className="flex flex-col w-96 cursor-pointer" onClick={handleOpenMenu}>
                            <Inputs type='hidden' value={totalPassengers} />
                            <Inputs type='hidden' value={adults} />
                            <Label label={'Personas'} />
                            <p>{totalPassengers} {totalPassengers <= 1 ? 'Pasajero' : 'Pasajeros'}</p>
                        </div>
                        <div className="pr-4 pl-2">
                            <Button type="submit" label={'BUSCAR'} />
                        </div>
                    </div>
                    <div className="ml-2">
                        <User onClick={handleOpenUserMenu}/>
                    </div>
                </div>
            </form>

            <MenuDropDown type={'search'} open={isOpenDropDownSearch} />
            <MenuDropDown type={'user'} open={isOpenDropDownUser} />
        </div>
    );
}

export default SearchForm;
