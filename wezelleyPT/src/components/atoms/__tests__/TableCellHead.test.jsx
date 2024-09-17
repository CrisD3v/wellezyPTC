import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TableCellHead from '../TableCellHead';

describe('TableCellHead Component', () => {
    it('renders the TableCellHead with correct classes', () => {
        render(<TableCellHead>Header Cell</TableCellHead>);

        // Verifica que el elemento <th> tiene las clases correctas
        const headerCellElement = screen.getByRole('columnheader');
        expect(headerCellElement).toHaveClass('px-6');
        expect(headerCellElement).toHaveClass('bg-blueGray-50');
        expect(headerCellElement).toHaveClass('text-blueGray-500');
        expect(headerCellElement).toHaveClass('align-middle');
        expect(headerCellElement).toHaveClass('border');
        expect(headerCellElement).toHaveClass('border-solid');
        expect(headerCellElement).toHaveClass('border-blueGray-100');
        expect(headerCellElement).toHaveClass('py-3');
        expect(headerCellElement).toHaveClass('text-xs');
        expect(headerCellElement).toHaveClass('uppercase');
        expect(headerCellElement).toHaveClass('border-l-0');
        expect(headerCellElement).toHaveClass('border-r-0');
        expect(headerCellElement).toHaveClass('whitespace-nowrap');
        expect(headerCellElement).toHaveClass('font-semibold');
        expect(headerCellElement).toHaveClass('text-left');
    });

    it('renders children correctly', () => {
        render(<TableCellHead>Header Cell</TableCellHead>);

        // Verifica que el contenido se muestra dentro de la celda de encabezado
        const headerCellElement = screen.getByRole('columnheader');
        expect(headerCellElement).toHaveTextContent('Header Cell');
    });
});
