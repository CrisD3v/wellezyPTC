// Loader.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '../Loader';

describe('Loader Component', () => {
    it('renders the loader spinner', () => {
        render(<Loader />);
        // Utiliza una consulta basada en el contenido para encontrar el spinner
        const spinnerElement = screen.getByTestId('loader-spinner');
        expect(spinnerElement).toBeTruthy();
    });

    it('applies the correct classes for the spinner', () => {
        render(<Loader />);
        const spinnerElement = screen.getByTestId('loader-spinner');
        // Verifica que el spinner tiene las clases correctas
        expect(spinnerElement).toHaveClass('w-16');
        expect(spinnerElement).toHaveClass('h-16');
        expect(spinnerElement).toHaveClass('border-4');
        expect(spinnerElement).toHaveClass('border-purple-500');
        expect(spinnerElement).toHaveClass('border-dashed');
        expect(spinnerElement).toHaveClass('rounded-full');
        expect(spinnerElement).toHaveClass('animate-spin');
    });

    it('is centered in the container', () => {
        render(<Loader />);
        const containerElement = screen.getByTestId('loader-container');
        expect(containerElement).toHaveClass('flex');
        expect(containerElement).toHaveClass('justify-center');
        expect(containerElement).toHaveClass('items-center');
        expect(containerElement).toHaveClass('h-full');
    });
});
