// User.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import User from '../User';

describe('User Component', () => {
    it('renders the User component with default styles', () => {
        render(<User />);

        // Verifica que el contenedor se renderiza correctamente
        const userIconContainer = screen.getByTestId('user-icon');
        expect(userIconContainer).toBeInTheDocument();
        expect(userIconContainer).toHaveClass('rounded-full');
        expect(userIconContainer).toHaveClass('border');
        expect(userIconContainer).toHaveClass('h-10');
        expect(userIconContainer).toHaveClass('w-10');
        expect(userIconContainer).toHaveClass('flex');
        expect(userIconContainer).toHaveClass('items-center');
        expect(userIconContainer).toHaveClass('justify-center');
        expect(userIconContainer).toHaveClass('bg-purple-400');
        expect(userIconContainer).toHaveClass('shadow-lg');
        expect(userIconContainer).toHaveClass('cursor-pointer');
    });

    it('renders the FaUser icon correctly', () => {
        render(<User />);

        // Verifica que el ícono FaUser se renderiza correctamente dentro del contenedor
        const iconElement = screen.getByTestId('user-icon').querySelector('svg');
        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveClass('h-5');
        expect(iconElement).toHaveClass('w-5');
        expect(iconElement).toHaveClass('text-white');
    });

    it('applies additional props correctly', () => {
        const handleClick = vi.fn();
        render(<User onClick={handleClick} data-testid="user-icon" />);

        // Verifica que las propiedades adicionales como onClick se aplican correctamente
        const userIconContainer = screen.getByTestId('user-icon');
        expect(userIconContainer).toHaveAttribute('data-testid', 'user-icon');
        
        userIconContainer.click(); // Simula el clic
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
