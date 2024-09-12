import React from 'react'
import Select from '../atoms/Select'
import Label from '../atoms/Label'
import Inputs from '../atoms/Inputs'

function FilterGroup() {
    return (
        <div className='box mt-7 p-6 w-full '>
            <div class="mb-7 flex w-full items-center justify-between border-b border-gray-200 pb-3">
                <p class="text-base font-medium leading-7 text-black">FILTROS</p>
                <p class="cursor-pointer text-xs font-medium text-gray-500 transition-all duration-500 hover:text-indigo-600">RESET</p>
            </div>
            <Label label={'Aerolínea'} />
            <Select type={'normal'} options={[]} selectedOPT={'Selecciona una aerolínea'} />
            <p class="mb-3 text-sm font-medium leading-6 text-black">Aerolínea</p>
            <div class="box flex flex-col gap-2">
                <Inputs type={'checkbox'} label={'Avianca'} />
            </div >
        </div>
    )
}



export default FilterGroup