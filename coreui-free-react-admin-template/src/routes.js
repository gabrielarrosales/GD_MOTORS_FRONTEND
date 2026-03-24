import React from 'react'

// Dashboard principal
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// --- Operaciones Diarias ---
const NuevaOrden = React.lazy(() => import('./views/ordenes/NuevaOrden'))

// --- Vistas en desarrollo (Comentadas para evitar el error "Failed to resolve import") ---
// const PatioLavado = React.lazy(() => import('./views/operaciones/PatioLavado'))
// const TasasDia = React.lazy(() => import('./views/finanzas/TasasDia'))
// const CierreCaja = React.lazy(() => import('./views/finanzas/CierreCaja'))
// const ListaPrecios = React.lazy(() => import('./views/servicios/ListaPrecios'))
// const Toppings = React.lazy(() => import('./views/servicios/Toppings'))
// const RecetasInsumos = React.lazy(() => import('./views/servicios/RecetasInsumos'))
// const StockInsumos = React.lazy(() => import('./views/inventario/StockInsumos'))
// const Proveedores = React.lazy(() => import('./views/inventario/Proveedores'))
// const ListaEmpleados = React.lazy(() => import('./views/personal/ListaEmpleados'))
// const Habilidades = React.lazy(() => import('./views/personal/Habilidades'))
// const ComisionesSemanales = React.lazy(() => import('./views/personal/ComisionesSemanales'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Panel GD Motors', element: Dashboard },

  // Solo dejamos activas las que tienen archivo físico creado
  { path: '/ordenes/nueva', name: 'Nueva Orden', element: NuevaOrden },

  /* Las siguientes rutas se activarán una a una conforme creemos los archivos 
    en src/views/ para evitar errores de compilación.
  */
]

export default routes