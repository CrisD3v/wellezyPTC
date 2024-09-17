import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../organisms/Accordion';
import User from '../atoms/User';
import MenuDropDown from '../organisms/MenuDropDown';
import { useUserReservesQuery } from '../../redux/services/ApiServices';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenUserMenu } from '../../redux/slices/menuSlice';


/**
 * Componente de la página de reservas.
 * 
 * Este componente utiliza un hook para obtener los datos de reservas del usuario
 * y los pasa al componente Accordion para su visualización.
 * 
 * @returns {JSX.Element} El componente ReservesPage.
 */
function ReservesPage() {
    const dispatch = useDispatch();
    // Llamada al hook para obtener datos del usuario
    const { data: reservesData, isLoading, isError, error } = useUserReservesQuery();

    // Evento para abrir el menú del usuario
    const handleOpenUserMenu = () => dispatch(setOpenUserMenu());
    const isOpenDropDownUser = useSelector(state => state.menu.userMenu);

    // Renderizar el componente
    return (
        <div className='grid grid-cols-12'>
            <div className="col-span-12 flex justify-center mt-10">
                <div className="flex justify-center flex-col items-center gap-5">
                <h1 className='text-4xl font-bold uppercase text-purple-400'>RESERVAS E ITINERARIOS</h1>
                <User onClick={handleOpenUserMenu}/>
                </div>
            </div>
            <div className="col-span-12 w-full">
                <Accordion data={reservesData || []} />
                <MenuDropDown type={'user'} open={isOpenDropDownUser} customClass={'xl:right-[43.9%] lg:top-[9rem]'} />
            </div>
        </div>
    );
}

export default ReservesPage;
