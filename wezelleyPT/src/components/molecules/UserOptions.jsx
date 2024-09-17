import React, { useState } from 'react';
import { useUserLogoutMutation } from '../../redux/services/ApiServices';
import { useCookies } from 'react-cookie';
import { setOpenUserMenu, setOpenDropDownMenu, setOpenDropDownSearch } from '../../redux/slices/menuSlice';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Componente de opciones de usuario.
 * 
 * Este componente maneja las opciones relacionadas con el usuario, como cerrar sesión.
 * Realiza la llamada a la API para cerrar sesión, elimina la cookie de autenticación
 * y actualiza el estado de los menús desplegables.
 *
 * @component
 * @example
 * return (
 *   <UserOptions />
 * );
 * @returns {JSX.Element} El componente de opciones de usuario renderizado.
 */
function UserOptions() {
    const dispatch = useDispatch();

    // Hooks para la mutación de cierre de sesión y gestión de cookies
    const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
    const [logoutUser] = useUserLogoutMutation();

    // Estado para manejar el estado de carga y errores
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    /**
     * Maneja el envío del formulario para cerrar sesión.
     * 
     * @param {React.FormEvent} e - El evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setApiError('');

        try {
            // Ejecutar la mutación para cerrar sesión
            await logoutUser();

            // Elimina la cookie llamada 'authToken'
            removeCookie('authToken', { path: '/' });

            // Cierra los menús desplegables
            dispatch(setOpenUserMenu(false));
            dispatch(setOpenDropDownMenu(false));
            dispatch(setOpenDropDownSearch(false));
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            setApiError('Error al cerrar sesión. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex justify-center w-full'>
            <button 
                className='w-full text-sm font-bold cursor-pointer hover:bg-purple-400 hover:text-white p-4 rounded-lg transition-all ease-in-out duration-300' 
                disabled={loading}
            >
                {loading ? 'Cerrando sesión...' : 'Cerrar sesión'}
            </button>
            {apiError && <p className="text-red-500 mt-2">{apiError}</p>}
        </form>
    );
}

// Definición de PropTypes para el componente UserOptions
UserOptions.propTypes = {
    // Actualmente, el componente no recibe props,
    // pero se puede extender en el futuro con la definición de propiedades.
};

export default UserOptions;
