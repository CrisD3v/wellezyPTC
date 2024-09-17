import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Inputs from '../atoms/Inputs';
import Button from '../atoms/Button';
import { useDispatch } from 'react-redux';
import { useUserLoginMutation } from '../../redux/services/ApiServices';
import { setToken } from '../../redux/slices/authSlice';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de formulario de inicio de sesión.
 *
 * Permite a los usuarios ingresar sus credenciales (correo y contraseña) 
 * para iniciar sesión. Valida los campos y maneja la lógica de autenticación,
 * incluyendo el almacenamiento del token en las cookies.
 *
 * @component
 * @returns {JSX.Element} El componente de formulario de inicio de sesión renderizado.
 */
function LoginForm() {
    // Clases de estilo para los campos de entrada
    const inputClasses = 'border rounded-md hover:border-purple-400 focus:border-purple-400 p-3 outline-none transition ease-in-out duration-300 w-full';

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook para redirección

    // Estado para manejar los errores de validación
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    // Estado para manejar el estado de carga y error
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    // Hook para la mutación de inicio de sesión
    const [loginUser] = useUserLoginMutation();

    // Hook para almacenar y obtener cookies
    const [cookies, setCookie] = useCookies(['authToken']);

    /**
     * Valida los campos del formulario.
     * 
     * @param {Object} formData - Datos del formulario.
     * @returns {Object} Errores de validación.
     */
    const validateForm = (formData) => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo no es válido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es obligatoria';
        }

        return newErrors;
    };

    /**
     * Maneja el envío del formulario.
     * 
     * @param {React.FormEvent} e - El evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Datos del formulario
        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        // Validar el formulario
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        setApiError('');

        try {
            // Ejecutar la mutación para iniciar sesión
            const response = await loginUser(formData).unwrap();

            // Guardar token en cookies y en el estado de Redux
            setCookie('authToken', response?.token, { path: '/home' });
            dispatch(setToken(response?.token));
            navigate('/home'); // Redirigir a /home
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setApiError('Error al iniciar sesión. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full">
            <form className='w-[80%]' onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4 gap-5 w-full">
                    <Inputs
                        label='Correo'
                        type='email'
                        name='email'
                        labelPosition='T'
                        customClass={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
                        htmlFor='email'
                        errorMessage={errors.email}
                    />
                    <Inputs
                        label='Contraseña'
                        type='password'
                        name='password'
                        labelPosition='T'
                        customClass={`${inputClasses} ${errors.password ? 'border-red-500' : ''}`}
                        htmlFor='password'
                        errorMessage={errors.password}
                    />
                    <Button label='Iniciar' />
                </div>
            </form>
        </div>
    );
}

// Definición de PropTypes para el componente LoginForm
LoginForm.propTypes = {
    // Este componente no recibe propiedades desde fuera
    // Si en el futuro necesita recibir props, agregarlas aquí.
};

export default LoginForm;
