import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Inputs from '../Inputs';

describe('Inputs Component', () => {
    it('renders with the correct type', () => {
        render(<Inputs type="text" />);
        expect(screen.getByRole('textbox')).toBeTruthy(); // Verifica que el input se renderiza como un textbox
    });

    it('applies custom classes correctly', () => {
        render(<Inputs type="text" customClass="custom-class" />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveClass('custom-class');
    });

    it('applies container classes correctly', () => {
        render(<Inputs type="text" containerClass="container-class" />);
        const containerElement = screen.getByRole('textbox').parentElement;
        expect(containerElement).toHaveClass('container-class');
    });

    it('renders the label when provided and positioned at the top', () => {
        render(<Inputs type="text" label="Username" labelPosition="T" />);
        expect(screen.getByText('Username')).toBeTruthy();
    });

    it('renders the label when provided and positioned to the left', () => {
        render(<Inputs type="text" label="Username" labelPosition="L" />);
        expect(screen.getByText('Username')).toBeTruthy();
    });

    it('does not render the label when not provided', () => {
        render(<Inputs type="text" />);
        expect(screen.queryByText('Username')).toBeNull();
    });

    it('renders error message when provided', () => {
        render(<Inputs type="text" errorMessage="This field is required" />);
        expect(screen.getByText('This field is required')).toBeTruthy();
    });

    it('does not apply error class when no error message is provided', () => {
        render(<Inputs type="text" />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).not.toHaveClass('border-red-500');
    });

    it('renders the input with correct label position', () => {
        const { container } = render(<Inputs type="text" label="Username" labelPosition="R" />);
        const labelElement = screen.getByText('Username');
        const inputElement = screen.getByRole('textbox');

        // Comprobar si la etiqueta se representa a la derecha de la entrada
        expect(container.querySelector('.flex-row.items-center')).toBeTruthy();
        expect(labelElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
    });

    it('handles additional props correctly', () => {
        render(<Inputs type="text" data-testid="custom-input" />);
        const inputElement = screen.getByTestId('custom-input');
        expect(inputElement).toBeTruthy();
    });
});
