import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // Opcional: Si quieres usar funciones globales como 'describe', 'it', 'expect' sin importarlas
    include: ['src/**/*.test.{js,ts,jsx,tsx}'], // Incluye los archivos de prueba en src
    setupFiles: [join(__dirname, './setupTests.js')], // Opcional: Si necesitas un archivo de configuración de pruebas
    coverage: {
      provider: 'c8', // Opcional: Define el proveedor de cobertura
      reporter: ['text', 'json', 'html'], // Opcional: Define los reporteros de cobertura
    },
  },
});
