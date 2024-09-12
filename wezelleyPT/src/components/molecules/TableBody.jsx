import React from 'react'
import TableRow from '../atoms/tablerow'
import TableCell from '../atoms/TableCell'


function TableBody() {
    return (
        <tbody>
                <TableRow>
                    <TableCell>
                        <img src="https://pics.avs.io/60/60/UA.png" className='bg-cover ' alt="" />
                    </TableCell>
                    <TableCell>W</TableCell>
                    <TableCell>X</TableCell>
                    <TableCell>Y</TableCell>
                    <TableCell>Z</TableCell>
                </TableRow>
        </tbody>
    )
}

export default TableBody