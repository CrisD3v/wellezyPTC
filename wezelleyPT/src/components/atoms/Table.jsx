import React from 'react'

function Table({ children }) {
    return (
        <table className='items-center bg-transparent w-full border-collapse'>
            {children}
        </table>
    )
}

export default Table