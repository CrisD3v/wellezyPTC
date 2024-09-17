import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../atoms/TableRow';
import TableCellHead from '../atoms/TableCellHead';

/**
 * Componente que renderiza el encabezado de una tabla de vuelos.
 * 
 * Este componente muestra los nombres de las columnas de la tabla.
 * 
 * @component
 * @example
 * return (
 *   <TableHead />
 * );
 */
function TableHead() {
    return (
        <thead>
            <TableRow>
                <TableCellHead>Aerolínea</TableCellHead>
                <TableCellHead>Fecha de salida</TableCellHead>
                <TableCellHead>Hora de salida</TableCellHead>
                <TableCellHead>Fecha de llegada</TableCellHead>
                <TableCellHead>Hora de llegada</TableCellHead>
                <TableCellHead>Número de vuelo</TableCellHead>
                <TableCellHead></TableCellHead>
            </TableRow>
        </thead>
    );
}

// Definición de PropTypes para el componente TableHead
TableHead.propTypes = {};

export default TableHead;
