import React from 'react';
import './App.css';
import HomePage from './components/pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import { CookiesProvider } from 'react-cookie'; // Proveedor de cookies para toda la aplicación
import PrivateRoute from './components/templates/PrivateRoutes';
import ReservesPage from './components/pages/ReservesPage';

/**
 * Componente principal de la aplicación que define las rutas
 * y el contenido principal de la aplicación.
 * 
 * @component
 * @example
 * return <App />;
 */
function App() {
  return (
    <div className='select-none'>
      {/* Proveedor de cookies para que las cookies estén disponibles en todos los componentes */}
      <CookiesProvider>
        <Routes>
          {/* Ruta pública: Página de inicio (Landing) */}
          <Route exact path="/" element={<LandingPage />} />

          {/* Rutas privadas: [Home, Reserves], envueltas con PrivateRoute para requerir autenticación */}
          <Route exact path="/home" element={<PrivateRoute component={HomePage} />} />
          <Route exact path="/reserves" element={<ReservesPage />} />
        </Routes>
      </CookiesProvider>
    </div>
  );
}

export default App;
