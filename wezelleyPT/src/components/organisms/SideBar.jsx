import React from 'react'
import FilterGroup from '../molecules/FilterGroup'

function SideBar() {
  return (
    <div className='w-full h-screen border-x col-span-2'>
      <div className="flex flex-col justify-around place-items-center gap-4 w-full">
        <div className="">
          <h1 className='text-4xl mt-10 uppercase font-bold text-purple-400'>Wellezy</h1>
        </div>
        <FilterGroup />
      </div>
    </div>
  )
}

export default SideBar