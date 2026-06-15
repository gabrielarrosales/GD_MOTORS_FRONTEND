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
    name: 'Ordenes',
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
        to: '/taza-del-dia',
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
        to: '/lista-de-precios',
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
        to: '/stock-insumos',
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
        to: '/lista-empleados',
      },
    ],
  },
]

export default _nav