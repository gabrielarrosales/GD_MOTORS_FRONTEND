import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

// --- IMPORTACIÓN DE LOGOS (Rutas corregidas sin espacios) ---
import logoFondoNegro from '../views/icons/brands/Logo_GD_Motors/logo_oscuro_GDMotors.png'
import logoFondoBlanco from '../views/icons/brands/Logo_GD_Motors/logo_claro_GDMotors.png'

// Configuración de navegación
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom d-flex justify-content-center align-items-center" style={{ minHeight: '90px', padding: '10px 0' }}>
        <CSidebarBrand to="/" className="d-flex align-items-center justify-content-center text-decoration-none">
          
          {/* LOGO PARA MODO OSCURO (Sidebar Negro / Tema Dark) */}
          <img 
            src={logoFondoNegro} 
            className="sidebar-brand-full d-dark-show" 
            alt="GD Motors" 
            style={{ height: '70px', width: 'auto', objectFit: 'contain' }} 
          />
          
          {/* LOGO PARA MODO CLARO (Sidebar Blanco / Tema Light) */}
          <img 
            src={logoFondoBlanco} 
            className="sidebar-brand-full d-light-show" 
            alt="GD Motors" 
            style={{ height: '70px', width: 'auto', objectFit: 'contain' }} 
          />

          {/* Siglas estilizadas para cuando el menú está contraído (Narrow) */}
          <div className="sidebar-brand-narrow" style={{ fontWeight: '900', color: '#E31E24', fontSize: '24px', letterSpacing: '1px' }}>
            GD
          </div>

        </CSidebarBrand>
        
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <AppSidebarNav items={navigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)