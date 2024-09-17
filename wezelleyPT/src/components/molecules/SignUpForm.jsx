import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Inputs from '../atoms/Inputs';
import Button from '../atoms/Button';
import { useDispatch } from 'react-redux';
import { useUserRegisterMutation } from '../../redux/services/ApiServices';
import { setToken } from '../../redux/slices/authSlice';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de formulario de registro.
 * 
 * Permite a los usuarios registrarse proporcionando su nombre, correo electrónico 
 * y contraseña. Valida los campos del formulario y gestiona la lógica de registro,
 * incluyendo el almacenamiento del token de autenticación en cookies.
 *
 * @component
 * @example
 * return (
 *   <SignUpForm />
 * );
 * @returns {JSX.Element} El componente de formulario de registro renderizado.
 */
function SignUpForm() {
    // Clases CSS para los campos de entrada
    const inputClasses = 'border rounded-md hover:border-purple-400 focus:border-purple-400 p-3 outline-none transition ease-in-out duration-300 w-full';
    
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook para redirección

    // Estado para manejar los errores de validación
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // Estado para manejar el estado de carga y error
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    // Hook para la mutación de registro
    const [registerUser] = useUserRegisterMutation();

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
        
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }
        
        if (!formData.email) {
            newErrors.email = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo no es válido';
        }
        
        if (!formData.password) {
            newErrors.password = 'La contraseña es obligatoria';
        }
        
        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Las contraseñas no coinciden';
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
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            password_confirmation: e.target.password_confirmation.value,
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
            // Ejecutar la mutación para registrar el usuario
            const response = await registerUser(formData).unwrap();

            // Guardar token en cookies
            setCookie('authToken', response?.token, { path: '/home' });
            dispatch(setToken(response?.token));
            navigate('/home'); // Redirigir a /home
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            setApiError('Error al registrar el usuario. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-full">
            <form className='w-[80%]' onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4 gap-5 w-full">
                    <Inputs 
                        label='Nombre' 
                        type='text' 
                        name='name'
                        labelPosition='T' 
                        customClass={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
                        htmlFor='name'
                        errorMessage={errors.name}
                    />
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
                    <Inputs 
                        label='Repite tu contraseña' 
                        type='password' 
                        name='password_confirmation'
                        labelPosition='T' 
                        customClass={`${inputClasses} ${errors.password_confirmation ? 'border-red-500' : ''}`}
                        htmlFor='password_confirmation'
                        errorMessage={errors.password_confirmation}
                    />
                    {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
                    <Button label={loading ? 'Cargando...' : 'Registrarse'} disabled={loading} />
                </div>
            </form>
        </div>
    );
}

// Definición de PropTypes para el componente SignUpForm
SignUpForm.propTypes = {
    // Actualmente, el componente no recibe props.
    // Se puede extender para aceptar props en el futuro.
};

export default SignUpForm;
