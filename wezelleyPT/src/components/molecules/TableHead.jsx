import React from 'react'
import Table from '../atoms/Table'
import TableRow from '../atoms/tablerow'
import TableCellHead from '../atoms/TableCellHead'

function TableHead() {
    return (
        <thead>
            <TableRow>
                <TableCellHead>Logo</TableCellHead>
                <TableCellHead>Aerolínea</TableCellHead>
                <TableCellHead>Fecha</TableCellHead>
                <TableCellHead>Código IATA</TableCellHead>
                <TableCellHead>Pais</TableCellHead>
            </TableRow>
        </thead>
    )
}

export default TableHead