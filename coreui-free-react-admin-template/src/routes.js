import React from 'react'

// Dashboard principal
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// --- Operaciones Diarias ---
const NuevaOrden = React.lazy(() => import('./views/ordenes/NuevaOrden'))

// --- Finanzas ---
const TasasDia = React.lazy(() => import('./views/finanzas/TasasDia'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Panel GD Motors', element: Dashboard },
  { path: '/ordenes/nueva', name: 'Nueva Orden', element: NuevaOrden },
  
  // Ruta de Tasas del Día activada
  { path: '/finanzas/tasas', name: 'Tasas del Día', element: TasasDia },
]

export default routes