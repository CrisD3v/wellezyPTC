import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Select from '../Select';

describe('Select Component', () => {
    const options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
    ];

    it('renders the select element with the correct type', () => {
        render(<Select type="rounded" options={options} selectedOPT="Select an option" />);
        const selectElement = screen.getByRole('combobox');
        // Verifica que el select tiene las clases correctas para el tipo "rounded"
        expect(selectElement).toHaveClass('relative');
        expect(selectElement).toHaveClass('block');
        expect(selectElement).toHaveClass('h-12');
        expect(selectElement).toHaveClass('w-full');
        expect(selectElement).toHaveClass('appearance-none');
        expect(selectElement).toHaveClass('rounded-full');
        expect(selectElement).toHaveClass('border');
        expect(selectElement).toHaveClass('border-gray-300');
        expect(selectElement).toHaveClass('bg-white');
        expect(selectElement).toHaveClass('px-4');
        expect(selectElement).toHaveClass('py-2.5');
        expect(selectElement).toHaveClass('text-xs');
        expect(selectElement).toHaveClass('font-medium');
        expect(selectElement).toHaveClass('text-gray-900');
        expect(selectElement).toHaveClass('focus:outline-none');
    });

    it('renders the select element with options', () => {
        render(<Select type="normal" options={options} selectedOPT="Select an option" />);
        // Verifica que las opciones están renderizadas en el select
        const optionElements = screen.getAllByRole('option');
        expect(optionElements).toHaveLength(options.length + 1); // Incluye la opción deshabilitada
        expect(optionElements[0]).toHaveTextContent('Select an option');
        expect(optionElements[1]).toHaveTextContent('Option 1');
        expect(optionElements[2]).toHaveTextContent('Option 2');
    });

    it('applies the correct classes for the "normal" type', () => {
        render(<Select type="normal" options={options} selectedOPT="Select an option" />);
        const selectElement = screen.getByRole('combobox');
        // Verifica que el select tiene las clases correctas para el tipo "normal"
        expect(selectElement).toHaveClass('relative');
        expect(selectElement).toHaveClass('block');
        expect(selectElement).toHaveClass('h-12');
        expect(selectElement).toHaveClass('w-full');
        expect(selectElement).toHaveClass('appearance-none');
        expect(selectElement).not.toHaveClass('rounded-full'); // No debe tener la clase "rounded-full"
    });
});
