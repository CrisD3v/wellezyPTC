import React from 'react'
import Inputs from '../atoms/Inputs'
import { FaSearch } from "react-icons/fa";
import Button from '../atoms/Button';

function NavBar() {
  return (
    <div className='w-full h-14  mt-5'>
      <div className="flex justify-center">
        {/* <div className="relative w-[100%] mx-auto transition ease-in-out duration-300 ">
          <Inputs type="text" placeholder="Search..." cutomClass="peer cursor-pointer relative z-10 h-12 w-10 p-4 pr-0 rounded-full border bg-transparent pl-12 outline-none focus:w-[30%] focus:cursor-text focus:border-purple-300 transition ease-in-out duration-300 " />
          <FaSearch className='text-purple-400  absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-purple-300 peer-focus:stroke-purple-500 transition ease-in-out duration-300 ' />
        </div> */}
        <div className="flex flex-row gap-4 p-2 shadow-lg border rounded-full justify-center content-center items-center">
          <div className="relative w-[100%] mx-auto transition ease-in-out duration-300">
            <FaSearch className='text-purple-400  absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-purple-300 peer-focus:stroke-purple-500 transition ease-in-out duration-300 ' />
            <Inputs label={'Destino'} labelPosition='T' containerClass={'pl-12 border-r'} type="text" placeholder="Search..." id={'buscador'} cutomClass="peer cursor-pointer relative z-10 h-9 w-max bg-transparent outline-none focus:cursor-text focus:border-purple-300 transition ease-in-out duration-300 " />
          </div>
          <Inputs label={'Llegada'} labelPosition='T' type="date" containerClass={'pl-4 pr-4 border-r'} cutomClass=" cursor-pointer  relative z-10 h-9 w-max bg-transparent  outline-none focus:cursor-date focus:border-purple-300 transition ease-in-out duration-300 " />
          <Inputs label={'Salida'} labelPosition='T' type="date" containerClass={'pl-4 pr-4  border-r'} cutomClass=" cursor-pointer  relative z-10 h-9 w-max bg-transparent  outline-none focus:cursor-text focus:border-purple-300 transition ease-in-out duration-300 " />
          <Inputs label={'Pasajeros'} labelPosition='T' type="date" containerClass={'pl-4 pr-4 border-r'} cutomClass="peer cursor-pointer relative z-10 h-9 w-max  bg-transparent outline-none focus:cursor-text focus:border-purple-300 transition ease-in-out duration-300 " />
          <div className="pr-4 pl-2">
            <Button label={'BUSCAR'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar