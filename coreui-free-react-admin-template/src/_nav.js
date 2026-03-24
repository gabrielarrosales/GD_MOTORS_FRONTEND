import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilCarAlt,
  cilCart,
  cilPeople,
  cilMoney,
  cilNotes,
  cilSettings,
  cilBasket,
  cilIndustry
} from '@coreui/icons'
import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Panel GD Motors',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Operaciones Diarias',
  },
  {
    component: CNavItem,
    name: 'Nueva Orden',
    to: '/ordenes/nueva',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Finanzas',
    to: '/finanzas',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tasas del Día',
        to: '/finanzas/tasas',
      },
      {
        component: CNavItem,
        name: 'Cierre de Caja',
        to: '/finanzas/caja',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Catálogos',
  },
  {
    component: CNavGroup,
    name: 'Servicios',
    to: '/servicios',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Lista de Precios',
        to: '/servicios/lista',
      },
      {
        component: CNavItem,
        name: 'Toppings (Extras)',
        to: '/servicios/toppings',
      },
      {
        component: CNavItem,
        name: 'Recetas de Insumos',
        to: '/servicios/recetas',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Administración',
  },
  {
    component: CNavGroup,
    name: 'Inventario',
    to: '/inventario',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Stock de Insumos',
        to: '/inventario/stock',
      },
      {
        component: CNavItem,
        name: 'Proveedores',
        to: '/inventario/proveedores',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Personal',
    to: '/personal',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Lista de Empleados',
        to: '/personal/lista',
      },
      {
        component: CNavItem,
        name: 'Habilidades',
        to: '/personal/habilidades',
      },
      {
        component: CNavItem,
        name: 'Comisiones Semanales',
        to: '/personal/comisiones',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Configuración',
  },
  {
    component: CNavItem,
    name: 'Ajustes del Sistema',
    to: '/configuracion',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _nav