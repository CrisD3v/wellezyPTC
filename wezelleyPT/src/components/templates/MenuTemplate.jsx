import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/Header';
import SideBar from '../organisms/SideBar';
import MenuDropDown from '../organisms/MenuDropDown';
import { useSelector } from 'react-redux';

/**
 * Plantilla de menú que proporciona una estructura de diseño consistente
 * con un sidebar, un encabezado y un área de contenido principal.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido a mostrar en el área de contenido principal.
 * @example
 * return (
 *   <MenuTemplate>
 *     <SomeComponent />
 *   </MenuTemplate>
 * );
 */
function MenuTemplate({ children }) {
    const isOpenDropDownMenu = useSelector(state => state.menu.dropdownMenu);

    return (
        <div className='grid grid-cols-12 gap-4'>
            {/* SIDEBAR */}
            <SideBar />
            <div className="container col-span-10">
                {/* Header */}
                <Header />
                <MenuDropDown type={'passenger'} open={isOpenDropDownMenu} />
                {/* CONTENT */}
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    {children}
                </div>
            </div>
        </div>
    );
}

MenuTemplate.propTypes = {
    /**
     * Contenido a mostrar en el área de contenido principal.
     */
    children: PropTypes.node.isRequired,
};

export default MenuTemplate;
