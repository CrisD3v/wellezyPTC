import React from 'react'
import Table from '../atoms/Table'
import TableBody from '../molecules/TableBody'
import TableHead from '../molecules/TableHead'

function DataTable() {
  return (
    <Table>
      <TableHead/>
      <TableBody />
    </Table>
  )
}

export default DataTable