import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Table from '../Table';

describe('Table Component', () => {
    it('renders the table with correct classes', () => {
        render(
            <Table>
                <thead>
                    <tr>
                        <th>Header 1</th>
                        <th>Header 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Row 1, Cell 1</td>
                        <td>Row 1, Cell 2</td>
                    </tr>
                </tbody>
            </Table>
        );

        // Verifica que el elemento <table> tiene las clases correctas
        const tableElement = screen.getByRole('table');
        expect(tableElement).toHaveClass('items-center');
        expect(tableElement).toHaveClass('bg-transparent');
        expect(tableElement).toHaveClass('w-full');
        expect(tableElement).toHaveClass('border-collapse');
    });

    it('renders children elements within the table', () => {
        render(
            <Table>
                <thead>
                    <tr>
                        <th>Header 1</th>
                        <th>Header 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Row 1, Cell 1</td>
                        <td>Row 1, Cell 2</td>
                    </tr>
                </tbody>
            </Table>
        );

        // Verifica que los elementos hijos se renderizan dentro de la tabla
        const headerCells = screen.getAllByRole('columnheader');
        expect(headerCells).toHaveLength(2);
        expect(headerCells[0]).toHaveTextContent('Header 1');
        expect(headerCells[1]).toHaveTextContent('Header 2');

        const dataCells = screen.getAllByRole('cell');
        expect(dataCells).toHaveLength(2);
        expect(dataCells[0]).toHaveTextContent('Row 1, Cell 1');
        expect(dataCells[1]).toHaveTextContent('Row 1, Cell 2');
    });
});
