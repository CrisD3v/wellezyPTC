import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TableRow from '../TableRow';

describe('TableRow Component', () => {
    it('renders the TableRow with correct classes', () => {
        render(
            <TableRow>
                <td>Cell 1</td>
                <td>Cell 2</td>
            </TableRow>
        );

        // Verifica que el elemento <tr> se renderiza
        const rowElement = screen.getByRole('row');
        expect(rowElement).toBeInTheDocument();
    });

    it('renders children correctly', () => {
        render(
            <TableRow>
                <td>Cell 1</td>
                <td>Cell 2</td>
            </TableRow>
        );

        // Verifica que los elementos hijos se renderizan dentro de la fila
        const cellElements = screen.getAllByRole('cell');
        expect(cellElements).toHaveLength(2);
        expect(cellElements[0]).toHaveTextContent('Cell 1');
        expect(cellElements[1]).toHaveTextContent('Cell 2');
    });
});
