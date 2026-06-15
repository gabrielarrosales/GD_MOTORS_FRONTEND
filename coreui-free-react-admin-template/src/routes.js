import React from 'react'

// Dashboard principal
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// --- Operaciones Diarias ---
const NuevaOrden = React.lazy(() => import('./views/ordenes/NuevaOrden'))
const TazaDelDia = React.lazy(() => import('./views/Taza_del_dia/taza_del_dia'))
const ListaDeprecios = React.lazy(() => import('./views/Lista_de_precios/lista_de_precios'))
const StockInsumos = React.lazy(() => import('./views/Stock/lista_de_insumos'))
const ListaEmpleados = React.lazy(() => import('./views/Personal/lista_de_empleados'))

// --- Finanzas ---
const TasasDia = React.lazy(() => import('./views/finanzas/TasasDia'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Panel GD Motors', element: Dashboard },
  { path: '/ordenes/nueva', name: 'Nueva Orden', element: NuevaOrden },
  { path: '/taza-del-dia', name: 'Tasa del Día', element: TazaDelDia },
  { path: '/lista-de-precios', name: 'Lista de Precios', element: ListaDeprecios },
  { path: '/stock-insumos', name: 'Stock de Insumos', element: StockInsumos },
  { path: '/lista-empleados', name: 'Lista de Empleados', element: ListaEmpleados },
  /* Las siguientes rutas se activarán una a una conforme creemos los archivos 
    en src/views/ para evitar errores de compilación.
  */
  
  // Ruta de Tasas del Día activada
  { path: '/finanzas/tasas', name: 'Tasas del Día', element: TasasDia },
]

export default routes