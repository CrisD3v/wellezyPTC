import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TableCell from '../TableCell';

describe('TableCell Component', () => {
    it('renders the TableCell with correct classes', () => {
        render(<TableCell>Sample Cell</TableCell>);

        // Verifica que el elemento <td> tiene las clases correctas
        const cellElement = screen.getByRole('cell');
        expect(cellElement).toHaveClass('border-t-0');
        expect(cellElement).toHaveClass('border-b');
        expect(cellElement).toHaveClass('px-6');
        expect(cellElement).toHaveClass('align-middle');
        expect(cellElement).toHaveClass('border-l-0');
        expect(cellElement).toHaveClass('border-r-0');
        expect(cellElement).toHaveClass('text-base');
        expect(cellElement).toHaveClass('whitespace-nowrap');
        expect(cellElement).toHaveClass('p-4');
        expect(cellElement).toHaveClass('text-left');
        expect(cellElement).toHaveClass('text-blueGray-700');
    });

    it('renders children correctly', () => {
        render(<TableCell>Sample Cell</TableCell>);

        // Verifica que el contenido se muestra dentro de la celda
        const cellElement = screen.getByRole('cell');
        expect(cellElement).toHaveTextContent('Sample Cell');
    });
});
