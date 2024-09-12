import React from 'react'

function TableCell({ children }) {
    return (
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
            {children}
        </td>
    )
}

export default TableCell