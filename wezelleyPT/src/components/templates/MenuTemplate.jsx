import React from 'react'
import NavBar from '../organisms/Header'
import SideBar from '../organisms/SideBar'

function MenuTemplate({ children }) {
    return (
        <div className='grid grid-cols-12 gap-4'>
            {/* SIDEBAR */}
            <SideBar />
            <div className="container col-span-10">
                {/* NAVBAR */}
                <NavBar />
                {/* CONTENT */}
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MenuTemplate