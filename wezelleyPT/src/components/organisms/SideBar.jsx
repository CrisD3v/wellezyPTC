import React from 'react';
import PropTypes from 'prop-types';
import FilterGroup from '../molecules/FilterGroup';
import { useSelector } from 'react-redux';
import Loader from '../atoms/loader';
/**
 * Componente de barra lateral que incluye un título y un grupo de filtros.
 * 
 * @component
 * @example
 * return (
 *   <SideBar />
 * );
 */
function SideBar() {
  const loadData = useSelector((state) => state.datas.loadingData);
  return (
    <div className='w-full h-screen border-x col-span-2'>
      <div className="flex flex-col justify-around place-items-center gap-4 w-full">
        <div className="">
          <h1 className='text-4xl mt-10 uppercase font-bold text-purple-400'>Wellezy</h1>
        </div>
        {loadData === 2 ?  <Loader /> :  loadData == 1 ? <FilterGroup />: ''}
      </div>
    </div>
  );
}

export default SideBar;
