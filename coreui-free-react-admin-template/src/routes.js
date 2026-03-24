import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Panel GD Motors', element: Dashboard },

  { path: '/ordenes', name: 'Órdenes', element: FormControl, exact: true },
  { path: '/ordenes/nueva', name: 'Nueva Orden', element: FormControl },
  { path: '/finanzas', name: 'Finanzas', element: Tables, exact: true },
  { path: '/finanzas/tasas', name: 'Tasas del Día', element: FormControl }, 
  { path: '/finanzas/caja', name: 'Cierre de Caja', element: Tables }, 
  { path: '/servicios', name: 'Servicios', element: Tables, exact: true },
  { path: '/servicios/lista', name: 'Lista de Precios', element: Tables }, 
  { path: '/servicios/toppings', name: 'Toppings (Extras)', element: Tables }, 
  { path: '/servicios/recetas', name: 'Recetas de Insumos', element: FormControl }, 
  { path: '/inventario', name: 'Inventario', element: Tables, exact: true },
  { path: '/inventario/stock', name: 'Stock de Insumos', element: Tables }, 
  { path: '/inventario/proveedores', name: 'Proveedores', element: Tables }, 
  { path: '/personal', name: 'Personal', element: Tables, exact: true },
  { path: '/personal/lista', name: 'Lista de Empleados', element: Tables }, 
  { path: '/personal/habilidades', name: 'Habilidades', element: Tables }, 
  { path: '/personal/comisiones', name: 'Comisiones Semanales', element: Tables }, 
  { path: '/configuracion', name: 'Configuración', element: Widgets },
]

export default routes