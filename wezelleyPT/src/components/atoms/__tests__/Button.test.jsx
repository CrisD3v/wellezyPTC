import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../Button';

describe('Button Component', () => {
    it('renders with the correct label', () => {
        render(<Button label="Click Me" />);
        expect(screen.getByText('Click Me')).toBeTruthy(); // Usar toBeTruthy en lugar de toBeInTheDocument
    });

    it('applies the default classes when customClass is not provided', () => {
        render(<Button label="Click Me" />);
        const buttonElement = screen.getByText('Click Me');
        expect(buttonElement).toHaveClass('border');
        expect(buttonElement).toHaveClass('p-4');
        expect(buttonElement).toHaveClass('bg-purple-400');
        expect(buttonElement).toHaveClass('text-white');
        expect(buttonElement).toHaveClass('rounded-full');
        expect(buttonElement).toHaveClass('font-bold');
    });

    it('applies custom classes when customClass is provided', () => {
        render(<Button label="Click Me" customClass="custom-class" />);
        const buttonElement = screen.getByText('Click Me');
        expect(buttonElement).toHaveClass('custom-class');
    });

    it('passes other props to the button element', () => {
        render(<Button label="Click Me" data-testid="custom-button" />);
        const buttonElement = screen.getByTestId('custom-button');
        expect(buttonElement).toBeTruthy();
    });
});
