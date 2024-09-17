import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Label from '../Label';

describe('Label Component', () => {
    it('renders with the correct label text', () => {
        render(<Label label="Username" />);
        expect(screen.getByText('Username')).toBeTruthy(); // Verifica que el texto de la etiqueta se renderiza correctamente
    });

    it('has the correct HTML attributes and classes', () => {
        render(<Label label="Username" />);
        const labelElement = screen.getByText('Username');
        expect(labelElement).toHaveClass('mb-1 text-sm font-medium leading-6 text-gray-600'); // Verifica que las clases CSS están aplicadas
    });

    it('warns if label prop is not provided', () => {
       // Spy para interceptar las advertencias de PropTypes en la consola
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<Label />);
        
        expect(consoleErrorSpy).toHaveBeenCalled();
        
        // Limpia el spy después de la prueba
        consoleErrorSpy.mockRestore();
    });
});
